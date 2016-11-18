define([
	"./util/requestanimationframe",
	"dojo/aspect",
	"dojo/dom-style",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/json",
	"dojo/cookie",
	"dojo/Deferred",
	"dojo/request",
	"dojo/html",
	"dojo/query",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-class",
	"dojo/dom-geometry",
	"dojox/fx/scroll",
	"dojo/fx/easing",
	"./shared",
	"./widget/registry",
	"./theme/registry",
	"./log",
	"./dom-geometry",
	"./dom-construct.patch" /*NMD:Ignore*/ /*implicit module declaration*/
],function(requestanimationframe, aspect, domStyle, lang, array, json, cookie, Deferred, request, html, query, dom, domConstruct, domClass, domGeometry, fxScroll, easing, shared, widgetRegistry, themeRegistry, log, xcDomGeometry, domConstructPatch){

var util = {}; //initialize as object to allow IDEs to recognize `util` as export module, because return type of `lang.getObject` is not being discovered as being Object
	util = lang.getObject("excentos.util", true);

util.extendClass = function(/*prototype*/ target, /*Object*/extend){};
(function(){
	var _extend = function(target, methodName, extend){
		var _super = target[methodName];

		if(typeof _super === "function"){
			target[methodName] = function(){
				_super.apply(this, arguments);
				extend.apply(this, arguments);
			}
		}else {
			lang.mixin(_super, extend);
		}

	};
	var extend = function(/*Class*/ target, /*Object*/extend){
		var target = target.prototype || target;
		for(var prop in extend){
			if(target.hasOwnProperty(prop)){
				_extend(target, prop, extend[prop]);
			}
		}
	};
	util.extendClass = extend;
})();

util.uniqueArray = function(notunique) {
	// summary: Helper. Return new array with duplicate values removed.
	// NK: Verhalten hier ist eher ein Set als ein Array, daher nicht in dojo zu finden als Arrayfunktion.
	var a = [];
	var l = notunique.length;
	for(var i=0; i<l; i++) {
		for(var j=i+1; j<l; j++){
			// If this[i] is found later in the array-
			if(notunique[i] === notunique[j]){
				j = ++i;
			}
		}
		a.push(notunique[i]);
	}
	return a;
};

var globalDotOrSpaceRegex = /\.| /g;
util.generateCssId = function(/*Array*/ components, /*String?*/ prefix){
	// generates a css id & class capable string from a list of components.
	return "xc_" + (prefix ? prefix + "_" : "") + components.join("-").replace(globalDotOrSpaceRegex, "-");
};

util.generateCssIdFromName = function(name, components, prefix){
	//	summary:
	//		Generate a CSS id by removing "xcAjaxClient" from a name by default.
	//
	//	ex:
	//	|	generateCssIdFromName("xcAjaxClient.wizard.Phase2.advisor_topics","facetgroup") => "xc_facetgroup_wizard-Phase2-advisor_topics"
	components = components || [];
	if(typeof components == "string"){
		prefix = components;
		components = [];
	}
	return util.generateCssId([name.replace("xcAjaxClient.","")].concat(components),prefix);
};

util.toggleClasses = function(node, classStates, prefixes){
	//	summary:
	//		Toggles a map of class names on a node and lets us pass our server "Vars" objects.
	//	node: DOMNode
	//	classStates: Object
	//		An object like `{classname: boolean, ...}` that defines which class names
	//		should be removed / added to the node.
	//	prefixes: Array
	//		An array of prefix strings. For each prefix one class is set / removed
	//		followed by the class name from `classStates` in lower case. Defaults to `["xc_"]`.
	classStates = classStates || {};
	prefixes = prefixes || ["xc_"];
	// Prepare an "inverted map" to collect added classs and removed classes in separate arrays.
	var classesToAdd = [];
	var classesToRemove = [];
	for(var className in classStates){
		var list = classStates[className] ? classesToAdd : classesToRemove;
		for(var i=0, l=prefixes.length; i<l; ++i){
			list.push( (prefixes[i] + className).toLowerCase());
		}
	}
	domClass.replace(node, classesToAdd, classesToRemove);
};

util.place = function(node, ref, pos){
	// summary:
	//		dojo.place uses node.childNodes instead of node.children
	//		childNodes takes textnodes in account resulting in misleading position indexes

	 if(typeof pos == "number"){ // inline'd type check
		 var cn = ref.children;
		 if(!cn.length || cn.length <= pos){
			 ref.appendChild(node);
		 }else{
			 cn = cn[pos < 0 ? 0 : pos];
			 cn.parentNode && cn.parentNode.insertBefore(node, cn);
		 }
	 }else {
		 domConstruct.place(node, ref, pos);
	 }
};

util.delay = function(/*Function*/ func, /*Number?*/ ms){
	// summary:
	//  delays a function execution via global `util.interval` timer
	// func:
	//	Function call that should be delayed
	// ms:
	//  define how many milliseconds you want to delay execution of `func`

	ms = ms || 0;
	var ticks = Math.ceil(ms/util.interval._data.time);
	var handler = util.interval(function(){
		if(ticks-- <= 0){
			handler.remove();
			func();
		}
	});
	return handler;
};

util.interval = function(/*Function*/ func){
	var data = arguments.callee._data;
	var index = data.q.length;

	var handle = {callback: func, remove: lang.hitch(data, "remove", index)};
	data.q.push(handle);

	if(!data.id){
		data.id = setInterval(data.execQueueRequest, data.time);
	}

	return handle;
};
	util.interval._data = {q:[], id:0, time:25, execQueue: function(){
		var data = util.interval._data;
		for(var i = 0, l = data.q.length; i<l; ++i){
			var f = data.q[i];
			f && f.callback && f.callback();
		}
	}, remove: function(index){
		var data = util.interval._data;
		delete data.q[index];
		//clear interval if array is empty
		if(!data.q.join("")){
			data.q.length = 0;
			clearInterval(data.id);
			data.id = 0;
		}
	}, execQueueRequest: function(){
		var data = util.interval._data;
		return util.requestAnimationFrame(data.execQueue);
	}};

util.promiseResult =
util.poll = function(/*function*/ resolveFunc, /*function?*/ failFunc){
	// summary:
	//	Continously polls `resolveFunc` until it returns a truthy value
	//  Via `failFunc` one can define when this thing gets cancelled - or use `cancel()` on the returned promise
	// returns: dojo/Deferred

	var deferred = new Deferred();
		//add a default handler to avoid errors being generated by deferred instrumentation
		deferred.then(arguments.callee.callback, arguments.callee.errback);

	var checkResult = function(){
		var result = resolveFunc && resolveFunc();
		if(result){
			deferred.resolve(result);
			return true;
		}
	};
	var checkFailed = function(){
		var result = failFunc && failFunc();
		if(result != undefined){
			deferred.reject(new Error("excentos.util::promiseResult(): fail condition met; `checkFailed` returned "+result));
			return true;
		}
	};

	//condition for `resolve` already met ...
	if(!checkResult()){

		//check the fail condition ...
		if(!checkFailed()){

			//it also did not fail; add the continuous check
			var handle = util.interval(function(){
				//stop the interval if ...
				// - the deferred got somehow fulfilled somewhere else
				// - we got a result
				// - we met the fail condition
				if(deferred.isFulfilled() || checkResult() || checkFailed()){
					handle.remove();
				}
			});
		}
	}

	return deferred //  dojo/Deferred;
};
	util.poll.callback = function(){};
	util.poll.errback = function(msg){log("util","promiseResult rejected",msg)};

util.objectIsEmpty = function(/*Object|Array*/ obj, /*Boolean*/ ownProps){
	// summary:
	//		checks if an object is empty (consists of only of undefineds|nulls or has no properties)
	// obj:
	//		Any object you want to check for emptiness
	// ownProps:
	//		Set ´ownProps´ to true if you want to ignore inherited properties
	//		via prototype chain.
	// ex:
	//		empty:
	//			new Array(50)
	//			[,,,]
	//			[undefined, null]
	//			[[[[null],undefined]]]
	//			{a:[undefined,{b:{c:{}}}]}
	//			new (function(){this.name = null; this.data=null});
	//		non-empty:
	//			[,,,false]
	//			[undefined, 0]
	//			[[[[null],undefined,false]]]
	//			{a:[undefined,{b:{c:1}}]}
	//			new (function(){this.name = ""; this.data=null});

	var empty = true;
	var value;
	// REFERENCES: Array
	//		is a hidden third parameter that holds already checked Objects
	//		to avoid endless loops in circular references.
	//		´REFERENCES´ gets passed recursively on each Object detection
	var REFERENCES = arguments[2] || [];

	// isKnownReference: function
	var isKnownReference = function(obj){
		// summary:
		//		checks if the passed ´obj´ is already stored in ´REFERENCES´,
		// returns:
		//		returning true if ´obj´ is known - and false if not.
		//		In the latter case ´obj´ gets added to ´REFERENCES´

		var i = REFERENCES.length;
		while(i--){
			if(obj === REFERENCES[i]){
				return true;
			}
		}
		REFERENCES.push(obj);
		return false;
	};

	for(var prop in obj){
		value = obj[prop];
		//fails when ´ownProp´ is set to true and the current ´prop´ is inherited via prototype chain
		if(!(ownProps && !obj.hasOwnProperty(prop))){
			empty = false;

			if(typeof value=="object"){
				if(value === null){
					empty = true;
					continue;
				}
				if(!isKnownReference(value)){
					empty = this.objectIsEmpty(value, ownProps, REFERENCES);
				}
			}

			if(typeof value=="undefined"){
				empty = true;
			}

			if(!empty)break;
		}
	}
	return empty;
};
util.isEmpty = function(/*Object*/ obj){
	// summary:
	//	little brother of `util.objectIsEmpty` that just checks whether there is an enumarable property within that object
	for(var prop in obj) return false;
	return true;
};

util.isFirstAccess = function(/*Object*/ target){
	// summary:
	//  checks if __isFirstRun is set , and sets the flag accordingly if it is not the case.
	return !target.__firstaccess && (target.__firstaccess = true);
};

var ieFilterRegex = /filter:.*?(?:;|$)/i;
util.removeIEFilterStyles = function(/*String|DOMNode*/ node){
	//	summary:
	//		Removes all proprietary "filter:" styles that are used for IE on the given node.
	//	description: This can be used to fix issues with IE's ClearType font rendering when filter and zoom
	//		are applied.
	node = dom.byId(node);
	node.style.cssText = node.style.cssText.replace(ieFilterRegex, "");
};

util.nodeIsEmpty = function(node){
	//	summary:
	//		returns true if there is no text node within a DOMFragment
	//	example:
	//	|	"<div><p><span></span></p></div>"  //div is empty

	var text = node && (node.textContent || node.innerText);
	return !(text && lang.trim(text));
};

util.castValueToType = function(/*any*/ value, /*String?*/ type){
	// summary:
	//		Casts a string to a native type
	var _defaultType = "string";
	var _convertTo = {
		"boolean":function(v){
			var _return;
			switch(typeof v){
				case "string":		_return = v && v.match(/^true|false$/i) ? v.toLowerCase()=="true" : !!(v && v!="0" ) ;break;
				case "undefined":	_return = false;break;
				case "object":		_return = !!v ;break;
				default:_return = v;
			}
			return _return;
		},
		"number":function(v){
			var _return;
			switch(typeof v){
				case "string": 		_return = (!v && NaN) || v.match(/^true|false$/i) ? (v.toLowerCase()=="true" && 1) || 0 : (v.match(/^\d+(?:\.\d+)?$/) ? parseFloat(v) : NaN);break;
				case "undefined":	_return = NaN ;break;
				default:_return = v;
			}
			return _return;
		},
		"string":function(v){
			var _return;
			switch(typeof v){
				case "undefined":	_return = "";break;
				default:_return = v || v==0 ? v.toString() : "";
			}
			return _return;
		},
		"array":function(v){
			var _return;
			switch(typeof v){
				case "string":		_return = !!v ? v.split(/\s*,\s*/) : [];break;
				case "undefined":	_return = [];break;
				default:_return = v;
			}
			return _return;
		}
	};
	if(!type || !_convertTo[type]){
		type = _defaultType;
	}

	return _convertTo[type](value);
};

util.getItem = function(itemsObject, key, type){
	//	summary:
	//		Return a content item value of a domain object.
	//	description:
	//		If the `*Items` property exists or not, return a cast value for a given key.
	//	itemsObject: Object|undefined|null
	//		The items object of domain object or the service payload.
	//	key: String
	//		The key of the value to return.
	//	type: String?
	//		The type that will be passed to `castValueToType`.

	if(!itemsObject){
		return this.castValueToType(itemsObject, type);
	}
	return this.castValueToType(itemsObject[key], type);
};

//TODO: add recursive-flag
util.isValueInArray = function(arr/*:Array*/, value/*:**/, property/*:String = null*/, returnIndex/*:Boolean = false*/, weak/*:Boolean = false*/ )/*:**/{
	// summary:
	//		Searches an array for a specified value or reference.
	//		returns true/false or the matched index if ´returnIndex´ was set to true
	// arr: Array
	//		The Array you want to find something in
	// value: *
	//		The value you hope to find
	// property: String = null
	//		searches the array for an object that provides ´property´ and matches ´value´.
	//		´property´ can be either deep and flat:
	//		ex.:
	//		|   var array = [{prop:{deep:"value"},"prop.deep":"value2"}];
	//		|
	//		|	//would try a flat lookup - returns false
	//		|	isValueInArray(array, "value");
	//		|
	//		|	//would find "value" in  array[0].prop.deep
	//		|	isValueInArray(array, "value", "prop.deep");
	//		|
	//		|	//would find "value2" in  array[0]["prop.deep"]
	//		|	isValueInArray(array, "value2", "prop.deep");
	// returnIndex: Boolean = false
	//		Set this to true to return the matched index instead of true/false
	// weak: Boolean = false
	//		If the lookup should match by == or ===

	weak = weak || false;
	returnIndex = returnIndex || false;
	property = property || null;

	var isValue = function(v){return weak ? v==value : v===value;};
	//dojo.getObject is too lazy
	var deepValue = function(prop,obj){
			var props = prop.split("."), p, ref=obj, i=0, l=props.length;
			while(ref && (p = props[i++])) {
				ref = ref[p];
			}
			//if there have been less iterations than ´props.length´ we assume the property was not found
			return i<l ? undefined : ref;
		};
	var _funcReturnValueByIndex = function(v,i,a){return isValue(v);};
	var _funcReturnValueByProperty = function(v,i,a){var val=deepValue(property, v); return isValue(val);};

	//if we just want to know whether the value exists
	if (!returnIndex){
		return property ? array.some(arr,_funcReturnValueByProperty) : array.some(arr,_funcReturnValueByIndex);
	}
	//if we need the index of a matched location wihin the array to be returned
	else {
		var i=0, l=arr.length, val;
		//if there is only a flat value that has to be found - eg.  <code>var a=new Date(),b=new Date(),arr=[a,b]; isValueInArray(arr,a) //true</code>
		if(!property){
			for (i = 0; i < l; i++ ) if(isValue(arr[i]))return i;
		}
		else{
			//if there is a value of a (?deep) property that needs to be found
			for (i = 0; i < l; i++ ) {
				val = arr[i][property] || deepValue(property, arr[i]);
				if (isValue(val)) return i;
			}
		}
	}

	return returnIndex ? -1 : false;
};

util.arrayIsEqual = function(arrA, arrB){
	// summary: checks two arrays by strict equality

	var isEqual = true, i, l, a, b;
	if(!arrA || !arrB ||
		(typeof arrA == "object" && typeof arrB == "object") && (
		arrA.length !== arrB.length ||
		arrA+"" !== arrB+""
	)){
		return false;
	}
	if(arrA === arrB)return true;

	
	for(i = 0, l = arrA.length; i < l && isEqual; ++i){
		a = arrA[i];
		b = arrB && arrB[i];
		if((a && b) && a.length && b.length){
			isEqual &= util.arrayIsEqual(a, b);
		}else {
			isEqual &= a === b;
		}
	}

	return !!isEqual;
};

util.getAnimationOnParams = function(/*Object?*/ params){

		var target = {x:0,y:0};

		//default parameters
		params = lang.mixin({
			autoplay: true,
			x: 0, //offset
			y: 0, //offset
			window: window,
			container: null,
			target: target,
			duration: 500,
			easing: easing.sineOut
		}, params);

		params.win = params.container = params.container || params.window;

		target.x += params.x;
		target.y += params.y;

		var animation = fxScroll(params);

		params.autoplay && animation.play();

		return animation;
	};


util.scrollToNode = function(/*String|DOMElement?*/ node, /*Object?*/ params){
	//NOTE: scrolling to a target works via offset-scrolling; keep that in mind when setting a explicit values for {target:{x,y}}

	node = dom.byId(node);
	var target = node && domGeometry.position(node) || {x:0,y:0};

	//default parameters
	params = lang.mixin({
		autoplay: true,
		x: 0, //offset
		y: 0, //offset
		window: window,
		container: null,
		target: target,
		duration: 500,
		easing: easing.sineOut
	}, params);

	params.win = params.container = params.container || params.window;

	target.x += params.x;
	target.y += params.y;

	var animation = fxScroll(params);

	params.autoplay && animation.play();

	return animation;
};

util.getAnimationCurve = function(/*dojo._base.fx.Animation*/ animation){
	// returns: dojo._base.fx._Line
	var delay = animation.delay,
		curve = null,
		aopHandles = [
			aspect.around(animation, "onStop", function(){return arguments.callee}),
			aspect.around(animation,"_play", function(_play){return function(){curve = this.curve;};})
		];

	animation.delay = 0;
	animation.play().stop();
	animation.delay = delay;

	array.forEach(aopHandles, "item.remove()");
	aopHandles.length = 0;
	return curve; //_Line
};

util.getClassBases = function(/*dojo.declare Class | Object*/ obj){
	return (obj.prototype || obj).constructor._meta.bases;
};

util.getCurrentTheme = function(){
	var themeModuleName	= shared.store.getTheme();
	var currentTheme = themeRegistry.byName(themeModuleName);

	return currentTheme;
};
util.getThemeChain = function(/*String?*/ propertyFromThemeChain, /*Theme?*/ theme){
	var themeChain = (theme || util.getCurrentTheme()).getThemeChain();
	return array.map(themeChain, function(theme){
		return propertyFromThemeChain ? theme[propertyFromThemeChain] : theme;
	});
};

//cache for relative class Names
var ctorCache = {};
util.$ = function(/*String|Class*/ name){
	//	summary:
	//		Returns the most specific class in the context of app, theme and project.
	//	description:
	//		Checks the scope "project + theme + app, project + theme, project + app, project, core".
	//	name: String
	//		Relative class name (without path), e.g. "Behavior".

	if(typeof name !== "string"){
		var declClass = name.prototype && name.prototype.declaredClass;
		name = util.getClassType(declClass);
	}


	if(name in ctorCache){
		return ctorCache[name];
	}

	var loggroupname = "search CLASS definition `"+name+"`";
	log.groupCollapsed("util", loggroupname);

	var get = function(n){
			var o=lang.getObject(n);
			log("util",o ? "FOUND" : "-----"," `" + n);
			return o;
		},
		currentTheme = util.getCurrentTheme(),
		appName = xcInitial.masterApplicationName,
		ctor;

		if(!currentTheme){
			throw new Error("No theme available at the moment, make sure the related code runs after the theme has been initialized");
		}
		//lookup theme widget definitions
		//		Example:
		//				 themeB/theme.js requires themeA/widget/InputWidget.js.
		//				 Naturally  themeA/widget/InputWidget's `declaredClass` is set to "xcProject.theme.themeA.widget.InputWidget".
		//				 So when it comes to lazy instantiation via template `data-xc-type=widget.InputWidget` or config `widgetType=widget.InputWidget`
		//				 the lookup path involves the path of inherited themes too:
		//							xcProject.theme.B	.app_runner.widget.InputWidget
		//							xcProject.theme.B              .widget.InputWidget
		//							xcProject.theme.A	.app_runner.widget.InputWidget
		//							xcProject.theme.A			   .widget.InputWidget
		//							xcProject.theme.A	.app_runner.widget.InputWidget
		//							xcProject.theme.A			   .widget.InputWidget
		//							xcProject			.app_runner.widget.InputWidget
		//							xcProject					   .widget.InputWidget
		//							excentos                       .widget.InputWidget

	//NOTE: we need to iterate over the linearized inheritance chain in order to find an inherited Widget definition in parallel theme branches
	var themeChain = util.getClassBases(currentTheme);
	for(var i=0, l=themeChain.length; i<l; ++i){
		var theme = themeChain[i].prototype;

		//only check theme compliant bases
		if("templateStrings" in theme && theme.path){
			ctor = get(theme.path + "." + appName + "." + name) ||
				   get(theme.path + "." + name);
		}

		if(ctor)break;
	}

	ctor = ctor ||
		   get("xcProject." + appName + "." + name) ||
		   get("xcProject." + name) ||
		   get("excentos." + name);

	log.groupEnd("util",loggroupname);

	if(!ctor){
		console.warn("excentos.util.$: No class '" + name + "' found.");
	}
	ctorCache[name] = ctor;
	return ctor;
};


util.getClassType = function(/*String | Class*/cls){
	// summary:
	//	returns the type of a specific declaredClass:
	//	ex.: "recommendation.Recommendations" for "xcProject.theme.default.app_scanner.recommendation.Recommendations"

	return (typeof cls == "string" ? cls : cls.declaredClass || cls.prototype.declaredClass).
	replace(/xcProject\.theme\.[^.]+\.app_[^.]+\./,"").
	replace(/xcProject\.theme.[^.]+\./,"").
	replace(/xcProject\.app_[^.]+\./,"").
	replace(/xcProject\./,"").
	replace(/excentos\.theme.[^.]+\./,"").
	replace(/excentos\./,"");
};


util.getProfileSerializationKey = function(){
	return xcInitial.serviceBaseUrl + xcInitial.masterApplicationName + "/profileSerialization";
};
util.saveProfileSerialization = function(){
	var key = this.getProfileSerializationKey();
	cookie(key,shared.store.getMetaData().queryProfileSerialization,{expires:300});
};
util.loadProfileSerialization = function(){
	var key = this.getProfileSerializationKey();
	var data = cookie(key);

	if(data){
		cookie(key, null, {expires:-1});

		return shared.controller.callService("setProfileBySerialization", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"]
			},
			postParams: {
				queryProfileSerialization: json.parse(data)
			}
		});
	}

	return
};

