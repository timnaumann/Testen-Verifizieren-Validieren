define([
	"dojo/_base/declare",
	"./_Widget",
	"./_ApiWidget",
	"./_Explainable",
	"./_Decoratable",
	"./_CollapsibleApiWidget",
	"./_Layout"
], function(declare, _Widget, _ApiWidget, _Explainable, _Decoratable, _CollapsibleApiWidget, _Layout){

var _ApiWidgetMixin = declare(
	[_Widget, _ApiWidget, _Explainable, _Decoratable, _CollapsibleApiWidget, _Layout],
	{
	});
return _ApiWidgetMixin;
});