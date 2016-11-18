define([
	"dojo/_base/event",
	"dojo/when",
	"dojo/sniff",
	"dojo/query",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/topic",
	"dojo/mouse",
	"excentos/util",
	"excentos/tracking/Tracker"
], function(dojoEvent, when, has, query, dom, domAttr, topic, mouse, util, tracker){

	var externalLinksSelector = "a[href]:not([href^='#'])";
	var defaultRootNodeId = "xc_application";

	function initLinks(/*DOMNode|String?*/ fromNode, /*Array?*/ trackerParams){
		// summary:
		//  track when an anchor link is clicked

		fromNode = dom.byId(fromNode) || dom.byId(defaultRootNodeId);
		var nodeList = query(externalLinksSelector, fromNode);

		//KNOWN ISSUES / WONTFIX:
		// IE9-11: fires no click event on ctrl+ (any mouse button);
		// IE7-8: fires no click event on ctrl / shift (any mouse button); does not provide event in onclick callback
		// Open in new Tab on touch devices (by using longpress) often (i.e. iOS) doesn't throw a usable event, so that's mostly lost.

		nodeList.forEach(function(anchor){
			// summary:
			//  covers the cases that are triggered by the onclick callback function

			//NOTE: We are explicitly disabling dojoClick feature for fast click events in touch environments,
			//		because the synthesized events are messing up the event chain
			anchor.dojoClick = false;

			//NOTE: need native onclick callback handler - dojo on("click") fires synthesized events for IE which cant be stopped
			anchor.onclick = function(/*Event*/ e){

				if(e && e.xcRedispatchedEvent)return;
				var self = this, trackerParams;

				//NOTE: IE7, IE8 do not provide events in callback, so we ignore shift/ctrl modifier
				//      and provide a duplicate but different implementation:
				if(!e){
					if(hasFlagDontTrack(self))return;

					trackerParams = _getTrackerParams(self);
					if(_hasSameWindowTarget(self)){
						when(trackLink(trackerParams), function(){
							topic.publish("/app/ajaxClient/exit",null);
							self.href && (location.href = self.href);
						});
						return false; // old school way to prevent the default behavior of clicking an anchor tag.
					}else{
						trackLink(trackerParams);
						return; // don't stop default behavior
					}
				}

				//NOTE: Chrome desktop triggers "click" for middle mouse button, too so we have to catch that (would otherwise track twice)
				if(!mouse.isLeft(e))return;

				var anchor = _getAnchor(e);
				if(hasFlagDontTrack(anchor))return;

				trackerParams = _getTrackerParams(anchor);

				//	we differentiate whether the clicked link will be opened in a new window or openes up in the very same window
				var isNewWindow = e.ctrlKey || e.shiftKey || !_hasSameWindowTarget(anchor);
				if(isNewWindow){
					trackLink(trackerParams);
				}else {
					dojoEvent.stop(e);
					e.stopImmediatePropagation && e.stopImmediatePropagation();
					when(trackLink(trackerParams),function(){
						// e.g. for triggering the exit transition
						topic.publish("/app/ajaxClient/exit",e);

						try {

							//Browsers are starting to update their security and programmatically created events are
							//starting to get cancelled because of the missing isTrusted: true property. Therefore
							//create a cloned event using the old one to manage to redispatch the event with the
							//xcRedispatchedEvent property

							var t = e.target,
								clonedEvent = new MouseEvent(e.type, e);

							clonedEvent.xcRedispatchedEvent = e;
							t.dispatchEvent(clonedEvent);
						}catch(e){
							// most reliable way (fiddling with the event proved unreliable)
							// NOTE: a possible base tag is evaluated by the location.href modification in the UA (no need to do that here)
							anchor.href && (location.href = anchor.href);
						}
					});
				}
			};
		});

		nodeList.on("mousedown", function(/*Event*/ e){
			// summary:
			//	tracks when the user used right/middle mouse button

			var anchor = _getAnchor(e);
			if( !mouse.isLeft(e) && !e.ctrlKey && !e.shiftKey){
				trackLink(_getTrackerParams(anchor));
			}
		});


		function hasFlagDontTrack(/*<A> HTMLElement*/ anchor){
			return util.castValueToType(domAttr.get(anchor,"data-xc-tracking-donttrack"), "boolean");
		}

		//helper in closure
		function _getTrackerParams(/*<A> HTMLElement*/ anchor){
			var params = (domAttr.get(anchor,"data-xc-tracking-params") || "").split(/\s*,\s*/);
			return params+"" ? params : trackerParams;
		}
	}

	function trackLink(/*Array*/ trackerParams){
		return tracker.track.apply(tracker, trackerParams);
	}

	function _getAnchor(/*Event*/ e){
		return (e.currentTarget || e.target);
	}

	var baseTarget;
	function _hasSameWindowTarget(/*<A> HTMLElement*/ anchor){
		if(baseTarget === undefined){
			baseTarget = (document.getElementsByTagName("base")[0] || {}).target || false;
		}

		var target = anchor.target || baseTarget;
		var sameWindowTarget = !target || (
				target == "_self" ||
				target == "_top" && window.top==window ||
				target == "_parent" && window.parent==window ||
				target == window.name
			);

		return !!sameWindowTarget;
	}

	return {
		initLinks: initLinks,
		trackLink: trackLink
	};
});