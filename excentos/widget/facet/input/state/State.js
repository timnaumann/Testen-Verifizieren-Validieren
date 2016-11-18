define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"excentos/shared",
	"excentos/util",
	"../../../_ApiWidgetMixin"
], function(declare, domClass, shared, util, _ApiWidgetMixin){

return declare(
	"excentos.widget.facet.input.state.State",
	_ApiWidgetMixin,
{
	relativeTemplatePath: "facet/input/state/State.html",
	
	widgetsInTemplate: true,
	
	//	checked: Boolean
	//		The current state of the state/option
	//		Class 2 property
	checked: false,

	//	facetWidget: excentos.widget.facet.input._InputNew
	//		Reference to the facet container/context
	facetWidget: null,
	
	//	state: Object
	//		The state statics
	//	tags:
	//		readonly
	state: null,
	
	// collapsible: Boolean
	//		states usually dont collapse - in case they should initialize the corresponding instance with �true�
	// tags:
	//		public
	collapsible: false,
	
	// matchingProductCountPrefix: String
	matchingProductCountPrefix : " (", // note the space in front

	// matchingProductCountPostfix: String
	matchingProductCountPostfix : ")",

	constructor: function(){
		this.baseClass += " xc_state";
	},
	
	_setCheckedAttr: function(/*Boolean*/ checked){
		//	summary:
		//		sets the checked flag and corresponding css class
		if(this.checked !== checked){
			this.checked = checked;
		
			domClass.toggle(this.domNode, "xc_checked", checked);
		}
	},
	
	refresh: function(){
		//	summary:
		//		refresh ui referring to the
		//		current state vars 
		var vars = this.getApiVars();
		
		util.toggleClasses(this.domNode, {
			disabled: !vars.enabled,
			invisible: !vars.visible,
			first: this.get("first"),
			last: this.get("last")
		});
		
		if(this.matchingProductCountNode){
			if(vars.matchingProductCount >= 0 && !this.checked){
				this.matchingProductCountNode.innerHTML = this.matchingProductCountPrefix+vars.matchingProductCount+this.matchingProductCountPostfix;
			}else{
				this.matchingProductCountNode.innerHTML = "";
			}
		}
	},

	_onClick: function(e){
		//	summary:
		//		If not disabled call public on click method.
		var vars = this.getApiVars();
		
		if(vars.enabled){
			this.onClick();
		}
	},
	
	onClick: function(){
		//	summary: Pipes the event to its facetWidget.
		this.facetWidget.onStateClick(this);
	},
	
	_onMouseOver: function(/*Event*/ evt){
		var vars = this.getApiVars();
		
		if(vars.enabled){
			this.onMouseOver(evt);
		}
	},
	
	_onMouseOut: function(/*Event*/ evt){
		var vars = this.getApiVars();
		
		if(vars.enabled){
			this.onMouseOut(evt);
		}
	},
	
	onMouseOver: function(/*Event?*/ evt){
		//	summary:
		//		add hover functionality
		//		since ie7 does not support it correctly
		//		add xc_hover class
		domClass.add(evt ? evt.currentTarget : this.domNode, "xc_hover");
	},
	
	onMouseOut: function(/*Event?*/ evt){
		//	summary:
		//		add hover functionality
		//		since ie7 does not support it correctly
		//		remove xc_hover class
		domClass.remove(evt ? evt.currentTarget : this.domNode, "xc_hover");
	}
});

});
