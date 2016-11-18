define([
	"dojo/_base/declare",
	"./SimpleWizard",
	"./Phase"
], function(declare, SimpleWizard){

	return declare(
		"excentos.widget.facetgroup.wizard.Wizard",
		SimpleWizard,
		{

			subFacetGroupWidgetType: "wizard.Phase"

		});

});
