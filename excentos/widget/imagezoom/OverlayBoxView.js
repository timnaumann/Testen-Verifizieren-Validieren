define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/when",
	"dojo/dom-class",
	"./_ImageZoomView",
	"../OverlayBox"
], function(declare, lang, when, domClass, _ImageZoomView, OverlayBox){

return declare(
	"excentos.widget.imagezoom.OverlayBoxView",
	[OverlayBox, _ImageZoomView], {

    constructor: function(){
        this.baseClass += " xc_overlaybox";
    },

	_prepareContent: function(){
		var html = "", img, imageUrls = this.imageUrls;
		for(var i=0,l=imageUrls.length; i<l; i++){
			img = imageUrls[i];
			html += "<div class='xc_zoomed_image' style='background-image:url("+img+")'>" +
						"<img style='visibility:hidden' src='"+img+"'>" +
					"</div>\r\n";
		}
		return html;
	},
	
	_setTitleAttr: function(/*String*/ title){
		// summary: sets a string as title for the view
		// returns: void
		
		//cant use this.inherited() here because _setTitleAttr is a shortcut object 
		// @see https://dojotoolkit.org/reference-guide/1.9/quickstart/writingWidgets.html#mapping-widget-attributes-to-domnode-attributes
		this.titleNode && (this.titleNode.innerHTML = title);
		domClass.toggle(this.domNode, "xc_has_title", !!title);
	},
	
	_setContentAttr: function(/*String*/ content){
		this.inherited(arguments);
		_ImageZoomView.prototype._setContentAttr.apply(this,arguments);
	},
	
	show: function(){
		// summary: display the view
		// returns: Promise
		when(this.inherited(arguments), lang.hitch(this.opener,"onShow"));
	},
	
	hide: function(){
		// summary: hide the view
		// returns: Promise
		when(this.inherited(arguments), lang.hitch(this.opener,"onHide"));
	}
});

});