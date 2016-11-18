define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_Procedure"
], function(declare, lang, _Procedure){

return declare(_Procedure, {
	
	declaredClass: "queue.ProcedureInvoker",
	canHalt: false,
	
	execute: function(){
		//	tags: override protected
		this.inherited(arguments);
		this._callAndFinish();
	},
	
	_callAndFinish: function(){
		//call _Procedure::_call();
		this._call();
		//the deferred is instantly resolved after the call
		this.finish();
	},
	
	//the invoker allows ´method´ to be function instead of string
	setCall: function(/*Object*/ context, /*String*/ method, /*Array?*/ params){
		//	tags: override protected
		this.inherited(arguments);
		
		this._call = lang.hitch(this._context, method, params || []);//   this._call.apply(this._context, params);
	}
});

});
