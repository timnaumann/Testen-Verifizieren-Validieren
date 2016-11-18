/**
 * Util Functions for Phamtomjs UI Tests
 */

"use strict";

function getScreenShot(/*PhantomJSPage*/ page, /*String*/ testName, /*String*/ appName, /*String*/ themeName, /*String*/ stageName){
	var filename = testName + "_" + appName + "_" + themeName + "_" + stageName;
	page.render(filename + '.png');
}

function getMasterApplicationName(/*PhantomJSPage*/ page){
	return getProp(page, "xcInitial.masterApplicationName");
}

function getThemeName(/*PhantomJSPage*/ page){
	return getProp(page, "xcInitial.theme");
}

function getStageName(/*PhantomJSPage*/ page){
	return getProp(page, "excentos.shared.store.getFacetGroupVars().currentStageInView");
}

function onAdvisorReady(/*PhantomJSPage*/ page, /*Function*/ callback, /*Function*/ errback){
	// poll for init flag
	poll(
		function() {
			return getProp(page, "excentos.shared.initDone");
		},
		callback,
		errback
	);
}

// source: http://davidwalsh.name/javascript-polling
function poll(fn, callback, errback, timeout, interval) {
	var endTime = Number(new Date()) + (timeout || 5000);
	interval = interval || 500;

	(function p() {
		// If the condition is met, we're done!
		if(fn()) {
			callback();
		}
		// If the condition isn't met but the timeout hasn't elapsed, go again
		else if (Number(new Date()) < endTime) {
			setTimeout(p, interval);
		}
		// Didn't match and too much time, reject!
		else {
			errback();
		}
	})();
}

function getProp(/*PhantomJSPage*/ page, /*String*/ propString, /*Object?*/ context){

	var parts = propString.split(".");

	return page.evaluate(function(parts, context){
			//var subcontext = context || this;
			var subcontext = context || this;
			for(var i = 0; i < parts.length; i++){
				// get property
				if( parts[i].indexOf(")") === -1 ) {
					subcontext = subcontext[parts[i]];
				// execute function
				} else {
					subcontext = subcontext[parts[i].slice(0,-2)]();
				}
				// return false on missing context
				if(!subcontext){return;}
			}
			return subcontext; // mixed*/
	}, parts, context);
}

// merge plain key value objects
function getMergedObject(/*Object*/ objectDefault, /*Object*/ objectCustom){
	//NOTE: this is just for the plain config; no "deep" merge functionality; enhance upon needs; @see Object.assign ?
	// getMergedInfo({a:{b:1}},{a:{c:1}}) will override a.b!

	var objectMerged = {}, key;
	for(key in objectDefault){ objectMerged[key] = objectDefault[key]; }
	for(key in objectCustom){ objectMerged[key] = objectCustom[key]; }
	return objectMerged;
}

// get DOM nodes count by selector string
function getDomNodesCount(/*PhantomJSPage*/ page, /*String*/ selector){
	return page.evaluate(function(selector){
		return document.querySelectorAll(selector).length;
	}, selector);
}

// get DOM nodes count by selector string
function getDomNodes(/*PhantomJSPage*/ page, /*String*/ selector){
	return page.evaluate(function(selector){
		return document.querySelectorAll(selector);
	}, selector);
}

module.exports = {
	getScreenShot: getScreenShot,
	getMasterApplicationName: getMasterApplicationName,
	getThemeName: getThemeName,
	getStageName: getStageName,
	onAdvisorReady: onAdvisorReady,
	poll: poll,
	getProp: getProp,
	getMergedObject: getMergedObject,
	getDomNodes: getDomNodes,
	getDomNodesCount: getDomNodesCount
};