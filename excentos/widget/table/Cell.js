define([
	"dojo/_base/declare",
	"./_TableElement"
], function(declare, _TableElement){

return declare(
	"excentos.widget.table.Cell",
	_TableElement,{
	
	templateString: '<td class="xc_table_element xc_table_cell" data-dojo-attach-point="containerNode">\
						<span class="xc_label xc_table_cell_label" data-dojo-attach-point="labelNode">${label}</span>\
					</td>'
});

});