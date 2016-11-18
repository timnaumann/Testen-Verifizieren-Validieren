define([
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/json",
	"./shared",
	"./Controller"
], function(lang, cookie, JSON, shared, Controller){

var module = {
	useCookies: false,
	
	get: function(/*String?*/ property){
		// summary:
		//	returns the uiState according to given `property`.
		//	if no `property` is given, all uiStates are being returned
		
		if(property){
			return _uiState && property in _uiState ? _uiState[property] : null;
		}else {
			return _uiState;
		}
	},
	
	set: function(/*Object*/data, /*Boolean?*/override){
		// summary:
		//	appends data to the existing uistate unless `override` is set to true.
		//  In that case the uiState is overridden by the given data instead of being appended
		
		if(!override){
			_uiState = lang.mixin(_uiState, data);
		}else {
			_uiState = data;
		}
		
		_save();
	},

	setSaveInCookie: function(value){
		this.useCookies = value;
	},
	
	remove: function(property){
		// summary:
		//	removes a single property from uiState.
		//  if no property is given, all properties of uistate will be deleted
		
		if(property){
			if(property in _uiState){
				delete _uiState.property;
			}
		}else {
			_uiState = {};
		}
		
		_save();
	}
};

function _save(){
	// summary:
	//	sends the current uiState via controller
	
	var data = JSON.stringify(_uiState);
	if(module.useCookies){
		cookie("xcUiState", data);
		//apply `useCookies` to the server side once
		var uiStateMetaData = JSON.parse(shared.store.getMetaData().uiState || "{}");
		if(!uiStateMetaData.useCookies){
			_callService(JSON.stringify({useCookies:true}));
		}
	}else {
		_callService(data);
	}
}

function _callService(data){
	return Controller.getInstance().callService("setUIState", {
		getParams: {resultsMode: "onlyDefaults"},
		postParams: {"UIState": data},
		delay: 300
	});
}

//read serialized uistate, if not serializable, the uistate will be discarded
var _uiState = {};
try {
	var uiStateCookie = JSON.parse(cookie("xcUiState") || "{}");
	var uiStateData = xcInitial.payload.applicationItems[xcInitial.masterApplicationName].metaData.uiState;
	var uiStateMetaData = JSON.parse(uiStateData || "{}");

	_uiState = uiStateMetaData;
	if(uiStateMetaData.useCookies){
		lang.mixin(_uiState, uiStateCookie);
	}else {
		//delete old cookie if metadata uiState does not contains `useCookies` (it may be a new session)
		cookie("xcUiState", null, {expires: -1});
	}
	
} catch(e) {
	console.warn("excentos/utistate.js","discarded data for uistate due to non-JSON content", uiStateData);
}

return module;
	
});