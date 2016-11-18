define([
	"dojo/_base/declare",
	"./_TableElement"
], function(declare, _TableElement){

return declare(
	"excentos.widget.table._TableContainer",
	[_TableElement],
{
	
	enableOnChildrenAltered: true,
	
	postCreate: function(){
		this.enableOnChildrenAltered &&
			this.connect(this,"addChild","_handleAddChild"),
			this.connect(this,"removeChild","_handleRemoveChild");
	},
	
	_handleAddChild: function(widget){
		this.onChildrenAltered(widget,"added");
	},
	_handleRemoveChild: function(){
		this.onChildrenAltered(widget,"removed");
	},
	
	onChildrenAltered: function(widget, action){
		var children = this.getChildren(),i=0,l=children.length;
		this.children = children;
		this.numChildren = l;
		for(;i<l;++i){
			children[i].refresh();
		}
	},
	
	addChildren: function(/*Array*/ children, /*Number*/ index){
		var args = [];
		if(index!=undefined)args[1]=index;
		
		for(var i=0,l=children.length; i<l; ++i){
			args[0] = children[i];
			this.addChild.apply(this, args);
		}
	}
});

});
