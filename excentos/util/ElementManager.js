define([
	"dojo/_base/declare",
	"../Stateful",
	"./ElementHolder"
], function(declare, xcStateful, ElementHolder){

/**
 * The BasicManager Class provides functionality for any Container
 * which needs to hold elements and step through each one (eg. Slides of RIA, Waypoints of racegame, etc)
 * ported from ActionScript 3
 * @author m.lucas@excentos.com
 */
return declare([xcStateful, ElementHolder], {
	declaredClass: "util.ElementManager",
	index:0,
	loopMode: true,
	
	/**
	 * returns the next element
	 * @return
	 */
	getNext: function()/*:**/ {
		var i/*:int*/ = this.getNextIndex();
		return this._elements[i];
	},
	getNextIndex: function()/*:Number*/ {
		if (this.loopMode) return (this.index + 1) % this.getLength();
		//check if there is  next item
		return (this.index+1 < this.getLength()) ? this.index+1 : this.index;
	},
	
	/**
	 * returns the previous element
	 * @return
	 */
	getPrevious: function()/*:**/ {
		var i/*:int*/ = this.getPreviousIndex();
		return this._elements[i];
	},
	getPreviousIndex: function()/*:Number*/ {
		if (this.loopMode) return this.index > 0 ? this.index - 1 : this.getLength() - 1;
		//check if there is a previous item
		return this.index > 0 ? this.index - 1 : 0;
	},
	
	/**
	 * returns the current Element
	 * @return
	 */
	getCurrent: function()/*:**/ {
		return this._elements[this.getCurrentIndex()];
	},
	getCurrentIndex: function()/*:Number*/ { return this.index; },
	
	getFirst: function(){
		return this._elements[0];
	},
	getFirstIndex: function(){
		return 0;
	},
	
	getLast: function(){
		return this._elements[this._elements.length-1];
	},
	getLastIndex: function(){
		return this._elements.length-1;
	},
	
	isAtLast: function(){
		return this.getLength()-1 == this.index;
	},
	isAtFirst: function(){
		return this.index==0;
	},
	
	/**
	 * Moves the manager's pointer to the next element
	 * @return
	 */
	gotoNext: function()/*:**/ {
		this.set("index",this.getNextIndex());
		return this.getCurrent();
	},
	
	/**
	 * Moves the manager's pointer to the previous
	 * @return
	 */
	gotoPrevious: function()/*:**/ {
		this.set("index",this.getPreviousIndex());
		return this.getCurrent();
	},
	
	/**
	 * Moves the manager's pointer to the last element
	 * @return
	 */
	gotoLast: function()/*:**/ {
		this.set("index",this.index == 0 ? this.getLength()-1 : this.index-1);
		return this.getCurrent();
	},
	
	/**
	 * Moves the manager's pointer to the first element
	 * @return
	 */
	gotoFirst: function()/*:**/ {
		this.set("index",0);
		return this.getCurrent();
	},
	
	gotoIndex: function(index){
		this.set("index",index);
		//check valid index
		return this.getCurrent();
	},
	gotoElement: function(obj){
		this.set("index",this.findElement(obj));
		//check valid index
		return this.getCurrent();
	},
	toString: function(){
		return "[object "+this.declaredClass+"]";
	}
});

});