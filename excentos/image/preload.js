"use strict";

define([
	"dojo/_base/array",
	"dojo/_base/Deferred",
	"dojo/_base/connect",
	"dojo/DeferredList",
	"excentos/log"
], function(array, Deferred, connect, DeferredList, log){

return function(imageUrls, timeout){
	//	summary:
	//		Preload images and tell when they're there.
	//	description:
	//		This function takes image URLs and returns a deferred list so we can react on completion.
	//	imageUrls: Array
	//		List of image URLs to load.
	//	timeout: Integer?
	//		Timeout in milliseconds.
	var deferreds = [];
	var connects = [];
	var timeoutId = -1;
	var errcnt = 0;
	
	var loadImage = function(url){
		var image = new Image();
		image.src = url;

		if(!image.complete){
			var deferred = new Deferred();
			connects.push(
				connect.connect(image, "onload", function(){
					log.info("preload", "loaded: " + image.src);
					deferred.callback(true);
				}),
				connect.connect(image, "onerror", function(){
					log.error("preload", "error " + image.src);
					++errcnt;
					deferred.callback(true);
				})
			);
			deferreds.push(deferred);
		}else{
			log.info("preload", "completed beforehands: " + image.src);
		}
	};
	
	array.forEach(imageUrls, loadImage);
	
	var deferredList = new DeferredList(deferreds);
	deferredList.then(function(){
		log.info("preload", "completed "+deferreds.length+" images with "+errcnt+" errors");
		timeoutId && clearTimeout(timeoutId);
		array.forEach(connects, function(handle){
			connect.disconnect(handle);
		});
		
	});
	
	if(deferreds.length && timeout){
		timeoutId = setTimeout(function(){
			log.error("preload", "timed out");
			if(deferredList.fired == -1){
				deferredList.callback(true);
			}
		}, timeout);
	}
	return deferredList;
};

});
