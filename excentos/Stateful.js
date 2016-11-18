define([
	"dojo/_base/declare", 
	"dojo/when",
	"dojo/Stateful"
], function(declare, when, Stateful){
	// module:
	//		excentos/Stateful

return declare("excentos.Stateful", Stateful, {
	callbackOnChangeOnly: true,

	_getAttrNames: function(name){
		//override dojo.Stateful::_getAttrNames
		//provide same interface for getters/setters as experienced by dijit._WidgetBase

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		
		var uc = name.charAt(0).toUpperCase()+name.substring(1);
		return (apn[name] = {
			s: "_set" + uc + "Attr",
			g: "_get" + uc + "Attr"
		});

	},

	set: function(/*String*/name, /*Object*/value){
		//override dojo.Stateful::_getAttrNames
		//provide same behavior for getters/setters as experienced by dijit._WidgetBase
		
		if(typeof name === "object"){
			for(var x in name){
				if(name.hasOwnProperty(x) && x !="_watchCallbacks"){
					this.set(x, name[x]);
				}
			}
			return this;
		}

		var names = this._getAttrNames(name),
			oldValue = this._get(name, names),
			setter = this[names.s],
			result;
		if(typeof setter === "function"){
			// use the explicit setter
			result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// no setter so set attribute directly
			this[name] = value;
		}
		if(this._watchCallbacks){
			var self = this;
			// If setter returned a promise, wait for it to complete, otherwise call watches immediately
			when(result, function(){
				if(!self.callbackOnChangeOnly || oldValue !== value){
					self._watchCallbacks(name, oldValue, value);
				}
			});
		}
		return this; // excentos.Stateful
	}

});

});
