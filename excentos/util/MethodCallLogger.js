define([
	"dojo/_base/lang",
	"dojo/_base/array",
	"excentos/util",
	"../aspect"
], function(lang, array, util, xcaspect){

	var methodCallLogger = {
		declaredClass: "util.MethodCallLogger",
		toString: function(){
			return "[object " + this.declaredClass + "]";
		}
	};

	methodCallLogger.defaultIgnore = ["constructor", "inherited"];
	methodCallLogger.log = function(target, paramObj){
		//summary:
		//		MethodCallLogger.log is used to log each call to an object's public method.
		//		MethodCallLogger is a static-type Object intended to be used during development.
		//description:
		//		Hand in a target and this function will create a console output each time a target's public method is called.
		//		A customized dojo.connect will register a _MethodLogger before(!) the target's method is executed
		//		(dojo only provides connect handlers to be executed after the registered method).
		//		With additional parameters you can even black or whitelist methods and fire an extra custom callback when the target's method has been called.
		// paramObj:
		//		{ allow: Array, ignore: Array, callback: Function, silent: Boolean }
		//		allow:
		//			Array that consists of Strings as a whitelist of methods that should be logged
		//		ignore:
		//			Array that consists of Strings as a blacklist of methods that should not be logged
		//			If 'allowed' is set the blacklist will only apply to the intersecting methods of 'allowed' and 'ignored'
		//		callback:
		//			optional Function that is called on each method triggered for custom debugging or monkey patching.
		//			Two arguments are passed to the callback:
		//				callback(aspectData)
		//				aspectData:
		//					{target,methodName,method,args}
		//		silent:
		//			Boolean that tells the logger to not use its default output method - commonly used with callback to provide custom console debug messages.
		//
		// example usage:
		//			if(this.id == "xcProject_theme_responsive_widget_carousel_Carousel_3"){
		//				MethodCallLogger.log(this);
		//			}



	paramObj = lang.mixin({
				ignore: [],
				silent: false
			},paramObj);

		var _defaultIgnore = ("defaultIgnore" in paramObj && (paramObj.defaultIgnore ? paramObj.defaultIgnore : [])) || methodCallLogger.defaultIgnore;
		paramObj.ignore = paramObj.ignore.concat(_defaultIgnore);

		var isFunction, isIgnored, isAllowed;

		for(var prop in target){
			// set runtime variables
			isFunction = typeof target[prop] == 'function';
			if(!isFunction){
				continue;
			}

			isIgnored = false;
			array.some(paramObj.ignore, function(ignoredName){
				if(!isIgnored && prop.search(ignoredName) > -1){
					return isIgnored = true;
				}
			});
			isAllowed = !paramObj.allow;
			array.some(paramObj.allow, function(allowedName){
				if(!isAllowed && prop.search(allowedName) > -1){
					return isAllowed = true;
				}
			});

			if(!isIgnored && isAllowed){
				var callback = paramObj.callback;
				var aspectHandler = xcaspect.around(target, prop, function(org, aspectData){
					var returnValue = advice(org, aspectData);
					callback && callback(org, aspectData);
					return returnValue;
				});
			}
		}
	};


	methodCallLogger.logInheritedMethodsFrom = function(/*Object*/ target, /*Array<Class>*/ classes, /*Object?*/ paramObj){
		paramObj = paramObj || {};
		var allow = paramObj.allow || (paramObj.allow = []);

		var allowedInherited = (function(){
				var a = [];
				return a.concat.apply(a,
					array.map(classes || [], function(cls){
						var proto = cls && cls.prototype || {};
						return util.objectKeys(proto);
					})
				)
			}());

		allow.push.apply(allow, allowedInherited);
		methodCallLogger.log(target, paramObj);
	};

	var advice = function(org, aspectData){
		var groupName = _strGroupName(aspectData);

		//TODO: checkForChangedProperties(aspectData.target);
		console.group(groupName, aspectData.arguments);
		var returnValue = org();
		//TODO: checkForChangedProperties(aspectData.target);

		console.groupEnd(groupName);

		return returnValue;
	};
	
	function _strGroupName(aspectData){
		var target = aspectData.target;
		var _class = target.declaredClass || "";
		var _instance = target.id || target.name || "";
		var that = (_instance ? "(" + _instance + ") " : "") + (_class ? _class + "::" : "" );

		return /*that*/ "(" + _instance + ") ::" + aspectData.methodName + "()";
	};

	return methodCallLogger;
});