util.removeSession= function(){
	cookie("xcSessId", null, {expires: -1});
	cookie("JSESSIONID", null, {expires: -1, path: xcInitial.serviceBaseUrl.substr(0, xcInitial.serviceBaseUrl.length - 1)});
};

util.restartWithNewSession = function(){
	// Delete session cookie.
	this.removeSession();
	// Reload page.
	location.reload();
};

//NOTE: util.partial is three times faster than dojo/_base/lang::partial !
util.partial = function(func /*, ...rest*/){
	// summary:
	//	faster partial implementation with optional context parameter

	var context = null;
	if(typeof func == "object"){
		context = func;
		func = arguments[1];
	}

	var slice = Array.prototype.slice,
		args = slice.call(arguments, context?2:1); //only use the `...rest` strip at least one element from the arguments

	return function(){
		var newArgs = slice.call(arguments);
		newArgs.unshift.apply(newArgs, args);
		return func.apply(context, newArgs);
	};
};

util.toArray = function(obj){
	if(obj.length) return lang._toArray(obj);
	if(obj instanceof Array)return obj;

	var arr = [];
	for(var prop in obj){
		if(obj.hasOwnProperty(prop)){
			arr.push(obj[prop]);
		}
	}

	return arr;
};

util.arrayToObject = function(/*Array*/ arr, /*String*/ property){
	// summary:
	// 	create a map by properties off a list of objects for quickly looking up elements
	//
	//  function hasImage(filename){
	//	  var imgs = util.arrayToObject(document.images, "src")
	//	  //{ "file1.png": [object Image], "file2.png": [object Image], ... }
	//    return filename in imgs;
	//	}

	var obj = {}, i = arr.length;
	while(i-->0){
		var entry = arr[i];
		var label = lang.getObject(property, false, entry);
		label && (obj[label] = entry);
	}

	return obj;
};

