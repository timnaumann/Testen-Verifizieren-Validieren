define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"excentos/shared",
	"../FacetGroup",
	"./Topic",
	"./TopicButton"
], function(declare, array, shared, FacetGroup){

return declare(
	"excentos.widget.facetgroup.wizard.Phase",
	FacetGroup,
{
	//	summary:
	//		A facet group widget that is meant to be used as the first level of the Wizard widget.
	//		It creates Topics as sub facet group widgets and a topic navigation.
	
	relativeTemplatePath: "facetgroup/wizard/Phase.html",
	
	subFacetGroupWidgetType: "wizard.Topic",
	
	constructor: function(){
		this._topicButtons = [];
        this.baseClass += " xc_phase";
	},
	
	postCreate: function(){
		// Create navigation first as `refresh` is called by the inherited `postCreate`.
		//deprecated
		this._createNavigation();
		this.inherited(arguments);
	},
	
	_createNavigation: function(){
		// Navigation widgets are only created if attach point `navigationNode` is present.
		// This way we can easily switch navigation on and off in the theme.
		if(this.navigationNode){
			var topics = shared.store.getOrderedFacetGroupsByName(this.facetGroup.name);
			array.forEach(topics, function(topic){
				// Navigation widgets are only created if attach point `navigationNode`is present.
				// This way we can easily switch navigation on and off in the theme.
				if(this.navigationNode){
					var widget = shared.widgetFactory.makeWidget(
						"facetgroup.wizard.TopicButton",
						{
							facetGroup: topic
						}
					);
					widget.placeAt(this.navigationNode);
					this._topicButtons.push(widget);
				}
			}, this);
		}
	},
	
	refresh: function(){
		this.inherited(arguments);
		this.refreshNavigation();
	},
	
	refreshNavigation: function(){
		// Find first and last visible topic button.
		var firstTopicButton = null,
			lastTopicButton  = null;
		
		array.forEach(this._topicButtons, function(topicButton){
			var vars = topicButton.getApiVars();
			if(vars.visible){
				if(firstTopicButton === null){
					firstTopicButton = topicButton;
				}
				lastTopicButton = topicButton;
			}
		});
		// Refresh all topic buttons.
		array.forEach(this._topicButtons, function(topicButton){
			topicButton.set("first", topicButton == firstTopicButton);
			topicButton.set("last", topicButton == lastTopicButton);
			topicButton.refresh();
		});
	}
	
});

});
