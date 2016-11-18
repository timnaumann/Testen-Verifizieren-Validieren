define([
	"dojo/_base/declare",
	"./TransitionFactory",
	"./StageTransitionDefault",
	"excentos/shared"
], function(declare, TransitionFactory, StageTransitionDefault, shared){
		
return declare(
	"excentos.transition.StageTransitionToEndGame",
	StageTransitionDefault,
{
	
	name: "StageTransitionToEndGame",
	
	createElements: function(){
		this.inherited(arguments);	
		
		//additionally starts RecommendationTransition::PHASES.ANIMATION_SHOW
		this.PHASES.LISTEN = this.parallel([
			this.PHASES.LISTEN,
			this.listener(shared.behavior,"onNewAppRecommendations")
		]);
		this.PHASES.ANIMATION_SHOW = this.parallel([
			this.PHASES.ANIMATION_SHOW,
			this.dynamic(function(){
				return TransitionFactory.get("transition.RecommendationTransition").PHASES.ANIMATION_SHOW;
			})
		]);
	}
});

});
