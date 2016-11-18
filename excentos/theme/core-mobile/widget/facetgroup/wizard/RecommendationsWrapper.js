define([
	"dojo/_base/declare",
	"excentos/widget/facetgroup/FacetGroup"
], function(declare, FacetGroup){

return declare(
	"excentos.theme.core-mobile.widget.facetgroup.wizard.RecommendationsWrapper",
	FacetGroup,
{
    constructor: function(){
        this.baseClass += " xc_facetgroup_recommendation_wrapper";
    }
});

});