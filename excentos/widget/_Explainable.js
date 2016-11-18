define([
	"dojo/_base/declare",
	"dojo/query",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/_base/event",
	"excentos/shared",
	"./_Enrichable",
	"./enrichment/EnrichmentWidget"
], function(declare, query, domConstruct, domAttr, domClass, dojoEvent, shared, _Enrichable, EnrichmentWidget) {
	
	return declare("excentos.widget._Explainable", _Enrichable, {
		//if true, the explanation trigger will toggle between explain/unexplain
		toggleTrigger: false,
		explanationNode: null,
		explanationTriggerNode: null,
		
		postCreate: function() {
			//	summary:
			//		applies explanation triggering to the explainable
			//		if it has an explanation trigger and any
			//		explanation content
			this.inherited(arguments);
			this.initExplanationTrigger();
		},

		isExplainable: function() {
			var explanationController = shared.explanationController;
			var explainable = !!explanationController && !!this.get("explanationTrigger") && (this._isEnrichmentEnabled(
				EnrichmentWidget.ENRICHMENT_TYPE_EXPLANATION
			) || !!this._getLegacyExplanation());
			
			return explainable; 
		},
		
		initExplanationTrigger: function(){
			if (this.isExplainable() === true) {
				var trigger	= this.get("explanationTrigger");

				if(trigger){
					domClass.add(this.domNode, "xc_has_explanation");
					var eventType = domAttr.get(trigger, "data-explanation-event-type") || "onclick";
					this._explanationTriggerEventBubbles = domAttr.get(trigger, "data-explanation-event-bubbles") || "false";
					if (eventType !== "custom") {
						// If explanation trigger node is empty, add a `<span>` and use it as event node so it's much easier
						// to be able to hide and show the trigger depending on the existence of an explanation.
						var eventNode = trigger.innerHTML ? trigger : domConstruct.place("<span></span>", trigger);
						this._explanationTriggerHandle = this.connect(eventNode, eventType, this._onExplanationTriggered);
					}
					
					this.toggleTrigger = this.toggleTrigger || domAttr.get(trigger, "data-explanation-toggle") === "true";
				}
			}
		},

		_getLegacyExplanation: function() {
			return (this.state || this.facetInGroup || this.facetGroup || {}).explanation || null;
		},

		getExplanationWidget: function() {
			return this.isExplainable() ? 
					this._getEnrichmentWidget(EnrichmentWidget.ENRICHMENT_TYPE_EXPLANATION) : 
					null;
		},

		_getExplanationHtmlAttr: function() {
			//	summary:
			//		returns the explanation HTML
			//		or null if there is none
			if (this.isExplainable()) {
				return this.getExplanationWidget().getHtml();
			} else {
				// fallback to the old explanation content
				return this._getLegacyExplanation();
			}
		},
		
		_getExplanationNodeAttr: function(){
			//	summary:
			//		returns the explanation node
			//		if there is none, then fetches the first
			//		dom node with xc_explanation css class in the
			//		scope of the dom node of the current explainable
			//		if there is also none it will return null
			if (this.isExplainable()) {
				return this.getExplanationWidget().domNode;
			} else {
				if (this.explanationNode) {
					return this.explanationNode;
				} else {
					var explanationNode = query(".xc_explanation", this.domNode);

					if(explanationNode.length){
						this.explanationNode = explanationNode[0];

						return this.explanationNode;
					}
				}
			}
			
			return null;
		},
		
		_getExplanationTriggerAttr: function(){
			//	summary:
			//		returns the explanation trigger node
			//		or null if there is none
			return this.explanationTriggerNode || null;
		},
		
		_getExplanationTypeAttr: function(){
			//	summary:
			//		returns the explanation type of the explainable
			//		or "default" if there is none
			var trigger = this.get("explanationTrigger");

			if (trigger) {
				return  domAttr.get(trigger, "data-explanation-handler") ||
						domAttr.get(trigger, "data-explanation-type") || //deprecated; legacy name before explanation.Handlers
						"default";
			}

			return "default";
		},
		
		_onExplanationTriggered: function(/*Event*/ evt){
			//	summary:
			//		callback for the explanation trigger event
			//		check for valid handler and event bubbling
			var handler = null;
			
			//call explain()
			//	if it doenst toggle at all
			//	or it is not yet marked as triggered
			if(!this.toggleTrigger || !this._isExplanationTriggered){
				handler = this.explain();
			}else {
				handler = this.unexplain();
			}
			
			if (handler === null) {
				this._explanationTriggerHandle.remove();
			}

			if (this._explanationTriggerEventBubbles == "false") {
				dojoEvent.stop(evt);
			}
		},
		
		explain: function(){
			//	summary:
			//		calls the explanation controller's explain method
			//		that will handle the explanation for the explainable
			//		returns the explanation handler instance that handles 
			//		the explanation or null if its unhandled
			var explanationController = shared.explanationController;

			return (explanationController && explanationController.explain(this)) || null;
		},
		
		unexplain: function(){
			//	summary:
			//		calls the explanation controller's explain method
			//		that will handle the explanation for the explainable
			//		returns the explanation handler instance that handles 
			//		the explanation or null if its unhandled
			var explanationController = shared.explanationController;

			return (explanationController && explanationController.unexplain(this)) || null;
		},
		
		_setExplanationTriggeredAttr: function(bool){
			this._isExplanationTriggered = bool;
			domClass.toggle(this.domNode, "xc_explanation_triggered", bool);
		},
		_getExplanationTriggeredAttr: function(){
			return !!this._isExplanationTriggered;
		}
	});
});
