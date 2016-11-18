define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dijit/Tooltip"
], function(declare, array, Tooltip){

return declare(
	"excentos.widget.Tooltip",
	[Tooltip],
{	
	// summary:
	//		this is a refactored version of dijit.Tooltip 
	//		which allows overrides on formerly hidden functionality


	_setConnectIdAttr: function(/*String*/ newId){
		// summary:
		//		Connect to node(s) (specified by id)
		// tags: 
		//		override protected
		this._removeConnections();
		this._set("connectId", newId);
		this._addConnections(newId);
	},
	
	_removeConnections: function(/*Array*/ connectionList){
		// summary:
		// 		Remove connections to old nodes (if there are any)
		var connectionList = connectionList || this._connections || [];
		array.forEach(connectionList || [], function(nested){
			array.forEach(nested, dojo.hitch(this, "disconnect"));
		}, this);
	},
	
	_addConnections: function(/*String*/ newId){
		// summary:
		// 		Make connections to nodes in newIds.
		var ary = dojo.isArrayLike(newId) ? newId : (newId ? [newId] : []);
		this._connections = dojo.map(ary, this._connectionIterator, this);
		this._connectIds = ary;	// save as array
	},
	
	_connectionIterator: function(/*DOMNode|String*/ id){
		// summary:
		//		this function is called on each item of an _addConnections() call
		// return:
		// 		Array with dojo connection handles or an empty array
		var node = dojo.byId(id);
		return node ? this._createConnectionList(node) : [];
	},
	
	_createConnectionList: function(/*DOMNode*/ node){
		// summary:
		//		makes dojo connects to the given node
		// return:
		// 		Array with dojo connection handles
		return [
			this.connect(node, "onmouseenter", "_onTargetMouseEnter"),
			this.connect(node, "onfocus", "_onTargetFocus"),
			this.connect(node, "onmouseleave", "_onTargetMouseLeave"),
			this.connect(node, "onblur", "_onTargetBlur")
		]
	},
	
	_clearShowTimer: function(){
		// summary:
		//		deletes the timer for a delayed show of a tooltip
		if(this._showTimer){
			clearTimeout(this._showTimer);
			delete this._showTimer;
		}
	}
});

});
