define([
	"excentos/Stateful",
	'excentos/shared',
	'excentos/aspect',
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"excentos/widget/_Widget",
	"excentos/uistate",
	"dojo/query",
	"dojo/dom-class"
],function(xcStateful, shared, aspect, declare, lang, on, _Widget, uistate, query, domClass){

	return declare(
		"excentos.widget.paging.Pager",
		[_Widget,xcStateful],
		{
			count: null,
			maxCount: null,
			prevNode: null,
			nextNode: null,
			maxCountNode: null,
			numberNode: null,
			callbackFunction: null,
			onReload: false,
			recommendationsChunkSize: null,

			constructor: function(){
				aspect.after(shared.behavior, "onNewAppRecommendations", lang.hitch(this,this.onNewRecommendations));
				this.watch("maxCount", lang.hitch(this, "resetCount"));
				this.recommendationsChunkSize =  shared.store.getFacetRootGroup().configItems.recommendationsChunkSize;
				this.setCallback();
			},


			resetCount: function(propertyName, oldValue, newValue){
				if(!this.onReload){
					this._setCount(1);
				}
				this.onReload = false;
			},

			_setMaxCount: function(){
				var recommendations =  shared.store.getRecommendations(),
					totalCount = recommendations && recommendations.totalCount;
				this.set("maxCount",Math.ceil(totalCount/this.recommendationsChunkSize) || 1);
			},

			onNewRecommendations: function(){
				this._setMaxCount();
				this._createPageNumberRange();
			},

			postCreate: function(){
				this.inherited(arguments);

				var self = this;

				// on page reload, get page out of uistate if available and set the value
				if(uistate.get("lastRecommendationsPageNumber") != null){
					this._setCount(uistate.get("lastRecommendationsPageNumber"));
					this.onReload = true;
				} else{
					this._setCount(1);
				}
				this._sendRecommendationRequestForPage();

				this.own(
					on(this.prevNode, "click", lang.hitch(self, "_onPrevious")),
					on(this.nextNode, "click", lang.hitch(self, "_onNext"))
				);
			},

			_onPrevious: function(){
				var count = this.count;
				if (count > 1) {
					this._setCount(count-1);
					this._sendRecommendationRequestForPage();
				}
			},

			_onNext: function(){
				var count = this.count,
					maxCount = this.maxCount;
				if (maxCount > 1 && count < maxCount) {
					this._setCount(count+1);
					this._sendRecommendationRequestForPage();
				}
			},

			_sendRecommendationRequestForPage: function(){
				this.callbackFunction && this.callbackFunction();
			},

			_setCount: function(count){
				this.set("count", count);
				uistate.set({lastRecommendationsPageNumber:count});
			},

			_createPageNumberRange: function(){
				var rangeArray = [],
					value = this.count - 3;
				while (rangeArray.length < 6 && rangeArray.length < this.maxCount && value <= this.maxCount) {
					if(value > 0){
						rangeArray.push(value);
					}
					value++;
				}
				if(rangeArray.length > 0){
					this._handleDisplayBehavior(1, rangeArray[0], rangeArray[rangeArray.length-1], this.maxCount, rangeArray);
				}
			},

			_createButtons: function(rangeArray){
				var documentFragment = document.createDocumentFragment(),
					ul = document.createElement("ul");

				for(var button = 0; button < rangeArray.length; button++){
					var li = document.createElement("li");
					li.innerHTML = rangeArray[button];
					if(rangeArray[button]==this.count) {
						li.setAttribute("class","xc_active");
					}
					documentFragment.appendChild(li);
				}

				ul.appendChild(documentFragment);
				this.numberNode.innerHTML = "";
				this.numberNode.appendChild(ul);
				this._addListener();
			},

			_addListener: function() {

				var self = this,
					pagerButtons = query( "ul", this.numberNode);

				this.own(
					on(pagerButtons, "li:click", function(event){
						self._pagerButtonClick(event);
					})
				);
			},

			_pagerButtonClick: function(event) {
				this._setCount(parseInt(event.target.innerHTML,10));
				this._sendRecommendationRequestForPage();
			},


			setCallback: function(){
				this.callbackFunction = lang.hitch(this,"_createRecommendationsAmountFromIndex");
			},

			_createRecommendationsAmountFromIndex: function(){
				var fromIndex = this._getRecommendationsStartIndex(this.count - 1);
				shared.behavior.getRecommendationsAmountFromIndex(this.recommendationsChunkSize, fromIndex);
			},

			_getRecommendationsStartIndex: function(pageIndex){
				return this.recommendationsChunkSize * pageIndex;
			},

			_handleDisplayBehavior: function(minButtonValue, minRangeButtonsValue, maxRangeButtonsValue, maxButtonValue, rangeArray) {

				var prevBtn = this.prevNode,
					nextBtn = this.nextNode,
					count = this.count;

				if( (maxRangeButtonsValue - minRangeButtonsValue) > 0) {
					this._createButtons(rangeArray);
					domClass.remove(this.domNode, "xc_invisible");
					domClass.toggle(prevBtn, "xc_invisible", count == minButtonValue);
					domClass.toggle(nextBtn, "xc_invisible", count == maxButtonValue);
				}
				else {
					domClass.add(this.domNode, "xc_invisible");
				}


				// lower end and upper end without gaps in between
				if( minButtonValue == (minRangeButtonsValue - 1) && (maxRangeButtonsValue + 1) == maxButtonValue){
					// nothing special to show or hide
				}
				// lower end
				else if( minButtonValue == (minRangeButtonsValue - 1) ){
					// TODO: show something like "..." before button with max value
				}
				// upper end
				else if ( (maxRangeButtonsValue + 1) == maxButtonValue){
					// TODO: show something like "..." after button with min value
				}
				// mid range
				else{
					// TODO: show something like "..." after button with min and before button with max value
				}
			}
		});
});