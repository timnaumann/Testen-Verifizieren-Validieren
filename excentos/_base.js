define([
    "dojo",
	"dojo/_base/lang",
	"dojo/_base/array",
	"./version"
],function(dojo, lang, array, version){

var xc = lang.getObject("excentos", true);
xc.version = version;
xc.forIn = function(/*Object*/ obj, /*Function*/ callback, /*Object?*/ scope, /*Boolean?*/ ownOnly){
	//	summary:
	//		Iterates over objects calling a callback function in some scope while
	//		optionally checking for `hasOwnProperty`.
	//
	//	description:
	//		Iterates over objects calling a callback function in some scope.
	//		The standard for(in) pattern, in a syntax matching `dojo.forEach`.
	//		Additionally skips properies that don't pass `hasOwnProperty`.
	//
	//		This is a simplifed version of `dojox.lang.functional.forIn`,
	//		inspired by plugd's function enhanced by the hasOwnProperty check.
	//		See <http://dojo-toolkit.33424.n3.nabble.com/For-in-helpers-tp812651ef33424.html>.
	//
	//	obj: Object
	//		An Object to iterate over.
	//
	//	callback: Function
	//		Called for each item in the Object. Passed the item in the
	//		object, the index of the object (the key), and the object itself.
	//
	//	scope: Object?
	//		An optional scope in which to execute the callback. Defaults to
	//		`null`, aka: `dojo.global` (window). It's a good idea to use `this`
	//		as the scope argument so in the callback function `this` refers to what
	//		it would in a generic for(in) loop.
	//
	//	ownOnly: Boolean?
	//		If true properties that don't pass the `hasOwnProperty` check are skipped.
	//		Defaults to false.
	//
	//	example:
	//		As an object iterator:
	//		|	excentos.forIn({a:"b", c:"d"}, function(item, key){
	//		|		console.log("value is:", item); // b, d
	//		|		console.log("key is", key); // a, c
	//		|	});
	//
	//	example:
	//		Using the scope of the caller and omitting properties from the prototype:
	//		|	var f = function(){
	//		|		this.a = "a";
	//		|		this.b = "b";
	//		|	};
	//		|	f.prototype.c = "c";
	//		|	var o = new f();
	//		|	this.counter = 0;
	//		|	excentos.forIn(o, function(item){
	//		|		this.counter++;
	//		|		console.log(item); // a, b
	//		|	}, this, true);
	//
	//	discussion:
	//		Using excentos.forIn it is not possible to use `break` or `continue`. Also the option
	//		to set a scope, resp. using the global scope by default, is a nice feature but makes
	//		the code more complex if you need `this` anyway compared to just using for(in).
	//
	//		Using
	//		|	for(key in obj){
	//		|		if(obj.hasOwnProperty(key){
	//		|			...
	//		|		}
	//		|	}
	//		is probably often the simpler solution.
	//
	scope = scope || dojo.global;
	ownOnly = ownOnly || false;
	for(var key in obj){
		if(ownOnly && !obj.hasOwnProperty(key)){
			continue;
		}
		callback.call(scope, obj[key], key, obj);
	}
};

xc.propCount = function(/*Object*/ obj, /*Boolean?*/ ownOnly){
	//	summary:
	//		Returns the number of properties of an object.
	//
	//	obj: Object
	//		An object to count the properties of.
	//	ownOnly: Boolean?
	//		If only own and not inherited (from its prototype) properties are counted.
	//		Defaults to false.
	ownOnly = ownOnly || false;
	var counter = 0;
	xc.forIn(obj, function(){
		counter++;
	}, null, ownOnly);
	return counter;
};

xc.exists = function(){
	// summary:
	//		returns existence of a certain object
	
	//NOTE: we cant use dojo.exists as our property names itself contain dots like:
	//	obj["facetgroup.wizard.Wizard"] dojo would try to access obj.facetgroup.wizard.Wizard instead
	var obj = dojo.global;
	var args = arguments;
	var args = Array.prototype.slice.call(arguments);
	for(var i = 0, l=args.length; i < l; i++){
		obj = obj[args[i]];
		if(typeof obj == "undefined"){
			return false;
		}
	}
	return true;
};

xc.inArray = function(a, v){
	return array.indexOf(a, v) > -1;
};

return xc;

});
