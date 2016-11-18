define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"excentos/util",
	"excentos/log",
	"dojo/text!excentos/theme/notemplate.html"
], function(array, declare, util, log, notemplate){
	
var _Templated = declare("excentos.widget._Templated", null, {
	//	summary:
	//		Mixin for templated widgets that enables local templates ("designer view") and specific template
	//		overrides for an app, a theme, and a combination of both.
	
	
	// templateString: String
	//		A html string being the template used for the widget
	templateString: notemplate,
	
	// templateKey: String
	//		A key that refers to a named property within `theme.templateStrings[...]`
	templateKey: "",
	
	// templatePackage: String
	//		defines a more specific set of templates. If you have a complex Widget like Table, 
	//		you dont want to derive from every subclass to just override the templateKey.
	//		Use `templatePackage` instead to allow searching for templates in another place
	templatePackage: "",
	
	postMixInProperties: function(){
		this.templatePackage = this.templatePackage || this.isApiWidget && (this.getConfigItems("templatePackage") || this.getContentItems("templatePackage"));
		this.inherited(arguments);
		
		//	NOTE:
		//		We need to change the templateString-value before `dijit._Widget.create()` (constructor inherited from dijit._Widget).
		//		Therefore we have to override the method stub dijit._Widget.postMixInProperties().
		this.templateString = this.getTemplate(this);
	},
	
	getTemplate: function(){
		//	summary:
		//		Override `templateString` if there's a template registered for the app or theme or both
		//
		//	description: Existence of html template files will not be tested at runtime; a request to a template must always be valid!
		//		That means that a template in question must be added to the `templateStrings` map of the current theme or one of its predecessors.
		//		A `templateStrings` scheme consists of the "relative class path" as key and the html string as value (usually wrapped in dojo.cache call):
		//		ex.1:	templateStrings: { "facet.input.SingleSelect": dojo,cache("xcProject.theme", "themeName/templates/facet/input/SingleSelect") }
		//
		//		The dijits support a `relativeTemplatePath` (relativeTemplatePath: "facet/input/_Input.html") - which can't be trusted blindly (as we don't test for template existence at runtime)
		//		But we can still use it as a fallback strategy feature; the lookup for a template in general works as follows:
		//			First we want to get that relative class path a template is usually registered to (see ex.1) from a theme's templateStrings map:
		//			1. check `templateKey` property
		//			2. check `contentItems.template`
		//			3. check `configItems.template`
		//			4. check `declaredClass` //A widget does not necessarily provide a useful declaredClass in sense of a full qualified class name!
		//
		//				one of the above checks may return a string that can be looked up against the `templateStrings` map
		//				... in case there was no match within the map for the given key
		//					the value of `relativeTemplatePath` (if exists) will be converted to a relative class path and being used as key for `templateStrings`
		//
		//			5. check `declaredClass`
		//	
		//				If that one fails too, then the `templateString` remains unchanged (and likely is the dummy `notemplate` string)
		//
		//			6. check `templateString`
		//
		
		var __DEBUG__ = typeof xcInitial == "object" && !!xcInitial.debug;
		var templateString ="", definedTemplateString = "";
		var theme = util.getCurrentTheme();
		var templatePackage = this.templatePackage;

		if(theme){
			//looks up places where a templateKey could be defined and afterwards checks the definitions from a theme instance's `templateStrings` property
			//	Example:
			//		find a template for Widget of type "recommendation.Recommendations" (remember it just looks up keys defined within a theme's `templateStrings` property)
			//
			//		widget[ prop ]					|	theme.templateStrings[ prop ]
			//		-----------------------------------------------------------------------
			//(if `templatePackage` defined)
			//		templateKey
			//											"app_name.templatePackageName.myPackageName." + templateKey
			//											" 		  templatePackageName.myPackageName." + templateKey
			//		contentItems.template
			//											"app_name.templatePackageName.myPackageName." + contentItems.template
			//											" 		  templatePackageName.myPackageName." + contentItems.template
			//		configItems.template
			//											"app_name.templatePackageName.myPackageName." + configItems.template
			//											" 		  templatePackageName.myPackageName." + configItems.template
			//		declaredClass
			//											"app_name.templatePackageName.myPackageName." + declaredClass
			//											" 		  templatePackageName.myPackageName." + declaredClass
			//		relativeTemplatePath
			//											"app_name.templatePackageName.myPackageName." + relativeTemplatePath
			//											" 		  templatePackageName.myPackageName." + relativeTemplatePath
			//(next run)
			//		templateKey
			//											"app_name." + templateKey
			//														  templateKey
			//		contentItems.template
			//											"app_name." + contentItems.template
			//														  contentItems.template
			//		configItems.template
			//											"app_name." + configItems.template
			//														  configItems.template
			//		declaredClass
			//											"app_name." + declaredClass
			//														  declaredClass
			//		relativeTemplatePath
			//											"app_name." + relativeTemplatePath
			//														  relativeTemplatePath
			//(fallback)
			//		templateString
			//
			//(failover)
			//		excentos/theme/notemplate.html



			/******************* CREATE LOOKUP LIST *******************/
			//lucas@excentos.com: I decided to place emphasis on debugging here until we have proper tools for this
			var Lookup = function(name, key){
				var appNamePrefix = xcInitial.masterApplicationName+".";
				var appSpecificTemplateString = theme.templateStrings[appNamePrefix+key];

				var templateString = appSpecificTemplateString || theme.templateStrings[key];
				return {name:name, key:key, templateString:templateString};
			};

			var lookupList = [
				Lookup("templateKey",			this.templateKey),
				Lookup("contentItems.template",	this.isApiWidget && this.getContentItems("template")),
				Lookup("configItems.template",	this.isApiWidget && this.getConfigItems("template")),
				Lookup("declaredClass",			this.declaredClass.substr(this.declaredClass.indexOf(".widget.") + 8)),// Class name starting after "*.widget.".
				Lookup("relativeTemplatePath",	this.relativeTemplatePath && this.relativeTemplatePath.replace(/\//g,".").replace(".html", ""))
			];
			if(templatePackage){
				var templatePackageLookupList = array.map(lookupList, function(lookup){
					return Lookup("templatePackage."+lookup.name, templatePackage+"."+lookup.key);
				});
				lookupList = [].concat(templatePackageLookupList,lookupList);
			}

			var templateStringFallBackLookup = Lookup("templateString", "");
			templateStringFallBackLookup.templateString = this.templateString;

			lookupList.push(templateStringFallBackLookup);
			/******************* CREATE LOOKUP LIST *******************/



			/******************* ITERATE LOOKUP LIST *******************/
			var _loggroupname = "search TEMPLATE for "+this.declaredClass;
			__DEBUG__ && LogQueue.add2("groupCollapsed",_loggroupname);

			var matchedLookupName="", matchedLookupValue, NOTEMPLATE_DEBUG=["CHECKED DEFINITIONS for "+this.declaredClass+"\n"];
			//iterate over lookups and add message to the LogQueue
			for(var i=0,l=lookupList.length; i<l; ++i){
				var lookup = lookupList[i];

				if(__DEBUG__){

					var lname = lookup.name, lkey = lookup.key; lkey = lkey && "'"+lkey+"'";
					NOTEMPLATE_DEBUG.push(lname + ": " + lkey + "");

					var msg = (lookup.templateString ? "FOUND" : "CHECK")+" `" + lname +"`: "+lkey;
					LogQueue.add(msg);
				}
				
				//the loop will be ended instantly when a templateString was found
				if(definedTemplateString=lookup.templateString){
					matchedLookupName = lookup.name;
					matchedLookupValue = lookup.key;
					break;
				}
			}

			if(__DEBUG__){
				LogQueue.add("\n" + definedTemplateString);
				LogQueue.add2("groupEnd", _loggroupname);

				//if the combination of `this.declaredClass` and `matchedLookupName` (see `lookupList`) was used for the first time
				// (wasn't already present in the cache) then output the log queue.
				LogCache.add(this.declaredClass, matchedLookupName, matchedLookupValue) ? LogQueue.log() : LogQueue.dismiss();
			}
			/******************* ITERATE LOOKUP LIST *******************/

			//DEBUG purpose
			this.templateDefinition = lookup;
		}
		
		if(!definedTemplateString || definedTemplateString == notemplate) {
			this.NOTEMPLATE_DEBUG_STRING = NOTEMPLATE_DEBUG.join("\n"); //template variable used in excentos/theme/notemplate.html
			console.info("`"+this.declaredClass+"` has no template defined in theme `"+theme.path+"`");
		}
		
		return definedTemplateString;
	}
});

var LogCache = (function(){
	var cache = {};
	return {
		add: function(declaredClass,identifier,value){
			var key = declaredClass+":"+identifier+"@"+value;
			return cache[key] ? false : cache[key] = true;
		}
	};
})();
var LogQueue = (function(){
	var queue = [];
	return {
        add: function(msg){queue.push(msg);},
        add2: function(logType, msg){queue.push({type:logType, message:msg});},
		log: function(){
			for(var i=0, l=queue.length; i<l; ++i){
                var cmd = queue[i];
                switch(Object.prototype.toString.call(cmd)){
                    case "[object Object]":
                        log[cmd.type]("template", cmd.message)
                        break;
                    default:
                        log("template", cmd);
                }
			}
			this.dismiss();
		},
		dismiss: function(){queue=[];}
	};
})();

return _Templated;

});
