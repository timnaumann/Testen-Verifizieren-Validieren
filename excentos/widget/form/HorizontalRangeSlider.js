define([
	"dojo/_base/declare",
	"dojox/form/HorizontalRangeSlider"
], function(declare, HorizontalRangeSlider){


return declare("excentos.widget.form.HorizontalRangeSlider", HorizontalRangeSlider, {
	
	minimum: 0,

	//	showButtons: Boolean
	//		Overwrite default `true` of `dijit.form.HorizontalSlider`.
	showButtons: false,
	
	//	scrollOnFocus: Boolean
	//		Overwrite default `true` of `dijit.form._FormWidgetMixin`.
	scrollOnFocus: false,
	
	_mouseWheeled: function(){
		// summary: Disable mouse wheel interaction.
	},
	
	_setValueAttr: function(/*Number*/ value, /*Boolean?*/ priorityChange, /*Boolean?*/maxValue){
		//	summary:
		//		sets the current value of the slider
		//		added support for before value is changed callback
		//	see: dijit.form._FormWidget._setValueAttr
		if(false !== this.onBeforeCurrentValueChange(value, priorityChange, maxValue)) {
			this.inherited(arguments);
		}
	},
	
	onBeforeCurrentValueChange: function(newValue){
		//	summary:
		//		Callback that is called every time the value of the slider changes
		//		If the user moves the slide handle we have a callback for slider step, even if 
		//		intermediateChanges is set to false.
		//		This does not affect the final onChange event.
		//		This has become necessary since we want to display the current value
		//		but only want to submit the final one to the service!
	}
});

});
