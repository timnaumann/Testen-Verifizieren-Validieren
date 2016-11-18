define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on/throttle",
	"dojo/NodeList",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojo/window",
	"dojo/has",
	"excentos/Stateful"
], function(declare, lang, throttle, NodeList, domClass, domGeometry, win, has, Stateful){
	
	//SmartScroll is not working on touch devices - therefore just return something
	if(has("touch")){
		var noop = function(){};
		return declare("excentos.util.SmartScroll", null, {init:noop, setup:noop, refresh:noop});
	}
	
	var MODE_UNKNOWN = 		1, // the `targetNode` has not yet been examined
		MODE_IDLE = 		2, // the `targetNode` is within view docked at 0 in its final position
		MODE_STICK = 		4, // the `targetNode` would have been out of view and should therefore be fixed to the viewport
		MODE_STICKSCROLL = 	8, // the `targetNode` is not in the final position but the viewport was scrolled lower than it was before
		MODE_NAME_MAP = {
			"1": "unknown",
			"2": "idle",
			"4": "stick",
			"8": "stickscroll"
		},
		CSS_CLASS_PREFIX = "xc_smartscroll_",
		MODE_CSS_CLASS_PREFIX = CSS_CLASS_PREFIX+"mode_",
		MODE_CSS_CLASSES = "",
		DIRECTION_CSS_CLASSES = CSS_CLASS_PREFIX+"up"+" "+CSS_CLASS_PREFIX+"down";
	
	for(var n in MODE_NAME_MAP){MODE_CSS_CLASSES += MODE_CSS_CLASS_PREFIX+MODE_NAME_MAP[n]+" ";}
	
// example usage:
//	first make sure you have the proper smartscroll css rules at hand!
// 
//  for Recommendations Widget  just use  `useSmartScroll = true` flag!!
//	====================================================================
//
//  in other cases use manual implementation like this:
//
//	postCreate: function(){
//		...
// 		this.mySmartScroll = new SmartScroll({targetNode: this.containerNode});
//	},
//	refresh: function(){
//		this.mySmartScroll.refresh();
//	}
//	===================================================================


return declare("excentos.util.SmartScroll", Stateful, {
	
	// targetNode: HTMLDomNode
	//	the element that is being kept in view
	targetNode: null,
	
	// targetNode: HTMLDomNode
	//	(optional) the element that contains our targetNode and is referenced as point 0 for the targetNode 
	containerNode: null,
	
	_maxTop: -Infinity,
	
	constructor: function(obj){
		// summary
		//	obj: {
		//		targetNode: HTMLDomNode,
		//		containerNode?: HTMLDomNode
		//	}
		this.setup(obj);
		this.init();
	},
	
	init: function(){
		this.watch("mode", lang.hitch(this, this._handleModeChange));
		throttle("scroll", 50)(window, lang.hitch(this, this._watchScrolling));
	},
	
	setup: function(obj){
		this.targetNode && domClass.remove(this.targetNode, CSS_CLASS_PREFIX+"target");
		this.containerNode && domClass.remove(this.containerNode, CSS_CLASS_PREFIX+"container");
		
		this.targetNode = obj.targetNode;
		this.containerNode = obj.containerNode || obj.targetNode.parentNode;
		
		domClass.add(this.targetNode, CSS_CLASS_PREFIX+"target");
		domClass.add(this.containerNode, CSS_CLASS_PREFIX+"container");
	},
	
	refresh: function(obj){
		obj && this.setup(obj);
		
		this.set("mode", MODE_UNKNOWN);
		this._maxTop = -Infinity;
	},
	
	_watchScrolling: function(){
		
		var self = this;
		function is(mode){return !!(self.mode & mode);};
		
		if(!is(MODE_IDLE)){

			var top = domGeometry.position(this.containerNode).y;
			if(top >= 0){
				this.set("mode", MODE_IDLE);
			}else{
				this._maxTop = Math.max(this._maxTop, top);
				
				if(is(MODE_STICK|MODE_STICKSCROLL) && this._maxTop > top){
					this.set("mode", MODE_STICKSCROLL);
				}else {
					this.set("mode", MODE_STICK);
				}
			}
		}
	},
	
	_handleModeChange: function(modeProperty, oldMode, newMode){
		var direction =	oldMode === MODE_STICKSCROLL && newMode === MODE_STICK ? "up" : "down";
		var newCssClass = MODE_CSS_CLASS_PREFIX+MODE_NAME_MAP[newMode] + " " + CSS_CLASS_PREFIX+direction,
			oldCssClass = MODE_CSS_CLASSES+" "+DIRECTION_CSS_CLASSES;
		
		NodeList([this.targetNode, this.containerNode]).replaceClass(newCssClass, oldCssClass);
		
		switch(newMode){
			case MODE_STICKSCROLL:
				var offset = this.containerNode.offsetTop; //container may offset everything a bit.
				var top = -domGeometry.position(this.targetNode).y; //how many pixels out of view
				
				this.targetNode.style.top = top+offset+"px";
				this.containerNode.style.height = this.targetNode.offsetHeight + top + "px";
			break;
			case MODE_STICK:
				this.targetNode.style.top = "";
				this.containerNode.style.height = domGeometry.docScroll().y + win.getBox().h + "px";
			break;
			default:
				this.targetNode.style.top = "";
				this.containerNode.style.height = "";
		}
	}
});
});