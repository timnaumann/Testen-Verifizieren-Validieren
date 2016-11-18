define([
	"./CustomerBackendMixin",
	"./ErrorManager",
	"./image/Preloader"/*NMD:Ignore*/, /*implicit module declaration*/
	"./image/registry",
	"./rpc/ProfilerAPIError",
	"./shared",
    "./tracking/Tracker",
	"./util",
	"./widget/ApplicationPane",
	"./widget/Dialog",
	"./widget/error/ErrorContent",
	"./widget/facetgroup/wizard/Wizard",
	"./widget/OverlayBox"/*NMD:Ignore*/, /*implicit module declaration*/
	"./widget/recommendation/Recommendations",
	"./widget/registry",
	"dijit/registry",
	"dojo/_base/array",
	"dojo/_base/connect",
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/cookie",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/promise/all",
	"dojo/ready",
	"excentos/aspect",
	"require"
], function(CustomerBackendMixin, ErrorManager, Preloader, imageRegistry, ProfilerAPIError, shared, tracker, util, ApplicationPane, Dialog, ErrorContent, Wizard, OverlayBox, Recommendations, xcRegistry, registry, array, connect, declare, kernel, lang, win, cookie, dom, domClass, domConstruct, promiseAll, ready, aspect, require){
	
return declare("excentos.Behavior", CustomerBackendMixin, {

	//	summary:
	//		This is an abstract class that is specialized by concrete behaviors. A behavior is how the UI is wired
	//		together. NOTE: This has nothing to do with dojo.behavior.
	
	init: function(){
		if(xcInitial.development && (xcInitial.development.showDevelopmentDashboard || cookie("xcShowDevelopmentDashboard") == "true")){
			ready(lang.hitch(this,function(){
				this.initDevelopmentDashboard();
			}));
		}
		this._initErrorManager();
	},
	
	initPreloader: function(){
		//FIXME: This is more "load control" than real preloading - yet we aren't able to preload images as the loading would block every(!) other script
		var currentStage = shared.store.getFacetGroupVars().currentStageInView;
		var preloader = util.$("image.Preloader").getInstance();
		
		var theme = util.getCurrentTheme(); var imgs = theme.preloadImages;
		for(var name in imgs){
			preloader.add(name, imgs[name]);
		}
		preloader.loadStatic("standard");
		preloader.loadStatic(currentStage);
		//preloader.loadDynamic(currentStage);  can't be used really - the plain url from config is of no use: images are being resized due to template variables; connect image/registry and Prelaoder
	},
	
	_initErrorManager: function(){
		this.errorManager = new ErrorManager();
	},
	
	onInitDone: function(){
		//summary:
		// called from init.js
		domClass.replace(document.documentElement, "xc_init_done", "xc_init_running");
		shared.initDone = true;
	},
	
	_placeAtAsap: function(/*String*/ id, /*Widget*/ widget, /*String*/ position){
		var place = dom.byId(id);
		if(place){
			widget.placeAt(place, position);
			console.log("placed widget at node'"+id+"' immediately (no wait for ready)");
		}else{
			// if we want to optimize even further, we can register some event that notifies us of new nodes (watch the performance!)
			// ready() is the safe way. 
			ready(function(){
				var place2 = dom.byId(id);
				if(place2){
					widget.placeAt(place2, position);
					console.log("placed widget at node'"+id+"' on ready (node was not there on widget creation)");
				}else{
					console.warn("`excentos._Behavior::_placeAtAsap::ready()` widget '"+widget.id+"' could not be placed because node '#"+id+"' does not exist");
				}
			});
		}
/*
		var getNode = function(){return dom.byId(id);};
		
		//NOTE: maybe also add a fail condition (2nd parameter of promiseResult)
		return util.promiseResult(getNode).then(function(node){
			widget.placeAt(node);
		});
*/
	},
	
	initWizardApplication: function(){
		// Startup application widget that holds all the others.
		var ap = new ApplicationPane();
		var wizardFacetGroup = shared.store.getFacetRootGroup();
		var wizard = shared.widgetFactory.makeWidget(Wizard, {id: "xc_wizard", facetGroup: wizardFacetGroup});
		ap.addChild(wizard, null, "wizardNode");

		//NOTE: The real application placement requires that the node to place the widget in must be available.
		//		In real customer environments there are probably cases where the project.init() 
		//		is being executed before domContentLoaded event has fired and 
		//		thus the depending dom-elements aren't yet injected into the dom sctructure.
		//		This leads to the fact that neither the application nor the wizard will be instantiated 
		//      due to the lack of "xc_application_pane" div element
		//      Nevertheless, if it's there already we can place immediately (doesn't matter why it's there already)
		
		this._placeAtAsap("xc_application_pane", ap);/*.then(lang.hitch(this, "onInitDone"));*/

		return wizard;
	},

	initOffCanvasLayout: function(){

		// Startup application widget that holds all the others.
		this.rootWidget = shared.widgetFactory.makeWidget("facetgroup.Explorer", {facetGroup: shared.store.getFacetRootGroup()});
		//.excentos-listing > .category-filters > section#compare
		this._placeAtAsap("xc_application_pane", this.rootWidget, "first");


		//after appending the recommendations, which act as the main off-canvas-view div, add the next div for the view
		//which should be the right-off-canvas
		var handle = aspect.after(this, 'initRecommendationsWidget', lang.hitch(this, function(recommendationsWidget) {

			this.initComparisonWidget(recommendationsWidget.compareButtonNode, recommendationsWidget.comparisonListContainer,
				lang.hitch(this, this._initComparisonContainer)
			);

			handle.remove();
		}));
	},
	
	initRecommendationsWidget: function(){
		kernel.deprecated(
			"excentos._Behavior::initRecommendationsWidget is deprecated!",
			"Recommendations should be instantiated declaratively via templates and will probably conflict with `initRecommendationsWidget` approach",
			"1.6.x"
		);

		if(xcRegistry.byInstanceOf(Recommendations).length){
			return;
		}
		var recWidget = shared.widgetFactory.makeWidget(
			"recommendation.Recommendations",
			{id: "xc_recommendations"},
			document.createElement('div') // a non-positioned container
		);
		this._placeAtAsap("xc_recommendations", recWidget);

		return recWidget;
	},
	
	showDialog: function(/*dijit._Widget|DOMNode*/ content, /*Object?*/ mixinParams){
		var _params = lang.mixin({
			dialogClass: Dialog,
			id: "xc_dialog",
			duration: 1
		},mixinParams);

		var dialog = registry.byId(_params.id);
		if(!dialog){
			dialog = new _params.dialogClass(_params);
		}
		// Widget or DOMNode?
		if(content.domNode){
			// Set content only if content is a widget that is not already a child of the dialog.
			// Otherwise the widget will be destroyed and any connect etc will be lost. #1268
			if(!array.some(dialog.getChildren(), function(child){ return child == content; })){
				dialog.set("content", content.domNode);
			}
		}else{
			dialog.set("content", content);
		}
		return dialog.show();
	},
	
	hideDialog: function(/*String|Widget?*/ id){
		id = id || "xc_dialog";
		var widget = registry.byId(id);
		return widget && widget.hide();
	},
	
	showOverlayBox: function(/*dijit._Widget|DOMNode*/ content, /*Object?*/ mixinParams){
		var _params = lang.mixin({
			dialogClass: OverlayBox,
			id: "xc_overlaybox"
		},mixinParams);

		return this.showDialog(content, _params);
	},
	
	hideOverlayBox: function(/*String|Widget?*/ id){
		return this.hideDialog(id || "xc_overlaybox");
	},
	
	onError: function(type, errors){
		this.errorManager.onError(type, errors);
	},
	
	onRestart: function(){
		return shared.controller.callService("resetProfile", {
			getParams: {
				returns: ["facetGroupVars", "facetVars"]
			}
		});		
	},
	
	onPhaseButtonClick: function(facetGroupName, phaseButtonWidget){
		return this.moveToAccessibleStage(facetGroupName);
	},
	
	onStageInPathNavigationPreviousClick: function(){
		return this.moveToPreviousStageInPath();
	},
	
	onStageInPathNavigationNextClick: function(){
		return this.moveToNextStageInPath();
	},
	
	moveToNextStageInPath: function(){
		tracker.track("navigate.next");
		return shared.controller.callService("moveToNextStageInPath", {
			getParams: {
				returns: ["facetGroupVars"]
			}
		});
	},
	
	moveToPreviousStageInPath: function(){
		tracker.track("navigate.previous");
		return shared.controller.callService("moveToPreviousStageInPath", {
			getParams: {
				returns: ["facetGroupVars"]
			}
		});
	},

	moveToAccessibleStage: function(groupName){
		tracker.track("navigate.to", groupName);
		return shared.controller.callService("moveToAccessibleStage", {
			getParams: {
				returns: ["facetGroupVars"]
			},
			postParams: {
				groupName: groupName
			}
		});
	},
	
	setFacetValues: function(/*excentos.widget.facet.input._Input*/ widget){

		return shared.controller.callService("setFacetValues", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"]
			},
			postParams: {
				facetName: widget.facet.name,
				facetValues: widget.currentValue
			}
		});
	},

	setFacetValuesOnlyExplicit: function(/*excentos.widget.facet.input._Input*/ widget){

		return shared.controller.callService("setFacetValues", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"],
				resultsMode: "onlyExplicit"
			},
			postParams: {
				facetName: widget.facet.name,
				facetValues: widget.currentValue
			}
		});
	},

	setFacetUnanswered: function(/*excentos.widget.facet.input._Input*/ widget){
		return shared.controller.callService("setFacetUnanswered", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"]
			},
			postParams: {
				facetName: widget.facet.name
			}
		});
	},
	
	setAllFacetsInViewUnanswered: function(){
		return shared.controller.callService("setAllFacetsInViewUnanswered", {
			getParams: {},
			postParams: {}
		});
	},
	
	setAllFacetsUnanswered: function(){
		return shared.controller.callService("setProfileBySerialization", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"]
			},
			postParams: {
				queryProfileSerialization: ""
			}
		});
	},
	
	setFacetGroupExpanded: function(/*name*/ name, expanded){
		this.setExpanded("group", name, expanded);
	},
	
	setFacetInGroupExpanded: function(/*name*/ name, expanded){
		this.setExpanded("facet", name, expanded);
	},
	
	setExpanded: function(/*String*/ type, /*String*/ name, /*Boolean = true*/ expanded){
		if(expanded === undefined){expanded = true;}
		var SERVICEMETHOD_SETEXPANDED_BY_TYPE = {
			"facet": "setFacetInGroupExpanded",
			"group": "setFacetGroupExpanded"
		};

		var serviceMethod = SERVICEMETHOD_SETEXPANDED_BY_TYPE[type];

		var postParams = {};
		if(serviceMethod === SERVICEMETHOD_SETEXPANDED_BY_TYPE.facet){
			postParams =  {
				facetInGroupName: name,
				expanded: expanded+""
			}
		} else{
			postParams =  {

				groupName: name,
				expanded: expanded+""
			}
		}

		if(serviceMethod){
			return shared.controller.callService(serviceMethod, {
				getParams: {
					returns: ["facetGroupVars"],
					resultsMode: "onlyDefaults"
				},
				postParams: postParams,
				delay: 300
			});
		}
	},

	sendPostEvent: function(/*Object*/ eventParameters){
		return shared.controller.callService(
			"postEvent",
			{
				getParams: {},
				postParams: {
					event: eventParameters.eventName,
					eventParameters: eventParameters,
					eventPostAsync: false
				}
			}
		);
	},

	getRecommendations: function(){
		return shared.controller.callService("getData", {
			getParams: {
				returns: ["recommendations"]
			}
		});
	},

	getCrossSellingRecommendations: function(/*Array*/ products){
		if(!lang.isArray(products)){
			products = [products];
		}
		var deferred = shared.controller.callService("getData", {
			getParams: {
				returns: ["crossSellingRecommendations.crossSellingRecommendationItems"],
				resultsMode:"onlyExplicit",
				crossSellingReferenceProductIds: products
			}
		});

		return deferred && deferred.promise;
	},
	
	addProductsToComparison: function(/*Array|String*/ products){
		if(!lang.isArray(products)){
			products = [products];
		}
		var deferred = shared.controller.callService("addProductsToComparison", {
			getParams: {
				returns: ["comparisonList"],
				resultsMode: "onlyDefaults"
			},
			postParams: {
				productIds: products
			}
		});
		
		var i=products.length;
		while(i--)tracker.track("comparison.add", products[i]);
		return deferred;
	},
	removeProductsFromComparison: function(/*Array|String*/ products, /*Boolean?*/ returnComparisonTable){
		if(!lang.isArray(products)){
			products = [products];
		}
		var returns = ["comparisonList"];
		if(returnComparisonTable){
			returns.push("comparisonTable");
		}
		var deferred = shared.controller.callService("removeProductsFromComparison", {
			getParams: {
				returns: returns,
				resultsMode: "onlyDefaults"
			},
			postParams: {
				productIds: products
			}
		});
		var i=products.length;
		while(i--)tracker.track("comparison.remove", products[i]);
		return deferred;
	},
	getComparisonList: function(){
		return shared.controller.callService("getData", {
			getParams: {returns: ["comparisonList"],resultsMode:"onlyDefaults"}
		});
	},
	getComparisonTable: function(){		
		return shared.controller.callService("getData", {
			getParams: {returns: ["comparisonTable"],resultsMode:"onlyDefaults"}
		});
	},
	_initComparisonContainer: function() {

		!shared.comparisonContainer && (shared.comparisonContainer = shared.widgetFactory.makeWidget("ComparisonWrapper"));
		this._placeAtAsap("xc_application_pane", shared.comparisonContainer, "last");
	},

	initComparisonWidget: function(comparisonTrigger, comparisonListContainer, comparisonContainerInit){

		var comparisonWidget = shared.widgetFactory.makeWidget("ComparisonList", {
			triggerNode: comparisonTrigger
		});

		comparisonListContainer && comparisonWidget.placeAt(comparisonListContainer);

		comparisonContainerInit && comparisonContainerInit();
	},

	showComparisonTable: function(){

		!shared.comparisonContainer && (shared.comparisonContainer = shared.widgetFactory.makeWidget("ComparisonDialog"));
		shared.comparisonContainer.show();

		tracker.track("comparison.show.comparison.table");
	},

	hideComparisonTable: function(){

		shared.comparisonContainer && shared.comparisonContainer.hide();
	},
	
	// Methods called by controller.
	// Naming convention: onNewApp + ObjectType or onNew + ObjectType
	onNewMetaData: function(){
		var db = dijit.byId("xc_development_dashboard");
		if(db){
			db.refreshLogin();
		}
	},
	onNewAppFacetVars: function(appName){},
	onNewAppComparisonTable: function(appName){},
	onNewAppFacets: function(appName){},
	onNewAppComparisonList: function(appName){},
	onNewAppConfig: function(appName){},
	onNewAppRecommendations: function(appName){},
	onNewAppCrossSellingRecommendations: function(appName){},
	onNewAppClientI18n: function(appName){},
	onNewAppProducts: function(appName){},
	onNewAppFacetGroupVars: function(appName){},
	onNewAppMetaData: function(appName){},
	onNewAppFacetGroups: function(appName){},
	onResultsHandled: function(){},
	
	// Interceptor functions for specific service methods.
	// Naming convention: interceptServiceMethodName.
	// ex.
	//	|	interceptGetData: function(params){
	//	| 		//	summary:
	//	|		//		Interceptor method for the service call 'getData'.
	//	|		//	params:
	//	|		//		See excentos.Controller.callService().
	//	|		//	description:
	//	|		//		This interceptor may modify the given params which will be reflected in the service call.
	//	|		//		The service call will be canceled completely if this method returns false.
	//	|		if(!(params.getParams.returns && dojo.indexOf(params.getParams.returns, "facetVars") >= 0)){
	//	|			console.info("Call 'getData' intercepted for testing. Condition met that facetVars are not requested.");
	//	|			//return false;
	//	|		}
	//	|	},
	
	preloadLikelyImages: function(){
		// summary: 
		//		Default "smart" image preloading for the images of the current and next stage.
		//      Typically called in "onNewAppFacetGroupVars" in the project behavior.js
		// 		Avoiding duplicate preloads is handled by the image registry.
		//      Blocking the Transition etc. must be done in project specific code by using the deferred return by this function.
		var groupVars = shared.store.getFacetGroupVars();
		return promiseAll([
			imageRegistry.preloadApiWidget(groupVars.currentStageInView),	
			imageRegistry.preloadApiWidget(groupVars.nextStageInPath)
		]);
	},
	
	goToProductDetailsPage: function(/*Object*/ product){
		//	summary:
		//		Redirect the user to the product's detail page if any.
		if(product.detailsPageUrl){
			tracker.track("goto.product.details", product.id).then(function(){
				location.href = product.detailsPageUrl;
			});
		}else{
			console.warn("Tried to go to details page of product with ID '" + product.id + "' but there's no `detailsPageUrl'.");
		}
	},
	
	showPDF: function(documentType, productIds){
		//	summary:
		//		Open a PDF in a new window.
		//	
		//	documentType: String
		//		Links to a document type in the xcProfiler registry. E.g. `1in1ProductRecommendationDocument`.
		//	productIds: Array
		//		List of product IDs that should be displayed in the PDF.
		
		var store = shared.store,
			metaData = store.getMetaData(),
			url = "";
		
		// base URL
		url += xcInitial.serviceBaseUrl + xcInitial.masterApplicationName + "/";
		
		// filename
		var product = store.getProductById(productIds[0]);
		var productLabel = product.label;
		var filename = encodeURIComponent(productLabel.replace(/\s|\/|\*|\.|\!|\~|\'|\(|\)/g,""));
		url += filename + ".pdf";
		
		// session
		// TODO FireFox appends the parameter separated by the ";" to the filename. #1433
		url += ";jsessionid=" + store.getGlobalMetaDataByKey("sessionId");
		
		// documentType
		url += "?documentType=" + documentType;
		
		// product IDs
		url += "&productIds=" + productIds.join(",");
		
		// document key (hash to enable the server to cache PDFs)
		var randomString = ("" + (new Date().getTime()) + Math.random()).substr(0, 22);
		url += "&documentKey=" + randomString;
		
		// client URL
		var clientUrl = location.href;
		if(location.href.indexOf("#") === -1) clientUrl += "#";
		if(metaData.uiState) clientUrl += "&uiState=" + metaData.uiState;
		if(metaData.expandCollapseState) clientUrl += "&xcExpandCollapse=" + metaData.expandCollapseState;
		if(metaData.queryProfileSerialization.length > 2){  // Query profile serialization has an empty value of "$=".
			clientUrl += "&" + metaData.queryProfileSerialization;
		}
		url += "&clientURL=" + encodeURIComponent(clientUrl);
		
		// base URL
		var baseUrl = "";
		//add only if productDetailsPageUrl is relative
		if(product.detailsPageUrl.search(/^\w+\:\d*\/\//)==-1){
			baseUrl = clientUrl.match(/(.*?)\#/)[1].split("/").slice(0,-1).join("/")+"/";
		}
		url += "&baseURL=" + encodeURIComponent(baseUrl);
		
		window.open(url);
		
		if(documentType == "1in1ProductRecommendationDocument"){
			tracker.track("show.pdf.product.details", productIds[0]);
		}else{
			console.warn("No tracking implemented for that kind of PDF.");
		}
	},
	
	initDevelopmentDashboard: function(){
		var link = domConstruct.create("link", {id: "xc_development_dashboard_style", rel: "stylesheet", type: "text/css", href: require.toUrl("./css/development.css")}, document.getElementsByTagName("HEAD")[0]);
		var c = connect.connect(link, "onload", function(){
			var deps = ["./widget/development/Dashboard"];
			require(deps, function(Dashboard){
				var db = new Dashboard({id: "xc_development_dashboard"}).placeAt(win.body());
				db.startup();
				db.connect(shared.behavior, "onNewAppFacetGroupVars", "refresh");
			});
			connect.disconnect(c);
		});
	},
	
	showError: function(err){
		var isProfilerError = err instanceof ProfilerAPIError,
			isNativeError = Object.prototype.toString.call(err) == "[object Error]",
			isError = isProfilerError || isNativeError,
			errorWidget;
		
		if(isError){
			errorWidget = shared.widgetFactory.makeWidget(ErrorContent,{error:err});
			this.showDialog(errorWidget);
		}
	}
});



});
