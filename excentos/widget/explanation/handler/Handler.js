define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"excentos/Stateful",
	"excentos/shared",
	"../displayWidget/OverlayDisplayWidget" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, lang, xcStateful, shared, OverlayDisplayWidget){

return declare("excentos.widget.explanation.handler.Handler", xcStateful, {
	//	_displayWidget: excentos._Widget
	//		the widget that displays the explanation
	displayWidget: null,
	currentExplainable: null,
	displayWidgetType: "explanation.displayWidget.OverlayDisplayWidget",

	constructor: function(){
		this.watch("currentExplainable", lang.hitch(this, "onCurrentExplainableChanged"));
	},
	
	show: function(/*excentos.wiget._Explainable*/ explainable){
		this.set("currentExplainable", explainable);
	},
	hide: function(/*excentos.wiget._Explainable*/ explainable){
		this.set("currentExplainable", null);
	},
	
	showEnrichment: function(/*excentos.widget.enrichment.EnrichmentWidget*/ enrichment){
		//	summary:
		//		fetch the explanation content and pass it to the
		//		explanation widget and show it
		var displayWidget = this.get("displayWidget");
		if(displayWidget){
			displayWidget.set("enrichment", enrichment);
			displayWidget.show();
		}
	},
	
	hideEnrichment: function(/*excentos.widget.enrichment.EnrichmentWidget*/ enrichment){
		
		//currentExplainable may have been unset - so hide the referenced 
		var displayWidget = this.get("displayWidget");
		if(displayWidget){
			//displayWidget.set("enrichment", null); cant really decide who is in charge of removing the reference - seems more handy if displayWidget does
			displayWidget.hide();
		}
	},
	
	onCurrentExplainableChanged: function(propertyName, oldExplainable, newExplainable){
		this.updateTrigger(oldExplainable, newExplainable);
		this.updateDisplayWidget(oldExplainable, newExplainable);
	},
	
	updateTrigger: function(oldExplainable, newExplainable){
		oldExplainable && oldExplainable.set("explanationTriggered", false);
		newExplainable && newExplainable.set("explanationTriggered", true);
	},
	
	updateDisplayWidget: function(oldExplainable, newExplainable){
		var enrichment = this.getEnrichmentByExplainable(newExplainable||oldExplainable);
	
		newExplainable ?
			this.showEnrichment(enrichment):
			this.hideEnrichment(enrichment);
	},
	
	getEnrichmentByExplainable: function(explainable){
		//serves as override point
		return explainable.getExplanationWidget();
	},
	
	
	_getDisplayWidgetAttr: function(){
		//	summary:
		//		fetch the explanation widget and return it
		
		return	this.displayWidget ||
				(this.displayWidget = this._createDisplayWidget());
	},
	
	_createDisplayWidget: function(){
		//	summary:
		//		explanation widgets should be singletons in most cases
		//		so check for the existence in the DOM or
		//		create one and set the protected
		//		_displayWidget property to the fetched
		//		or created widget
		//	tags:
		//		protected
		return shared.widgetFactory.makeWidget(this.get("displayWidgetType"));
	}
	
});

});
