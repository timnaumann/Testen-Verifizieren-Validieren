define([
	"doh",
	"excentos/transition/_PhasedTransition"
],function(doh, _PhasedTransition){
	
	//FAILS due lack of Singleton concepts (excentos.shared.store / excentos.shared.behavior ... )
	doh.register("excentos.transition._PhasedTransition", [
		{
			name: "PHASES run through",
			timeout: 1000,
			runTest: function(d) {
				var deferred = new doh.Deferred();

				var transition = new _PhasedTransition().init();
				var PHASES = transition.PHASES;
				
				var availablePhases = [
					"PREPARE_ANIMATION_HIDE", 
					"ANIMATION_HIDE", 
					"LISTEN", 
					"WAIT", 
					"UNWAIT", 
					"REFRESH", 
					"PREPARE_ANIMATION_SHOW", 
					"ANIMATION_SHOW", 
					"CLEANUP"
				];
				
				var makeInvoker = function(phaseName){
					return transition.make("invoker", function(){arr.push(phaseName);});
				};
				
				var results = [], phName;
				for(var i=0, l=availablePhases.length; i<l; i++){
					phName = availablePhases[i];
					PHASES[phName] = makeInvoker(phName);
				}
				PHASES["LISTEN"] = transition.make("timeout", 500);
				
				transition.addEventListener("executionEnd", function(e){
					try{
						d.is(availablePhases, results);
						deferred.callback(true);
					}
					catch(e){
						deferred.errback(e);
					}
				});
				
				transition.start();
				
				return deferred;
			}
		}
	]);
	
});



