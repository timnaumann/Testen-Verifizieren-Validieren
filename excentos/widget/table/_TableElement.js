define([
	"dojo/_base/declare",
	"dojo/_base/query",
	"dojo/dom-class",
	"../_Widget",
	"dijit/_Container",
	"dijit/_Contained"
], function(declare, query, domClass, _Widget, _Container, _Contained){

return declare(
	"excentos.widget.table._TableElement",
	[_Widget, _Container, _Contained],
{
		parityClassNames: ["xc_odd","xc_even"],
		parityClass: "",
		parity: null,
		
		label: "",
		labelNode: null,
		
		indexInParent: -1,
		
		children: null,
		numChildren: 0,
		
		_setLabelAttr: function(str){
			this.label = str;
			this.labelNode && (this.labelNode.innerHTML = str);
		},
		
		_setParityAttr: function(num){
			if(this.parity != num){
				this.parity = num;
				this.parityClass = this.parityClassNames[this.parity];
				domClass.replace(this.domNode, this.parityClass, this.parityClassNames.join(" "));
			}
		},
		
		updateParity: function(){
			var index = this.indexInParent = this.getIndexInParent();
			if(index>-1){
				this.set("parity", index%2);
			}
		},
		
		updatePosition: function(){
			domClass.remove(this.domNode, "xc_last xc_first");
			
			!this.getPreviousSibling() && domClass.add(this.domNode, "xc_first");
			!this.getNextSibling() && domClass.add(this.domNode, "xc_last");
		},
		
		refresh: function(){
			//in case we have accidently overridden a previous refresh
			this.inherited(arguments);
			
			this.updateParity();
			this.updatePosition();
			//in case label was set directly
			this.set("label", this.label);
		}
});

});