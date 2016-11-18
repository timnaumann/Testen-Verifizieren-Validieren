define([
	"dojo/_base/declare",
	"./RowGroup"
], function(declare, RowGroup){
return declare(
	"excentos.widget.table.Header",
	RowGroup,
{
	templateString: '<thead class="xc_table_element xc_table_header"></thead>'
});

});