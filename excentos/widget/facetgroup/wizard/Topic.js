define([
	"dojo/Deferred",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"excentos/shared",
	"../FacetGroup"
], function(Deferred, declare, lang, shared, FacetGroup){

return declare(
	"excentos.widget.facetgroup.wizard.Topic",
	FacetGroup,
{
	relativeTemplatePath: "facetgroup/wizard/Topic.html",
	
	subFacetGroupWidgetType: "FacetGroup",
	delayPostCreate: true,

	constructor: function(){
		this.baseClass += " xc_stage xc_topic";
	},
	
	// this is a stage, so some lazy subfacetgroup creation can take place:
	_isReadyForSubwidgets: function(){
		var fgVars = shared.store.getFacetGroupVars();
		var vars = this.getApiVars();
		var name = this.apiName;
		
		// the very important condition (conservative):
		return name == fgVars.currentStageInView // sicherheitshalber
			|| name == fgVars.nextStageInPath // "preloader"
			|| name == fgVars.previousStageInPath // "preloader nach hinten"
			|| vars.inView // das wichtigste und zwingende Kriterium bei stages
			/*|| vars.visible*/;  // check auf visible macht nur bei facetgroups innerhalb von stages Sinn.
	},
	
	// experimental: improve UI responsiveness by wrapping stuff in a timeout (probably breaks stuff)
	postCreate: function(){
		var self = this, args = arguments;
		var deferred = new Deferred;
		var callInheritedAndResolve = function(){
			self.inherited(args);
			deferred.resolve();
		};
		this.delayPostCreate ? setTimeout(callInheritedAndResolve) : callInheritedAndResolve();

		return deferred;
	}
		
});

});
