define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"../Singleton",

	"./TransitionFactory",
	"./registry",
	"../util",
	
	"../widget/_Collapsible",
	"../widget/recommendation/Recommendations",
	
	"./LoaderTransition",
	"./RootStageTransition",
	"./CollapseTransition",
	"./RecommendationTransition"
	
	
], function(declare, array, Singleton, TransitionFactory, TransitionRegistry, util, _Collapsible, Recommendations, LoaderTransition, RootStageTransition, CollapseTransition, RecommendationTransition){

	function _toggleEnable(/*String|Class*/ type, /*Boolean*/ enable){
		//enable/disable existing instances
		var ctor = util.$(type);
		var classType = ctor && util.getClassType(ctor);

		if(classType){
			var list = type ? TransitionRegistry.byType(classType) : TransitionRegistry.list();
			array.forEach(list, function(transition){
				transition.disable(!enable);
			});

			//enable/disable all future instances
			ctor && (ctor.prototype.disabled = !enable);
		}

	}
	
	
	/**
	 * Provides instantiation and execution of
	 * - LoaderTransition
	 * - RootStageTransition
	 * 	- StageTransitionDefault
	 * 	- StageTransitionToEndGame
	 * 	- StageTransitionFromEndGame
	 * - RecommendationTransition
	 * - CollapseTransition
	 */
	
	return Singleton(declare("excentos.transition.Transitions",null, {
	
		enabled: true,
		
		init: function(){
			if(this.enabled){
				this.create();
				this.createByWidget();
			}
		},
		
		refresh: function(){
			this.enabled && this.createByWidget();
		},
		
		create: function(){
			TransitionFactory.make2({type:LoaderTransition});
			TransitionFactory.make2({type:RootStageTransition});
		},
		
		createByWidget: function(){
			
			TransitionFactory.makeForEach({
				type:CollapseTransition, 
				widgetClass: _Collapsible,
				condition: function(widget){
					return widget.collapsible && widget.collapsibleNode;
				}
			});
			
			TransitionFactory.makeForEach({
				type:RecommendationTransition, 
				widgetClass: Recommendations
			});
		
		},
		
		enable: function(/*String*/ type){
			_toggleEnable(type, true);
		},
		
		disable: function(/*String*/ type){
			_toggleEnable(type, false);
		}

	}));
	

});