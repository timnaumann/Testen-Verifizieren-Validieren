define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/util",
	"./ComparisonTable" /*NMD:Ignore*/, /*implicit module declaration*/
	"./OverlayBox",
	"excentos/aspect"
], function(declare, shared, util, ComparisonTable, OverlayBox, xcaspect){

return declare("excentos.widget.ComparisonDialog", [OverlayBox], {
	relativeTemplatePath: "ComparisonDialog.html",

	//TODO: rename-to/make `comparisonTable` a factory; it is actually just a factory for widget.table.Table instances which represent comparison data from excentos.Store!
	comparisonTable: null,
	_comparisonTableHandle: null,
	
	comparisonTableFactoryType: "widget.ComparisonTable",
	
	draggable: false,
	
	getComparisonTableInstance: function(){
		return this.comparisonTable || (this.comparisonTable = util.$(this.comparisonTableFactoryType).getInstance());
	},
	
	show: function(){
		// summary;
		//	super.show() is not instantly called - the original gets called after onNewAppComparisonTable
		this._comparisonTableHandle = xcaspect.after(excentos.shared.behavior, "onNewAppComparisonTable", this.refresh, this);
		shared.behavior.getComparisonTable();
	},
	
	hide: function(){
		this.inherited(arguments);
		this._comparisonTableHandle.remove();
	},
	
	refresh: function(){
		var hasProducts = !!shared.store.getProductsInComparison(), content;
		
		if(hasProducts){
			this.comparisonTable = this.getComparisonTableInstance();
			content = this.comparisonTable.createTable();
		} else {
			content = "<div class='xc_empty_comparison'>" + this.i18n.comparisontable_noproducts + "</div>";
		}
		
		this.set("content", content);

		// If already shown resize and reposition. Else this will be done by the following `show` call.
		if(this.get("open")){
			this._size();
			this._position();
		}
		OverlayBox.prototype.show.call(this);
	}
	
});

});
