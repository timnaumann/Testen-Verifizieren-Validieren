define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/widget/NavigationButton"
], function(declare, shared, NavigationButton){

return declare(
	"excentos.widget.facetgroup.wizard.PhaseButton",
	NavigationButton,
{
	relativeTemplatePath: "facetgroup/wizard/PhaseButton.html",

    constructor: function(){
        this.baseClass += " xc_phase_button";
    },
	
	onButtonClick: function(apiName, button){
		this.inherited(arguments);
		shared.behavior.onPhaseButtonClick(apiName, button);
	}
	
});

});
