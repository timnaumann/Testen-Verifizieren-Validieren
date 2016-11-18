define([
	"dojo/_base/declare",
	"./Handler",
	"../displayWidget/DisplayWidget" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, Handler, DisplayWidget){
	
return declare("excentos.widget.explanation.handler.DisplayWidgetHandler", Handler, {
	
	relatedExplainable: null,
	displayWidgetType: "explanation.displayWidget.DisplayWidget",

	_createDisplayWidget: function(){
		// summary:
		//	DisplayWidgetHandler relies on _Explainables providing such a displayWidget via property `explanationDisplayWidget`
		//override excentos.widget.explanation.handler.Handler::_createDisplayWidget()

		//TODO: there is no need to hard-link to a magic property `explanationDisplayWidget`...
		var relatedExplainable = this.get("relatedExplainable");
		return relatedExplainable.explanationDisplayWidget || this.inherited(arguments);

	}
	
});


});