util.objectKeys = function(obj){
	if(typeof Object.keys == "function")return Object.keys(obj);

	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys;
};

util.getDevicePixelRatio = function(){
	// return  BrowsersWhoImplementStandard ||  IE10Mobile || CanNotDetectSoOneIsDefault.
	return window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI) || 1;
};

/**
 * Returns a practically sensible factor of CSS to phyical resolution that
 * can be used for generating Image URLs. Maps the most popular and rounds the rest
 * to avoid generating every randomly possible image resolution because of user
 * Zoom on the desktop etc.. Prefers the next higher resolution to assure perfect look.
 * Used e.g. for generating px-based requests to the image scaler or image server.
 * Maximum output is 2 to restrict image download sizes (and because it gets esoteric above that).
 * Reference: http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density
 */
util.getPracticalImageDpr = function(){
	var dpr = util.getDevicePixelRatio();
	if(dpr > 1.7) return 2;
	if(dpr > 1.5) return 1.7;
	if(dpr > 1) return 1.5;
	return 1;
};

/**
 * Returns a possible scale name that represents the pyhsical device resolution
 * as good as possible. Used for generating dp-based requests to the image scaler
 * Behaves conservatively -> prefers the next lower.
 */
util.getPhysicalDpiScale = function(){
	var scale = util.getCurrentTheme().dpiScale;
	var dpr = util.getDevicePixelRatio();
	if(dpr >= 2) return shared.constants.DPI_DOUBLERES[scale];
	if(dpr >= 1.5) return shared.constants.DPI_ONEPOINTFIVERES[scale];
	return scale;
};

