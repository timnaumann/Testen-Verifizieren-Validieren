define([
	"dojo/_base/declare",	// declare
	"dijit/form/HorizontalRuleLabels"
], function(declare, HorizontalRuleLabels){

// module:
//		dijit/form/HorizontalRuleLabels

return declare("excentos.widget.form.HorizontalRuleLabels", HorizontalRuleLabels, {
	
	_genHTML: function(/*Float*/ pos, /*Int*/ndx){
		// summary:
		// add "xc_rulelabel_position_" "xc_first" / "xc_last" to the RuleLabel Node
		
		var cssclass = 	"xc_rulelabel_position_"+ndx;
		ndx==0 && (cssclass += " xc_first");
		ndx==this.labels.length-1 && (cssclass += " xc_last");
		ndx==Math.floor(this.labels.length/2) && (cssclass += " xc_middle");
		
		var positionPrefix = '<div class="dijitRuleLabelContainer dijitRuleLabelContainerH xc_rulelabel '+cssclass+'" style="left:';
 
		var label = this.labels[ndx];
		
		return positionPrefix + this._calcPosition(pos) + this._positionSuffix + this.labelStyle +
			this._genDirectionHTML(label) +
			this._labelPrefix + label + this._suffix;
	}
});


});