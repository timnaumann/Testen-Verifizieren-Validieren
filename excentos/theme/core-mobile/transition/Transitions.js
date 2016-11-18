define([
	"dojo/_base/declare",
	"excentos/Singleton",
	"excentos/transition/Transitions",
	"excentos/transition/TransitionFactory",
	
	// register available project transitions
	"./RootStageTransition",
	"./StageTransitionDefault"
	
], function(declare, Singleton, Transitions, TransitionFactory){
	
	return Singleton(declare("excentos.theme.core-mobile.transition.Transitions", Transitions, {
		init: function(){
			this.disable("transition.LoaderTransition");
			this.disable("transition.CollapseTransition");
			
			this.inherited(arguments);
		}
	}));
	
});