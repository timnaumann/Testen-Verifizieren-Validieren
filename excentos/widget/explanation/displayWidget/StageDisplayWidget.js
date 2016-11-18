define([
	"dojo/_base/declare",
	"excentos/util",
	"./DisplayWidget"
], function(declare, util, DisplayWidget){
	
return declare("excentos.widget.explanation.displayWidget.StageDisplayWidget", DisplayWidget, {

	_stageWidget: null,

    constructor: function(){
        this.baseClass += " xc_stage_display_widget";
    },
	
	getStageWidget: function(){
		return this._stageWidget || (this._stageWidget=util.getStageWidget(this));
	},
	
	isVisible: function(){
		return this.getStageWidget().isVisible();
	}
});
});