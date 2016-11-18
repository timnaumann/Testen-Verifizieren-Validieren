define([
	"dojo/_base/declare",
	"./Event"
], function(declare, Event){

var ElementHolderEvent = declare(Event, {
	declaredClass: "event.ElementHolderEvent",
	// index : Number
	//		where the change within the current e.target._elements list occurred.
	index: -1,
	
	// altered : Array
	//		contains the altered elements (added or deleted ones)
	altered: null,
	
	// elements : Array
	//		copy of elements list before it was altered
	elements: null,
	constructor: function(/*String*/ type, /*Number*/ index, /*Array=null*/ altered, /*Array=null*/ elements, /*Boolean=false*/ bubbles, /*Boolean=false*/ cancelable){
		//call constructor with different arguments
		Event.prototype.constructor.call(this,type,bubbles,cancelable);
		this.index = index;
		this.altered = altered;
		this.elements = elements;
	},
	clone: function(){
		return new ElementHolderEvent(this.type, this.index, this.altered, this.elements, this.bubbles, this.cancelable);
	}
});
ElementHolderEvent.ADDED 			= "addedElement";
ElementHolderEvent.ADDED_MULTIPLE 	= "addedMultipleElements";
ElementHolderEvent.REMOVED 			= "removedElement";
ElementHolderEvent.REMOVED_MULTIPLE = "removedMultipleElements";

return ElementHolderEvent;

});
