define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dijit/_Widget",
	"excentos/shared",
	"../_TemplatedMixin"
], function(declare, lang, event, _Widget, shared, _TemplatedMixin){
	
/*=====
	// EditAction Widget defines the user interaction and action to the server
=====*/
	
var EditAction = declare(
	"excentos.widget.editable.EditAction",
	[_Widget, _TemplatedMixin],
	{
		
		templateString: "<div class='xc_edit_type_%{editType}'><div class='xc_edit_icon'></div></div>",
		//TODO: avoid tight coupling
		editTarget: null,
		editType: "",
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this.editType = this.editTarget.data["edit-type"];
		},
		
		postCreate: function(){
			this.inherited(arguments);
			this.on("click", lang.hitch(this, this.callEdit));
		},
		
		callEdit: function(e){
			event.stop(e);
			shared.behavior.callEditAction(this.editType,this.editTarget.data);
		}
	});

return EditAction;
});