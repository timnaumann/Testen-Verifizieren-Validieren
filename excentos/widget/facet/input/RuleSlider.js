define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dijit/form/HorizontalRule",
	"./Slider"
], function(declare, domConstruct, HorizontalRule, Slider){
	
var RuleSlider = declare(
	"excentos.widget.facet.input.RuleSlider",
	Slider,
{
	_createStateWidgets: function(){
		//	summary:
		//  see Slider; this adds a ruler with one tick per state.
		//  (left out in the default not to bloat the DOM)

		if(!this.slider){
			var rulesNode = domConstruct.create("div", {}, this.sliderNode);

			this.inherited(arguments); // including startup of slider and Labels 

			var sliderRules = new HorizontalRule({
				container: this.decorationNode,
				count: this.usedStates.length
			}, rulesNode);
						
			sliderRules.startup();
		}
	}	
});

return RuleSlider;
});
