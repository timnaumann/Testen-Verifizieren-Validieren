define([
	"dojo/Deferred",
	"./_TrackingImpl",
	"../util",
	"../shared",
	"../log"
], function(Deferred, _TrackingImpl, util, shared, log){

return {
	//	enabled: Boolean
	enabled: false,
	
	// trackerTimeout: Integer
	trackerTimeout: 650,
			
	//	initialized: Boolean
	_initialized: false,
	
	//	_trackingImpls: Object
	_trackingImpls: null,
	
	//	_diabledActions: Object
	_disabledActions: null,
	
	//	_pendingTrackingImpls: Object
	_pendingTrackingImpls: null,
	
	//	_pendingTrackingImplCount: Integer
	_pendingTrackingImplCount: 0,
	
	//	_pendingTrackingActions: Array
	_pendingTrackingActions: null,
	
	init: function(){			
		if(this._initialized !== true){
			this.enabled = shared.store.getConfigByKey("enableTracking") === "true";
			this._trackingImpls = {};
			this._disabledActions = {};
			this._pendingTrackingImpls = {};
			
			//	load the trackers only if tracking is enabled
			if(this.enabled){
				var trackingImpls = util.castValueToType(shared.store.getConfigByKey("enableTrackingImpls"), "array") || [],
					disabledActions = util.castValueToType(shared.store.getConfigByKey("disableTrackingActions"), "array") || [];
				
				this._pendingTrackingActions = [];
				
				// create the hash of disabled actions
				for(var i = 0, l = disabledActions.length; i < l; ++i){
					var disabledAction = disabledActions[i];
					this._disabledActions[disabledAction] = true;
				}
				
				var self = this;

				for(var i = 0, l = trackingImpls.length; i < l; ++i){
					//	get the whitespace-trimmed tracking name
					var trackingImpl = trackingImpls[i],
						trackerModulenName = trackingImpls[i];
					// if there's a slash in the config, the new notation of directly setting the module ID is used. Otherwise apply the old fallback:
					// TODO harmonize lowercase / uppercase in config vs. implementation
					if(trackerModulenName.indexOf("/") == -1){
						var trackingName = trackingImpl.charAt(0).toUpperCase() + trackingImpl.substr(1).toLowerCase();
						var trackingPath = "xcProject/tracking/";
						//	the core tracker, not project
						if(trackingName === "Excentos" || trackingName === "Piwik"){
							trackingPath = "excentos/tracking/";
						}
						trackerModulenName = trackingPath + trackingName;
					} 
					
										
					this._pendingTrackingImpls[trackerModulenName] = true;
					++this._pendingTrackingImplCount;

					(function(mid){
						require([mid], function(trackingClass){
							self.addTrackingImpl(mid, new trackingClass);
						});
					})(trackerModulenName);
				}
			}
			
			this._initialized = true;
		}
	},
	
	_track: function(/*String*/ action /*, String param1, ...*/){
		//	dont do anything if tracking 
		//	or the tracking action has been disabled
		if(this.enabled && this._disabledActions[action] !== true){
			
			var method = this._actionToMethod(action),
				params = Array.prototype.slice.call(arguments, 1);

			for(var trackerModuleName in this._trackingImpls){
				if(this._disabledActions[trackerModuleName + ":" + action]){
					continue;
				}
				
				// 	call the custom tracking implementation's tracking method,
				//	passing the tracking parameters
				this._trackingImpls[trackerModuleName].track(method, params);
			}
			
			//	there are some pending trackers, that are not loaded yet
			//	save the tracking request to handle it later
			if(this._pendingTrackingImplCount > 0){
				for(var pendingModuleTrackerName in this._pendingTrackingImpls){
					if(!this._pendingTrackingActions[pendingModuleTrackerName]){
						this._pendingTrackingActions[pendingModuleTrackerName] = [];
					}
					
					this._pendingTrackingActions[pendingModuleTrackerName].push({
						method: method,
						params: params
					});
				}
			}
		}
	},
	
	track: function(/*String*/ action /*, String param1, ...*/){
		// summary: Checks if the `action` can be tracked an tracks it accordingly.
		//			If the trackingimplementation returns a success the promise is getting resolved with `true` as arguments.
		//			In either case the tracker didnt respond or does not repond via callback; the promise resolves with given argeument `false`.
		//			TODO: In the future the tracker will "reject" the promise in case of timeout
		// returns: promise

		if(typeof action != "string"){
			throw new Error("excentos.tracking.Tracker::track expected `action` to by String but "+typeof action+" was given.");
		}

		log("tracker", Array.prototype.slice.call(arguments));
		
		var args = Array.prototype.slice.call(arguments),
			def = new Deferred,
			rejectDeferred = function(){
				//TODO: use `reject` as soon as trackingImpls are completely support promises
				//def.reject(new Error("excentos.tracking.Tracker::track probably timed out"));
				def.resolve(false);
			},
			resolveDeferred = function(){
				def.resolve(true);
			};
		
		
		if(this.canTrack(/*String*/action)){
			var timeout = setTimeout(rejectDeferred, this.trackerTimeout);

			// Note: Callback is only supported by the excentos engine.
			//add `resolveDeferred` as callback to the args list
			this._track.apply(this, args.concat(resolveDeferred));
		}else{
			// There is no tracker that could track the event.
			rejectDeferred();
		}
		
		return def;
	},
	
	canTrack: function(/*String*/ action){
		if(this.enabled === true && this._disabledActions[action] !== true){
			var actionImpl = action.split(":");
			
			if(actionImpl.length === 2){
				var trackingImpl = this._trackingImpls[actionImpl[0]],
					method = this._actionToMethod(actionImpl[1]);
				
				return trackingImpl && typeof trackingImpl[method] === "function";
			}
			
			return true;
		}
		
		return false;
	},
	
	addTrackingImpl: function(/*String*/ name, /*excentos.tracking._TrackingImpl*/ impl){
		this._trackingImpls[name] = impl;
		
		//	check if the tracking implementation has been pending
		//	if so, remove from pending implementations hash
		if(this._pendingTrackingImpls[name]){
			this._applyPendingTrackingActions(name);
			
			//	clean up
			delete this._pendingTrackingActions[name];
			delete this._pendingTrackingImpls[name];
			
			--this._pendingTrackingImplCount;
		}
	},
	
	_applyPendingTrackingActions: function(/*String*/ name){
		var impl = this._trackingImpls[name];
		var pendingActions = this._pendingTrackingActions[name];
		
		if(impl && pendingActions){
			for(var i = 0, l = pendingActions.length; i < l; ++i){
				var actionObj = pendingActions[i];
				
				impl.track(actionObj.method, actionObj.params);
			}
		}
	},
	
	getTrackingImpl: function(name){
		return this._trackingImpls[name];
	},
	
	hasTrackingImpl: function(name){
		return name in this._trackingImpls;
	},
	
	//NOTE: this is actually faster than any ".replace" approach http://jsperf.com/str-replace-for-vs-reg
	_actionToMethod: function(action){
		var method = "track" + action.charAt(0).toUpperCase();
		
		for(var i = 1, l = action.length; i < l; ++i){
			var c = action.charAt(i);
			
			switch(c){
				case ".":
					method += action.charAt(++i).toUpperCase();
					break;
				default:
					method += c;
					break;
			}
		}
		
		return method;
	}
};

});
