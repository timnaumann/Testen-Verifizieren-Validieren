define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"excentos/shared",
	"../FacetGroup",
	"./SimplePhase",
	"./PhaseButton"
], function(declare, array, shared, FacetGroup){

return declare(
	"excentos.widget.facetgroup.wizard.SimpleWizard",
	FacetGroup,
{
	relativeTemplatePath: "facetgroup/wizard/Wizard.html",
	
	subFacetGroupWidgetType: "wizard.SimplePhase",
		
	constructor: function(){
		this._phaseButtons = [];
	},
	
	postCreate: function(){
		// Create navigation first as `refresh` is called by the inherited `postCreate`.
		//deprecated	
		this._createNavigation();
		this.inherited(arguments);
	},
	
	//TODO create Navigation > PhaseNavigation, TopicNavigation Widgets
	_createNavigation: function(){
		// Navigation widgets are only created if attach point `navigationNode` is present.
		// This way we can easily switch navigation on and off in the theme.
		if(this.navigationNode){
			var store = shared.store;
			var phases = store.getOrderedFacetGroupsByName(this.facetGroup.name);
			array.forEach(phases, function(phase, idx){
				var widget = shared.widgetFactory.makeWidget(
					"facetgroup.wizard.PhaseButton",
					{
						facetGroup: phase,
						id: "xc_wizard_phase" + (idx + 1) + "_button"
					}
				);
				widget.placeAt(this.navigationNode);
				this._phaseButtons.push(widget);
			}, this);
		}
	},
	
	refresh: function(){
		this.inherited(arguments);
		this.refreshNavigation();
	},
	
	refreshNavigation: function(){
		// Find first and last visible phase button.
		var firstPhaseButton = null,
			lastPhaseButton  = null;
		
		array.forEach(this._phaseButtons, function(phaseButton){
			var vars = phaseButton.getApiVars();
			if(vars.visible){
				if(firstPhaseButton === null){
					firstPhaseButton = phaseButton;
				}
				lastPhaseButton = phaseButton;
			}
		});
		// Refresh all phase buttons.
		array.forEach(this._phaseButtons, function(phaseButton){
			phaseButton.set("first", phaseButton == firstPhaseButton);
			phaseButton.set("last", phaseButton == lastPhaseButton);
			phaseButton.refresh();
		});
	}
	
});

});
