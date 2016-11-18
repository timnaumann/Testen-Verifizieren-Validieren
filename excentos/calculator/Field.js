define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/_base/array",
	"excentos/util"
], function(declare,lang, connect, array, util){

return declare("excentos.calculator.Field", null, {
	
	// BEGIN PARAMETERS
	
	// you MUST set the field name when instantiating!
	name: null,	
	// the parent context object via which calc can access the other fields 
	calculator: null,
	// event name prefix of the parent context
	prefix : null,
	// self-explanatory? (array of string ids of published events)
	recalcEvents: [],
	// self-explanatory 
	initialValue: null,

	// TODO eine rangeFrom / rangeTo wäre sicher hilfreich
	// (v.a. für die inputs, evtl. auch für die validierung der ergebnisse).

	// END PARAMETERS

	// UPDATE: we need to switch to direct access because of IE performance issues! 
	// can be any type, depending on the usage of the field - typically number or string
	// _currentValue : null,
	val: null,
	
	// an identifier whether the current value has been calculated or overridden
	// you have to set(null) to unset the overridden value an recalculate
	isSet: false,

	// a shortcut to the fields an their getter map of the calculator context (for calc() )
	//g: {},
	//f: {},
	
	// an ID - is used for dom nodes, event names etc.
	id: null,
	// a place for a gui widget and the fieldViews
	widget: null,
	
	fieldValueDisplays: null,
	
	// a place where display widgets can write the "last formatted String value"
	// (there are multiple displays of the value, but the last may be the best approximation?)
	formattedValue: "",
	
	// automatically generated list of fields I am looking at to calculate myself
	dependsFields: null,

	// just to make the type check unambiguous
	isField : true,
	
	// constructor sets true if _calc is given
	isActive : false,

	constructor: function(paramObj){
		// the almighty mixin!
		if(typeof paramObj == "object"){ 
			dojo.mixin(this, paramObj); 
		}
		// determine active vs. inactive
		// TODO besser == "function" ?
		if (typeof paramObj._calc !== "undefined"){
			this.isActive = true;
		}
		
		if (! this.name){ 
			throw "you must give each field a name!";
		}
		if (! this.prefix){
			throw "you must give the field a context prefix!";
		}
		
		this.fieldValueDisplays = [];
		this.dependsFields = [];
		this._dependsFieldsConnections = [];

		// build the shortcuts to other things ("emulate" the relevant scope of the parent calculator)

		this.id = this.prefix + "." + this.name;
		this.isExample = false;
		//if (this.id == "outputcalc.usr_netHourlyWorkingCost") this.isExample = true;
		
		this.c = this.calculator;
		// this.g = this.calculator.g;
		// this.f = this.calculator.f;
		// TODO wozu war das eigentlich nochmal? benutzen wir das irgendwo?
 		lang.mixin(this, this.calculator.subcalcs);

		this.updateDependsFields();

		// in addition, subscribe to arbitrary other published events for 
		// recalculating that are given as parameters.
		for (var i = 0; i < this.recalcEvents.length; i++){
			connect.subscribe(this.recalcEvents[i], this, this.calc);
		}
		// initialize
		if (this.isActive) { this.calc();}
		//not undefined / null
		if (this.initialValue != undefined) {
			this._doSet(this.initialValue);
			// initialValues aren't "set" in the strict sense of the word
			// DON'T: this.isSet = true;
		}
	},

	refresh: function(){
		this.updateDependsFields();
		this.calc();
	},

	updateDependsFields: function(){

		// connect recalc when one of my dependent fields has changed
		// (via _calc function introspection)
		if(this.isActive){
			var d = this._dependsFieldsConnections, i = d.length;
			while(i-->0){d[i]&& d[i].remove();}

			this._dependsFieldsConnections = [];
			this.dependsFields = [];

			this._updateDirectDependsFields();
			for (var i = 0; i < this.dependsFields.length; i++){
				connect.connect(this.dependsFields[i], "newValue", this, "calc");
			}
		}
	},
	
	// important Function!! :
	// introspects the _calc function source code for field references and returns the field objects
	_updateDirectDependsFields: function(){
		// toSource() wäre klarer, geht in IE aber nicht in diesem Kontext 
		// toSource geht in Safari und Opera auch nicht, von daher muss toString() es tun.		 
		// http://aptana.com/reference/html/api/Function.html
		// die indirektion über den prototype ist nur "sicherheitshalber", falls jemand rumgefummelt hat
		var calcSrc = Function.prototype.toString.apply(this._calc);
		
		var fieldReferenceRegex = /this\.(\w+)\.(\w+).val/g ;		
		var fieldReferenceRegex = /this\.?(\w+)?\.(\w+)(?:\.val)?/g;
		// das g am ende heisst global, also alle fundstellen
		// note: um teiltreffer in klammern zu bekommen in allen browsern, muss man mit der
		// "exec()" funktion der regex arbeiten. match() geht nicht in allen UA mit teiltreffern
		
		var fields = new Array();
		// better don't touch this one:
		var match, field=null; 
		while ((match = fieldReferenceRegex.exec(calcSrc))) {
			//if (this.isExample) console.debug("match: ");
			//if (this.isExample) console.dir(match);
			var calcname = match[1] || "c";
			var fieldname = match[2];
			var calc = this[calcname];
			if(calc && calc.isCalculator)
				field = this[calcname][fieldname];
				if (field && field.isField){
					fields.push(field);
				}								
		}
		this.dependsFields = util.uniqueArray(fields);
		
		return this.dependsFields;  // array of field object references   
	},

	// this is typically overridden if field is a formula cell
	// never call this directly, it usually throws errors that need to be caught systematically
	_calc: function(){
		// nothing... I'm application specific
	},

	// recalculates the value of the cell.	
	calc: function(){
		//console.debug("called calc() on " + this.name);
		if(this.isActive){
			//try{
				var calcVal = this._calc.call(this.c, this);
				
			//}catch(e){
				// something's gone wrong in the calculation (e.g. incompatible types)
				// so we "unset"
			//	var calcVal = null;			
			//}
			if(typeof calcVal === "number" 
				// numerical errors don't throw an error in _calc, but mean "unset", too:
				//&& (isNaN(calcVal) || !isFinite(calcVal)) ){  // doppeltgemoppelt, oder?
				&& !isFinite(calcVal)){
				calcVal = null;
			}
			this._doSet(calcVal);
			return calcVal;					
		}
	},
	
	// DEPRECATED, use direct value access now due to IE performance reasons
	/*get: function(){
		console.warn("deprecated get() access on " + this.name);
		return this.val;		
	},*/
	
	// this is meant to be used if external entities set a value, not other functions 
	// of the field!   value=null means unset()
	set: function(value){
		// if(this.name=="purchasePrice") alert("purchase Price set");
		if(value === null){
			if(this.isActive){
				this.calc();
			}else{
				this._doSet(value*1);
			}
			this.isSet = false;
		}else{
			this._doSet(value*1);
			this.isSet = true;
		}
		return this.val;
	},
	
	// that's the private one:
	_doSet: function(value){
		value = isNaN(value) ? 0 : value;
		// TODO hier müsste man zwangsweise sinnvoll (d.h. besser als der js-standard) auf eine Float casten.  VORSCHLAG:
		// rounding takes place at the display widget, so we don't care about integers here.
		// null doesn't even have the "toString()" function, so we catch that.
		// if (this.val !== null) this.val = this.val.toString().replace(/,/g, ".").parseFloat(10);
		// TODO: Sollte man vorher prüfen, dass type entweder null, undefined, number oder string sein muss? (kein object, kein array?)
		if(this.val != value){
			this.val = value;
			// we provide both methods of connecting to this event:
			// don' you ever move this before the setting of val
			this.newValue(value);
			connect.publish(this.id + ".newValue", [value]);
		}
		return this.val;		
	},
	// just an event to connect to. 
	newValue: function(newValue){
//		console.debug("newValue on " + this.id + " : " + newValue);
	},
	
	valueOf: function(){
		return this.val*1;
	},

	debug: function(){
		this.calculator.debug(this.name, 1);
	},
	
	toString: function(){
		return "[object Field {name:"+this.name+"}]";
	}
	
});

});





