define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/kernel",
	"./SequenceGroup",
	"./DynamicElement",
	"./Animation",
	"./Timeout",
	"./ParallelGroup",
	"./ProcedureListener",
	"./ProcedureInvoker",
	"./DeferredListener"
], function(declare, lang, kernel, SequenceGroup, DynamicElement, Animation, Timeout, ParallelGroup, ProcedureListener, ProcedureInvoker, DeferredListener){

var _init = function(queueElement, initArgs){ 
	//summary:
	//	initializes a queueElement and returns the object's reference
	var q = queueElement; 
	
	q.init.apply(q, initArgs);
	return q; 
};

var Qutil = declare(null,{
	declaredClass: "queue.utility",
	
	make: function(/*String*/ thing /*,..rest*/){
		var factoryMethod = Qutil[thing];
		if(!factoryMethod){
			throw new Error( this.declaredClass+"::"+arguments.callee.nom+"\n ´"+thing+"´ could not be created." );
		}
		var params = Array.prototype.slice.call(arguments, 1);
		return factoryMethod.apply(Qutil, params);
	},
	//shortcuts		
	//creates a specific Queue instance, optionally mixes in some parameters into the instance and calls its init() method
	parallel:	function(elements, mixin){			return _init(lang.mixin(new ParallelGroup(), mixin),		[elements]);},
	sequence:	function(elements, mixin){			return _init(lang.mixin(new SequenceGroup(), mixin),		[elements]);},
	animation:	function(animation, params, mixin){	return _init(lang.mixin(new Animation(), mixin),			[animation, params]);},
	invoker:	function(context, method, mixin){	return _init(lang.mixin(new ProcedureInvoker(), mixin),		[context, method]);},
	caller:		function(){kernel.deprecated("excentos/queue/utility::caller()", "use invoker() instead");return Qutil.invoker.apply(null,arguments);},
	listener:	function(context, method, mixin){	return _init(lang.mixin(new ProcedureListener(), mixin),	[context, method]);},
	deferred:	function(deferred, mixin){			return _init(lang.mixin(new DeferredListener(), mixin),		[deferred]);},
	dynamic:	function(context, method, mixin){	return _init(lang.mixin(new DynamicElement(), mixin),		[context, method]);},
	timeout:	function(timeout, mixin){			return _init(lang.mixin(new Timeout(), mixin),				[timeout]);}
});

//public static method
Qutil.make	=		Qutil.prototype.make;
Qutil.parallel	=	Qutil.prototype.parallel;
Qutil.sequence	=	Qutil.prototype.sequence;
Qutil.animation	=	Qutil.prototype.animation;
Qutil.invoker	=	Qutil.prototype.invoker;
Qutil.listener	=	Qutil.prototype.listener;
Qutil.deferred	=	Qutil.prototype.deferred;
Qutil.dynamic	=	Qutil.prototype.dynamic;
Qutil.timeout	=	Qutil.prototype.timeout;

return Qutil;

});