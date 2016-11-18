define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/widget/Navigation",
	"./TopicButton" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, shared, Navigation, TopicButton){


var _stages;
return declare("excentos.widget.facetgroup.wizard.TopicNavigation", Navigation, {

	navigationButtonClass: "facetgroup.wizard.TopicButton",
	count: true,

	constructor: function(){
		this.baseClass += " xc_topic_navigation";
		this.data = shared.store.getFacetRootGroup();
	},
	
	_getNavigationDataItems: function(){
		return _stages || (_stages = shared.store.getStages());
	}
});


	
});