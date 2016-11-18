define([
	"dojo/_base/declare",
	"./Recommendation"
], function(declare, Recommendation){

return declare(
	"excentos.widget.recommendation.RecommendationDetails",
	[Recommendation],
{
	relativeTemplatePath: "recommendation/RecommendationDetails.html"
});

});
