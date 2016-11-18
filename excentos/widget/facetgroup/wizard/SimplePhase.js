define([
	"dojo/_base/declare",
	"./Topic"
], function(declare, Topic){

return declare(
	"excentos.widget.facetgroup.wizard.SimplePhase",
	Topic,
{
	//	summary:
	//		A facet group widget with a template so theming of phases can be done.
	//      Inherits from Topic because it represents a stage, too. 
	
	relativeTemplatePath: "facetgroup/wizard/Phase.html",

    constructor: function(){
        this.baseClass += " xc_simplephase";
    }
		
});

});
