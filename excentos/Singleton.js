define([
	"dojo/_base/lang"
],function(lang){

	//A Singleton maker, which turns an ordinary constructor into a constructor for Singletons
	// - adds `getInstance()`
	// - new MySingletonClass === MySingletonClass.getInstance();
	// - keeps inheritance intact
	// - even using the declaredClass uses the singleton constructor (careful! means Singletons are also being used from within templates (data-dojo-type))

	//NOTE: inheriting from a Singleton currently does not mean, that the inherited class is a Singleton itself!

	return function Singleton(/*Constructor*/ ctor){
		// summary:
		//	creates a new constructor which returns the singleton instance;
		//  also adds a static getInstance() method

		var instance = null;
		var singletonCtor = function(){
			return singletonCtor.getInstance.apply(ctor, arguments);
		};

		//copy all properties to the singletonCtor to ensure inheritance
		for(var prop in ctor){singletonCtor[prop] = ctor[prop];}
		singletonCtor.prototype = ctor.prototype;
		//override global definitions like "com.domain.package.ClassName"
		var declaredClass = ctor.prototype.declaredClass;
		declaredClass && lang.setObject(declaredClass, singletonCtor);

		singletonCtor.getInstance = function(/*...args*/){
			// summary:
			//	calls the constructor and returns the instance.
			//	A second call to `getInstance` will just return the instance which is stored in a closure; 
			
			if(!instance){
				//instantiate with potential arguments for the constructor


				//general call of constructor with arguments would be something like
				//	|	ctor.bind(null, arg1, arg2, argN);
				//`Function.prototype.bind` is not supported in old IEs so we have to use `lang.hitch`
				//	|	lang.hitch(null, ctor, arg1, arg2, argN);
				//but we cant say how many arguments there will be, we have to use a dynamic array filled with arguments instead
				//	|	var args = Array.prototype.slice.call(arguments);
				//... wait, but now that `args` need to be expanded to work in `lang.hitch`
				//	|	lang.hitch(null, ctor, args); //would only transfer one argument containing all the former single arguments
				//... that means we will have to use `Function.prototype.apply`
				//and therefore we will have to put even the context (`null`) and the method (`ctor`) into the `args` list
				//	|	args.unshift(null, ctor);
				//which finally leads us to our constructor-wrapper-method
				//	|	lang.hitch.apply(lang, args);

				var args = Array.prototype.slice.call(arguments);
					args.unshift(null, ctor);

				var ctorWithArgs = lang.hitch.apply(lang, args);
				instance = new ctorWithArgs();
			}
			return instance;
		};

		return singletonCtor;
	};
	
});