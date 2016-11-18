define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-class"
], function(declare, array, domClass){

var _cssPrefix = "xc_layout_";
var _Layout = declare(
	"excentos.widget._Layout",
	null,
	{
		_layouts: null,
		
		constructor: function(){
			this._layouts = [];
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			if(this.isApiWidget){
				var _layouts = this.getConfigItems("layout","array");
				_layouts && (this._layouts = _layouts);
			}

		},
		
		postCreate: function(){
			this.inherited(arguments);
			this._publishLayouts();
		},
		
		_publishLayouts: function(){
			if(this._layouts.length){
				domClass.add(this.domNode, _cssPrefix+this._layouts.join(" "+_cssPrefix));
			}
		},
		
		hasLayout: function(/*String*/ str){
			// summary:
			// 	checks whether a given or any layout is set
			if(!this._layouts.length){
				return false;
			}
			return !str || str && array.indexOf(this._layouts,str) != -1;
		}
	});
return _Layout;
});