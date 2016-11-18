define([
	"dojo/has",
	"dojo/dom-class",
	"./_base",
	"./Store",
	"./Controller" /*NMD:Ignore*/, /*implicit module declaration*/
	"./shared",
	"./util",
	"./rpc/JsonpService" /*NMD:Ignore*/, /*implicit module declaration*/
	"./_Init" /*NMD:Ignore*/ /*implicit module declaration*/
], function(has, domClass, excentos, Store, Controller, shared, util, JsonpService, _Init){

	/**** PREAMBLE ****/
	excentos.shared = shared;
	shared.initDone = false;

	// first tell the world that we're initializing now and who we actually are
	var appClassName = "xc_" + xcInitial.masterApplicationName.toLowerCase();
	domClass.add(document.documentElement, ["xc_init_running", appClassName, "tundra", has("touch") ? "xc_touch" : "xc_mouse"]);

	// Initially store data from ajaxinit.
	// Create the store and write the initial data like the controller does it for every service response.
	// Think of it as a simulated initial service call.
	// (attention: pre-filling is done without callbacks here, this is done via behavior callbacks
	// at the end of this function)
	var store = shared.store = Store.getInstance();

	var rpcService = new JsonpService(xcInitial.serviceSmd);
	rpcService._sessionId = xcInitial.sessionId;

	var controller = shared.controller = Controller.getInstance(rpcService);
	controller._jsonAdapter = xcInitial.serviceSmd.jsonAdapter;

	// Set SessionId cookie regardless of whether it has changed or not.
	// Do NOT notify the user because that's a regular case on init as the
	// cookie can have a longer lifetime than the server session (either because
	// it's a browser session cookie or because it's a one-week servlet container session)
	controller.setSessionIdCookie(xcInitial.payload.metaData);
	/**** PREAMBLE ****/

	var initFunc = function(){
		var initObj = new (util.$(_Init));
		initObj.init();

		return initObj
	};
	//back compat `init` interface
	initFunc.init = initFunc;

	return initFunc;
});