define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/connect",
	"dojo/NodeList-dom",
	"dojo/dom-style",
	"./_Element",
	"../log"
], function(declare, lang, array, connect, NodeList, domStyle, _Element, log){

var Animation = declare(_Element, {
	
	declaredClass: "queue.Animation",

	_animation: null,
	_animFunc: null,
	_onEndHandle: null,
	_cleanups: null,
	_resolveParameters: null,
	_originalParameters: null,
	checkNode: true,
	
	autoCleanup: true,
	
	STATIC_VAR: {
		SPEED: 1,
		FPS: 30
	},
	constructor: function(){
		this._cleanups = [];
	},
	
	init: function(/*dojo._Animation*/ anim, /*Object?*/ parameters){
		this.inherited(arguments);
		this.initAnimation(anim, parameters);
		
		return this;
	},
	
	start: function(){
		// summary:
		//	In case of overrideing a running Animation a call to `stop()` would force the animation
		//	to jump to its end state due to implementation of dojo._Animation.stop().
		// tags: override queue._Element::start
		this.checkInitialized();
		this.checkDisabled();
		
		var isRunning = this.isRunning();
		
		if(isRunning && this.override){
			this._pause();
		}
		
		if(!this.isRunning()){
			//TODO: for more clarity we should directly invoke _start
			this.setState("state",this.STATE_STARTED);
		}
		
		return this._deferred;
	},
	
	execute: function(){
		this.inherited(arguments);
		var anim = this._animation || this._animFunc;
		if(!anim || !this._safePlay()){
			this.finish();
		}
	},
	isAnimationCombined: function(anim){
		anim = anim || this._animation;
		return anim.hasOwnProperty("_pseudoAnimation");
	},
	isAnimationActive: function(anim){
		anim = anim || this._animation;
		var active = anim.status() != "stopped";
		return active;
	},
	getResponsibleAnimation: function(){
		//	summary: 
		//		safely retrieve the dojo.animation reference in combined/chained/normal animations
		if(!this._animation)return null;
		return this.isAnimationCombined(this._animation) ? this._animation._pseudoAnimation : this._animation;
	},
	_stop: function(){
		if(this.isAnimationActive()){
			this._animation.stop();
			this.inherited(arguments);
		}
	},
	_pause: function(){
		if(this._animation.status() == "playing"){
			this._animation.pause();
		}
	},
	_safePlay: function(){
		//summary:
		//		plays the animation if it is not already running and checks if all nodes are present beforehand
		
		
		if(this.resumed){
			this._startPlay();
			return true;
		}
		
		if(this._resolveParameters){
			var p = this._resolveParameters.call(this);
			this.setAnimation(this._animFunc(p));
		}
		
		if(this.checkNode){
			var hasNode = !this.isAnimationCombined() ? 
							this._hasNode() : 
							array.every(this._animation._animations,this._hasNode,this);
	
			//break here if the animation would fail on an invalid node
			if(!hasNode) {
				log("transition",this.declaredClass+"::"+arguments.callee.nom+"() node is ´null´",{"this":this,"this._animation":this._animation});
				return false;
			}
		}
		
		if(this.speed){
			this._recalculateDuration();
		}
		this._modifyAnimationParameters(true);
		this._animation.status()!="playing" && this._startPlay();
		return true;

	},
	_recalculateDuration: function(){
		var anim = this._animation;
		
		//read speed from  speed={height:20} or speed=20
		function getSpeedValue(speed){
			if(typeof speed == "object"){
				for(var sprop in speed){
					return {prop:sprop,value:speed[sprop]};
				}
			}else {
				return {prop:"",value:speed};
			}
		}
		
		function getAnimProp(speedObj){
			if(speedObj.prop && speedObj.prop in anim.properties){
				return {prop:speedObj.prop,value:anim.properties[speedObj.prop]};
			}else {
				for(var propName in anim.properties){
					return {prop:propName,value:anim.properties[propName]};
				}
			}
		}
		
		var speedObj = getSpeedValue(this.speed);
		var animProp = getAnimProp(speedObj);
		var dur = this._originalParameters.duration;

		try {
			dur = this.dynamicDuration(
				domStyle.get(anim.node, animProp.prop),
				typeof animProp.value.end=="function" ?
					animProp.value.end(anim.node) :
					animProp.value,
				speedObj.value,
				this._originalParameters.duration
			);
		}catch(e){
			//seems we have to deal with a non-css-property animation
		}
		
		return this._dynamicDuration = this._animation.duration = dur;
	},
	_hasNode: function(anim){
		anim = anim || this._animation;
		var n = !!anim.node;
		if(this.autoCleanup && n){
			this._cleanups.push(anim.node);
		}
		return n;
	},
	_modifyAnimationParameters: function(/*Boolean*/ modify){
		var factor = modify ? this.STATIC_VAR.SPEED : 1;
		if(this._originalParameters){
			this._animation.duration = (this._dynamicDuration || this._originalParameters.duration) / factor;
			this._animation.delay =	   this._originalParameters.delay * factor;
			this._animation.rate =	   1000 / this.STATIC_VAR.FPS;
		}
	},
	_startPlay: function(){
		//apply the onEnd listener if an animation is actually playing
		//if animation references are reused - other TrnasitionAnimation instances
		//would try to fire an finish() causing a deferred error
		//TODO - is connect still needed ? 
		if(!this._onEndHandle){
			this._onEndHandle = connect.connect(this._animation, "onEnd", this, this.finish);
		}
		this._animation.play();
	},
	finish: function(){
		if(this._onEndHandle){
			this._onEndHandle.remove();
			this._onEndHandle = null;
		}
		//revert delay & duration properties
		this._modifyAnimationParameters(false);
		this.inherited(arguments);
	},
	cleanup: function(){
		//summary: removes all styles from targeted HTMLElements
		//NOTODO: revert the style to the state before the transition began
		//	->	reverting the style would probably lead to unexpected behaviors
		//		as the style would reset to what was set earlier during the preparation
		
		var list = NodeList(this._cleanups);
		list.attr("style","");
		list.removeAttr("style");
		this._cleanups = [];
	},
	//TODO: cleanup - looks like ´Hackepeter´
	initAnimation: function(/*dojo.Animation*/ anim, /*Object|Function?*/ parameters){
		// ex:
		//		´node´ must be valid - else dojo.Animation throws error
		//		initAnimation(dojo.fadeOut({node:dojo.body()}));
		//
		//		´node´ can be valid - Animation catches if ´node´ is invalid
		//		initAnimation(dojo.fadeOut, {node:dojo.body()});
		//
		//		´node´ will be resolved at execution time and needs to be valid only at that point in time
		//			else the error will be caught be Animation
		//		initAnimation(dojo.fadeOut, function(){return {duration:350, node:dojo.body()}});

		if(anim){
			//setAnmation(dojo.fadeIn({node:dojo.body()}))
			//setAnmation(dojo.fadeIn({node:dojo.body()}, {duration:500}))
			if(typeof anim == "object"){
				parameters && lang.mixin(anim,parameters);
				this.setAnimation(anim);
				return;
			}
			
			if(typeof anim == "function"){
				this._animFunc = anim;
				//initAnimation(dojo.fadeIn, function(){return {node:dojo.body()}})
				if(typeof parameters == "function"){
					this._resolveParameters = parameters;
				}
				else{
					if("node" in parameters){
						//initAnimation(dojo.fadeIn, {node:function(){return dojo.body()}})
						if(typeof parameters.node == "function"){
							var params = lang.clone(parameters);
							this._resolveParameters = function(){
								var n = parameters.node.call(this);
								lang.mixin(params,{node:n});
								return params;
							};
						}
						//initAnimation(dojo.fadeIn,{node:"myNode"}
						else {
							this._resolveParameters = function(){
								return parameters;
							};	
						}
					}
					else {
						//initAnimation(dojo.fadeIn)
						this._animation = anim(parameters);
						!parameters.node && log("transition",this.declaredClass+"::"+arguments.callee.nom+"() node is ´null´",{"this":this,"this._animation":this._animation});
					}
				}
			}
		}
		else {
			this._animation = null;
			throw new TypeError(this.declaredClass+"::"+arguments.callee.nom+"\n ´anim´ expected to be ´function´ but ´"+(typeof elements)+"´ was given");
		}
		
		return this;
	},
	setAnimation: function(anim){
		this._animation = anim;
		//what happens with combined animations?
		this._originalParameters = {
			delay: anim.delay,
			duration: anim.duration
		};
	},
	getAnimation: function(){
		return this._animation;
	},
	dynamicDuration: function(oldV, newV, pxps, maxDur){
		var diff = Math.abs(Math.ceil(oldV-newV));
		var dur = Math.ceil(diff/pxps*100)/100*1e3;
		var ret = Math.min(maxDur, dur) || 1;
		return ret;
	}
});
Animation.STATIC_VAR = Animation.prototype.STATIC_VAR;
Animation.dynamicDuration = Animation.prototype.dynamicDuration;

return Animation;
});
