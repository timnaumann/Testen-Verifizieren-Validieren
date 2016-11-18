define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "./_Transition"
], function(declare, domClass, _Transition){

return declare(
		"excentos.transition._PhasedTransition",
		_Transition, {		

	/*  HIDE			    REFRESH	    		  SHOW
	 *  #1                  #2		    		  #3		 
	 *  ||------------------||--------------------||---------------------||
	 * 	||ANIMATE   |WAIT?  ||UNWAIT?  |REFRESH   ||ANIMATE   |CLEANUP   ||
	 *  ||LISTEN    |	    ||		    		  ||					 ||
	 *  ||------------------||--------------------||---------------------||
	 *  
	 *  t --------------------------------------------------------------->
	 */
	
	//TODO:
	//	phases should make it possible to safely control the transition flow 
	//	especially when trying to interrupt the whole transition at certain points
	PHASES: null,
	
	constructor: function(){
		var noop = function(){};
		//NOTE: the order within the ´PHASES´ Object has no relevance
		this.PHASES = {
							//each "noop" has to be a very own instance!
			PREPARE_ANIMATION_HIDE: this.invoker(null,noop,{name:"noop"}),
			ANIMATION_HIDE: this.invoker(null,noop,{name:"noop"}),
			WAIT: 			this.invoker(null,noop,{name:"noop"}),
			UNWAIT: 		this.invoker(null,noop,{name:"noop"}),
			LISTEN: 		this.invoker(null,noop,{name:"noop"}),
			REFRESH: 		this.invoker(this, "processRefreshStack",{name:"PHASES.REFRESH"}),
			PREPARE_ANIMATION_SHOW: this.invoker(null,noop,{name:"noop"}),
			ANIMATION_SHOW: this.invoker(null,noop,{name:"noop"}),
			CLEANUP: 		this.invoker(this, "cleanup",{name:"PHASES.CLEANUP"}),
							//this NOOP can be used in cases where u want to simply do nothing like 
							//´this.PHASES.CLEANUP = this.PHASES.NOOP´
			NOOP: 			this.invoker(null, noop, {name:"PHASES.NOOP"})
		};
	},

	init: function(){
		this.inherited(arguments);
		this.initMethodCallPrevention();
		this.createElements();
		this.createQueue();
		
		return this;
	},
	
	createElements: function(){
		// summary:
		//		creates the elements and assigns them to the according PHASES
		// tags: interface
	},
	
	createQueue: function(){
		// summary:
		//		creates the element list with desired TransitionElement instances
		// tags: public
		
		var waitClassName =  excentos.transition.transitioningBaseCssClass+"_"+this.name+"_waiting";
		
		var wait = false;
		this.getElementManager().addElements([
			this.parallel([
			 	this.sequence([
			 	    this.PHASES.PREPARE_ANIMATION_HIDE,
			 		this.PHASES.ANIMATION_HIDE,
			 		this.dynamic(this, function(){
			 			//after "ANIMATION_HIDE" check if "LISTEN" is still running - and show "WAIT" accordingly 
			 			if(this.PHASES.LISTEN.getState("state")==this.STATE_STARTED){
			 				wait = true;
			 				domClass.add(document.body, waitClassName);
			 				this.PHASES.WAIT.start();
							
							return //return nothing, so this is non-blocking
			 			}
			 		},{name:"DYNAMIC_CONDITIONAL_WAIT"})
			 	],{name:"SEQUENCE_ANIMATION_HIDE+WAIT"}),
				this.PHASES.LISTEN
			],{name:"PARALLEL_ANIMATION_HIDE+WAIT+LISTEN"}),
			//PREPARE & REFRESH
	 		this.dynamic(this, function(){
	 			//if WAIT was executed call - UNWAIT respectively
	 			if(wait){
	 				wait = false;
	 				domClass.remove(document.body, waitClassName);
	 				return this.PHASES.UNWAIT;
	 			}
	 		},{name:"DYNAMIC_CONDITIONAL_UNWAIT"}),
			this.PHASES.PREPARE_ANIMATION_SHOW,
			this.PHASES.REFRESH,
			//SHOW
			this.PHASES.ANIMATION_SHOW,
			this.PHASES.CLEANUP
		]);
	}
});

});
