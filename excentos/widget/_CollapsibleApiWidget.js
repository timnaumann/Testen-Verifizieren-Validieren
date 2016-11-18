define([
	"dojo/_base/declare",
	"excentos/shared",
	"excentos/tracking/Tracker",
	"./_Collapsible"
], function(declare, shared, tracker, _Collapsible){

var _CollapsibleApiWidget = declare(
	"excentos.widget._CollapsibleApiWidget",
	_Collapsible,
	{		
			
		postCreate: function(){
			this.updatePropertyFromConfig("collapsible","boolean");
			this.inherited(arguments);
		},
		
		/*********** PROTECTED ***********/
		
		_onCollapseClick: function(){
			var action = this.collapsed ? "group.show" : "group.hide";
			tracker.track(action, this.getApiName());
			this.inherited(arguments);
		},

		onCollapsedChange: function(property, oldValue, newValue){
			this.inherited(arguments);
			this._updateApiExpanded()
		},
		
		_updateApiExpanded: function(){
			var expanded = !this.collapsed, vars = this.getApiVars();
			if(vars.expanded != expanded){
				return shared.behavior.setExpanded(this.getApiType(), this.apiName, expanded);
			}
		}
	}
);

return _CollapsibleApiWidget;
});