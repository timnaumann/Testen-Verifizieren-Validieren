define([
	"dojo/_base/declare",
	"./Tooltip"
], function(declare, Tooltip){

return declare(
	"excentos.widget.InteractiveTooltip",
	[Tooltip],
{
	// summary:
	// Creates a tooltip that can be interacted with (wont hide instantly when user leaves the 'connectNode')
		
	_state: "idle",
	// hideDelay: Integer
	//		Milliseconds until the fadeOut happens
	hideDelay: 500,
	
	// _hideTimer: Integer
	// 		holds the integer reference to a setTimeout
	_hideTimer: 0,
	
	// _lastTarget: DOMNode
	//		keeps a reference to the last 'connectNode' that needs to be re-applied after the event-flow
	_lastTarget: null,
	
	// _connectionList: Array
	// 		the list of dojo handles created by _createCustomConnectionList
	_connectionList: null,
	
	// _needsReset: Boolean
	//		is true when _switchTarget() was called and the original targets have to be restored
	_needsReset: false,
	
	
	open: function(target){
		// summary:
		//		Display the tooltip by calling dijit.showTooltip() and executes _switchTarget()
		// tags:
		//		override protected (formerly privat)
		this.inherited(arguments);
		this._switchTarget(target);
		this._state = "open";
	},

	_switchTarget: function(target){
		// summary:
		//		This function is the difference to the normal tooltip behavior.
		//		The connections to the 'connectNode' are removed and cusomt listeners are applied
		//		to be able interact with the displayed tooltip
		// tags:
		//		protected
		this._lastTarget = target;
		this.removeTarget(target);
		
		this._connectionList = this._createCustomConnectionList();
		this._needsReset = true;
	},

	close: function(){
		// summary:
		//		Hide the tooltip or cancel timer for show of tooltip and calls _reset() method
		// tags:
		//		override protected (formerly private)
		this._reset();
		this.inherited(arguments);
		this._state = "close";
	},
	

	_reset: function(){
		// summary:
		//		resets the tooltip behavior to default by removing custom connections and re-adding the original ones
		// tags:
		//		protected
		if(this._needsReset){
			this._removeConnections(this._connectionList);
			this._connectionList = null;
			this.addTarget(this._lastTarget);
			this._needsReset = false;
		}
	},

	_createCustomConnectionList: function(){	
		// summary:
		//		creates the dojo connections to the tooltip itself and a special one for the connectNode
		// tags:
		//		protected
		// returns:
		//		Array with dojo connects in a nested array.
		//		The extra nesting is needed to reuse excentos.widget.Tooltip::_removeConnections()
		return [
		    [this.connect(this._connectNode,"onmouseleave","_onTargetMouseLeave")],
		    [this.connect(dijit._masterTT.domNode,"onmouseenter","_onMasterTTEnter")],
		 	[this.connect(dijit._masterTT.domNode,"onmouseleave","_onMasterTTLeave")]
		]
	},
	
	_onMasterTTEnter: function(/*Event*/ e){
		// summary:
		//		simply avoids the tooltip from being hidden as long as it was entered within 'hideDelay' milliseconds
		// tags:
		// 		protected
		this._clearHideTimer();
	},
	
	_onMasterTTLeave: function(/*Event*/ e){
		// summary:
		//		directly calls _onTargetMouseLeaveUndelayed()
		// 		man-in-the-middle function in case of overrides
		// tags:
		// 		protected
		this._onTargetMouseLeaveUndelayed(e);
	},
	
	_onTargetMouseLeaveUndelayed: function(/*Event*/ e){
		// summary:
		// 		instantly hides the tooltip but respecting the usual event flow
		// tags:
		//		protected
		
		var __hideDelay = this.hideDelay
		this.hideDelay = 0;
		this._onTargetMouseLeave(e);
		this.hideDelay = __hideDelay;
	},
	
	_onUnHover: function(/*Event*/ e){
		// summary:
		//		Despite the name of this method, it actually handles both mouseleave and blur
		//		events on the target node, hiding the tooltip.
		//		Hiding will be delayed if triggered by the connectNode - 
		//		this way the user can either interact with the tooltip (if it is reached within that delay)
		//		or just let the tooltip disappear as usual.
		// tags:
		//		override protected (formerly private)
		
		
		//prevents delayed show of tooltip
		this._clearShowTimer();
		//we dont need close logic if nothing is open
		if(this._state != "open")return;
		if(!this._hidetimer){
			var target = e.target;
			this._hideTimer = setTimeout(dojo.hitch(this, "close"), this.hideDelay);
		}
	},
	
	_onHover: function(e){
		this._clearHideTimer();
		this.inherited(arguments);
		
	},
	
	_clearHideTimer: function(){
		// summary:
		//		deletes the timer for a delayed hide of a tooltip
		// tags:
		//		protected
		
		if(this._hideTimer){
			clearTimeout(this._hideTimer);
			delete this._hideTimer;
		}
	}
})
});
