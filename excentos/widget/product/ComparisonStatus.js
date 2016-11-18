define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"excentos/shared",
	"../_Widget",
    "../../tracking/Tracker"
], function(declare, domClass, shared, _Widget, tracker){

return declare(
	"excentos.widget.product.ComparisonStatus",
	[_Widget],
{
	relativeTemplatePath: "product/ComparisonStatus.html",
	templateString: '<div class="xc_comparison_status">\
						<div class="xc_compare_add">%{!i18n.product_compare}</div>\
						<div class="xc_compare_remove">%{!i18n.product_removefromcomparison}</div>\
					</div>',
	
	productId: "",
	product: null,
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.product = this.product || shared.store.getProductById(this.productId);
	},
	
	postCreate: function(){
		//documentme why is there no this.inherited(arguments);
		if(!this.productId || !this.product){
			console.error(this.declaredClass+" ("+this.id+") has no assigned product");
		}
		this.refresh();
		this.on("click", this._onClick);
	},
	
	refresh: function(){
		this._inComparison = this.productId in (shared.store.getProductsInComparison() || {});
		domClass.toggle(this.domNode, "xc_in_comparison", this._inComparison);
	},
	
	_onClick: function(){
		if(this._inComparison){
			domClass.remove(this.domNode, "xc_in_comparison");
			shared.behavior.removeProductsFromComparison(this.productId);
		}else{
			domClass.add(this.domNode, "xc_in_comparison");
			shared.behavior.addProductsToComparison(this.productId);
		}		
	},
	
	_onMouseOver: function(/*Event?*/ evt){
		//	summary:
		//		add hover functionality
		//		since ie7 does not support it correctly
		//		add xc_hover class
		domClass.add(this.domNode, "xc_hover");
	},
	
	_onMouseOut: function(/*Event?*/ evt){
		//	summary:
		//		add hover functionality
		//		since ie7 does not support it correctly
		//		remove xc_hover class
		domClass.remove(this.domNode, "xc_hover");
	}
});

});
