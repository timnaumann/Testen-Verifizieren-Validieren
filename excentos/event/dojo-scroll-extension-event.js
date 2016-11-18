define([
	"dojo/debounce",
	"excentos/aspect",
	"dojo/on"
],function(debounce, xcaspect, on){
	var scrollExtensionEvent = (function(){

		var createEvent = function(event, type){
			var e = lang.mixin({}, e);
			e.type = type;
			return e;
		}

		var scrollstart = function(target, listener){
			var _started = false;
			var _onScrollEnd = on(target, scrollend, function(e){_started = false;});
			var _onScrollStart = on(target, "scroll", function(e){
				if(!_started){
					_started = true;
					var event = createEvent(e, "scrollstart");
					listener.call(this, event);
				}
			});
			xcaspect.after.once(_onScrollStart, "remove", function(){_onScrollEnd.remove()});

			return _onScrollStart;
		};
		var scrollend = function(target, listener){
			return on(target, "scroll", debounce(function(e){
				var event = createEvent(e, "scrollend");
				listener.call(this, event);
			}, 150));
		}

		return {
			scrollstart: scrollstart,
			scrollend: scrollend
		}
	})();

	return scrollExtensionEvent;
})