define([
	"dojo/_base/declare",
	"./ProfilerAPIError"
], function(declare, ProfilerAPIError){
	//Custom Error that gets thrown by JsonpService when the payload contains aserviceExceptionItems property
	//handles:
	//	- single serviceExceptionItems {errorCode:104, type:40, exceptionName:"...: Error!", stackTrace:{items:[{fileName:"",lineNumber:0,method:""}]}}
	//TODOC: When does these Exceptions exactly get thrown
	var ProfilerAPIException = declare(ProfilerAPIError, {
		name: "ProfilerAPIException",
		
		//static members from com.excentos.xcprofiler.xcprofilerapi.core
		TYPE: {
			UNIMPORTANT: 	 0,
	    	USER: 			10,
	    	CONFIGURATION:	20,
	    	PRODUCTDATA: 	30,
	    	CLIENT: 		40,
	    	APPLICATION: 	50,
	    	FATAL:	 	   100
		},
		
		CODE: {
			UNKNOWN_PRODUCT:				101,
			INVALID_PRODUCT_ID:				102,
			UNKNWON_LOCALE:					103,
			INVALID_APPLICATION_NAME:		104,
			JSON_RPC_INVOKE_EXCEPTION:		105,
			INVALID_UI_STATE:				106,
			WRONG_XCAPPLICATION_PARAMETER: 	107
		},
		
		_setByErrorObj: function(err){
			this.message = err.exceptionName;
			this.code = err.errorCode;
			this.type = err.type;
			this.stack = this._stackToString(err.stackTrace);
		},
		
		_stackToString: function(stack){
			var plainItems = [],
				items = stack.items || stack.length || [],
				item,
				methodName,
				fileName,
				lineNumber,
				className,
				i=0,l=items.length;
			
			for(; i<l; ++i){
				item = items[i];
				methodName = items[i].methodName || "",
				fileName = items[i].fileName || "",
				lineNumber = items[i].lineNumber || "",
				className = fileName.substring(0,fileName.indexOf("."));
				
				plainItems.push(className+"."+items[i].methodName+"("+items[i].fileName+":"+items[i].lineNumber+")");
			}
			
			return plainItems.join("\r\n\tat ");
		}
	});
	//map static class member so this.TYPE and ProfilerAPIException.TYPE is accepted
	ProfilerAPIException.TYPE = ProfilerAPIException.prototype.TYPE;
	ProfilerAPIException.CODE = ProfilerAPIException.prototype.CODE;
	
	return ProfilerAPIException;
})