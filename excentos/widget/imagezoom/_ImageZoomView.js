define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"excentos/widget/_Widget"
], function(declare, domClass, _Widget){

return declare(
	"excentos.widget.imagezoom._ImageZoomView",
	_Widget, {

	opener: null,
	imageUrls: null,

    constructor: function(){
        this.baseClass += " xc_imagezoom_view";
    },
	
	_setImageUrlsAttr: function(/*Array*/ imageUrls){
		this.imageUrls = imageUrls;
		var content = this._prepareContent();
		this.set("content", content);
	},
	
	_prepareContent: function(){
		return "";
	},
	
	_setContentAttr: function(/*String*/ content){
		// summary: sets a string as title for the view
		// returns: void
		this.inherited(arguments);
		domClass.toggle(this.domNode, "xc_has_content", !!content);
	},
	
	_setTitleAttr: function(/*String*/ title){
		// summary: sets a string as title for the view
		// returns: void
		this.inherited(arguments);
		domClass.toggle(this.domNode, "xc_has_title", !!title);
	},
	
	show: function(){
		// summary: display the view
		this.inherited(arguments);
	},
	
	hide: function(){
		// summary: hide the view
		this.inherited(arguments);
	},
	
	link: function(opener){
		this.opener = opener;
	}
});

});