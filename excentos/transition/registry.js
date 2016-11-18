define([
	"dojo/_base/declare",
	"../AbstractRegistry"
], function(declare, AbstractRegistry){

	var TransitionRegistry = declare("excentos.transition.registry", AbstractRegistry, {

		byTargetWidget: function(/*Widget?*/ widget){
			// summary:
			//		returns the Transitions by given targetWidget - or the whole index by targetWidget
			// widget: Widget

			return this.getIndex("byTargetWidget", widget.id);
		},

		byTransitionHavingTargetWidget: function(/*String?*/ transitionType, /*Widget?*/ widget){
			// summary:
			//		returns the Transitions by transition having a certain targetWidget - or the whole index 
			//		useful in cases where we wnt to know whether a widget is already associated with a certain transition 
			//		without iterating the whole byTargetWidget  list

			var arg = transitionType && widget ? transitionType + "+" + widget.id : undefined;
			return this.getIndex("byTransitionHavingTargetWidget", arg);
		},

		register: function(/*Transition*/ transition){
			var declaredClass = transition.declaredClass;
			var transitionType = declaredClass.substring(declaredClass.lastIndexOf(".") + 1);

			//fill byId, byName, byType, byDeclaredClass
			this.inherited(arguments);
			if(transition.targetWidget){
				this.toIndex(["byTargetWidget", transition.targetWidget.id], transition, []);
				this.toIndex(["byTransitionHavingTargetWidget", transitionType + "+" + transition.targetWidget.id], transition);
			}
		}

	});

	return new TransitionRegistry;

});