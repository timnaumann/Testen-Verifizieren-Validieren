define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"excentos/uistate"
], function(declare, array, uistate) {

	//NOTE: Ideas for "InteractionHistory", which also knows the order of Groups/Facets
	//		- implement SERVERSIDE! (we wont be able to store the history of the application within uistate)
	//		- rename StateHistory to InteractionHistory
	//		- convert to excentos/Singleton
	//		- inherit from AbstractRegistry and provide index for easy and quick lookups


	var NOT_INITIALIZED = {},
		UISTATE_KEY = "stateHistory",
		uistateStateHistory = NOT_INITIALIZED;

    var StateHistory = declare(
        "excentos.widget.facet.input.state.StateHistory",
        null,{

			_stateHistoryEntries: null,
			apiName: "",

            constructor: function(/*String*/ apiName){
				this.apiName = apiName;
                this._stateHistoryEntries = [];
				this._syncInternalUiState();
            },

			_syncInternalUiState: function(){
				if(uistateStateHistory === NOT_INITIALIZED){
					uistateStateHistory = {};
					uistateStateHistory[UISTATE_KEY] = uistate.get(UISTATE_KEY) || {};
				}
				this._stateHistoryEntries = uistateStateHistory[UISTATE_KEY][this.apiName] || [];
			},

			/********* PUBLIC *********/
			truncateHistoryEntries: function(){
				this._stateHistoryEntries.length = 0;
				this._updateUiState();
			},

			removeHistoryEntry: function(/*String*/ stateName){
				this._removeHistoryEntry(stateName) && this._updateUiState()
			},

			addStateToHistory: function(/*String*/ stateName){
				this._addStateToHistory(stateName) && this._updateUiState()
			},


			/********* GETTER / SETTER *********/
			getHistoryEntriesFromUiState: function(){
				var stateHistory = (uistate.get(UISTATE_KEY)||{});
				return stateHistory[this.apiName];
			},

			getHistoryEntry: function(/*String|Number?*/ fromIndex){
				var _entries = this.getHistoryEntries(),
					_mapToIndex = {"first":0, "last":_entries.length-1},
					_index = _mapToIndex[fromIndex];
				return _entries[_index];
			},

			getHistoryEntries: function(){
				return this._stateHistoryEntries;
			},

			setHistoryEntries: function(/*String[]*/ stateHistoryEntries ){
				this._stateHistoryEntries = stateHistoryEntries.slice();
			},

			getHistoryEntryIndex: function(/*String*/ stateName){
				return array.indexOf(this._stateHistoryEntries, stateName);
			},

			hasHistoryEntry: function(/*String*/ stateName){
				return this.getHistoryEntryIndex(stateName) !== StateHistory.INDEX_NOT_FOUND;
			},

			/********* PROTECTED *********/
			_removeHistoryEntry: function(/*String*/ stateName){
				var index = this.getHistoryEntryIndex(stateName);
				if(index !== StateHistory.INDEX_NOT_FOUND){
					return this._stateHistoryEntries.splice(index,1);
				}
			},

			_addStateToHistory: function(/*String*/ stateName){
				this._removeHistoryEntry(stateName);
				return this._stateHistoryEntries.push(stateName);
			},

			_updateUiState: function(){
				uistateStateHistory[UISTATE_KEY][this.apiName] = this._stateHistoryEntries;
				uistate.set(uistateStateHistory);
			}

        }
    );
	StateHistory.INDEX_NOT_FOUND = -1;

	return StateHistory;

});