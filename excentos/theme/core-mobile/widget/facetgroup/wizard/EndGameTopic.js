define([
	"dojo/_base/declare",
	"excentos/widget/facetgroup/wizard/Topic"
], function(declare, Topic){

return declare(
	"excentos.theme.core-mobile.widget.facetgroup.wizard.EndGameTopic",
	Topic,
{
		
	//relativeTemplatePath: "facetgroup/wizard/EndGameTopic.html", no relative Template path to allow fallback to Topic.html
    constructor: function(){
        this.baseClass += " xc_stage xc_topic xc_endgame_topic";
    }
		
});

});
