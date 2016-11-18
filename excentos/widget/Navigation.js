define([
	"dojo/_base/declare",
	"dojo/_base/array",
    "dojo/dom-class",
	"dojo/number",
	"dijit/_Container",
	"excentos/shared",
	"excentos/util",
	"./_Widget",
	"./_ApiWidget",
	"./NavigationButton" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, array, domClass, number, _Container, shared, util, _Widget, _ApiWidget, NavigationButton){

var Navigation = declare("excentos.widget.Navigation", [_Widget, _ApiWidget, _Container], {

	templateString: "<div></div>",
	navigationButtonClass: "NavigationButton",
	
	// count: Boolean
	//	set to true to enable counting of the elements displayed in front of the label
	count: false,
	countNumberFormat: "0#",

	//is not defined itself via api; it just uses the api data
	isApiWidget: false,

	
	_navButtons: null,

	constructor: function(){
		this.baseClass += " xc_navigation";
	},
	
	postMixInProperties: function(){
		this.inherited(arguments);
		this.connect(shared.behavior, "onNewAppFacetGroupVars", this.refresh);
	},
	
	postCreate: function(){
		this._createNavigation();
		this.inherited(arguments);
		
		// generate xc_navigation_target_*     (e.g. "xc_navigation_target_wizard",  "xc_navigation_target_facetgroup_wizard_phase1_individual-character", "xc_navigation_target_state_wizard-phase1-individual_character-user_gender-male")
		var cssId = util.generateCssIdFromName(this.apiName, "navigation_target");
		
		domClass.add(this.domNode, ["xc_navigation_type_"+this.apiType, cssId]);
	},
	
	_createNavigation: function(){	
		this._navButtons = [];
		
		var children = this._getNavigationDataItems();
		
		for(var i=0, l=children.length; i<l; ++i){
			var childObject = children[i];
			//FIXME: will fail in case of children are states because state names are provided without any context
			var type = shared.store.getType(childObject.name);
			
			var compatApiObjectPropertyName = type=="group" && "facetGroup" ||
											  type=="facet" && "facetInGroup" ||
											  type=="state" && "state";
			var props = {};
			props[compatApiObjectPropertyName] = childObject;
	
			var navbutton = this._createNavigationButton(props);
			if(navbutton){
				this.addChild(navbutton);
				this._navButtons.push(navbutton);
			}
		}
	},
	
	_getNavigationDataItems: function(){
		return shared.store.getChildren(this.apiName);
	},
	
	_createNavigationButton: function(/*Object*/ props){
		return shared.widgetFactory.makeWidget(
			this.navigationButtonClass, 
			props
		);
	},
	
	refresh: function(){

		// Find first and last visible phase button.
		var firstButton = null,
			lastButton  = null;
		
		var num = 0;
		array.forEach(this._navButtons, function(navButton){
			var vars = navButton.getApiVars();
			if(vars.visible){
				if(firstButton === null){
					firstButton = navButton;
				}
				lastButton = navButton;
				++num;
			}
			
			this.count && this._updateCount(navButton, vars.visible, num);
		}, this);
		// Refresh all phase buttons.
		array.forEach(this._navButtons, function(navButton){
			navButton.set("first", navButton == firstButton);
			navButton.set("last", navButton == lastButton);
			navButton.refresh();
		});
	},
	
	_updateCount: function(navButton, visible, num){
		num = visible ? num : 0;
		navButton.set("count", number.format(num, {pattern:this.countNumberFormat}));
	}
});


return Navigation;
	
});