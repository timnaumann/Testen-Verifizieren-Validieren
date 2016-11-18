define([
	"dojo/_base/declare",
	"./_Widget"
], function(declare, _Widget){

return declare(
	"excentos.widget.Button",
	[_Widget],
{
	relativeTemplatePath: "Button.html",
	templateString: '<div class="xc_button ${actionTypeClass}" data-dojo-attach-event="onclick:_onClick">${label}</div>',
	
	// label: HTML String
	//		Text to display in button.
	label: "",
	
	disabled: false,
	
	// actionType: String
	//		Node attribute to tell if button is a primary or secondary action
	//		See http://www.lukew.com/resources/articles/PSactions.asp
	actionType: "",
	
	postMixInProperties: function(){
		this.inherited(arguments);
		
		if(this.actionType){
			this.actionTypeClass = 'xc_' + this.actionType + '_action';
		}
	},
	
	_onClick: function(){
		if(!this.disabled){
			this.onClick();
		}
	},
	
	onClick: function(){},
	
	_setDisabledAttr: function(disabled){
		this.disabled = disabled;
		dojo.toggleClass(this.domNode, "xc_disabled", disabled);
	}
});

});
