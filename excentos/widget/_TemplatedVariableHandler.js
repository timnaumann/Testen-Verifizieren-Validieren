define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_TemplateFormatter",
	"excentos/log",
	"excentos/util"
], function(declare, lang, _TemplateFormatter, log, util){

	var xcTemplateVariableRegex = /\%\{([a-z0-9\.]+)(?:\:([a-z0-9\.]+)(?:\((.*)\))?)?/g;  //matches %{variable:formatter(arg1:val1,arg2:val2)} //just an idea for reference
	var xcTemplateVariableRegex = /\%\{([^\s\:\}\$]+)(?:(\$[^\s\:]+))?(?:\:([^\s\:\}]+))?\}/g; //matches %{variable$arg1=val1&arg=val2:formatter}
	var xcTypeDataRegex = /\bdata-xc-type\=["']?([\.a-z0-9_]+)["']?/gi;
	/**
	 * _TemplatedVariableHandler
	 * Mixin Class for Templated Widgets that provides custom Template manipulations
	 */
	return declare("excentos.widget._TemplatedVariableHandler",null,{
		
		
		useTemplateVariableRegex: xcTemplateVariableRegex,
		useTypeRegex: xcTypeDataRegex,
		templateContext: null,
		format: _TemplateFormatter,
		
		//override dijit._TemplatedMixin; in case the template only uses %{var} instead of ${var}, the template would be cached as dom and the variabales inside that templates would not be replaced.
		_skipNodeCache: true, 
		
		constructor: function(){
			this.templateContext = this;
		},
				
		postMixInProperties: function(){
			this.inherited(arguments);
			//store the context safe templateReplace function call once(!)
			this._boundTemplateReplacer = lang.hitch(this, this.templateVariableReplaceFunction);
			this._boundTypeReplacer = lang.hitch(this, this.templateTypeReplaceFunction);
		},
		
		_stringRepl: function(tmpl){
			// summary: override / extend _TemplatedMixin::_stringRepl
			
			//NOTE: our extra parsing just adds about 30ms (overall!) computation time
			if(~tmpl.indexOf("%{")){
				//run our stuff, override arguments in non strict-mode
				tmpl = tmpl.replace(this.useTemplateVariableRegex, this._boundTemplateReplacer);
			}
			
			if(this.useTypeRegex.test(tmpl)){
				tmpl = tmpl.replace(this.useTypeRegex, this._boundTypeReplacer);
			}
			
			if(~tmpl.indexOf("${")){
				//run dojo _TemplatedMixin
				tmpl = this.inherited(arguments);
			}

			if(/\bdata-dojo-type\b/.test(tmpl) && !this.widgetsInTemplate){
				console.warn("(",this.id,")",this.declaredClass," found potential widget in markup but `widgetsInTemplate` is set to false");
			}
			return tmpl;
		},
		
		templateTypeReplaceFunction: function(matchStr, type, index, string){
			var ctor = util.$(type), cls = ctor && ctor.prototype && ctor.prototype.declaredClass, result="";
			if(cls){
				result = " data-dojo-type=\""+cls+"\"";
			}else {
				console.warn(this.declaredClass+" has an invalid widget in template of type '"+type+"' (`declaredClass` is '"+cls+"')");
			}
			return matchStr+result;
		},
		
		templateVariableReplaceFunction: function(matchStr, key, paramString, formatName, index, string){
			// summary: custom replace function that is called on every found key in a template
			//			returns a "safe" value (non-values will be "" or the key itself)
			
			var marked = key.charAt(0)=="!";
			var objPath = marked ? key.substring(1) : key;
			//flag if the key should not be looked up in `templateContext` scope
			var isGlobal = objPath.indexOf("window.")==0;
			var value;

			isGlobal && (objPath=objPath.substring(7)); //strip "window.", length is 7 chars
			
			//NOTE: may be useless as `%{this}` will convert to `this.toString()`
			if(key == "this"){
				value = this;
			}else {
				value = isGlobal ?  
					lang.getObject(objPath, false) :  
					lang.getObject(objPath, false, this.templateContext);
			}
				
			//if a format was specified check if the required formatter exists and execute it
			if(formatName && typeof this.format[formatName] == "function"){
				value = this.format[formatName](value, key, paramString, this);
			}
			
			value == undefined && log.warn("template", "Template key `"+key+"` is not defined in "+this.id+" ("+this.declaredClass+")");
			
			//if a key is marked eg. ´%{!myVar}´ return the key itself in case it is not defined
			return marked ? 
				this.format.debug(value, objPath) : 
				this.format.safe(value, objPath);
		}
		
	});
});