util.getStageWidget = function(widget){
	var Topic = lang.getObject("excentos.widget.facetgroup.wizard.Topic");
	function isStage(widget){
		return (widget.apiData && widget.apiData.type === "STAGE") ||
			    widget.isInstanceOf(Topic);
	}
	var p = widget;
	while(p && !isStage(p) && (p=p.getParent())){};
	return p;
};


var _findWidgetWithIsVisibleMethod = function(widget){
	var w = widget;
	while(w && !("isVisible" in w)){
		w = w.getParent && w.getParent();
	}
	return w;
};

util.domNodeInViewPort = function(/*DOMNode*/ domNode){
	var rect     = domNode.getBoundingClientRect(),
		vWidth   = window.innerWidth || document.documentElement.clientWidth,
		vHeight  = window.innerHeight || document.documentElement.clientHeight;

	return !(rect.right < 0 || rect.bottom < 0 ||  rect.left > vWidth || rect.top > vHeight);
};

util.domNodeIsVisible= function(/*DOMNode*/ domNode){
	var inViewPort = util.domNodeInViewPort(domNode), visible = inViewPort, rect;
	var efp = function(x,y) { return document.elementFromPoint(x, y) };
	if(inViewPort){
		// true if any of its four corners are visible
		rect    = domNode.getBoundingClientRect();
		visible = domNode.contains(efp(rect.left,  rect.top))
				  ||  domNode.contains(efp(rect.right, rect.top))
				  ||  domNode.contains(efp(rect.right, rect.bottom))
				  ||  domNode.contains(efp(rect.left,  rect.bottom));
	}

	return visible;
};

