define([
	"dojo/_base/declare",
	"./HandlerFactory",
	"./DisplayWidgetHandler" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, HandlerFactory, DisplayWidgetHandler){

return declare("excentos.widget.explanation.handler.DisplayWidgetHandlerFactory", HandlerFactory, {
	
	//creates a (concrete) handler for each explainable
	concreteHandlerType: "widget.explanation.handler.DisplayWidgetHandler"
	
});

});
