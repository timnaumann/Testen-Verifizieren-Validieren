//AMD module
define([
	"dojo/_base/array",
	"./Event"
],function(array, Event){

//DEPRECATED migrate to dojo._Evented

// summary:
//		The EventDispatcher is a useful signal-notification system and serves as base class for all classes that dispatch events.
	
//Features:
//		- addEventListener has a ´priority´ flag so the order of events does not depend on the registering roder
//		- addEventListener() returns an remove() Handle to remove that listener without further knowledge
//		- addEventListener supports a ´context´ option so a listener can easily be called in remote context
//		- removeAllEventListeners(type) is a feature method that instantly removes any assigned event or just the ones by the given EventType
//		- a dispatched Event has a ´removeListener()´ / ´removeOriginalListener()´ method to instantly remove the current event listener
//		- dispatchEvent() also takes a string instead of Event object (which is then used to internally create an Event instance) 
//		- dispatchEvent() additionally takes a ´param´ argument to mixin various data (like sending an extra ´info´ variable or changing the properties of the auto-casted event)

	
var EventDispatcher = function(){};
EventDispatcher.prototype = {
	declaredClass: "EventDispatcher",
	
	// _listeners : Object
	//		private var _listeners holds all registered listeners.
	//		Any call to addEventListener will store an instance of _EventListener to ´_listeners[type][priority][]´
	_listeners: null,
	
	//true during dispatch phase
	_isDispatching: false,

	constructor: EventDispatcher,
	
	//NOTE: capture phase is missing
	addEventListener: function(/*String*/ type, /*Function*/ listener, /*Boolean=false*/ useCapture, /*Number=0*/ priority, /*Object=this*/ context){
		// summary:
		//		registers a listener to call a function/listener when an event with a given type has been dispatched/fired
		// description:
		//		Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event. 			//
		//		After you successfully register an event listener, you cannot change its priority through additional calls to addEventListener(). 
		//		To change a listener's priority, you must first call removeListener(). 
		//		Then you can register the listener again with the new priority level.
		// type:
		//		the event type that has to be fired in order to trigger the listener
		// listener:
		//		A function reference that is called when an Event is dispatched
		// useCapture:
		//		NOT YET IMPLEMENTED
		//		Tells the EventDispatcher to trigger listeners during the capture phase instead of the bubble phase
		//	priority:
		//		the higher the priority the earlier the listener will be triggered - 
		//		regardless of when the listener has been registered
		//	context:
		//		Set the context for the listener. When you add an event listener to a remote object (any other than ´this´)
		//		the listener would be executed in remote scope.
		//	example: 
		//			d = new excentos.event.EventDispatcher();
		//			d.addEventListener("test", function(){console.log("default1")});
		//			d.addEventListener("test", function(){console.log("medium")}, 	false, 1);
		//			d.addEventListener("test", function(){console.log("higher")}, 	false, 100);
		//			d.addEventListener("test", function(){console.log("high")}, 	false, 10);
		//			d.addEventListener("test", function(){console.log("default2")});
		//			d.dispatchEvent(new excentos.event.Event("test"));
		//		outputs:
		//			higher
		//			high
		//			medium
		//			default1
		//			default2
		//	returns:
		//		Object with remove() function to easily remove listeners from eventdispatcher
		var args = arguments, argsLen = args.length, maxIndex = argsLen-1, lastArg = args[maxIndex];
		if(argsLen<5 && typeof lastArg == "object"){
			context = lastArg;
			args[maxIndex] = undefined;
		}
		
		//throw custom error if no type is given
		if(typeof type != "string"){
			throw new TypeError(this.declaredClass+"::addEventListener\n ´type´ expected to be ´string´ but ´"+(typeof type)+"´ was given");
		}
		//throw custom error when listener is no function (-reference)
		if(typeof listener != "function"){
			throw new TypeError(this.declaredClass+"::addEventListener\n ´listener´ expected to be ´function´ but ´"+(typeof listener)+"´ was given");
		}
		
		context = context || this;
		useCapture = useCapture || false;
		
		//NOTE: warning has to be deleted as soon as capture phase is implemented
		useCapture && console.warn(this._declaredClass+"::addEventListener() parameter ´useCapture´ is not yet supported");
		priority = priority || 0;
	
		//avoid registering the same event twice
		//FIXME: You actually should be able to register the same listener twice if the listeners belong to different ´capturePhase´s
		if(this._getEventListener(type,listener))return false;
		
		var listenerObject = new _EventListener(context,listener,priority);
		
		var _listeners = this.getListeners(),
			dispatchers = _listeners[type] || (_listeners[type] = new _DispatcherEntriesObject()),
			byListener = dispatchers.byListener,
			byPriority = dispatchers.byPriority[priority] || (dispatchers.byPriority[priority]=[]),
			priorities = dispatchers.priorities;
		
		byListener.push(listenerObject);
		byPriority.push(listenerObject);
		
		if(array.indexOf(priorities, priority)==-1){
			priorities.push(priority);
			priorities.sort();
		}
		
		return new _RemoveHandleObject(context,type,listener);
	},

	removeEventListener: function(/*String*/ type, /*Function*/ listener){
		// summary:
		//		Removes a listener from the EventDispatcher object. 
		//		If there is no matching listener registered with the EventDispatcher object, 
		//		a call to this method has no effect. 
		
		var listenerByTypeObject = this._getEventListenerInformation(type, listener);
		
		if(!listenerByTypeObject)return;
		
		this._removeEventListener(listenerByTypeObject);
	},
	
	_removeEventListener: function(/*EventListenerInformation*/ obj){
		var _listeners = this.getListeners(),
			eventType,
			index,
			eventListener,
			globalByListener,
			globalByPriority,
			globalpriorities,
			priority;
			
		//during dispatch phase a listener cant be removed from index
		//as it would break the whole dispatching loop;
		//therefore a listener gets marked as ´_removed´ and wont be dispatched.
		if(this._isDispatching){
			this._getRemoveList().push(obj);
			return obj.eventListener._removed = true;
		}
		
		eventType 		= obj.eventType;
		index 			= obj.index;
		eventListener 	= obj.eventListener;
		priority 		= eventListener.priority;
		
		globalByListener = _listeners[eventType].byListener;
		globalByPriority = _listeners[eventType].byPriority[priority];
		globalpriorities = _listeners[eventType].priorities;
		
		//remove the _EventListener object from lists
		globalByListener.splice(index.byListener, 1);
		globalByPriority.splice(index.byPriority, 1);
		
		//check if the byPriority has to be truncated completely
		if(!globalByPriority.length){
			delete _listeners[eventType].byPriority[priority];
			globalpriorities.splice(index.inPriorities, 1);
		}
	},

	_removeMarkedEventListeners: function(){
		var _removeList = this._getRemoveList(), listenerByTypeObject, eventType, listenerFunc, 
			i=_removeList.length;
		
		while(i-->0){
			listenerByTypeObject = _removeList[i];
			eventType = listenerByTypeObject.eventType;
			listenerFunc = listenerByTypeObject.eventListener.listener;
			this.removeEventListener(eventType,listenerFunc);
		}
	},
	
	dispatchEvent: function(/*excentos.event.Event*/ event, /*Object?*/ params){
		// summary:
		//		Dispatches an event into the event flow.
		// description:
		//		Dispatches an event into the event flow. 
		//		The event target is the EventDispatcher object upon which the dispatchEvent() method is called. 
		
		if(typeof event=="string"){
			event = new Event(event);
		}
		
		if(params){
			for(var prop in params){
				event[prop] = params[prop];
			}
		}
		
		//always set target to that EventDispatcher which is actively processing the event
		event.target = event.target || this;
		//set an event's currentTarget once - it represents the origin
		event.currentTarget = this;
		
		var type = event.type;
		
		//heuristic parent determination
		var parent = this.parent || this.getParent&&this.getParent() || this.parentNode;
		// parent instanceof EventDispatcher   failed in some 3rd party inheritance circumstances
		var parentDispatchEvent = parent && parent.dispatchEvent;
		
		//check if this dispatcher has listeners for that event
		if(this.hasEventListener(type)){
			
			//reverse iterate priorities
			//forward iterate foreach priority
			
			//dispatch list is kind of immutable during dispatch phase
			var _listeners=this.getListeners()[type],
				byPriority=_listeners.byPriority, 
				prioritiesCopy=_listeners.priorities.slice() /*copy*/,
				listenersByPriorityCopy,
				prioritiesIndex = prioritiesCopy.length,
				priority,
				eventListener;
			
			this._isDispatching = true;
			while(prioritiesIndex-->0){
				priority = prioritiesCopy[prioritiesIndex];
				listenersByPriorityCopy = byPriority[priority].slice(); /*copy*/
				for(var i=0, l=byPriority[priority].length; i<l; ++i){
					//check if the event has been cancelled by stopImmediatePropagation()
					//this can happen any time during dispatch phase
					if(!event.cancelled){
						eventListener = listenersByPriorityCopy[i];
						if(eventListener._removed)continue; //skip if marked as removed
						
						//override event.remove() with actual removal functionality
						if(!event.isDispatched){
							this._addRemoveOriginalListenerToEvent(event, eventListener.listener);
						}
						this._addRemoveListenerToEvent(event, eventListener.listener);
						
						event.isDispatched = true;
						eventListener.listener.apply(eventListener.context, [event]);
					}
				}
			}
		}
		
		//event bubbling
		if(parentDispatchEvent && event.bubbles)parentDispatchEvent.call(parent,event);
		
		this._isDispatching = false;
		this._removeMarkedEventListeners();
	},
	//FEATURES
	removeAllEventListeners: function(/*String?*/ type){
		var listeners,eventListener,i;
		if(!type){
			return this._listeners = {};
		}
		
		listeners = type && this._getEventListener(type);
		if(listeners){
			i = listeners.length;
			while(i-->0){
				eventListener = listeners[i].eventListener;
				//does a second iteration
				this.removeEventListener(eventListener.type, eventListener.listener);
			}
		}
	},
	addRemoveToHandle: function(/*String*/ type, /*Function*/ listener){
		this.removeEventListener(type, listener);
	},
	_addRemoveListenerToEvent: function(/*excentos.event.Event*/ event, /*Function*/ listener){
		event.removeListener = function(){
			event.currentTarget.removeEventListener(event.type, listener);
		};
	},
	_addRemoveOriginalListenerToEvent: function(/*excentos.event.Event*/ event, /*Function*/ listener){
		event.removeOriginalListener = function(){
			event.target.removeEventListener(event.type, listener);
		};
	},
	
	//FEATURE
	/*
	willTrigger: function(){
		// summary:
		//		Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the specified event type. 
		//		This method returns true if an event listener is triggered during any phase of the event flow when an event of the specified type is dispatched to this EventDispatcher object or any of its descendants.
		//
		//		The difference between the hasEventListener() and the willTrigger() methods is that hasEventListener() examines only the object to which it belongs, 
		//		whereas the willTrigger() method examines the entire event flow for the event specified by the type parameter. 
	},
	*/
	hasEventListener: function(/*String*/ type){
		// summary:
		//		Checks whether the EventDispatcher object has any listeners registered for a specific type of event. 
		//		This allows you to determine where an EventDispatcher object has altered handling of an event type in the event flow hierarchy. 
		//		To determine whether a specific event type actually triggers an event listener, use willTrigger().
		//
		//		The difference between hasEventListener() and willTrigger() is that hasEventListener() examines only the object to which it belongs, 
		//		whereas willTrigger() examines the entire event flow for the event specified by the type parameter. 
		
		
		//best ´isEmpty´ for recursive arrays:
		//arr.toString().search(/[^,]/)==-1;
		//arr.toString().indexOf(",")==-1;

		var arr = this.getListeners()[type];
		return !!(arr && arr.byListener.length && arr.byListener.join(""));
	},
	
	_getEventListener: function(/*String*/ type, /*Function?*/ listener){
		var results = null;
		if(type && this.hasEventListener(type)){
			var _listeners = this.getListeners(),
				listenerIndex=0, 
				d = _listeners[type], 
				list = d.byListener, 
				l = list.length,
				eventListener = null,
				listenerInfo=null;
			
			results = [];
			for(; listenerIndex<l; ++listenerIndex){
				eventListener=list[listenerIndex];
				if(!listener || (eventListener.listener === listener)) {
					listenerInfo = new _EventListenerInformation(eventListener,type,listenerIndex,NaN,NaN);
					if(listener)return listenerInfo;
					
					results.push(listenerInfo);
				}
			}
		}
		return results && results.length ? results : null;
	},
	
	_getEventListenerInformation: function(/*String*/ type, /*Function*/ listener){
		var eventListenerInfo = null;
		var byprioIndex, prioIndex;
		if(eventListenerInfo = this._getEventListener(type, listener)){
			//where is ´eventListener´ located in ´_listeners[type].byPriority´
			byprioIndex = this._getEventListenerIndexInPriorities(type, eventListenerInfo.eventListener);
			//where is ´eventListener.priority´ located in ´_listeners[type].priorities´
			prioIndex = this._getIndexInPriorities(type, eventListenerInfo.eventListener.priority);
			
			eventListenerInfo.index.byPriority = byprioIndex;
			eventListenerInfo.index.inPriorities = prioIndex;
		}
		return eventListenerInfo;
	},
	
	_getEventListenerIndexInPriorities: function(/*String*/ type, /*EVentListener*/ eventListener){
		var eventListenersInPrios = this.getListeners()[type].byPriority[eventListener.priority];
		for(var i=0, l=eventListenersInPrios.length; i<l; ++i){
			if(eventListener == eventListenersInPrios[i]){
				return i;
			}
		}
		return -1;
	},
	
	_getIndexInPriorities: function(/*String*/ type, /*Number*/ priority){
		var priorities = this.getListeners()[type].priorities;
		return array.indexOf(priorities, priority);
	},
	
	getListeners: function(){
		return this._listeners || (this._listeners={});
	},
	
	_getRemoveList:function(){
		return this._removeList || (this._removeList=[]);
	},
	
	toString: function(){
		return "[object "+this.declaredClass+"]";
	},
	
	_createEventListenerInformation: function(/*_EventListener*/ eventListener, /*String*/ type, /*Number*/ byListenerIndex, /*Number*/ byPriorityIndex, /*Number*/ inPrioritiesIndex){
		return {
			eventType: type,
			eventListener: eventListener,
			index: {
				byListener: byListenerIndex,
				byPriority: byPriorityIndex,
				inPriorities: inPrioritiesIndex
			},
			toString: function(){
				return "[object event._EventListenerInformation]";
			}
		};
	}
};

// slowest but most readable way of creating objects http://jsperf.com/instances-prototype-vs-closure-vs-obj
var _EventListenerInformation = function(eventListener, type, byListenerIndex, byPriorityIndex, inPrioritiesIndex){
	this.eventType = type;
	this.eventListener = eventListener;
	this.index.byListener = byListenerIndex;
	this.index.byPriority = byPriorityIndex;
	this.index.inPriorities = inPrioritiesIndex;
};
	_EventListenerInformation.prototype = {
		constructor: _EventListenerInformation,
		eventType: "",
		eventListener: null,
		index: {
			byListener: null,
			byPriority: null,
			inPriorities: null
		}
	};
	_EventListenerInformation.prototype.constructor = Function;

var _DispatcherEntriesObject = function(){
	this.byListener = [];
	this.byPriority = {};
	this.priorities = [];
};
	_DispatcherEntriesObject.prototype = {
		constructor: _DispatcherEntriesObject,
		byListener: null,
		byPriority: null,
		priorities: null,
		toString: function(){
			return "[object event._DispatcherEntryObject]";
		}
	};

var _RemoveHandleObject = function(context, type, listener){
	this.context = context;
	this.type = type;
	this.listener = listener;
};
	_RemoveHandleObject.prototype = {
		constructor: _RemoveHandleObject,
		context: null,
		type: "",
		listener: null,
		remove: function(){
			this.context.removeEventListener.call(this.context, this.type, this.listener);
		},
		toString: function(){
			return "[object event._RemoveHandleObject]";
		}
	};

//in javascript we need to keep function and context manually
var _EventListener = function(/*Object*/ context, /*Function*/ listener, /*Number*/ priority){
	this.listener = listener;
	this.context = context;
	this.priority = priority;
	this._removed = false;
};
	_EventListener.prototype = {
		constructor: _EventListener,
		listener: null,
		context: null,
		priority: NaN,
		_removed: false,
		remove: function(){
			this.context = null;
			this.listener = null;
			this.priority = 0;
		}
		//due to hasEventListener() uses join() to determine listeners
		//we should avoid implementing a custom toString representation
		/*this.toString = function(){
		 return "[object event._EventListener]";
		 }*/
	};

return EventDispatcher;
});