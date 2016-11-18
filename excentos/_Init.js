define([
	"dojo/dom-class",
	"./aspect",
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/ready",
	"dojo/dom",
	"./_base" /*NMD:Ignore*/, /*implicit module declaration*/
	"./shared",
	"./Singleton",
	"./Router",
	"./util",
	"./widget/explanation/Controller",
	"./tracking/Tracker",
	"./_Behavior",
	"./widget/WidgetFactory",
	"./StageChangeController",
	"./widget/error/Dialog" /*NMD:Ignore*/ /*implicit module declaration*/
], function(domClass, aspect, lang, declare, ready, dom, excentos, shared, Singleton, Router, util, ExplanationController, tracker, Behavior, WidgetFactory, StageChangeController, ErrorDialog){

	return Singleton(declare("excentos.Init",null, {

		_behaviorInitCalled: false,
		haltOnNoStageInView: true,

		init:  function(){
			//	summary:
			//		Initialization function that plugs together the application's main components.
			//		It may be called by the app-specific init function (xcProject.APPNAME.init).
			
			if(this.haltOnNoStageInView && !xcInitial.payload.applicationItems[xcInitial.masterApplicationName].facetGroupVars.currentStageInView){
				console.error("Question Flow doesn't provide a stage in view. xcAjaxClient initialization aborted.");
				return;
			}

			//create shared.behavior, shared.store, shared.controller, etc...
			this.createComponents();

			aspect.after.once(shared.behavior, "init", function(){this._behaviorInitCalled = true;}, this);
			
			
			//Widget initialization already requires a body
			util.poll(lang.hitch(this, "pollBody")).then(lang.hitch(this, "onBodyReady"));
			
			// in case `xcStartAdvisor` is not a truthy value - an xc_welcome screen is being displayed and idling 
			// until the advisor gets started manually (or by any remote trigger) by setting `xcStartAdvisor` to true.
			// The advisor must not be displayed until that point in time!
			//global var created along with site integration code or via ajaxInit if not exists; trigger for hiding potential welcomeScreen
			util.poll(lang.hitch(this, "pollStartAdvisor")).then(lang.hitch(this, "onStartAdvisor"));
			ready(lang.hitch(this, "onDocumentReady"));
		},
		
		createComponents: function(){
			shared.behavior = new util.$(Behavior)();
			
			//amongst other lines the following one should not be considered to be a core feature of project.init
			//always start from the beginning when the welcome screen is presented
			/** TODO Specification bug and real bug: should not be bound to the welcome screen, but to 
			*      the URL not containing a "xcStartAt" reference (which is only interpreted by the server on Reset)

			     Verhalten von Parametern in Kombination (ob es eine Startpage gibt oder nicht ist egal):  
			         nur startAt   : kein Reset, stage wie in session (implizite Erkennung von "zurück via Back-button")
			         nur reset     : reset, UI erste stage (explizit von Einbindungs-URL angefordert)
			         (keiner)      : reset, UI erste stage (Berater neu über Verlinkung auf der Kundenseite gestartet)
			         reset+startAt : reset, UI startAt-stage (Einbindung für speziellen Usecase -> siehe URL Bookmarking Spec)
			     
			     TODO: "started" Parameter expliziter in URL setzen?
			     TODO: sollte eigentlich von der ajaxInit ausgewertet werden (spart extra roundtrip dann und ist robuster bzgl. timing)
			           darin wiederum sollte ein configparameter ausgewertet werden der bestimmt was passiert wenn keine parameter übergeben
			           wurden (wenn parameter übergeben sind sollen die auch so gemeint sein und recht haben)
			           -> im Sinne von default-parametern wenn keine gesetzt sind?  -> "Hackordnung" Ebene vier.
			           (profil behalten aber von vorne vs. kpl-reset () vs. alles erhalten (sportscheck)
			*/
			
			shared.widgetFactory = WidgetFactory; // lazy attach to shared object, so references amongst other Classes dont need to be updated
			shared.router = util.$(Router).getInstance();
			shared.explanationController = util.$(ExplanationController).getInstance();
			shared.stageChangeController = util.$(StageChangeController).getInstance();
		},

		pollBody: function(){return document.body;},
		onBodyReady: function(){
			//create everything as soon as possible; dijits rely on body :/
			this.initBehavior();
		},
		initBehavior: function(){
			shared.router.route(); 
			shared.behavior.init(); // manages its dependencies to ready() independently for faster startup
			shared.controller.callBehaviorMethods();
		},
		
		pollStartAdvisor: function(){return xcStartAdvisor;},
		onStartAdvisor: function(){
			//flag `done` only if behavior::init has run; we cant aspect.after on behavior.init, because we cant tell, whether init has already run by the time we are adding the listener
			domClass.add(document.documentElement, "xc_startadvisor");

			var self = this;
			util.poll(function(){return self._behaviorInitCalled;}).then(lang.hitch(this, "onBehaviorInitated"));
		},

		onBehaviorInitated: function(){
			if (xcInitial.showWelcome && xcInitial.starterNode){
				shared.behavior.onRestart();
			}
			shared.behavior.onInitDone();
			domClass.remove(document.documentElement, "xc_startadvisor");
		},
		
		onDocumentReady: function(){
			
			this._checkInvalidUserAgent();
			
			// LAST STEP: do all stuff that can be done lazy and arbitrarily late
			// Wrap a Timout (but no time given!) to allow the browser finishing other 
			// urgent Javascript and/or rendering stuff. 
			setTimeout(lang.hitch(this, "finishInit"));
		},
		

		
		finishInit: function(){
			// Ping the server to keep the session alive every half session timeout.
			// This guarantees that if you leave the page you have at least half (or more) of the session 
			// timeout available to return to the app without having lost your session. 
			var sessionTimeout = xcInitial.payload.metaData.sessionTimeout;
			shared.controller.setPingInterval(sessionTimeout && (sessionTimeout / 2));
			
			this._trackLoad();
		},
		
		_checkInvalidUserAgent: function(){
			//In cases of HEAD integration, init could be called when there is not even a body (document.body == null)
			
			if(xcInitial.invalidUserAgent){
				(dijit.byId("xc_error_dialog") || new excentos.widget.error.Dialog({id: "xc_error_dialog"}))
					.set({
						message: xcInitial.invalidUserAgent.message,
						closable: false
					})
					.show();
				return;
			}
		},
		
		_trackLoad: function(){
			tracker.init();
			var loadDuration = "";
			try{
				var jsInitRequestTime = dom.byId("xcJsInit").src.match(/preventCache=([0-9]+)/)[1];
				loadDuration = new Date().getTime() - jsInitRequestTime;
				// Format according to tracking spec.
				loadDuration = (loadDuration/1e3).toFixed(1);
			}catch(e){}
			tracker.track("load", loadDuration);
		}
		
	}));
});
