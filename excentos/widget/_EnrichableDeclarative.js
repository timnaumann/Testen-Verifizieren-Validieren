define([
	"dojo/_base/declare",
	"dojo/dom-attr",
	"dojo/query"
], function(declare, domAttr, query) {

	/**
	 * Mixin for creating EnrichmentWidget declarative - spawn instant Enrichments as much as you like:
	 *
	 * Usage:
	 * <div data-xc-enrichable-create="enrichmentType:'decoration', templateKey:'enrichment.decoration.TitleImageText'"></div>
	 *
	 * which will mark that node with   <div data-xc-enrichable-refid="..."
	 *
	 * After the template was parsed and placed in DOM (postCreate) each match for that refid-attribute will spawn an Enrichment Widget via
	 * _Enrichable::createEnrichmentWidget( data_from_data-xc-enrichable-create )
	 *
	 */

	var dataAttributeEnrichableCreate = "data-xc-enrichable-create",
		dataAttributeEnrichableRefId = "data-xc-enrichable-refid";

	return declare(null, {

		/***** Widget Lifecycle Hooks *****/
		_stringRepl: function(/*String*/ template){
			var _template = this._markEnrichableCreateTemplateElementsWithRefId(/*String*/ template);
			return this.inherited(arguments, [_template]);
		},

		postCreate: function(){
			this.inherited(arguments);
			this._createMarkedEnrichableCreateElements();
		},
		/***** Widget Lifecycle Hooks *****/


		_markEnrichableCreateTemplateElementsWithRefId: function(/*String*/ template){
			var matchEnrichableCreateAttr = new RegExp("\\b"+dataAttributeEnrichableCreate+"\\b","gim");
			return template.replace(matchEnrichableCreateAttr, dataAttributeEnrichableRefId + "=\"" + this.id + "\" $&");
		},

		_createMarkedEnrichableCreateElements: function(){
			query("["+dataAttributeEnrichableRefId+"="+this.id+"]", this.domNode)
			  .forEach(this._createMarkedEnrichableCreateElement, this);
		},

		_createMarkedEnrichableCreateElement: function(/*HTMLElement*/ domNode){
			var enrichableCreateAttrValue = domAttr.get(domNode, dataAttributeEnrichableCreate);
			var enrichableCreateParamsObjectFromAttrValue = new Function("return {"+enrichableCreateAttrValue+"}").call(this);
			domNode.removeAttribute(dataAttributeEnrichableRefId);

			//most likely requires a unique `enrichmentType` to avoid conflicts with non-explicit-declarative enrichments
			//case:  having a declarative enrichment of enrichmentType 'decoration' would cause the auto-magical
			// 		 `decorationWidgetNpode` to just reuse that already known enrichment of type 'decoration' instead of
			//		 creating a fresh one from default behavior (finding a template by config and assigning values by its template definition)
			enrichableCreateParamsObjectFromAttrValue.enrichmentType = this._createDeclarativeEnrichmentType(enrichableCreateParamsObjectFromAttrValue.enrichmentType);
			var enrichmentWidget = this.createEnrichmentWidget(enrichableCreateParamsObjectFromAttrValue);
			enrichmentWidget && enrichmentWidget.placeAt(domNode, "last");
		},

		_createDeclarativeEnrichmentType: function(enrichmentType){
			return enrichmentType + "-declarative-" + this.id;
		}
	});
});