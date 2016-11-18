define([
	"doh",
	"excentos/event/EventDispatcher",
	"excentos/event/Event"
],function(doh,EventDispatcher,Event){
	var f1 = function(){};
	var f2 = function(){};
	var f3 = function(){};
	
	f1.nom = "f1";
	f2.nom = "f2";
	f3.nom = "f3";
	
	doh.register("excentos.event.EventDispatcher", [
		{
			name: "addEventListener #1",
			runTest: function(d) {
				var disp = new EventDispatcher();
				disp.addEventListener("test", f1);
				disp.addEventListener("test", f2);
				
				d.t(disp._listeners["test"].byListener[1].listener===f2);
				d.t(disp._listeners["test"].byPriority[0][1].listener===f2);
				d.is(0,disp._listeners["test"].priorities[0]);
			}
		},
		{
			name: "addEventListener #2 (prevent registration of same eventType+listener more then once)",
			runTest: function(d) {
				var disp = new EventDispatcher();
				
				disp.addEventListener("test", f1);
				disp.addEventListener("test", f1);
				
				//Not allowed to register the very same listener to one event type more then once!
				//so there shouldnt be more then one element in the listener array
				d.is(1,disp._listeners["test"].byListener.length);
			}
		},
		{
			name: "addEventListener #3 (stack)",
			runTest: function(d) {
				var disp = new EventDispatcher();
					
				disp.addEventListener("test", f1);
				disp.addEventListener("test", f2);
				disp.addEventListener("test", f3);				

				d.t(disp._listeners["test"].byListener[0].listener === f1);
				d.t(disp._listeners["test"].byListener[1].listener === f2);
				d.t(disp._listeners["test"].byListener[2].listener === f3);
			}
		},
		{
			name: "addEventListener #4 (event types)",
			runTest: function(d) {
				var disp = new EventDispatcher();
					
				disp.addEventListener("test", f1);
				disp.addEventListener("test2",f2);
				disp.addEventListener("test", f3);
				
				d.t(disp._listeners["test"].byListener[0].listener === f1);
				d.t(disp._listeners["test"].byListener[1].listener === f3);
				d.t(disp._listeners["test2"].byListener[0].listener === f2);
			}
		},
		{
			name: "addEventListener #5 (priorities)",
			runTest: function(d) {
				var disp = new EventDispatcher(),
					order = [],
					f = function(str){
						return function(){order.push(str);};
					};
				disp.addEventListener("test", f("1"));
				disp.addEventListener("test", f("2"), false, 0);
				disp.addEventListener("test", f("3"), false, 1);
				disp.addEventListener("test", f("4"), false, 100);

				disp.dispatchEvent(new Event("test"));
				
				d.is("4,3,1,2",order+"");
			}
		},
		{
			name: "addEventListener #6 (remote object)",
			runTest: function(d) {
				var disp = new EventDispatcher(),
					application = {
						state: "idle",
						action: function(){
							disp.addEventListener("test", this.handler, this);
							disp.dispatchEvent(new Event("test"));
						},
						handler: function(e){
							this.state = "started";
						}
					};
					application.action();
					d.is("started", application.state);
			}
		},
		{
			name: "addEventListener #7 (context option)",
			runTest: function(d) {
				var disp = new EventDispatcher(),
					context = {val:0},
					f = function(nom){
						var f=function(){++this.val;}; 
						f.nom=nom; 
						return f;
					};
					
					disp.addEventListener("test",f("_f1"),context);
					disp.addEventListener("test",f("_f2"),false,context);
					disp.addEventListener("test",f("_f3"),false,0,context);
					
					disp.dispatchEvent(new Event("test"));
					
					d.is(3,context.val);
			}
		},
		{
			name: "_getEventListenerInformation #1",
			runTest: function(d) {
				var disp = new EventDispatcher();
					
				disp.addEventListener("test", f1);
				disp.addEventListener("test", f2);
				var info = disp._getEventListenerInformation("test", f2);
				
				d.is("test", info.eventType);
				d.is(info.eventListener,disp._listeners["test"].byListener[1]);
				d.is(1,info.index.byListener);
				d.is(1,info.index.byPriority);
				d.is(0,info.index.inPriorities);
			}
		},
		{
			name: "hasEventListener",
			runTest: function(d) {
				var disp = new EventDispatcher();
				disp.addEventListener("test", f1);
				
				d.t(disp.hasEventListener("test"));
			}
		},
		{
			name: "dispatchEvent() #1",
			runTest: function(d) {
				var arr = [],
					f = function(e){
						arr.push(e.target.name+"<"+e.currentTarget.name);
					},
					a = new EventDispatcher();
				
				
				a.name = "a";
				a.addEventListener("test", f);
				a.dispatchEvent(new Event("test"));
				
				d.is("a<a", arr+"");
			}
		},
		{
			name: "dispatchEvent() #2 target|currenTarget",
			runTest: function(d) {
				var arr = [],
					f = function(e){
						arr.push(e.currentTarget.name+"<"+e.target.name);
					},
					a = new EventDispatcher(),
					b = new EventDispatcher(),
					c = new EventDispatcher();
				
				
				a.name = "a";
				a.addEventListener("test", f);
				a.dispatchEvent(new Event("test"));
				
				b.name = "b";
				b.addEventListener("test", f);
				b.dispatchEvent(new Event("test"));
				
				c.name = "c";
				c.addEventListener("test", f);
				c.dispatchEvent(new Event("test"));
				
				d.is("a<a,b<b,c<c", arr+"");
			}
		},
		{
			name: "dispatchEvent() #3 bubbling target|currenTarget",
			runTest: function(d) {
				var arr = [],
					f = function(e){
						arr.push(e.currentTarget.name+"<"+e.target.name);
					},
					a = new EventDispatcher(),
					b = new EventDispatcher(),
					c = new EventDispatcher();
				
				
				a.name = "a";
				a.addEventListener("bubbleTest", f);
				
				b.name = "b";
				b.addEventListener("bubbleTest", f);
				b.parent = a;
				
				c.name = "c";
				c.addEventListener("bubbleTest", f);
				c.parent = b;
				
				c.dispatchEvent(new Event("bubbleTest", true, true));
				
				//NOTE: The event bubbles - so the instances are accessed in reverse
				//		from "c" over "b" to "a" 
				d.is("c<c,b<c,a<c", arr+"");
			}
		},
		{
			name: "dispatchEvent() #4 using string",
			runTest: function(d){
				var disp = new EventDispatcher(),
					val = 0,
					f = function(){++val;};
				
				disp.addEventListener("test", f);
				disp.dispatchEvent("test");
				
				d.is(1,val);
			}
		},
		{
			name: "dispatchEvent() #5 with params",
			runTest: function(d){
				var disp = new EventDispatcher(),
					val, f = function(e){val=e.data;};
				
				disp.addEventListener("test", f);
				disp.dispatchEvent(new Event("test"), {data:"0815"});
				
				d.is("0815",val);
			}
		},
		{
			name: "dispatchEvent() #6 redispatch bubbling ",
			runTest: function(d) {
				var arr = [],
					f = function(e){
						console.dir(e);
						arr.push(e.currentTarget.name+"<"+e.target.name);
					},
					MyDispatchingClass = dojo.declare(EventDispatcher, {
						composedClass: null,
						constructor: function(){
							this.composedClass = new EventDispatcher();
							this.composedClass.addEventListener("remoteevent", this.redispatch, this);
						},
						redispatch: function(e){
							e = e.clone();
							e.bubbles = true;
							e.cancelable = true;
							this.dispatchEvent(e);
						},
						work: function(){
							this.composedClass.dispatchEvent("remoteevent", false, false);
						}
					});
					
					a = new MyDispatchingClass(),
					b = new MyDispatchingClass(),
					c = new MyDispatchingClass();
				
				a.name = "a";
				b.name = "b";
				c.name = "c";
				
				a.parent = null;
				b.parent = a;
				c.parent = b;
				
				a.addEventListener("remoteevent",f);
				
				c.work();
				
				//NOTE: The event bubbles - so the instances are accessed in reverse order
				//		from "c" over "b" to "a" 
				d.is("a<c", arr+"");
			}
		},
		{
			name: "removeEventListener #1",
			runTest: function(d) {
				var disp = new EventDispatcher();
				disp.addEventListener("test", f1);
				disp.removeEventListener("test", f1);
				
				d.f(disp.hasEventListener("test"));
				d.is(0,disp._listeners["test"].byListener.length);
				d.f("0" in disp._listeners["test"].byPriority);
				d.is(0,disp._listeners["test"].priorities.length);
			}
		},
		{
			name: "remove eventlistener by handle",
			runTest: function(d) {
				var disp = new EventDispatcher(),
					handle = disp.addEventListener("test", f1);
				
				handle.remove();
				
				d.f(disp.hasEventListener("test"));
			}
		},
		{
			name: "remove eventlistener by dispatched event",
			runTest: function(d) {
				var disp = new EventDispatcher();
				
				disp.addEventListener("test", function(e){e.removeListener();});
				disp.dispatchEvent(new Event("test"));
				
				d.f(disp.hasEventListener("test"));
			}
		},
		{
			name: "remove eventlistener by dispatched bubble event",
			runTest: function(d) {
				var a = new EventDispatcher(),
					b = new EventDispatcher(),
					c = new EventDispatcher();
				
				a.name = "a";
				b.name = "b";
				c.name = "c";
				
				a.addEventListener("test", function(e){e.removeOriginalListener();});
				b.addEventListener("test", function(e){e.removeListener();});
				c.addEventListener("test", function(){});
				c.parent = b;
				b.parent = a;
				
				
				c.dispatchEvent(new Event("test",true,true));
				
				d.f(c.hasEventListener("test"));
				d.f(b.hasEventListener("test"));
				d.t(a.hasEventListener("test"));
			}
		},
		{
			name: "remove dispatching event",
			description: "Test case where the dispatch list got corrupt when removing elemnts from the currently dispatched list",
			runTest: function(d) {
				var a = new EventDispatcher(),
					done = false;
				
				a.addEventListener("test", function(e){e.removeListener();});
				a.addEventListener("test", function(){done=true;});
				
				//could easily fail in dispatching the second listener,
				//when the dispatched list is not protected
				a.dispatchEvent(new Event("test"));
				d.t(done);
			}
		},
		{
			name: "stopPropagation",
			runTest: function(d) {
				var a = new EventDispatcher(),
					b = new EventDispatcher(),
					c = new EventDispatcher(),
					str = "",
					f = function(e){str += e.currentTarget.name;};
			
				a.name = "a";
				b.name = "b";
				c.name = "c";
				
				a.addEventListener("test", f);
				b.addEventListener("test", function(e){e.stopPropagation();});
				c.addEventListener("test", f);
				
				a.parent = null;
				b.parent = a;
				c.parent = b;
				
				c.dispatchEvent(new Event("test",true,true));
				
				d.is("c",str);
			}
		},
		{
			name: "stopImmediatePropagation",
			runTest: function(d) {
				var a = new EventDispatcher(),
					b = new EventDispatcher(),
					c = new EventDispatcher(),
					str = "",
					f = function(e){str += e.currentTarget.name;};
			
				a.name = "a";
				b.name = "b";
				c.name = "c";
				
				a.addEventListener("test", f);
				b.addEventListener("test", function(e){e.stopImmediatePropagation();});
				c.addEventListener("test", f);
				
				a.dispatchEvent(new Event("test",true,true));
				
				d.is("a",str);
			}
		}
	]);
	
});



