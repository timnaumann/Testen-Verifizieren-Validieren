define([
	"dojo/_base/declare",
	"./QueueEvent"
], function(declare, QueueEvent){
	
var QueueBubbleEvent = declare(QueueEvent, {
	declaredClass: "event.QueueBubbleEvent",
	constructor: function(type,data,bubbles,cancelable){
		QueueEvent.prototype.constructor.call(this,type,data,true,true);
	},
	clone: function(){
		return new QueueBubbleEvent(this.type,this.data,this.bubbles,this.cancelable);
	}
});
QueueBubbleEvent.BEGIN 		= "executionBeginBubbled";
QueueBubbleEvent.PROGRESS 	= "executionProgressBubbled";
QueueBubbleEvent.END 		= "executionEndBubbled";

return QueueBubbleEvent;

});
