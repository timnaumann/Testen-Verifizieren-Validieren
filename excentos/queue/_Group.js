define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_Element",
	"../util/ElementManager",
	"../event/QueueEvent",
	"../event/QueueBubbleEvent",
	"../event/ElementHolderEvent"
], function(declare, lang, _Element, ElementManager, QueueEvent, QueueBubbleEvent, ElementHolderEvent){

return declare(_Element, {

	//TODO: discuss composition over inheritance?
	declaredClass: "queue._Group",
	
	// _manager : excentos.util.ElementManager
	//		reference to ElementManager instance that holds QueueElements
	_manager: null,
	
	// _onBeginHandler : dojo.connect Handle
	//		begin handler for the currentElement in the ´_manager´ list
	_onBeginHandler: null,
	// _onBeginHandler : dojo.connect Handle
	//		begin handler for the currentElement in the ´_manager´ list
	_onEndHandler: null,
	
	constructor: function(){
		this._manager = new ElementManager();
	},
	
	init: function(/*Array?*/ elements){
		this.inherited(arguments);
		
		if(elements && !lang.isArray(elements)){
			throw new TypeError(this.declaredClass+"::"+arguments.callee.nom+"\n ´elements´ expected to be ´array´ but ´"+(typeof elements)+"´ was given");
		}
		if(elements){
			this._manager.addElements(elements);
		}
		
		return this;
	},
	
	_applyEventHandlers: function(){
		this.inherited(arguments);
		
		var _handleChange = lang.hitch(this,this._handleElementsChange);
		this._manager.addEventListener(ElementHolderEvent.ADDED,	_handleChange);
		this._manager.addEventListener(ElementHolderEvent.REMOVED, 	_handleChange);
		
		//delegate element manager events to own context
		this._manager.addEventListener(ElementHolderEvent.ADDED, 			this._delegateEvent, this);
		this._manager.addEventListener(ElementHolderEvent.ADDED_MULTIPLE, 	this._delegateEvent, this);
		this._manager.addEventListener(ElementHolderEvent.REMOVED, 			this._delegateEvent, this);
		this._manager.addEventListener(ElementHolderEvent.REMOVED_MULTIPLE,	this._delegateEvent, this);
	},
	
	_delegateEvent: function(e){
		e = e.clone();
		e.bubbles = true;
		e.cancelable = true;
		this.dispatchEvent(e);
	},
	
	_handleElementsChange: function(/*excentos.event.ElementHolderEvent*/ e){
		// summary:
		//		eventlistener is called on any change to the elements list (add/remove).
		var traversable = e.altered[0],
			isQueueElement = traversable && traversable.isInstanceOf && traversable.isInstanceOf(_Element);
		if(isQueueElement){
			this.updateTraversable(e);
		}
		else {
			throw new TypeError(this.declaredClass+"::"+arguments.callee.nom+"\n"+traversable+" is not a queue._Element");
		}
	},
	
	getElementManager: function(){
		return this._manager;
	},
	
	/*dev*/
	getDeep: function(/*String*/ position){
		position = position || "Current";
		var e = this;
		while(e = e._manager["get"+position]()){
			if(e._manager)continue;
			else break;
		}
		return e || {name:""};
	},
	
	_disconnectHandler: function(){
		if(!(this._onBeginHandler && this._onEndHandler))return;
		for(var i=0, l=this._onBeginHandler.length; i<l; i++){
			this._onBeginHandler[i].remove();
			this._onEndHandler[i].remove();
		}
		this._onEndHandler = this._onBeginHandler = null;
	},
	
	_handleElementOnBegin: function(e){
	},
	_handleElementOnEnd: function(e){
		// summary:
		//		default element on end handler will be used by descendants of _Group
		
		//this QueueEvent.PROGRESS is handled the same way as QueueBubbleEvent.PROGRESS - means they both are bubbling events
		this._dispatchEvent(new QueueEvent(QueueEvent.PROGRESS,null,true,true));
		this._dispatchEvent(new QueueBubbleEvent(QueueBubbleEvent.PROGRESS));
	},
	
	cleanup: function(){
		if(!this.children)return;
		
		var child = this.firstChild;
		while(child){
			child.cleanup && child.cleanup();
			child = child.nextSibling;
		}
	}
});

});
