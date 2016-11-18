define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit",
	"./DisplayWidget",
	"excentos/widget/OverlayBox"
], function(declare, lang, dijit, DisplayWidget, OverlayBox){

return declare("excentos.widget.explanation.displayWidget.OverlayDisplayWidget", DisplayWidget, {
	
	overlayBox: null,
	constructor: function(){
		this.overlayBox = new OverlayBox;
	},
	
	show: function(){
		this.overlayBox.removeChild(0);
		this.overlayBox.addChild(this.enrichment);
		this.overlayBox.show();
		
		if(!this._underlayClickHandler){
			this._underlayClickHandler =  dijit._underlay.on("click", lang.hitch(this, this.invokeUnexplain));
		}
	},
	
	hide: function(){
		this.overlayBox.removeChild(0);
		this.overlayBox.hide();
		this.set("enrichment", null);
		
		if(this._underlayClickHandler){
			this._underlayClickHandler.remove();
			delete this._underlayClickHandler;
		}
	},
	
	invokeUnexplain: function(){
		this.enrichment.enrichableWidget.unexplain();
	}
});


});