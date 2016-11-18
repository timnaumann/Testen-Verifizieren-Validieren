define([
	"dojo/_base/declare",
	"./_TableContainer"
], function(declare, _TableContainer){

return declare(
	"excentos.widget.table.Table",
	_TableContainer,
{
	templateString: '<table class="xc_table"></table>'
});

});
