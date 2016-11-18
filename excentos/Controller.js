define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/cookie",
	"dojo/errors/RequestTimeoutError",
	"./Singleton",
	"./shared",
	"./log"
], function(declare, lang, array, JSON, cookie, RequestTimeoutError, Singleton, shared, log){


var delayerTimeout, _pendingRequestsGuard = {};
return Singleton(declare(null, {

	//	_clientType: String
	//		The client type must be sent with every service request. The default value can be overriden with an
	//		argument to the constructor.
	_clientType: "xcAjaxClient",
	
	_rpcService: null,
	
	//	jsonAdapter: String
	//		The class name of the service methods. All method names have to use it as a prefix followed by a dot (".").
	//		The prefix string needs to be set from outside, e.g. in the initialization process.
	_jsonAdapter: "",
	
	//	_pingIntervalTime: Integer
	//		Interval in milliseconds after which a ping is sent to the server in order to keep the session alive.
	//		The word 'time' is appended to the variable name to not make the method 'setPingInterval' look like its setter.
	//		Default is 15 minutes (900000), which matches the default 30mins server session timout.
	_pingIntervalTime: 900000,
	
	//	_pendingRequests: Array
	//		A queue of not-yet-sent requests as objects with the keys
	//			methodName: String
	//				The name of the service method.
	//			get: Object
	//				The "GET" arguments of the service method.
	//			post: Object
	//				The "POST" arguments of the service method.
	//		
	//		NOTE: Pending requests are usually requests that have been sent but no response is received yet.
	//			See '_isResponsePending' for that.
	//	
	//		NOTE: This array may contain references to objects or arrays in widgets or other components.
	//			It does not reflect the correct values at the time when the call was triggered if multiple calls
	//			change the value of one thing like the value of one facet. This is not a problem since all saved calls
	//			just point to the final value that we want to send, anyway.
	_pendingRequests: null,
	
	//	_isResponsePending: Boolean
	//		Indicates if the response to an already-sent request is pending.
	//		
	//		NOTE: Such a pending response is usually referred to as a pending or in-flight _request_ (with the
	//			response being part of the request). It is called differently here, because this class also knows
	//			"pending requests" as not-yet-sent requests (see '_pendingRequests').
	_isResponsePending: false,
	
	//	_timeoutMode: Boolean
	//		Set to `true` if there's an unresolved timeout for the last service call.
	_timeoutMode: false,
	
	//	_pendingResults: Array
	//		A queue of service call results that will be processed when there are no requests and responses pending.
	_pendingResults: null,
	
	//	_onNoPendingResultsCallbacks: Array
	//		Array of callbacks to be invoked when there are no results pending. See 'addOnNoPendingResults'.
	_onNoPendingResultsCallbacks: null,
	
	constructor: function(/*Object*/ rpcService, /*String?*/ clientType){
		this._rpcService = rpcService;
		if(clientType){
			this._clientType = clientType;
		}
		this._pendingRequests = [];
		this._pendingResults = [];
		this._onNoPendingResultsCallbacks = [];
	},
	
	setSessionIdCookie: function(metaData){
		//	summary:
		//		Set a cookie storing the session ID if a truthy value was passed.
		//      Session cookie is overwritten every time to emulate the behavior a browser 
		//      has when it gets the cookie header with every HTML page. 
		if(metaData && metaData.sessionId && cookie.isSupported()){
			// implementation note: do not access the store here, it's not yet filled with fresh data. 

			// if the path is the conventional /Project/SYSTEM/  notation, set the cookie to that path only 
			// because it's very probably the case that you're adressing the *.excentos.com service directly 
			// and in this case multiple workers with individual sessions sit in the same domain. 
			// Otherwise (typically when integrated into the customer site) use the root path
			// to avoid that the same user gets a new server for each advisor and/or place where the advisor
			// is embedded into the customer site.			
			// the cookie path must match the path format the servlet container is emitting as cookie path (no slash at the end to match server default)
			var syspath = "/" + metaData.projectName + "/" + metaData.system;  
			var cookiepath = (document.location.pathname.indexOf(syspath) == 0) ? syspath : "/";

			// FYI: this would be cookie lifetime=session lifetime:
			// var expiration = new Date(new Date().getTime() + metaData.sessionTimeout);
			// BUT DON'T DO, because it doesn't match server-side cookie behavior and our "ping" doesn' update the cookie (yet). 
			
			// USE THIS to match server (currently jetty) default:
			var expiration = new Date(new Date().getTime() + 604800000 /*one week*/);
			
			cookie("xcSessId", metaData.sessionId, {path: cookiepath, expires: expiration.toUTCString()});
			log("io", "Set cookie 'xcSessId=" + metaData.sessionId + "'.");
		}
	},
	
	setPingInterval: function(interval){
		//	summary:
		//		Ping server in the given interval.
		//	interval: Integer
		//		Interval in milliseconds (defaults to 900000 resp. 15 minutes).
		if(typeof interval != "undefined"){
			this._pingIntervalTime = interval;
		}
		// First, clear existing interval.
		this.clearPingInterval();

		// Start the interval execution of the 'ping' method.
		// Make sure 'ping' is executed in the Controller object context by using dojo.hitch.
		this._pingIntervalId = window.setInterval(lang.hitch(this, this.ping), this._pingIntervalTime);
	},
	
	clearPingInterval: function(){
		//	summary:
		//		Stop the existing ping interval.
		if(typeof this._pingIntervalId != "undefined"){
			window.clearInterval(this._pingIntervalId);
		}
		delete this._pingIntervalId;
	},
	
	ping: function(){
		// summary: Call method 'echo' with the message "ping".
		this.echo("ping");
	},
	
	echo: function(message){
		//	summary:
		//		Call the service method 'echo'. 
		//	message: String
		//		Message to echo.
		//  TODO: migrate to empty regular API call to get the updated session ID, session timeout, server status etc. 
		var deferred = this._rpcService[this._jsonAdapter + "." + "echo"](message);
		// Add callback functions to the deferred object of the service call.
		// Make sure the functions are called in the context of this object (Controller instance) by using dojo.hitch if necessary.
		deferred.addCallback(lang.hitch(this, function(result){
			log("io", result);
			this._resolveTimeout();
			return result;
		}));
		deferred.addErrback(lang.hitch(this, this._serviceErrback));

		return deferred;

	},
	
	addOnNoPendingResults: function(/*Object?*/ obj, /*String|Function*/ functionName){
		//	summary:
		//		Registers a callback to be invoked when there are no pending results which means implicitly that there
		//		are also no requests and responses pending and that the results of all formerly queued service calls
		//		are processed and should be reflected in the user interface.
		//	example:
		//	|	c.addOnNoPendingResults(functionPointer);
		//	|	c.addOnNoPendingResults(object, "functionName");
		//	|	c.addOnNoPendingResults(object, function(){ /* ... */});
		var callback;
		if(!functionName){
			callback = obj;
		}else{
			callback = (typeof functionName == "string") ? obj[functionName] : functionName;
			callback = lang.hitch(obj, callback);
		}
		// If there's something pending, add the function to the list, otherwise call it now.
		if(this._pendingRequests.length || this._isResponsePending || this._pendingResults.length){
			this._onNoPendingResultsCallbacks.push(callback);
		}else{
			callback();
		}
	},
	
	callService: function(/*String*/ methodName, /*Object?*/ params){
		//	summary:
		//		Allows to call an arbitrary RPC method (except 'echo') and to postpone the call, too.
		//
		//	methodName: String
		//		Name of the server method to call.
		//
		//	params.getParams: Object?
		//		Object that contains the "GET" parameters to be sent to the server.
		//
		//	params.getParams.returns: Array?  
		//		List of strings that specifies which object types the response payload should contain.
		//
		//	params.postParams: Object?
		//		Object that contains the "POST" parameters to be sent to the server.
		//
		//	params.sendLater: Boolean?
		//		If true the call may be queued and sent combined with a later one.
		//
		//	params.dontIntercept: Boolean?
		//		If true no interceptor method is called. Helps avoiding circles in interceptor
		//		e.g. if you do a similar call within an interceptor method.
		//
		//	returns: Object|Integer
		//		Deferred object of the service call or number of pending requests.

		if(methodName == "echo"){
			console.error("Use the controller methods 'echo' or 'ping' directly instead of using 'callService(\"echo\")'.");
			return;
		}
		
		params = params || {};
		var getParams = params.getParams || {};
		var postParams = params.postParams || {};
		
		getParams.clientType = this._clientType;
		
		//TODO: remove interceptor thing in favor of aspect approach
	
		// Call the corresponding interceptor method in the behavior if it is available.
		// The interceptor method can modify the params directly. 
		// If it returns false, the call is canceled completely (logging is up to the interceptor method).
		if(!params.dontIntercept){
			var interceptorFunctionName = "intercept" + methodName.slice(0,1).toUpperCase() + methodName.slice(1);
			if(typeof shared.behavior[interceptorFunctionName] == "function"){
				if(shared.behavior[interceptorFunctionName]({getParams: getParams, postParams: postParams, callback: params.callback, errback: params.errback, sendLater: params.sendLater}) === false){
					return null;
				}
			}
		}
		
		// Check if the service provides this method.
		if(typeof this._rpcService[this._jsonAdapter + "." + methodName] != "function"){
			console.error("Service doesn't provide a method called '" + this._jsonAdapter + "." + methodName + "'.");
			return null;
		}
		
		// If there's a request with a pending response or the call is explicitly configured to be queued,
		// add the call to the queue of pending requests (not-yet-sent).
		// Otherwise the call is a single call or the first call of possibly multiple calls in a row so
		// just send it.
		if(this._isResponsePending || params.sendLater || this._timeoutMode || params.delay){
			this._addToPendingRequests({methodName: methodName, get: getParams, post: postParams});
			log("io", "Controller: Added call to queue (pending requests: " + this._pendingRequests.length + ").");
			
			if(params.delay){
				clearTimeout(delayerTimeout);
				delayerTimeout = setTimeout(lang.hitch(this, "sendPendingRequests"), params.delay);
			}
			return this._pendingRequests.length;
		}else{
			if(this._pendingRequests.length){
				// if there's a request waiting (typically from a prior params.sendLater usage), combine the two into one
				this._addToPendingRequests({methodName: methodName, get: getParams, post: postParams});
				return this.sendPendingRequests();
			}else{
				log("io", "Controller: Call a single service method");
				return this._callService(methodName, getParams, postParams);		
			}
		}
	},
	
	_addToPendingRequests: function(/*Object*/ request){
		var reqjson = JSON.stringify(request);
		if(!_pendingRequestsGuard[reqjson]){
			_pendingRequestsGuard[reqjson] = request;
			this._pendingRequests.push(request);
		}
	},
	
	sendPendingRequests: function(){
		this._pendingRequests.length && this._callServiceCombined();
	},

	_callServiceCombined: function(){
		//	summary:
		//		Call the service method 'invokeMany' with all queued calls combined.
		log("io", "Controller: Call many service methods at once.");
		var deferred = this._callService("invokeMany", {}, {calls: this._pendingRequests});
		this._pendingRequests = [];
		_pendingRequestsGuard = {};
		clearTimeout(delayerTimeout);
		return deferred;
	},
	
	_callService: function(/*String*/ methodName, /*Object*/ getParams, /*Object*/ postParams){
		//	summary:
		//		Make the actual service call.
		//	returns:
		//		Deferred object of the service call.
		var deferred = this._rpcService[this._jsonAdapter + "." + methodName](getParams, postParams);
		this._lastCall = {methodName: methodName, get: getParams, post: postParams};
		this._isResponsePending = true;
		// Add callback functions to the deferred object of the service call.
		// Make sure the functions are called in the context of this object (Controller instance) by using dojo.hitch.
		deferred.addCallback(lang.hitch(this, this._serviceCallback));
		deferred.addErrback(lang.hitch(this, this._serviceErrback));
		
		return deferred;
	},
	
	_serviceCallback: function(result){
		//	summary:
		//		Queues the result and either sends all pending requests if there are any or processes the result queue.
		var errors = [];
		var sessionId = result.metaData.sessionId;
		if(sessionId != shared.store.getGlobalMetaDataByKey("sessionId")){
			errors.push("new session");
			log("io", "Got new session ID '" + sessionId + "'.");
		}
		// always re-set the cookie because the server is always right (e.g. system, sessionid, expiration...)
		this.setSessionIdCookie(result.metaData);
		
		this._isResponsePending = false;
		this._resolveTimeout();
		errors.length && shared.behavior.onError("service", errors);
		if(errors[0] == "new session"){
			return;
		}
		this._pendingResults.push(result);
		if(this._pendingRequests.length){
			this._callServiceCombined();
		}else{
			this._handleResults();
			this._onResultsHandled();
		}
		return result;
	},

	_resolveTimeout: function(){
		// summary: returns true if a timeoutmode was resolved
		if(this._timeoutMode){
			this._timeoutMode = false;
			shared.behavior.onError("service", ["timeout resolved"]);
		}

		return !this._timeoutMode;
	},
	
	_serviceErrback: function(result){
		//	summary:
		//		Handle errors that occur in the service layer or during handling of the response. 
		//	NOTE:
		//		See `dojo/tests/io/scriptTimeout.html` for Firefox oddity ("dojo.io.script.jsonp_dojoIoScript10 is undefined").
		var isNativeError = Object.prototype.toString.call(result)=="[object Error]";
		var isMessage = typeof result == "string";
		
		//we dont handle native javascript errors; just errout
		if(isNativeError){
			console.error(result, "stack" in result ? result.stack : "");
		} else {
			if(result instanceof RequestTimeoutError){
				log("io", "Service timeout exceeded.");
				this._timeoutMode = true;
				//FIXME: there is a problem with relative API Calls like "moveToNextStageInPath" -
				//	case: request was "moveToNextStageInPath" - server received request and responds
				//	client times out and doesnt receive the response - the request will be resent
				//	the server again processes the request and is now a "next" too far
				if(this._lastCall){
					if(this._lastCall.methodName == "invokeMany"){
						var calls = this._lastCall.post.calls;
						log("io", "Add " + calls.length + " call(s) to pending requests.");
						if(calls.length){
							// Add calls to front of pending requests.
							var i = calls.length - 1;
							do{
								this._pendingRequests.unshift(calls[i]);
							}while(i--);
						}
					}else{
						log("io", "Add last call to pending requests.");
						this._pendingRequests.unshift(this._lastCall);
					}
				}
				shared.behavior.onError("service", ["timeout"]);
			}else{
				shared.behavior.onError("service", [{name: "error", args: [result]}]);
			}
		}
		this._isResponsePending = false;
		return result;
	},
	
	_handleResults: function(){
		//	summary:
		//		Dispatch incoming data. Store it and call the corresponding methods in the behavior.
		// If there are multiple results the store merges them. It then iterates over the result object,
		// concatenates the possible behavior method names per object type and calls the given callback function
		// with these method names. The callback will be executed in the context of the controller, calling the
		// behavior methods if they exist.
		
		shared.store.setResults(this._pendingResults, this._behaviorMethodCallback);
		this._pendingResults = [];
	},
	
	callBehaviorMethods: function(){
		//	summary:
		//		Call the behaviorMethodCallback for registered callbacks on the store.
		//	description:
		//		Provide an interface to the registered store.onNewDataXY callbacks,
		//		to be called in the init.js after behavior initialization.
		// 		See #1208
		shared.store.callMethodHandlers(this._behaviorMethodCallback);
	},
	
	_behaviorMethodCallback: function(handlerMethodName, appName){
		//	summary:
		//		Callback for behavior methods.
		var behavior = shared.behavior;
		
		if(typeof behavior[handlerMethodName] == "function"){
			behavior[handlerMethodName](appName);
		}
	},
	
	_onResultsHandled: function(){
		//	summary:
		//		Call all registered callbacks when the queued results are processed.
		log("io", "Controller: Results handled. Callbacks on no pending results: " + this._onNoPendingResultsCallbacks.length + ".");
		array.forEach(this._onNoPendingResultsCallbacks, function(callback){
			callback();
		});
		this._onNoPendingResultsCallbacks = [];
		shared.behavior.onResultsHandled();
	}
}));

});
