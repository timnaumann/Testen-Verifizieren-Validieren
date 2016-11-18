define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/when",
	"./_Element"
], function(declare, lang, when, _Element){

//TODO: make this class pausable
var DeferredListener = declare(_Element,{
	declaredClass: "queue.DeferredListener",
	remoteDeferred: null,
	canHalt: false,
	_markedAsFinished: false,
	
	init: function(remoteDeferred){
		this.inherited(arguments);
		remoteDeferred && this.setRemoteDeferred(remoteDeferred);
		
		return this;
	},
	
	execute: function(){
		this.inherited(arguments);
		var finish = lang.hitch(this, this.finish);
		when(this.remoteDeferred, 
			finish,
			finish
		);
	},
	
	setRemoteDeferred: function(remoteDeferred){
		this.remoteDeferred = remoteDeferred;
	},
	
	getRemoteDeferred: function(){
		return this.remoteDeferred;
	}
});

return DeferredListener;
});