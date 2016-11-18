define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dijit/registry",
	"dijit/form/Button"
], function(declare, domClass, registry, Button){

var NavigationButton = declare("excentos.calculator.widget.NavigationButton", Button,{	
	target: "",
	container: "",
	
	 templateString: '<div class="xc_slidingdoor_button" data-dojo-attach-event="onclick:onClick" data-dojo-attach-point="focusNode"><div class="xc_door">'+
						'<div class="xc_slidingdoor_content">'+
	 						'<div data-dojo-attach-point="iconNode" class="xc_button_icon"></div>'+
	 						'<div data-dojo-attach-point="containerNode, titleNode, valueNode" class="xc_button_label"></div>'+
	 					'</div>'+
					'</div></div>',
					
	titleNode: null,
	focusNode: null,
	containerNode: null,
	valueNode: null,
	
	postCreate: function(){
		this.inherited(arguments);
		this._determineContainer();
		domClass.add(this.domNode,"xc_navigationbutton");
	},
	
	_determineContainer: function(){
		if(this.container)return;
		
		var widget = this, parent=widget.getParent();
		while(parent){
			widget = parent;
			parent = widget.getParent();
		}
		
		this.container = widget;
	},
	
	onClick: function(){
		if(this.container && this.target){
			registry.byId(this.container).selectChild(this.target);
		}
	}
});

return NavigationButton;
});