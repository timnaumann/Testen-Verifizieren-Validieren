define([
	"doh",
	"./getTest",
	"excentos/queue/SequenceGroup",
	"excentos/queue/ProcedureCaller",
	"excentos/queue/Timeout",
	"excentos/event/QueueEvent",
	"excentos/event/QueueBubbleEvent",
	"excentos/event/StateChangeEvent"
],function(doh, getTest, QElement, ProcedureCaller, Timeout, QueueEvent, QueueBubbleEvent, StateChangeEvent){
	
	doh.register("excentos.queue.SequenceGroup", [
		{
			name: "state lifecycle",
			timeout: 1000,
			runTest: function(d) {
				var dohDeferred = new doh.Deferred();
				var el = new QElement;
				var arr = [];
				var handler = function(e){
					arr.push(el.getState("state"));
				};
					
				el.addEventListener("change", handler);
				el.addEventListener(QueueEvent.END, function(){
					try{
						d.is(arr, 
							 [el.STATE_IDLE, 
							  el.STATE_STARTED, el.STATE_PAUSED, el.STATE_IDLE,
							  el.STATE_STARTED, el.STATE_IDLE
							 ]
						);
						dohDeferred.callback(true);
					}
					catch(e){
						dohDeferred.errback(e)
					}
				});
				
				el.getElementManager().addElement(new Timeout().init(100));
				
				
				el.init();
				el.start();
				el.pause();
				el.stop();
				el.start();				
				
				return dohDeferred;
			}
		},
		getTest("basic event flow", QElement),
		{
			name: "start, pause, resume",
			timeout: 500,
			runTest: function(d){
				var el = new QElement;
				var dohDeferred = new doh.Deferred;
				
				var currentStep = 0;
				
				
				var step1 = new ProcedureCaller().init(function(){
					if(currentStep){
						dohDeferred.errback("entered pause/resum recursion");
						//self protect from entering the recursion
						return;
					}
					currentStep = 1;
					
					el.pause();
					setTimeout(function(){el.start();},0);
				});
				var step2 = new ProcedureCaller().init(function(){
					currentStep = 2;
				});
				
				
				el.init();
				el.getElementManager().addElements([step1, step2]);
				el.addEventListener(QueueEvent.END, function(){
					d.is(2, currentStep);
					dohDeferred.callback("did not end in pause/resume recursion");
				});
				
				el.start();
				
				
				return dohDeferred;
			}
		}
	]);
	
});



