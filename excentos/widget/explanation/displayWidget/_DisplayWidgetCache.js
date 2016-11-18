define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/widget/registry",
	"excentos/uistate"
], function(declare, shared, xcWidgetRegistry, uistate){

//A Mixin Class for explanation.DisplayWidget to store the last seen explanation via UIState

var _uiState={displayWidgetCache:{}};
return declare(null, {
	
	postCreate: function(){
		this.inherited(arguments);
		this.connect(shared.behavior,"onInitDone",this.updateExplanationFromUiState);
	},
	
	updateExplanationFromUiState: function(){
		var uiState = uistate.get();
		
		if("displayWidgetCache" in uiState){
			//sync the local `_uiState` with the global `uiState` if `displayWidgetCache` is present there
			_uiState = uiState;
			//check if an `apiName` was stored in an explanation uistate for this explanation.DisplayWidget 
			var apiName = uiState.displayWidgetCache[this.id];
			var widget = apiName && xcWidgetRegistry.byName(apiName);
			
			return !!widget && widget.explain();
		}
	},
	
	onNewEnrichment: function(propertyName, oldValue, newValue){
		this.inherited(arguments);
		this._updateUiState();
	},
	
	_updateUiState: function(){
		//retrieve the facetWidget by checking the back reference in the currently assigned `enrichment`
		var apiName =  this.enrichment && this.enrichment.enrichableWidget && this.enrichment.enrichableWidget.apiName || "";
		if(apiName){
			_uiState.displayWidgetCache[this.id] = apiName;
		}else {
			delete _uiState.displayWidgetCache[this.id];
		}

		uistate.set(_uiState);
	}
});
});