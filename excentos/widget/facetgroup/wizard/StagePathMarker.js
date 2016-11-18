define([
	"excentos/util",
	"excentos/StageChangeController",
	"dojo/topic",
	"dojo/_base/lang",
	"dojo/dom-class",
	"excentos/Stateful",
	"excentos/shared",
	"excentos/widget/registry"
], function(util, StageChangeController, topic, lang, domClass, xcStateful, shared, xcRegistry){
	
	var PathMarks = new xcStateful({
		"previous": null,
		"current": null,
		"next": null,
		reset: function(){
			this.set({previous:null,current:null,next:null});
		}
	});
	
	var PathMap = [
		{name:"current",	ref:"currentStageInView"},
		{name:"previous",	ref:"previousStageInPath"}, 
		{name:"next", 		ref:"nextStageInPath"}
	];

	//Keep in mind, this is a baseless static class, that updates stageWidgets by itself
	var StagePathMarker = {
		declaredClass: "excentos.widget.facetgroup.wizard.StagePathMarker",
		baseClass: " xc_stagepath",

		_init: function(){
			PathMarks.watch(lang.hitch(this, "onChange"));
		},

		getIntermediateMode: function(){
			return !!this.__intermediateMode;
		},
				
		refresh: function(){
			//NOTE: remove all applied classes first, and re-apply the new ones
			this.reset();
			var fgvars = this.determineStagePathState();
			
			var stageName, stageWidget, markName, markNameSet = {};
			for(var i=0,l=PathMap.length; i<l; i++){
				markName = PathMap[i].name;
				stageName = fgvars[PathMap[i].ref];
				stageWidget = (stageName && xcRegistry.byName(stageName)) || null;

				markNameSet[markName] = stageWidget;
				
			}
			PathMarks.set(markNameSet);
		},

		determineStagePathState: function(){
			//return the current state of the stage path, usually incorporating the facetgroup vars
			// { currentStageInView: 'apiName', previousStageInPath: 'apiName', nextStageInPath: 'apiName'}

			var fgVars = shared.store.getFacetGroupVars(),
				obj = {
					previousStageInPath: fgVars.previousStageInPath,
					currentStageInView: fgVars.currentStageInView,
					nextStageInPath: fgVars.nextStageInPath
				};
			if(this.__intermediateMode){
				obj.currentStageInView = util.$(StageChangeController).getInstance().getStageChangeObject().current.stageWidget.apiName;
			}
			return obj;
		},
		
		onChange: function(markName, oldValue, newValue){
			oldValue && this._updateCss(markName, oldValue, false);
			newValue && this._updateCss(markName, newValue, true);
		},
		
		_updateCss: function(markName, stageWidget, addClass){
			var stageNode = stageWidget.domNode, 
				cssClass = this._getCssClass(markName);
			
			domClass.toggle(stageNode, cssClass, addClass);
		},
		
		_getCssClass: function(/*String*/ markName){
			return this.baseClass + (markName ? " "+this.baseClass+"_"+markName : "");
		},
		
		reset: function(){
			PathMarks.reset();
		},
		
		getMarks: function(){
			return PathMarks;
		},

		setIntermediateMode: function(bool){
			this.__intermediateMode = bool;
			if(bool){
				this.__intermediateRefreshHandler = topic.subscribe(StageChangeController.SIGNAL_MOVE_TO_STAGE, lang.hitch(this,this._handleMoveToStage));
			}else {
				this.__intermediateRefreshHandler && this.__intermediateRefreshHandler.remove();
			}
		},

		_handleMoveToStage: function(){
			this.refresh();
		},

		debug: function(){
			var result = {};
			var props = ["previous","current","next"];
			props.forEach(function(prop){
				var widget = PathMarks[prop];
				result[prop] = widget ? widget.apiElementName : "";
			});

			console.log(result);
		}
	};
	StagePathMarker._init();
	
	
	return StagePathMarker;
});
