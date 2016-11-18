define([
	"doh",
	"./getTest",
	"excentos/queue/Animation",
	"excentos/aspect",
	"excentos/event/QueueEvent",
	"excentos/event/QueueBubbleEvent",
	"excentos/event/StateChangeEvent"
],function(doh, getTest, QElement, xcaspect, QueueEvent, QueueBubbleEvent, StateChangeEvent){
	
	doh.register("excentos.queue.Animation", [
//		getTest("basic event flow", QElement),
		{
			name: "animation property check",
			runTest: function(d){
				var div = document.createElement("div");
				var q = new QElement;
				var animation = dojo.fadeOut({
					node:div, 
					duration:1000
				});
				var debug = function(){
					var a = animation;
					
					console.dir({
						_startTime: a._startTime,
						duration: a._duration, 
						_percent: a._percent, 
						animation: a,
						queue: q
					});
				};
				
				xcaspect.before(q, "_pause", debug);
				xcaspect.after(q, "_pause", debug);
				
				xcaspect.before(q, "_play", debug);
				xcaspect.after(q, "_play", debug);
				
				
				
				q.init(animation);
				q.start();
				
			}
		}
	]);
});



