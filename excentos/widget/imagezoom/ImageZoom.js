define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/sniff",
	"dojo/when",
	"dojo/topic",
	"dojo/dom-class",
	"excentos/shared",
	"excentos/image/preload",
	"excentos/Singleton",
	"./OverlayBoxView"
], function(declare, lang, has, when, topic, domClass, shared, preload, Singleton, OverlayBoxView){

var SAFE_SEPARATOR = window.jQuery ? "_" : "&";
var URL_IMAGEZOOM = SAFE_SEPARATOR+"xc_imagezoom";
return Singleton(declare("excentos.widget.imagezoom.ImageZoom", null, {
	_imageUrls: null,
	view: null,
	usePreloader: true,
	
	showImages: function(/*Array*/ list, /*String?*/ title){
		var view = this.getView();
		view.set("title", title || shared.store.getClientI18nByKey("image_zoom_title") || "");
		view.set("content", "");
		
		//var promise = when(this.loadImages(list), lang.hitch(this, "show"));
		var promise = when(this.show(), lang.hitch(this, "loadImages", list));
		
		return promise;
	},
	
	show: function(){
		//show view
		
		var view = this.getView();
		return view.show();
	},
	
	hide: function(){
		//hide view

		var view = this.getView();
		return view.hide();
	},
	
	loadImages: function(/*Array*/ list){
		var promise = this.setImages(list || []);
		return when(promise, lang.hitch(this, "onLoad"));
	},
	
	onLoad: function(){
		var view = this.getView();
		view.set("imageUrls", this._imageUrls);
	},
	
	setImages: function(/*Array*/ list){
		this._imageUrls = list;
		var promise = null;
		if(this.usePreloader){
			promise = preload(list);
		}
		return promise;
	},
	
	getImages: function(){
		return this._imageUrls;
	},
	
	getView: function(){
		this.view || this.setView(shared.widgetFactory.makeWidget(OverlayBoxView));
		return this.view;
	},
	
	setView: function(view){
		if(this.view != view){
			this._linkView(view);
		}
	},
	
	_linkView: function(view){
		this.view && this._unlinkView(this.view);
		this.view = view;
		view.link(this);
	},
	
	_unlinkView: function(view){
		view.link(null);//remove old reference
		this.view = null;
		this._hashchangeHandler && this._hashchangeHandler.remove();
	},
	
	onShow: function(){
		//NOTE: We do have to add a history entry!
		if(has("ff")){
			//ff bugs around ...
			location.hash = URL_IMAGEZOOM;
		}else{
			//add empty hash for history
			location.hash = location.hash.replace(URL_IMAGEZOOM, "");
			location.hash += URL_IMAGEZOOM;
		}
		
		this._hashchangeHandler = topic.subscribe("/excentos/hashchange", lang.hitch(this, function(newHash, oldHash){
			if(oldHash && oldHash.indexOf(URL_IMAGEZOOM) != -1 && oldHash !== newHash){
				this.hide();
			}
		}));

		domClass.add(document.documentElement, "xc_show_imagezoom");
	},
	
	onHide: function(){
		this._hashchangeHandler && this._hashchangeHandler.remove();
		location.hash.indexOf(URL_IMAGEZOOM) != -1 && history.back();

		domClass.remove(document.documentElement, "xc_show_imagezoom");
	}
}));

});