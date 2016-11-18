define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_Widget",
	"dijit/_Templated",
	"dojo/fx",
	"dijit/Tooltip",
	"dojo/_base/Deferred",
	"dojo/aspect"
], function(declare, lang, _Widget, _Templated, fx, Tooltip, Deferred, aspect){


var ExplanationTrigger = declare("excentos.calculator.widget.ExplanationTrigger", [_Widget, _Templated],{
	
	containerNode: null,
	triggerNode: null,
	hoverMode: true,
	
	templateString: "<div class='xc_explanation_trigger'>"+
						"<div data-dojo-attach-point='triggerNode' data-dojo-attach-event='onclick:_onClick' class='xc_explanation_trigger_node'></div>" +
						"<div data-dojo-attach-point='containerNode' class='xc_explanation_container_node'></div>" +
					"</div>",
					
	postCreate: function(){
		this.inherited(arguments);
		if(this.hoverMode){
			this.connect(this.domNode, "onmouseenter", this.show);
			this.connect(this.domNode, "onmouseleave", this.hide);
		}
	},
	
	_onClick: function(){
		// summary:
		//	handler method for the onclick event.
		//	Has a toggle logic that hides the very same tooltip if clicked twice or
		//	simply shows the recently clicked one (it will hide a previously opened tooltip beforehands)
		this.isActiveTooltip() ? this.hide() : this.show();
	},
	
	show: function(){
		// summary:
		//	Hides an already opened tooltip in a lazy manner and 
		//  calls the implied ´show´ method to make the tooltip visible (with updated content & position)
		this.hide().then(lang.hitch(this,this._show));
	},
	
	_show: function(){
		Tooltip.show(this.containerNode.innerHTML, this.triggerNode, ["below"]);
	},
	
	hide: function(){
		// summary:
		//	hides a tooltip if it is showing
		//  returns a deferred to easily determine when the toolip is actually hidden
		var tt = this.getTooltip();
		var deferred = new Deferred();
				
		if(this.isTooltipShowing()){
			var connectHandler = this.connect(tt.fadeOut, "onEnd", function(){
				connectHandler.remove();
				deferred.callback();
			});
			Tooltip.hide(tt.aroundNode);
		}else {
			deferred.callback();
		}
		
		return deferred;
	},
	
	isActiveTooltip: function(){
		// summary:
		//	returns ´true´ if the ´this´ is the currently visible tooltip
		var tt = this.getTooltip();
		return tt && tt.isShowingNow && (tt.aroundNode == this.triggerNode);
	},
	
	isTooltipShowing: function(){
		// summary:
		//	returns ´true´ if the tooltip is visible else it returns ´false´
		var tt = this.getTooltip();
		return !!tt && tt.isShowingNow;
	},
	
	getTooltip: function(){
		// summary:
		//	returns the master Tooltip instance
		return Tooltip._masterTT;
	}
});

return ExplanationTrigger;
});