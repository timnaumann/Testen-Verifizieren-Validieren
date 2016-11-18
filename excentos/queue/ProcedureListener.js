define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/topic",
	"./_Procedure"
], function(declare, lang, connect, topic, _Procedure){

return declare(_Procedure, {
	declaredClass: "queue.ProcedureListener",
	_handle: null,
	_markedAsFinished: false,
	isSubscribe: false,
	
	//TODO: support more kinds of listeners like HTMlElement.addEventListener, EventDispatcher.addEventListener ...
	//TODO: give opportunity to set a listener method / parameters manually
	execute: function(){
		//	tags: override protected
		
		//if the element is not marked as finished act as normal
		if(!this._markedAsFinished && !this.resumed){
			//ok gets a little messy here with the resumed flag ...
			//TODO: cleanup resumed case
			if(this._handle){
				this.deleteCall()
			}
			
			var finish = lang.hitch(this, "finish");
			//NOTE: a global defined method is referenced via window, but can only be dojo.connected by omitting the context param
			if(this._context){
				this._handle = connect.connect(this._context, this._method, finish);
			}else {
				if(this.isSubscribe){
					this._handle = topic.subscribe(this._method, finish);
				}else {
					this._handle = connect.connect(this._method, finish);
				}
			}
		}else {
			// if the element is marked as finished instantly resolve it
			this._markedAsFinished = false;
			this.finish();
		}
		
		this.inherited(arguments);
	},
	
	setCall: function(/*Object?*/ context, /*Function|String*/ method){
		//if only a string is given, and string is no property of ´window´ - assume its a ObserverSignal for dojo.subscribe
		if(typeof context == "string" && typeof window[context] != "function"){
			this._context = null;
			this._method = context;
			this.isSubscribe = true;
		}else {
			this.isSubscribe = false;
			this.inherited(arguments);
		}
	},
	
	finish: function(){
		// tags: override protected
		
		//the listener was called while the element is in paused state
		if(this.getState("state")==this.STATE_PAUSED){
			this._markedAsFinished = true;
		}
		else {
			this.deleteCall();
			this.inherited(arguments);
		}
	},
	
	deleteCall: function(){
		this._handle.remove();
		delete this._handle;
	}
});

});