util.domNodeIsFullyVisible= function(/*DOMNode*/ domNode){
	var inViewPort = util.domNodeInViewPort(domNode), visible = inViewPort, rect;
	var efp = function(x,y) { return document.elementFromPoint(x, y) };
	if(inViewPort){
		// true if all of its four corners are visible
		rect    = domNode.getBoundingClientRect();
		visible = domNode.contains(efp(rect.left,  rect.top))
			&&  domNode.contains(efp(rect.right, rect.top))
			&&  domNode.contains(efp(rect.right, rect.bottom))
			&&  domNode.contains(efp(rect.left,  rect.bottom));
	}

	return visible;
};

util.isVisible = function(widget, /*Boolean?*/ checkPath){
	var w = _findWidgetWithIsVisibleMethod(widget);
	return w && typeof w.isVisible == "function" ? w.isVisible(checkPath) : undefined;
};

util.isVisibleRecursive = function(widget, /*Boolean?*/ checkPath){
	// summary:
	//  checks recursively (bottom-up) for explicit `.isVisible() === true` (referenced as "visible") on `isVisible()`-providing-widgets (referenced as "IsVisibleWidget")
	// returns:
	//   true - if the nearest "IsVisibleWidget" is "visible" AND has EITHER no further parent "IsVisibleWidget" OR all its parent "IsVisibleWidget" are "visible" too.
	//   false - if the nearest "IsVisibleWidget" is not "visible" OR at least one of its parent "IsVisibleWidget"s is not "visible"
	//	 undefined - if there such "IsVisibleWidget" was found

	var enclosedVisibleProvider = _findWidgetWithIsVisibleMethod(widget) || undefined;
	var enclosedIsVisible = enclosedVisibleProvider && enclosedVisibleProvider.isVisible(checkPath);

	//In case `enclosedIsVisible` is not === true, this means there is no such Widget in the given DOM Path
	if(enclosedIsVisible === true){
		var enclosedVisibleProviderParent = enclosedVisibleProvider.getParent() || undefined;
		var enclosedParentIsVisible = arguments.callee.call(this, enclosedVisibleProviderParent, checkPath);
	}

	var isVisible = enclosedIsVisible ? enclosedParentIsVisible !== false : enclosedIsVisible;

	return isVisible;
};

