define([
	"dojo/_base/declare",
	"./Handler",
	"excentos/util"
], function(declare, Handler, util){
	
//handles multi-explainable case - creating concrete explanation.Handlers
return declare("excentos.widget.explanation.handler.HandlerFactory", Handler, {
	
	_handlers: null,
	concreteHandlerType: "",
	relatedExplainable: null,
	
	constructor: function(){
		this._handlers = {};
	},
	
	show: function(/*excentos.wiget._Explainable*/ explainable){
		var handler = this.getHandler(explainable);
		return handler.show(explainable);
	},
	hide: function(/*excentos.wiget._Explainable*/ explainable){
		var handler = this.getHandler(explainable);
		return handler.hide(explainable);
	},
	
	getHandler: function(/*excentos.wiget._Explainable*/ explainable){
		//summary:
		// retrieves or creates a Handler which is losely associated with the explainable
		// e.g. A Handler per explainable.apiName is created and stored

		var handlerKey = this._getConcreteHandlerKey(explainable);
		return 	this._handlers[handlerKey] || 
				(this._handlers[handlerKey] = this._createConcreteHandler(explainable));
	},
	
	_getConcreteHandlerKey: function(/*excentos.wiget._Explainable*/ explainable){
		// summary:
		//  returns an identifier for a new (concrete) Handler that is being created on lose context to the explainable
		// (the explainable itself just helps narrowing down from where the explanation was triggered, the actual binding can also relate to the stage/phase,
		// or even some special feature of particular explainable Widgets e.g. Handlers per specific contentItems or groupType)

		return explainable.apiName;
	},

	_createConcreteHandler: function(/*excentos.wiget._Explainable*/ explainable){
		// summary:
		//  the actual factory-like method, which creates a brand new instance and sets a backreference to whatever is useful for that particular handler instance

		var concreteHandler = new (util.$(this.concreteHandlerType));
		this._associateHandlerContext(concreteHandler, explainable);

		return concreteHandler;
	},

	_associateHandlerContext: function(/*excentos.widget.explanation.handler.Handler*/ handler, /*excentos.wiget._Explainable*/ explainable){
		// summary:
		//  easy-to-override-method to apply a backreference to a handler in conjunction with the explainable which triggered its very creation

		return handler.set("relatedExplainable", explainable);
	}
});

});
