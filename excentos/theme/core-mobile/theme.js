define([
    "require",
	"dojo/text",	//required for dojo cache
	"excentos/theme/ThemeFactory",
	
	"./Behavior",
	
	"excentos/widget/facetgroup/wizard/Wizard",
		   "./widget/facetgroup/wizard/EndGame",
		   "./widget/facetgroup/wizard/TopicNavigation",
	"excentos/widget/facetgroup/wizard/TopicButton",
	
	"excentos/widget/facetgroup/Explorer",
	"excentos/widget/facetgroup/SelectionTags",
	
	"excentos/widget/facet/input/SingleSelect",
	"excentos/widget/facet/input/MultiSelect",
	"./widget/facet/input/Slider",

	"./widget/facet/input/state/State",
	
	"excentos/widget/explanation/displayWidget/DisplayWidget",
	"excentos/widget/explanation/handler/DisplayWidgetHandlerFactory",
	
	"./widget/facetgroup/wizard/RecommendationsWrapper",
	
	"excentos/widget/StageInPathNavigation"
	
], function(require, text, ThemeFactory){
	
	return ThemeFactory.makeTheme("excentos.theme.core-mobile",{
		extend: [],
		templateStrings: {
			"ApplicationPane":								dojo.cache("excentos.theme", "core-mobile/templates/ApplicationPane.html"),
			"StageInPathNavigation":						dojo.cache("excentos.theme", "core-mobile/templates/StageInPathNavigation.html"),
			
			"facetgroup.wizard.Wizard":						dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/Wizard.html"),
			"facetgroup.wizard.Phase":						dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/Phase.html"),
			"facetgroup.wizard.EndGame":					dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/EndGame.html"),
			"facetgroup.wizard.Topic":						dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/Topic.html"),
			"facetgroup.wizard.TopicButton":				dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/TopicButton.html"),
			"facetgroup.wizard.TopicNavigation":			dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/TopicNavigation.html"),
			"facetgroup.wizard.RecommendationsWrapper":		dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/wizard/RecommendationsWrapper.html"),
			
			
			"facetgroup.FacetGroup":						dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/FacetGroup.html"),
			"facetgroup.ExplorerFacetGroup":				dojo.cache("excentos.theme", "core-mobile/templates/facetgroup/CollapsibleFacetGroup.html"),
			
			"facet.input._Input":							dojo.cache("excentos.theme", "core-mobile/templates/facet/input/_Input.html"),
			"facet.input.Slider":							dojo.cache("excentos.theme", "core-mobile/templates/facet/input/Slider.html"),
			"facet.input.state.State":						dojo.cache("excentos.theme", "core-mobile/templates/facet/input/state/State.html"),
			"facet.input.state.Unset":						dojo.cache("excentos.theme", "core-mobile/templates/facet/input/state/Unset.html"),
			
			"form.HorizontalSlider":						dojo.cache("excentos.theme", "core-mobile/templates/form/HorizontalSlider.html"),
			
			"recommendation.Recommendations":				dojo.cache("excentos.theme", "core-mobile/templates/recommendation/Recommendations.html"),
			"recommendation.Recommendation":				dojo.cache("excentos.theme", "core-mobile/templates/recommendation/Recommendation.html"),
			
			"enrichment.decoration.TitleImageText":				dojo.cache("excentos.theme", "core-mobile/templates/enrichment/decoration/TitleImageText.html"),
			"enrichment.decoration.TitleImageTextVideoPopup":	dojo.cache("excentos.theme", "core-mobile/templates/enrichment/decoration/TitleImageTextVideoPopup.html"),
			"enrichment.explanation.TitleImageText":			dojo.cache("excentos.theme", "core-mobile/templates/enrichment/explanation/TitleImageText.html"),
			"enrichment.explanation.TitleImageTextVideoPopup":	dojo.cache("excentos.theme", "core-mobile/templates/enrichment/explanation/TitleImageTextVideoPopup.html")
		},
		dpiScale: "mdpi",
		availableWidth: (document.getElementById("xc_application")||{}).offsetWidth || 360,
		preloadImages: {
			"standard": [
				require.toUrl("./img/sprites.png"),
				require.toUrl("./img/loader.gif"),			
				require.toUrl("./img/background-slider-light.png"),						
				require.toUrl("./img/background-slider-dark.png")
			]
		}
	});
});