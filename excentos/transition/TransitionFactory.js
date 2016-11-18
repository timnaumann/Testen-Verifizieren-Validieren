define([
	"../log",
	"dojo/_base/lang",
	"excentos/util",
	"./registry",
	"../widget/registry"
], function(log, lang, util, registry, widgetRegistry){

	var exports = {
		make: function(/*String|Class*/ transitionType, /*Array?*/ args, /*Object?*/ mixin){
			// summary:
			//	returns a new Transition instance using `args` for initialization and `mixin` for setting instance properties

			var ctor = util.$(transitionType);
			var transition = lang.mixin(new ctor, mixin);
			transition.init.apply(transition, args||[]);

			var type = util.getClassType(transition);
			registry.toIndex(["byId", transition.id], transition);
			registry.toIndex(["byName", transition.name], transition, []);
			registry.toIndex(["byType", type], transition, []);
			registry.toIndex(["byDeclaredClass", transition.declaredClass], transition, []);
			registry.toIndex(["list"], transition, []);
			if(transition.targetWidget){
				registry.toIndex(["byTargetWidget", transition.targetWidget.id], transition, []);
				registry.toIndex(["byTransitionHavingTargetWidget", type + "+" + transition.targetWidget.id], transition);
			}

			log("transition","created transition",transition.name,transition.targetWidget ? "for target "+transition.targetWidget.id : "");
			return transition;
		},

		make2: function(params){
			var obj = lang.mixin({
				type: "",
				args: null,
				mixin: null
			}, params);

			return this.make(obj.type, obj.args, obj.mixin);
		},

		//TODO: more readable params/api  makeForEach({eachWidgetType: [String|Class], makeType: [String|Class]})
		makeForEach: function(params){
			var obj = lang.mixin({
				widgetClass: null,
				condition: null,
				type: "",
				args: [],
				mixin: {},
				targetWidget: null
			}, params);

			var ctor = util.$(obj.type);
			var classType = ctor && util.getClassType(ctor);

			var transitions = [];
			widgetRegistry.byInstanceOf(obj.widgetClass).forEach(function(widget, index, widgets){

				if(registry.byTransitionHavingTargetWidget(classType, widget)){
					return;
				} //skip if transition and targetWidget already exist

				if(typeof obj.condition != "function" || obj.condition(widget, index, widgets)){
					//					console.log(obj.type, widget.id);
					var restoreTargetWidget = obj.mixin.targetWidget;
					var targetWidget = obj.targetWidget || obj.mixin.targetWidget;

					obj.mixin.targetWidget = typeof targetWidget == "function" ?
						targetWidget.apply(this, arguments) :
					targetWidget || widget;

					transitions.push(this.make2(obj));

					obj.mixin.targetWidget = restoreTargetWidget;
				}
			}, this);

			return transitions;
		},

		//move to AbstractFactory when  usage of  byType is cleaned (WidgetFactory uses byType in sense of byApiType)
		get: function(/*String|Class*/ type /*, ...args*/){
			// summary:
			//	returns an existing element or creates a new one
			var ctor = util.$(type);
			var classType = ctor && util.getClassType(ctor);

			var obj = registry.byType(classType);

			return obj ? obj[0] : this.make.apply(this, arguments); //FIXME: arguments miscount
		}
	};

	return exports;
});