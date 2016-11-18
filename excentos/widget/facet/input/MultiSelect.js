define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"excentos/log",
	"./_Input",
	"excentos/tracking/Tracker"
], function(declare, array, log, _Input, tracker){

return declare(
	"excentos.widget.facet.input.MultiSelect",
	_Input,
{
	//holds the last clicked state object
	_userCurrentState: null,

    constructor: function(){
        this.baseClass += " xc_multiselect";
    },

	postMixInProperties: function(){
		this.inherited(arguments);
	},


	onStateClick: function(/*excentos.widget.facet.input.State*/ stateWidget){
		if(!this.enabled)return;
		
		var stateChecked 	= !stateWidget.get("checked"),
			stateName		= stateWidget.state.name,
			stateValueIndex = array.indexOf(this.currentValue, stateName);
		
		if(stateChecked){
			if(stateValueIndex === -1){
				this.onAnswer(stateName, stateValueIndex, stateWidget);
			}
		}else{
			if(stateValueIndex !== -1){
				this.onUnanswer(stateName, stateValueIndex, stateWidget);
			}
		}
		
		stateWidget.set("checked", stateChecked);
		
		this._publishValue();
	},
	
	onAnswer: function(stateName, stateValueIndex, stateWidget){
		this.currentValue.push(stateName);
		tracker.track("answer", this.facet.name, this.facetInGroupName, stateName);
	},

	onUnanswer: function(stateName, stateValueIndex, stateWidget){
		this.currentValue.splice(stateValueIndex, 1);
		if(!this.currentValue.length){
			tracker.track("answer.unset", this.facet.name, stateName);
		}
	},

	reset: function(){
		this.inherited(arguments);
	},

	getCurrentState: function(){
		//override excentos.widget.facet._Input::getCurrentState()
		//determine the currentState

		var _stateItems /*Map*/ = this.facetInGroup.facetInGroupStateItems,
			_currentValue /*Array*/  = this.currentValue;

		var _currentState = this._userCurrentState ||
				(
					log.warn(this.declaredClass+"::"+arguments.callee.nom+"() there was no viable `_userCurrentState`. Trying last state of facet`s `currentValue`..."),
					_stateItems[_currentValue[_currentValue.length-1]]
				) ||
				(
					log.error(this.declaredClass+"::"+arguments.callee.nom+"() could not retrieve a state object"), 
					null
				);

		return _currentState;
	}
});

});
