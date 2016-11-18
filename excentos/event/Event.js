define(function(){

var Event = function(/*String*/ type, /*Boolean=false*/ bubbles, /*Boolean=false*/ cancelable){
	this.type = type;
	this.bubbles = bubbles || false;
	this.cancelable = cancelable || false;
};
Event.prototype = {
	declaredClass: "Event",
	target: null,
	currentTarget: null,
	type: null,
	cancelable: false,
	bubbles: false,
	cancelled: false,
	isDispatched: false,
	_isDefaultPrevented: false,

	clone: function(){
		return new Event(this.type,this.bubbles,this.cancelable);
	},
	preventDefault: function(){
		this.isDefaultPrevented = true;
	},
	isDefaultPrevented: function(){
		return this._isDefaultPrevented;
	},
	stopImmediatePropagation: function(){
		//stops further dispatching
		if(!this.cancelable)return;
		this.bubbles = false;
		this.cancelled = true;
	},
	stopPropagation: function(){
		//stops bubbling an event
		if(!this.cancelable)return;
		this.bubbles = false;
	},
	removeOriginalListener: function(){
		//throw custom error if the event has not been dispatched
		throw new Error(_ERRORMSG_REMOVELISTENER(this,arguments));
	},
	removeListener: function(){
		//throw custom error if the event has not been dispatched
		throw new Error(_ERRORMSG_REMOVELISTENER(this,arguments));
	},
	toString: function(){
		return "[object "+this.declaredClass+"]";
	}
};
Event.prototype.constructor = Event;

var _ERRORMSG_REMOVELISTENER = function($this, $arguments){
	var msg = 	$this.declaredClass+"::"+$arguments.callee.nom+"()\n"+
				"´"+$arguments.callee.nom+"´ is not set yet - the event ´"+$this.type+"´ needs to be dispatched by an event.EventDispatcher.\n"+
				"Associate the event via event.EventDispatcher::addEventListener and call event.EventDispatcher::dispatchEvent";
	return msg;
};

return Event;

});