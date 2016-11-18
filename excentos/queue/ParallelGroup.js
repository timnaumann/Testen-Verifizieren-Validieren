define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"./_Group",
	"dojo/DeferredList",
	"../event/QueueEvent",
	"../event/QueueBubbleEvent"	
], function(declare, lang, connect, _Group, DeferredList, QueueEvent, QueueBubbleEvent){

return declare(_Group, {
	
	declaredClass: "queue.ParallelGroup",
	_deferreds: null,
	execute: function(){
		if(this.resumed){
			for(var i=0, l=this._manager.getLength(), el=null; i<l; i++){
				el =this._manager.getElementAt(i);
				//only start/resume unresolved elements 
				el.getDeferred().fired<0 && el.start();
			}
		}else {
			this._setupDeferredExecution();
		}
	},
	_setupDeferredExecution: function(){
		//tags: override
		var _handleElementsOnBegin = lang.hitch(this,this._handleElementOnBegin);
		var _handleElementsOnEnd = lang.hitch(this,this._handleElementOnEnd);
		
		this._deferreds = [];
		this._onBeginHandler = [];
		this._onEndHandler = [];
		
		//_Group::_handleElementOnEnd forces both events to bubble - is this event here redundant?
		this._dispatchEvent(new QueueEvent(QueueEvent.BEGIN));
		this._dispatchEvent(new QueueBubbleEvent(QueueBubbleEvent.BEGIN));
		
		//fill the deferredList with elements from manager
		//will be instantly resolved if the deferred list is empty
		for(var i=0, l=this._manager.getLength(), el=null; i<l; i++){
			el = this._manager.getElementAt(i);
			this._onBeginHandler.push(	el.addEventListener(QueueEvent.BEGIN, _handleElementsOnBegin));
			this._onEndHandler.push(	el.addEventListener(QueueEvent.END, _handleElementsOnEnd));
			this._deferreds.push(el.start());
		}
		
		if(this._needNewDeferred()){
			this._createDeferred();
			this._addCallbacks();
		}
	},
	
	//creates deferred list
	_createDeferred: function(){
		//tags: override
		this._deferred = new DeferredList(this._deferreds);
	},
	
	_stop: function(){
		//stop all elements that are running or paused
		//tags: override
		for(var i=0, l=this._manager.getLength(), el=null; i<l; i++){
			el = this._manager.getElementAt(i);
			el.isActive() && el.stop();
		}
	},
	
	_pause: function(){
		//stop all elements that are running
		//tags: override
		for(var i=0, l=this._manager.getLength(), el=null; i<l; i++){
			el = this._manager.getElementAt(i);
			el.isRunning() && el.pause();
		}
	}
});

});
