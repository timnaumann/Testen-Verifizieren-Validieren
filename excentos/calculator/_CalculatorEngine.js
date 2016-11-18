define([
   	"dojo/_base/declare",
   	"dojo/_base/lang",
   	"dojo/json",
   	"excentos/util",
	"excentos/calculator/Field" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, lang, JSON, util, Field){

return declare("excentos.calculator._CalculatorEngine", null, {

	// PARAMETERS 
	
	// my name
	name: "unnamedCalculator",
	
	// my parent context
	p: null,

	// a mapping of field names (in me) that should instead me set as references to 
	// fields in my parent object (effectively "connecting" me to my parent at these points)
	// TODO hinterfragen, was das ist
	parentFieldMap: null,
	
	// a label for outside:
	label: "unnamed Calculator",
	
	// some default config:
	forceFieldValueDisplayUpdate: true,
	
	// will be overridden in constructor
	type: "_calculator",

	// END PARAMETERS
	
	subcalcs: null,

	// map of fields
	f: null,
		
	fldposprefix : "",
	
	constructor: function(paramObj){
		// console.debug("in _CalculatorEngine.js constructor()");
		
		this.parentFieldMap = {};
		this.subcalcs = {};
		this.f = {};
		if (typeof paramObj == "object") {
			lang.mixin(this, paramObj);
		}
				
		// introspection: get my own type
		this.type = /^excentos\.calculator\.(\w*)/.exec(this.declaredClass)[1];
		
		// shortcut for use in widget templates that are based on this.
		// e.g. xc_input_outputcalc_wkpdevice.
		this.fldposprefix = "xc_input_" + this.name.replace(/\./, "_") + ".";
		
		// I register myself in the global scope if I have no parent.
		// this is helpful for reliable adressing in widgets that display values
		if(this.p === null && typeof window[this.name] == "undefined"){
			window[this.name] = this;	
		}
		// now the actual calculator instance stuff:
		this.init();

	},

	debug: function(fieldName, extended){
		var fld = this.f[fieldName];
		if(fld){
			var matchFieldRegEx = /this\.(\w+)/g,
				objStr = JSON.stringify({aliasName:fld.aliasName, name:fld.name, val:fld.val}).replace(/\"/g,"").replace(/,/g,",\t"),
				label = fieldName + " " + objStr,
				calcString = fld._calc+"",
				match = null;

			fld._calc ? console.groupCollapsed(label) : extended  && console.log(label);

			var self = this;
			var debugCalcString = calcString.replace(matchFieldRegEx, function(matchStr, matchedField){
				return  "(" + matchStr + " = " + ((self.f[matchedField].val || 0)*1) + ")" ;
			});
			fld._calc && console.log(debugCalcString);

			while(match = matchFieldRegEx.exec(calcString)){
				arguments.callee.call(this, match[1], extended);
			}

			fld._calc && console.groupEnd(label);
		}
	},
	
	// to be overridden by classes built upon this one
	// typically the fields & application logic are built here
	init: function(){},
	
	// convenient check, never touched again
	isCalculator : true,
	
	/*
	 * creates a new field. 
	 * arg2 and arg3 can be optionally and arbitrarily used for the calc function and the initial value
	 * TODO a parameter for arbitrary recalc events
	 * TODO something's still wrong with the scoping of the p and g arrays
	 */

	fld: function(fldName, value){

		var arity = arguments.length, fld;
		switch(arity){
			case 2:
				// [fldName, value], [fldName, reference]
				(/number|function/).test(typeof value) ?
					this._makeFieldByName(fldName, value) :
					this._makeFieldByReference(fldName, value);
				break;
			case 3:
				// [fldName, alias, value], [fldName, alias, reference]
					var alias = arguments[1]; fldName = arguments[0]; value = arguments[2];
					(/number|function/).test(typeof value) ?
						this._makeFieldByAlias(fldName, alias, value) :
						this._makeFieldByAliasReference(fldName, alias, value);
				break;
			default:
				throw new Error("insufficient arguments")
		}
	},

	//clarify interface
	_makeFieldByName: function(/*String*/ fldName, /*Number*/ value){
		return this._makeField(fldName, fldName, value);
	},

	_makeFieldByReference: function(/*String*/ fldName, /*String|Object*/ reference){
		var referenceName = reference instanceof Field ? reference.name : reference;
		var ref = this.f[referenceName];

		!ref && console.warn(this.declaredClass+"::"+arguments.callee.nom+"("+[].slice.call(arguments)+") couldnt create a field reference as of `" + referenceName +"` was not found");
		return ref && (this[fldName] = this.f[fldName] = ref);
	},

	_makeFieldByAlias: function(/*String*/ fldName, /*String*/ aliasName,  /*Number*/ value){
		return this._makeField(fldName, aliasName, value);
	},

	_makeFieldByAliasReference: function(/*String*/ fldName, /*String*/ aliasName,  /*String|Object*/ reference){
		return this._makeFieldByReference(fldName, reference) && this._makeFieldByReference(aliasName, reference);
	},

	_makeField: function(/*String*/ fldName, /*String*/ aliasName, /*Number*/ value){

		var _calc = typeof value == "function" ? value : undefined;
		var initialValue = typeof value != "function" ? value : undefined;

		var params = {
			aliasName: aliasName,
			name: fldName,
			calculator: this,
			prefix: this.name,
			_calc: _calc,
			initialValue: initialValue
		};

		// check if name is still free
		if (this.f[fldName] || this[fldName]){
			console.warn("duplicate field name in calculator "+ this.name +": " + fldName);
			return false;
		}

		var newField = this.parentFieldMap[fldName] || new (util.$("calculator.Field"))(params);
		// zusätzlich noch die extrakurze variante, die dem ID-Vergabeschema entspricht:
		this[fldName] = this.f[fldName] = newField;

		aliasName && (this[aliasName] = this.f[aliasName] = newField);

		return newField;
	},
	
	makeNewCalculator: function(type, subName, fieldMap){
		// type must be a constructor object, not just the type string! 
		// check if name is still free
		if (typeof this[subName] !== "undefined"){
			 console.warn("you seem to try to instantiate a duplicate calculator name: " + subName );
			 return false;
		}
		if (!type.prototype.isCalculator){
			 console.warn("you can only instantiate _calculator's with makeCalculator");
			 return false;			
		}
		var fullName = this.name + "." + subName;
		var _params = {
			p:this, 
			name: fullName,
			parentFieldMap : fieldMap
		};
		var newCalc = new type(_params);
		// enforce naming and object tree convention.
		this[subName] = newCalc;

		// TODO there's a scoping error here: the subcalculators are in the subcalculator's subcalcs, too
		// -> endless loop! 	
		this.subcalcs[subName] = newCalc;
	},
	
	// serializers / exporters for exporting the calculator state (e.g. to the server):
	// zum testen in der konsole auch nachtraglich einbringbar via: excentos.calculators.output.extend({ ...
	
	getJson: function(){
		return JSON.stringify(this.getObject());
	},
	
	getObject: function(){
		return this._getObjectForCalculator(this);
	},
	
	_getObjectForCalculator: function(c){
		var o = {};
		o.name = c.name;
		o.type = c.type;
		o.label = c.label;
		o.fieldItems = [];
		for (var fn in c.f){
			var fld = c.f[fn];				
			var fo = {};
			o.fieldItems.push(fo);
			fo.name = fld.name;
			// Use same type for values in client and server implementation (necessary to solve jabsorb caching problems).
			// As we agreed to String, we have to ensure that fo.value (which will be set on the server) is of the type String.
			fo.value = "";
			if(fld.val !== null){
				fo.value = fld.val.toString();
			}
			fo.set = fld.isSet;
			fo.active = fld.isActive;
			if(fld.formattedValue === "" && fld.val !== null){
				fo.formattedValue = fld.val.toString();
			}else{
				fo.formattedValue = fld.formattedValue;
			}
		}
		o.calculatorItems = [];
		for (var subcname in c.subcalcs){
			var subc = c.subcalcs[subcname];
			if (typeof subc.isCalculator !== "undefined" && subc.isCalculator) {
				o.calculatorItems.push(this._getObjectForCalculator(subc));
			}
		}
		return o;
	},
	 
	// an XML serializer to send data to the server for further processing (e.g. document generation)
	getXMLSerialization: function(){
		var x = this.xmlfrags;
		// using the array join technique for fast string building:
		var out = new Array();
		out.push(x.xml_prefix, x.api_open, x.calcs_open);
		// initiate recursion with "this":
		out.push(this._getXMLForCalculator(this));
		out.push(x.calcs_close, x.api_close);
		// build the string and return
		return out.join("");
	},
	_getXMLForCalculator: function(c){
		var x = this.xmlfrags;
		var out = new Array;
		out.push(x.calc_open, 
			x.calc_name, c.name, 
			x.calc_type, c.type, 
			x.calc_label, c.label,	
			x.calc_post);
		out.push(x.flds_open);
		for (var fn in c.f){
			var fld = c.f[fn];	
			out.push(x.fld_open, 
				x.fld_name, fld.name, 
				x.fld_val, fld.val, 
				x.fld_stringval, fld.formattedValue,
				x.fld_isset, fld.isSet, 
				x.fld_isactive, fld.isActive, 
				x.fld_post);			
		}
		out.push(x.flds_close);
		out.push(x.calcs_open);
		for(var subcname in c.subcalcs){
			var subc = c.subcalcs[subcname];
			if (typeof subc.isCalculator !== "undefined" && subc.isCalculator) {
				out.push(this._getXMLForCalculator(subc));
			}
		}
		out.push(x.calcs_close);	
		out.push(x.calc_close);
		return out.join("");
	},
	// some re-usable xml fragments;
	// TODO Diese XML-Struktur müsste für die API 2.0 gemacht sein und nicht für die 2.1
	// TODO könnte aber nicht mehr relevant sein weil wir ohnehin nur die JSON-Variante oben verwenden.
	xmlfrags : {
		xml_prefix : "<?xml version='1.0' ?>\n",
		api_open : "<payloadResponse>\n",
		api_close : "</payloadResponse>\n",
		
		calcs_open : "<calculatorItems>\n",
		calcs_close : "</calculatorItems>\n",
	
		calc_open : "\t<calculator ",
		calc_name : " name='",
		calc_type : "' type='",
		calc_label : "' label='", 
		calc_post : "'>\n",
		calc_close : "\t</calculator>\n",
			 
		flds_open : "\t\t<fieldItems>\n",
		flds_close : "\t\t</fieldItems>\n",
		 
		fld_open : "\t\t\t<field ",
		fld_name : " name='",
		fld_val : "' val='",
		fld_stringval : "' stringval='", 
		fld_isset : "' set='", 
		fld_isactive : "' active='",
		fld_post : "' />\n"
	}	
	
});

});

