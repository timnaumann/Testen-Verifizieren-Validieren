define([
	"dojo/_base/declare",
	"./Row"
], function(declare, Row){

return declare(
	"excentos.widget.table.HeaderRow",
	Row,
{
	templateString: '<tr class="xc_table_element xc_table_header_row">\
						<th class="xc_label xc_table_headerrow_label" data-dojo-attach-point="labelNode">${label}</th>\
					</tr>'
});

});
