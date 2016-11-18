define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"dojo/aspect",
	"dojo/cookie",
	"./shared",
	"./Singleton",
	"./simplehash",
	"./tracking/Tracker"
], function(declare, lang, topic, aspect, cookie, shared, Singleton, simplehash, tracker){

return Singleton(declare("excentos.Router", null, {
	//	_currentStage: String
	_currentStage: "",
	
	//	_previousStage: String
	_previousStage: "",
	
	//	_initialStage: String
	_initialStage: "",
	
	//	_changingHash: Boolean
	_changingHash: false,
	
	_stageChangedOnLastRequest: false,
	
	// enabled: Boolean
	//	set to false if hash handling should be deactivated
	enabled: true,
	
	// forceUrlSessionId: Boolean,
	//	set to true add the sessionId to the url hash
	forceUrlSessionId: false,
	
	constructor: function(){
		var conf = shared.store.getConfigItems();
		if("forceUrlSessionId" in conf){
			this.forceUrlSessionId = conf.forceUrlSessionId;
		}
	},
	
	route: function(){
		//	summary:
		//		bootstraps the router by registering
		//		callbacks for hashchange and newFacetGroupVars events.
		//		Initially _currentStage is null because that property 
		//		refers to the current routed-to stage, but on page refresh
		//		the server handles the request.
		this._currentStage = null;
		this._initialStage = shared.store.getFacetGroupVars().currentStageInView;
		topic.subscribe("/excentos/hashchange", lang.hitch(this, "_onNewHash"));
		this._connects = [
			aspect.before(shared.behavior, "onNewAppFacetGroupVars", lang.hitch(this, "_onNewFacetGroupVars"))
		];
		
		//always replace xcReset
		var currentHash =  simplehash(), removedReset = currentHash.replace(/\&?xcReset(?:\=[^&#;$]+)?/,"");
		currentHash != removedReset && simplehash(removedReset, true);
		
		//	change the initial hash to remove app's initialization hash params like xcReset
		if(this.enabled){
			this.addHistory({
				// 	13 = "xcAjaxClient.".length
				xcStartAt: this._initialStage.substr(13)
			});
		}
	},
	_onNewHash: function(/*String*/ hash){
		//	summary:
		//		callback for the /dojo/hashchange event
		//		this will dispatch to the requested stage given in
		//		the hash if 
		//	hash: String
		
		if(!this.enabled || this._changingHash || !this._currentStage){
			return;
		}
		
		var params = this._parseHash(hash);
		
		if(typeof params.xcStartAt !== "string"){
			params.xcStartAt = this._initialStage.substr(13);
		}
		
		if(this._currentStage === "xcAjaxClient." + params.xcStartAt){
			return;
		}
		
		this._dispatch(params);
	},
	
	_dispatch: function(/*Object*/ request){
		//	summary:
		//		dispatches a request;
		//		calls behavior callbacks before and after 
		//		the app is dispatched/moved to the requested stage.
		//	request: Object
		//		.xcStartAt:	String
		
		var behavior = shared.behavior;
		tracker.track("navigate.browserhistory.to", request.xcStartAt);
		behavior.moveToAccessibleStage("xcAjaxClient." + request.xcStartAt);
	},
	
	_onNewFacetGroupVars: function(/*String*/ appName){
		//	summary:
		//		callback on new facet group vars to
		//		check the current stage in view and add a
		//		history entry if the stage has changed
		//	appName: String
		//		not used yet
		
		this.enabled && this._handleSessionId();
		var currentStage = shared.store.getFacetGroupVars().currentStageInView;
		
		if(this._currentStage !== currentStage){
			// 	prevent router from adding initial history entry
			if(this._currentStage !== null){
				this.addHistory({
					xcStartAt: currentStage
				});
				
				this._stageChangedOnLastRequest = true;
			}
			
			this._previousStage = this._currentStage;
			this._currentStage = currentStage;
			
			
			topic.publish("/app/ajaxClient/router/onStageChanged");
		}else{
			
			this._stageChangedOnLastRequest = false;
			topic.publish("/app/ajaxClient/router/onStageUnChanged");
		}
	},
	
	setHash: function(/*String | Object*/ hash, /*Boolean*/ replace){
		// summary:
		//	sets the hash in a mixin kind of way (it wont remove any parts accidentally)
		
		var hashObj  = typeof hash == "string" ? this._parseHash(hash) : hash;
		hashObj = lang.mixin(this._parseHash(simplehash()), hashObj);
		
		//loop prevention flag set
		this._changingHash = true;
		
		simplehash(this._parseObject(hashObj), !!replace);
		
		//loop prevention flag unset
		this._changingHash = false;
	},
	
	addHistory: function(/*Object*/ params){
		//	summary:
		//		adds a new hash-based history entry
		//	params: Object
		//		.xcStartAt: String
		if(!this.enabled)return;
		
		var currentHashObj = this._parseHash(simplehash());
		var facetGroupName = params.xcStartAt;
		
		//check if xcStartAt changed ...
		if( facetGroupName &&
			typeof facetGroupName == "string" && 
			(facetGroupName = facetGroupName.replace("xcAjaxClient.","")) &&
			currentHashObj.xcStartAt !== facetGroupName ){
			
			this.setHash({xcStartAt: facetGroupName});
			
		}
	},
	
	_handleSessionId: function(){
		this.setHash({
			xcSessId: this.forceUrlSessionId || cookie.isSupported() === false ?
						shared.store.getGlobalMetaDataByKey("sessionId") :
						undefined
		}, true);
	},

	_parseHash: function(/*String*/ hashString){
		//	summary:
		//		Parses a hash and returns the request object.
		var queryParams = {};
		var queryParts = hashString.split("&");
		
		for(var i = 0, l = queryParts.length; i < l; ++i){
			var param = queryParts[i].split("=");
			var key = param[0];
			var value = param[1];
			if(!key)continue;
			
			if(param.length == 2){
				queryParams[key] = value;
			}else if(param.length == 1){
				queryParams[key] = "";
			}
		}
		
		return queryParams;
	},
	
	_parseObject: function(/*Object*/ params){
		var value, arr = new Array();
		for(var key in params){
			value = params[key];
			if(value !== undefined || !key){
				arr.push("&"+(value ? key+"="+value : key));
			}
		}
		// return sorted just in case someone assumes the url parameters are sorted. 
		return ""+arr.sort().join("");
	},
	
		
	getCurrentStage: function(){
		//	summary:
		//		returns the current stage that the router
		//		has dispatched to
		
		return this._currentStage;
	},
	
	getPreviousStage: function(){
		//	summary:
		//		returns the previous stage that 
		//		the router has dispatched to
		return this._previousStage;
	},
	
	hasStageChangedOnLastRequest: function(){
		return this._stageChangedOnLastRequest;
	}
}));

});
