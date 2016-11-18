define([
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dijit/registry",
	"excentos/shared",
	"excentos/util",
	"excentos/util/SmartScroll",
	"excentos/tracking/Tracker",
	"excentos/widget/_Widget",
	"excentos/widget/recommendation/Recommendation"
], function(domStyle, domGeometry, declare, array, lang, domClass, dijitRegistry, shared, util, SmartScroll, tracker, _Widget, Recommendation){

return declare(
	"excentos.widget.recommendation.Recommendations",
	[_Widget],
{
	relativeTemplatePath: "recommendation/Recommendations.html",
	widgetsInTemplate: true,
	
	perfectMatchCount: null,
	_recommendationWidgets: null,
	
	useSmartScroll: false,
	smartScroll: null,

	startIndexDisplayedRecommendations: null,
	
	//indicates whether the recommendation widgets should be build asynchronously
	createAsync: false,
	//set a refresh strategy which is being called upon `refresh()`
	refreshStrategy: "_refreshStrategyRecreate",

	constructor: function(){
		this._recommendationWidgets = [];
	},
	
	postCreate: function(){
		this.inherited(arguments);
		
		this.connect(util, "changeProfile", "expelOldRecList");
		this.connect(shared.behavior, "setFacetValues", "expelOldRecList");
		this.connect(shared.behavior, "setFacetUnanswered", "expelOldRecList");
		
		if(this.useSmartScroll){
			this.smartScroll = new SmartScroll({targetNode: this.containerNode});
		}
		
		/*Martin Stadler; Easter Egg; ©2012*/
		var connected;
		this.connect(this.domNode, "onclick", function(evt){
			if(!connected && !(evt.altKey && evt.shiftKey)){
				var timedConnect = dojo.connect(this.domNode, "onclick", this, function(evt2){
					if(evt2.altKey && evt2.shiftKey){
						window.open(require.toUrl("excentos/ob"+"i.jpg"));
					}
					dojo.disconnect(timedConnect);
				});
				connected = true;
				setTimeout(function(){
					timedConnect && dojo.disconnect(timedConnect);
					connected = false;
				}, 1000);
			}
		});
	},
	
	refresh: function(){
		var recMetaData = shared.store.getRecommendations();

		this.perfectMatchCount = recMetaData.perfectMatchCount;
		this.startIndexDisplayedRecommendations = recMetaData.from;
		domClass.toggle(this.domNode, "xc_anyfacetset", !recMetaData.noFacetSet);
		domClass.toggle(this.domNode, "xc_has_perfectmatch", !!this.perfectMatchCount);

		this._typeCount = {};

		this.refreshRecommendationWidgets();

		this.onNewList();
		
		// track recommendation listing to user (only evaluated by piwik tracker)
		if(util.isVisible(this)){
			tracker.track("recommendation.list");
		}
		
		this.smartScroll && this.smartScroll.refresh();
	},
	
	refreshRecommendationWidgets: function(){
		this[this.refreshStrategy]();
	},

	_refreshStrategyReuse: function(){
		array.forEach(this._recommendationWidgets, function(recWidget){
			var domNode = recWidget.domNode,
				parentNode = domNode.parentNode;

			parentNode && parentNode.removeChild(domNode);
		});
		this._recommendationWidgets = [];
		this._createRecommendationWidgets();
	},
	_refreshStrategyRecreate: function(){
		// Destroy all contained recommendation widgets.
		array.forEach(this._recommendationWidgets, function(recWidget){
			recWidget.destroyRecursive();
		});
		this._recommendationWidgets = [];
		this._createRecommendationWidgets();
	},

	_createRecommendationWidgets: function(){
		var recommendations = shared.store.getOrderedRecommendations();
		domClass.toggle(this.domNode, "xc_norecommendations", !recommendations.length);

		this._hideNoRecommendation(recommendations.length);
		//improves responsiveness
		//TODO take care whether the order get affected
		for(var i=0, l=recommendations.length; i<l; ++i){
			var createRec = lang.hitch(this, this._createRecommendationWidget, recommendations[i], i, recommendations);
			this.createAsync ? setTimeout(createRec) : createRec();
		}
	},

	_hideNoRecommendation: function(list_length){
	},
	
	_createRecommendationWidget: function(recommendation, idx, recommendations){
		var widget = this._getRecommendationWidgetInstance(recommendation, idx, recommendations);
		widget.placeAt(this.containerNode);
		
		var len = this._recommendationWidgets.push(widget);
		this._postRecommendationWidgetCreate(widget, idx, recommendations);
		
		//check if order is correct
		if(idx != len-1)console.warn("createRecommendationWidget out of order "+widget.id+" @"+len+" should be at "+idx);
		if(this._recommendationWidgets.length === recommendations.length){
			this.onRecommendationWidgetsCreated();
		};
		
		return widget;
	},
	
	_getRecommendationWidgetInstance: function(recommendation, idx, recommendations){
		var id = this.id + "_xc_recommendation_" + recommendation.productId,
			count = this._typeCounter(recommendation),
			recommendationWidget = dijitRegistry.byId(id);

		if(this.refreshStrategy == "_refreshStrategyRecreate" || !recommendationWidget){
			recommendationWidget = shared.widgetFactory.makeWidget(
			Recommendation,
			{
					id: this.id + "_xc_recommendation_" + recommendation.productId,
				recommendation: recommendation,
					count: count
			}
		);
		}else {
			recommendationWidget.count = count;
			recommendationWidget.refresh();
		}

		return recommendationWidget;
	},
	
	_typeCounter: function(recommendation){
		this._typeCount[recommendation.type] || (this._typeCount[recommendation.type]=0);
		
		var num = ++this._typeCount[recommendation.type];
		
		return num;
	},
	_postRecommendationWidgetCreate: function(widget, idx, recommendations){
		this._setCssClasses(widget, idx, recommendations);
	},
	
	_setCssClasses: function(widget, idx, recommendations){
		var classes = [];
		if(idx == 0){
			classes.push("xc_first");
		}
		if(idx % 2 === 0){
			classes.push("xc_odd");
		}else{
			classes.push("xc_even");
		}
		if(idx == recommendations.length - 1){
			classes.push("xc_last");
		}
		domClass.add(widget.domNode, classes);
	},
	
	onNewList: function(){},
	expelOldRecList: function(){},
	onRecommendationWidgetsCreated: function(){}
	
});

});
