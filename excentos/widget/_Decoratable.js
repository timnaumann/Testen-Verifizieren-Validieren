define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"./_Enrichable",
	"./enrichment/EnrichmentWidget"
], function(declare, domClass, _Enrichable, EnrichmentWidget) {
	
	return declare(_Enrichable, {
		postCreate: function() {
			this.inherited(arguments);
			this.decorate();
		},
		
		decorate: function(){
			if (this.isDecoratable() === true) {
				domClass.add(this.domNode, "xc_has_decoration");
				//TODO handle case when the exact same decoration would be re-applied
				this.getDecorationWidget().placeAt(this.decorationWidgetNode);
			}
		},

		isDecoratable: function() {
			return !!this.decorationWidgetNode && this._isEnrichmentEnabled(
				EnrichmentWidget.ENRICHMENT_TYPE_DECORATION
			);
		},

		getDecorationWidget: function() {
			return this.isDecoratable() ? 
					this._getEnrichmentWidget(EnrichmentWidget.ENRICHMENT_TYPE_DECORATION) :
					null;
		}
	});
});