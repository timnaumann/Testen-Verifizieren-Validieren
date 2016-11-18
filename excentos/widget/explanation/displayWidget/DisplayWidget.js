define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dijit/_Container",
	"excentos/widget/_Widget"
], function(declare, lang, domClass, _Container, _Widget){
	
return declare("excentos.widget.explanation.displayWidget.DisplayWidget", [_Widget, _Container], {
	
	templateString: '<div>\
		<div class="xc_explanation_container" data-dojo-attach-point="containerNode"></div>\
		<div class="xc_explanation_overlay" data-dojo-attach-point="overlayNode"></div>\
	</div>',
	
	enrichment: null,

	constructor: function(){
		this.baseClass += " xc_explanation_widget";
	},
		
	postCreate: function(){
		this.inherited(arguments);
		this.watch("enrichment", lang.hitch(this, "onNewEnrichment"));
	},
	
	onNewEnrichment: function(propertyName, oldValue, newValue){
		this.inherited(arguments);
		domClass.toggle(this.domNode, "xc_has_content", !!this.enrichment);
	},
	
	show: function(){
		this.removeChild(0);
		this.enrichment && this.addChild(this.enrichment);
	},
	
	hide: function(){
		this.removeChild(0);
		this.set("enrichment", null);
	}
});
});