define([
	"dojo/_base/declare",
	"dojo/_base/fx",
	"excentos/shared",
	"excentos/transition/_StageTransition"
], function(declare, fx, shared, _StageTransition){
		
return declare(
	"excentos.transition.StageTransitionDefault",
	_StageTransition,
{
	
	name: "StageTransitionDefault",
	
	constructor: function(){
		this.role = this.ROLE_BRANCH;
	},
	
	createElements: function(){
		this.inherited(arguments);		
	
		var getStageNode = function(){
			return shared.stageChangeController.getCurrentStageNode();
		};
		
		this.PHASES.ANIMATION_HIDE = this.animation(fx.fadeOut, {
			node: getStageNode,
			duration: 500
		});
		
		this.PHASES.WAIT = this.animation(fx.fadeIn,{node:"xc_loader"});
		this.PHASES.UNWAIT = this.animation(fx.fadeOut,{node:"xc_loader"});
		this.PHASES.LISTEN = this.parallel([
			this.deferred(shared.behavior.preloadLikelyImages(),{name:"dynamic_image_Preloader"}),
			this.PHASES.LISTEN
		]);
		this.PHASES.ANIMATION_SHOW = this.animation(
			fx.animateProperty, {
				node: getStageNode,
				duration: 500,
				properties: {
					opacity: {
						start: 0,
						end: 1
					}
				}
			}
		);
	}
});

});