util.getAnsweredFacetWidgets = function(/*String?*/ parentApiName){
	//summary:
	//	check if any facet has been answered
	var widgets = widgetRegistry.byApiType("facet");
	var list = [], apiName;
	for(apiName in widgets){
		if(widgets[apiName].answered &&
		  (!parentApiName ||
			parentApiName && apiName.indexOf(parentApiName)!=-1)
		  ){
			list.push(widgets[apiName]);
		}
	}
	return list;
};

var _remoteContentCache = {};
util.getRemoteHTML = function(/*String*/ url, /*Object?*/ params){

	// params: Object
	//	see http://dojotoolkit.org/reference-guide/1.10/dojo/html.html
	//	added query to match certain elements

	params = params || {};

	var promiseData = {
                      		url: url,
		response: undefined,
		//responseNode: HTMLElement
		//	a documentFragment containing the response
		responseNode: undefined,
		//query: String
		//	a selector query to only retrieve certain parts of the whole requested file
		query: params.query,
		//queryNodeList: Array <HTMLElement>
		//	contains the HTMLElements from the query
		queryNodeList: undefined
	};

	//return only successful promises
	var cachedPromise = _remoteContentCache[url];
	if(cachedPromise && cachedPromise.isResolved()){
		return cachedPromise;
	}

	var requestPromise = request(url, {sync:false, headers:{'X-Requested-With':null}}).then(
		function(/*String*/ text){
			promiseData.response = text;
			var _dummynode = document.createDocumentFragment();
			promiseData.responseNode = html.set(_dummynode, text, params);
			//need to extract external resources ?
			params.query && (promiseData.queryNodeList = query(params.query, promiseData.responseNode));

			return promiseData;
		}
	);

	return _remoteContentCache[url] = requestPromise;
};
util.renderHtmlAsPage = function(/*String?*/ html){
	var closure = util.renderHtmlAsPage,
		win = closure.__window || window,
		doc = win.document,
		iframe = doc.createElement('iframe');

	iframe.setAttribute("class", "xc_util_iframe");
	iframe.setAttribute("name", "xc_util_iframe");
	domStyle.set(iframe, {position:"absolute",top:"-9000px",left:"-9000px"});
	doc.body.appendChild(iframe);

	var iframeWindow = iframe.contentWindow,
		iframeDocument = iframeWindow.document;

	iframeDocument.open();
	iframeDocument.write(html || "");
	iframeDocument.close();

	return iframeWindow;
};

