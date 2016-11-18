// a dijit Number Spinner that is connected to an excentos calculator field
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/number",
    "dojo/store/Memory",
    "dojo/dom-class",
    "dijit/form/Select",
	"excentos/calculator/widget/_FieldInputWidget",
	"./_Explainable"
], function(declare, lang, number, Memory, domClass, Select, _FieldInputWidget, _Explainable){

return declare("excentos.calculator.widget.Select", [Select, _FieldInputWidget, _Explainable], {

	forceWidth: true, //force the dropdown to be as wide as the widget itself
	
	postMixInProperties: function(){
		this._setupAutofill();
		this.inherited(arguments);
	},
	
	_setupAutofill: function(){
		var options = [];
    	if(this.minimum != undefined && this.maximum != undefined){
    		this.discreteValues == undefined && (this.discreteValues = this.maximum-this.minimum +1);
    		
    	
    		var fractions = (this.maximum-this.minimum) / (this.discreteValues-1);
    		for(var i=0, l=this.discreteValues; i<l; ++i){
    			var value = (this.minimum + fractions * i);
    			options.push({value: value, label: this.formatValue(value)});
    		}
    		
    		
    	}else if(this.values){
    		for(var i=0, l=this.values.length; i<l; ++i){
    			var value = this.values[i];
    			options.push({value: value, label: this.formatValue(value)});
    		}
    	}
    	this.options = options;
	},
	
	postCreate: function(){
		this.inherited(arguments);
		domClass.add(this.domNode, "xc_select");
	}
	
});

});