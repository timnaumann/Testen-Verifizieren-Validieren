define([
	"dojo/_base/declare",
	"./SequenceGroup",
	"./ProcedureInvoker",
	"./_Element"
],function(declare, SequenceGroup,ProcedureInvoker,_Element){
	
	// summary:
	//	DynamicElement is a ProcedureInvoker with SequenceGroup abilities
	return declare([ProcedureInvoker,SequenceGroup],{
		declaredClass: "queue.DynamicElement",
		canHalt: true,
		init: function(/*Object?*/ context, /*Function|String*/ method){
			//this.inherited(arguments) would execute SequenceGroup::init 
			//but we only want init to behave like ProcedureInvoker
			ProcedureInvoker.prototype.init.apply(this,arguments);
			return this;
		},
		_callAndFinish: function(){
			//override ProcedureInvoker::_callAndFinish
			var el = null;
			
			if(!this.resumed){
				el = this._call();
				//if a queue Element was returned add it to the manager
				if(el && el.isInstanceOf && el.isInstanceOf(_Element)){
					this._manager.addElement(el,0);
				}else {
					this._manager.removeElements();
				}
			}
		}
	});
});