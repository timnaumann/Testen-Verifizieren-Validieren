define([
	"./registry",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"excentos/Store",
	"excentos/util",
	"./_ApiWidgetThemeDataMixin"
], function(xcWidgetRegistry, declare, lang, Store, util, _ApiWidgetThemeDataMixin){
//TODO: Maybe we need some more Abstraction (_ApiDataProvider) for Widgets like NavigationButton which incorporates an API-data object but does not offer any out-of-the-box functionality / is iteslf no _ApiWidget
//NOTE: this is an interim solution - the widget's interface in terms of api-properties should be fixed instead
//Mixin Class for all API Widgets like FacetGroups, Facets and States

var STATIC_NAME_STATE = "state",
	STATIC_NAME_FACET = "facet",
	STATIC_NAME_GROUP = "group";


var _ApiWidget = declare(
		"excentos.widget._ApiWidget",
		_ApiWidgetThemeDataMixin,
{

	isApiWidget: true,
	apiType: "",
	apiName: "",
	apiElementName: "",
	data: null,

	postMixInProperties: function(){
		this.getApiObject();
		this.getApiName();
		this.getApiElementName();
		this.getApiType();
		this.inherited(arguments);
	},

	getApiObject: function(){
		// summary:
		//	helper function that returns the corresponding api data of ´this´ widget
		var data = this.data;
		if(!data){
			var type = this.getApiType();
			data = type==STATIC_NAME_STATE && this.state ||
				   type==STATIC_NAME_FACET && lang.mixin({}, Store.getInstance().getFacetByName(this.facetInGroup.facetName), this.facetInGroup) ||
				   type==STATIC_NAME_GROUP && this.facetGroup ||
				   null;

			this.data = data;
		}

		return this.data;
	},

	getApiParent: function(){
		// summary:
		//	returns ordered direct apiObject parent

		return Store.getInstance().getParent(this.apiName);
	},

	getApiParentAsWidget: function(){
		var apiParent = this.getApiParent();
		return xcWidgetRegistry.byName(apiParent.name);
	},

	getApiChildren: function(){
		// summary:
		//	returns ordered raw apiObject children

		return Store.getInstance().getChildren(this.apiName);
	},

	getApiChildrenAsWidgets: function(){
		return this._getApiObjectsAsWidgets("getApiChildren");
	},

	getApiSiblings: function(){
		// summary:
		//	returns ordered direct apiObject siblings

		return Store.getInstance().getSiblings(this.apiName);
	},

	getApiSiblingsAsWidgets: function(){
		return this._getApiObjectsAsWidgets("getApiSiblings");
	},

	getChildren: function(){
		// summary: returns children from containerNode and those from the api
		// tags: override dijit._Widget::getChildren

		var childWidgets = this.inherited(arguments);
		var childApiWidgets = this.getApiChildrenAsWidgets();

		Array.prototype.push.apply(childWidgets, childApiWidgets);
		childWidgets = util.uniqueArray(childWidgets);

		return childWidgets;
	},

	_getApiObjectsAsWidgets: function(/*String*/ collectionGetter){
		var collection = this[collectionGetter]();
		!(collection instanceof Array) && (collection=[collection]);

		var cache = this.__apiWidgetsCache || (this.__apiWidgetsCache={});
			cache = cache[collectionGetter] || (cache[collectionGetter]=[]);

		if(cache.length === 0){
			for(var i=0, l=collection.length, widget; i<l; ++i){
				var prefix = this.apiType === STATIC_NAME_FACET ? this.apiName+".state." : "";
				widget = xcWidgetRegistry.byName(prefix+collection[i].name);
				widget && cache.push(widget);
			}
		}
		return cache;
	},

	getApiType: function(){
		// summary:
		//	helper function that returns the descriptive type of the corresponding api data object

		var type = this.apiType;
		if(!type) {
			type =	this.state && STATIC_NAME_STATE ||
					this.facetInGroup && STATIC_NAME_FACET ||
					this.facetGroup && STATIC_NAME_GROUP ||
					this.data && Store.getInstance().getType(this.data.name) ||
					"";
		}

		return this.apiType = type;
	},

	//TODO: ´name´ is not the best attribute name to describe its value -
	//		 should be something like ´identifier´ or ´treeKey´.
	//		 That change would involve API changes on server side
	getApiName: function(){
		// summary:
		//	helper function that returns the full name (api-wise)

		var name = this.apiName;
		if(!name){
			var type = this.getApiType(), obj=this.getApiObject();
			name = type==STATIC_NAME_STATE && this.facetWidget && this.facetWidget.apiName+".state."+obj.name ||
				   obj && obj.name ||
				   "";
		}

		return this.apiName = name;
	},

	getApiElementName: function(){
		// summary:
		//	helper function that returns the name/leaf (api-wise)

		var name = this.apiElementName;
		if(!name){
			var type = this.getApiType(), obj=this.getApiObject();
			name = 	type==STATIC_NAME_STATE && obj.name ||
					type==STATIC_NAME_FACET && obj.facetName ||
					type==STATIC_NAME_GROUP && obj.name.substring(obj.name.lastIndexOf(".")+1) ||
					"";
		}
		return this.apiElementName = name;
	},

	getApiVars: function(){
		// summary:
		// returns the individual api vars of facetGroup, FacetInGroup or FacetInGroupState

		var store = Store.getInstance();
		var type = this.getApiType(), obj=this.getApiObject();
		return	type==STATIC_NAME_STATE && store.getFacetInGroupStateVarItemsByFacetInGroupName(this.facetWidget.facetInGroup.name)[obj.name] ||
				type==STATIC_NAME_FACET && lang.mixin({}, store.getFacetVarsByFacetName(obj.facetName), store.getFacetInGroupVarsByFacetInGroupName(obj.name)) ||
				type==STATIC_NAME_GROUP && store.getFacetGroupVarsByFacetGroupName(obj.name) ||
				null;
	},

	getConfigItems: function(/*String?*/ key, /*String?*/ asType){
		return _getValueFromRegistry.call(this, "configItems", key, asType);
	},

	getContentItems: function(/*String?*/ key, /*String?*/ asType){
		return _getValueFromRegistry.call(this, "contentItems", key, asType);
	},

	updatePropertyFromConfig: function(/*String*/ property, /*String="string"*/ type){
		// summary:
		//  checks whether there is a configItem available matching the given ´property´
		//	and assigns the config value to the equally named class member
		var confVar = this.getConfigItems(property,type);
		confVar != null && this.set(property, confVar);
		return property;
	},

	isAccessible: function(/*Boolean=true*/ checkPath){
		var vars = this.getApiVars();
		return this.isVisible(checkPath) && vars.enabled;
	},

	isVisible: function(/*Boolean=true*/ checkPath){
		// summary:
		//	returns true if this widget is logically visible

		//set default value if none given
		checkPath === undefined && (checkPath = true);

		var vars = this.getApiVars();
		var inPath = checkPath ? this.isVisiblePath() : true;

		return vars ? vars.visible && inPath : inPath;
	},

	isVisiblePath: function(){
		// summary:
		//	returns if this widget is logically visible by matching its apiName against the visible stage's apiName
		var store = Store.getInstance();
		var currentStageInViewName = store.getFacetGroupVars().currentStageInView;
		var name = this.getApiName();

		// is "xcAjaxClient.wizard.phase1.topic1.facet1" in path of "xcAjaxClient.wizard.phase1.topic1"
		var withinCurrentStage = name.indexOf(currentStageInViewName) === 0;
		// is "xcAjaxClient.wizard.phase1" in path of "xcAjaxClient.wizard.phase1.topic1"
		var withinPath = currentStageInViewName.indexOf(name) === 0;

		return withinCurrentStage || withinPath;
	},

	refresh: function(){
		throw new Error(this.declaredClass+"::"+arguments.callee.nom+"() has no implementation");
	},
	_sync: function(){
		throw new Error(this.declaredClass+"::"+arguments.callee.nom+"() has no implementation");
	},
	_createSubWidgets: function(){
		throw new Error(this.declaredClass+"::"+arguments.callee.nom+"() has no implementation");
	}
});

function _getValueFromRegistry(/*String*/ configType, /*String*/ key, /*String*/asType){
	var cfg = this.getApiObject()[configType];
	var value = key && cfg && cfg[key];

	//undefined implies that the key has not been set - so dont convert it
	if(asType && value!=undefined){
		return util.castValueToType(value, asType);
	}

	return key ? value : cfg;
};


return _ApiWidget;

});