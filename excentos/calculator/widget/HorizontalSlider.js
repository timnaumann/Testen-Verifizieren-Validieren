// implement me
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/form/HorizontalSlider",
	"excentos/calculator/widget/_FieldInputWidget"
], function(declare, domConstruct, HorizontalSlider, _FieldInputWidget){

return declare("excentos.calculator.widget.HorizontalSlider", [HorizontalSlider, _FieldInputWidget], {

	intermediateChanges: true,
	showButtons: false,
	labelNodeTarget: 'sliderHandle',
	
	setupLabelNode: function(){
		this.labelNode = this.inherited(arguments) || domConstruct.toDom("<div class='xc_label'></div>");
	},
	
	postCreate: function(){
		this.inherited(arguments);
		
		var targetNode = this[this.labelNodeTarget];
		targetNode && domConstruct.place(this.labelNode, targetNode);
	}
});

});