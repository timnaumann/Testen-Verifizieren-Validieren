define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/aspect",
	"dijit/Dialog",
	"excentos/shared",
	"./_TemplatedMixin"
], function(declare, lang, dom, domConstruct, domClass, domStyle, domGeometry, aspect, Dialog, shared, _TemplatedMixin){
	
return declare(
	"excentos.widget.Dialog",
	[Dialog, _TemplatedMixin],
{
	//	summary:
	//		Has a special template to remove the title bar including the close button.
	
	relativeTemplatePath: "Dialog.html",
	templateString: '<div \
						><div class="xc_dialog_header" data-dojo-attach-point="titleBar"\
							><span data-dojo-attach-point="closeButtonNode" class="xc_dialog_close_icon" data-dojo-attach-event="onclick:hide">×</span\
							><span data-dojo-attach-point="closeText" class="xc_dialog_close_text" data-dojo-attach-event="onclick:hide">%{i18n.dialog_close}</span\
							><span data-dojo-attach-point="titleNode" class="xc_dialog_title"></span\
						></div\
						><div data-dojo-attach-point="containerNode" class="dijitDialogPaneContent"></div\
					></div>',
	targetNode: null,
	autofocus: false,
	
	// Don't set any hover classes.
	cssStateNodes: null,
	i18n: null,
	_avoidLayout: null,
	draggable: false, //draggable=true avoids closing dialogs in ipad
	
	constructor: function(){
		//it does not inherit from excentos.widget._Widget so we have to apply i18n manually
		this.i18n = shared.store.getClientI18nItems();
		this.baseClass += " xc_dialog";
	},
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.baseClass += " xc_dialog";
	},
	
	postCreate: function(){
		this.inherited(arguments);
		//NOTE: dijit.Dialog depends silently on `titleBar` since dojo 1.10
		!this.titleBar && console.warn(this.id+" ("+this.declaredClass+"): dijit requires `titleBar` - but no such node was found!");
	},
	
	hide: function(){
		if(this.closable){
			this._avoidLayout && this._avoidLayout.remove();
			this.targetNode = null;
			return this.inherited(arguments);
		}
	},
	
	onLoad: function(){
		//summary:
		//	if a new content is set - remove the "avoid-layout" advice
		this._avoidLayout && this._avoidLayout.remove();
		this.inherited(arguments);
	},
	
	show: function(/*DOMElement|String*/ targetNode){		
		targetNode && (this.targetNode = dom.byId(targetNode));
		
		var deferred = this.inherited(arguments);
		
		//deferred is ´undefined´ if the dialog was already opened
		deferred && deferred.then(lang.hitch(this,this.showOnEnd));
		
		return deferred;
	},
	
	showOnEnd: function(){
		// summary:
		//		will be triggered when ´show()´ really has completed 
		//		which is even later then ´onShow()´ (asynchronous due internal animation) -
		this.layoutToTarget();
	},
	
	layout: function(){
		this.inherited(arguments);
		this.layoutToTarget();
	},
	
	layoutToTarget: function(){
		this.targetNode && this._layoutToTarget();
	},
	_layoutToTarget: function(){
		//BUG: broken - position is way off
		
		// summary:
		//		forces the underlay to only block ´targetNode´ 
		//		and re-aligns the dialog to center within the application box
		// description:
		//		The DOM Elements of underlay and dialog will be put inside of ´targetNode´.
		//		The underlay will be resized to exactly fit into ´targetNode´ and
		//		the dialog will be re-centered reletaive to the application.
		//		Any further call to layout() will be swallowed to until the dialog gets hidden.
		
		var underlayWidget = dijit._underlay, pos_app, pos_dialog;
		if(!underlayWidget)return false;

		domConstruct.place(underlayWidget.domNode, this.targetNode);
		domConstruct.place(this.domNode, this.targetNode);	
		
		
		pos_app  = domGeometry.position(this.targetNode);
		domStyle.set(this.domNode, "left", 0);
		pos_dialog = domGeometry.position(this.domNode);
	
		domStyle.set(underlayWidget.node, {
			width: pos_app.w+"px", 
			height:pos_app.h+"px"
		});
	
		//center horizontal only
		domStyle.set(this.domNode, {
			left: "50%",
			top: "0px",
			marginLeft: -pos_dialog.w/2+"px"
		});
		
		var avoid = function(){return avoid};
		this._avoidLayout = aspect.around(this, "layout", avoid);
	},
	
	_setClosableAttr: function(/*Boolean*/ closable){
		//	summary:
		//		Setter for closable property
		this.closable = closable;
		
		domClass.toggle(
			this.closeButtonNode,
			"xc_disabled",
			!this.closable
		);
	}
});

});
