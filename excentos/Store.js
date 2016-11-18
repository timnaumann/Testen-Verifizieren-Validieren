define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"./Singleton"
], function(declare, lang, array, Singleton){

return Singleton(declare(null, {

	// the actual data
	_data: undefined,

	// a holder for indexes (which indexes are maintained and which not is determined per object type)
	// indexes are typically helpful to get objects "by id" that are sent in a hierarchical tree
	_idx: undefined,
	
	//	_handlerMethods: Array 
	_handlerMethods: undefined,

	xcInitial: null,

	constructor: function(){
		this._data = {
			applicationItems: {}
		};
		
		this._idx = {
			applicationItems: {}
		};
		
		this._handlerMethods = [];

		this.init();
	},

	init: function(){
		this.setXcInitial(window.xcInitial);
	},

	setXcInitial: function(/*Object*/ _xcInitial){
		this.xcInitial = _xcInitial;
		this.xcInitial.payload && this.setResult(this.xcInitial.payload);
	},

	setResults: function(/*Array*/ results, /*Function?*/ callback){
		//	summary:
		//		Merges an array of result sets from the service and calls 'setResult'.
		var mergedResult = (results.length == 1) ? results[0] : this._mergeResults(results);
		return this.setResult(mergedResult, callback);
	},
	
	_mergeResults: function(/*Object[]*/ results){
		//	summary:
		//		Takes an array of service results and merges them to a single result.
		var mergedResult = {applicationItems:{}};
		
		for(var i = 0, l = results.length; i < l; ++i){
			var result = results[i];
			
			for(var objectType in result){
				var item = result[objectType];
				
				if(objectType != "applicationItems"){
					if(!mergedResult[objectType]){
						mergedResult[objectType] = {};
					}
					
					lang.mixin(mergedResult[objectType], item);	
				}else{
					for(var appName in result.applicationItems){
						var applicationItem = result.applicationItems[appName];
						if(!mergedResult.applicationItems[appName]){
							mergedResult.applicationItems[appName] = applicationItem;
						}else{
							for(var appItemType in applicationItem){
								var appItem = applicationItem[appItemType];
								if(appItem){
									if(!mergedResult.applicationItems[appName][appItemType]){
										mergedResult.applicationItems[appName][appItemType] = {};
									}
									
									lang.mixin(mergedResult.applicationItems[appName][appItemType], appItem);	
								}
							}
						}
					}
				}
			}
		}
		
		return mergedResult;
	},
	
	setResult: function(/*Object*/ result, /*Function?*/ callback){
		//	summary:
		//		Takes a complete result set from the service, stores the data and optionally calls the
		//		given callback with an automatically created, object-type-dependent method name.

		// everything but application data
		var handlerMethods = []; // array that contains objects like {methodName: "onNewFoo", appName: "bar"}
		var addHandler = function(/*String*/ objectType, /*String*/ appName){
			var methodNamePrefix = appName ? "onNewApp" : "onNew";
			
			var handler = {methodName: methodNamePrefix + objectType.slice(0, 1).toUpperCase() + objectType.slice(1)};
			appName && (handler.appName=appName);
			
			handlerMethods.push(handler);
			return handler;
		};

		// the on* callbacks are processed first for these ones here (store is filled up upfront anyways). Order is important, onNew* handlers rely on it. 
		var ensuredObjTypeOrder = ["metaData", "config", "clientI18n", "facets", "facetGroups", "products", "facetVars", "facetGroupVars", "recommendations", "crossSellingRecommendations"];

		var objectType, item;
		for(objectType in result){
			item = result[objectType];
			
			if(item && objectType != "applicationItems"){
				this._setData(item, objectType, null, result);
				addHandler(objectType);
			}
		}

		for(var appName in result.applicationItems){
			var applicationItem = result.applicationItems[appName];
			var doneTypes = {};

			// push the ordered ones first:
			for(var i=0,l=ensuredObjTypeOrder.length; i<l; i++){
				objectType = ensuredObjTypeOrder[i];
				item = applicationItem[objectType];
				if(item){
					this._setData(item, objectType, appName, result);
					addHandler(objectType, appName);
					doneTypes[objectType] = true;
				}				
			}
			// now the rest
			for(objectType in applicationItem){
				item = applicationItem[objectType];
				if(item && !(objectType in doneTypes)){
					this._setData(item, objectType, appName, result);
					addHandler(objectType, appName);
				}
			}
		}
				
		this._handlerMethods = handlerMethods;
		
		// Finally call the callback method with each handlerMethodName, do it at the and to ensure that the whole new dataset is already indexed.
		// This prevents using old data in one of the handlerMethods. (call handlerMethod not before all new data was stored (indexed) 
		// to avoid inconsistent data uses)	

		if(callback){
			this.callMethodHandlers(callback);
		}
	},
	
	callMethodHandlers: function(/*Function*/ callback){
		//	summary:
		//		Calls the given callback for each auto-registered handlerMethod (onNewXY)
		//		passing methodName as first, and the appName as second param.
		//		This is used by the Controller to call Behaviorcallbacks, since the Behaviors
		//		are not initialized when the first data is passed to the Store.	
		
		for(var i = 0, l = this._handlerMethods.length; i < l; i++){
			var method = this._handlerMethods[i];
			callback(method.methodName, method.appName);
		}
	},
	
	_setData: function(/*Object*/ data, /*String*/ objectType, /*String?*/ appName, /*Object*/ responsePayload){
		//	summary:
		//		Internally used for writing data to the store.
		//	description:
		//		Indexes facetGroups, facetsInGroup, facetInGroupVars and recommendations for performance improvement.
		
		// Make sure the data structure is prepared for the incoming data.
		this._prepareStore(objectType, appName);
		
		// Most object types have special requirements, but you can push anything else in here, too.
		switch(objectType){
			case "facets":
				var storedFacets = this._data.applicationItems[appName].facets;
				if(!("facetItems" in storedFacets)){
					storedFacets.facetItems = {};
				}
				lang.mixin(storedFacets.facetItems, data.facetItems);

				return;
				
			case "facetVars":
				var storedFacetVars = this._data.applicationItems[appName].facetVars;
				if(!("facetVarItems" in storedFacetVars)){
					storedFacetVars.facetVarItems = {};
				}
				
				lang.mixin(storedFacetVars.facetVarItems, data.facetVarItems);

				return;
			
			case "facetGroups":
				this._data.applicationItems[appName].facetGroups = data;
								
				this._indexFacetGroups(appName);
				this._indexFacetInGroups(appName);

				return;
			
			case "facetGroupVars":
				var storedFacetGroupVars = this._data.applicationItems[appName].facetGroupVars;
				
				// Add facet group vars outside of `facetGroupVarItems`.
				// Mixin everything but `facetGroupVarItems`.
				// TODO Implement mixin of `facetGroupVars` in a more generic way.
				for(var facetGroupVarName in data){
					if(facetGroupVarName != "facetGroupVarItems"){
						storedFacetGroupVars[facetGroupVarName] = data[facetGroupVarName];
					}
				}
				
				if(!("facetGroupVarItems" in storedFacetGroupVars)){
					storedFacetGroupVars.facetGroupVarItems = {};
				}
				
				// Add the received facet group variable items to the stored facet group variable items.
				lang.mixin(storedFacetGroupVars.facetGroupVarItems, data.facetGroupVarItems);

				// Index the received items as new items.
				this._indexFacetInGroupVars(appName, data);

				return;
				
			case "products":
				var storedProducts = this._data.applicationItems[appName].products;
				if(!("productItems" in storedProducts)){
					storedProducts.productItems = {};
				}
				for(var id in data.productItems){
					var productItem = data.productItems[id];
					if(id in storedProducts){
						// Mixin the attributes to make sure old references to the product object remain valid.
						lang.mixin(storedProducts.productItems[id], productItem);
					}else{
						// new product
						storedProducts.productItems[id] = productItem;
					}

					this._indexProducts(appName, productItem);
					this._indexProductImages(appName,  productItem);
				}
		
				return;
				
			case "recommendations":
				// Overwrite the stored recommendation with the new data.
				this._data.applicationItems[appName].recommendations = data;
				this._indexReasons(appName);
				this._indexRecommendations(appName);

				return;
			case "crossSellingRecommendations":

				var crossSellingRecommendations = {};

				// get cross selling recommendations by customer product id - you may have more than one product selected to get cross selling recommendations
				for (var customerProductId in data.crossSellingRecommendationItems) {
					crossSellingRecommendations[customerProductId] = data.crossSellingRecommendationItems[customerProductId];
				}

				// Overwrite the stored cross selling recommendations with the new data.
				this._data.applicationItems[appName].crossSellingRecommendations = data;
				var product = this._idx.applicationItems[appName].products.byCustomerProductId[crossSellingRecommendations[customerProductId].refProdId];


				try {
					this._indexCrossSellingRecommendations(appName, product, crossSellingRecommendations);
				}
				catch(e){

					//weird app answer, hot fix
				}

				return;
			case "comparisonTable":
				this._data.applicationItems[appName].comparisonTable= data;
				this._indexComparisonTable(appName);
				return
			default: // e.g. for the comparisonTable, calculatorData, metaData etc.
				// Default is replace because if it is not replacing, it earns a special case treatment.
				if(typeof appName == "string"){
					this._data.applicationItems[appName][objectType] = data;
				}else{
					this._data[objectType] = data;
				}
				
				return;
		}
	},
	
	_prepareStore: function(/*String*/ objectType, /*String?*/ appName){
		//	summary:
		//		makes sure the necessary data structures for an object type are there

		// Is the object application-specific?
		if(typeof appName == "string"){
			var appDataItems = this._data.applicationItems,
				appIdxItems  = this._idx.applicationItems;
			
			if(!(appName in appDataItems)){
				appDataItems[appName] = {};
			}
			
			if(!(objectType in appDataItems[appName])){
				appDataItems[appName][objectType] = {};
			}
			
			if(!(appName in appIdxItems)){
				appIdxItems[appName] = {byName:{}};
			}		
		}else{
			if(!(objectType in this._data)){
				this._data[objectType] = {};
			}							
		}
	},
	
	_indexFlat: function(/*Object*/ objects, /*String*/ objectType, /*String*/ appName, /*String*/ indexAttribute,
						/*String*/ indexName, /*Boolean?*/ unique){
		//	summary:
		//		A generic indexer for flat data structures (e.g. used for products).
		if(typeof unique == "undefined"){
			unique = true;
		}
		// In any case we clear the existing index, respectively create when it does not exist.
		this._idx.applicationItems[appName][objectType][indexName] = {};
		// Create a shortcut to the index name.
		var idx = this._idx.applicationItems[appName][objectType][indexName];
		// Run over the objects and fill the index:
		for(var objectKey in objects){
			var key = objects[objectKey][indexAttribute];
			if(typeof key == "undefined" || key === ""){
				break;
			}
			if(unique){
				idx[key] = objects[objectKey];
			}else{
				if(typeof idx[key] == "undefined"){ 
					idx[key] = [];
				}
				idx[key].push(objects[objectKey]);
			}
		}
	},
	
	_indexFacetGroups: function(/*String*/ appName){
		//	summary:
		//		Recurses new facetGroups structure and creates an index byName and byFacetName.
		var idx = this._idx.applicationItems[appName];
		idx.facetGroups = {
			byName: {},
			byFacetName: {},
			byWidgetType: {},
			byNameRecursive: {},
			byGroupType: {},
			byDepth: [],
			byDepthName: {}
		};

		this._indexFacetGroup(this._data.applicationItems[appName].facetGroups.facetRootGroup, idx);
	},

	_indexFacetGroup: function(/*Object*/ facetGroup, /*Object*/ idx){
		var depth = arguments[2] || 0;
		var byNameIdx = idx.byName;
		var fgIdx = idx.facetGroups;

		var key;
		var fg = facetGroup;
		// 0. check if the object is a facetGroup or just an "empty node in the tree"
		if(fg.name){
			// 1. Make the "byName" index for the group.
			fgIdx.byName[fg.name] = byNameIdx[fg.name] = fg;
			(fgIdx.byDepth[depth] || (fgIdx.byDepth[depth] = [])).push(fg);
			fgIdx.byDepthName[fg.name] = depth;

			// 2. Iterate over the facetInGroupItems and make the byFacetName index for the groups.
			for(key in fg.facetInGroupItems){
				var fig = fg.facetInGroupItems[key];
				if(!(fig.facetName in fgIdx.byFacetName)){
					fgIdx.byFacetName[fig.facetName] = {};
				}
				fgIdx.byFacetName[fig.facetName][fg.name] = fg;
				byNameIdx[fig.name] = fig;
				
				for(var stateKey in fig.facetInGroupStateItems){
					var state = fig.facetInGroupStateItems[stateKey];
					byNameIdx[fig.name+".state."+state.name] = state;
				}
			}
			if(fg.widgetType) {
				if (!(fg.widgetType in fgIdx.byWidgetType)) {
					fgIdx.byWidgetType[fg.widgetType] = {};
				}
				fgIdx.byWidgetType[fg.widgetType][fg.name] = fg;
			}

			if(fg.type) {
				if (!(fg.type in fgIdx.byGroupType)) {
					fgIdx.byGroupType[fg.type] = {};
				}
				fgIdx.byGroupType[fg.type][fg.name] = fg;
			}

			// list of all sub (facet-)groups of the current facetGroup under the name idx
			if(!(fg.name in fgIdx.byNameRecursive)){
				fgIdx.byNameRecursive[fg.name] = {};
			}
			for (var gnRec in fgIdx.byNameRecursive){
				// if the fg.name begins with gnRec name, then this means that
				// the facetGroup with the gnRec name is a super group of the group with the fg.name.
				// Thus the facetsInGroup must be added to the index entry.
				// !!! Assumes that the unique name of a facet group contains the hierarchy of the facet groups.
				if (fg.name.indexOf(gnRec) === 0 && fg.name != gnRec) {
					fgIdx.byNameRecursive[gnRec][fg.name] = fg;
				}
			}
		} // end if fg.name
		// 3. Iterate over the facetGroupItems and recursively call the indexer
		if(fg.facetGroupItems){
			for(key in fg.facetGroupItems){
				this._indexFacetGroup(fg.facetGroupItems[key], idx, depth + 1);
			}
		}
	},

	_indexOrderedFacetGroupType: function(idx, group, appName){
		return;
		var children = shared.store.getChildren(group.name), stages = [];
		for(var i = 0, child, l = children.length; i < l; ++i){
			child = children[i];
			var isGroup = "facetGroupItems" in child;
			if(isGroup){
				child.type === "STAGE" && stages.push(child);
				Array.prototype.push.apply(stages, this._getStages(child));
			}
		}
		return stages;

	},

	_indexFacetInGroups: function(/*String*/ appName){
		//	summary:
		//		Recurses new facetGroups structure and creates an index byName and byFacetName.
		//this._idx.applicationItems[appName].facetInGroups = {};
		var idx = this._idx.applicationItems[appName].facetInGroups = {};
				
		// Overwrite existing indexes completely.
		idx.byName = {};
		idx.byFacetName = {};
		idx.byGroupName = {};
		idx.byGroupNameRecursive = {};
		
		this._indexFacetInGroup(this._data.applicationItems[appName].facetGroups.facetRootGroup, idx);
	},
	
	_indexFacetInGroup: function(/*Object*/ facetGroup, /*Object*/ idx){
		var fg = facetGroup, key;

		// 1. Add an index entry into the "byGroupNameRecursive" index for the given facetGroup.
		if(!(fg.name in idx.byGroupNameRecursive)){
			idx.byGroupNameRecursive[fg.name] = {};
		}

		// 2. Iterate over the facetInGroupItems and make the "byFacetName", "byName", "byGroupNameRecursive" and "byGroupName" index for the groups.
		for(key in facetGroup.facetInGroupItems){
			var fig = facetGroup.facetInGroupItems[key];
			
			if(!(fig.facetName in idx.byFacetName)) {
				idx.byFacetName[fig.facetName] = {};
			}
			if(!(fig.name in idx.byName)){				
				idx.byName[fig.name] = {};
			}			
			if(!(fg.name in idx.byGroupName)){
				idx.byGroupName[fg.name] = {};
			}
			
			idx.byFacetName[fig.facetName][fig.name] = fig;
			idx.byName[fig.name] = fig;
			idx.byGroupName[fg.name][fig.name] = fig;
			// Iterate over the facetGroup names which are added to "byGroupNameRecursive".
			// Add facetInGroups to the indices of super groups of the given group  
			for(var gnRec in idx.byGroupNameRecursive){
				// If the fg.name begins with gnRec name, then this means that
				// the facetGroup with the gnRec name is a super group of the group with the fg.name.
				// Thus the facetsInGroup must be added to the index entry.
				// !!! Assumes that the unique name of a facet group contains the hierarchy of the facet groups.
				if(fg.name.indexOf(gnRec) === 0){
					idx.byGroupNameRecursive[gnRec][fig.name] = fig;
				}
			}
		}

		// 3. Iterate over the facetGroupItems and recursively call the indexer.
		for(key in facetGroup.facetGroupItems){
			this._indexFacetInGroup(facetGroup.facetGroupItems[key], idx);
		} 
	},	

	_indexFacetInGroupVars: function(/*String*/ appName, /*Object*/ data){
		//	summary:
		//		creates an index for facetInGroupVarItems
		var idx = this._idx.applicationItems[appName].facetInGroupVars = {};

		idx.byFacetInGroupName = {};
		
		var facetGroupVarItems = data.facetGroupVarItems;
		for(var item in facetGroupVarItems){
			lang.mixin(this._idx.applicationItems[appName].facetInGroupVars.byFacetInGroupName, facetGroupVarItems[item].facetInGroupVarItems);		
		}
		
	},
	
	_indexComparisonTable: function(appName){
		var idx = this._idx.applicationItems[appName].comparisonTable = {};
		idx.groupItems = {};
		idx.attributes = {};
		
		this._indexComparisonGroup(this._data.applicationItems[appName].comparisonTable.rowGroupItems, idx);
	},
	_indexComparisonGroup: function(compGroup, idx){
		var groupItemName, groupItem, rowItemName, rowItem, productId;
		for(groupItemName in compGroup){
			groupItem = compGroup[groupItemName];
			
			//comparisonTable.groupItems.byGroupName.main = {}
			lang.setObject(["groupItems","byGroupName",groupItem.name].join("."),groupItem,idx);
						
			
			for(rowItemName in groupItem.comparisonRowItems){
				rowItem = groupItem.comparisonRowItems[rowItemName];
				//comparisonTable.groupItems.byAttributeName.reticle_type.main = {}
				lang.setObject(["groupItems","byAttributeName",rowItem.attributeName,groupItem.name].join("."),groupItem,idx);
				
				//comparisonTable.attributes.byGroupName.main.recticle_type = {}
				lang.setObject(["attributes","byGroupName",groupItem.name,rowItem.attributeName].join("."),rowItem,idx);
				//comparisonTable.attributes.byAttributeName.reticle_type = {}
				lang.setObject(["attributes","byAttributeName",rowItem.attributeName].join("."),rowItem,idx);
				
				for(productId in rowItem.cellItems){
					//comparisonTable.attributes.byProductId.521789.reticle_type = {}
					lang.setObject(["attributes","byProductId",productId,rowItem.attributeName].join("."),rowItem,idx);
					
					//comparisonTable.groupItems.byProductId.521789.main = {}
					lang.setObject(["groupItems","byProductId",productId,groupItem.name].join("."),groupItem,idx);
				}
			}
		}
	},
	_indexRecommendations: function(/*String*/ appName){
		//	summary:
		//		recurses new recommendations structure and creates indexes:
		//		byPosition, byPerfectMatch, byType, byProductId
		var idx = this._idx.applicationItems[appName].recommendations = {
			byPosition: {},
			byPositionOrdered: [],
			byPerfectMatch: {"true": [], "false": []},
			byType: {},
			byProductId: {},
			byGroup: {},
			groupsOrdered: []
		};

		// Kick off the iteration.
		this._indexRecommendationGroup(appName, this._data.applicationItems[appName].recommendations.recommendationRootGroup);
	},

	_indexRecommendationGroup: function(/*String*/ appName, /*Object*/ recGroup){
		// 	summary:
		//		Private function to recurse through the recommendation groups.
		var idx = this._idx.applicationItems[appName].recommendations,
			from = this._data.applicationItems[appName].recommendations.from || 0;

		if (!(recGroup.type in idx.byGroup)) {
			idx.byGroup[recGroup.type] = [];
		}

		idx.groupsOrdered[recGroup.sequenceNumber] = recGroup;

		for(var key in recGroup.recommendationItems){
			var rec = recGroup.recommendationItems[key];
			// position and productId must currently be unique:
			idx.byPosition[rec.position] = rec;
			idx.byPositionOrdered[rec.position - from] = rec;
			idx.byProductId[rec.productId] = rec;
			//the others are arrays:
			if(rec.perfectMatch){
				idx.byPerfectMatch["true"].push(rec);
			}else{
				idx.byPerfectMatch["false"].push(rec);
			}
			if(!(rec.type in idx.byType)) {
				idx.byType[rec.type] = [];
			}
			idx.byType[rec.type].push(rec);
			idx.byGroup[recGroup.type].push(rec);

			this._indexReasonGroups(appName, rec);
		}

		idx.byPerfectMatch["false"] = this._sortArray(idx.byPerfectMatch["false"]);
		idx.byPerfectMatch["true"] = this._sortArray(idx.byPerfectMatch["true"]);
		idx.byGroup[recGroup.type] = this._sortArray(idx.byGroup[recGroup.type]);

		// iterate over the subgroups and recurse
		for(key in recGroup.recommendationGroupItems){
			this._indexRecommendationGroup(appName, recGroup.recommendationGroupItems[key]);
		}
	},

	_indexCrossSellingRecommendations: function(/*String*/ appName, /*Product*/ product , /*Map*/ crossSellingRecommendationItems ){
		//	summary:
		//		recurses new cross selling recommendations structure and creates indexes:
		//		byProductId
		var refCustomerProductId = product.customerProductId;
		var idx = this._idx.applicationItems[appName].crossSellingRecommendationItems = {
			byCustomerProductId: {}
		};

		idx.byCustomerProductId[refCustomerProductId] = crossSellingRecommendationItems[refCustomerProductId];

		//crossSellingRecommendationItems[refCustomerProductId].productGroupItems[0].productItems[customerProductId]
		var groupItems = idx.byCustomerProductId[refCustomerProductId].productGroupItems;
		var productItems, productItem;
		for(var i in groupItems){
			productItems = groupItems[i].productItems;
			for(var customerProductId in productItems){
				productItem = productItems[customerProductId];
				productItem.id = productItem.id || "xcstore_generated_"+customerProductId;

				this._indexProducts(appName, productItem);
				this._indexProductImages(appName,  productItem);
			}
		}
	},

	_indexReasons: function(/*String*/ appName){
		this._idx.applicationItems[appName].reasons = {
			byPosition: {},
			byPositionOrdered: [],
			byProductId: {}
		};
	},
	
	_indexReasonGroups: function(/*String*/ appName, rec){
		var idx = this._idx.applicationItems[appName].reasons,
			groupItems = rec.reasonRootGroup.reasonGroupItems,
			productId = rec.productId,
			position = rec.position,
			byPosition = idx.byPosition[position] 	 || (byPosition=idx.byPosition[position]=[]),
			from = this._data.applicationItems[appName].recommendations.from || 0;
		
		var orderedReasonGroupItems = this._sortObject(groupItems);
		for(var i=0, l=orderedReasonGroupItems.length; i<l; ++i){
			var subReasonGroup = orderedReasonGroupItems[i];
			byPosition[i] = this._indexReasonSubGroup(subReasonGroup);

		}

		idx.byProductId[productId] = byPosition;
		idx.byPositionOrdered[position-from] = byPosition;
	},
	
	_indexReasonSubGroup: function(subGroup){
		var obj = {
			label: subGroup.label,
			name: subGroup.name,
			reasonItems: [],
			reasonGroupItems: null,
			sequenceNumber: subGroup.sequenceNumber,
			type: subGroup.type
		};
		
		var orderedReasonItems = this._sortObject(subGroup.reasonItems), i, l;
		for(i=0, l=orderedReasonItems.length; i<l; ++i){
			var reason = orderedReasonItems[i];
			obj.reasonItems.push(reason);
		}

		var orderedReasonGroupItems = this._sortObject(subGroup.reasonGroupItems);
		for(i=0, l=orderedReasonGroupItems.length; i<l; ++i){
			var reasonGroup = orderedReasonGroupItems[i];
			if(!obj.reasonGroupItems)obj.reasonGroupItems = [];
			obj.reasonGroupItems[i] = this._indexReasonSubGroup(reasonGroup);
		}
		
		return obj;
	},

	_indexProducts: function(/*String*/ appName, /*Product API Object*/ product){
		var idx = this._idx.applicationItems[appName];
			idx = idx.products || (idx.products = {
				byId: {},
				byCustomerProductId: {},
				byCustomerVariantsGroupId: {},
				byVariantsGroupId: {},
				byManufacturer: {},
				byManufacturerLazy: {}
			});
		if(!idx.byId[product.id]){

			idx.byId[product.id] = product;

			idx.byCustomerProductId[product.customerProductId] = product;

			(idx.byCustomerVariantsGroupId[product.customerVariantsGroupId]
			|| (idx.byCustomerVariantsGroupId[product.customerVariantsGroupId] = [])).push(product);

			(idx.byVariantsGroupId[product.variantsGroupId]
			|| (idx.byVariantsGroupId[product.variantsGroupId] = [])).push(product);

			(idx.byManufacturer[product.manufacturer]
			|| (idx.byManufacturer[product.manufacturer] = [])).push(product);

			var lazyManufacturerName = product.manufacturer.toLowerCase().replace(/\W/g, "_");
			(idx.byManufacturerLazy[lazyManufacturerName]
			|| (idx.byManufacturerLazy[lazyManufacturerName] = [])).push(product);
		}


	},

	_indexProductImages: function(/*String*/ appName, /*Product API Object*/ product){
		var idx = this._idx.applicationItems[appName];
			idx = idx.productImages || (idx.productImages = {
				byProductIdOrdered: {/* 2356 ["http://large1", "http://large2", "http://medium1", "http://small"], 8956: [...]*/},
				bySize: {/* large: { 2356:["http://",...], 2356:["http://"] }, medium: { 2356:["http://", ...], .. } */},
				byProductIdAndSize: {/* 2356: {large:["http://",...], medium:["http://",...]} */}
			});

		var id = product.id;

		//product items are static - we dont need to check again on already indexed product images
		if(idx.byProductIdOrdered[id])return;

		var UNKNOWN_SIZENAME_IMAGES = [];
		var PREDEFINED_IMAGE_SIZENAMES = {large:[],regular:[],thumb:[]};
		var PREDEFINED_IMAGE_SIZE_ORDER = [PREDEFINED_IMAGE_SIZENAMES.large, PREDEFINED_IMAGE_SIZENAMES.regular, PREDEFINED_IMAGE_SIZENAMES.thumb, UNKNOWN_SIZENAME_IMAGES];
		var sortedImageItems = this._sortObject(product.imageItems);


		var sizeName,imgObj,imgLocation;
		for(var i=0, l=sortedImageItems.length;i<l;++i){
			var imgItem = sortedImageItems[i];

			for(sizeName in imgItem){
				imgObj = imgItem[sizeName];
				var isValidImgObject = typeof imgObj === "object" && imgObj !== null && "location" in imgObj;
				if(!isValidImgObject)continue;

				imgLocation = imgObj.location;
				
				var byProductIdAndSize = idx.byProductIdAndSize[id] || (idx.byProductIdAndSize[id] = {});
					byProductIdAndSize = byProductIdAndSize[sizeName] || (byProductIdAndSize[sizeName] = []);
				var bySize = idx.bySize[sizeName] || (idx.bySize[sizeName] = {});
					bySize = bySize[id] || (bySize[id] = []);

				byProductIdAndSize.push(imgLocation);
				bySize.push(imgLocation);

				if(sizeName in PREDEFINED_IMAGE_SIZENAMES){
					PREDEFINED_IMAGE_SIZENAMES[sizeName].push(imgLocation);
				}else{
					UNKNOWN_SIZENAME_IMAGES.push(imgLocation);
				}
			}
		}

		idx.byProductIdOrdered[id] = Array.prototype.concat.apply([], PREDEFINED_IMAGE_SIZE_ORDER);
	},

	getMetaData: function(/*String?*/ appName){
		//	summary:
		//		returns app-specific meta data
		appName = appName || this.xcInitial.masterApplicationName;

		return this._data.applicationItems[appName].metaData;
	},

	getClientI18n: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific clientI18n
		appName = appName || this.xcInitial.masterApplicationName;
			
		return this._data.applicationItems[appName].clientI18n || null;
	},
	
	getClientI18nItems: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific clientI18n items
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].clientI18n.clientI18nItems || null;
	},
	
	getClientI18nByKey: function(/*String*/ key, /*String?*/ appName){
		//	summary: 
		//		returns app-specific clientI18n.value for given key.
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].clientI18n.clientI18nItems[key] || null;
	},
	
	getConfig: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific config
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].config || null;
	},
	
	getConfigItems: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific config items
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].config.configItems || null;
	},
	
	getConfigByKey: function(/*String*/ key, /*String?*/ appName){
		//	summary: 
		//		returns app-specific clientI18n.value for given key
		appName = appName || this.xcInitial.masterApplicationName;
		var config	= this._data.applicationItems[appName].config.configItems;
			
		if(config){
			return config[key] || null;
		}else{
			return null;
		}
	},
	
	getTheme: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var config	= this._data.applicationItems[appName].config.configItems;
		
		return this.xcInitial.theme || config.theme || "";
	},
	
	getType: function(/*String|ApiObject*/ apiName, /*String?*/ appName){
		//	summary: 
		//		returns the type of the widget ["group", "facet", "state"]
		appName = appName || this.xcInitial.masterApplicationName;
			
		var apiObject = typeof apiName === "string" ? this.find(apiName, appName) : apiName;
		if(!apiObject || !("widgetType" in apiObject)){
			throw new Error("excentos.Store::"+arguments.callee.nom+" '"+apiName+"' could not be found");
		}
		
		return "facetGroupItems" in apiObject && "group" ||
			   "facetInGroupStateItems" in apiObject && "facet" ||
			   "state";
	},
	
	find: function(/*String*/ apiName, /*String?*/ appName){
		//	summary: 
		//		returns all facetgroups, facetsingroup and states recursively
		appName = appName || this.xcInitial.masterApplicationName;
		var idx = this._idx.applicationItems[appName].byName;
		
		return apiName ? idx[apiName] : idx;
	},

	findParentGroupByType: function(/*String*/ startSearchGroupName, /*String*/ groupType, /*String?*/ appName){
		//	summary:
		//		tries to find a given FacetGroup.groupType like "STAGE", "NESTEDSTAGE", ...
		appName = appName || this.xcInitial.masterApplicationName;
		var apiData = this.find(startSearchGroupName, appName);
		var apiType = this.getType(startSearchGroupName, appName);

		if(apiType==="state")throw new Error("excentos.Store::"+arguments.callee.nom+" requires a group context; can only traverse from facetGroups or facetInGroups");

		var p = apiData;
		while(p && p.type!==groupType && (p=this.getParent(p.name,appName))){}

		return p;
	},

	findGroupsByType: function(/*String*/ groupType, /*String|ApiObject?*/ startSearchGroupName, /*String?*/ appName){

		appName = appName || this.xcInitial.masterApplicationName;
		startSearchGroupName = startSearchGroupName && startSearchGroupName.name ||
							   startSearchGroupName ||
							   this.getFacetRootGroup().name;

		var children = this.getChildren(startSearchGroupName), groups = [];

		for(var i= 0, childApiObject, l=children.length; i<l; ++i){
			childApiObject = children[i];
			var isGroup = this.getType(childApiObject) === "group";
			if(isGroup){
				childApiObject.type === groupType && groups.push(childApiObject);
				Array.prototype.push.apply(groups, arguments.callee.call(this, groupType, childApiObject, appName));
			}
		}
		return groups;
	},
	
	getChildren: function(/*String*/ apiName, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		
		var children = [];
		var add = function(arr){
			children.push.apply(children, arr);
			return children;
		};
		
		switch(this.getType(apiName)){
			case "group":
				add(this.getOrderedFacetsInGroupByGroupName(apiName, appName));
				add(this.getOrderedFacetGroupsByName(apiName, appName));
				break;
			case "facet":
				add(this.getOrderedFacetInGroupStateItemsByFacetInGroupName(apiName, appName));
				break;
		}
		
		return children;
	},
	
	getParent: function(/*String*/ apiName, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		
		var rootName = this.getFacetRootGroup(appName).name;
		var parentName = "";
		var parent = null;
		
		if(apiName != rootName){
			if(this.getType(apiName) == "state"){
				parentName = apiName.substring(0,apiName.indexOf(".state"));
			}else {
				parentName = apiName.substring(0,apiName.lastIndexOf("."));
			}
			
			parent = this.find(parentName, appName);
		}
		
		return parent;
	},

	findPropertyInPath: function(/*String*/ apiName, /*String?*/ confType, /*String?*/ confProperty, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var apiData = this.find(apiName, appName);

		var p = apiData, propertyValue, conf, hasConf;
		do {
			conf = p[confType];
			hasConf = conf && (confProperty in conf);
			propertyValue = hasConf ? conf[confProperty] : undefined;
		}
		while(p && !hasConf && (p=this.getParent(p.name,appName)))

		return propertyValue;
	},
	findConfigItemsInPath: function(/*String*/ apiName, /*String?*/ confProperty, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this.findPropertyInPath(apiName, "configItems", confProperty, appName);
	},
	findContentItemsInPath: function(/*String*/ apiName, /*String?*/ confProperty, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this.findPropertyInPath(apiName, "contentItems", confProperty, appName);
	},
	
	getSiblings: function(/*String*/ apiName, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var rootName = this.getFacetRootGroup(appName).name;
		var parentName = "";
		var siblings = [];
		var obj = this.find(apiName, appName);
		
		if(apiName != rootName){
			var parent = this.getParent(apiName, appName);
			parentName = parent && parent.name;
		}
		
		siblings = this.getChildren(parentName);
		
		//remove the given "brother" from the list of siblings;
		var position  = array.indexOf(siblings, obj);
		position != -1 && siblings.splice(position,1);
		
		return siblings;
	},
	
	getFacetRootGroup: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroupVars
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroups.facetRootGroup;
	},

	getStages: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this.findGroupsByType("STAGE", null, appName);
	},

	getPhases: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this.findGroupsByType("NESTEDSTAGE", null, appName);
	},
	
	getFacetGroupVars: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroupVars
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroupVars || null;
	},
	
	getFacetGroupVarItems: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroupVars.facetGroupVarItems
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems || null;
	},
	
	getFacets: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facets
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facets || null;
	},
	
	getFacetItems: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facets.facetItems
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facets.facetItems || null;
	},
	
	// facet vars
	getFacetVarsByFacetName: function(/*String*/ facetName, /*String?*/ appName){
		//	summary:
		//		returns the facet vars for the given facet and app
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetVars.facetVarItems[facetName] || null;
	},
	
	// facet group getters
	getFacetGroups: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroups
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroups || null;
	},
	
	getFacetGroupByName: function(/*String*/ facetGroupName, /*String?*/ appName){
		//	summary:
		//		returns the facet for the given name and app
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetGroups.byName[facetGroupName] || null;
	},
	
	getFacetGroupsByName: function(/*String*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by groupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetGroups.byName[groupName] || null;
	},

	getFacetGroupsByGroupType: function(/*String*/ groupType, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by groupName
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].facetGroups.byGroupType[groupType] || null;
	},


	// TODO: implementme - create an overall index for sorting ??
	getOrderedFacetGroupsByGroupType: function(/*String*/ groupType, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by groupName
		throw new Error("implement me");
		appName = appName || this.xcInitial.masterApplicationName;
		var fgVars = this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems,
			fgList = this._sortObject(fg.facetGroupItems, fgVars);

		return this._idx.applicationItems[appName].facetGroups.byGroupType[groupType] || null;
	},
	
	getOrderedFacetGroupsByName: function(/*String*/ facetGroupName, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName
		var fg = this.getFacetGroupByName(facetGroupName, appName),
			fgVars = this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems,
			fgList = this._sortObject(fg.facetGroupItems, fgVars);
		
		return fgList;
	},
	
	getFacetGroupsByNameRecursive: function(/*String*/ facetGroupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetGroups by GroupNameRecursive
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetGroups.byNameRecursive[facetGroupName] || null;
	},
	
	getOrderedFacetGroupsByNameRecursive: function(/*String*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific ordered list of all facetGroups by given groupName
		appName = appName || this.xcInitial.masterApplicationName;
		var groups = this.getOrderedFacetGroupsByName(groupName, appName),
			facetGroups = [];
			
		for(var i=0, l=groups.length; i < l; ++i){
			var group = groups[i];
			facetGroups.push(group);
			Array.prototype.push.apply(facetGroups, this.getOrderedFacetGroupsByNameRecursive(group.name, appName));
		}
		
		return facetGroups;
	},
	
	// facet group vars
	getFacetGroupVarsByFacetGroupName: function(/*String*/ facetGroupName, /*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroups
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems[facetGroupName] || null;
	},
	
	getFacetGroupVarByKey: function(/*String*/ key, /*String?*/ appName){
		//	summary:
		//		returns the facet group var for given key
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facetGroupVars[key] || null;
	},
	
	// facets in group
	getFacetsInGroup: function(/*String?*/ appName){
		//	summary: 
		//		returns app-specific facetGroups
		//	notice:
		//		this method is spelled correctly but the property is not!
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byName || null;
	},
	
	getFacetInGroupByName: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by facetInGroupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byName[facetInGroupName] || null;
	},
	
	getFacetsInGroupByGroupName: function(/*String*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by groupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byGroupName[groupName] || null;
	},
	
	getFacetsInGroupByFacetName: function(/*String*/ facetName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetInGroup by facetName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byFacetName[facetName];
	},
	
	getOrderedFacetsInGroupByGroupName: function(/*String*/ facetGroupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific ordered list of facets in group of given group.
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._sortObject(
			this.getFacetsInGroupByGroupName(facetGroupName, appName),
			this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems[facetGroupName].facetInGroupVarItems
		);
	},
	
	getFacetsInGroupByGroupNameRecursive: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetsInGroup by GroupNameRecursive
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byGroupNameRecursive[facetInGroupName] || null;
	},
	
	getOrderedFacetsInGroupByGroupNameRecursive: function(/*String*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific ordered list of all facetsInGroup by given groupName.
		appName = appName || this.xcInitial.masterApplicationName;
		var group = this.getFacetGroupByName(groupName);
		
		return this._getOrderedFacetsInGroupByGroupRecursive(group, appName);
	},
	
	_getOrderedFacetsInGroupByGroupRecursive: function(/*Object*/ group, /*String*/ appName){
		var facetsInGroup = [], 
			subGroups = [],
			figVars = this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems[group.name].facetInGroupVarItems,
			fgVars = this._data.applicationItems[appName].facetGroupVars.facetGroupVarItems;
		
		if(group.facetInGroupItems){
			facetsInGroup = this._sortObject(group.facetInGroupItems, figVars);
		}
		
		if(group.facetGroupItems !== null){			
			subGroups = this._sortObject(group.facetGroupItems, fgVars);
			
			for(var i = 0, l = subGroups.length; i < l; ++i){
				// check for 'valid' subgroup since sequenceNr may have gaps
				if(subGroups[i]){
					Array.prototype.push.apply(facetsInGroup, this._getOrderedFacetsInGroupByGroupRecursive(subGroups[i], appName));
				}
			}
		}
		
		return facetsInGroup;
	},
	
	// facet in group vars
	getFacetInGroupVarsByFacetInGroupName: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns app-specific facetsInGroupVars by facetInGroupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroupVars.byFacetInGroupName[facetInGroupName] || null;
	},	
	
	getFacetByName: function(/*String*/ facetName, /*String?*/ appName){
		//	summary:
		//		returns the facet for the given name and app
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].facets.facetItems[facetName] || null;
	},
	
	getMetaDataByKey: function(/*String*/ key, /*String?*/ appName){
		//	summary:
		//		returns the app-specific metaData for given key
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].metaData[key] || null;
	},
	
	getFacetInGroupStateItemsByFacetInGroupName: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific facetInGroupStateItems by facetInGroupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroups.byName[facetInGroupName].facetInGroupStateItems || null;
	},
	
	getOrderedFacetInGroupStateItemsByFacetInGroupName: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific ordered list of facetInGroupStateItems by facetInGroupName
		var states 	  = this.getFacetInGroupStateItemsByFacetInGroupName(facetInGroupName, appName),
			stateVars = this.getFacetInGroupStateVarItemsByFacetInGroupName(facetInGroupName, appName),
			stateList = this._sortObject(states,stateVars);
		
		return stateList;
	},
	
	getFacetInGroupStateVarItemsByFacetInGroupName: function(/*String*/ facetInGroupName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific facetInGroupStateVarItems by facetInGroupName
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroupVars.byFacetInGroupName[facetInGroupName].facetInGroupStateVarItems || null;
	},
	
	getFacetInGroupStateVars: function(/*String*/ facetInGroupName, /*String*/ stateName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific facetInGroupStateVars by facetInGroupName and stateName
		//	facetInGroupName: String
		//	stateName: String
		//	appName: String
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].facetInGroupVars.byFacetInGroupName[facetInGroupName].facetInGroupStateVarItems[stateName] || null;
	},
	
	getOrderedReasonsByPosition: function(/*Number?*/position, appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var result = this._idx.applicationItems[appName].reasons.byPositionOrdered;
		
		return isNaN(position) ? result : result[position];
	},
	
	getOrderedReasonsByProductId: function(productId, appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var result = this._idx.applicationItems[appName].reasons.byProductId;
		
		return productId==undefined ? result : result[productId];
	},
	
	// recommendations
	getRecommendations: function(/*String?*/ appName){
		//	summary:
		//		returns the app's recommendations
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].recommendations || null;
	},
	
	getOrderedRecommendations: function(/*String?*/ appName){
		//	summary:
		//		returns the app recommendations ordered by position
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].recommendations && this._idx.applicationItems[appName].recommendations.byPositionOrdered || null;
	},

	getRecommendationsByGroup: function(/*String?*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns the app recommendations of the given group or hash of
		//		recommendations by group
		appName = appName || this.xcInitial.masterApplicationName;

		var recommendationIndex = this._idx.applicationItems[appName].recommendations.byGroup || null;

		if (groupName === undefined) {
			return recommendationIndex;
		} else {
			return recommendationIndex && (recommendationIndex[groupName] || null);
		}
	},

	getOrderedRecommendationsByGroup: function(/*String?*/ groupName, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;

		var recommendatinIndex = this._idx.applicationItems[appName].recommendations.byGroup;
		return groupName === undefined ? recommendatinIndex : recommendatinIndex[groupName];
	},

	getOrderedRecommendationGroups: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this._idx.applicationItems[appName].recommendations.groupsOrdered || null;
	},

	getRecommendationByProductId: function(/*String*/ productId, /*String?*/ appName){
		//	summary:
		//		returns the recommendation of the given product referenced by id
		//		if there is none, return null
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._idx.applicationItems[appName].recommendations.byProductId[productId] || null;
	},

	getCrossSellingRecommendations: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;

		return this._data.applicationItems[appName].crossSellingRecommendations.crossSellingRecommendationItems;
	},

	getCrossSellingRecommendationsByCustomProductId: function(/*String*/ productId, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;

		var idx = this._idx.applicationItems[appName].crossSellingRecommendationItems;
		return idx && idx.byCustomerProductId[productId] || null;
	},

	getOrderedCrossSellingRecommendationsByCustomProductId: function(/*String*/ productId, /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;

		var recItems = this.getCrossSellingRecommendationsByCustomProductId(productId, appName);
		var prodItems = recItems && recItems.productGroupItems
		return prodItems && this._sortObject(prodItems);
	},

	getProducts: function(/*String?*/ appName){
		//	summary:
		//		returns the app-specific products
		appName = appName || this.xcInitial.masterApplicationName;
		return this._idx.applicationItems[appName].products.byId;
	},
	
	getOrderedProducts: function(/*String?*/ appName){
		//	summary:
		//		returns the app-specific products in the order of recommendation
		appName = appName || this.xcInitial.masterApplicationName;

		var recs =this.getOrderedRecommendations(appName);
		return array.map(this.getOrderedRecommendations(appName), function(recommendation){
			return this.getProductById(recommendation.productId);
		}, this);
	},
	
	getProductById: function(/*String|Object*/ id, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id.
		//		In case id is already an apiproduct it will be just passedd through (similiar to dijit.byId)
		appName = appName || this.xcInitial.masterApplicationName;

		var product = typeof id === "object" ?  id : this._idx.applicationItems[appName].products.byId[id];
		return "customerProductId" in product ? product : null;
	},

	getProductByCustomerProductId: function(/*String*/ id, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].products.byCustomerProductId[id] || null;
	},

	getProductsByCustomerVariantsGroupId: function(/*String*/ id, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].products.byCustomerVariantsGroupId[id] || null;
	},

	getProductsByVariantsGroupId: function(/*String*/ id, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].products.byVariantsGroupId[id] || null;
	},

	getProductsByManufacturer: function(/*String*/ manufacturer, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].products.byManufacturer[manufacturer] || null;
	},

	getProductsByManufacturerLazy: function(/*String*/ manufacturer, /*String?*/ appName){
		//	summary:
		//		returns the app-specific product for given id
		appName = appName || this.xcInitial.masterApplicationName;

		return this._idx.applicationItems[appName].products.byManufacturerLazy[manufacturer] || null;
	},

	getOrderedProductImageItems: function(/*String*/ productId,  /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this._sortObject(this.getProductById(productId).imageItems);
	},

	getOrderedProductImages: function(/*String*/ productId,  /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this._idx.applicationItems[appName].productImages.byProductIdOrdered[productId];
	},

	getOrderedProductImagesBySize: function(/*String*/ productId, /*String*/ sizeName,  /*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var images = this._idx.applicationItems[appName].productImages.byProductIdAndSize[productId];
		return sizeName === undefined ? images : images[sizeName];
	},
	
	getProductAttributeGroupItems: function(/*String*/ id, /*String?*/ appName){
		//	summary:
		//		returns the app-specific attribute groups for a specific productId
		appName = appName || this.xcInitial.masterApplicationName;
		
		return this._data.applicationItems[appName].products.productItems[id].attributeRootGroup.productAttributeGroupItems;
	},
	
	getProductAttributeItems: function(/*String*/ id, /*String*/ groupName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific attributeItems for a specific attribute group of a productId
		appName = appName || this.xcInitial.masterApplicationName;
		
		var groups = this.getProductAttributeGroupItems(id, appName);
			
		return groups && groups[groupName].attributeItems;
	},
	
	getOrderedProductAttributeItems: function(/*String*/ id, /*String*/ groupName, /*String?*/ appName){
		return this._sortObject(this.getProductAttributeItems(id, groupName, appName));
	},
	
	getProductAttributeItem: function(/*String*/ id, /*String*/ groupName, /*String*/ attributeName, /*String?*/ appName){
		//	summary:
		//		returns the app-specific attributeItem of a productId
		appName = appName || this.xcInitial.masterApplicationName;
		
		var attributes = this.getProductAttributeItems(id, groupName, appName);
		return attributes && attributes[attributeName] || null;
	},
	
	getProductsInComparison: function(/*String?*/ appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var comparisonList = this._data.applicationItems[appName].comparisonList;
		return comparisonList && comparisonList.productItems;
	},
	
	getOrderedProductsInComparison: function(appName){
		return this._sortObject(this.getProductsInComparison(appName));
	},
	
	//comparison
	getComparisonTable: function(callback, appName){
		appName = appName || this.xcInitial.masterApplicationName;
		return this._data.applicationItems[appName].comparisonTable;
	},
	getOrderedComparisonGroupItems: function(){
		return this._sortObject(this.getComparisonGroupItemsByGroupName());
	},
	getOrderedComparisonAttributesByGroupName: function(groupName, appName){
		return this._sortObject(this.getComparisonAttributesByGroupName(groupName, appName));
	},
	getOrderedComparisonCellItemsInGroupByAttributeName: function(groupName, attrName, appName){
		return this._sortObject(this.getComparisonCellItemsInGroupByAttributeName(groupName, attrName, appName));
	},
	getComparisonCellItemsInGroupByAttributeName: function(groupName, attrName, appName){
		var attributes = this.getComparisonAttributesByGroupName(groupName, appName);
		return attributes[attrName].cellItems;
	},
	getComparisonGroupItemsByGroupName: function(groupName, appName){
		return this._getComparisonObjectBy("groupItems","byGroupName",groupName, appName);
	},
	getComparisonGroupItemsByAttributeName: function(attrName, appName){
		return this._getComparisonObjectBy("groupItems","byAttributeName",attrName, appName);
	},
	getComparisonGroupItemsByProductId: function(prodId, appName){
		return this._getComparisonObjectBy("groupItems","byProductId",prodId, appName);
	},
	getComparisonAttributesByGroupName: function(groupName, appName){
		return this._getComparisonObjectBy("attributes","byGroupName",groupName, appName);
	},
	getComparisonAttributesByAttributeName: function(attrName, appName){
		return this._getComparisonObjectBy("attributes","byAttributeName",attrName, appName);
	},
	getComparisonAttributesByProductId: function(prodId, appName){
		return this._getComparisonObjectBy("attributes","byProductId",prodId, appName);
	},
	_getComparisonObjectBy: function(objectName, prop, value, appName){
		appName = appName || this.xcInitial.masterApplicationName;
		var obj = this._idx.applicationItems[appName].comparisonTable[objectName][prop];
		var ret = value!==undefined ? obj[value] : obj;
		
		return ret || null;
	},
	
	getGlobalMetaData: function(){
		//	summary:
		//		returns global meta data
		
		return this._data.metaData; 
	},
	
	getGlobalMetaDataByKey: function(/*String*/key){
		//	summary:
		//		returns the global meta data value for the given key or null if the key does not exist
		
		return this._data.metaData[key] || null;
	},	
	
	getLanguage: function(){
		var m = this.getGlobalMetaDataByKey("locale").match(/[a-z]+/);
		return m && m[0];
	},

	_sortObject: function(/*Object*/ obj, /*Object?*/ vars){
		// summary:
		//		Returns an array ordered by the sequence number that's part of each sub-object.
		// obj: Object
		//		Typical payload object like `facetGroupItems` that contains sub-objects with a sequnce number.
		// vars: Object
		//		Optional object containing the sequence numbers that are being used to sort ´obj´ if itself has no such information.
		
		var arr = [];
		// Sort by `sequenceNumber`.
		// 1. Fill with sequence number as index.
		var varsObject;
		for(var subObjName in obj){
			varsObject =  obj[subObjName].sequenceNumber !== undefined && obj[subObjName] || 
						 vars && vars[subObjName];
			if(!varsObject){
				console.error("Store: No sequence number for ordering available" + (obj[subObjName].name && " in " + obj[subObjName].name) + ".");
			}
			arr[varsObject.sequenceNumber] = obj[subObjName];
		}
		// 2. Remove empty elements.
		for(var i = 0; i < arr.length; ++i){
			!arr[i] && arr.splice(i--, 1);
		}
		return arr;
	},

	_sortArray: function(/*Array*/ arr){
		// sorts an arry of {sequenceNumber} items
		return arr.sort(this._arraySortBySequenceNumber);
	},
	_arraySortBySequenceNumber: function(a,b){
		return a.sequenceNumber - b.sequenceNumber;
	}
}));

});
