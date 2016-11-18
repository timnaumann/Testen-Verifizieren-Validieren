// a dijit Number Spinner that is connected to an excentos calculator field
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/_Widget",
    "dijit/_Templated",
    "dijit/form/RadioButton"
], function(declare, domConstruct, _Widget, _Templated, RadioButton){

return declare("excentos.calculator.widget.RadioButton", [RadioButton], {
					
	templateString: '<div class="dijit dijitReset dijitInline" role="presentation" data-dojo-attach-point="containerNode">'+
						'<input ${!nameAttrSetting} type="${type}" ${checkedAttrSetting} class="dijitReset dijitCheckBoxInput"'+
							'data-dojo-attach-point="focusNode"'+
							'data-dojo-attach-event="onclick:_onClick"/>'+
							'<label data-dojo-attach-point="labelNode"></label>'+
					'</div>',
				
	rootNode: null,
	labelNode: null,
	
	postCreate: function(){
		this._rearrangeDOM();
	},
	
	_rearrangeDOM: function(){
		this.rootNode = domConstruct.create("div", {className:"xc_radiobutton_container", id:"test"},this.domNode, "after");
		domConstruct.place(this.domNode, this.rootNode, "first");
		domConstruct.place(this.labelNode, this.rootNode, "last");
	},
	
	_setLabelAttr: function(value){
		this.labelNode && (this.labelNode.innerHTML = value);
	},
	_getLabelAttr: function(){
		return this.labelNode && this.labelNode.innerHTML;
	}
	
});

});