define([
	"dojo/_base/declare",
	"excentos/widget/facetgroup/wizard/Phase",
	"./EndGameTopic"
], function(declare, Phase){

return declare(
	"excentos.theme.core-mobile.widget.facetgroup.wizard.EndGame",
	Phase,
{
	
//	relativeTemplatePath: "facetgroup/wizard/EndGame.html", no relative Template path to allow fallback to Phase.html
	
	subFacetGroupWidgetType: "wizard.EndGameTopic",
    constructor: function(){
        this.baseClass += " xc_phase xc_endgame";
    }
	
});

});
