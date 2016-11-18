define([
	"dojo/_base/declare",
    "excentos/widget/NavigationButton",
    "./PhaseButton"
], function(declare, NavigationButton, PhaseButton){

return declare(
	"excentos.widget.facetgroup.wizard.TopicButton",
	NavigationButton,
{
	relativeTemplatePath: "facetgroup/wizard/TopicButton.html",

    constructor: function(){
        this.baseClass += " xc_topic_button";
    },
    
    onButtonClick: PhaseButton.prototype.onButtonClick
});

});
