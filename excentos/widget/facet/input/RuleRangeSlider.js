define([
   	"./RangeSlider",
   	"./RuleSlider",
	"dijit/form/HorizontalRule"
], function(RangeSlider, RuleSlider, HorizontalRule){	
	
var RuleRangeSlider = declare(
	"excentos.widget.facet.input.RuleRangeSlider",
	RangeSlider,
{
	
	_createStateWidgets: RuleSlider.prototype._createStateWidgets
	
});

return RuleRangeSlider;
});
