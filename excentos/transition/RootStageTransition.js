define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/util",
	"./TransitionFactory",
	"./_StageTransition",
	"./StageTransitionDefault",
	"./StageTransitionToEndGame",
	"./StageTransitionFromEndGame"
], function(declare, shared, util, TransitionFactory, _StageTransition, StageTransitionDefault, StageTransitionToEndGame, StageTransitionFromEndGame){
		
return declare(
	"excentos.transition.RootStageTransition",
	_StageTransition,
{
	
	name: "RootStageTransition",
	
	constructor: function(){
		this.role = this.ROLE_ROOT;
		this.EndGame = util.$("widget.facetgroup.wizard.EndGame");
	},
	
	createQueue: function(){
		//overriding the default queue here 
		//complexity is outsourced to the StageTransition* Classes
		
		this._manager.addElement(
		    this.dynamic(this,  this._useTransitionType, {name:"StageTransition.determination"}),
		0);
	},
	
	_useTransitionType: function(){
		var obj = shared.stageChangeController.getStageChangeObject();
		var curPhase = obj.current.phaseWidget;
		var prevPhase = obj.previous.phaseWidget;
		
		var determinedTransition = this.useTransitionType(obj, curPhase, prevPhase);
		return determinedTransition && TransitionFactory.get(determinedTransition);
	},
	
	useTransitionType: function(stageChangeObject, currentPhase, previousPhase){

		var transition = this.isEndGame(currentPhase) && StageTransitionToEndGame ||
		 				 this.isEndGame(previousPhase) && StageTransitionFromEndGame ||
						 StageTransitionDefault;

		return transition;
	},
	
	isEndGame: function(phase){
		return !!(this.EndGame && phase && phase.isInstanceOf(this.EndGame));
	}
});

});
