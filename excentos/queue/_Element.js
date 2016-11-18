define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"../log",
	"../aspect",
	"../event/EventDispatcher",
	"../event/QueueEvent",
	"../event/QueueBubbleEvent",
	"../event/ElementHolderEvent",
	"../util/_Traversable",
	"../util/_StatesHandler",
	"../event/StateChangeEvent"
], function(declare, lang, Deferred, log, xcaspect, EventDispatcher, QueueEvent, QueueBubbleEvent, ElementHolderEvent, _Traversable, StatesHandler, StateChangeEvent){

	
var _TraversableElements = declare(_Traversable, {
	updateTraversable: function(/*excentos.event.ElementHolderEvent*/ e){
		// summary:
		//		Updates the traversable properties of affected elements
		//		eg: removing the first element of a list 
		//			will update the firstChild property of the group
		
		//we only handle single-adds/single-removes so if e.type is NOT "added"|"removed" the event will not be handled
		if(!(e.type==ElementHolderEvent.ADDED || e.type==ElementHolderEvent.REMOVED))return;

		var index = e.index;
		var altered = e.altered;
		//since we are only handling single-add/remove, altered[0] will always be our traversable that needs to be edited
		var traversable = altered[0];
		var formerElements = e.elements;
		var elements = e.target.getElements();
		
		var before = formerElements[index-1];
		//in case of remove - altered.length will be the number of elements that have been deleted
		var after =  formerElements[index+altered.length];
			
		switch(e.type){
			case ElementHolderEvent.ADDED:
				before && (traversable.previousSibling=before) 	&& (before.nextSibling=traversable);
				after  && (traversable.nextSibling=after) 		&& (after.previousSibling=traversable);
			break;
			case ElementHolderEvent.REMOVED:
				before && (before.nextSibling = 		after	|| null);
				after  && (after.previousSibling = 		before	|| null);
			break;
		}
		
		traversable.parent = this;
		this.firstChild = elements[0];
		this.lastChild = elements[elements.length-1];
		this.children = elements;
	}
});	
	
//TODO: Move the concrete StatesHandler into own class TransitionStateHandler
//TODO: reduce methods
var _Element = declare([_TraversableElements, StatesHandler], {
	// summary:
	//		The _Element Class is the most basic element within a Queue complex.
	//		It defines the lifecycle and the default behavior for any descendant of _Element.
	
	declaredClass: "queue._Event",
	
	// name : String
	// 		name of the instance - each object has a unique name
	name: "",
	
	id: "",
	
	// _initialized : Boolean
	//		tells whether has been called
	_initialized: false,
	
	// _INSTANCECOUNT : Object
	// 		private static helper Object to generate unique names
	_INSTANCECOUNT: {},
	
	// _deferred: dojo.Deferred
	// 		private var that holds a reference to a dojo.Deferred instance
	_deferred: null,
	
	// canHalt : Boolean
	// 		indicates whether a class can be paused
	canHalt: true,
	
	// disabled : Boolean
	// 		indicates whether an Element is disabled
	disabled: false,
	
	// disabledHandler: dojo.connect
	//		temporary reference to a dojo.connect handle
	_disabledHandler: null,
	
	// resumed : Boolean
	// 		a flag that is true when the element is (re)started after it was paused
	resumed: false,
	
	// override : Boolean
	//		allows starting another transition while a previous one is still running. 
	//		Causes a ´stop()´ on the previous transition.
	override: false,
	
	// public static const
	STATE_IDLE: 	"idle",
	STATE_STARTED: 	"started",
	STATE_PAUSED:	"paused",
	FLAG_STOPPED: 	"stopped",
	
	constructor: function(){
		// assigns a default name
		this._generateDefaultName();
	},
			
	init: function(){
		//	summary: 
		//		initializes the instance
		

		// applies some event handlers
		this._applyEventHandlers();
		
		this._initialized = true;
		
		// sets the initial state to 'idle'
		this.setState("state",this.STATE_IDLE);
		
		return this;
	},

	_generateDefaultName: function(){
		// summary:
		//		sets a default unique name like "excentos.queue._Element_0"
		
		if(!this._INSTANCECOUNT[this.declaredClass])this._INSTANCECOUNT[this.declaredClass]=0;
		var n = this._INSTANCECOUNT[this.declaredClass]++;
		this.id = this.id || this.declaredClass+"_"+n;
		this.name = this.name || this.id;
	},
	
	_applyEventHandlers: function(){
		// summary: 
		//		sets the default event listeners
		
		// avoid overrides by accident
		this.inherited(arguments);
		//fired on any state related change
		this.addEventListener(StateChangeEvent.CHANGE,	this._handleStateChange);
	},
	
	execute: function(){
		// summary:
		//		default method to run business logic.
		if(!this.resumed) {
			this._setupDeferredExecution();
		}
	},
	finish: function(/*Object|String|Number?*/ obj){
		// summary:
		//		marks this TransitionElement as ´finished´ by resolving the deferred
		// obj:
		//		sends data to the callback handler.
		//		obj will be passed to onExecutionEnd handler as event.data
		obj = obj || null;
		if(this._deferred.fired==-1){
			this._deferred.callback(obj);
		}else {
			log("transition",this.declaredClass+"::"+arguments.callee.nom+"() encountered an already resolved deferred in "+this.getNameCanonical());
		} 
	},
	
	_setupDeferredExecution: function(){
		// summary:
		//		defines details for the deferred and adds a dojo.when handler to the dojo.Deferred instance.
		//		Intended to be overridden.
		if(this._needNewDeferred()){
			this._createDeferred();
			this._addCallbacks();
		}
		
		this._dispatchEvent(new QueueEvent(QueueEvent.BEGIN));
		this._dispatchEvent(new QueueBubbleEvent(QueueBubbleEvent.BEGIN));
	},
	
	_addCallbacks: function(){
		// summary:
		//		creates the handler for deferred.
		Deferred.when(
			this._deferred,
			lang.hitch(this,this._deferredCallback),
			lang.hitch(this,this._deferredErrback)
		);
	},
	
	_deferredCallback: function(flag){
		//we want the state to be set right before the event
		this.setState("state",this.STATE_IDLE);
		
		//Seems we only wanted the ´End´ Event to be fired when it was not forced to end
		//TODO: Maybe we should remove the condition and a add a second Event
		//		so that one can distinguish from a queue Element that just completed
		//		and one that was ended in some way.
		if(flag!=this.FLAG_STOPPED){
			this._dispatchEvent(new QueueEvent(QueueEvent.END));
			this._dispatchEvent(new QueueBubbleEvent(QueueBubbleEvent.END));
		}
	},
	_deferredErrback: function(flag){
	},
	
	_dispatchEvent: function(event){
		// summary:
		//		simply fires an event. Serves as function layer before the real dispatch
		this.dispatchEvent(event);
	},
	
	_createDeferred: function(){
		// summary:
		//		creates a new deferred instance.
		//		We always need to create a fresh deferred instance
		//		because a resolved deferred can not be reset.
		this._deferred = new Deferred();
	},
	
	_needNewDeferred: function(){
		// summary:
		//		determines whether or not a new deferred should be created.
		//		We wont create a new deferred when a previous one has not yet fired.
		// returns:
		//		boolean true when a new deferred needs to be created
		return !this._deferred || this._deferred.fired>=0;
	},
	
	getDeferred: function(){
		// summary:
		//		returns the deferred reference
		// returns:
		//		dojo.Deferred
		return this._deferred;
	},
	
	_handleStateChange: function(/*excentos.event.StateChangeEvent*/ e){
		// summary:
		//		handler for StateChangeEvents that decides which concrete action should be triggered
		// description:
		//		the concrete actions ´_start()´, ´_pause()´, ´_stop()´ are called by a state driven approach
		//		that way we "prevent" a core function to be executed more than once in a row
		
		this.isStateResumed(e.changes);
		var state = this.getState("state");
		
		
		switch(state){
			case this.STATE_STARTED: 	this._start();	break;
			case this.STATE_PAUSED: 	this._pause();	break;
		}
	},
	
	isStateResumed: function(/*Object*/ stateChanges){
		// summary:
		//		checks ´change´ whether it indicates a change from ´paused´ to ´started´
		// changes:
		//		object delivered by any StateChangeEvent
		// returns:
		//		true when the state changed from this.STATE_PAUSED to this.STATE_STARTED
		var c = this.getStateFromChanges("state",stateChanges);
		this.resumed = !!c && (c.oldValue==this.STATE_PAUSED && c.newValue==this.STATE_STARTED);
		return this.resumed;
	},
	
	start: function(){
		// summary:
		//		provides a common interface for starting an element's execution process.
		//		Will trigger the concrete ´_start()´ in dependence of the actual state.
		// returns:
		//		dojo.Deferred created by the ´execute()´ process
		this.checkInitialized();
		this.checkDisabled();
		
		if(this.isRunning() && this.override){
			this._stop();
		}
		
		//re-evaluate isRunning in case it was stopped beforehands
		if(!this.isRunning()){
			//TODO: for more clarity we should directly invoke _start
			this.setState("state",this.STATE_STARTED);
		}
		
		return this._deferred;
	},
	_start: function(){
		// summary:
		//		concrete implementation of ´start()´.
		//		Invokes execute();
		this.execute();
	},
	
	pause: function(){
		// summary:
		//		provides a common interface for pausing an element's execution process.
		//		Will trigger the concrete ´_pause()´ in dependence of the actual state.
		this.checkInitialized();
		
		if(this.canHalt && this.isRunning()){
			this.setState("state",this.STATE_PAUSED);
		}
	},
	_pause: function(){
		// summary:
		//		concrete implementation of ´pause()´
	},
	
	stop: function(){
		//	summary:
		//		provides a common interface for stopping an element's execution process.
		//		Will trigger the concrete ´_stop()´ in dependence of the actual state.
		this.checkInitialized();
		
		if(this.canHalt && this.isActive()){
			this._stop();
		}
	},
	_stop: function(){
		// summary:
		//		concrete implementation of ´stop()´
		//		directly calls finish to immediately stop the current execution
		
		//finish unresolved deferreds only
		if(this._deferred.fired==-1){
			this.finish(this.FLAG_STOPPED);
		}
		
	},
	enable: function(/*Boolean=true*/ enable){
        enable = enable==undefined ? true : enable;
		return this.disable(enable);
	},
	disable: function(/*Boolean=true*/ disable){
		// summary:
		//		disables a QueueElement - it will be resolved instantly
		//		by invoking queue._Element::execute(), queue._Element::finish()
		// disable:
		//		Set this to false to perform a enable() action
		
		disable = arguments.length === 0 ? true : !!disable;
		
		//dont do anything if this thing is active
		if(!this.isActive()){
			if(disable){
				this._disable();
				this.disabled = true;
			}else {
				this._disabledHandler && this._disabledHandler.remove();
				this.disabled = false;
			}
		}
		return this.disabled;
	},
	
	_disable: function(){
		// summary:
		//		concrete disabling logic
		
		this._disabledHandler = xcaspect.around(this, "execute", function(){
			this._disabledHandler.remove();
			this._disabledHandler = null;
			
			_Element.prototype.execute.apply(this);
			_Element.prototype.finish.apply(this);
			this.disable();
		}, this);
	},
	checkDisabled: function(){
		// summary:
		//		validates and corrects ´disabled´ (if flag is set but disabled hasn't been called yet)
		//				
		if(this.disabled && !this._disabledHandler){
			this.disable();
		}
		
		return this.disabled && this._disabledHandler;
	},
	
	isRunning: function(){
		return this.getState("state") == this.STATE_STARTED;
	},
	isPaused: function(){
		return this.getState("state") == this.STATE_PAUSED;
	},
	isActive: function(){
		// summary:
		//		tells whether an element is in an active state / non-initial state
		// returns:
		//		true if the state is not "disabled" and either "started" or "paused" else it returns false
		return this.isRunning() || this.isPaused();
	},
	checkInitialized: function(){
		if(!this._initialized){
			log("transition",this.declaredClass+"::"+arguments.callee.nom+"() `"+this.getNameCanonical()+"`was not initialized - trying to run ´init()´ now!");
			this.init();
		}
		return true;
	},
	enable: function(){
		this.disable(false);
	},
	cleanup: function(){
		// summary:
		//		each transition element provides a cleanup interface.
	},
	toString: function(){
		return "[object "+this.declaredClass+"]";
	},
	getName: function(){
		return this.name;
	},
	getNameCanonical: function(){
		var element=this, names = [];
		while(element){
			names.push(element.name);
			element = element.parent;
		}
		return names.reverse().join("/");
	}
});
return _Element;

});
