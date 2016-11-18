define([
	"dojo/_base/declare",
	"../../util",
	"./handler/Handler" /*NMD:Ignore*/, /*implicit module declaration*/
	"excentos/Singleton"
], function(declare, util, Handler, Singleton){

return Singleton(declare("excentos.widget.explanation.Controller", null, {
	//	_explanationHandlers: excentos.widget.explanation.handler.Handler{}
	_explanationHandlers: null,
	
	constructor: function(){
		//	summary:
		//		set up an default handler
		
		// _explanationHandlers: Object
		//		Holds all registered excentos.widget.explanation.Handler instances 
		//		stored in a key like _explanationHandler["myHandlerKey"] = new xcProject.theme.brand.explanation.MyHandler();
		this._explanationHandlers = {
			"default": new (util.$("widget.explanation.handler.Handler"))
		};
	},
	
	setExplanationHandlers: function(/*widget.explanation.handler.Handler*/ handlers){
		//	summary:
		//		replaces the explanation widget handlers with
		//		handlers object given as first parameter
		this._explanationHandlers = handlers;
	},
	
	addExplanationHandlers: function(/*Object*/ handlers){
		//	summary:
		//		adds a list of explanation handlers
		//		this will override any handlers that have
		//		already been registered for specific type
		for(var type in handlers){
			this._explanationHandlers[type] = handlers[type];
		}
	},
	
	addExplanationHandler: function(/*String*/ type, /*widget.explanation.handler.Handler*/ handler){
		//	summary:
		//		registers an explanation widget handler
		//		for the given type
		this._explanationHandlers[type] = handler;
	},
	
	getExplanationHandler: function(/*String*/ type){
		//	summary:
		//		returns the explanation widget handler
		//		for the given type or null if not found
		//	type: String
		//		Can either be a key for ´_explanationHandlers´ (like "default") or
		//		a relative class name (like "explanation.ApplicationSelectorHandler")
		//		that will be instantiated and added to the ´_explanationHandlers´.
		var handler = this._explanationHandlers[type];
		
		//try auto-adding explanationHandlers - eg. type = "widget.explanation.handler.CustomHandler"
		handler || (handler = new util.$(type)()) && this.addExplanationHandler(type, handler);
		
		return handler || null;
	},
	
	removeExplanationHandler: function(/*String*/ type){
		//	summary:
		//		deletes an explanation widget handler
		delete this._explanationHandlers[type];
	},
	
	explain: function(/*excentos.wiget._Explainable*/ widget){
		//	summary:
		//		explains an explainable widget
		//		searching for a fitting explanation widget handler
		//		and applies the explainable to it
		//		returns the handler or null if there is none
		var handler = this._getHandlerFromExplainable(widget);
		handler && handler.show(widget);
		
		return handler;
	},
	
	unexplain: function(/*excentos.wiget._Explainable*/ widget){
		//	summary:
		//		explains an explainable widget
		//		searching for a fitting explanation widget handler
		//		and applies the explainable to it
		//		returns the handler or null if there is none
		var handler = this._getHandlerFromExplainable(widget);
		handler && handler.hide(widget);
		
		return handler;
	},
	
	_getHandlerFromExplainable: function(explainable){
		var type = explainable.get("explanationType");
		return this.getExplanationHandler(type);
	}
}));

});
