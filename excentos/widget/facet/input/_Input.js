define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/query",
	"excentos/shared",
	"excentos/widget/registry",
	"excentos/util",
	"excentos/widget/_ApiWidgetMixin",
	"./state/State",
	"./state/Unset"  /*NMD:Ignore*/, /*implicit module declaration*/
	"excentos/tracking/Tracker"
], function(declare, array, domClass, domAttr, query, shared, xcRegistry, util, _ApiWidgetMixin, State, Unset, tracker){

return declare(
	"excentos.widget.facet.input._Input",
	_ApiWidgetMixin,
{	
	relativeTemplatePath: "facet/input/_Input.html",

	widgetsInTemplate: true,
	
	//	facet: Object
	//		the statics of the facet
	//	tags:
	//		readonly
	facet: null,
	
	//	facetInGroup: Object
	//		the statics of the facetInGroup
	//	tags:
	//		readonly
	facetInGroup: null,
	
	//	facetInGroupName: String
	//		may be passed on initialization instead of `facetInGroup`
	facetInGroupName: "",
	
	//	answered: Boolean
	//	tags:
	//		Class 2
	answered: false,
	
	//	touched: Boolean
	//	tags:
	//		Class 2
	touched: false,
	
	//	enabled: Boolean
	//	tags:
	//		Class 2
	enabled: false,
	
	//	expanded: Boolean
	//	tags:
	//		Class 2
	expanded: false,
	
	//	currentValue: Array
	//		Class 2 property
	currentValue: null,
	
	//	_stateWidgets: excentos.widget.facet.input.State[]
	_stateWidgets: null,

	// _visibleStateWidgets: excentos.widget.facet.input.State[]
	//		reference to all visible statewidgets since last refresh
	_visibleStateWidgets: null,
	
	//	stateWidgetType: String
	//		The name of the Dojo class the state widgets will be constructed of.
	//		`.widget.facet.input.state.` will be prefixed.
	stateWidgetType: "State",
	
	constructor: function(){
		this.baseClass += " xc_facet";
		this._stateWidgets = [];
		this.currentValue = [];
		this._visibleStateWidgets = [];
	},
	
	postMixInProperties: function(){
		//	summary:
		//		called after properties have been mixed in
		//		fetching facet and facetInGroup statics
		
		this.inherited(arguments);
		
		var store = shared.store;
		
		if(!this.facetInGroup){
			this.facetInGroup = store.getFacetInGroupByName(this.facetInGroupName);
		}else if(!this.facetInGroupName){
			this.facetInGroupName = this.facetInGroup.name;
		}
		
		if(!this.facet){
			this.facet = store.getFacetByName(this.facetInGroup.facetName);
		}
	},
	
	postCreate: function(){
		//	summary:
		//		create the state/option widgets
		//		if the facet widget has been created

		this.updatePropertyFromConfig("stateWidgetType");
		this.inherited(arguments);
		
		domClass.add(this.domNode, "xc_facet_type_"+this.facet.type);
		
		if(this.resetWidget){
			var noUnset = this.getConfigItems("noUnset", "boolean");
			if(noUnset){
				this.resetWidget.destroy();
			}else{
				this.resetWidget.set("facetWidget", this);
			}
		}
		
		if(this.resetNode){
			this.resetNode.innerHTML = this.facetInGroup.labelUnset || this.i18n.input_unset;
		}
		
		this._createSubWidgets();
	},
	
	refresh: function(){
		//	summary:
		//		refreshes the ui
		var store = shared.store,
			inGroupVars = store.getFacetInGroupVarsByFacetInGroupName(this.facetInGroupName),
			vars 		= store.getFacetVarsByFacetName(this.facetInGroup.facetName);
		
		this._sync();
		
		util.toggleClasses(this.domNode, {
			disabled: !inGroupVars.enabled,
			collapsed: !inGroupVars.expanded,
			invisible: !inGroupVars.visible,
			touched: vars.touched,
			answered: vars.answered,
			first: this.get("first"),
			last: this.get("last")
		});
		
		this.refreshStateWidgets();
	},
	
	_setAnsweredAttr: function(/*Boolean*/ answered){
		//	summary:
		//		Updates the answered state and css class 
		//		if it's changed.
		if(answered !== this.answered){
			this.answered = answered;
			
			domClass.toggle(this.domNode, "xc_answered", answered);
		}
	},
	
	_sync: function(){
		//	summary:
		//		sync all class 2 properties with
		//		current store values
		var store = shared.store,
			inGroupVars = store.getFacetInGroupVarsByFacetInGroupName(this.facetInGroupName),
			vars 		= store.getFacetVarsByFacetName(this.facetInGroup.facetName);
		
		this.set({
			touched: vars.touched,
			answered: vars.answered,
			enabled: inGroupVars.enabled,
			expanded: inGroupVars.expanded,
			currentValue: vars.currentValueItems || []
		});
		
		this._syncStateWidgets();
	},
	
	_syncStateWidgets: function(){
		//	summary:
		//		synchronize the checked flag of all states widgets
		//		since this is a class 2 property and may
		//		differ from the current client value
		for(var i = 0, l = this._stateWidgets.length; i < l; ++i){
			var stateWidget = this._stateWidgets[i],
				checked;
			
			if(this.currentValue === null){
				checked = false;
			}else{
				checked = array.indexOf(this.currentValue, stateWidget.state.name) !== -1;
			}
			
			stateWidget.set("checked", checked);
		}
	},
	
	refreshStateWidgets: function(){
		//	summary: 
		//		refresh the facet's state widgets

		//reset previous css state
		this._setFirstAndLastStateWidgets(false);

		// Refresh all state widgets and store only the visible ones
		this._refreshVisibleStateWidgets();

		//set the new ones
		this._setFirstAndLastStateWidgets(true);
	},

	_setFirstAndLastStateWidgets: function(/*Boolean*/ setTo){
		var visibleStateWidgets = this._visibleStateWidgets,
			count = visibleStateWidgets.length;
		if(count){
			visibleStateWidgets[0].set("first", !!setTo);
			visibleStateWidgets[count - 1].set("last", !!setTo);
		}
	},

	_refreshVisibleStateWidgets: function(){
		return this._visibleStateWidgets = array.filter(this._stateWidgets, function(stateWidget){
			stateWidget.refresh();
			return stateWidget.isVisible(false);
		});
	},
	
	resetStateWidgets: function(){
		//	summary:
		//		reset all the facet's state widgets
		
		for(var i = 0, l = this._stateWidgets.length; i < l; ++i){
			this._stateWidgets[i].set("checked", false);
		}
	},
	
	onStateClick: function(/*excentos.widget.facet.input.State*/ stateWidget){
		//	summary:
		//		Called by state widgets.
	},
	
	_onResetClick: function(){
		//	summary:
		//		callback from within the template to notify an _Input widget
		//		that the reset action was triggered
		if(this.answered){
			this.reset();
			tracker.track("answer.unset", this.facet.name);
		}
	},
	
	reset: function(){
		//	summary:
		//		resets the facet
		//		all states/options will be set to no value
		//		Tells the service that the facet has been reset (setFacetUnanswered)
		this.resetStateWidgets();
		shared.behavior.setFacetUnanswered(this);
		this.set("answered", false);
	},

	_createSubWidgets: function(){
		this._createStateWidgets();
	},

	_createStateWidgets: function(){
		//	summary:
		//		create the state/option widgets
		var states 	= shared.store.getOrderedFacetInGroupStateItemsByFacetInGroupName(this.facetInGroupName),
			factory = shared.widgetFactory;

		array.forEach(states, this._createStateWidget, this);
				
		this._reposition();
	},

	_createStateWidget: function(state){
		var factory = shared.widgetFactory;
		var widget = factory.makeFacetInputStateWidget.apply(factory,
			this.getWidgetFactoryParameters(state, this.getStateWidgetType(state), {templatePackage:this.templatePackage})
		);
		widget.placeAt(this.statesNode);
		this._stateWidgets.push(widget);
		return widget;
	},

	getWidgetFactoryParameters: function(apiObject, widgetType, params){
		return [apiObject, this, widgetType, params];
	},

	getStateWidgetType: function(state){
		return this.data.stateWidgetType || this.stateWidgetType;
	},

	getCurrentState: function(){
		//determine the currentState, returns the last one from list
		var values = this.currentValue, length=values.length;
		if(length){
			return this.facetInGroup.facetInGroupStateItems[values[length-1]];
		}
	},
	
	getCurrentStateWidget: function(){
		var currentState = this.getCurrentState();
		return currentState && this.getStateWidgetByStateName(currentState.name);
	},

	getStateWidgetByStateName: function(stateName){
		return stateName && xcRegistry.byName(this.apiName+".state."+stateName);
	},

	getVisibleStateWidgets: function(){
		return array.filter(this._stateWidgets, function(widget){
			return widget.isVisible();
		})
	},

	getVisibleStateWidgetByIndex: function(/*Number*/ index){
		return isFinite(index) ? this.getVisibleStateWidgets()[index] : null;
	},

	getIndexOfVisibleStateWidget: function(/*Widget*/ stateWidget){
		return array.indexOf(this.getVisibleStateWidgets(),stateWidget);
	},
	
	_reposition: function(){
		// summary: 
		//	repositions any node within ´stateNodes´ container 
		if(!this.statesNode || this.statesNode.innerHTML.indexOf("data-xc-position=")==-1)return;
		var nl = query("> [data-xc-position]",this.statesNode),i=nl.length, el=null, attr, pos, map, isStateWidget;
				
		map = {first:0, last:Math.max(this.statesNode.children.length,0)};
		if(nl.length){
			while(i-->0){
				el = nl[i];
				attr = domAttr.get(el, "data-xc-position");
				pos = isNaN(attr) ? map[attr] || map.first : map.first;
				isStateWidget = el.isInstanceOf && el.isInstanceOf(State);

				if(isStateWidget){
					this._stateWidgets.splice(pos,0,el);
					el.placeAt(this.statesNode, pos);
				}else {
					util.place(el, this.statesNode, pos);
				}
			}
		}
	},
	
	_publishValue: function(){
		//	summary:
		//		publish the facet's current value to the service
		
		// Resetting widget simulates `setfacetUnanswered` behavior of old widgets (#1312).
		// CheckBoxComaptNew breaks with an empty array (#1311).
		if(this.currentValue.length == 0){
			this.reset();
		}else{
			shared.behavior.setFacetValues(this);
			
			this.set("answered", true);
		}
	}
});

});
