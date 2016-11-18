define([
	"dojo/_base/declare",
	"dijit/registry",
	"excentos/shared",
	"../_Widget",
	"excentos/tracking/linkTracker"
], function(declare, registry, shared, _Widget, linkTracker){
	
return declare(
	"excentos.widget.product.Product",
	[_Widget], {
	
	relativeTemplatePath: "Product.html",
	
	widgetsInTemplate: true,
	productObject: null,
	productId: null,
	productMainImage: null,
	attributes: null,
	
	constructor: function(/*APIProductItem?*/ product){
		if(product && ("id" in product)){
			this._setProductAttr(shared.store.getProductById(product.id));
		}
	},
	
	postMixInProperties: function(){
		this.inherited(arguments);
		if(this.productId){
			this._setProductAttr(shared.store.getProductById(this.productId));
		}
	},
	
	postCreate: function(){
		this.inherited(arguments);
		linkTracker.initLinks(this.domNode, ["goto.product.details", this.productId]);
	},

	_provideAttributes: function(/*APIProductItem*/ product){
		var attributes = this.attributes = {};
		var attrRootGroup = product.attributeRootGroup;
		var attrGroups = attrRootGroup && attrRootGroup.productAttributeGroupItems;

		for(var groupName in attrGroups){
			var groupItems = attrGroups[groupName].attributeItems;
			attributes[groupName] = {};
			for(var attrName in groupItems){
				var attr = groupItems[attrName];
				attributes[groupName][attrName] = attr;
			}
		}

		return attributes;
	},
	
	_setProductAttr: function(/*APIProductItem*/ product){
		this.productObject = product;
		this.productId = product.id;
		this.productMainImage = this.getImage();
		this._provideAttributes(product);
	},

	getImages: function(/*String?*/ size){
		return size ?
			shared.store.getOrderedProductImagesBySize(this.productId, size) :
			shared.store.getOrderedProductImages(this.productId)
	},
	
	getImage: function(/*String*/ size, /*Number*/ index){
		index = index || 0;
		return this.getImages(size)[index];
	},
	
	addToComparison: function(){
		return shared.behavior.addProductsToComparison(this.productId, /*return comparison table*/ true);
	},
	
	removeFromComparison: function(){
		//summary:
		//	removes the product from comparisonList and the comparisonTable
		var isLastRemainingProduct = shared.store.getOrderedProductsInComparison().length == 1;
		//removal is asynchronous; removing the last remaining product means there shouldnt be any product left to be displayed
		if(isLastRemainingProduct){
			shared.comparisonContainer && shared.comparisonContainer.hide();
		}
		return shared.behavior.removeProductsFromComparison(this.productId, /*return comparison table*/ true);
	},
	
	// TODO: Es gibt keinerlei Verlass darauf, dass das Produkt überhaupt noch in den recommendations ist.
	//       d.h. aktuell funktioniert der Produktdetailseitenlink nur, wenn das produkt noch in
	//       der aktuellen Empfehlungsliste ist. 
	//  -> ist da evtl. das Softwaredesign falschrum -> "go to product details" muss das Produkt 
	//     widget machen und nicht die recommendation (strengg. ist recommendation eine Ableitung
	//     von Product?? 
	openProductDetails: function(){
		shared.behavior.goToProductDetailsPage(this.productObject);
	}
});

});
