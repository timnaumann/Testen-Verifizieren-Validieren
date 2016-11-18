define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-class",
	"excentos/shared",
	"excentos/util",
	"../_ApiWidgetMixin"
], function(declare, array, domClass, shared, util, _ApiWidgetMixin){

var EMPTY = {};
return declare(
	"excentos.widget.facetgroup.FacetGroup",
	_ApiWidgetMixin,
{
	relativeTemplatePath: "facetgroup/FacetGroup.html",
	widgetsInTemplate: true,
	
	//	facetGroup: Object
	//		The static facet group data object.
	facetGroup: null,
	
	//	subFacetGroupWidgetType: String
	//		The name of the Dojo class the sub facet group widgets will be contructed of.
	//		`.widget.facetgroup.` will be prefixed.
	subFacetGroupWidgetType: "",
	
	//	facetInGroupWidgetType: String
	//		The name of the Dojo class the facetInGroup widgets will be contructed of.
	//		`.widget.facet.` will be prefixed.
	facetInGroupWidgetType: "",

	subFacetGroupsNode:null,
	facetInGroupNode:null,

	ROOTGROUP: EMPTY,
		
	constructor: function(){
		this.baseClass += " xc_facetgroup";
		//store static rootgroup reference
		this.ROOTGROUP === EMPTY && (this.ROOTGROUP = shared.store.getFacetRootGroup());

		this._facetInGroupWidgets = [];
		this._subFacetGroupWidgets = [];
		this._facetInGroupWidgetsCreated = false;
		this._subFacetGroupWidgetsCreated = false;	
	},
	
	postCreate: function(){
		this.ROOTGROUP === this.data && domClass.add(this.domNode, "xc_facetrootgroup");
		this.updatePropertyFromConfig("subFacetGroupWidgetType");
		this.updatePropertyFromConfig("facetInGroupWidgetType");
		this.inherited(arguments);
		this._createSubWidgets();
	},
	
	_isReadyForSubwidgets: function(){
		// default is not lazy, always create the subwidgets immediately
		return true;
	},

	_createSubWidgets: function(){
		this._createFacetInGroupWidgets();
		this._createSubFacetGroupWidgets();
	},
	
	_createFacetInGroupWidgets: function(){
		if(!this._facetInGroupWidgetsCreated && this._isReadyForSubwidgets()){
			var facetsInGroup = shared.store.getOrderedFacetsInGroupByGroupName(this.facetGroup.name);
			if(this.facetsInGroupNode){
				array.forEach(facetsInGroup, this._createFacetInGroupWidget , this);
			}else if(facetsInGroup.length){
				console.warn("FacetGroup: facets in group present but no node to place widgets at for `" + this.facetGroup.name + "`");
			}			
			this._facetInGroupWidgetsCreated = true;
		}
	},
	
	_createFacetInGroupWidget: function(facetInGroup){
		var factory = shared.widgetFactory;
		var widget = factory.makeFacetInputWidget.apply(factory,
			this.getWidgetFactoryParameters(facetInGroup, this.getFacetInGroupWidgetType(facetInGroup), {templatePackage:this.templatePackage})
		);
		widget.placeAt(this.facetsInGroupNode);
		this._facetInGroupWidgets.push(widget);
		return widget;
	},
	
	_createSubFacetGroupWidgets: function(){
		if(!this._subFacetGroupWidgetsCreated && this._isReadyForSubwidgets()){
			var subFacetGroups = shared.store.getOrderedFacetGroupsByName(this.facetGroup.name);
			if(this.subFacetGroupsNode){
				array.forEach(subFacetGroups, this._createSubFacetGroupWidget, this);
			}else if(subFacetGroups.length){
				console.warn("FacetGroup: sub facet groups present but no node to place widgets at for `" + this.facetGroup.name + "`");
			}
			this._subFacetGroupWidgetsCreated = true;
		}
	},
	
	_createSubFacetGroupWidget: function(subFacetGroup){
		var factory = shared.widgetFactory;
		var widget = factory.makeFacetGroupWidget.apply(factory,
			this.getWidgetFactoryParameters(subFacetGroup, this.getSubFacetGroupWidgetType(subFacetGroup), {templatePackage:this.templatePackage})
		);
		widget.placeAt(this.subFacetGroupsNode);
		this._subFacetGroupWidgets.push(widget);
		return widget;
	},

	getWidgetFactoryParameters: function(apiObject, widgetType, params){
		return [apiObject, widgetType, params];
	},

	getFacetInGroupWidgetType: function(facetInGroup){
		return facetInGroup.widgetType || this.facetInGroupWidgetType;
	},

	getSubFacetGroupWidgetType: function(facetGroup){
		return facetGroup.widgetType || this.subFacetGroupWidgetType;
	},
	
	refresh: function(){
		var vars = this.getApiVars();
		
		this._sync();
		
		util.toggleClasses(this.domNode, {
			completed: vars.completed,
			disabled: !vars.enabled,
			collapsed: !vars.expanded,
			notinview: !vars.inView,
			invisible: !vars.visible,
			first: this.get("first"),
			last: this.get("last")
		});
		
		// assert creation of subwidgets in case they're not there yet ("lazy" facetgroup type)
		this._createFacetInGroupWidgets();
		this._createSubFacetGroupWidgets();
		
		// Find first and last visible sub facet group widget.
		var firstSubFacetGroupWidget	= null,
			lastSubFacetGroupWidget 	= null;
		
		array.forEach(this._subFacetGroupWidgets, function(subFacetGroupWidget){
			var subVars = subFacetGroupWidget.getApiVars();
			if(subVars.visible){
				if(firstSubFacetGroupWidget === null){
					firstSubFacetGroupWidget = subFacetGroupWidget;
				}
				lastSubFacetGroupWidget = subFacetGroupWidget;
			}
		});
		
		// Refresh all sub facet group widgets.
		array.forEach(this._subFacetGroupWidgets, function(subFacetGroupWidget){
			subFacetGroupWidget.set("first", subFacetGroupWidget == firstSubFacetGroupWidget);
			subFacetGroupWidget.set("last", subFacetGroupWidget == lastSubFacetGroupWidget);
			subFacetGroupWidget.refresh();
			subFacetGroupWidget.refreshFacetWidgets && subFacetGroupWidget.refreshFacetWidgets();
		});
	},
	
	_sync: function(){
		//	summary:
		//		sync all class 2 properties with
		//		current store values
		
		//NOTE: we would potentially have more vars to be synced here!
		//		thats why the code remains in the FacetGroup instead of _Collapsibles
		var vars = this.getApiVars();
		this.set("expanded", vars.expanded);
	},
	
	refreshFacetWidgets: function(){
		// Find first and last visible facet.
		var firstFacetWidget = null,
			lastFacetWidget  = null;
		
		array.forEach(this._facetInGroupWidgets, function(facetInGroupWidget){
			var vars = facetInGroupWidget.getApiVars();
			if(vars.visible){
				if(firstFacetWidget === null){
					firstFacetWidget = facetInGroupWidget;
				}
				lastFacetWidget = facetInGroupWidget;
			}
		});
		
		// Refresh all facet widgets.
		array.forEach(this._facetInGroupWidgets, function(facetInGroupWidget){
			facetInGroupWidget.set("first", facetInGroupWidget == firstFacetWidget);
			facetInGroupWidget.set("last", facetInGroupWidget == lastFacetWidget);
			facetInGroupWidget.refresh();
		});
	}
});

});
