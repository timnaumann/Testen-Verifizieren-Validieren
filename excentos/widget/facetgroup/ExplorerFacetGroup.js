define([
	"dojo/_base/declare",
	"excentos/widget/facetgroup/FacetGroup"
], function(declare, FacetGroup){

return declare(
	"excentos.widget.facetgroup.ExplorerFacetGroup",
	FacetGroup,
{
		
//	relativeTemplatePath: "facetgroup/ExplorerFacetGroup.html", no relative Template path to allow fallback to FacetGroup.html
	
	subFacetGroupWidgetType: "FacetGroup",

    constructor: function(){
        this.baseClass += " xc_explorer_facetgroup";
    }
});

});
