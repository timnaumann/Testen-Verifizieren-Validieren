define([
	"dojo/_base/array",
	"dojo/_base/declare"
], function(array, declare){

	return declare(null, {
		//name: String
		// name of the theme according to what is configured like "ipad-instore"
		name: "",

		//type: String
		// categorized type like "excentos" or "xcProject"
		type: "",

		//path: String
		// usually the same as declaredClass - describes the template path like "xcProject.theme.ipad-instore"
		path: "",

		//extend: Array
		// describes which theme instances(!) this theme is extending - works exactly like the dojo/_base/declare superclass argument: [excentos.theme.coretheme, xcProject.theme.default]
		extend: null,
		_themeChain: null,

		//templateString: Object
		// our theme based template override mechanic: templateStrings = { "facetgroup.wizard.Wizard": dojo,cache("xcProject.theme", "ipad-instore/widget/facetgroup/wizard/Wizard.html"), ...}
		templateStrings: null,

		//dpiSale: String
		// see excentos/shared::constants.DPI_SCALES
		dpiScale: "ldpi",

		//preloadImages: Object
		// list and group static image ressources that should be preloaded like: 
		//	preloadImages: { "standard": [require.toUrl("./img/loader.gif"), require.toUrl("./img/sprite.png")], "xcAjaxClient.wizard.phase4.explorer": [require.toUrl("./img/specialbg.jpg")] }
		preloadImages: null,

		init: function(){

		},

		getThemeChain: function(){
			var chain = this._themeChain;
			
			if(!chain){
				chain = [];
				array.forEach(this.constructor._meta.bases, function(ctor){
					var proto = ctor.prototype;
					("getThemeChain" in proto) && chain.push(proto);
				});
			}

			return this._themeChain = chain;
		}
	});

});