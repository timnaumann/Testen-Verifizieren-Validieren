define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./_TrackingImpl",
	"../shared"
], function(declare, lang, _TrackingImpl, shared){

return declare("excentos.tracking.Excentos", _TrackingImpl, {
	
	name: "excentos",
	
	engineUri: location.protocol + "//analytics.excentos.de/log/trackingEngine.js",
	
	constructor: function(){		
		try{
			require([this.engineUri], lang.hitch(this, function(xcTrackingEngine){
				//	merging engine in the excentos.tracking.engine's defaults
				this.engine	= lang.mixin(xcTrackingEngine, this.engine);
				this._ready();
			}));
		}catch(e){
			console.warn(e);
		}
	},
	
	_init: function(){
		//	summary:
		//		initializes the engine with static data
		//	tags:
		//		override
		var pr = this._getProjectRevision();
		var pv = this._getProjectVersion();
		lang.mixin(this.engine, {
			system: this._getTrackingSystem(),
			theme: this._getTrackingTheme(),
			appName: this._getTrackingApp(),
			sessionId: this._getTrackingSession(),
			project: this._getTrackingProject(),
			locale: this._getTrackingLocale(),
			client: 'xcAjaxClient',
			projectRevision: pr, // unused
			uiVersion: (pv && (pv != "default")) ? pv : pr, // used as "_content" tag for A/B testing
			onTracked: function(src){}
		});
	},
	
	_reset: function(){
		//	summary:
		//		see excentos/tracking/_TrackingImpl._reset()
		lang.mixin(this.engine, {
			action: '',
			actionValue: '',
			facet: null,
			facetValue: null,
			queryParamName: null,
			productManufacturer: null,
			cProductId: null,
			productName: null,
			productRecommendationType: null,
			productRecommendationRank: null,
			productRecommendationCount: null,
			origin: null,
			loadDuration: null,
			updateLongTimeConversionCookie: false
		});
	},
	
	_publish: function(){
		this.engine.track();
	},
	
	trackLoad: function(loadDuration){
		//	loadDuration: String
		//		Seconds as formated floating point number with a one position after decimal point (ex. "1.6").
		this.engine.action = "load";
		this.engine.actionValue = this.engine.sessionId;
		this.engine.loadDuration = loadDuration;
	},
	
	trackRestart: function(){
		this.engine.action = "reset/restart";
	},
	
	trackAnswer: function(/*String*/ facetName, /*String*/ facetInGroupName, /*String*/ value){
		this.engine.action = "answer/" + facetName;
		this.engine.actionValue = value;
		this.engine.facet = facetName;
		this.engine.facetValue = value;
		this.engine.queryParamName = "answer";
		this.engine.queryParamValue = facetName + "/" + value;
	},
	
	trackAnswerUnset: function(/*String*/ facetName){
		this.engine.action = "answerUnset/" + facetName;
		this.engine.facet = facetName;
	},
	
	trackAnswerSelectAll: function(/*String*/ facetName){
		this.engine.action = "selectAll/" + facetName;
		this.engine.facet = facetName;
	},
		
	trackNavigateTo: function(/*String*/ groupName){
		groupName = this._getTrackingGroupName(groupName);
		
		this.engine.action = "navigate/questionGroup/to";
		this.engine.actionValue = groupName;
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = groupName;
	},
	
	trackNavigateBrowserhistoryTo: function(/*String*/ groupName){
		groupName = this._getTrackingGroupName(groupName);
		
		this.engine.action = "navigate/browserHistory/to";
		this.engine.actionValue = groupName;
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = groupName;
	},
	
	trackNavigateNext: function(){
		this.engine.action = "navigate/questionGroup/next";
		this.engine.actionValue = this._getTrackingNextStage();
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = this._getTrackingNextStage();
	},
	
	trackNavigatePrevious: function(){
		this.engine.action = "navigate/questionGroup/previous";
		this.engine.actionValue = this._getTrackingPreviousStage();
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = this._getTrackingPreviousStage();
	},
	
	trackGroupHide: function(/*String*/ groupName){
		groupName = this._getTrackingGroupName(groupName);
		
		this.engine.action = "navigate/questionGroup/hide";
		this.engine.actionValue = groupName;
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = groupName;
	},
	
	trackGroupShow: function(/*String*/ groupName){
		groupName = this._getTrackingGroupName(groupName);
		
		this.engine.action = "navigate/questionGroup/show";
		this.engine.actionValue = groupName;
		this.engine.queryParamName = "group";
		this.engine.queryParamValue = groupName;
	},
	
	trackGotoProductDetails: function(/*String*/ id, /*Function*/ onTracked){
		var engine = this.engine;
		
		engine.action 	= "goTo/productDetails";
		engine.updateLongTimeConversionCookie = true;
		
		this._setProductAndRecommendationData(id);
		
		engine.onTracked = function(){
			onTracked();
			
			engine.onTracked = null;
		};
	},
	
	trackNavigateApplicationNext: function(/*String*/ appName, /*Function?*/ onTracked){
		var engine = this.engine,
			appName = this._getTrackingApp(appName);
		
		engine.action = "navigate/application/next";
		engine.actionValue = appName;
		engine.queryParamName = "application";
		engine.queryParamValue = appName;
		
		if(onTracked){
			engine.onTracked = function(){
				onTracked();
				engine.onTracked = null;
			};
		}
	},
	
	trackNavigateApplicationPrevious: function(/*String*/ appName, /*Function?*/ onTracked){
		var engine = this.engine,
			appName = this._getTrackingApp(appName);
		
		engine.action = "navigate/application/previous";
		engine.actionValue = appName;
		engine.queryParamName = "application";
		engine.queryParamValue = appName;
		
		if(onTracked){
			engine.onTracked = function(){
				onTracked();
				engine.onTracked = null;
			};
		}
	},
	
	trackShowProductReasons: function(/*String*/ id){
		this.engine.action = "show/productReasons";
		this._setProductAndRecommendationData(id);
	},
	
	trackShowPdfProductDetails: function(/*String*/ id){
		this.engine.action = "show/PDF/productDetails";

		this.engine.updateLongTimeConversionCookie = true;
		this._setProductAndRecommendationData(id);
	},
	
	trackShowProductDetails: function(/*String*/ id){
		this.engine.action = "show/productDetails";

		this.engine.updateLongTimeConversionCookie = true;
		this._setProductAndRecommendationData(id);
	},
	
	trackShowImageLarge: function(/*String*/ id){
		this.engine.action = "show/productImage";

		this.engine.updateLongTimeConversionCookie = true;
		this._setProductAndRecommendationData(id);
	},
	
	trackShowImageZoom: function(/*String*/ id){
		this.engine.action = "show/productImageZoom";

		this.engine.updateLongTimeConversionCookie = true;
		this._setProductAndRecommendationData(id);
	},
	
	trackComparisonAdd: function(/*String*/ id){
		this.engine.action = "comparison/add";
		
		this.engine.updateLongTimeConversionCookie = true;
		this._setProductAndRecommendationData(id);
	},
	
	trackComparisonRemove: function(/*String*/ id){
		this.engine.action = "comparison/remove";
		this._setProductAndRecommendationData(id);
	},
	
	trackComparisonShowComparisonTable: function(){
		this.engine.action = "comparison/showComparisonTable";
	},
	
	trackNavigate: function(/*String*/ to){
		this.engine.action = "navigate/" + to;
	},
	
	trackRecommendationsNext: function(pageNumber){
		this.engine.action = "navigate/productlist/page_forward";
		this.engine.actionValue = pageNumber;
	},
	
	trackRecommendationsPrevious: function(pageNumber){
		this.engine.action = "navigate/productlist/page_backward";
		this.engine.actionValue = pageNumber;
	},
	
	_setProductAndRecommendationData: function(/*String*/ productId){
		//	summary:
		//		fills tracking variables with all the product
		//		and recommendation data for the given product
		//		referenced by id
		var engine = this.engine,
			store = shared.store,
			recommendation = lang.mixin({
								type: "",
								position: -1
							},store.getRecommendationByProductId(productId)),
			product = store.getProductById(productId),
			manufacturer = product.manufacturer || "(manufacturer unknown)",
			name = product.label;

		// ALWAYS prefer the "customer" variant of the available IDs (customer knows only his ids in conversion tracking)
		// an explicit customerVariantsGroupId was added to the API with profiler 1.6.30
		var cProductId = product.customerProductId || product.id;
		var cVariantsGroup = product.customerVariantsGroupId || product.variantsGroupId;
		
		engine.actionValue = manufacturer + "/" + name;
		engine.queryParamName = "product";
		engine.queryParamValue = manufacturer + "/" + name;
		engine.cProductId = cProductId + "";
		// TODO change "engine.productVariant" to "engine.variantsGroupId" once the respective addition to the trackingEngine 
		//      is built and deployed to the analytics server.  
		engine.productVariant = cVariantsGroup + ""; 
		engine.productManufacturer = manufacturer;
		engine.productName = name;
		engine.productRecommendationType = recommendation.type;
		engine.productRecommendationRank = (recommendation.position + 1) + "";
		engine.productRecommendationCount = shared.store.getRecommendations().count + "";

		engine.origin = (recommendation.perfectMatch ? "perfect match" : "alternative") + "/" + (recommendation.position + 1);
	}
});

});
