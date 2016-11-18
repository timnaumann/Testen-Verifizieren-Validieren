define([
	"doh",
	"./getTest",
	"excentos/queue/_Element",
	"excentos/event/QueueEvent",
	"excentos/event/QueueBubbleEvent",
	"excentos/event/StateChangeEvent"
],function(doh, getTest, QElement, QueueEvent, QueueBubbleEvent, StateChangeEvent){
	
	doh.register("excentos.queue._Element", [
		{
			name: "state lifecycle",
			runTest: function(d) {
				var el = new QElement;
				var state = function(){return el.getState("state");};
				
				
				el.init();
				d.is(state(), el.STATE_IDLE);
				
				el.start();
				d.is(state(), el.STATE_STARTED);
				
				el.pause();
				d.is(state(), el.STATE_PAUSED);
				
				el.stop();
				//will internally be stopped - will be directly forwarded to state idle
				d.is(state(), el.STATE_IDLE);
				
				el.start();
				d.is(state(), el.STATE_STARTED);
				
				el.finish();
				d.is(state(), el.STATE_IDLE);
			}
		},
		getTest("basic event flow", QElement)
	]);
	
});



