define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "../shared",
	"../widget/_Widget",
	"./Button"
], function(declare, domClass, shared, _Widget, Button){

return declare(
	"excentos.widget.StageInPathNavigation",
	_Widget,
{
	relativeTemplatePath: "StageInPathNavigation.html",
    templateString: '<div class="xc_tab_nextprevious"\
						><div class="xc_tab_previous" data-dojo-attach-point="previousButtonNode"></div\
						><div class="xc_tab_next" data-dojo-attach-point="nextButtonNode"></div\
					></div>',
	
	postCreate: function(){
		this._initialiseNavigation();
	},


	_initialiseNavigation: function(){
		this._previousButton = new Button({
			label: this.i18n.stageinpathnavigation_previous,
			actionType: "secondary",
			onClick: this._onPreviousButtonClick
		}).placeAt(this.previousButtonNode);

		this._nextButton = new Button({
			label: this.i18n.stageinpathnavigation_next,
			actionType: "primary",
			onClick: this._onNextButtonClick
		}).placeAt(this.nextButtonNode);
	},
	
	_onPreviousButtonClick: function(){
		//provide same arguments as Behavior::onPhaseButtonClick(facetGroupName, phaseButtonWidget)
		shared.behavior.onStageInPathNavigationPreviousClick(shared.store.getFacetGroupVars().previousStageInPath, this);
	},
	
	_onNextButtonClick: function(){
		//provide same arguments as Behavior::onPhaseButtonClick(facetGroupName, phaseButtonWidget)
		shared.behavior.onStageInPathNavigationNextClick(shared.store.getFacetGroupVars().nextStageInPath, this);
	},
	
	refresh: function(){
		var facetGroupVars = excentos.shared.store.getFacetGroupVars();
		// Previous button.
		switch(facetGroupVars.showMoveToPreviousStage){
			case "disabled":
				this._previousButton.set("disabled", true);
				break;
			case "no":
				domClass.add(this._previousButton.domNode, "xc_hidden");
				break;
			default:  // "yes"
				this._previousButton.set("disabled", false);
				domClass.remove(this._previousButton.domNode, "xc_hidden");
		}
		// Next button.
		switch(facetGroupVars.showMoveToNextStage){
			case "disabled":
				this._nextButton.set("disabled", true);
				break;
			case "no":
				domClass.add(this._nextButton.domNode, "xc_hidden");
				break;
			default:  // "yes"
				this._nextButton.set("disabled", false);
				domClass.remove(this._nextButton.domNode, "xc_hidden");
		}
	}
});

});
