define([
    "dojo/_base/declare",
	"./State"
], function(declare, State){

return declare(
	"excentos.widget.facet.input.state.Unset",
	State, {

	constructor: function(){
		this.baseClass += " xc_unset";
	},

	labelNode: null,
	isApiWidget: false,

	postMixInProperties: function(){
		this.inherited(arguments);
		this.state = {
			name: "unset"
		};
	},

	refresh: function(){
		var hasTextContent = !!(this.labelNode && this.labelNode.innerText || this.labelNode.textContent);
		hasTextContent ? this.show() : this.hide();
	},

	_onClick: function(e){
		this.facetWidget._onResetClick(e);
	},
	_onMouseOver: function(/*Event*/ evt){
		this.onMouseOver(evt);
	},
	_onMouseOut: function(/*Event*/ evt){
		this.onMouseOut(evt);
	},

	_setFacetWidgetAttr: function(widget){
		this.facetWidget = widget;
		if(this.labelNode){
			this.labelNode.innerHTML = widget.facetInGroup.labelUnset || widget.i18n.input_unset;
		}
	},

	isVisible: function(){
		return !this.facetWidget.getConfigItems("noUnset", "boolean");
	},

	getApiChildren: function(){
		return []; //empty collection
	}

});

});
