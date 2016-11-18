define([
	"doh/runner"
], function(doh){
	return function getTest(/*String*/ name, /*queue._Element*/ QElement, data){
		var tests = {
			"basic event flow": {
				name: "basic event flow", 
				runTest: function(d){
					var el = new QElement();
					var events = [];
					var handle = function(e){
						events.push(e.type);
					};
					el.init();
					
					el.addEventListener("executionBegin", handle);
					el.addEventListener("executionBeginBubbled", handle);
					el.addEventListener("executionEnd", handle);
					el.addEventListener("executionEndBubbled", handle);
					
					el.start();
					if(el.declaredClass == "queue._Event"){
						el.finish();
					}
					
					d.is(["executionBegin", 
					      "executionBeginBubbled", 
					      "executionEnd", 
					      "executionEndBubbled"],events);
				}
			}
		};
		
		return tests[name];
	};
});


