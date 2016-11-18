define([
	"dojo/_base/declare",
	"dojo/_base/connect",
	"excentos/widget/facetgroup/wizard/TopicNavigation",
	"excentos/widget/_Collapsible"
], function(declare, connect, TopicNavigation, _Collapsible){

return declare(
	"excentos.theme.core-mobile.widget.facetgroup.wizard.TopicNavigation",
	[TopicNavigation, _Collapsible],
	{
		collapsed: true,
		
		postCreate: function(){
			this.inherited(arguments);
			connect.subscribe("/app/ajaxClient/router/onStageChanged", this, this.collapse);
		}
	});
});