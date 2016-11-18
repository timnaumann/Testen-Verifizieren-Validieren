define([
	"dojo/_base/declare",
	"dojo/fx",
	"excentos/aspect",
	"excentos/transition/_PhasedTransition"
], function(declare, fx, aspect, _PhasedTransition){
	var onCollapse;
var CollapseTransition = declare(
		"excentos.transition.CollapseTransition",
		_PhasedTransition, 
	{
	
	name: "CollapseTransition",	
			
	// targetWidget : widget._Collapsible
	targetWidget: null,
	override: true,
	
	init: function(){
		var widget = this.targetWidget;
		//define events when to start the transition
		
		aspect.before(widget, "onCollapse", this.start, this);
		aspect.before(widget, "onExpand", this.start, this);
		
		//define methods that should be halted while transitioning
		//this way the (may) api call is made after the transition has ended!
		this.preventRefresh(widget, "onCollapsed");
		this.preventRefresh(widget, "onExpanded");
		
		this.inherited(arguments);
	},
	
	start: function(){
		//we have to take into account that _Collapsibles are not necessarily _CollapsibleApiWidgets which always provide `isVisible()`!
		if(!("isVisible" in this.targetWidget) || this.targetWidget.isVisible()){
			this.inherited(arguments);
		}else {
			this.processRefreshStack();
		}
	},
	
	createElements: function(){
		if(!this.targetWidget.collapsibleNode)return;
		
		var ANIMATION_HIDE = this.animation(fx.wipeOut,{node: this.targetWidget.collapsibleNode},{override:true});
		var ANIMATION_SHOW = this.animation(fx.wipeIn,{node: this.targetWidget.collapsibleNode},{override:true});
		
		this.PHASES.ANIMATION_HIDE = this.dynamic(this, function(){
			return this.targetWidget.collapsed ? ANIMATION_SHOW : ANIMATION_HIDE;
		});
	}
});

return CollapseTransition;
});