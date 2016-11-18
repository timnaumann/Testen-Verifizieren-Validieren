define([
	"dojo/_base/declare"
],function(declare){

//Mixin Class to help a facet in displaying the current state's explanation
return declare(	
	null, {
		
	_publishValue: function(){
		this.inherited(arguments);
		this.mediateExplain();
	},
	
	mediateExplain: function(){
		//serves as override point
		var explainable = this.getResponsibleExplainable();
		explainable && explainable.explain();
	},

	getResponsibleExplainable: function(){
		var currentStateWidget = null,
			responsibleExplainable = this.isExplainable() && this || 
									(currentStateWidget = this.getCurrentStateWidget()) && currentStateWidget.isExplainable() && currentStateWidget;

		return responsibleExplainable;		
	}
});

});