define([
],function(){
//adapted https://gist.github.com/lenville/9e13e63af075c145d662

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	// adapted to avoid overriding the global namespace

	var exports = {
		requestAnimationFrame: window.requestAnimationFrame,
		cancelAnimationFrame: window.cancelAnimationFrame
	};
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !exports.requestAnimationFrame; ++x) {
			exports.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			exports.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!exports.requestAnimationFrame)
			exports.requestAnimationFrame = function(callback) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - Math.abs(currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!exports.cancelAnimationFrame)
			exports.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());


	//fix context now we have proper shim
	return {
		requestAnimationFrame: function(/*Function*/ callback){
			exports.requestAnimationFrame.apply(window, arguments);
		},
		cancelAnimationFrame: function(/*Number*/ id){
			exports.cancelAnimationFrame.apply(window, arguments);
		}
	};
});