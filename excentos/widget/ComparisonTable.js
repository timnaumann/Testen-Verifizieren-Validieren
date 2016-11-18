define([
	"dojo/_base/declare",
	"dojo/json",
	"excentos/shared",
	"../Singleton",
	"./product/Product" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/Table" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/Header" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/HeaderRow" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/HeaderCell" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/RowGroup" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/Row" /*NMD:Ignore*/, /*implicit module declaration*/
	"./table/Cell" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, JSON, shared, Singleton, Product, Table, Header, HeaderRow, HeaderCell, RowGroup, Row, Cell){

return Singleton(declare("excentos.widget.ComparisonTable", null, {
	
	table: null,
	productList: null,
	
	refresh: function(){
		var productList = shared.store.getOrderedProductsInComparison();
		if(!this.productList || JSON.stringify(productList) !== JSON.stringify(this.productList)){
			this.productList = productList;
			if(this.table){
				this.table.destroyDescendants();
			}else {
				this.createTable();
			}
			this.createTableContent();
		}
	},
	
	createTable: function(){
		// summary:
		//		builds the whole table based on comparisonTable Object from store
		
		this.table = shared.widgetFactory.makeWidget("table.Table", {templatePackage: this.templatePackage});
		return this.createTableContent();
	},
	
	createTableContent: function(){
		var header = this.createTableHeader();
		var rowGroups = this.createRowGroups();
		
		this.table.addChild(header);
		this.table.addChildren(rowGroups);
		
		return this.table;
	},
	
	createTableHeader: function(){
		var header = this.header = shared.widgetFactory.makeWidget("table.Header", {templatePackage: this.templatePackage});
		var headerRow = shared.widgetFactory.makeWidget("table.HeaderRow", {templatePackage: this.templatePackage});
		
		var store = shared.store,
			productList = store.getOrderedProductsInComparison(),
			productWidget,
			headerCell;
		
		for(var i=0,l=productList.length;i<l;++i){
			headerCell = shared.widgetFactory.makeWidget("table.HeaderCell", {templatePackage: this.templatePackage});
			//a product widget reference should be created only once - when the product data is available for the first time
			//we temporarily dont care about that - in the future it shuld look like this   {{{Product.getInstance(id); //getInstance decides whether its new or reused}}}
			
			productWidget = shared.widgetFactory.makeWidget("product.Product", {productId:productList[i].productId, templatePackage: this.templatePackage});
			
			headerCell.addChild(productWidget);
			headerRow.addChild(headerCell);
		}
		
		header.addChild(headerRow);
		return header;
	},
	
	//TODO: make unified ´_create´ method 
	createRowGroups: function(){
		var items = shared.store.getOrderedComparisonGroupItems(),
			item, instances=[], instance, i=0, l=items.length;
		for(; i<l; ++i){
			item = items[i];
			instance = shared.widgetFactory.makeWidget("table.RowGroup", {templatePackage: this.templatePackage});
			instance.set("label", this._getLabelText(item, instance));
			instances.push(instance);
			
			instance.addChildren(this.createRows(item));
		}
		
		return instances;
	},
	
	createRows: function(/*Object*/ rowGroupItem){
		var items = shared.store.getOrderedComparisonAttributesByGroupName(rowGroupItem.name),
			item, instances=[], instance, i=0, l=items.length;
		for(; i<l; ++i){
			item = items[i];
			instance = shared.widgetFactory.makeWidget("table.Row", {templatePackage: this.templatePackage});
			instance.set("label", this._getLabelText(item, instance));
			instances.push(instance);
			
			instance.addChildren(this.createCells(rowGroupItem, item));
		}

		return instances;
	},
	
	createCells: function(/*Object*/ rowGroupItem, /*Object*/ rowItem){
		var items = shared.store.getOrderedComparisonCellItemsInGroupByAttributeName(rowGroupItem.name, rowItem.attributeName),
			item, instances=[], instance, i=0, l=items.length;
		for(; i<l; ++i){
			item = items[i];
			instance = shared.widgetFactory.makeWidget("table.Cell", {templatePackage: this.templatePackage});
			instance.set("label", this._getLabelText(item, instance));
			instances.push(instance);
			
			//instance.addChildren() nothing more to add
		}
		
		return instances;
	},
	
	_getLabelText: function(item, tableElement){
		var label = item.label || "",
			unit = item.unit || "";
		return label ? label+unit : "";
	}
}));

});