define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/widget/Navigation",
	"./PhaseButton" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, shared, Navigation, PhaseButton){


var _phases;
return declare("excentos.widget.facetgroup.wizard.PhaseNavigation", Navigation, {

	navigationButtonClass: "facetgroup.wizard.PhaseButton",
	count: true,
	
	constructor: function(){
        this.baseClass += " xc_phase_navigation";
        this.data = shared.store.getFacetRootGroup();
	},

	_getNavigationDataItems: function(){
		return _phases || (_phases = shared.store.getPhases());
	}
});


	
});