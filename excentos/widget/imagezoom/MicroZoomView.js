define([
	"excentos/Singleton",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/on",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojox/gesture/tap",
	"excentos/util",
	"./_ImageZoomView"
], function(Singleton, declare, lang, win, on, domConstruct, domStyle, domClass, tap, util, _ImageZoomView){

return Singleton(declare(
	"excentos.widget.imagezoom.MicroZoomView",
	_ImageZoomView,
	{
		
		templateString: "<div class='xc_microzoom xc_microzoom_canvas xc_hidden'>\
								<div class='xc_microzoom_close'></div>\
						</div>",

		underlayElement: null,
		
		postCreate: function(){
			this.inherited(arguments);
			this._createUnderlay();
			this.placeAt(this.underlayElement, "after");
			
			// tap is the touch counterpart of "click"
			var hide = lang.hitch(this, this.hide);
			on(this.domNode, "mousedown,touchstart", hide);
			on(this.underlayElement, "mousedown,touchstart", hide);
		},
						
		_createUnderlay: function(){
			// summary:
			//	underlay is needed to guarantee a fullscreen background 
			//	- on mobile devices the addressbar likely changes the viewport size; 
			//  without underlay it would be possible to look behind the "nearly" fullscreen canvas
			this.underlayElement = domConstruct.place("<div id='xc_microzoom_underlay' class='xc_hidden'></div>", win.body());
		},
		
		_prepareContent: function(){
			return this.imageUrls+"";
		},
		
		_setContentAttr: function(/*String*/ content){
			this.inherited(arguments);
			
			if(content){
				var image = this.imageUrls[0];
				
				if(!image){
					console.warn("microzoom called without image url, ignoring call...");
					return;
				}
				
				domClass.toggle(this.domNode, "xc_has_content", !!image);
				var screenWidth = window.innerWidth * util.getDevicePixelRatio();
				var docHeight = Math.max(win.body().scrollHeight || win.body().offsetHeight);
				
				domStyle.set(this.underlayElement, {
					height : docHeight+"px"
				});
				domStyle.set(this.domNode, {
					backgroundImage: "url('http://images.excentos.com/dynamic/getImage.php?width="+screenWidth+"&trim&imgurl="+encodeURIComponent(image)+"')"
				});
			}else{
				domStyle.set(this.domNode, {
					backgroundImage: ""
				});
			}
		},

		// if you need show/hide transitions please use CSS transitions. This whole is for modern mobile UAs only.
 
		show: function(){
			domClass.remove(this.domNode, "xc_hidden");
			domClass.remove(this.underlayElement, "xc_hidden");
			this.opener.onShow();
		}, 
		
		hide: function(){
			domClass.add(this.domNode, "xc_hidden");
			domClass.add(this.underlayElement, "xc_hidden");
			this.opener.onHide();
		}
				
	}));

});