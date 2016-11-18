define([
	"dojo/_base/declare",
	"dojo/io/script",
	"dojo/io-query",
	"dojo/_base/json",
	"dojo/_base/lang",
	"dojo/rpc/JsonpService",
	"../shared",
	"./ProfilerAPIError",
	"./ProfilerAPIException"
], function(declare, ioScript, ioQuery, json, lang, JsonpService, shared, ProfilerAPIError, ProfilerAPIException){

return declare("excentos.rpc.JsonpService", JsonpService, {
	
	lastSubmissionId: 0,
	
	//	sessionId: String
	//		The session ID needs to be set from outside, e.g. in the initialization process.
	_sessionId: "",

	ERRORTYPE: {
		PROFILER_ERROR: 	"profilerError",
		PROFILER_EXCEPTION: "profilerException",
		NONE: 				"none"
	},
	
	bind: function(method, parameters, deferredRequestHandler, url){
		//	summary:
		//		JSONP bind method. Takes remote method, parameters,
		//		deferred, and a url, calls createRequest to make a JSON-RPC
		//		envelope and passes that off with bind.
		//	method: string
		//		The name of the method we are calling.
		//	parameters: array
		//		The parameters we are passing off to the method.
		//	deferredRequestHandler: deferred
		//		The Deferred object for this particular request.

		var callparams = {
			url: url || this.serviceUrl,
			callbackParamName: this.callbackParamName||"callback",
			timeout: this.timeout,
			handleAs: "json",	
			preventCache: true
		};
		var jsonpRPCRequest = this.createJsonpRPCRequest(method, parameters);
		var sessionId = shared.store.getGlobalMetaDataByKey("sessionId");
		callparams.url = callparams.url + ";jsessionid=" + sessionId + "?" + ioQuery.objectToQuery(jsonpRPCRequest) + "&application=" + xcInitial.masterApplicationName;
		var def = ioScript.get(callparams);
		def.addCallbacks(this.resultCallback(deferredRequestHandler), this.errorCallback(deferredRequestHandler));
	},

	createJsonpRPCRequest: function(method, parameters){
		var jsonrequestobj = {
			"params": parameters,
			"method": method,
			"id": ++this.lastSubmissionId
		};
		return {
			jsonrequestobj: json.toJson(jsonrequestobj)
		};
	},
	
	parseResults: function(obj){
		if (!("result" in obj)) {
			//TODO: convert to Error
			return;
		}
		if (typeof obj.result.payload != "undefined" && obj.result.payload !== null) {
			return obj.result.payload;
		}
		else {
			return obj.result;
		}
	},
	
	getServiceErrorType: function(response){
		//summary:
		//	detects what kind of error may exist in the payload

		if("error" in  response){
			return this.ERRORTYPE.PROFILER_ERROR;
		}
		if(response.result && response.result.serviceExceptionItems){
			return this.ERRORTYPE.PROFILER_EXCEPTION;
		}
		
		return this.ERRORTYPE.NONE;
	},
	
	resultCallback: function(/* dojo.Deferred */ deferredRequestHandler){
		//	summary:
		// 		create callback that calls the Deferred's callback method
		//  tags: override
		//	description:
		//		Overrides dojo's method because jabsorb's error object differs from what dojo expects.
		//		|	error.message vs. error.msg
		//	deferredRequestHandler: Deferred
		//		The deferred object handling a request.
		
		return lang.hitch(this, this._resultCallbackFunction, deferredRequestHandler);
	},

	_resultCallbackFunction: function(deferred, data){
		var errtype = this.getServiceErrorType(data),
			err;

		if(errtype == this.ERRORTYPE.NONE){
			var results = this.parseResults(data);
			//TODO: what if ´results´ is undefined?
			deferred.callback(results);
		}
		else {
			switch(errtype){
				case this.ERRORTYPE.PROFILER_ERROR:
					err = new ProfilerAPIError(data.error);break;
				case this.ERRORTYPE.PROFILER_EXCEPTION:
					//TODO: #1488, #1499 handle serviceExceptionItems
					//TODO: How to handle multiple exceptions ?
					//TODO: Are there errors that could be ignored,
					//		so that a callback() would have to be executetd instead of errback() ?
					var exceptionItems = (data.result && data.result.serviceExceptionItems) || data.serviceExceptionItems;
					err = new ProfilerAPIException(exceptionItems[0]);break;
				default:
					err = data;
			}
			deferred.errback(err);
		}
	},

	errorCallback: function(/* dojo.Deferred */ deferredRequestHandler){
		// tags: override
		return lang.hitch(this, this._errorCallbackFunction, deferredRequestHandler);
	},

	_errorCallbackFunction: function(deferred, data){
		deferred.errback(data);
	}

});

});
