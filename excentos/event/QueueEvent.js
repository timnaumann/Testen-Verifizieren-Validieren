define([
	"dojo/_base/declare",
	"./DataEvent"
],function(declare, DataEvent){
	
var QueueEvent = declare(DataEvent, {
	declaredClass: "event.QueueEvent",
	clone: function(){
		return new QueueEvent(this.type,this.data,this.bubbles,this.cancelable);
	}
});
QueueEvent.BEGIN 	= "executionBegin";
QueueEvent.PROGRESS = "executionProgress";
QueueEvent.END 		= "executionEnd";

return QueueEvent;

});
