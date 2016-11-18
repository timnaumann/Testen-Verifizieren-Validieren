define([
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"./_Templated",
	"./_TemplatedVariableHandler"
], function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, _Templated, _TemplatedVariableHandler){

return declare(
	"excentos.widget._TemplatedMixin",
	[_TemplatedMixin, _WidgetsInTemplateMixin, _Templated, _TemplatedVariableHandler],
{
});

});
