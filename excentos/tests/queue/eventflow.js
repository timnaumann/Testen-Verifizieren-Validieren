define([
	"doh",
	"./getTest",
	"excentos/queue/_Element",
	"excentos/queue/utility",
	"excentos/event/QueueEvent",
	"excentos/event/QueueBubbleEvent"
],function(doh, getTest, _Element, Qutil, QueueEvent, QueueBubbleEvent){
	
	var __glob__ = {};
	var variable = 0;
	var f = function(){variable++;};
	var q = new Qutil;
	var seq = q.sequence;
	var call = q.caller;
	var QUEUE = seq([
		            call(null, f, {name:"2"}),
		            call(null, f, {name:"3"}),
		            seq([
						call(null, f, {name:"5"}),
						call(null, f, {name:"6"})
		            ], {name:"4"}),
		            call(null, f, {name:"7"})
				], {name:"1"});
	

	
	doh.register("excentos.queue.eventflow", [
	{
		name: "begin event bubbling",
		runTest: function(d) {
			
			var bubbleeventlist = [];
			var handle = function(e){
				bubbleeventlist.push(e.target.name);
			};
			
			__glob__[this.name] = QUEUE.addEventListener(QueueBubbleEvent.BEGIN, handle);
			QUEUE.start();
			
			d.is(["1","2","3","4","5","6","7"],bubbleeventlist);
		},
		tearDown: function(){
			__glob__["begin event bubbling"].remove();
			delete __glob__["begin event bubbling"];
		}
	}
	]);
	
});



