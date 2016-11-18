define([
	"dojo/_base/declare",
	"./DisplayWidgetHandlerFactory",
	"excentos/util"
], function(declare, DisplayWidgetHandlerFactory, util){

//handles multi-explainable case - where each stage is displaying an explanation at any time
return declare("excentos.widget.explanation.handler.StageDisplayWidgetHandlerFactory", DisplayWidgetHandlerFactory, {

	_stageWidgetsByExplainableCache: {},

	_getConcreteHandlerKey: function(/*excentos.wiget._Explainable*/ explainable){
		return	this._getStageWidgetByExplainable(explainable).apiName;
	},

	_associateHandlerContext: function(/*excentos.widget.explanation.handler.Handler*/ handler, /*excentos.wiget._Explainable*/ explainable){
		// summary:
		//  easy-to-override-method to apply a backreference to a handler in conjunction with the explainable which triggered its very creation

		return handler.set("relatedExplainable", this._getStageWidgetByExplainable(explainable));
	},

	_getStageWidgetByExplainable: function(/*excentos.wiget._Explainable*/ explainable){
		return	this._stageWidgetsByExplainableCache[explainable.apiName] ||
			(this._stageWidgetsByExplainableCache[explainable.apiName] = util.getStageWidget(explainable));
	}
	
});

});
