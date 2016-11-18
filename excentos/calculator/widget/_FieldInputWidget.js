define([
   	"dojo/_base/declare",
   	"dojo/_base/lang",
   	"dojo/_base/connect",
   	"dojo/dom-class",
	"dojo/number",
   	"dojo/query"
], function(declare, lang, connect, domClass, number, query){

return declare("excentos.calculator.widget._FieldInputWidget", null, {

	// TODO das soll der Nachfolger von "_CalculatorFieldConnectedWidget" sein -> eine Klasse, die in zur Erweiterung in
	// normale dijit inputwidgets reingeerbt wird um diese mit einem calculator zu verbinden.
	
	field: null, // The field that was passed on initialization.
	labelNode: null,
	pattern: "#,##0.##",
	unit: "",
	
	// TODO initialisierungsfunktionen, die 
	// - field updates und widget updates connecten
	
	postCreate: function(){
		this.inherited(arguments);
		this.setupLabelNode();
		this.setupFieldConnections();
		this.setupWidgetConnections();
		this.showFieldValue();
		
		//in order to post an input field it requires a name
		this.valueNode.name = this.field.name;
		domClass.add(this.domNode, "xc_fieldvalue");
	},
	
	onNewFieldValue:  function(value){
		this.set("value",value);
		
		this.refresh(value);
	},
	
	onNewWidgetValue: function(value){
		value = !isNaN(value) && value*1 || value; //convert to number
		
		this.field.set(value);
		
		this.refresh(value);
	},
	
	showFieldValue: function(){
		this.onNewFieldValue(this.field.val);		
	},
	
	refresh: function(value){
		this.refreshLabel(value);
	},
	
	refreshLabel : function(value){
		var val;
		if(this.labelNode){
			val = value || this.get("value");
			this.labelNode.innerHTML = this.formatValue(val);
		}
	},
	
	setupLabelNode: function(){
		//the attachPoint is not evaluated internally in this case - so lets help it out 
		this.labelNode = query('span[data-dojo-attach-point="labelNode"]', this.domNode)[0];
	},
	
	setupWidgetConnections: function(){
		this.connect(this, "onChange", this.onNewWidgetValue);
	},
	
	setupFieldConnections: function(){
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
			this.showFieldValue(this.field.val);
			connect.connect(this.field, "newValue", this, this.onNewFieldValue);
		}else{
			// well, we listen to anything with the right name in the remaining cases	
			connect.subscribe(this.fieldId+".newValue", this, this.onNewFieldValue);
		}
	
		this.lazy = !!this.lazy;
		if(this.lazy){
			connect.subscribe("calculator-doUpdateLazyFieldValueDisplays", this, this._showFieldValue);			
		}
	},
	formatValue: function(value){
			switch(typeof value){
			case "number": value = number.format(value, {pattern: this.pattern, round: this.round||0}); break;
			case "boolean": value ? value = "Ja" : value = "Nein";
			default: value = "-";
		}
		return value;
	}
	
});

});