define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/fx",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"excentos/shared",
	"excentos/transition/_PhasedTransition",
	"excentos/util",
	"excentos/queue/Animation"
], function(declare, lang, fx, dom, domClass, domStyle, domGeometry, shared, _PhasedTransition, util, Animation){

	var LoaderTransition = declare(
		"excentos.transition.LoaderTransition",
		_PhasedTransition,
		{

			declaredClass: "LoaderTransition",
			maxDuration: 500,
			//we dont want 1px-kind-animation to take the amount of ´maxDuration´ to finish.
			//so the transition calculates whether it is faster to use the pxPerSecond or the duration for animation
			pxPerSecondSpeed: 600,

			domAppRootId: "xc_application",
			domAppPaneId: "xc_application_pane",
			domAppLoaderId: "xc_loader",

			autostart: true,

			init: function(){
				this.inherited(arguments);
				this.autostart && this.createAutostartListener();
			},

			createAutostartListener: function(){
				// summary: autostart transition as soon as the required domNodes are available
				var self = this;
				var areDomAppNodesAvailable = function(){return self._areDomAppNodesAvailable()};
				var breakOnInitDone = function(){return shared.initDone};
				var startTransition = function(){self.start()};

				util.poll(areDomAppNodesAvailable, breakOnInitDone).then(startTransition);
			},
			_areDomAppNodesAvailable: function(){
				return !!(dom.byId(this.domAppRootId) && dom.byId(this.domAppPaneId) && dom.byId(this.domAppLoaderId));
			},

			createElements: function(){
				this.PHASES.ANIMATION_HIDE = this.invoker(this, function(){
					domStyle.set(this.domAppPaneId, "opacity", 0);
				});
				this.PHASES.LISTEN = this.dynamic(this, function(){
					return shared.initDone || this.listener(shared.behavior, "onInitDone");
				});
				this.PHASES.ANIMATION_SHOW = this.sequence([
					//hide loader
					this.animation(fx.fadeOut({
						node: this.domAppLoaderId,
						duration: 250
					})),
					//avoid failing resolve of this.domAppRootId at runtime
					this.dynamic(this, function(){
						//auto scroll - dojox.fx.scroll has a different interface compared to any other dojo._Animation
						return this.animation(util.scrollToNode(
							this.domAppRootId, {
								duration: 750,
								y: -20,
								autoplay: false
								//we have to disable the ´hasNode()´ check in queue.Animation in order to work with dojox.fx.scroll
							}), null, {checkNode: false});
					}),

					//adjust height
					this.dynamic(this, function(){
						var prevHeight = domGeometry.position(this.domAppRootId).h;
						var newHeight = domGeometry.position(this.domAppPaneId).h;

						return this.animation(fx.animateProperty({
							node: this.domAppRootId,
							duration: Animation.dynamicDuration(prevHeight, newHeight, this.pxPerSecondSpeed, this.maxDuration),
							properties: {
								height: newHeight
							}
						}));
					}),
					//show app
					this.animation(fx.fadeIn({
						node: this.domAppPaneId,
						duration: 500
					})),
					this.dynamic(function(){
						domClass.add(document.body, "xc_init_loader_done");
					})
				]);
			}
		});

	return LoaderTransition;
});