define([
	"dojo/_base/declare",
	"dijit/registry"
], function(declare, registry){

var _Explainable = declare(null,{
	
	explanationId: "",
	explanationWidget: null,
	autoExplain: false,
	
	onFocus: function(){
		this.inherited(arguments);
		this.autoExplain && this.showExplanation();
	},
	
	onBlur: function(){
		this.inherited(arguments);
		this.autoExplain && this.hideExplanation();
	},
	
	showExplanation: function(){
		this.explanationWidget && this.explanationWidget.show();
	},
	hideExplanation: function(){
		this.explanationWidget && this.explanationWidget.hide();
	},
	
	_setExplanationIdAttr: function(value){
		this.explanationId = value;
		this.explanationWidget = registry.byId(value);
	},
	
	_getExplanationIdAttr: function(){
		return this.explanationId;
	}
});

return _Explainable;
});