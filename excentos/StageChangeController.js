define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"dojo/dom",
	"./widget/registry",
	"./aspect",
	"./shared",
	"./Singleton"
], function(declare, lang, topic, dom, xcRegistry, xcaspect, shared, Singleton){

	
var store=null;
var phaseDetectorRegex=null;

var StageChangeController = Singleton(declare(
	"excentos.StageChangeController",
	null,
	{	
		//_STAGE_CHANGE_OBJECT: Object
		//	An object that represents the recent stage change
		//	tags: private static
		//
		//	_STAGE_CHANGE_OBJECT = {
		//		phaseNumberDifference: Number,
		//		current: _STAGE_INFORMATION,
		//		previous: _STAGE_INFORMATION
		//		direction: Number
		//	}
		_STAGE_CHANGE_OBJECT: {},
		
		//_STAGE_CHANGE_OBJECT_CACHE: Object
		//	Caches each stage change by fromStageName>toStageName
		//	tags: private static
		//
		//	_STAGE_CHANGE_OBJECT_CACHE = {
		//		"{fromStageName}>{toStageName}": _STAGE_CHANGE_OBJECT
		//	}
		//
		//	_STAGE_CHANGE_OBJECT_CACHE["xcAjaxClient.wizard.Phase2.advisor_topics>xcAjaxClient.wizard.Phase3.convenience_comfort.convenience_comfort"]
		_STAGE_CHANGE_OBJECT_CACHE: {},
		
		//_STAGE_INFORMATION_CACHE: Object
		//	Caches each stage change by fromStageName>toStageName
		//	tags: private static
		//
		//	_STAGE_INFORMATION_CACHE = {
		//		name: String,
		//		stageWidget: excentos.widget._Widget,
		//		stageNode: HTMLELement,
		//		phaseName: String,
		//		phaseNumber: Number,
		//		phaseNode: HTMLElement
		//	};
		_STAGE_INFORMATION_CACHE: {},
		
		SIGNAL_MOVE_TO_STAGE: "/app/ajaxClient/onMoveToStage",
		SIGNAL_STAGE_CHANGED: "/app/ajaxClient/onStageChanged",
		_idx: null,
		rootGroupName: "",
		
		constructor: function(){
			this._idx = {
				phaseOrderByName: {},
				phaseOrderByIndex: []
			};
			StageChangeController._instance = this;
			store = shared.store;
			this._applyEventHandlers();
			
			//initialization starts after widgets have been built - otherwise it would lead to null references in STAGE_INFORMATION_CACHE
			xcaspect.after.once(shared.behavior, "init", this.init, this);
		},	
		
		_applyEventHandlers: function(){
			// summary: 
			//		sets the default event listeners
			// tags: override
			this.inherited(arguments);
			
			//store short reference to excentos.Behavior
			var b = shared.behavior;
			
			//the router helps in detecting whether a stage actually changed
			topic.subscribe("/app/ajaxClient/router/onStageChanged", lang.hitch(this,"onStageChanged"));

			//define the events on which the Transition should be started
			xcaspect.before(b, "moveToNextStageInPath", 	function(){				this.onMoveToStage("moveToNextStageInPath");}, 					this);
			xcaspect.before(b, "moveToPreviousStageInPath", function(){				this.onMoveToStage("moveToPreviousStageInPath");}, 				this);
			xcaspect.before(b, "moveToAccessibleStage", 	function(stageName){	this.onMoveToStage("moveToAccessibleStage", stageName);}, 		this);
			xcaspect.before(b, "onRestart", 				function(){				this.onMoveToStage("resetProfile");}, 							this);
		},
		
		init: function(){
			this.rootGroupName = shared.store.getFacetGroups().facetRootGroup.name;
			phaseDetectorRegex = new RegExp(this.rootGroupName+"\.[a-z0-9_]+","i");
			
			this._writeIndex();
			this.setStageChangeObject(this.getStageChange());
		},
		
		_writeIndex: function(){
			var fgs = store.getOrderedFacetGroupsByName(this.rootGroupName), fg;
			var i = fgs.length;
			
			while(i-->0){
				fg = fgs[i];
				this._idx.phaseOrderByName[fg.name] = i;
				this._idx.phaseOrderByIndex[i] = fg;
				
				!this._idx.phaseOrderByIndex["last"] && (this._idx.phaseOrderByIndex["last"]=fg);
				i==0 && (this._idx.phaseOrderByIndex["first"]=fg);
			}
		},
		
		onMoveToStage: function(/*String*/ controllerMethodName, /*String*/ stageName){
			// tags: StageTransition
			var s = this.predictStageChangeObject(controllerMethodName, stageName);
			topic.publish(this.SIGNAL_MOVE_TO_STAGE,s);
		},
		
		/********** stageChangeObject Functions ***********/
		
		onStageChanged: function(){
			var s = this.getStageChange();
			this.setStageChangeObject(s);
			//TODO: find proper event name
			topic.publish(this.SIGNAL_STAGE_CHANGED,s);
		},
		
		predictStageChangeObject: function(controllerMethodName, /*String*/ stageName){
			var s = {};
			var facetGroupVars = store.getFacetGroupVars();
			var currentStage = facetGroupVars.currentStageInView;
			switch(controllerMethodName){
				case "moveToAccessibleStage":
					s = this.getStageChange(currentStage, stageName);
				break;
				case "moveToNextStageInPath":
					s = this.getStageChange(currentStage, facetGroupVars.nextStageInPath);
				break;
				case "moveToPreviousStageInPath":
					s = this.getStageChange(currentStage, facetGroupVars.previousStageInPath);
				break;
				case "resetProfile":
					s = this.getStageChange(currentStage, this._idx.phaseOrderByIndex["first"].name);
				break;
				default:
					throw new Error(this.declaredClass+"::"+arguments.callee.nom+"() ´controllerMethodName´ "+controllerMethodName+" could not be handled");
			}
			this.setStageChangeObject(s);
			
			return s;
		},
		
		getCurrentStageName: function(){	
			return shared.router.getCurrentStage() || store.getFacetGroupVars().currentStageInView || "";
		},
		getPreviousStageName: function(){
			return shared.router.getPreviousStage() || "";
		},

		getCurrentStageNode: function(){		
			return this.getNodeByName(this.getCurrentStageName());
		},
		getPreviousStageNode: function(){
			return this.getNodeByName(this.getPreviousStageName());
		},

		getCurrentStageWidget: function(){
			return this.getWidgetByName(this.getCurrentStageName());
		},
		getPreviousStageWidget: function(){			
			return this.getWidgetByName(this.getPreviousStageName());
		},

		getCurrentPhaseNumber: function(){
			return this.getPhaseNumberFromName(this.getCurrentPhaseName());
		},
		getPreviousPhaseNumber: function(){
			return this.getPhaseNumberFromName(this.getPreviousPhaseName());
		},

		getCurrentPhaseName: function(){
			return this.extractPhaseName(this.getCurrentStageName());
		},
		getPreviousPhaseName: function(){
			return this.extractPhaseName(this.getPreviousStageName());
		},

		getCurrentPhaseWidget: function(){
			return this.getCurrentPhase(true);
		},
		getPreviousPhaseWidget: function(){
			return this.getPreviousPhase(true);
		},

		getCurrentPhase: function(/*boolean*/ returnWidget){
			var getter = returnWidget ? this.getWidgetByName : this.getNodeByName;
			return getter.call(this,this.getCurrentPhaseName());
		},
		getPreviousPhase: function(/*boolean*/ returnWidget){
			var getter = returnWidget ? this.getWidgetByName : this.getNodeByName;
			return getter.call(this,this.getPreviousPhaseName());
		},
		
		extractPhaseName: function(name){
			if(!name || (typeof name!="string"))return "";
			var phase = name.match(phaseDetectorRegex);
			return phase && phase[0];
		},
		
		getPhaseNumberFromName: function(name){
			if(!name || (typeof name!="string"))return NaN;
			var phaseName = this.extractPhaseName(name);
			var n = this._idx.phaseOrderByName[phaseName];
			
			//if we get null or undefined  return NaN instead
			return !isNaN(n) ? n : NaN;
		},
		
		//TBD util / store function ?
		getNodeByName: function(name){
			return this.getReferenceByName(name,"DOM");
		},
		getWidgetByName: function(name){
			return this.getReferenceByName(name,"widget");
		},
		getReferenceByName: function(name,type){
			// tags: StageTransition
			if(!name)return null;
			
			type = type || "widget";
			var widget = xcRegistry.byName(name);
			if(!widget){
				console.warn(this.declaredClass+"::"+arguments.callee.nom+"()\nreference of ´"+name+"´could not be found")
			}
			return type=="widget" ? widget : widget && widget.domNode;
		},
		getParentsByName: function(name,type){
			if(!name)return [];
			var parents = [];
			var parts = name.split(".");
			var parentName = "";
			var ref = null;
			
			var root = this.rootGroupName;
			
			do {
				ref && parents.push(ref);
				parts = parts.slice(0,-1);
				parentName = parts.join(".");
			}
			while(parentName!=root && (ref = this.getReferenceByName(parentName,type)))
			
			return parents;
		},
		
		getStageInformation: function(stageName){
			// summary:
			//		returns the STAGE_INFORMATION for a specific stage
			var knowninfo = this.getStageInformationCache(stageName);
			if(knowninfo){
				return knowninfo;
			}
			var stageWidget = this.getWidgetByName(stageName);
			var phaseName = this.extractPhaseName(stageName);
			//TODO: number works on flat root level only; 
			//		get tree index  -> convert to integer
			//		like first phase, first stage, first nested stage, first facet -> [0][0][0][0]
			//		we need to know the max depth of the tree
			//		(i0..max + 1)*100^imax..0
			//		100100100100D -> 174e6e5004H
			var phaseNumber = this.getPhaseNumberFromName(stageName);
			
			var phaseWidget = this.getWidgetByName(phaseName);
			var information = {	
				phaseNumber: phaseNumber,
				phaseWidget: phaseWidget,
				stageWidget: stageWidget
			};
			this.setStageInformationCache(information);
			return information;
		},

		getDirection: function(/*String*/ fromStageName, /*String*/ toStageName){
			//check if `fromStageName` and `toStageName` are given - else automation will try to detect one or both
			var isAutomatic = !(fromStageName && toStageName);
			
			//the currently seen Stage
			var c = toStageName || this.getCurrentStageName();
			//the previously seen Stage
			var p = fromStageName || this.getPreviousStageName();
			
			var direction = NaN;
			var facetGroups = null;
			var current = this.getStageInformation(c),
				previous = this.getStageInformation(p),
				phaseDifference = current.phaseNumber-previous.phaseNumber;
			
			// if the currentPhaseNumber is higher then the previousPhaseNumber we are going forwards
			if(phaseDifference!=0){
				direction = phaseDifference < 0 ? -1 : 1;
			}
			else {
				//	check if 
				//		getPreviousStageName()==facetGroupVars.previousStageInPath ==means==> direction 1
				//		- if the previously seen stage was the previous stage in path we are ´moving´ in a forward direction
				//			 
				//		getPreviousStageName()==facetGroupVars.nextStageInPath ==means==> direction -1
				//		- if the previously seen stage was the next stage in path we are ´moving´ in a backward direction
				if(isAutomatic){
					var facetGroupVars = store.getFacetGroupVars();
					if(p == facetGroupVars.previousStageInPath){
						direction = 1;
					}
					if(p == facetGroupVars.nextStageInPath){
						direction = -1;
					}
				}
					
				if(!direction){	
					// if the previously seen stage was neither the next nor the previous stage in view relative to the current stage
					//	get all groups within the current phase and compare the ordered indexes against each other.
					
					//	first test if the previous phase is the first one in the facetgroups list.
					//	If thats the case we can be sure that we are in a forward direction as long the phase hasnt changed
					facetGroups = store.getOrderedFacetGroupsByNameRecursive(current.phaseWidget.apiName);
					if(facetGroups[0] && p==facetGroups[0].name)direction=1;
				
					
					if(!direction){
						//if we are unlucky we will have to check the whole facetGroups tree and compare the ordered positions 
						//of the currentStage vs the one from the previousStage
						
						//						 					 	 search in  ,for value  ,in property,	return index	
						var indexPrevious = excentos.util.isValueInArray(facetGroups,p			,"name"		,	true);
						var indexCurrent  = excentos.util.isValueInArray(facetGroups,c			,"name"		,	true);
						
						direction = indexCurrent-indexPrevious < 0 ? -1 : 1;
					}
				}
			}
			
			return direction;
		},
		isKnownChangeObject: function(/*String*/ fromStageName, /*String*/ toStageName){
			// summary: 
			//		check if the requested information are already provided in the current STAGE_CHANGE_OBJECT
			var knownObj = this.getStageChangeObjectCache(fromStageName,toStageName);
			return knownObj ? knownObj : false;
		},

		getStageChange: function(/*String*/ fromStageName, /*String*/ toStageName){
			//the currently seen Stage
			var c = toStageName || this.getCurrentStageName();
			//the previously seen Stage
			var p = fromStageName || this.getPreviousStageName();
			
			var knownObj = this.isKnownChangeObject(p,c);
			if(knownObj){return knownObj;}
			
			var current = this.getStageInformation(c),
				previous = this.getStageInformation(p),
				phaseDifference = current.phaseNumber-previous.phaseNumber;
			
			var prevStageName = previous.stageWidget && previous.stageWidget.apiName;
			var curStageName = current.stageWidget && current.stageWidget.apiName;
			var direction = this.getDirection(prevStageName, curStageName);

			return {
				phaseNumberDifference: phaseDifference,
				current: current,
				previous: previous,
				direction: direction
			};
		},
		setStageChangeObject: function(obj){
			if(this.getStageChangeObject() != obj){
				this.setStageChangeObjectCache(obj);
				this._STAGE_CHANGE_OBJECT = obj;
			}
		},
		getStageChangeObject: function(){
			return this._STAGE_CHANGE_OBJECT;
		},
		getStageChangeObjectCache: function(/*String*/ fromStageName, /*String*/ toStageName){
			if(typeof toStageName == "string" && typeof fromStageName == "string"){
				return this._STAGE_CHANGE_OBJECT_CACHE[fromStageName+">"+toStageName];
			}
			return this._STAGE_CHANGE_OBJECT_CACHE;
		},
		setStageChangeObjectCache: function(obj){
			var prevStageName = obj.previous.stageWidget && obj.previous.stageWidget.apiName;
			var curStageName = obj.current.stageWidget && obj.current.stageWidget.apiName;
			
			var fromStageName = prevStageName;
			var toStageName = curStageName;
			this._STAGE_CHANGE_OBJECT_CACHE[fromStageName+">"+toStageName] = obj;
		},
		getStageInformationCache: function(nameOrObj){
			//summary: returns the stage change information cache
			
			var s = this._STAGE_INFORMATION_CACHE;
			if(typeof nameOrObj == "string"){
				return s[nameOrObj];
			}
			if(typeof nameOrObj == "object" && nameOrObj.name) {
				return s[nameOrObj.name];
			}
			return s;
		},
		setStageInformationCache: function(nameOrObj,value){
			
			var s = this._STAGE_INFORMATION_CACHE;
			if(typeof nameOrObj == "string"){
				s[nameOrObj]=value;
			}
			if(typeof nameOrObj == "object" && nameOrObj.name) {
				s[nameOrObj.name]=nameOrObj;
			}
		}
	}
));

StageChangeController.SIGNAL_MOVE_TO_STAGE = StageChangeController.prototype.SIGNAL_MOVE_TO_STAGE;
StageChangeController.SIGNAL_STAGE_CHANGED = StageChangeController.prototype.SIGNAL_STAGE_CHANGED;
return StageChangeController;

});
