define([
	"dojo/_base/declare",
	"dojo/has",
	"dojo/query",
	"excentos/shared",
	"./editable/EditAction"
], function(declare, has, query, shared, EditAction){
	
	
/*=====
	// _Editable
=====*/
	
var DATA_ATTRIBUTES = [
	"edit-type",
	"key",
	"image-dimensions",
	"image-maxbytes",
	"content-type",
	"content-object",
	"text-maxlength"
];

var _domWrap = document.createDocumentFragment();
var _prefix = "data-xc-";
var _editTypeAttr = _prefix+DATA_ATTRIBUTES[0]; //"data-xc-edit-type"

var _Editable = declare(
	"excentos.widget._Editable",
	null,
	{
		
		isEditable: false,
		editTargets: null,
		
		_beforeFillContent: function(){
			//summary 
			// check if is editable and store data for later instantiation.
			// note that ´_beforeFillContent´ is executed after the template is parsed and ´this.domNode´ is available
			// but before subwidgets are injected
			

			_domWrap.appendChild(this.domNode);
			//query looks inside domNode ... domNode itself is not checked
			var nl = query("["+_editTypeAttr+"]", _domWrap);
			if(!!nl.length){
				this.isEditable = true;
				this.editTargets = [];
				for(var i=0, l=nl.length; i<l; i++){
					this.editTargets.push(new EditTarget(this,nl[i]));
				}
			}
			_domWrap.removeChild(this.domNode);
			
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this.inherited(arguments);

			if(has("customer-backend") && this.isEditable){
				this.createEditableActions();
			}
		},

		createEditableActions: function(){
			var ts=this.editTargets, i=ts.length, w, t;
			while(i && i--){
				t=ts[i];
				w = shared.widgetFactory.makeWidget("editable.EditAction", {editTarget:t});
				w && w.placeAt(t.node, "first");
			}
		}
		
	});


//Stores complex Data
var EditTarget = function(widget,node){
	this.widget = widget;
	this.node = node;
	//no need to initialize with null, if the EditableNode will be instantiated there was data detected beforehands
	this.data = {};
	
	var i=0, l=DATA_ATTRIBUTES.length, attr, value;
	for(; i<l; ++i){
		attr = DATA_ATTRIBUTES[i];
		value = node.getAttribute(_prefix+attr);
		
		/*"image-dimensions" to width x height fallback
		if(!value && attr == "image-dimensions" && node.nodeName.toUpperCase() == "IMG" && node.width && node.height){
			value = node.width+"x"+node.height;
		}*/
		value && (this.data[attr] = value);
	}
};

return _Editable;
});