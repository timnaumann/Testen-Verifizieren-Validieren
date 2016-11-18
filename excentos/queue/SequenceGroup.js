define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"./_Group",
	"../event/QueueEvent",
	"../event/QueueBubbleEvent"	
], function(declare, lang, connect, _Group, QueueEvent, QueueBubbleEvent){

return declare(_Group, {
	declaredClass: "queue.SequenceGroup",
	execute: function(){
		//tags: override
		var _handleElementOnBegin = lang.hitch(this, this._handleElementOnBegin);
		var _handleElementOnEnd = lang.hitch(this, this._handleElementOnEnd);
		
		//TODO: Move code to _addCallbacks or _setupDeferredExecution
		this.inherited(arguments);
		var el = this._manager.getCurrent();
		if(el){
			this._disconnectHandler();
			this._onBeginHandler = 	[el.addEventListener(QueueEvent.BEGIN, _handleElementOnBegin)];
			this._onEndHandler = 	[el.addEventListener(QueueEvent.END, _handleElementOnEnd)];
			el.start();
		}
		else {
			this.finish();
		}
	},
	
	_dispatchEvent: function(event){
		var isBeginEvent = event.type==QueueEvent.BEGIN || event.type==QueueBubbleEvent.BEGIN;
		//only fire onExecutionBegin Events if we are executing the first element
		if(isBeginEvent && !this._manager.isAtFirst()){
			return;
		}
		this.inherited(arguments);
	},
	
	_handleElementOnEnd: function(e){
		//tags: override
		this.inherited(arguments);
		this._cycleThroughElements();
	},

	_cycleThroughElements: function(){
		//cycle through the elements list
		this._manager.gotoNext();
		
		//dont go on if in paused state
		if(this.getState("state")==this.STATE_PAUSED){
			return
		}
		
		//avoid auto loop here if the manager re-enters the first element
		if(this._manager.isAtFirst()){
			this.finish();
		}else{
			this.execute();
		}
	},
	
	_stop: function(){
		//tags: override
		this._disconnectHandler();
		//delegate stop
		var el = this._manager.getCurrent();
		if(el){
			el.stop();
			this._manager.gotoFirst();
		}
		
		this.inherited(arguments);
	},
	
	_pause: function(){
		//tags: override
		this.inherited(arguments);
		
		//delegate pause
		var el = this._manager.getCurrent();
		el && el.pause();
	}
	
});

});
