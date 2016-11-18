define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"excentos/util",
	"./_Widget",
	"./_ApiWidget"
], function(declare, lang, djEvent, util, _Widget, _ApiWidget){

return declare(
	"excentos.widget.NavigationButton",
	[_Widget, _ApiWidget],
{
		
	templateString: '<div>\
						<span class="xc_count" data-dojo-attach-point="countNode"></span>\
						<span class="xc_label">%{data.label}</span>\
					</div>',
					
	widgetsInTemplate: true,
	//is not defined itself via api; it just uses the api data
	isApiWidget: false,


	constructor: function(){
		this.baseClass += " xc_navigation_button";
	},
	
	postMixInProperties: function(){
		this.inherited(arguments);
		if(!this.getApiObject()){
			throw new Error(this.declaredClass + "is missing an api Object like `data`, `state`, `facet` or `facetgroup`");
		}
	},
	
	postCreate: function(){
		this.inherited(arguments);
		this.on("click", lang.hitch(this, this._onButtonClick));
	},
	
	_onButtonClick: function(/*Event*/ e){
		djEvent.stop(e);
		var vars = this.getApiVars();
		
		if(!this.get("disabled")){
			this.onButtonClick(this.getApiName(), this);
		}
	},
	
	onButtonClick: function(apiName, widget){}, // just a clean event for the outside world
	
	refresh: function(){
		var vars = this.getApiVars();
		
		util.toggleClasses(this.domNode, {
			completed: vars.completed,
			disabled: !vars.enabled,
			collapsed: !vars.expanded,
			inview: vars.inView,
			wasinview: vars.wasInView,
			invisible: !vars.visible,
			first: this.get("first"),
			last: this.get("last")
		});
		this.set("disabled", !vars.enabled);
	},
	
	_setCountAttr: function(str){
		this.countNode.innerHTML = str;
	},
	
	_getCountAttr: function(){
		return this.countNode.innerHTML;
	}

});

});
