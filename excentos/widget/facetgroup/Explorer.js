define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"excentos/widget/facetgroup/FacetGroup",
	"./ExplorerFacetGroup"
], function(declare, domClass, FacetGroup, ExplorerFacetGroup){

return declare(
	"excentos.widget.facetgroup.Explorer",
	FacetGroup,
{
		
	//relativeTemplatePath: "facetgroup/Explorer.html", no relative Template path to allow fallback to FacetGroup.html
	
	subFacetGroupWidgetType: "ExplorerFacetGroup",

	constructor: function(){
		this.baseClass += " xc_explorer";
	},
	
	_createFacetInGroupWidget: function(facetInGroup){
		var widget = this.inherited(arguments);
		domClass.add(widget.domNode, "xc_explorer_facet");
		return widget;
	}
});

});
