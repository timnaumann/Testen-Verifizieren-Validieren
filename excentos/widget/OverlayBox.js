define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"dojo/dom-geometry", // domGeometry.position
	"dojo/dom-style", // domStyle.set
	"dojo/window", // winUtils.getBox
	"dijit/Dialog",
	"./_Widget",
	"./_TemplatedMixin"
], function(declare, on, lang, domGeometry, domStyle, winUtils, Dialog, _Widget, _TemplatedMixin){

return declare(
	"excentos.widget.OverlayBox",
	[_Widget, Dialog, _TemplatedMixin],
{
	relativeTemplatePath: "OverlayBox.html",
	templateString: '<div tabindex="-1" waiRole="dialog" waiState="labelledby-${id}_title">\
						<div class="dijitDialogTitleBar" data-dojo-attach-point="titleBar">\
							<span data-dojo-attach-point="closeText" class="closeText" data-dojo-attach-event="onclick:hide"></span>\
							<span data-dojo-attach-point="closeButtonNode" class="dijitDialogCloseIcon" data-dojo-attach-event="onclick:hide"></span>\
							<span data-dojo-attach-point="titleNode" class="dijitDialogTitle"></span>\
						</div>\
						<div data-dojo-attach-point="containerNode" class="dijitDialogPaneContent"></div>\
					</div>',
					
	autofocus: false,
	draggable: false,

	constructor: function(){
		this.i18n = excentos.shared.store.getClientI18nItems();
		this.baseClass += " xc_dialog xc_overlaybox";
	},
	
	postCreate: function(){
		this.inherited(arguments);
		//NOTE: dijit.Dialog depends silently on `titleBar` since dojo 1.10
		!this.titleBar && console.warn(this.id+" ("+this.declaredClass+"): dijit requires `titleBar` - but no such node was found!");
	},
	
	show: function(){
		// summary: Add close on underlay click behavior.
		
		// Prevent scrolling of the background.
		document.body.style.overflow = "hidden";
		dojo.isIE == 7 && (document.body.style.height = "100%");
		
		var promise = this.inherited(arguments);
		this._modalconnects.push(dojo.connect(dijit._underlay.domNode, "onclick", this, "hide"));
		if(dojo.isIE != 7){
			// IE7 freaks out on window resize. Looks like race condition with DOM element sizing.
			this._modalconnects.push(on(window, "resize", lang.hitch(this, function(){
				this._size();
				this._position();
			})));
		}
		
		return promise;
	},
	
	hide: function(){
		var promise = this.inherited(arguments);
		// Re-enable scrolling of the background.
		domStyle.set(document.body, "overflow", "");
		dojo.isIE == 7 && domStyle.set(document.body, "height", "");
		
		return promise;
	},
	
	_size: function(){
		// summary:
		// 		Override `dijit.Dialog`. Removes dead code and changes margin. Also handle shrinking of content.
		
		// First set dimension to "auto" to adjust to actual content.
		domStyle.set(this.containerNode, {width: "auto", height: "auto"});
		
		var bb = domGeometry.position(this.domNode);
		var viewport = winUtils.getBox();
		if(bb.w >= viewport.w || bb.h >= viewport.h){
			// Reduce size of dialog contents so that dialog fits in viewport
			
			var w = Math.min(bb.w, Math.floor(viewport.w - 80)),
				h = Math.min(bb.h, Math.floor(viewport.h - 80));
			
			domStyle.set(this.containerNode, {
				width: w + "px",
				height: h + "px",
				overflow: "auto",
				position: "relative"	// workaround IE bug moving scrollbar or dragging dialog
			});
		}
	}
	
});

});
