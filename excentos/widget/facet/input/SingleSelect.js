define([
	"dojo/_base/declare",
	"./_Input",
	"excentos/tracking/Tracker",
    "excentos/widget/registry",
	"./state/State"
], function(declare, _Input, tracker, registry){

return declare(
	"excentos.widget.facet.input.SingleSelect",
	_Input,
{
    constructor: function(){
        this.baseClass += " xc_singleselect";
    },
	
	onStateClick: function(/*excentos.widget.facet.input.State*/ stateWidget){
		if(!this.enabled)return;

		if(stateWidget.get("checked")){
			return;
		}
		
		var _previousStateWidget = registry.byName(this.apiName+".state."+this.currentValue[0]);
		_previousStateWidget && _previousStateWidget.set("checked", false);

		this.currentValue[0] = stateWidget.state.name;
		
		//	track that the user just answered a single select facet
		tracker.track("answer", this.facet.name, this.facetInGroupName, stateWidget.state.name);
		stateWidget.set("checked", true);
		
		this._publishValue();
	}
});

});
