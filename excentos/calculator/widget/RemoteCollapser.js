define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom",
	"dijit/_Widget",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/fx"
], function(declare, lang, dom, _Widget, domClass,  domAttr, fx){


var RemoteCollapser = declare("excentos.calculator.widget.RemoteCollapser", [_Widget],{
	
	targetNode: null,
	expanded: false,
					
	postCreate: function(){
		this.inherited(arguments);
		
		this.connect(this.domNode, "onclick", this._onClick);
		domClass.add(this.domNode,"xc_collapser");		
		
		this.set("target", this.get("target"));
		this.updateCssClass();
	},
	
	_onClick: function(e){
		this.toggle();
	},
	
	_setTargetAttr: function(str){
		this.targetNode = dom.byId(str);
	},
	_getTargetAttr: function(){
		return domAttr.get(this.domNode,"target");
	},
	
	toggle: function(){
		if(!this.targetNode)return;
		
		this.expanded ? this.collapse() : this.expand();
		this.expanded = !this.expanded;
	},
	
	updateCssClass: function(){
		var n = this.domNode, t = this.targetNode;
		domClass.toggle(n,"xc_collapsed",!this.expanded);
		domClass.toggle(t,"xc_collapsed",!this.expanded);
	},
	
	collapse: function(){
		var update = lang.hitch(this,"updateCssClass");
		fx.wipeOut({
			node:this.targetNode,
			onEnd: update
		}).play();
	},
	expand: function(){
		var update = lang.hitch(this,"updateCssClass");
		fx.wipeIn({
			node:this.targetNode,
			onEnd: update
		}).play();
	}

});

return RemoteCollapser;
});