define([
	"dojo/_base/declare",
	"excentos/transition/RootStageTransition"
], function(declare, RootStageTransition){
		
return declare(
	"excentos.theme.core-mobile.transition.RootStageTransition",
	RootStageTransition,
{
	
	useTransitionType: function(stageChangeObject, currentPhase, previousPhase){
		//override excentos.transition.RootStageTransition::useTransitionType
		return "transition.StageTransitionDefault"; //we dont really need any transition
	}
});

});
