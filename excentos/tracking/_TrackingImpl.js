define([
	"dojo/_base/declare",
	"../shared"
], function(declare, shared){

var _trackingImpl = declare("excentos.tracking._TrackingImpl", null, {
	//	name: String
	//		the name of the tracking implementation
	name: "",
	
	//	ready: Boolean
	ready: false,
	
	//	enabled: Boolean
	enabled: true,
	
	//	engine: Object
	//		the tracking engine e.g. omniture's "s"-object
	//		or the excentos tracking engine
	engine: null,
	
	//	pendingRequests: Object[]
	//		a list of pending requests objects
	//		containing method string an params Array
	pendingRequests: null,
	
	constructor: function(){
		this.pendingRequests = [];
		this.engine = {};
		this._init();
	},
	
	_publish: function(){
		//	summary:
		//		publish a tracking request
	},
	
	_reset: function(){
		//	summary:
		//		reset dynamic tracking variables
	},
	
	_init: function(){
		//	summary:
		//		initialize static tracking variables
		//		every tracking implementation that does not depend on
		//		asynchronously loaded engines should be ready handle
		//		tracking requests after this method was called -
		//		so the ready-to-track-flag is set to true by default.
		this.ready = true;
	},
	
	track: function(/*String*/ method, /*Array?*/ args){
		//	summary:
		//		the "generic" tracking method that takes
		//		a method string that equals a specific tracking method name
		//		and an optional list of params that will be passed to the tracking
		//		method.
		//		if the tracker is not yet ready, e.g. the engine
		//		is loaded asynchronously, the tracking request will be stored
		//		and handled later when the tracker is ready.
		if(this.enabled === false){
			return;
		}
		
		if(this.ready !== true){
			this.pendingRequests.push({
				method: method,
				params: args || []
			});
			
			return;
		}
		
		if(typeof this[method] === "function"){
			this._reset();
		
			if(!args || args.length === 0){
				this[method]();
			}else{
				this[method].apply(this, args);
			}
		
			this._publish();
		}
	},
	
	_ready: function(){
		//	summary:
		//		call this method if the tracker is ready to track
		//		if it uses an engine that is loaded asynchronously,
		//		this method should be called after the engine is loaded
		//		completely.
		//		otherwise just set this.ready to true (_init)
		this.ready = true;
		
		for(var i = 0, l = this.pendingRequests.length; i < l; ++i){
			var request = this.pendingRequests[i];
			
			this.track(request.method, request.params);
		}
		
		delete this.pendingRequests;
	},
	
	_getTrackingCurrentStage: function(){
		var cur = shared.store.getFacetGroupVars().currentStageInView;
		return cur ? this._getTrackingGroupName(cur) : "[current stage not available at this point]";
	},
	
	_getTrackingNextStage: function(){
		var next = shared.store.getFacetGroupVars().nextStageInPath;
		return next ? this._getTrackingGroupName(next) : "[target stage unavailable at this point]"; 
	},

	_getTrackingPreviousStage: function(){
		var prev = shared.store.getFacetGroupVars().previousStageInPath;
		return prev ? this._getTrackingGroupName(prev) : "[target stage unavailable at this point]"; 
	},
	
	// BEGIN architecturally bogus stuff that assumes the default wizard question flow rules client-side.
	_getTrackingStageForGroup: function(/*String*/ groupName){
		var group = shared.store.getFacetGroupByName(groupName), 
			stage = group && this._getFirstStageRecursive(group), 
			stageName = stage ? stage.name : groupName;
		
		!group && console.warn(this.declaredClass+"::"+arguments.callee.nom+"() no such facetgroup found for given `groupName` '"+groupName+"'");
		!stage && console.warn(this.declaredClass+"::"+arguments.callee.nom+"() stage could not be determined for given `groupName` '"+groupName+"'");
		
		return stageName;
	},
	_getFirstStageRecursive: function(/*Object FacetGroup*/ group){
		//NOTE this implementation mimics the actual behavior of the questionflow navigation.
		//	   The QF does not seem to introspect any type of group to hopefully find a STAGE, it will likely just crawl NESTEDSTAGEs
		
		switch(group.type){
			case "STAGE":
				var vars = shared.store.getFacetGroupVarsByFacetGroupName(group.name);
				return vars.enabled && vars.visible ? group : null;
			case "NESTEDSTAGE":
				var subGroups = shared.store.getOrderedFacetGroupsByName(group.name);
				for(var i=0, l=subGroups.length; i<l; ++i){
					if(arguments.callee(subGroups[i])){
						return subGroups[i];
					}
				}
			//fall through, return null
			default:
				return null;
		}
	},
	// END architecturally bogus stuff that assumes the default wizard question flow rules client side.

	_getTrackingGroupName: function(/*String*/ groupName){
		//	summary:
		//		we won't track full group name, but without xcAjaxClient.
		if(groupName.indexOf("xcAjaxClient.") === 0){
			return groupName.substr(13);
		}
		
		return groupName;
	},
	
	_getTrackingApp: function(/*String?*/ appName){
		//	summary:
		//		returns the name of the application to track
		//		the tracking application name equals the excentos
		//		app name without the leading "app_"
		appName = appName || xcInitial.masterApplicationName;
		
		return appName.replace("app_", "");
	},
	
	_getTrackingSystem: function(){
		//	summary:
		//		fetches the system string eg. Siemens_DE, Siemens_CH_fr
		return shared.store.getGlobalMetaDataByKey("system");
	},
	
	_getTrackingSession: function(){
		return shared.store.getGlobalMetaDataByKey("sessionId");
	},
	
	_getTrackingProject: function(){
		return shared.store.getGlobalMetaDataByKey("projectName");
	},
	
	_getTrackingTheme: function(){
		return shared.store.getTheme() || "default";
	},
	
	_getTrackingLocale: function(){
		return shared.store.getGlobalMetaDataByKey("locale");
	},
	
	_getProjectRevision : function(){
		var pr = shared.store.getGlobalMetaDataByKey("projectRevision"); 
		return  pr ? pr : "";
	},
	
	_getProjectVersion: function(){
		var pv = shared.store.getGlobalMetaDataByKey("projectVersion");		
		return  pv ? pv : "";
	},
	
	_getCookieDomain: function(){
		return shared.store.getConfigByKey("trackingCookieDomain") || "*."+this._guessTopLevelDomain();
	},
	
	_guessTopLevelDomain: function(){
		var i,h,
			dc=document.cookie,
			tc='_xctldtest=cookie',
			h = document.location.hostname.split('.');
		for(i=h.length-1; i>=0; i--) {
			h = h.slice(i).join('.');
			dc = tc + ';domain=' + h + ';';
			if(dc.indexOf(tc)>-1){
				dc = tc.split('=')[0] + '=;domain=' + h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				return h;
			}
		}
	}, 

	// TODO this whole bucketing thing is way too much code in relation to relevance.

	// used for the Price attribute:
	_growingBucketBounds: [/*custom beginning */1,2,5,10,15,
	                       /*begin pattern*/20,25,30,35,40,50,60,70,80,100,125,150,175,/*end pattern*/
	                       /*repeat       */200,250,300,350,400,500,600,700,800,1000,1250,1500,1750,
	                       /*repeat again */2000,2500,3000,3500,4000,5000,6000,7000,8000,10000,12500,15000,17500,
	                       /*repeat again */20000,25000,30000,35000,40000,50000,60000,70000,80000,100000,125000,150000,175000],
	
	// for other numeric values
    _linearBucketRoundings: /* rangelowerThan:roundTo */ {"12":1/*1-11 buckets*/,"25":2/*6-12 buckets*/,"60":5/*5-14 buckets*/,
							/*repeat and scale up:    */  "120":10,"250":20,"600":50,
														  "1200":100,"2500":200,"6000":500,
														  "12000":1000,"25000":2000,"60000":5000,
														  /*the end: else 10000*/"999999999999":10000},

	// for free Number inputs and Number Inputs with a large amount of states values are bucketed:
	_getBucketedStateName: function(facetName, stateName){
		// 1: do nothing on non-numeric values (safe to assume there's no empty string in stateName)
		var value = Number(stateName.replace(",",".")); 
			// FYI: do not use parseFloat but the stricter Number() constructor 
			// FYI: allow comma-type Numbers (compatibility with custom state names like in the slider)
		if(value != value){ // check for NaN. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN for why done this way. 
			// RETURN
			return stateName;		
		}
		// 2: set / create correkt boundary list (fixed for price)
		if(facetName == "Price"){
			bounds = this._growingBucketBounds;
			var lower = 0; // no support for negatives yet
			var cur;
			for(var i=0;i<bounds.length;i++){
				cur = bounds[i];
				// we write  "2-5","5-10" instead of "2-4","5-9" (value can be float)
				if(value < cur){
					// RETURN
					return lower+"-"+cur;
				}
				lower = cur;
			}
			// oops, something's gone wrong
			console.warn("couldn't find appropriate price bucket for tracker (value:"+stateName+")");
			return stateName;
		}
		// TODO provide convenience Method in Store to get the states of the first facetInGroup
		var figs = shared.store.getFacetsInGroupByFacetName(facetName);
		var states;
		for (var prop in figs) {
		    var firstFig = figs[prop];
			if(firstFig){
				states = shared.store.getOrderedFacetInGroupStateItemsByFacetInGroupName(firstFig.name);
				if(states.length){
					// XXX end possible store convenience method
					var range = Number(states[states.length - 1].name) - Number(states[0].name);
					for(var limit in this._linearBucketRoundings){
						if (range < Number(limit)){
							var rnd = this._linearBucketRoundings[limit];
							// RETURN
							return rnd*(Math.floor(value/rnd))+"-"+rnd*(Math.ceil(value/rnd));
						}
					}
				}
			}
		    break; // first is enough
		}
		// if all fails return same value:
		return stateName;
	},
	
	
	_getTrackingQueryProfile: function(){
		// returns a query Profile String that's:
		// - alphabetically sorted for facetNames and states (safe against modeling implementation changes)
		// - formatted readably
		// - has a reduced number of states on facets with a high number of states (bucketing for statistics)
		
		var qs = shared.store.getMetaData().queryProfileSerialization;
		if(!qs || qs == "$=") return "no selections"; // "$=" is a known bug in the server software. will maybe be fixed in 1.6.37
		var query = qs.split("&");
		// sort includes states as they are still part of the string
		query.sort(); 
		// format and merge multiple values
		var result = "";
		var lastFacet = ""; 
		for(var i=0;i<query.length;i++){
			sepIdx = query[i].indexOf("=");
			var facetName = query[i].substring(1, sepIdx); // pos 1 to get rid of the dollar sign
			var stateName = query[i].substring(sepIdx+1);
			stateName = this._getBucketedStateName(facetName, stateName);
			if(lastFacet != facetName){
				if(i>0) result += " | ";
				result += facetName.replace(/_/g, " ")+" = "+stateName.replace(/_/g, " "); 
			}else{
				result += ", "+stateName.replace(/_/g," ");
			}
			lastFacet = facetName;
		}
		return result;
	}
	
});

return _trackingImpl;

});
