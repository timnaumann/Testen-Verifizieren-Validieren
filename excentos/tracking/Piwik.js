define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/json",
	"dojo/request/script",
	"excentos/tracking/_TrackingImpl",
	"excentos/shared",
	"excentos/util"
], function(declare, lang, JSON, script, _TrackingImpl, shared, util){

/**
 * Tracker implementation for the Piwik OSS tracking system. 
 * This tracker follows a different pattern than the other trackers:
 *  - there is no separate server-side "adapter js", we directly address the
 *    Piwik JS API
 *  - therefore there's no abstract "track()" or "publish()", instead, the
 *    individual "trackFooBar()" calls directly advise Piwik to track.
 *  - The server side Piwik system doesn't get _any_ customization, everything
 *    (including project-specific behaviors) ist controlled by the way the
 *    ajaxClient pushes the data into the analytics server (no more serverside maintenance hell)   
 *  - decision whether a goal is reached or not is done client-side for the normal cases to avoid 
 *    excessive server roundtrips (goals need to be configured as "manual" in the server). 
 *    Notable conceptual difference to old analytics: goals must not necessarily be a funnel.
 *    Because goals must not be a funnel, "conversion" is always relative to _all_ users,
 *    not relative to the the "usage" goal (goals are independent). You can segment "non bounces"
 *    to emulate the old way to calculate.
 *    
 *  See the longer comments in the source code below for more conceptual details.
 *  
 *  Piwik implicit / built-in goals that are not implemented manually here:
 *  - "Visit" (not a goal, "all data")
 *  - "Usage" (not a goal any more, this is the segment of users that are not bounces). 
 *            (deprecated because all Piwik goals are relative to visit and not custom hacked relative to usage goal 
 *             like we did in urchin)
 *  - ecommerce Transaction is a built-in concept, but for better overview we track a "Purchase" Goal nevertheless 
 *
 * NOTE: aufruf der Ergebnisliste wird doppelt getracked (einmal via Navi und dann als search result). 
 *      Schwer zu lösen wg. Architektur (navi wird beim klick vor serverroundtrip getracked, searchresults hinterher beim rendern der liste)
 *      Daher aktuell als nicht vermeidbar akzeptiert - erhöht natürlich die Anzahl "Pageviews" des Users wenn man Events mitzählt. 
 *      (Wenn man Events nicht mitzählt, ist es sogar gut so, weil dann die "emulation" einer konventionellen Website recht genau ist)
 *      
 * NOTE: aktuell wird die "Zielseite" des Klicks getracked (bzw. die aktuelle, wenn keine Änderung
 *      vom client getriggert. Das impliziert, dass der QF auch wirklich dahingeht und auch sonst 
 *      nicht unvorhergesehen an andere Orte verschickt. Da er das aber tut, müsste das tracking 
 *      auf Dauer so umprogrammiert werden, dass erst bei erhaltener server-Antwort getracked wird
 *      und man so die tatsächlich gezeigte Seite tracken kann. Ist architektonisch aber schwierig,
 *      weil es gegen das Grundkonzept vom Client und der API läuft.
 *      
 */

	// BUGS: siehe Sammelticket http://trac.excentos.lan/trac/xcTechnologies/ticket/1992
	
	///// FEATURE REQUESTS:
	
	// - Warum ist dieses Produkt so erfolgreich? -> Produkte Frageprofilen zuordnen
	// - Frage-Query-Auswertung auf bestimmte Facetten einschränken. Das wird aber nur via custom Data mit 
	//   einem custom Plugin möglich sein.  -> evtl. die Datenstruktur schon jetzt abliefern? 
		
/*
	piwik Verbesserungsideen an die community: 
	https://github.com/piwik/piwik/issues/created_by/nkuehn?state=open
	(das trac-projekt ist inzwischen nicht mehr in Gebrauch dort)

	BUG: man hat regelmäßig "no data for this report" meldungen beim aufklappen von bäumen; ist weg nach reload der ganzen seite

	Ideen für weitere Vorschläge:
	 * bessere Doku zu verwendung als AMD? -> codebeispiel?
	 * bei outgoing links per callback auch schnellere Antwort erlauben (TODO konkreteren Vorschlag machen)
	 * Hinweis, dass der onbeforeonload code im Firefox nicht verlässlich ist (TODO reproduzierbarkeit beschreiben)
*/

var urlNormalizer = document.documentElement.appendChild(document.createElement("a"));
return declare("excentos.tracking.Piwik", _TrackingImpl, {
	
	name: "piwik",
	
	// trackingServer: "piwik.excentos.com",  // default
	trackingServer: "p.excentos.com", // live: less susceptible to adblockers, privacy guards etc.
	
	// enginePath: "/piwik.js",  // default
    // enginePath: "/js/piwik.js",	// uncompressed default 
	enginePath: "/p.js", // live: less susceptible to adblockers, privacy guards etc.
	
	// trackerPath: "/piwik.php",
	trackerPath: "/p", // live: less susceptible to adblockers, privacy guards etc. (.php auto.appended on the server) 

	// scheme: "", // default: empty string would lead to URIs that use the scheme of the current document
	scheme: "https:", // the "piwik.excentos.com" server is available only via https

	globalPiwikName: "Piwik",
	globalPiwikActionsQueueName: "_paq",
	defaulPiwikSiteId: 2, //xcDevelopment Site

	visitTimeout:  1800, // 30 minutes in seconds (for session cookie)
	visitorTimeout: 63113851, //  2 years in seconds (for visitor cookie)
	
	referralAndLtcTimout: 15778463, // 6 months in seconds (for LTC Storage and referrer cookies)
	localStorageKey: "excentos.analytics", // if you change this, all future conversions are lost. You have been warned!
	
	kioskMode: false, // can be overridden via conf key "trackingKioskMode"
	kioskVisitTimeout: 300,  // 5 Minutes in seconds
	
	getEngineUri: function(){
		return this.scheme+"//"+this.trackingServer+this.enginePath;
	},
	
	getTrackerUri: function(){
		return this.scheme+"//"+this.trackingServer+this.trackerPath;
	},

	loadEngine: function(){
		return script.get(this.getEngineUri(), /*options*/ null, /*returnDeferred*/ true); //dojo.Deferred
	},
	
	constructor: function(){		
		// The piwik.js API is _not_ loaded via AMD but manually as a script tag because the tracking server
		//     can be offline and that should not stop the execution of the excentos application
		this.loadEngine().then(lang.hitch(this,"_bootstrap"));
	},

	_bootstrap: function(){
		var conf = this._getPiwikConfig();
		if (!conf.siteId) {
			console.warn('xc tracking site id not configured in Project ("application.clients.xcAjaxClient.config.piwikSiteId") - tracking disabled');
			return;	// never get _ready(), never track.
		}

		// shortcuts and tracker instance:
		this.piwik = window[this.globalPiwikName].getTracker(this.getTrackerUri(), conf.siteId);
		var piwik = this.piwik;
		conf.userId && piwik.setUserId(conf.userId);
		// remove the global Piwik object references again (we have our local reference here)
		// (JSON2 cannot be removed unfortunately because piwik adresses it via window object)
		// NOTE: fails in IE7, cant remove any properties from window
		try {
			window[this.globalPiwikName] = window[this.globalPiwikActionsQueueName] = null;
			delete window[this.globalPiwikName];
			delete window[this.globalPiwikActionsQueueName];
		} catch (exception) {
		}

		if (shared.store.getConfigByKey("trackingKioskMode") == "true") this.kioskMode = true;
		if (this.kioskMode && this._hasLocalStorage) {
			// restore last tracking action timestamp from storage:
			this._lastTracked = Number(localStorage.getItem(this.localStorageKey + ".lastevent"));
		}

		// add a custom appendix to the tracker request that controls the logfile usage
		// (value should be unique per customer contract as we need to be able to delete a customer's data after contract end)
		piwik.appendToTrackingUrl("logTo=" + this._getTrackingProject());

		// which domains are treated as "part of the website":
		// Our nonstandard requirement:
		//      No domain at all, but we need to set a value to stop the server from taking the current domain as default.
		// Previous approach:
		//      piwik.setDomains(["example.com"]); // -> http://de.wikipedia.org/wiki/Example.com
		// But:
		//      that doesn't really work as the piwik.js code of setDomains() always does "configHostsAlias.push(domainAlias);"
		//      in the end, e.g. always appends the current domain to the domains list and the code is cleanly capsuled.
		// New approach:
		//     misuse a loophole in the piwik.js code (doesn't consitently check for upper/lowercase of domains)
		//     and modify the referrer URL using a copy of the piwik.js code that uppercases the domain part:
		// BEGIN copy of piwik.js code
		var referrer = "";
		try {
			referrer = window.top.document.referrer;
		} catch (e) {
			if (window.parent) {
				try {
					referrer = window.parent.document.referrer;
				} catch (e2) {
					referrer = '';
				}
			}
		}
		if (referrer === '') {
			referrer = document.referrer;
		}
		// scheme : // [username [: password] @] hostname [: port] [/ [path] [? query] [# fragment]]
		var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)');
		var matches = e.exec(referrer);
		var referrerHost = matches ? matches[1] : referrer;
		// END copy of piwik.js code
		var patchedReferrer = referrer.replace(referrerHost, referrerHost.toUpperCase());
		piwik.setReferrerUrl(patchedReferrer);

		// set custom cookie prefix (piwik default is "_pk_")
		// changed to avoid collisions with customer's tracking
		piwik.setCookieNamePrefix("_xcpk_");

		// configure the domain scope of the cookies
		var cookieDomain = this._getCookieDomain();
		piwik.setCookieDomain(cookieDomain);

		// set cookie and referral timeouts
		piwik.setVisitorCookieTimeout(this.visitorTimeout);
		piwik.setSessionCookieTimeout(this.sessionTimeout);
		piwik.setReferralCookieTimeout(this.referralAndLtcTimout);

		// for the seldom case that a user is just looking at the tool for a long time
		// while moving the mouse we set a heartbeat that pings as long as the user
		// is not completely away (good for visit duration).
		piwik.setHeartBeatTimer(/*minimumVisit seconds*/ 60, /*heartBeatDelay seconds*/ 30);

		// Add xc-custom campaign parameter names to default list (keep reading out GA and Piwik default names, too)
		piwik.setCampaignNameKey(['xc_campaign', 'xc_source', 'xc_medium', 'pk_campaign', 'piwik_campaign', 'utm_campaign', 'utm_source', 'utm_medium']);
		piwik.setCampaignKeywordKey(['xc_term', 'pk_kwd', 'piwik_kwd', 'utm_term']);

		// set custom variables (mostly used for segmentation)
		// setCustomVariable(variableID, variableName, variableValue, scope [page|visit|event])
		// FYI: customVars können in der JS-instanz auch nachträglich wieder gelöscht werden (page und visit)
		// FYI: technisch sind maximal möglich auf der aktuellen Serverkonfiguration:
		//		10 im visit scope
		// 		10 im page scope
		// 		5 im Event scope
		//      (default-config in Piwik ist 5, aber seit Piwik 2.3.0 kann man das erhöhen und bei uns sind 10 eingestellt.
		// TODO: auf 9 reduzieren, ist. wg. Textsortierung übersichtlicher im UI
		// FYI: wenn man in dieselbe ID unterschiedliche "name" werte spielt, werden diese Strings auf
		//      separat im UI ausgewertet, d.h. praktisch kann man beliebig viele Custom Vars tracken,
		//      aber eben max. 10 auf einmal und ein bestimmter Variablenname muss auch immer in derselben ID stehen
		//      Da das Segmentierungs-UI aber über die IDs der variablen geht (autocomplete etc.) ist es empfehlenswerter,
		//      custom variable IDs nicht via name für mehrere Zwecke zu verwenden.

		// per-page/per-event #1: Application (Necessary for segmentation in the ecommerce and goal reports)
		//        ATTENTION: all per-page custom variables need to be set here and re-set in _resetEcommerceView()
		piwik.setCustomVariable('1', 'Application', this._getTrackingApp(), 'page');
		piwik.setCustomVariable('1', 'Application', this._getTrackingApp(), 'event');

		// FYI: please do not set per-page vars #2-5 (used by piwik ecommerce tracking), use an ID in the 6-10 space for special needs.
		//      Already used:
		//		per-page #6: Product Position on Interest
		//      per-page #7: Recommendation Type on Interest

		// per-visit #1: System (Market, Country etc)
		//    (you technically can't change that during a visit/session)
		piwik.setCustomVariable('1', 'System', this._getTrackingSystem(), 'visit');

		// per-visit #2: -- free (formerly application, but that broke the segmentation) --

		// per-visit #3: Locale (set explicitly as the user agent locale isn't worth a lot and as we sometimes use custom
		//    locales for advisor variants (e.g. "christmas language")
		//    (assumes you can't or don't switch the locale during a visit/session)
		piwik.setCustomVariable('3', 'Locale', this._getTrackingLocale(), 'visit');

		// per-visit #4: UI Theme (mostly important to do segmentation across mobile / instore / web / app channels)
		//    covers clients, too.  Important: other clients _must_ use identical variable name strings!
		//    (assumes you can't switch the theme/client during a visit/session (or at least assume it's a very rare event)
		piwik.setCustomVariable('4', 'Theme / Client', this._getTrackingTheme(), 'visit');

		// per-visit #5: for A/B Testing: "Content Version"
		//    if available and not "default", "Content Version" (conf key "project.version"),
		//    otherwise
		//    The name "Content Version" is taken from Google Analytics (de-facto standard)
		var pv = this._getProjectVersion();
		pv = pv ? pv : "default";
		piwik.setCustomVariable('5', 'Content Version', pv, 'visit');

		// per-visit #6: for after-the-fact A/B Testing: "Project Revision"
		//    contains the project SCM revision (should be auto-set by build process)
		var pr = this._getProjectRevision();
		if (pr && pr != "SET_FROM_ANT") {
			piwik.setCustomVariable('6', 'Content Revision', pr, 'visit');
		}

		// Update LTC product interest store (housekeeping)
		this._updateConversionStorage();

		this._ready(); // triggers pending track requests that xcAjaxClient has accumulated
		// not using _init() at all.
	},

	_init: function(){
		//	summary:
		//		initializes the engine (not necessary here, done in the constructor)
		//      overrides default to avoid "ready" being set automatically
		//	tags:
		//		override
	},
	
	_reset: function(){
		//	summary:
		//		empty override. 
		//      in this tracker implementation the Methods do their necessary resets individually.
	},
	
	_publish: function(){
		/* DOCUMENTATION ONLY (overrides empty function with empty function)
		 * 
		 * Pattern hier: nicht separat publishen, wird direkt in den Methoden gemacht.
		 * also leer  
		 *  
		 * aufrufe, bei denen piwik.js eine action abschickt:
		 * -> alle die mit "track" beginnen (und "processLink" dazu)
		 * d.h. in jeder "track"Methode hier muss am Ende ein "track*" Aufruf an der piwik-API stehen. 
		 * 
		 * -> alle die mit "set" beginnen müssen vorher durchgeführt worden sein. 		 * 
		 */
	},
	
	/* begin helper functions */
	
	_lastTracked : 0, // timestamp of last tracking event (default: a very very long time ago) for Kiosk mode	
	
	_prepare: function(forceNewSession){
		if( (this.kioskMode && (this._lastTracked + this.kioskVisitTimeout*1000 < Date.now())) || forceNewSession == true ){
			// reset session  http://piwik.org/faq/how-to/#faq_187
			//      new_visit_api_requires_admin=0  (required config on the server for this)
			//      _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
			//      _paq.push(["deleteCookies"]); // (2) deletes existing tracking cookies to start the new visit
			console.log("kiosk visitor timed out, starting new tracking session.");
			this.piwik.appendToTrackingUrl("logTo="+this._getTrackingProject()+"&new_visit=1");
			this.piwik.deleteCookies(); // in kiosk apps it's okay to emulate "a completely new user" instead of "same user, new session" 
		}
		this._lastTracked = Date.now();
		if(this._hasLocalStorage) localStorage.setItem(this.localStorageKey+".lastevent",this._lastTracked.toString());
	},
	
	_finish: function(){
		// restore url postfix to default:
		this.piwik.appendToTrackingUrl("logTo="+this._getTrackingProject());
	},
	
	_formatGroupPath: function(groupName){
		var readableGroupName = function(matchStr, separator, singleChar, index, string){
			//replace the separator "." with " - "   and separator "_" with " "
			var newSeparator = "";
			if(separator == "."){
				newSeparator = " - ";
			}
			if(separator == "_"){
				newSeparator = " ";
			}

			//the first character after the separator should be transformed to upperCase
			return newSeparator + singleChar.toUpperCase();
		};

		// (match the beginning of the string OR a separator like "." or "_") AND capture the following character
		var matchSeparatorAndCharacter = /(^|[\._])(.)/g;
		return groupName.replace(matchSeparatorAndCharacter, readableGroupName);
	},

	_getTrackingGroupName: function(/*String*/ groupName){
		//	summary:
		//		a modification of the inherited method that formats the value
		if(groupName.indexOf("xcAjaxClient.") === 0){
			groupName = groupName.substr(13);
		}
		return this._formatGroupPath(groupName);
	},
	
	_getFormattedCurrentStage: function(stageId){
		return "/"+this._formatGroupPath(this._getTrackingCurrentStage());
	},
	
	_trackPageView: function(/*String*/actionPath, /*optional String*/uiLocation){
		// Wrapper for default piwik usage.
		// If uiLocation (the page that results of the click) is not given, 
		// the current stage in view is taken automatically. 

		// sowohl page title als auch URL werden als Baum browsebar dargestellt im UI (forwardslash). 
		// Feature heisst "categories".  über die piwik serverconfig  "action_title_category_delimiter"  
		// kann slash durch etwas anderes ersetzt werden (z.B. den Punkt, doppelpunkt etc.. Machen wir aber nicht.
		// Das "Transitions" visualisierungsfeature (funnel) gibt es sowohl für pagetitles als auch für pages.
		// Im Ggs. zum urchin-analytics tracken wir hier nur noch den "langen Pfad" 
		// ("flat list" kann dynamisch in jedem Report angezeigt werden in piwik und piwik zeigt auch Aggregate für categories)
		// "pages" (=url) haben "entry" und "exit", "page title" nur seinen eigenen Baum 
		// -> wir verwenden "pages" für die current Stage, fühlt sich auch natürlicher an für die 
		//    Kunden und bildet den inhaltlichen Sinn der "exit pages" und "entry pages" reports besser ab. 
		//
		// FYI: piwik setzt die domain automatisch vor die URL, solange "setDomains" in der init korrekt ist
		//      werden die im UI aber nicht sichtbar.

		if(uiLocation){
			uiLocation = "/"+this._getTrackingApp()+"/"+uiLocation;
		}else{
			uiLocation = "/"+this._getTrackingApp()+this._getFormattedCurrentStage();
		}
	    this.piwik.setCustomUrl(uiLocation); 
	    this.piwik.setDocumentTitle(this._getTrackingApp()+"/"+actionPath);
	    // trackPageView: function (customTitle, customData)
	    // ("customData" kann beliebiges JSON sein, dass man mit einem custom Serverplugin auswerten kann)
	    // ("customTitle" schon oben über "setDocumentTitle" erledigt)
	    this._prepare();
	    this.piwik.trackPageView();
	    this._finish();
	},
	
	_trackEvent: function(/*String*/ category, /*String*/ action, /*String*/ name, /*Number*/ value){
		this._prepare();
		this.piwik.trackEvent(/*String*/ category, /*String*/ action, /*String*/ name, /*Number*/ value);
		this._finish();
	},
		
	_trackExternalLink: function(url, actionPath){
		this._trackLink(url, actionPath, "link");
	},
	
	_trackDownload: function(url, actionPath){
		this._trackLink(url, actionPath, "download");
	},

	_trackLink: function(url, actionPath, type){
		// FYI: out-links _müssen_ eine voll qualifizierte URL sein, die zudem nicht
		//      eine Domain hat, die auf dem piwik-server als domain der website konfiguriert is. 
		//      -> wir setzen "example.com" als domain in den Profilen.
		// FYI: outlinks und downloads erscheinen nicht separat in den Aktionsbäumen (pages und page titles), 
		//      sind im "Transitions" feature aber klar abgegrenzt
		this.piwik.setCustomUrl("/"+this._getTrackingApp()+this._getFormattedCurrentStage());
		this.piwik.setDocumentTitle(this._getTrackingApp()+"/"+actionPath); // obsolete when "trackLink" is used?
		this._prepare();

		//Piwik ignores "outgoing" links that are not classified as URI / absolute URL - so we have to change the url to an absolute one
		//NOTE we are using an <A> element to normalize href attribute value

		urlNormalizer.href = url;
		//for sure IE7 wont normalize...
		//if url is neither something like"mailto:testmail@test.com"  nor  "//testpage.com/"
		if(!/[a-z0-9]+:/.test(urlNormalizer.href)  && !/\/\//.test(urlNormalizer.href)){
			urlNormalizer.href = location.protocol + "//" +location.host + "/" + url.replace(/^\//,"");
		}
		this.piwik.trackLink(urlNormalizer.href, type /*, mixed customData*/);

		this._finish();
	},

	_getTrackingProductData: function(productId){
		// IMPORTANT: 
		// 1. Be very careful when changing this data structure, it's the LTC tracking storage content
		// 2. Don't add stuff that's not needed (again, this is persisted on the client)
		if(typeof productId != "string" && typeof productId != "number"){
			console.warn("Piwik tracker: no String or Number product ID given to _getTrackingProductData");
			return false;
		}
		var recommendation = shared.store.getRecommendationByProductId(productId) || {};
		var product = shared.store.getProductById(productId);
		if(!product){
			console.warn("Piwik tracker: could not find product in store for given product ID "+productId);
			return false;
		}
		var p = {};
		p.SKU = product.customerProductId || product.id; // master key for LTC
		p.variantsGroup = product.customerVariantsGroupId || product.variantsGroupId; // important for LTC mapping
		p.manufacturer = product.manufacturer || ""; // for ecommerce reports
		p.name = product.label; // for ecommerce reports
		p.price = parseFloat(product.price); // for ecommerce reports
		p.recType = "type" in recommendation ? recommendation.type : ""; // to be used later in LTC (do people buy only perfect matches or not?)
		p.recRank = "position" in recommendation ? ((recommendation.position + 1) + "") : ""; // for custom var "product position on interest"
		// p.recCount = shared.store.getRecommendations().count + ""; // currently unused
		p.detailsPageUrl = product.detailsPageUrl; // for external link tracking
		return p;
	},

	_getProductStringRepresentation: function(/*String*/ xcProductId){
		var p = this._getTrackingProductData(xcProductId) || {};
		return p.name || p.detailsPageUrl || p.SKU || xcProductId;
	},
	
	_setEcommerceView: function(p){
		// sets data for product interest tracking
		var pname = p.name; 
		if(p.name.indexOf(p.manufacturer) != 0){ // add manufacturer if not part of product name
			pname = p.manufacturer + " : " + p.name;
		}
		// FYI: "piwik.setEcommerceView" sets the custom page vars 2-5. 
		//      Do not use them for other purposes (see documentation in the head of this file)
		this.piwik.setEcommerceView(p.SKU, pname, this._getTrackingApp(), p.price);
		// As our Piwik is configured for 10 custom variables we use No 6 and 7 for interesting additional info:
		if(p.recRank) this.piwik.setCustomVariable('6','Product Position on Interest',p.recRank, 'page');
		if(p.recType) this.piwik.setCustomVariable('7','Recommendation Type on Interest',p.recType, 'page');
		// return a path for the actual action:
		return pname;
	},
	
	_resetEcommerceView: function(){
		// "_setEcommerceView" uses these custom vars, so delete them for subsequent requests
		// FYI: it's by piwik.js design that a deleted variable is not removed but only set to empty string values. 
		for(var i=2;i<=7;i++){
			this.piwik.deleteCustomVariable(i, "page");
		}
	},

	_getPiwikConfig: function(){
		var debug = /xcDebug|xcClientUrl/.test(location.href);
		var userId = (location.href.match(/xcVisitorId=([^&$]+)/) || [])[1] || util.getVisitorId();
		return {
			siteId: debug ? this.defaulPiwikSiteId : util.castValueToType(shared.store.getConfigByKey("piwikSiteId"), "number"),
			userId: userId
		}
	},
	
	_hasLocalStorage : (typeof window.localStorage != 'undefined'), // just a static shortcut
	_getStorageData: function(){
		var value,
			data,
			initialData = {// empty data structure scaffolding
			metaData: {
				// this is just an assumption of what may theoretically be customer-dependent.
				referralAndLtcTimout: this.referralAndLtcTimout, // may differ between customers
				piwikSiteId: this._getPiwikConfig().siteId, // to be independent of the domain name
				projectId: this._getTrackingProject(), // for "logTo" url appendix
				dataFormatVersion: 1  // to be able to auto-migrate icompatiple changes if necessary
			},
			productsWithInterest: {} // a map of SKU->product info object
			// FYI: you can _only_ extend this data structure! Never change existing things!
		}; 
		if(this._hasLocalStorage){
			value = localStorage.getItem(this.localStorageKey); 
			if(!value){
				data = initialData;
				this._setStorageData(data);
				return data;
			}else{
				data = JSON.parse(value);
				data.metaData = initialData.metaData; // "brute force update" metaData
				return data;
			}
		}else{
			return initialData;
		}
	},
	
	_setStorageData: function(data){
		if(this._hasLocalStorage){
			return localStorage.setItem(this.localStorageKey, JSON.stringify(data));
		}
	},
	
	_updateConversionStorage: function(){
		// adjusts timestamps, kicks out old products etc., initializes the datastructure so other code can rely on it)
		var data = this._getStorageData();
		var prods = data.productsWithInterest;
		var oldestAllowed = (new Date().getTime() / 1000) - (this.referralAndLtcTimout);
		for (var sku in prods) {
			if (prods.hasOwnProperty(sku) && prods[sku].lastInterestTime < oldestAllowed) {
				delete prods[sku]; // on objects with properties this is okay. Don't use on arrays!
			}
		}
		this._setStorageData(data);
	},

	_addProductToConversionStorage: function(p){
		// FYI: Diese Implementierung setzt auf localstorage und JSON, d.h. ist nicht voll abwärtskompatibel 
		//      in localStorage verlieren wir die IE7 user (stand 1/2014 1,2%), JSON hat IE8 nur im Standardsmode
		//      aber beim Schreiben haben wir dojo und beim check, ob das Produkt gesetzt ist reicht ein regulärer Ausdruck
		//      (beim Auslesen der eigentlichen Produktdaten ist wieder das piwik.js Skript geladen, das eine eigene JSON 
		//      implementierung enthält. 
		//      http://caniuse.com/namevalue-storage   http://caniuse.com/json
		//      Vorteil ggü Cookies: 1. wir spammen nicht den Netzverkehr der gesamten Website 2. wir können quasi beliebig viele
		//      Daten ablegen zu jedem Produkt. 3. wir können 
		// FYI: Din weiterer Nebeneffekt ist, dass die Produkt-Tags nur in der ursprünglichen Subdomain verfügbar sind. 
		//      Das ist aber tolerierbar, trifft v.a. bzgl. der Mobil-sites auf und da ist es kein Problem, da der 
		//      die selben User genutzte Browser-Gerät Kombi immer abweicht. 
		// Strategie Datenstruktur:  
		//      - ein storage-key für alle apps. Letztlich werden immer alle geprüft und die app kann auch 
		//        Eigenschaft des Produktobjektes sein.
		//      - ein storage-key für alle Produkte, darin eine Map SKU->Produktobjekt. 
		//      Vorteil ggü einem storage-key pro Produkt: 
		//       1. Regexp auf der Kaufbestätigungsseite einfacher 
		//       2. Wir spammen nicht den Keyspace der Localstorage unserer Kunden
		//       3. Nur eine Schreiboperation beim update der Trackingdaten. 
		var data = this._getStorageData();
		p.lastInterestTime = new Date().getTime();
		// add / replace the SKU;
		data.productsWithInterest[p.SKU] = p;
		this._setStorageData(data);
	},
		
	_trackProductInterest: function(id, path){
		var p = this._getTrackingProductData(id);
		if(!p)return;
		// watch the order!
		this._setEcommerceView(p);
		this._trackPageView(path); // _prepare und _finish are done here
		this._resetEcommerceView();
		this.trackGoalStandard("Interest");	
		this._addProductToConversionStorage(p);		
	},
	_trackProductInterestEvent: function(id, eventCategory, eventName, eventValue){
		var p = this._getTrackingProductData(id);
		if(!p)return;
		// watch the order!
		this._setEcommerceView(p);
		this._prepare();
		this.piwik.trackEvent(this._getTrackingApp()+"/"+eventCategory, eventName, eventValue);
		this._finish();
		this._resetEcommerceView();
		this.trackGoalStandard("Interest");	
		this._addProductToConversionStorage(p);
	},
	
	_goals: { // map of goals to ids 
		// "Usage" goal is deprecated towards "non-bouncing visitors" reporting to get standard conversion logic
		// "ProductsShown" wird im UI als "recommendations shown" benannt (http://trac.excentos.lan/trac/xcTechnologies/wiki/Analytics/PiwikSiteAnlegen)
		"ProductsShown": 1,
		"Interest":2,
		"Success":3,
		"Purchase":4
	},
	_goalIds: { // the matching reverse index
		1:"ProductsShown",
		2:"Interest", 
		3:"Success",
		4:"Purchase"
	},
	_goalsTracked: {},
	
	_loadTracked: false,
	
	/* end helper functions - begin exernal API */
	
	trackLoad: function(loadDuration){
		//	loadDuration: String
		//		Seconds as formatted floating point number with one position 
		//      after decimal point (ex. "1.6").
				
		var loadMs = parseFloat(loadDuration)*1000;
	    this.piwik.setGenerationTimeMs(loadMs);
	    
	    // set a "product category page viewed" tag
	    // FYI: disabled for now due to weird "category business value" values and no helpful report in the UI
	    // this.piwik.setEcommerceView(false, false, this._getTrackingApp());
	    
		// don't really track in Kiosk mode as Kiosks call and periodically refresh the app without user interaction 
		if(!this.kioskMode){
		    // not appending session ID any more, was database schema misuse and never used
		    this._trackPageView("load");
		}
	    this._loadTracked = true;
	    
	    // FYI: disabled for now (see above)
	    // this._resetEcommerceView(); 
	    
	    // all following "inside ajax" requests shouldn't track load time
	    // (makes no sense there in the way piwik calculates it and we don't have sensible time data yet in xcAjaxClient)
	    this.piwik.disablePerformanceTracking();
	},
	
	trackRestart: function(){
		this._trackPageView("reset/restart");
	},
	
	trackGoalStandard: function(goalName){
		gid = this._goals[goalName];
		if(!gid) return;
		// once per page instance is enough as default behavior
		// Success and Purchase are XC-specified as "can occur multiple times in a visit"
		//         and must be configured this way on the server, too. 
		//        (for success, this doesn't matter here because exit to product details is mapped server-side)
		if(!(gid in this._goalsTracked) || gid == 3){
			this._prepare();
			this.piwik.trackGoal(gid);
			this._finish();
			this._goalsTracked[gid] = true;
		}
	},
	
	// for project specific goals, 
	trackGoalCustom: function(/*Integer*/gid){
		if(gid > 4){
			if(!(gid in this._goalsTracked)){
				this._prepare();
				this.piwik.trackGoal(gid);
				this._finish();
				this._goalsTracked[gid] = true;				
			}
		}
	},
	
	trackAnswer: function(/*String*/ facetName, /*String*/ facetInGroupName, /*String*/ value){
		var readableFacetName = facetName.replace(/_/g, " ");
		var readableValue = value.replace(/_/g, " ");
	    	    
	    // VARIANT A: tracking via regular "action" to see the user preferences in the "Page Title" Tree view
		// (disabled in favor of using events for the user preference clicks so that the "pages" in the repors are actual stages)
		// var actionPath = "answer/" + readableFacetName + "/" + readableValue;
		// this._trackPageView(actionPath);
	    
	    // VARIANT B: Tracking user preferences via events
		//  (Grund: Events haben eine klare item:value paarung und wir trennen Navigation von Suche)
		//  Event API: trackEvent (/*String*/ category, /*String*/ action, /*String*/ name, /*Number*/ value)
		
		// FYI: we're not using the number Value because it's summed up in the UI and that's not the point here 
		//var numberValue = parseFloat(value);
	    //if(numberValue){
	    //	this.piwik.trackEvent(this._getTrackingApp()+" / selection",readableFacetName,readableFacetName+" = "+readableValue,numberValue);
	    //}else{
		    this._trackEvent(this._getTrackingApp()+"/selection",readableFacetName,readableFacetName+" = "+readableValue);
	    //}
	},
	 
	trackAnswerSelectAll: function(/*String*/ facetName){
		var readableFacetName = facetName.replace(/_/g, " ");
		// this._trackPageView("selectAll/" + readableFacetName);
		this._trackEvent(this._getTrackingApp()+"/selection",readableFacetName,readableFacetName+" = ALL");
	},
	
	trackAnswerUnset: function(/*String*/ facetName, /*String stateName*/ stateName){
		// if state is not given, assume that the facet is reset completely (backwards compatible behavior)
		if(stateName == undefined || stateName == "" || typeof stateName === "function" ) stateName = "RESET ALL";
		var readableFacetName = facetName.replace(/_/g, " ");
		// this._trackPageView("answerUnset/" + readableFacetName);
		this._trackEvent(this._getTrackingApp()+"/selection reset", readableFacetName, readableFacetName+" = "+stateName);
	},
	
	// "trackRecommendationList":
	// NEW tracking method especially for piwik's "Search Results" Tracking.
	// this method is an exception to the rule as it does not match a User Click but
	// a system respose. Its Intent is to learn which queries are frequently
	// used and which of them do not find matching products.
	// This method should not be bound to recommendations being returned by
	// the server or "previews" of the recommendations being displayed
	// but it should be called when the "main" recommendation view is displayed
	// or updated (which probably needs to be implemented or at least configured on a per-project basis).
	trackRecommendationList: function(){
		// track only after load (preliminary hack to prevent tracking this on  "back from product page" 
		if(!this._loadTracked) return;  // eventuell unzuverlässig, -> beobachten
		
		var queryProfile = this._getTrackingQueryProfile();
		var numResults = shared.store.getRecommendations().perfectMatchCount;		
		this.piwik.setCustomUrl("/"+this._getTrackingApp()+this._getFormattedCurrentStage());
		// FYI: document title muss nicht gesetzt werden, wird ohnehin nicht übertragen beim "search" event
		this._prepare();
		this.piwik.trackSiteSearch(queryProfile, this._getTrackingApp(), numResults);
		this._finish();
		this.trackGoalStandard("ProductsShown");
	},
	
	trackNavigateTo: function(/*String*/ groupName){
		groupName = this._getTrackingStageForGroup(groupName);
		this._trackPageView("navigate/questionGroup/to/"+this._getTrackingGroupName(groupName), this._getTrackingGroupName(groupName)); 		
	},
	
	trackNavigateBrowserhistoryTo: function(/*String*/ groupName){
		groupName = this._getTrackingStageForGroup(groupName);
		this._trackPageView("navigate/browserHistory/to/"+this._getTrackingGroupName(groupName), this._getTrackingGroupName(groupName));
	},
	
	trackNavigateNext: function(){
		this._trackPageView("navigate/questionGroup/next/"+this._getTrackingNextStage(), this._getTrackingNextStage()); 		
	},
	
	trackNavigatePrevious: function(){
		this._trackPageView("navigate/questionGroup/previous/"+this._getTrackingPreviousStage(), this._getTrackingPreviousStage());
	},
	
	trackGroupHide: function(/*String*/ groupName){
		// FYI: event deprecated. Too many collapse/expand trackings that spam statistics. 
		// this._trackPageView("navigate/questionGroup/hide/"+this._getTrackingGroupName(groupName));
	},
	
	trackGroupShow: function(/*String*/ groupName){
		// FYI: event deprecated. Too many collapse/expand trackings that spam statistics. 
		// this._trackPageView("navigate/questionGroup/show/"+this._getTrackingGroupName(groupName));
	},
	
	trackNavigateApplicationNext: function(/*String*/ appName, /*Function?*/ onTracked){
		// whatever this is for...
		this._trackPageView("navigate/application/next/"+this._getTrackingApp(appName));
	},
	
	trackNavigateApplicationPrevious: function(/*String*/ appName, /*Function?*/ onTracked){
		// whatever this is for...
		this._trackPageView("navigate/application/previous/"+this._getTrackingApp(appName));
	},
	
	trackGotoProductDetails: function(/*String*/ id, /*Function*/ onTracked){
		var p = this._getTrackingProductData(id);
		if(!p)return;
		var prodPath = this._setEcommerceView(p); // set product vars
		this._addProductToConversionStorage(p);

		this._trackExternalLink(p.detailsPageUrl, "goTo/productDetails/"+prodPath); 
		this._resetEcommerceView(); // clear product vars
		// FYI: the success goal must be mapped serverside, sending two requests is too slow and too unreliable on leaving the page
	},

	trackGotoDealerFinder: function(/*String*/ id, /*Function*/ onTracked){
		var p = this._getTrackingProductData(id);
		if(!p)return;
		var prodPath = this._setEcommerceView(p); // set product vars
		this._addProductToConversionStorage(p);

		this._trackExternalLink(p.detailsPageUrl, "goTo/productDetails/"+prodPath);
		this._resetEcommerceView(); // clear product vars
	},
		
	trackShowProductReasons: function(/*String*/ id){
		// (currently unused as there's no expandable reasoning yet)
		// this._trackProductInterest(id, "show/productReasons");
		this._trackProductInterestEvent(id, "reasons", "show", this._getProductStringRepresentation(id));
	},
	
	trackShowLargeImage: function(/*String*/ id){
		// this._trackProductInterest(id, "show/productImage");		
		this._trackProductInterestEvent(id, "product image", "show large", this._getProductStringRepresentation(id));
	},
	
	trackShowImageZoom: function(/*String*/ id){
		// this._trackProductInterest(id, "show/productImageZoom");
		this._trackProductInterestEvent(id, "product image", "show zoom", this._getProductStringRepresentation(id));
	},
	
	trackShowPdfProductDetails: function(/*String*/ id){
		var p = this._getTrackingProductData(id);
		if(!p)return;

		var prodPath = this._setEcommerceView(p);
		var actionPath = "/show/PDF/productDetails"+prodPath; // afaik not visible in the UI

		// we need to mimic a real URL, otherwise the data doesn't show up:
		this._trackDownload("http://"+this._getTrackingApp()+" single Product PDF/"+prodPath, actionPath);
		this._resetEcommerceView();
		
		this._addProductToConversionStorage(p);
	    
		this.trackGoalStandard("Interest"); 
	    this.trackGoalStandard("Success");
	},

	trackShowProductDetails: function(/*String*/ id){
		var p = this._getTrackingProductData(id);
		if(!p)return;

		var prodPath = this._setEcommerceView(p);
		this._addProductToConversionStorage(p);

		this._trackProductInterest(id, "show/productDetails");

		this._resetEcommerceView();

		this.trackGoalStandard("Interest");
	},

	trackPurchase: function(/*String*/ id){
		var p = this._getTrackingProductData(id);
		if(!p)return;

		var prodPath = this._setEcommerceView(p);
		this._resetEcommerceView();

		this._addProductToConversionStorage(p);

		this.trackGoalStandard("Interest");
		this.trackGoalStandard("Success");
		this.trackGoalStandard("Purchase");
	},
	
	trackComparisonAdd: function(/*String*/ id){
		this._trackProductInterestEvent(id, "comparison", "add", this._getProductStringRepresentation(id));
	},
	
	trackComparisonRemove: function(/*String*/ id){
		// this._trackProductInterest(id, "comparison/remove");
		this._trackProductInterestEvent(id, "comparison", "remove", this._getProductStringRepresentation(id));
	},
	
	trackComparisonShowComparisonTable: function(){
		this._trackPageView("comparison/showComparisonTable", "Comparison Table");
	},
	
	trackNavigate: function(/*String*/ to){
		this._trackPageView("navigate/" + this._formatGroupPath(to), this._formatGroupPath(to)); 		
	},
	
	trackRecommendationsNext: function(pageNumber){
		this._trackPageView("navigate/productlist/page_forward/"+pageNumber);
	},
	
	trackRecommendationsPrevious: function(pageNumber){
		this._trackPageView("navigate/productlist/page_back/"+pageNumber);
	}
	
}); // end declare function

}); // end define function
