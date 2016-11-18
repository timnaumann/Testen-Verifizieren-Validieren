define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dijit/registry",
	"excentos/widget/registry",
	"excentos/util",
	"excentos/shared",
	"excentos/_Behavior",
	"excentos/widget/imagezoom/ImageZoom",
	"excentos/widget/imagezoom/MicroZoomView"
], function(declare, domClass, dijitRegistry, widgetRegistry, util, shared, Behavior, ImageZoom, MicroZoomView){
	
return declare("excentos.theme.core-mobile.Behavior", Behavior, {
	init: function(){
		this.initPreloader();
		this.inherited(arguments);
		this.initWizardApplication();

		var _ImageZoom = util.$(ImageZoom);
		_ImageZoom.getInstance().setView(new MicroZoomView);
		_ImageZoom.usePreloader = false;
	},
	
	onNewAppFacetGroupVars: function(){
		this.refreshFacetGroupWidgets();
		domClass.toggle(document.body, "xc_phase_explorer", this.isEndGameView());
		this.refreshStageNavigation();
		this.refreshSelectionTags();
		this.preloadLikelyImages();
	},
	
	isEndGameView: function(){
		var phase = shared.stageChangeController.getCurrentPhaseWidget();
		return phase.getApiObject().widgetType == "wizard.EndGame";
	},
	
	onNewAppRecommendations: function(){
		this.initRecommendationsWidget();
		this.refreshRecommendationsWidget();
	},
	
	//Pack refresh calls into separate functions - will be more maintainable for AOP ´arounds´
	//Having these refresh methods is recommended for any upcoming project - regarding transition handling
	refreshSelectionTags: function(){
		widgetRegistry.byWidgetClass("facetgroup.SelectionTags").forEach(function(w){
			w.isVisible() && w.refresh();
		});
	},
	
	refreshFacetGroupWidgets: function(){
		dijitRegistry.byId("xc_wizard").refresh();
	},
	
	refreshStageNavigation: function(){
		widgetRegistry.byWidgetClass("StageInPathNavigation").forEach(function(w){w.refresh();});
	},
	
	refreshRecommendationsWidget: function(){
		widgetRegistry.byWidgetClass("recommendation.Recommendations").forEach(function(w){w.refresh();});
	}

});


});
