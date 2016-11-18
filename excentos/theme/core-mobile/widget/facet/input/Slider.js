define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"excentos/widget/facet/input/Slider"
],function(declare, domConstruct, Slider){
	
	return declare(
		"excentos.theme.core-mobile.widget.facet.input.Slider",
		Slider,
	{
			
		postCreate: function(){
			this.inherited(arguments);
			domConstruct.place(this.valueNode, this.slider.sliderHandle, "before");
		},
		
		refresh: function(){
			this.inherited(arguments);
			
			if(!this.answered){
				//interims solution until "facet has not been answered" text is available via API
				var notSelectedText = this.facetInGroup.facetNotSelected || this.i18n.facetNotSelected;
				notSelectedText && this.set("value", notSelectedText);
			}
		}
	});
	
});