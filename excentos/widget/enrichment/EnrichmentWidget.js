define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"../_Widget"
], function(declare, domClass, _Widget){
	/**
	 * http://trac/trac/xcTechnologies/wiki/XcAjaxClient/Features/Enrichable
	 * Enrichment
	 * A Widget that contains enrichments of one category like "explanation" or "decoration"
	 * 
	 * How does it work:
	 * - the "owner" of that EnrichmentWidget (referred as `enrichableWidget`) is being referenced at instantiation time
	 * - the EnrichmentWidget collects all the data from that `enrichableWidget.enrichments` and remaps them to its own `data` property 
	 * 	This gives us the flexibility to conveniently access enrichments in EnrichableWidgets and EnrichmentWidgets like `%{enrichments.explanation}` from template
	 * 	Also for the enrichment Widget the category scope is optional as the EnrichmentWidget istself represents a specific category - thus an explanation text could be accessed without using the category explicitly - see the hardcoded template example below
	 * - The enrichmentWidget also uses the css classes as stated in _Enrichables like "xc_has_enrichment_text"
	 */
	var EnrichmentWidget = declare(
		"excentos.widget.enrichment.EnrichmentWidget",
		_Widget,{
		
		enrichmentType: "",
		templateKey: "",

		enrichableWidget: null,

		// The api object of the enrichable widget
		data: null,

		postCreate: function() {
			this.inherited(arguments);
			this._addCssClasses();
		},

		getHtml: function(){
			var n = this.domNode;			
			return this._html = this._html || n.outerHTML;
		},
		
		templateVariableReplaceFunction: function(matchStr, key, paramString, formatName, index, string){
			// summary: override _TemplatedVariableHandler::templateVariableReplaceFunction()
			for(var i=0,types=EnrichmentWidget.ENRICHMENT_TYPES,l=types.length; i<l; ++i){
				//key starts with "decoration"|"explanation"
				var foundPosition = key.indexOf(types[i]);
				if(foundPosition != -1){
					(this.__hasEnrichments||(this.__hasEnrichments=[])).push("xc_has_"+key.substring(foundPosition));
				}
			}
			
			return this.inherited(arguments);
		},

		_addCssClasses: function(){
			var classes = [
				"xc_enrichment",
				"xc_enrichment_category",
				"xc_enrichment_" + (this.enrichmentType || "notset"),
				"xc_widget_" + (this.templateKey.replace(/\./g, '_') || "notset")
			];
			
			domClass.add(this.domNode, classes);
			this.enrichableWidget && domClass.add(this.enrichableWidget.domNode, this.__hasEnrichments);
			
			delete this.__hasEnrichments;
		}
	});
	
	
	EnrichmentWidget.ENRICHMENT_TYPES = [
		EnrichmentWidget.ENRICHMENT_TYPE_EXPLANATION = "explanation",
		EnrichmentWidget.ENRICHMENT_TYPE_DECORATION = "decoration"
	];
	
	return EnrichmentWidget;
});