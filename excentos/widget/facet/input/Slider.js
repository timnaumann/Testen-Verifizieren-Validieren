define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/string",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/dom-style",
	"excentos/shared",
	"excentos/util",
	"./_Input",
	"../../form/HorizontalSlider",
	"../../form/HorizontalRuleLabels",
	"excentos/tracking/Tracker"
], function(declare, lang, array, string, domConstruct, domClass, domStyle, shared, util, _Input, Slider, RuleLabels, tracker){	
	
var Slider = declare(
	"excentos.widget.facet.input.Slider",
	_Input,
{
	relativeTemplatePath: "facet/input/Slider.html",
		
	//	slider: Object
	//		The slider form widget
	slider: null,

	//sliderOptions: Object
	//		constructor options for the dijit slider widget
	sliderOptions: null,
	
	//  state: Object
	//		The current state (API Object) that represents the value
	_currentState: null,
	
	// _lastSubmittedState: Object
	//		The ´_currentState´ before sending the value
	_lastSubmittedState: null,
	
	// states: Array
	//		holds all associated states (API Objects)
	states: null,
	
	// states: Array
	//		holds all associated states (API Object) which are actually accessible
	accessibleStates: null,
	
	// usedStates: Array
	//		references either `states` or `accessibleStates`
	usedStates: null,
	
	// sliderNode: HTMLDOMElement
	//		the node the HorizontalSlider is created at
	sliderNode: null,
	
	// valueNode: HTMLDOMElement
	//		the value will displayed here
	valueNode: null,
	
	// valueTemplateString: HTMLString
	//		generated markup that is placed in `valueNode`
	valueTemplateString: "<span class='xc_value'>${label}</span><span class='xc_unit'>${unit}</span>",
	
	// renderEmptyLabels: Boolean
	//		only generates labels where content is available
	renderEmptyLabels: false,
	
	// renderInvisibleLabels: Boolean
	//		only generates labels of 'accessibleStates'
	renderInvisibleLabels: false,
	
	// minimizeLabels: Boolean
	//		only generates the first, middle and last label
	minimizeLabels: false,

	// decorationNode: String
	//		where labels and rules be rendered by default
	decorationNode: "bottomDecoration",

    constructor: function(){
        this.baseClass += " xc_slider";
    },
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		this.updatePropertyFromConfig("minimizeLabels", "boolean");
		this.updatePropertyFromConfig("renderEmptyLabels", "boolean");
		this.updatePropertyFromConfig("renderInvisibleLabels", "boolean");
		this.updatePropertyFromConfig("decorationNode", "string");

		this.states = shared.store.getOrderedFacetInGroupStateItemsByFacetInGroupName(this.facetInGroupName);
		var stateVars = shared.store.getFacetInGroupStateVarItemsByFacetInGroupName(this.facetInGroupName);
		
		this.accessibleStates = [];
		for(var i=0,l=this.states.length,v,s; i<l; ++i){
			s = this.states[i]; v = stateVars[s.name];
			v.visible && this.accessibleStates.push(s);
		}
		
		//choose from which list ticks and labels should be taken
		this.usedStates = this.renderInvisibleLabels ? this.states : this.accessibleStates;
		
		this._currentState = this.usedStates[0];
	},
	
	postCreate: function(){
		this.inherited(arguments);
		this.slider.watch("value", lang.hitch(this, "_refreshHandleOrientation"));
		this._refreshHandleOrientation();
		this.hasLayout("displayMovingValue") && domConstruct.place(this.valueNode, this.slider.sliderHandle, "before");
	},
	
	_refreshHandleOrientation: function(){
		var percent = this.getPercent();
		util.toggleClasses(this.domNode, {
			"orientation_left": percent<50,
			"orientation_center": percent==50,
			"orientation_right": percent>50
		});
	},
	getPercent : function(){
		return Math.round((this.slider.value / (this.slider.discreteValues-1)) * 100);
	},
	
	reset: function(){
		this.inherited(arguments);
		this._resetWidget();
	},
	
	refreshStateWidgets: function(){
		// 	summary:
		//		This will refresh the slider widget. It should be called if there are changes on the facet vars
		//		or if the slider type has changed.
	},
	
	_createStateWidgets: function(){
		//	summary:
		//		Initially create the form/input slider, apply all the configuration
		//		we have and render it to the sliderNode.
		//		The slider has as many steps as we have states.
		//		There is a little abuse of the dijit.form.slider since it displays
		//		the indexes of our states but this gives us a notable performance boost.
		
		if(!this.slider){
						
			// Create the labels.
			var labels = this._createLabels();
			
			var labelsNode = domConstruct.create("div", {}, this.sliderNode);
			var sliderLabels = new RuleLabels({
				container: this.decorationNode,
				labels: labels
			}, labelsNode);

			// Create the slider.
			var sliderOptions = lang.mixin({
				name: this.facetInGroupName,
				maximum: this.usedStates.length - 1,
				discreteValues: this.usedStates.length,
				onChange: lang.hitch(this, this._onSliderValueChange),
				onBeforeCurrentValueChange: lang.hitch(this, this._onBeforeCurrentSliderValueChange)
			}, this.sliderOptions);

			this.slider = shared.widgetFactory.makeWidget("form.HorizontalSlider", sliderOptions, this.sliderNode);
			
			// Start up the widgets
			this.slider.startup();
			sliderLabels.startup();
		}
	},
	
	_createLabels: function(){
		//iterates over states and calls the iterator function ´_createLabelsIterator´
		
		var states = this.usedStates,
			i = 0, l = states.length,
			labels = [],
			label = "",
			hasMiddle = l%2==1,
			middle = Math.floor(l/2)-!hasMiddle, //in case there is no middle we want the left side of the center zero-based index
			isFirst, isMiddle, isLast, combineWithNext;
		
		for(i=0; i<l; ++i){
			//check if this label should be combined with the next one; contains the index to combine with
			isFirst = i === 0;
			isMiddle = i === middle;
			isLast = i === l-1;
			
			//skip all irrelevant states in minimize mode
			if(this.minimizeLabels && !(isFirst || isMiddle || isLast))continue;
			
			combineWithNext = this.minimizeLabels && !hasMiddle && isMiddle && i+1;
			label = this._createLabelsIterator(states[i], i, states, combineWithNext);
			
			if(this.renderEmptyLabels || label){
				labels.push(label);
				combineWithNext && ++i;
			}
		}

		
		return labels;
	},
	
	_createLabelsIterator: function(state, index, array, combineWith){
		var label,stateLabel;
		label = stateLabel = this._getStateLabel(state);
		
		if(label && combineWith){
			var nextLabel = this._getStateLabel(array[combineWith]);
			label = nextLabel ? stateLabel + " - " + this._getStateLabel(array[combineWith]) : stateLabel;
		}
		
		return label ? this.getValueHtml(label) : "";
	},
	
	_getStateLabel: function(state){
		return state.longLabel;
	},
	
	_getStateUnit: function(state){
		return this.facetInGroup.unit;
	},
	
	_syncStateWidgets: function(){
	
		if(this.slider.get("discreteValues") !== this.usedStates.length){
			this.slider.set({
				discreteValues: this.usedStates.length,
				maximum: this.usedStates.length-1
			});	
		}
		
		var currentValue = this.currentValue[0];
		
		if(currentValue){
			// HACK http://trac.excentos.lan/trac/xcProjects/ticket/1873#comment:2
			if(!isNaN(currentValue)){
				// Parse "100.0" to 100.
				currentValue = parseFloat(currentValue);
			}
			
			if(!this._currentState  || this._currentState && currentValue != this._currentState.name){
				var stateIndex = this.usedStates.length;
				// fastest way to fetch the state index of a value
				while(stateIndex-- && currentValue != this.usedStates[stateIndex].name){};
				this._lastSubmittedState = this._currentState = this.usedStates[stateIndex];
				this.slider.set("value", stateIndex);
			}
			
			this._refreshValueDisplay();
		}else{
			this._resetWidget();
		}
	},
	
	_refreshValueDisplay: function(){
		//	summary:
		//		Refresh the display of the current value's label and range label (supplementary).
		domClass.add(this.domNode, "xc_user_answered");
		this.set("value", this._currentState.label);
		if(this.rangeLabelNode){
			var rangeLabel = this._currentState.supplementaryLabel;
			this.rangeLabelNode.innerHTML = rangeLabel;
			this.rangeLabelDelimiterLeftNode && domStyle.set(this.rangeLabelDelimiterLeftNode, "display", rangeLabel ? "" : "none");
			this.rangeLabelDelimiterRightNode && domStyle.set(this.rangeLabelDelimiterRightNode, "display", rangeLabel ? "" : "none");
		}
	},
	
	_setValueAttr: function(value){
		this.valueNode.innerHTML = this.getValueHtml(value);
	},
	_getValueAttr: function(){
		return this.valueNode.innerHTML;
	},
	
	getValueHtml: function(value){
		var fakeState = {label:value, longLabel:value, supplementaryLabel:value};
		var map = {
			label: this._getStateLabel(fakeState) || "",
			unit: this._getStateUnit(fakeState) || ""
		};
		!map.label && (map.unit = ""); 
				
		return string.substitute(this.valueTemplateString, map, undefined, this);
	},
	
	_resetWidget: function(){
		//	summary:
		//		Reset the widget and the slider.
		//	description:
		//		Is called by the `reset` method on reset click and if current value is empty (e.g. `resetProfile`).
		
		if(this.slider.value){
			// Store that the widget is unanswered (as if been reset) until the slider is moved again so we don't
			// send the first state as a new current value.
			this._reset = true;
			this.slider.set("value", 0);
			this._currentState = null;
			// Reset last value variable.
			delete this._lastSubmittedState;
		}
		// Reset the value display.
		domClass.remove(this.domNode, "xc_user_answered");
		this.set("value", "");
		if(this.rangeLabelNode){
			this.rangeLabelNode.innerHTML = "";
			this.rangeLabelDelimiterLeftNode && domStyle.set(this.rangeLabelDelimiterLeftNode, "display", "none");
			this.rangeLabelDelimiterRightNode && domStyle.set(this.rangeLabelDelimiterRightNode, "display", "none");
		}
	},
	
	_onSliderValueChange: function(stateIndex){
		//	summary:
		//		At this point the user has really changed the slider state.
		//		Check if the user has moved the slider handle and frees it
		//		at the same position, but then we are completely safe to
		//		notify the API about the changes.
		//	stateIndex: Integer
		//		not used here, since we know the currentState that was fetched
		//		before the slider value has changed.
		if(this._currentState !== this._lastSubmittedState && !this._reset){
			//	track the users answer
			tracker.track("answer", this.facet.name, this.facetInGroupName, this.currentValue[0]);
			
			this._publishValue();
			this._lastSubmittedState = this._currentState;
		}
		delete this._reset;
	},
	
	_onBeforeCurrentSliderValueChange: function(stateIndex){
		//	summary:
		//		Update the current value without calling any API
		//		method.
		//	stateIndex: Integer
		//		the current step that is active in the slider
		//	see:
		//		http://trac.excentos.lan/trac/xcTechnologies/wiki/XcAjaxClient/ServerSlider#SchnittstellezumWidgetWasstehtwiewo
		if(this._reset)return;
		var state = this.usedStates[stateIndex];
		
		if(state !== this._currentState){
			this.currentValue[0] = state.name;
			this._currentState = state;
			
			this._refreshValueDisplay();
		}
	},
	
	_setEnabledAttr: function(/*Boolean*/ enabled){
		this.inherited(arguments);
		this.slider.set("disabled", !enabled);
	}
});

return Slider;
});
