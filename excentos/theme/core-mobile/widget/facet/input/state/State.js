define([
	"dojo/_base/declare",
	"dojo/_base/event",
	"excentos/widget/facet/input/state/State"
], function(declare, event, State){

return declare(
	"excentos.theme.core-mobile.widget.facet.input.state.State",
	State,
	{
		toggleTrigger: true,
		
		_handleDisplayWidgetClick: function(/*Event*/ e){
			// summary:
			//	bound by template, is called when click on DisplayWidget occurs
			event.stop(e);
			this.unexplain();
		}
	});
});