// a minimalistic widget to display the current value of a field in an arbitrary HTML element
// <span dojoType="excentos.calculator.FieldValueWidget" field="testCalc.usr_netHourlyWorkingCost"></span>
// optionally provide "pattern" attribute for number formatting

define([
   	"dojo/_base/declare",
   	"dojo/_base/lang",
   	"dojo/_base/connect",
   	"dojo/dom-class",
	"dojo/number",
	"dijit/_Widget",
	"excentos/shared",
	"./_FieldInputWidget"
], function(declare, lang, connect, domClass, number, _Widget, shared, _FieldInputWidget){

return declare("excentos.calculator.widget.FieldValueWidget", [_Widget], {

	// that's what it's all about:
	field: null,
	
	// default number format (unicode)
	pattern: "#,##0.##",
	
	// load only if a central parameter ist set?
	lazy: false,

	// override (not important):
	buildRendering: function(){
		// make it a span by default, not a div.
		this.domNode = this.srcNodeRef || document.createElement("span");
	},
	
	showValue: function(value){
		if(this.lazy && shared.store.getConfigByKey("forceFieldValueDisplayUpdate")){
			this._doShowValue(value);
		}else{
			return value;
		} 
	},
	
	_showFieldValue: function(){
		this._doShowValue(this.field.val);		
	},
	
	formatValue: _FieldInputWidget.prototype.formatValue,
		
	_doShowValue: function(value){

		value = this.formatValue(value);
		this.domNode.innerHTML = value;
		// write the formatting back to the field for export etc.
		this.field.formattedValue = value;
		return value;		
	},
	
	postCreate: function(){
		// todo find my field to pull the value...
		domClass.add(this.domNode, "xc_fieldvalue");
		
		if(!this.field){
			console.warn("referenced a non existing field name when declaring fieldValue widget?", this.domNode);
			return false;
		}
	
		// if declarative, dojo has already evaluated the field, otherwise
		// we need to evaluate the string
		var field = lang.getObject(this.field+"") || {};
		if(field.isField){
			this.field = field;
			this.field.fieldValueDisplays.push(this);
			this._doShowValue(this.field.val);
			connect.connect(this.field, "newValue", this, this.onNewFieldValue);
		}else{
			// well, we listen to anything with the right name in the remaining cases	
			connect.subscribe(this.fieldId+".newValue", this, this.onNewFieldValue);
		}
	
		this.lazy = !!this.lazy;
		if(this.lazy){
			connect.subscribe("calculator-doUpdateLazyFieldValueDisplays", this, this._showFieldValue);			
		}
		
	}
	
});

});