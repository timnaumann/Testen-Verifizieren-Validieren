define([
	"./facetgroup/wizard/Phase",
	"./facetgroup/wizard/Topic",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"../util",
	"../shared",
	"./registry",
	"./facet/input/state/State",
	"./facetgroup/FacetGroup"
], function(Phase, Topic, lang, array, domClass, util, shared, xcWidgetRegistry, State, FacetGroup){

var globalDotRegExp = /\./g;
var WIDGET_PREFIX = "widget.";

var DEFAULT_GROUPTYPE_MAPPING = {
	"DEFAULT": FacetGroup,
	"STAGE": Topic,
	"NESTEDSTAGE": Phase
};

var exports = {
		//	summary:
		//		Factory for any kind of widget.
		//
		//	description:
		//		Finds the most specific (core / project / theme / app-theme) widget class and returns an instance.
		//		Has specific methods for input facet widgets and facet groups.

	/**
	 * HIDDEN_ARG_IS_EXPLICIT_TYPE={};
	 * makeExplicit = function(context, factoryFunc){
	 * 	var expectedArgsLength = factoryFunc.length;
	 *	 factoryFunc.explicit = function(){
	 *	 	//append `IS_EXPLICIT_TYPE` to the list of arguments (make it the unexpected extra argument)
	 *	 	var args = arguments;
	 *	    var newArgs = [].concat(Array.prototype.slice.call(args), Array(args.callee.length - args.length), HIDDEN_ARG_IS_EXPLICIT_TYPE);
	 *	 	factoryFunc.apply(context, newArgs);}
	 * }
	 */
	makeWidget: function(/*String|Class*/ widgetType, /*Object?*/ widgetParams, /*DOMNode?*/ domNode){
		//	summary:
		//		Create a new widget and return it.
		//
		//	widgetType: String
		//		Full class name of the desired widget starting after "...widget.".
		//	widgetParams: Object?
		//		The params that are passed to the widget's constructor.
		//	domNode: DOMNode?
		//		The dom node the widget will be rendered in
		//		This will become the dom node of the widget as well
		//
		//	example:
		//	|	var widget = shared.widgetFactory.makeWidget(
		//	|		"facetgroup.wizard.PhaseButton",
		//	|		{
		//	|			rootFacetGroupName: phase.name,
		//	|			id: "xc_wizard_phase" + (idx + 1) + "_button"
		//	|		}
		//	|	);

		if(!widgetParams) widgetParams = {};

		domNode = domNode || null;

		//normalize passed widgetType (usually relative class types would be written as $("widget.subpackage.ClassName"); for historical/convenience reasons the config omits the "widget." part in widgetType property)
		//TODO: define how to handle cases where `declaredClass` is not explicitly set but inherited through prototype chain

		var normalizedWidgetType = normalizeWidgetType(widgetType, WIDGET_PREFIX);
		var ctor = ExplicitFactoryMethod.isCalledExplicit(arguments) ?
					widgetType :
					util.$(normalizedWidgetType) || widgetType.prototype && widgetType;

		if(!ctor){
			var bases = array.map(util.getClassBases(util.getCurrentTheme()), function(base){return base.prototype.name;}); bases.pop();
			throw new Error("constructor `widget." + widgetType+"` not registered within theme inheritance chain ["+bases.join(", ")+"]");
		}
		var widget = new ctor(widgetParams, domNode);
		
		// Add declared class as CSS class.
		var cssClass = ["xc_" + normalizedWidgetType.replace(globalDotRegExp, "_")];
		if(widget.isApiWidget){
			cssClass.push(("xc_" + widget.getApiType() + "_" + widget.getApiElementName()).toLowerCase());
		}
		domClass.add(widget.domNode, cssClass);
		
		_indexWidget(widget, normalizedWidgetType, widgetParams);

		return widget;
	},
	
	makeFacetInputWidget: function(/*Object*/ facetInGroup, /*String|Class*/ widgetType, /*Object?*/_widgetParams){
		//	summary:
		//		Returns a facet input widget for a given facet-in-group name.
		//
		//	description:
		//		The main task is to take facet in group data from the store,
		//		decide which widget to use, initialize that and return it.

		var _widgetType = widgetType || this._getFacetInputWidgetType(facetInGroup);
			_widgetType = normalizeWidgetType(_widgetType, "facet.", arguments);

		var widgetParams = lang.mixin({
			id: util.generateCssIdFromName(facetInGroup.name, "facet"),
			facetInGroup: facetInGroup
		}, _widgetParams);

		var args = [_widgetType, widgetParams, undefined];
		return ExplicitFactoryMethod.delegateExplicitCall(this, this.makeWidget, args, arguments);
	},
	
	_getFacetInputWidgetType: function(/*Object*/ facetInGroup){
		// summary: Returns the widget type for a facet in group if not configured explicitly.
		var store = shared.store;
		var facet = store.getFacetByName(facetInGroup.facetName);
		
		var widgetType = "input.SingleSelect";
		switch(facet.type){
			case "DiscreteFacet":
				if(facet.multipleSelectable){
					widgetType = "input.MultiSelect";
				}
				break;
			case "NumberFacet":
				if (facet.rangeSelection === true) {
					widgetType = "input.RangeSlider";
				} else {
					widgetType = "input.Slider";
				}
				break;
			case "OrdinalFacet":
				if(facetInGroup.stepping !== 0){
					if (facet.rangeSelection === true) {
						widgetType = "input.RangeSlider";
					} else {
						widgetType = "input.Slider";
					}
				}
				break;
			case "BoolFacet":
				var states = store.getOrderedFacetInGroupStateItemsByFacetInGroupName(facetInGroup.name);
				if(states.length == 1){
					widgetType = "input.MultiSelect";
				}
				break;
		}
		return widgetType;
	},
	
	makeFacetGroupWidget: function(/*Object*/ facetGroup, /*String|Class?*/ widgetType, /*Object?*/ _widgetParams){
		//	summary:
		//		Call `makeWidget` with params prepared for facet groups.
		//
		//	facetGroup: Object
		//		The facet group statics data object.
		//	widgetType: String?
		//		Full class name of the desired facet group widget starting after "...widget.facetgroup.".



		var _widgetType = widgetType || this._getFacetGroupWidgetType(facetGroup);
			_widgetType = normalizeWidgetType(_widgetType, "facetgroup.", arguments);

		var widgetParams = lang.mixin({
			id: util.generateCssIdFromName(facetGroup.name, "facetgroup"),
			facetGroup: facetGroup
		}, _widgetParams);

		var args = [_widgetType, widgetParams, undefined];
		return ExplicitFactoryMethod.delegateExplicitCall(this, this.makeWidget, args, arguments);
	},

	_getFacetGroupWidgetType: function(/*Object*/ facetGroup){
		return DEFAULT_GROUPTYPE_MAPPING[facetGroup.type] || FacetGroup;
	},
	
	makeFacetInputStateWidget: function(/*Object*/ state, /*Object*/ facetWidget, /*String|Class?*/ widgetType, /*Object?*/_widgetParams){
		//	summary:
		//		Call `makeWidget` with params prepared for states.
		//
		//	state: Object
		//		The state statics data object.
		//	facetWidget: Object
		//		Reference to the enclosing facet widget.
		
		var _widgetType = widgetType || State;
			_widgetType = normalizeWidgetType(_widgetType, "facet.input.state.", arguments);

		var widgetParams = lang.mixin({
			id: util.generateCssIdFromName(facetWidget.facetInGroup.name, [state.name], "state"),
			state: state,
			facetWidget: facetWidget
		}, _widgetParams);

		var args = [_widgetType, widgetParams, undefined];
		return ExplicitFactoryMethod.delegateExplicitCall(this, this.makeWidget, args, arguments);
	}

};

	//TODO move indexing to excentos._Widget
	function _indexWidget(widget, widgetType, widgetParams){
		//	summary:
		//		writes the widget to the registry index if its profiler API related

		var type = "other";
		var name = widget.id;

		if(widget.isApiWidget) {
			type = widget.getApiType();
			name = widget.getApiName();
		}

		var declaredClass = widget.declaredClass;
		var cls = declaredClass.substring(declaredClass.indexOf(".widget.")+8);
		widgetType = widget.widgetType || cls;

		xcWidgetRegistry.toIndex(["byId",widget.id], widget, {});
		xcWidgetRegistry.toIndex(["byName",name], widget);
		xcWidgetRegistry.toIndex(["byType",type,name], widget);
		xcWidgetRegistry.toIndex(["byClass",cls,name], widget);
		xcWidgetRegistry.toIndex(["byDeclaredClass",widget.declaredClass,name], widget);
		xcWidgetRegistry.toIndex(["byWidgetType",widgetType,name], widget);
	}

	var ExplicitFactoryMethod = {
		//non-primitive value, for strict by-reference checks like arguments[0] === ExplicitFactoryMethod.HIDDEN_ARG_IS_EXPLICIT_TYPE
		HIDDEN_ARG_IS_EXPLICIT_TYPE: {},
		create: function(/*Object*/ thisObject, /*Function*/ factoryFunc){
			var self = this,
				expectedArgsLength = factoryFunc.length;
			factoryFunc.explicit = function(/*...*/){
				//append `IS_EXPLICIT_TYPE` to the list of arguments (make it the unexpected extra argument)
				var args = arguments;
				var newArgs = [].concat(
						Array.prototype.slice.call(args),
						new Array(expectedArgsLength - args.length),
						self.HIDDEN_ARG_IS_EXPLICIT_TYPE
				);
				return factoryFunc.apply(thisObject, newArgs);
			}
		},
		isCalledExplicit: function(/*Arguments*/ argObject){
			return argObject[argObject.callee.length] === this.HIDDEN_ARG_IS_EXPLICIT_TYPE;
		},
		delegateExplicitCall: function(/*Object*/ thisObject, /*Function*/ func, /*Array*/ args, /*Arguments*/ checkArgsForExplicit){
			ExplicitFactoryMethod.isCalledExplicit(checkArgsForExplicit) && args.push(ExplicitFactoryMethod.HIDDEN_ARG_IS_EXPLICIT_TYPE);
			return func.apply(thisObject, args);
		}
	};
	ExplicitFactoryMethod.create(exports, exports.makeWidget);
	ExplicitFactoryMethod.create(exports, exports.makeFacetGroupWidget);
	ExplicitFactoryMethod.create(exports, exports.makeFacetInputWidget);
	ExplicitFactoryMethod.create(exports, exports.makeFacetInputStateWidget);

	function normalizeWidgetType(/*String|Class*/ widgetType, /*String?*/ prefix, /*Arguments?*/ args){
		if(args && ExplicitFactoryMethod.isCalledExplicit(args))return widgetType;

		var _widgetType = util.getClassType(widgetType);
		_widgetType = prefix + _widgetType.replace(WIDGET_PREFIX, "").replace(prefix, "");

		return _widgetType;
	}



return exports;

});
