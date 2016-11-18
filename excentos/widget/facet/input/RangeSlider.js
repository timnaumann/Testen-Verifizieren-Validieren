define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/string",
	"dojo/dom-class",
	"dojo/dom-construct",
	"excentos/shared",
	"./_Input",
	"../../form/HorizontalRangeSlider",
	"../../form/HorizontalRuleLabels",
	"excentos/tracking/Tracker"
], function(declare, lang, array, string, domClass, domConstruct, shared, _Input, HorizontalRangeSlider, RuleLabels, tracker){
	
var Slider = declare(
	"excentos.widget.facet.input.RangeSlider",
	_Input,
{

	relativeTemplatePath: "facet/input/RangeSlider.html",
		
	//	slider: Object
	//		The slider form widget
	slider: null,

	//sliderOptions: Object
	//		constructor options for the dijit slider widget
	sliderOptions: null,
	
	//  state: Object
	//		The current states (API Object) that represents the value
	_currentStates: null,
	
	// _lastSubmittedState: Object
	//		The ´_currentState´ before sending the value
	_lastSubmittedStates: null,
	
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
	//	the node the HorizontalSlider is created at
	sliderNode: null,
	
	// valueNode: HTMLDOMElement
	//	the value will displayed here
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
        this.baseClass += " xc_slider xc_rangeslider";
    },

	postMixInProperties: function(){
		this.inherited(arguments);
		this.updatePropertyFromConfig("minimizeLabels", "boolean");
		this.updatePropertyFromConfig("renderEmptyLabels", "boolean");
		this.updatePropertyFromConfig("renderInvisibleLabels", "boolean");
		this.updatePropertyFromConfig("decorationNode", "string");

		this.states = this.getApiChildren();
		var stateVars = shared.store.getFacetInGroupStateVarItemsByFacetInGroupName(this.facetInGroupName);

		this.accessibleStates = [];
		for(var i=0,l=this.states.length,v,s; i<l; ++i){
			s = this.states[i]; v = stateVars[s.name];
			v.visible && this.accessibleStates.push(s);
		}

		//choose from which list ticks and labels should be taken
		this.usedStates = this.renderInvisibleLabels ? this.states : this.accessibleStates;

		this._currentState = this.usedStates[0];
		this._currentStates = [
			this.usedStates[0],
			this.usedStates[this.usedStates.length-1]
		]
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
				value: [0, this.states.length - 1],
				discreteValues: this.usedStates.length,
				onChange: lang.hitch(this, this._onSliderValueChange),
				onBeforeCurrentValueChange: lang.hitch(this, this._onBeforeCurrentSliderValueChange)
			}, this.sliderOptions);

			this.slider = shared.widgetFactory.makeWidget(HorizontalRangeSlider, sliderOptions, this.sliderNode);
			
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

		if(this.slider.get("discreteValues") !== this.states.length){
			this.slider.set({
				discreteValues: this.states.length,
				maximum: this.states.length-1
			});	
		}
		var sliderValue = this.slider.get('value');

		if(this.currentValue.length){
			for (var i = 0, l = this.currentValue.length; i < l; ++i) {
				var value = this.currentValue[i];
				// HACK http://trac.excentos.lan/trac/xcProjects/ticket/1873#comment:2
				if(!isNaN(value)){
					// Parse "100.0" to 100.
					value = parseFloat(value);
				}

				if(this._currentStates[i] && value != this._currentStates[i].name){
					var stateIndex = this.states.length;
					// fastest way to fetch the state index of a value
					while(stateIndex-- && value != this.states[stateIndex].name){};
					if (this._lastSubmittedStates === null) {
						this._lastSubmittedStates = [];
					}
					this._lastSubmittedStates[i] = this._currentStates[i] = this.states[stateIndex];
					sliderValue[i] = stateIndex;
					this.slider.set('value', sliderValue);
				}
			}
			this._refreshValueDisplay();
		}else {
			this._resetWidget();
		}
	},
	
	_refreshValueDisplay: function(){
		//	summary:
		//		Refresh the display of the current value's label.
		domClass.add(this.domNode, "xc_user_answered");
		this.set("value", array.map(this._currentStates, function(state){return state.label}));
	},

	_setValueAttr: function(values){
		this.valueNode.innerHTML = array.map(values, this.getValueHtml, this).join(" - ");
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
			this.slider.set("value", [0, this.states.length - 1]);
			// Reset last value variable.
			delete this._lastSubmittedState;
		}
		// Reset the value display.
		this.valueNode.innerHTML = "";
	},
	
	_onSliderValueChange: function(stateIndexes){
		//	summary:
		//		At this point the user has really changed the slider state.
		//		Check if the user has moved the slider handle and frees it
		//		at the same position, but then we are completely safe to
		//		notify the API about the changes.
		//	stateIndex: Integer
		//		not used here, since we know the currentState that was fetched
		//		before the slider value has changed.
		if(!this._reset && (this._lastSubmittedStates === null
		|| (this._lastSubmittedStates[0] && this._currentStates[0] !== this._lastSubmittedStates[0]
		|| (this._lastSubmittedStates[1] && this._currentStates[1] !== this._lastSubmittedStates[1])))
		){
			//	track the users answer
			tracker.track("answer", this.facet.name, this.facetInGroupName, this.currentValue.join('-'));
			
			this._publishValue();
			this._lastSubmittedStates = this._currentStates.slice();
		}
		delete this._reset;
	},

	isOrdinal: function() {
		return this.facet.type === 'OrdinalFacet';
	},

	isNumber: function() {
		return this.facet.type === 'NumberFacet';
	},

	_onBeforeCurrentSliderValueChange: function(stateIndexes, priorityChange, maxValue){
		//	summary:
		//		Update the current value without calling any API
		//		method.
		//	stateIndex: Integer
		//		the current step that is active in the slider
		//	see:
		//		http://trac.excentos.lan/trac/xcTechnologies/wiki/XcAjaxClient/ServerSlider#SchnittstellezumWidgetWasstehtwiewo
		if(this._reset) return;
		if (typeof stateIndexes === 'number') {
			var value = this.slider.get('value');

			if (maxValue === true) {
				stateIndexes = [
				    value[0], 
				    stateIndexes
				];
			} else {
				stateIndexes = [
				    stateIndexes,
				    value[1]
				];
			}
		}
		if (stateIndexes[0] >= stateIndexes[1]) {
			return false;
		}
		for (var i = 0, l = stateIndexes.length; i < l; ++i) {
			var state = this.states[stateIndexes[i]];

			if (state) {
				this.currentValue[i] = state.name;
				this._currentStates[i] = state;
			}
		}

		this._refreshValueDisplay();

	},

	_setEnabledAttr: function(/*Boolean*/ enabled){
		this.inherited(arguments);
		this.slider.set("disabled", !enabled);
	}
});

return Slider;
});
