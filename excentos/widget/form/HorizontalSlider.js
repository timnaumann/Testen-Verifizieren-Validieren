define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/has",
	"dojo/touch",
	"dojo/on",
	"dojo/dom-geometry",
	"dijit/focus",
	"dijit/form/HorizontalSlider",
	"../_Templated"
], function(declare, lang, has, touch, on, domGeometry, focus, HorizontalSlider, _Templated){

function touchClick(node, listener){
	//summary:
	//	in touch environments create a click compliant event via "touchstart" and "touchend"
	
	return !has("touch") ?
			on(node, "click", listener) : 
			on(node, "touchstart", function(){
				var handle = on.once(node, "touchend", listener);
				on.once(node, "touchmove", function(e){
					//consider a threshold 
					handle.remove();
				});
			});
}
	
return declare("excentos.widget.form.HorizontalSlider", HorizontalSlider, {
	
	//	showButtons: Boolean
	//		Overwrite default `true` of `dijit.form.HorizontalSlider`.
	showButtons: false,
	
	//	scrollOnFocus: Boolean
	//		Overwrite default `true` of `dijit.form._FormWidgetMixin`.
	scrollOnFocus: false,
	
	slideDuration: 0,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.templateString = _Templated.prototype.getTemplate.call(this) || this.templateString;
	},
	
	postCreate: function(){
		this.inherited(arguments);
		
		on(this.sliderHandle, touch.press, lang.hitch(this, this._onHandleClick));
		on(this.progressBar, touchClick, lang.hitch(this, this._onBarClick));
		on(this.remainingBar, touchClick, lang.hitch(this, this._onBarClick));
	},
	
	_onHandleClick: function(e){
		this._movable.onMouseDown(e);
		this.inherited(arguments);
	},
	
	_onBarClick: function(e){
		// summary:
		//	basically a copy of dijit.form.HorizontalSlider, 
		//	except it will not focus the handle when the bar is clicked
		
		if(this.disabled || this.readOnly || !this.clickSelect){
			return;
		}
		//focus.focus(this.sliderHandle);
		e.stopPropagation();
		e.preventDefault();
		var abspos = domGeometry.position(this.sliderBarContainer, true);
		var pixelValue = e[this._mousePixelCoord] - abspos[this._startingPixelCoord];
		this._setPixelValue(this._isReversed() ? (abspos[this._pixelCount] - pixelValue) : pixelValue, abspos[this._pixelCount], true);
		//this._movable.onMouseDown(e);
	},
	
	_setValueAttr: function(value, priorityChange){
		//	summary:
		//		sets the current value of the slider
		//		added support for before value is changed callback
		//	see: dijit.form._FormWidget._setValueAttr
		
		this.onBeforeCurrentValueChange(value);
		this.inherited(arguments);
	},
	
	_mouseWheeled: function(){
		// summary: Disable mouse wheel interaction.
		//this.focused && this.inherited(arguments);
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
