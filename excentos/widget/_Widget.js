define([
    "dojo/_base/declare",
    "dojo/dom-class",
	"dijit/_Widget",
	"excentos/shared",
	"./_TemplatedMixin",
	"./_Editable"
], function(declare, domClass, _Widget,  shared, _TemplatedMixin, _Editable){

return declare(
	"excentos.widget._Widget",
	[_Widget, _TemplatedMixin, _Editable],
{
	// Set widgets in template to false by default. Enable it in each widget that needs it.
	widgetsInTemplate: false,
	i18n: null,
	_blankGif: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
	
	constructor: function(){
		this.i18n = shared.store.getClientI18nItems();
	},
	
	postCreate: function(){
		this.inherited(arguments);
		this.domNode.dojoClick === undefined && (this.domNode.dojoClick = true);
	},
	
	_toggleHoverClass: function(evt){
		//	description:
		//		This function can be attached to mouse enter and mouse leave events.
		//		It adds a CSS class to the node of the event.
		var node = evt.currentTarget;
		domClass.toggle(node, "xc_hover");
	},

	show: function(){
		domClass.replace(this.domNode, "xc_show", "xc_hide");
		this.set("_isShown", true);
	},
	hide: function(){
		domClass.replace(this.domNode, "xc_hide", "xc_show");
		this.set("_isShown", false);
	},

	//TODO: move to derivation of `_Contained`
	_setFirstAttr: function(bool){
		this.first = bool;
		domClass.toggle(this.domNode, "xc_first", bool);
	},

	//TODO: move to derivation of `_Contained`
	_setLastAttr: function(bool){
		this.last = bool;
		domClass.toggle(this.domNode, "xc_last", bool);
	}

});

});
