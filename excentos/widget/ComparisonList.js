define([
	"dojo/_base/declare",
	"dijit/_Container",
	"dijit/_Contained",
	"excentos/shared",
	"excentos/widget/_Widget",
	"excentos/widget/product/Product"
], function(declare, _Container, _Contained, shared, _Widget, Product){

var ComparisonList = declare(
	"excentos.widget.ComparisonList",
	[_Widget, _Container],
	{
		
		relativeTemplatePath: "ComparisonList.html",
		templateString: '<div class="xc_comparisonlist">\
							<div class="xc_title"></div>\
							<div class="xc_comparisonlist_counter">\
								<span class="xc_counter" data-dojo-attach-point="counterNode"></span>\
							</div>\
							<ul class="xc_comparisonlist_items" data-dojo-attach-point="containerNode"></ul>\
							<div class="xc_button xc_comparebutton" data-dojo-attach-point="compareButtonNode">\
								<span>%{i18n.comparisontable_showtable}</span>\
							</div>\
						</div>',
						
						
		products: null,
		comparisonListItems: null,
		counterNode: null,
		containerNode: null,
		listItemType: "ComparisonListItem",
		
		constructor: function(){
			this.comparisonListItems = [];
			this.products = [];
		},
		
		postCreate: function(){
			this.inherited(arguments);
			this.compareButtonNode && this.connect(this.compareButtonNode, "onclick", this._onCompareClick);
		},
		
		refresh: function(){
			this.removeItems();
			this._createItems();
		},
		
		removeItems: function(){
			var items = this.comparisonListItems;
			while(items.length){
				var item = items.pop();
				item.destroy();
			}
		},
		
		_createItems: function(){
			var products = shared.store.getProducts(),
				productsInComparison = shared.store.getOrderedProductsInComparison();
			
			for(var i=0,l=productsInComparison.length; i<l; ++i){
				var product = products[productsInComparison[i].productId];
				this.products.push(product);
				
				var widget = this._createItem(product, i, productsInComparison);
				if(!widget)console.error(this.declaredClass+"::"+arguments.callee.nom+"()  call to `_createItem` returned '"+typeof widget+"' but 'object' was expected");
				
				this.comparisonListItems.push(widget);
			}
			
			return this.comparisonListItems;
		},
		
		_createItem: function(product, index, productIds){
			var widget = shared.widgetFactory.makeWidget(this.listItemType, {productObject: product});
			widget.placeAt(this.containerNode);
			
			return widget;
		},
		
		_onCompareClick: function(){
			shared.behavior.showComparisonTable();
		}
	}
);

var ComparisonListItem = declare(
	"excentos.widget.ComparisonListItem",
	[_Contained, Product],
	{
		
		relativeTemplatePath: "ComparisonListItem.html",
		templateString: '<div class="xc_comparisonlist_item">\
							<div class="xc_label">%{productObject.label}</div>\
							<div class="xc_remove" data-dojo-attach-event="onclick:removeFromComparison"></div>\
						</div>',
						
		productObject: null,
		comparisonItem: null,
		
		constructor: function(obj){
			this.productObject = obj.productObject;
			this.productId = this.productObject.id;
		}
	}
);

return {
	ComparisonList: ComparisonList,
	ComparisonListItem: ComparisonListItem
};

});