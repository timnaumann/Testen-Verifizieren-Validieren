define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"excentos/shared",
	"excentos/log",
	"./_EnrichableDeclarative",
	"excentos/widget/enrichment/EnrichmentWidget"  /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, lang, shared, log, _EnrichableDeclarative, EnrichmentWidget) {
	var configKeyEnabled = "enabled";

	var _Enrichable = declare(_EnrichableDeclarative, {
		_enrichments: null,

		constructor: function() {
			this._enrichments = {
				templates: {},
				widgets: {}
			};
		},
		
		_isEnrichmentEnabled: function(enrichmentType) {
			// summary: returns true if `contentItems` or `configItems` provide `${enrichmentType}_enabled = true`
			var apiObject = this.getApiObject(),
				configLookupKey = enrichmentType + "_" + configKeyEnabled;

			if (apiObject.contentItems && configLookupKey in apiObject.contentItems) {
				if (apiObject.contentItems[configLookupKey] === "true") {
					return true;
				} else {
					if (apiObject.contentItems[configLookupKey] !== "false") {
						log("enrichable",
							configLookupKey +
							" only supports boolean value: " +
							apiObject.contentItems[configLookupKey] +
							" given. Falling back to false!"
						);
					}
					return false;
				}
			} else {
				return false;
			}
		},

		_getEnrichmentWidget: function(enrichmentType) {
			var enrichmentWidget = this._enrichments.widgets[enrichmentType];
			if (!enrichmentWidget) {
				var enrichmentTpl = this._getEnrichmentTemplate(enrichmentType);

				if (!enrichmentTpl) {
					var errorMsg = this.declaredClass+"::"+arguments.callee.nom+"() No enrichment template configured for `" + enrichmentType + "` on " + this.getApiType() + " `" + this.getApiName() + "`";
					log("enrichable", errorMsg, this);					
					throw new Error(errorMsg);
				}

				enrichmentWidget = this.createEnrichmentWidget({enrichmentType: enrichmentType});
			}

			return this._enrichments.widgets[enrichmentType] = enrichmentWidget;
		},

		createEnrichmentWidget: function(obj){
			var enrichmentType = obj.enrichmentType;
			var enrichmentTemplate = enrichmentType ? "enrichment." + this._getEnrichmentTemplate(enrichmentType) : "";
			obj = lang.mixin({
				widgetType: "enrichment.EnrichmentWidget",
				enrichmentType: "",
				templateKey: enrichmentTemplate,
				enrichableWidget: this,
				data: this.data
			}, obj);

			return this._enrichments.widgets[obj.enrichmentType] = shared.widgetFactory.makeWidget(obj.widgetType, obj);
		},

		_getEnrichmentTemplate: function(enrichmentType) {
			if (!this._enrichments.templates[enrichmentType]) {
				/*
				 * WidgetType lookup strategy:
				 * 
				 * Lookup template key order:
				 * 		- [state|facet|group]_[explanation|decoration]_template
				 * 		- [explanation|decoration]_template
				 *
				 * Lookup location:
				 * 		- contentItems of the enrichable widget
				 * 		- configItems of the enrichable's tree
				 * 		- global config
				 */
				var apiType = this.getApiType(),
					templateSearchKeys = [
						apiType + "_" + enrichmentType + "_template",
						enrichmentType + "_template"
					],
					templateSearchKeysCount = templateSearchKeys.length,
					contentItems = this.getApiObject().contentItems,
					enrichmentTpl = null;

				// check content Items
				if (contentItems) {
					for (var i = 0; i < templateSearchKeysCount; ++i) {
						if (contentItems[templateSearchKeys[i]]) {
							enrichmentTpl = contentItems[templateSearchKeys[i]];
							break;
						}
					}
				}

				var store = shared.store,
					apiName = this.apiName,
					TREE_SCOPE_STATE = 0, 
					TREE_SCOPE_FACET_IN_GROUP = 1, 
					TREE_SCOPE_GROUP = 2,
					treeScope = apiType == "state" ? TREE_SCOPE_STATE : (
								apiType == "facet" ? TREE_SCOPE_FACET_IN_GROUP :
								TREE_SCOPE_GROUP);

				// walk the config tree
				while (!enrichmentTpl && apiName) {
					var data = null;

					switch (treeScope) {
						case TREE_SCOPE_STATE:
							apiName = apiName.replace(".state.",".");
							// collect state data
							var stateSeparatorIndex = apiName.lastIndexOf("."),
								state = apiName.substr(stateSeparatorIndex + 1),
								facetInGroup = apiName.substr(0, stateSeparatorIndex),
								states = store.getFacetInGroupStateItemsByFacetInGroupName(facetInGroup);
	
							if (states) {
								data = states[state];
							}
							treeScope = TREE_SCOPE_FACET_IN_GROUP;
						break;
						case TREE_SCOPE_FACET_IN_GROUP:
							// collect facet in group data
							data = store.getFacetInGroupByName(apiName);
							treeScope = TREE_SCOPE_GROUP;
						break;
						default:
							// collect group data
							data = store.getFacetGroupByName(apiName);
						break;
					}

					// check for config in current level
					if (data) {
						var configItems = data.configItems;
						if (configItems) {
							for (var i = 0; i < templateSearchKeysCount; ++i) {
								if (configItems[templateSearchKeys[i]]) {
									enrichmentTpl = configItems[templateSearchKeys[i]];
									break;
								}
							}
						}
					}
					// next level
					apiName = apiName.substr(0, apiName.lastIndexOf("."));
				}

				// fallback to global config
				if (!enrichmentTpl) {
					for (var i = 0; i < templateSearchKeysCount; ++i) {
						enrichmentTpl = store.getConfigByKey(templateSearchKeys[i]);
						if (enrichmentTpl) {
							break;
						}
					}
				}

				this._enrichments.templates[enrichmentType] = enrichmentTpl;
			}

			return this._enrichments.templates[enrichmentType];
		}
	});

	return _Enrichable;
});
