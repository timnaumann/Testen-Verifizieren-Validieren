define([
	"dojo/aspect"
], function(aspect){

var xcaspect = {
	around: function(/*Object*/ target, /*String*/ methodName, /*Function*/ advice, /*Object?*/ context){
		// summary: 
		//		dojo.aspect with context option
		//		http://bugs.dojotoolkit.org/ticket/13992#comment:2
		
		context = context || target;
		//create an aspect.around in desired context			
		return aspect.around(target, methodName, function(original){
			//dojo's aspect.around requires a function to be returned;
			//replaced dojo.hitch by   function(){return (function(){}).apply(context,args)}
			return function(){ return (function(){
				//store the original arguments as array
				var args = Array.prototype.slice.call(arguments);
				//recreate ability to call the original method in its former context
				var org = function(){return original.apply(target,args);};
				//create an object for the advice to not lose any information about the original call
				var obj = {target:target,method:original,methodName:methodName,arguments:args};
				//call the advice in desired context
				return advice.apply(this,[org,obj]);
			}).apply(context, arguments);};
		});
	},
	before: function(/*Object*/ target, /*String*/ methodName, /*Function*/ advice, /*Object?*/ context){
		// summary:
		//		Fixes issue where dojo.aspect.before does even trigger before aspect.around
		//		that have been set later on
		
		context = context || target;
		return this.around(target, methodName, function(original,information){
			advice.apply(context,information.arguments);
			return original();
		});
	},
	after: function(/*Object*/ target, /*String*/ methodName, /*Function*/ advice, /*Object?*/ context, /*Boolean?*/ receiveArguments){
		// summary:
		//		Fixes issue where dojo.aspect.after does even trigger when an aspect.around has been set later on
		
		// dojo compliant - if context was omitted
		if(typeof context=="boolean"){
			receiveArguments = context;
			context = null;
		}
		
		context = context || target;
		return this.around(target, methodName, function(original,information){
			
			var retOrg 	= original(),
				args 	= receiveArguments ? information.arguments : [retOrg],
				retAdv 	= advice.apply(context,args);
			
			return retAdv;
		});
	}
};

function _once(/*String*/ aspectType /*...rest*/){	
	var args = Array.prototype.slice.call(arguments,1),
		handle = null,
		advice = args[2];
	
	args[2] = function(){
		handle.remove();
		advice.apply(this, args); //bound to the scope's context (window || context parameter)
	};
	
	return handle = this[aspectType].apply(this,args);
};

function once(/*String*/ aspectType){
	return function(){
		var args = Array.prototype.slice.call(arguments);
		args.unshift(aspectType);
		return _once.apply(xcaspect, args);
	};
};

xcaspect.around.once = once("around");
xcaspect.before.once = once("before");
xcaspect.after.once = once("after");

return xcaspect;

});
