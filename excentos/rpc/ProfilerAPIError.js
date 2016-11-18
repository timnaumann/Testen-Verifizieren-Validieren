define(["dojo/_base/declare"], function(declare){
	//Custom Error that gets thrown by JsonpService when the payload contains an ´error´ property
	//handles:
	//	- plain errors like new Error("Error!")
	//	- "error" payload like {id:1, result:{error:{msg:"Error!",code:490,stack:"..."}}}
	//TODOC: When do these errors exactly get thrown
	return declare(Error, {
		name: "ProfilerAPIError",
		code: NaN,
		stack: "",
		type: NaN,

		constructor: function(/*String|Object?*/error){
			switch(typeof error){
				case "object":
					this._setByErrorObj(error);
				break;
				case "string":
					this.message = error;
				break;
			}
		},
		
		_setByErrorObj: function(err){
			this.message = err.msg || err.message;
			this.code = err.code;
			this.type = err.type;
			this.stack = err.trace;
		},
		
		toString: function(){
			//We dont want to return [object Object];
			//ECMA-262 Edn5.1  @15.11.4.4 Error.prototype.toString()
			return Error.prototype.toString.call(this);
		}
	});
});