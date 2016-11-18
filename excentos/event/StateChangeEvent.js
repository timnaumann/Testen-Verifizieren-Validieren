define([
	"dojo/_base/declare",
	"./Event"
], function(declare, Event){

var StateChangeEvent = declare(Event, {
	declaredClass: "event.StateChangeEvent",
	changes: null,
	constructor: function(/*String*/ type, /*Array=null*/ changes, /*Boolean=false*/ bubbles, /*Boolean=false*/ cancelable){
		//calling the the super constructor via prototype is more intuitive
		//then 
		//- breaking the inheritance chain via "-chains-":{constructor:"manual"}
		//- stripping out the ´data´ from arguments
		//- manually calling this.inherited(arguments) with the edited arguments
		Event.prototype.constructor.call(this,type,bubbles,cancelable);
		this.changes = changes || null;
	},
	clone: function(){
		return new StateChangeEvent(this.type,this.changes,this.bubbles,this.cancelable);
	}
});
StateChangeEvent.CHANGE = "change";

return StateChangeEvent;

});
