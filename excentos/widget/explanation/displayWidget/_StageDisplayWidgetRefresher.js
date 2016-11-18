define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"excentos/shared",
	"excentos/util",
	"excentos/widget/registry",
	"./_DisplayWidgetCache"
],function(declare, lang, array, shared, util, xcRegistry, _DisplayWidgetCache){

//Mixin Class to help auto refreshing an explanation - so it gets QF driven
var Refresher = declare(	
	null, {
			
	postCreate: function(){
		this.inherited(arguments);
		
		//if there is data from StageDisplayWidgetCache - wait till initDone
		if(this.isInstanceOf(_DisplayWidgetCache)){
			this.connect(shared.behavior,"onInitDone",function(){
				this.connect(shared.behavior, "onNewAppFacetGroupVars", this.refresh);
			});
		}else {
			this.connect(shared.behavior, "onNewAppFacetGroupVars", this.refresh);
		}
		
	},
	
	refresh: function(){
		this.inherited(arguments);
		
		var currentExplainable = this.getCurrentExplainableWidget();
		var otherNearState = this.getOtherExplainableState();
		var otherExplainable = this.getOtherExplainable();
		
		if(currentExplainable){
			if(!this.isValidCurrentExplainable()){
				//check if another state of the previous facetWidget is (still) checked and `explain()` that
				otherNearState && otherNearState.explain() ||
				//if there was no other checked state, look for other answered facets within the same topic
				otherExplainable && otherExplainable.explain() ||
				//hide if there is nothing else left to display
				currentExplainable && currentExplainable.unexplain();
			}
		}else {
			otherExplainable && otherExplainable.explain();
		}
	},
	
	getCurrentExplainableWidget: function(){
		var currentEnrichment = this.enrichment;
		return currentEnrichment && currentEnrichment.enrichableWidget;
	},
	
	getOtherExplainableState: function(/*?*/ explainable){
		explainable = explainable || this.getCurrentExplainableWidget();
		if(!explainable)return null;
		
		var type = explainable.getApiType();
		var facetWidget = type=="state" && explainable.facetWidget || 
						  type=="facet" && explainable;
		
		var values = facetWidget.currentValue;
		var otherAnsweredState = values && values[values.length-1];
		var widget = otherAnsweredState && xcRegistry.byName(facetWidget.apiName+".state."+otherAnsweredState);
		if(widget && widget.isExplainable()){
			return widget;
		}
		return null;
	},
	
	getOtherExplainable: function(/*?*/ topic){
		topic = topic || this.getStageWidget();
		
		var otherAnsweredFacets = util.getAnsweredFacetWidgets(topic.apiName);
		var i=otherAnsweredFacets.length;
		while(i--){
			var facetWidget = otherAnsweredFacets[i];
			if(facetWidget.isExplainable()){
				return facetWidget;
			}
			
			var stateWidget = this.getOtherExplainableState(facetWidget);
			if(stateWidget){
				return stateWidget;
			}
		}

		return null;
	},
	
	isValidCurrentExplainable: function(){
		var currentExplainable = this.getCurrentExplainableWidget();
		if(!currentExplainable)return false;
		
		//check if current explanation should be updated
		var type = currentExplainable.getApiType();
				   // in case of enrichment derived from a `state` check if it is still in the `currentValue` list of its facetWidget
		var invalid = type=="state" && array.indexOf(currentExplainable.facetWidget.currentValue, currentExplainable.getApiElementName())==-1 ||
				   // in case it is a facet - just check if the facet is still answered
				   type=="facet" && !currentExplainable.answered;
		
		return !invalid;
	}
});

return Refresher;
});