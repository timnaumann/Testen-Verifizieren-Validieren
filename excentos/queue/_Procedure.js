define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_Element"
], function(declare, lang, _Element){

return declare(_Element, {
	// summary:
	//		Base class for all "remote function call"-related QueueElements
	
	declaredClass: "queue._Procedure",
	
	// _context: Object
	// the context in which the desired method should be called
	_context:null,
	
	// _method: Function | String
	// Reference or name of the function that is being called
	_method:null,
	
	// _call: Function
	// the scoped reference of ´_method´ to ´_context´
	_call: null,
	
	init: function(/*Object?*/ context, /*Function|String*/ method){
		this.inherited(arguments);
		// summary:
		//		init method of _Procedure class
		// context:
		//		the context in which the desired method should be called.
		//		This parameter can be omitted.
		// method:
		// 		Reference or name of the function that is being called
		
		//if ´method´ is not given and ´context´ is function or string, we assume that ´context´ would like to be omitted
		if(!method && (typeof context == "function" || typeof context == "string")){
			//shift arguments to fit the variables
			method = context;
			context = null;
		}
		if(method){
			this.setCall(context,method);
		}
		
		return this;
	},
	
	setCall: function(/*Object?*/ context, /*Function|String*/ method){
		// summary:
		//		sets the actual call that is used internally
		// context:
		//		the context in which the desired method should be called.
		//		if there is no ´context´ given the method will be called in ´window´ context
		// method:
		// 		Reference or name of the function that is being called
		this._context = context;
		this._method = method;
		this._call = (context && lang.hitch(context, this._method)) || (typeof method=="string" ? window[method] : method);
		
		//DEV?
		//if(typeof method=="string")this.name = method;
	},
	
	getCall: function(){
		// summary:
		//		returns the scoped method call that is used internally
		return this._call;
	}
	
});

});
