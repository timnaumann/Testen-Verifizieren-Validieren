define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"../event/EventDispatcher",
	"../event/ElementHolderEvent"
], function(declare, array, EventDispatcher, ElementHolderEvent){

return declare(EventDispatcher, {
	declaredClass: "util.ElementHolder",
	_elements: null,
	
	constructor: function() {
		this._elements = [];
	},
	
	//apply available events to be able to register to bubbling events by default
	//if these were no set - one had to register the corresponding event individually on each instance in an parent-child relationship
	//in order to benefit from event bubbling
	_applyEventHandlers: function(){
		this.inherited(arguments);
		//dojo connect compatible;
		this.addEventListener(ElementHolderEvent.ADDED, 			this.onElementsAdded);
		this.addEventListener(ElementHolderEvent.ADDED_MULTIPLE, 	this.onElementsAdded);
		this.addEventListener(ElementHolderEvent.REMOVED, 			this.onElementsRemoved);
		this.addEventListener(ElementHolderEvent.REMOVED_MULTIPLE,	this.onElementsRemoved);
	},
	
	/**
	 * adds an element to the elements list
	 * @return
	 */
	addElement: function(obj /*:**/, index /*:Number*/, overwrite /*:Boolean = true*/)/*:void*/ {
		if(index===undefined)index = this.getLength();
		
		this.addElementAt(obj, index, overwrite);
	},
	addElementAt: function(/*any*/ obj, /*Number*/ index, overwrite /*:Boolean = true*/ ){
		if(overwrite===undefined)overwrite=true; 
		
		var delcount = overwrite ? 1 : 0;
		var elementsCopy = this._elements.slice();
		this._elements.splice(index, delcount, obj);
		
		var e = new ElementHolderEvent(ElementHolderEvent.ADDED, index, [obj], elementsCopy);
		this.dispatchEvent(e);
		
		this.onElementsAdded(e);
	},
	addElements: function(/*Array*/ elements/*Number*/, index, overwrite /*:Boolean = true*/)/*:void*/ {
		
		//backward compatibility: if ´elements´ is no array the arguments list will be turned into an array
		var isArray = Object.prototype.toString.call(elements) == "[object Array]";
		if(!isArray)elements = Array.prototype.slice.call(arguments);
		if(index===undefined || !isArray)index=this.getLength();
		if(!isArray)overwrite = undefined;
		
		var max/*:int*/ = elements.length, currentItem/*:**/;
		var elementsCopy = this._elements.slice();
		for (var i=0; i < max; i++ ) {
			currentItem = elements[i];
			this.addElement(currentItem, index+i, overwrite);
		}
		
		var e = new ElementHolderEvent(ElementHolderEvent.ADDED_MULTIPLE, this.getLength()-elements.length, elements, elementsCopy);
		this.dispatchEvent(e);
		
		this.onElementsAdded(e);
	},
	
	/**
	 * removes one or more elements from elements list by given index
	 * Remove all elements by calling removeElementsFromIndex(0,-1);
	 * @return
	 */
	removeElementsFromIndex: function(index /*:int*/, count /*:int = 1*/)/*:void*/ {
		if(count===undefined)count=1;
		var elementsCopy = this._elements.slice();
		var removed = this._elements.splice(index, count);
		
		//TODO: Review data for event
		var e = new ElementHolderEvent(ElementHolderEvent.REMOVED, index, removed, elementsCopy);
		this.dispatchEvent(e);
		
		this.onElementsRemoved(e);
	},	
	
	/**
	 * removes one or more element from elements list by value/reference
	 * @return
	 */
	removeElements: function(elements)/*:void*/ {
		elements = elements || this._elements;
		var elementsCopy = this._elements.slice();
		array.forEach(elements,this.removeElement,this);
		
		var e = new ElementHolderEvent(ElementHolderEvent.REMOVED_MULTIPLE, -1, elements, elementsCopy);
		this.dispatchEvent(new ElementHolderEvent(ElementHolderEvent.REMOVED_MULTIPLE, -1, elements, elementsCopy));
		
		this.onElementsRemoved(e);
	},
	removeElement: function(obj/*:**/)/*:void*/ {
		var _i/*:int*/ = this.findElement(obj);
		this.removeElementsFromIndex(_i,1);
	},
	/**
	 * finds an element by given reference within the list and returns its index
	 * @return
	 */
	findElement: function(obj /*:**/)/*:Number*/{
		return array.indexOf(this._elements,obj);
	},
	
	/**
	 * finds an element by its property:value pair within the list and returns all matching references
	 * @return
	 */
	getElementsByPropertyValue: function(prop /*:String*/, value /*:**/, weak /*:Boolean=false*/)/*:Array*/{
		weak = weak || false;
		var e=this._elements, i=e.length, c=null, cp=null, matches=[];
		while(i--){
			c = e[i];
			cp = c[prop];
			if(cp!==undefined){
				if(weak ? cp==value : cp===value){
					matches.push(c);
				}
			}
		}
		return matches;
	},
	
	
	getElementAt: function(index){
		return this._elements[index];
	},
	
	/**
	 * returns the element list
	 * @return
	 */
	getElements: function()/*:Array*/ { return this._elements; },
	getLength: function()/*:Number*/ { return this._elements.length; },
	
	onElementsAdded: function(e){},
	onElementsRemoved: function(e){},
	toString: function(){
		return "[object "+this.declaredClass+"]";
	}
});

});
