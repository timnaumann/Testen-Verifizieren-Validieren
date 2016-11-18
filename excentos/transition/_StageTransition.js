define([
	"dojo/_base/declare",
	"./_PhasedTransition",
	"../shared"
], function(declare, _PhasedTransition, shared){

var _StageTransition = declare(
	"excentos.transition._StageTransition",
	[_PhasedTransition],
{

	role: 0,
	
	//we need separate classes for branched stagetransitions
	ROLE_ROOT: 		1,
	ROLE_BRANCH: 	2,
	ROLE_SINGLE: 	4,
	
	constructor: function(){
		this.role = this.ROLE_SINGLE;
	},
	
	createElements: function(){
		//override inherited _PhasedTransition::createEleemnts()
		this.inherited(arguments);
		//predefine the listener for onNewAppFacetGroupVars - which indicates a whole UI-Refresh
		this.PHASES.LISTEN = this.listener(shared.behavior, "onNewAppFacetGroupVars");
	},
	
	initMethodCallPrevention: function(){
		// tags: override
		this.inherited(arguments);
		
		var b = shared.behavior;
		
		//NOTE: Workaround for not yet handling impatient users
		//original function execution gets prevented
		
		//NOTE: using (xc)aspect around will prevent any connect from being triggered until the original function gets called
		
		if(this.isRootLike()){
			this.preventCall(b, "moveToAccessibleStage");
			this.preventCall(b, "moveToNextStageInPath");
			this.preventCall(b, "moveToPreviousStageInPath");
			this.preventCall(b, "onRestart");
		}
		if(this.role !== this.ROLE_ROOT){
			this.preventRefresh(b, "refreshFacetGroupVars");
			this.preventRefresh(b, "refreshFacetGroupWidgets");
			this.preventRefresh(b, "refreshStageNavigation");
			//is no default refresh method
			this.preventRefresh(b, "refreshRecommendationsWidget");
		}
	},
	
	onMoveToStage: function(/*Object*/ stageChangeObject){
		// override
		this.isRootLike() && this.start();
	},
	isRootLike: function(){
		return this.role & (this.ROLE_ROOT|this.ROLE_SINGLE);
	}
});
		
return _StageTransition;

});
