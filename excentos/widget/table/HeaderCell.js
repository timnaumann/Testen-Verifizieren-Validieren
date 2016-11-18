define([
	"dojo/_base/declare",
	"./Cell"
], function(declare, Cell){

return declare(
	"excentos.widget.table.HeaderCell",
	Cell,
{
	templateString: '<th class="xc_table_element xc_table_header_cell">\
						<span class="xc_label xc_table_cell_label" data-dojo-attach-point="labelNode">${label}</span>\
					</th>',
	
	productWidget: null,
	
	setProductWidgetAttr: function(widget){
		if(this.productWidget != widget){
			this.productWidget.destroyRecursive();
			this.productWidget = widget;
			this.addChild(widget);
		}
	}
});

});