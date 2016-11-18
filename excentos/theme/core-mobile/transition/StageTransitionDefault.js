define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"excentos/transition/StageTransitionDefault",
	"excentos/util"
], function(declare, domClass, StageTransitionDefault, util){
		
return declare(
	"excentos.theme.core-mobile.transition.StageTransitionDefault",
	StageTransitionDefault,
{
	
//	debugMode: 1,
	createElements: function(){
		
		this.inherited(arguments);
		
		this.PHASES.ANIMATION_HIDE = this.timeout(1000);
		this.PHASES.WAIT = this.invoker(function(){
			domClass.add(document.body, "xc_transition_wait");
		});
		this.PHASES.UNWAIT = this.invoker(function(){
			domClass.remove(document.body, "xc_transition_wait");
		});
		this.PHASES.ANIMATION_SHOW = this.timeout(1000);
	}
});

});
