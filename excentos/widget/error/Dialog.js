define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"../Dialog"
], function(declare, domClass, Dialog){

return declare(
	"excentos.widget.error.Dialog",
	[Dialog],
{
					
	postMixInProperties: function(){
		this.inherited(arguments);
		this.baseClass += " xc_error_dialog";
	},
	
	//	closable: Boolean
	//		If true the dialog can be closed, otherwise not.
	//		Since the Dialog should be able to display different errors
	//		this property must be a runtime-config-option.
	//		e.g.: Invalid useragent dialogs are not closable whereas API timeout 
	//		error dialogs should be
	closable: true
});

});
