define([
	"dojo/_base/declare",
	"../event/EventDispatcher",
	"../event/StateChangeEvent"
], function(declare, EventDispatcher, StateChangeEvent){

//DEPRECATED use excentos.Stateful instead
var _StatesHandler = declare(EventDispatcher, {
	// summary:
	//		The _StatesHandler is a simple state machine providing
	//		methods and functions to get informed about value changes on 
	//		registered states.
	declaredClass: "util._StatesHandler",
	
	// states : Object
	//		holds all states that are being monitored
	states: null,
	
	constructor: function(){
		this.states = {};			
	},
	_applyEventHandlers: function(){
		// summary: 
		//		sets the default event listeners
		
		// avoid overrides by accident
		this.inherited(arguments);
		this.addEventListener(StateChangeEvent.CHANGE,this._handleEvent);
	},
	_handleEvent: function(/*excentos.event.StateChangeEvent*/ e){
		// summary:
		//		for compatibility reasons with dojo.connect - call to a corresponding method for each event type
		
		this.inherited(arguments);
		switch(e.type){
			case StateChangeEvent.CHANGE: this.onStateChange(e); break;
		}
	},
	setState: function(/*String*/ stateName, /*any*/ newval, /*Boolean=false*/ silent){
		// summary:
		//		sets a single state & value
		// description:
		//		setting a single state with any value will call the onStateChangeHandler if the assigned value differs from the existing one.
		// stateName:
		//		name of the state
		// newval:
		//		the new value for a given state
		// silent:
		//		set this to true if you dont want a onStateChange Event to fire after value update
		
		var oldval = this.states[stateName], stateChanges = null;
		if(this._updateState(stateName,newval) && !silent){
			stateChanges = [new _StateChange(stateName,newval,oldval)];
			this.dispatchEvent(new StateChangeEvent(StateChangeEvent.CHANGE,stateChanges));
		}
	},
	setStates: function(/*Object*/ obj, /*Boolean=false*/ silent){
		// summary:
		//		sets multiple states at once
		// description:
		//		setStates takes an object with name:value pairs and sets the states according to the values.
		//		If at least one state has changed onStateChange will be called after assigning all values.
		// silent:
		//		set this to true if you dont want a onStateChange Event to fire after value update
		
		var stateChanges = [], oldval, newval;
		excentos.forIn(obj,function(newval,stateName){
			oldval = this.states[stateName];
			if(this._updateState(stateName,newval)){
				stateChanges.push(new _StateChange(stateName,newval,oldval))
			}
		},this);
		if(stateChanges.length && !silent){
			this.dispatchEvent(new StateChangeEvent(StateChangeEvent.CHANGE,stateChanges));
		}
	},
	_updateState: function(/*String*/ stateName, /*any*/ newval){
		// summary:
		//		assigns a name and value to the states array.
		// description:
		//		Sets the new value on the given state if it differs from the current value.
		// returns:
		//		whether the value needed to be updated.
		
		var oldval = undefined;
		if(this.states[stateName] !== oldval){
			oldval = this.states[stateName];
		}
		if(newval !== oldval){
			this.states[stateName] = newval;
			return true;
		}
		return false;
	},
	getState: function(/*String*/ stateName){
		// summary:
		//		accesses and returns a state's value via the stateName
		return this.states[stateName];
	},
	getStates: function(){
		// summary:
		//		delivers the currently stored states
		return this.states;
	},
	getStatesByValue: function(/*any*/ value){
		// summary:
		//		searches the entire states collection for a value using strong equality (===)
		// returns:
		//		the result as Object eg. 
		//		{
		//			stateA:"on",
		//			stateD:"on",
		//			stateN:"on"
		//		}
		var results = {};
		excentos.forIn(this.states, function(stateValue,stateName){
			if(stateValue===value)results[stateName]=value
		});
		return results;
	},
	getStateFromChanges: function(/*String*/ stateName, /*Array*/ stateChanges){
		// summary:
		//		utility function to check if a collection of _StateChange objects (provided in each StateChangeEvent) contains a certain state
		var i=stateChanges.length;
		while(i-- > 0){
			if(stateChanges[i].stateName == stateName){
				return stateChanges[i];
			}
		}
		return null;
	},
	onStateChange: function(e){
		// summary:
		//		called when a state has changed
		// changes:
		//		Array[
		//			_StateChange{state:"", newValue:*, oldValue:*},
		//			...
		//		] - that represents the recent changes.
		//		Can consist of multiple objects:
		//			[
		//				_StateChange{state:"stateA",newValue:true,oldValue:false},
		//				_StateChange{state:"stateB",newValue:0,oldValue:1},
		//				_StateChange{state:"stateC",newValue:"off",oldValue:"on"}
		//			]
	},
	toString: function(){
		return "[object "+this.declaredClass+"]";
	}
});

var _StateChange = function(/*String*/ stateName, /*any*/ newValue, /*any*/ oldValue){
	this.stateName = stateName;
	this.newValue = newValue;
	this.oldValue = oldValue;

	this.toString = function(){
		return "[object queue._StateChange]";
	}
};

return _StatesHandler;

});
