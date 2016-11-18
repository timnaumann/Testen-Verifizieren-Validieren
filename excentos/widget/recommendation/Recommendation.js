define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/event",
	"dojo/string",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/aspect",
	"../../shared",
	"../../util",
	"../_Widget",
	"../product/Product",
	"../imagezoom/ImageZoom",
	"../../tracking/Tracker",
	"../../tracking/linkTracker"
], function(declare, lang, array, event, string, domClass, domAttr, domConstruct, aspect, shared, util, _Widget, Product, ImageZoom, tracker, linkTracker){

	
//Product should be the base class
var Recommendation = declare(
	"excentos.widget.recommendation.Recommendation",
	_Widget,
{
	relativeTemplatePath: "recommendation/Recommendation.html",
	widgetsInTemplate: true,
	image: null,
	attributes: null,
	// ApiProduct
	product: null,
	
	recommendation: null,
	devInfoViewViewButtonTemplateString: "<div style='position:relative;z-Index:900' class='xc_devinfoview'><a style='position:absolute;' class='xc_devinfoview_btn' href='${url}' target='DevInfoView${productId}'>DevInfoView</a></div>",

	postMixInProperties: function(){
		this.inherited(arguments);
		this.initProduct();
		this.own(aspect.after(shared.behavior, "onNewAppComparisonList", lang.hitch(this, this._refreshComparisonStatus)));
	},

	postCreate: function(){
		this.inherited(arguments);
		linkTracker.initLinks(this.domNode, ["goto.product.details", this.product.id]);
		this.refresh();
	},

	refresh: function(){
		this.inherited(arguments);
		this._refreshCssClasses();
		this._createReasons();
		this._refreshComparisonStatus();
		xcInitial.debug && createDevInfoViewBtn.call(this);
	},

	_refreshCssClasses: function(){
		//reset variable css classes
		domAttr.set(this.domNode, "class",
			domAttr.get(this.domNode, "class")
				.replace(/ ?xc_recommendation_type_\w+/,"")
				.replace(/ ?xc_position_\w+/,"")
		);
		domClass.add(this.domNode, "xc_recommendation_type_" + this.recommendation.type + " xc_position_" + this.recommendation.position);
	},

	initProduct: function(){
		this.product = this.product || this._getProductObject();
		this._provideAttributes();
		this.initProductImages();
	},

	_getProductObject: function(){
		return shared.store.getProductById(this.recommendation.productId);
	},
	
	initProductImages: function(){
		var images = this._getImageItems();
		images && images.length && this._provideImage(images[0]);
	},

	_getImageItems: function(){
		// summary: returns an array of ImageItems {large:{location:""},regular:{location:""},thumb:{location:""}}
		return shared.store.getOrderedProductImageItems(this.product);
	},

	_provideImage: function(imageItem){
		this.image = {};
		this.image.thumb = 		lang.getObject("thumb.location",	false, imageItem) || "";
		this.image.regular = 	lang.getObject("regular.location",	false, imageItem) || this.image.thumb;
		this.image.large = 		lang.getObject("large.location",	false, imageItem) || this.image.regular;

		return this.image;
	},

	_provideAttributes: function(){
		return Product.prototype._provideAttributes.call(this, this.product);
	},
	
	openImageZoom: function(){
		// we have no deep zoom functionality yet, so this is identical to showLargeImage 
		this.showLargeImage();
		// tracker.track("show.image.zoom");
	},
	
	showLargeImage: function(){
		//TODO call `showImages` with all imageItems
		util.$(ImageZoom).getInstance().showImages([this.image.large],this.product.label);
		tracker.track("show.large.image", this.product.id);		
	},
	
	_refreshComparisonStatus: function(){
		if(this.domNode){
			var comparison = shared.store.getProductsInComparison();
			var inComparison = comparison && this.product.id in comparison;
			
			domClass.toggle(this.domNode, "xc_in_comparison", inComparison);
		}
	},
	
	_createReasons: function(){
		var reasons = shared.store.getOrderedReasonsByProductId(this.recommendation.productId);
		if(reasons && this.reasonsNode){
			this.reasonsNode.innerHTML = this._createReasonsHTML(reasons);
		}
	},
	
	_createReasonsHTML: function(reasons){
		var bf = "", self= this;
		function reasoning(orderedReasonGroups){
			array.forEach(orderedReasonGroups, function(group, gidx, groupsarr){
				bf += self._getReasonGroupHTML(group, gidx, groupsarr, reasons);
				
				array.forEach(group.reasonItems, function(reason, ridx, reasonsarr){
					bf += self._getReasonItemHTML(reason, ridx, reasonsarr, reasons, (gidx+1)*(ridx+1));
				});
				group.reasonGroupItems && reasoning(group.reasonGroupItems);
				
				bf += self._getReasonGroupHTMLCloser(group, gidx, groupsarr, reasons);
			});
		}
		reasoning(reasons);
		return bf;
	},
	_getReasonGroupHTML: function(group, i, groups, reasons){
		var groupHTML = "<div class=\"xc_reason_group xc_reason_group_type_"+group.type+" xc_reason_group_"+i+"\">";
		groupHTML += group.label ? "<div class=\"xc_reason_group_label xc_label\">"+group.label+"</div>" : "";
		
		return groupHTML;
	},
	_getReasonItemHTML: function(reason, i, reasonItems, reasons, reasonpos){
		return "<div class=\"xc_reason xc_reason_pos_"+reasonpos+" xc_reason_"+i+" xc_" + reason.type + "\">" + reason.text + "</div>";
	},
	_getReasonGroupHTMLCloser: function(group, gidx, groupsarr, reasons){
		return "</div>";
	},
	
	_onProductDetailsButtonClick: function(/*Event*/ e){
		this.openProductDetails();
		
		//	prevent from following links
		//	the redirect will be handled by the behavior
		event.stop(e);
	},
	
	openProductDetails: function(){
		shared.behavior.goToProductDetailsPage(this.product);
	}
});

function createDevInfoViewBtn(){
	var internalSessionId = xcInitial.internalSessionId;
	var currentApplication = xcInitial.masterApplicationName;
	
	var url = xcInitial.appBaseUrl + "/" +
			"../administration/panel?" +
			"type=RecommendationInfoPanel" +
			"&currentSessionId="+internalSessionId +
			"&currentApplication="+currentApplication +
			"&productPosition="+(this.recommendation.position);

	var templateString = string.substitute(this.devInfoViewViewButtonTemplateString, {url:url, productId:this.product.id});
	var el = this.devInfoViewBtn ?
		domConstruct.place(templateString, this.devInfoViewBtn, "replace") :
		domConstruct.place(templateString, this.domNode,"first");

	return this.devInfoViewBtn = el;
}

return Recommendation;

});


