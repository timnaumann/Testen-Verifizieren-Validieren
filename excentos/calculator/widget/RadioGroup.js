define([
   	"dojo/_base/declare",
   	"dojo/_base/lang",
   	"dojo/_base/connect",
   	"dojo/query",
   	"dojo/ready",
   	"dijit/_Widget",
   	"dijit/_Container",
   	"dijit/_Contained",
   	"dijit/_Templated",
   	"./_FieldInputWidget"
], function(declare, lang, connect, query, ready, _Widget, _Container, _Contained, _Templated, _FieldInputWidget){

//A group representation of RadioButtons 
return declare("excentos.calculator.widget.RadioGroup", [_Widget, _FieldInputWidget, _Container, _Contained], {
	
	widgetsInTemplate: true,
	currentWidget: null,
	widgetsByValue: null,
	
	constructor: function(){
		this.widgetsByValue = {};
	},
	
	startup: function(){
		this.setupListeners();
		this.showFieldValue();
	},
	
	setupListeners: function(){
		var child, children = this.getChildren(), i=children.length, updateCurrentWidget = lang.hitch(this, this.updateCurrentWidget);
		while(i-->0){
			child = children[i];
			this.widgetsByValue[child.value] = child;
			child.set("name", this.field.name);
			//couldnt find anotherway to get the changed target
			child.connect(child, "onChange", function(checked){
				updateCurrentWidget(this,checked);
			});
		}
	},
	
	updateCurrentWidget: function(widget, checked){
		if(checked){
			this.currentWidget = widget;
			this.set("value",widget.value);
		}
	},
	
	showFieldValue: function(){
		this.onNewFieldValue(this.field.val);		
	},
	
	_getValueAttr: function(){
		return this.currentWidget && this.currentWidget.value || null;
	},
	_setValueAttr: function(value){
		//find widget with corresponding value;
		var widget = this.widgetsByValue[value];
		if(widget){
			widget.set("checked", true);
			this.onNewWidgetValue(value);
		}
	}	
});

});