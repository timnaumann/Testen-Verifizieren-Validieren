define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_Element"
], function(declare, lang, _Element){

return declare(_Element, {
	declaredClass: "queue.Timeout",
	
	// _amount : Number
	//		milliseconds the timeout will last
	_amount: 0,
	
	// _pausedAmount : Number
	//		milliseconds the timeout has passed until pause was entered
	_pausedAmount: 0,
	
	// _timeoutID: Number
	//		the reference id that is returned by setTimeout
	_timeoutID: null,
	
	// _executionStart: Number
	//		a timestamp gets stored when the timeout is executed
	_executionStart: -1,
	
	init: function(/*Number?*/ amount){
		this.inherited(arguments);
		if(amount)this._amount = amount;
		
		return this;
	},
	
	execute: function(){
		//	tags: override protected
		this.inherited(arguments);
		
		this._executionStart = new Date().getTime();
		this._timeoutID = setTimeout(lang.hitch(this,this.finish),this.getAmountRemaining());
	},
	
	getAmountRemaining: function(){
		// summary:
		//		returns what is left of the timeout.
		return this.isPaused() ? 
			   this._amount - this._pausedAmount :
			   Math.max(0, this._amount - (new Date().getTime() - this._executionStart));
	},
	
	_stop: function(){
		this._clearTimeout();
		this._pausedAmount = 0;
		this._executionStart = -1;
		this.inherited(arguments);
	},
	
	_pause: function(){
		this._clearTimeout();
		this._pausedAmount = new Date().getTime() - this._executionStart;
	},
	
	_clearTimeout: function(){
		clearTimeout(this._timeoutID);
	}
});

});
