define([
	"dojo/_base/declare",
	"./TransitionFactory",
	"./StageTransitionDefault"
], function(declare, TransitionFactory, StageTransitionDefault){
		
return declare(
	"excentos.transition.StageTransitionFromEndGame",
	StageTransitionDefault,
{
	
	name: "StageTransitionFromEndGame",
	
	createElements: function(){
		this.inherited(arguments);
		
		//additionally starts RecommendationTransition::PHASES.ANIMATION_HIDE
		this.PHASES.ANIMATION_HIDE = this.parallel([
			this.PHASES.ANIMATION_HIDE,
			this.dynamic(function(){
				return TransitionFactory.get("transition.RecommendationTransition").PHASES.ANIMATION_HIDE;
			})
		]);
	}
});

});