util.getUniqueSessionHash = function(){
	var meta = shared.store.getGlobalMetaData();
	return [
		meta.sessionId,
		(+new Date()).toString(36)
	].join("_");
};

util.getCurrentRootDomain = function(){

	function isValidDomain(/*String*/ domain){
		/*TODO*/var expirationDate = new Date((+new Date())+5e3);
		cookie("xcPathTest",1,{path:"/", expires:expirationDate, domain:domain});
		return !!cookie("xcPathTest");
	}

	var host = location.hostname,
		rootDomain = arguments.callee._cache[host];

	if(!rootDomain){
		var domainParts = host.split("."),
			hasValidDomain,
			checkedDomain = "",
			checkedDomainParts,
			checkedDomainLength = 2;

		//expand the domain "stage.mydomain.co.uk" to the left starting from slice-index -2 ("co.uk"); then -3 ("mydomain.co.uk")
		while(!hasValidDomain && checkedDomainLength<=domainParts.length){
			checkedDomainParts = domainParts.slice(-(checkedDomainLength++));
			checkedDomain = checkedDomainParts.join(".");
			hasValidDomain = isValidDomain(checkedDomain);
		}

		rootDomain = checkedDomain;
	}

	return arguments.callee._cache[host] = rootDomain;
};
	util.getCurrentRootDomain._cache = {};

util.setVisitorId = function(/*String*/ id){
	cookie("xcVisitorId", id, {expires: 365 * 2, path:"/", domain: util.getCurrentRootDomain()});
	return id;
};

util.getVisitorId = function(){
	return cookie("xcVisitorId") || util.setVisitorId(shared.store.getGlobalMetaDataByKey("visitorId"));
};

util.getClientUrl = function(){
	var l = window.location, href = l.href, hash = l.hash, search = l.search, queryData;
	href = href.replace(hash,"").replace(search,"");
	queryData = (shared.store.getMetaDataByKey("queryProfileSerialization") || "") +
		search.replace("?","&") +
		search;

	return href + (queryData ? "?" + queryData : "");
};

util.getRelativeUrl = function(/*String?*/ url){
	// trims the hostname from an url
	return (url||location.href).replace(/https?:\/\/[^\/]+/,"");
};

util.getAbsoluteUrl = function(/*String?*/ url){
	// returns an absolute url based on the current location
	var a = util.getAbsoluteUrl._anchor;
	a.parentNode || document.body.appendChild(a); //some browsers require the <A> element to be added to the document
	a.href = url || ".";
	return a.href;
};
	util.getAbsoluteUrl._anchor = document.createElement("a");

util.rebaseUrl = function(/*String*/ url){
	return this.getAbsoluteUrl(this.getRelativeUrl(url));
};

