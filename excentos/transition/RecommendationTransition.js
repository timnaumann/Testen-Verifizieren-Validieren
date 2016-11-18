define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/_base/fx",
   "dojo/aspect",
   "dojo/dom-style",
   "excentos/util",
   "excentos/shared",
   "excentos/transition/_PhasedTransition"
], function(declare, lang, fx, aspect, domStyle, util, shared, _PhasedTransition){
	
var RecommendationTransition = declare(
	"excentos.transition.RecommendationTransition",
	_PhasedTransition,
{	
	name: "RecommendationTransition",
	
	// targetWidget : recommendation.Recommendations
	targetWidget: null,
	//allow refresh of recommendations during ANIMATION_SHOW
	override: true,
	
	init: function(){
		this.inherited(arguments);
		
		this.preventRefresh(shared.behavior, "refreshRecommendationsWidget");
		aspect.before(this.targetWidget, "expelOldRecList", lang.hitch(this, this._checkStart));
	},
	
	_checkStart: function(){
		//util.isVisible returns true/false/undefined, in case it is not explicitly false we assume this thing is visible
		if(util.isVisible(this.targetWidget) !== false){
			this.start();
		}
	},
	
	createElements: function(){
		this.inherited(arguments);
		
		var getRecNode = lang.hitch(this,function(){
			return this.targetWidget.containerNode;
		});
		this.PHASES.ANIMATION_HIDE = this.make("animation", fx.fadeOut, {node: getRecNode, delay:10});
		this.PHASES.LISTEN = this.make("listener", shared.behavior,"onResultsHandled"); //release the listener anyways, in case onNewAppRecommendations was not triggered
		this.PHASES.ANIMATION_SHOW = this.make("animation", fx.fadeIn, {
			node: getRecNode,
			delay: 10,
			beforeBegin:function(node){domStyle.set(node, "opacity", 0);}
		});
	}
});

return RecommendationTransition;

});