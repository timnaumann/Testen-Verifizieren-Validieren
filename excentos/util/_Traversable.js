define(function(){

var _Traversable = function(){
	// summary:
	//		_Traversable instances provide properties to
	//		traverse / navigate through a tree of _Traversable elements.
	
	//points to the hierarchical higher element. ´parent´ is always a group.
	this.parent = /*_Traversable*/ null;
	
	//points to the next element on the same hierarchical level
	this.nextSibling = /*_Traversable*/ null;
	
	//points to the previous element on the same hierarchical level
	this.previousSibling = /*_Traversable*/ null;
	
	//firstChild points to the first occurring element within a group (is always null in non-group instances).
	this.firstChild = /*_Traversable*/ null;
	
	//lastChild points to the last element within a group (is always null in non-group instances).
	this.lastChild = /*_Traversable*/ null;
	
	//lastChild is a list of all _Traversasbles within a group (is always null in non-group instances).
	this.children = /*Array*/ [];
	
	this.getRoot = function(){
		var p=this;
		while(p=p.parent){};
		return p;
	};
};

return _Traversable;

});