util.getRequiredScrolling = function(targetNode, containerNode, /*Function?*/ calculateOffset){
	// returns the scroll amount that is needed to bring the targetNode intoview of a scrollable containerNode
	calculateOffset = calculateOffset || util.scrollingBehavior.left;
	var target = xcDomGeometry.getOffsets(targetNode),
		container = xcDomGeometry.getOffsets(containerNode);

	var offset = calculateOffset(target, container);

	return offset;
};
util.scrollingBehavior = {
	//function package which returns a numeric value as scrollLeft / scrollTop

	"page": function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
		//TODO implement me
	},
	"smartleft": function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
		//behavior: behaves like `scrollingBehavior.left` if the element is not fully visible

		var outOfBounds = xcDomGeometry.getOutOfBounds(target, container);
		var containerOffs = xcDomGeometry.getNodeOffsets(container);

		return outOfBounds.l || outOfBounds.r ?
				this["left"](target, container) :
				containerOffs.scrolls.l;
	},
	"smartRight": function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
		//behavior: behaves like `scrollingBehavior.right` if the element is not fully visible

		var outOfBounds = xcDomGeometry.getOutOfBounds(target, container);
		var containerOffs = xcDomGeometry.getNodeOffsets(container);

		return outOfBounds.l || outOfBounds.r ?
				this["right"](target, container) :
				containerOffs.scrolls.l;
	},
	"left": function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
		//behavior: target will be displayed in the leftmost place
		//example: 6 Elements within container, 3 visible, starting from 1
		//			[[1,2,3],4,5,6,7]
		//			go to 5
		//			[1,2,3,4,[5,6,7]]
		//			go to 4
		//			[1,2,3,[4,5,6],7]

		var scrollBounds = xcDomGeometry.getScrollBounds(target, container);

		return scrollBounds.l;
	},
	"right": function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
		//behavior: target will be displayed in the rightmost place
		//example: 6 Elements within container, 3 visible, starting from 1
		//			[[1,2,3],4,5,6,7]
		//			go to 5
		//			[1,2,[3,4,5],6,7]
		//			go to 4
		//			[1,[2,3,4],5,6,7]

		var scrollBounds = xcDomGeometry.getScrollBounds(target, container);

		return scrollBounds.r;
	},
	"center-horizontal": function(/*DOMNode || NodeOffset*/ target, /*DOMNode*/ container){
		//behavior: target will be displayed in the horizontally centermost place
		//example: 6 Elements within container, 3 visible, starting from 1
		//			[[1,2,3],4,5,6,7]
		//			go to 5
		//			[1,2,3,[4,5,6],7]
		//			go to 4
		//			[1,2,[3,4,5],6,7]
		var container = container.node || container,
			//scrollBounds = xcDomGeometry.getScrollBounds(target, container);
			target = target.node || target;

		//FIXME: under some circumstances scrollbounds.l === scollbounds.r despite the target has offsetLeft
		return  target.offsetLeft - (container.offsetWidth / 2) + (target.offsetWidth / 2);
	}
};

//util.requestAnimationFrame = function(/*Function*/ callback){};
util.requestAnimationFrame = requestanimationframe.requestAnimationFrame;
//util.cancelAnimationFrame  = function(/*Number*/ id){};
util.cancelAnimationFrame = requestanimationframe.cancelAnimationFrame;


util.throttle = function(cb, wait, context){
	// acts like dojo/throttle() but will not miss the last event
	wait || (wait = 250);
	var last, deferTimer;
	return function () {
		context = context || this;

		var now = +new Date,
			args = arguments;
		if (last && now < last + wait) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				cb.apply(context, args);
			}, wait);
		} else {
			last = now;
			cb.apply(context, args);
		}
	};
};

util.watch = function(/*Object*/ object, /*Function|String*/ property, /*Function*/ callback){
	// summary: continuously checks a `property` from `object` and calls `callback` upon changes.
	// description: Checks object[property]; in case its a function; it calls the function without arguments in context of `object`
	// callback: Function that is being called upon changes
	//				ex.: watch(window, "scrollX", function(property, oldValue, newValue, object){
	// 						console.log(property,"changed on",object,"from",oldValue,"to",newValue)
	// 					})
	//
	return util.interval(function(){
		var callee = arguments.callee,
			propertyValue = object && object[property],
			propertyIsFunction = typeof property === "function" || typeof propertyValue === "function",
			propertyFunction = propertyIsFunction && (property || propertyValue);

		propertyValue = propertyIsFunction ? propertyFunction.call(object) : propertyValue;

		if(callee.lastPropertyValue != propertyValue){
			callback.call(object,
				property,
				callee.lastPropertyValue,
				propertyValue,
				object
			);
			callee.lastPropertyValue = propertyValue;
		}
	});
};

util.merge = function(base, mixin){
	// merges two objects; lang.mixin() does not do the job, it would override nested properties:
	//	lang.mixin({a:{b:1}}, {a:{c:2}}) // {a:{c:2}}
	//	util.merge({a:{b:1}}, {a:{c:2}}) // {a:{b:1,c:2}}
	var getType = util.merge.getType,
		property,
		baseValue,
		value,
		destType,
		srcType;

	(!base && mixin) && (base = mixin);
	for(property in (mixin||{})){
		value = mixin[property];
		baseValue = base[property];

		if(!(property in base)){
			base[property] = value;
		}else{
			destType = getType(baseValue);
			srcType = getType(value);

			if(destType === "object" && srcType === "object" && baseValue && value){
			   util.merge(baseValue, value);
			}else{
				base[property] = value;
			}
		}
	}

	return base;
};
	util.merge.getType = function(value){
		var type = typeof value;
		return type === "object" && type instanceof Array ? "array" : type;
	};

return util;

});