define([
	"dojo/_base/declare",
	"./_TableContainer"
], function(declare, _TableContainer){

return declare(
	"excentos.widget.table.Row",
	_TableContainer,
{
	templateString: '<tr class="xc_table_element xc_table_row" data-dojo-attach-point="containerNode">\
						<th class="xc_label xc_table_row_label" data-dojo-attach-point="labelNode">${label}</th>\
					</tr>'
});

});