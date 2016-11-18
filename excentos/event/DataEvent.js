define([
	"dojo/_base/declare",
	"./Event"
], function(declare, Event){

var DataEvent = declare(Event, {
	declaredClass: "event.DataEvent",
	data: null,
	constructor: function(/*String*/ type, /*any=null*/ data, /*Boolean=false*/ bubbles, /*Boolean=false*/ cancelable){
		//calling the the super constructor via prototype is more intuitive
		//then 
		//- breaking the inheritance chain via "-chains-":{constructor:"manual"}
		//- stripping out the ´data´ from arguments
		//- manually calling this.inherited(arguments) with the edited arguments
		Event.prototype.constructor.call(this,type,bubbles,cancelable);
		this.data = data || null;
	},
	clone: function(){
		return new DataEvent(this.type,this.data,this.bubbles,this.cancelable);
	}
});
DataEvent.DATA = "data";

return DataEvent;

});
