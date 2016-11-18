define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./Theme",
	"./registry"
], function(declare, lang, Theme, themeRegistry){

	var exports = {
		makeTheme: function(/*String*/ pathName, /*Object*/ argsObj){
			// summary: creates a new theme instance
			// params:  - pathName required name for global namespace like "excentos.theme.mythemename".
			// 			- argsObj collection of options
			//				name: OPTIONAL give a theme a more descriptive name like "xcProject.theme._base.name = 'SportScheck Base Theme'" //TODOC use case ThemeSwitcher feature ?
			//				type: OPTIONAL acts like a namespacing logic   //TODOC use case ThemeSwitcher feature ?
			//				extend: OPTIONAL inheritance chain of themes the new theme is based on
			//				templateStrings: OPTIONAL list of templateStrings (can be overridden, will not delete inherited tempalteStrings)
			//									templateStrings: {"facetgroup.wizard.Topic": "<div>My Topic Template</div>"}

			if(!pathName){
				throw new Error("excentos.theme.Factory::createTheme() missing argument `pathName` - "+pathName+" was given");
			}

			argsObj.name = argsObj.name || pathName.substring(pathName.lastIndexOf(".")+1);
			argsObj.type = argsObj.type || pathName.substring(0,pathName.indexOf("."));
			argsObj.extend = argsObj.extend || [];
			argsObj.templateStrings = argsObj.templateStrings || {};

			argsObj.path = pathName;
			var extend = [Theme], templateStrings = {};
			for(var i=0, l=argsObj.extend.length; i<l; ++i){
				var parentTheme = argsObj.extend[i];
				
				//merge the templateStrings together (they needed to be copied from the prototype chain anyways)
				templateStrings = lang.mixin(templateStrings, parentTheme.templateStrings);
				
				//create the list of constructors that is being used for inheritance
				extend.push(parentTheme.constructor);
			}
			
			//TODO: playing with the prototype works for now - but its really annoying that the instance has no own properties because everything is tied to the prototype
			
			//NOTE: setting the pathName as className is a little cheaty - but helps a lot when debugging!
			var _ForgedTheme = declare(pathName+"Theme",extend);
			
			//we want to inherit templateStrings via prototype
			_ForgedTheme.prototype.templateStrings = lang.mixin(templateStrings, argsObj.templateStrings);
			delete argsObj.templateStrings; //delete templateStrings from args
			
			//mixin the args here to avoid shared references amongst inherited instances 
			//http://dojotoolkit.org/reference-guide/1.9/dojo/_base/declare.html#id6
			lang.extend(_ForgedTheme, argsObj); 
			
			var forgedTheme = new _ForgedTheme;
			themeRegistry.toIndex(["byType",argsObj.type,pathName], forgedTheme);
			themeRegistry.toIndex(["byName",argsObj.name], forgedTheme);
			themeRegistry.toIndex(["byDeclaredClass",pathName], forgedTheme);
			
			return forgedTheme;
		}
	};
	
	return exports;
});