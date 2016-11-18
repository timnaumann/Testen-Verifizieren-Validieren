define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/connect",
	"dojo/dom-construct",
	"dojo/cookie",
	"dojo/dnd/Moveable",
	"dojox/layout/ResizeHandle",
	"dijit/layout/_LayoutWidget",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/layout/TabContainer",
	"dojo/text!./templates/Dashboard.html",
	"dijit/layout/ContentPane"
], function(declare, array, connect, domConstruct, cookie, Moveable, ResizeHandle, _LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, TabContainer, template){


return declare(
	"excentos.widget.development.Dashboard",
	[_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin],
{
	
	templateString: template,
	widgetsInTemplate: true,
	
	// Provide template data.
	xcInitial: xcInitial,
	devVars: xcInitial.development,
	
	open: true,
	
	constructor: function(){
		this._stagePaneConnects = [];
	},
	
	postCreate: function(){
		
		this._restorePosition();
		
		// Make draggable.
		this._moveable = new Moveable(this.domNode, {handle: this.titleBarNode});
		// Replace method 'cause it doesn't handle position:fixed.
		this._moveable.onDragDetected = function(/* Event */ e){
			var mover = new this.mover(this.node, e, this);
			// Replace method 'cause it doesn't handle position:fixed.
			mover.onFirstMove = function(e){
				var s = dojo.getComputedStyle(mover.node), l, t, h = mover.host;
				// assume that left and top values are in pixels already
				l = Math.round(parseFloat(s.left)) || 0;
				t = Math.round(parseFloat(s.top)) || 0;
				mover.marginBox.l = l - mover.marginBox.l;
				mover.marginBox.t = t - mover.marginBox.t;
				if(h && h.onFirstMove){
					h.onFirstMove(mover, e);
				}
				// Disconnect onmousemove and ontouchmove events that call this function
				dojo.disconnect(mover.events.shift());
			};
		};
		this.connect(this._moveable, "onMoveStop", "_savePosition");
		
		// Make resizeable.
		this._resizeHandle = new ResizeHandle({
			targetId: this.id
		}, this.resizeHandleNode);
		this.connect(this._resizeHandle, "onResize", function(){
			this.layout();
			this._savePosition();
		});
		
		// Create content.
		this.createStagePane();
		this.createConfigPane();
		
		this.refreshLogin();
		
		cookie("xcShowDevelopmentDashboard", "true");
		
		var opacity = .75;
		dojo.style(this.domNode, "opacity", opacity);
		this.connect(this.domNode, "onmouseenter", function(){
			opacity = dojo.style(this.domNode, "opacity");
			dojo.style(this.domNode, "opacity", 1);
		});
		this.connect(this.domNode, "onmouseleave", function(){
			dojo.style(this.domNode, "opacity", opacity);
		});
	},
	
	_savePosition: function(){
		var cs = dojo.getComputedStyle(this.domNode);
		var position = dojo.toJson({left: cs.left, top: cs.top, width: cs.width, height: cs.height});
		cookie("xcDevelopmentDashboardPosition", position);
	},
	
	_restorePosition: function(){
		var position;
		if(position = cookie("xcDevelopmentDashboardPosition")){
			position = dojo.fromJson(position);
			dojo.style(this.domNode, position);
		}
	},
	
	refresh: function(){
		this._destroyStagePane();
		this.createStagePane();
	},
	
	createStagePane: function(){
		var facetGroupVars = excentos.shared.store.getFacetGroupVars();
		array.forEach(this._getStages(), function(stage){
			var name = domConstruct.toDom("<span class='xc_name'>" + stage.name.replace("xcAjaxClient.", "") + "</span>");
			this._stagePaneConnects.push(
				connect.connect(name, "onclick", function(){
					excentos.shared.behavior.moveToAccessibleStage(stage.name);
				})
			);
			var node = document.createElement("div");
			node.style.whiteSpace = "nowrap";
			node.appendChild(name);
			var label;
			if(stage.name == facetGroupVars.currentStageInView){
				label = document.createElement("span");
				label.appendChild(document.createTextNode("current"));
			}
			if(stage.name == facetGroupVars.previousStageInPath){
				label = document.createElement("span");
				label.appendChild(document.createTextNode("previous"));
			}
			if(stage.name == facetGroupVars.nextStageInPath){
				label = document.createElement("span");
				label.appendChild(document.createTextNode("next"));
			}
			if(label){
				dojo.addClass(label, "xc_pointer");
				node.appendChild(document.createTextNode(" "));
				node.appendChild(label);
			}
			domConstruct.place(node, this.stagesNode);
		}, this);
	},
	
	_destroyStagePane: function(){
		array.forEach(this._stagePaneConnects, function(handle){
			handle.remove();
		});
		dojo.empty(this.stagesNode);
	},
	
	createConfigPane: function(){
		var configItems = excentos.shared.store.getConfigItems();
		if(excentos.propCount(configItems)){
			var table = document.createElement("table");
			excentos.forIn(configItems, function(configItem, configKey){
				dojo.place(domConstruct.toDom("<tr><th>" + configKey + "</th><td>" + configItem + "</td></tr>"), table);
			}, this);
			this.configNode.appendChild(table);
			dojo.isIE == 7 && this.configNode.appendChild(document.createTextNode("IE7 can't display..."));
		}else{
			dojo.place(domConstruct.toDom("empty"), this.configNode);
		}
	},
	
	layout: function(){
		this._sizeTabContainer();
		array.forEach(this.getChildren(), function(child){
			child.resize && child.resize();
		});
	},
	
	_sizeTabContainer: function(){
		var rootCb = dojo.getContentBox(this.domNode);
		var contentCs = dojo.getComputedStyle(this.contentNode);
		var height = rootCb.h - dojo.getMarginBox(this.titleBarNode).h - parseFloat(contentCs.paddingTop) - parseFloat(contentCs.paddingBottom);
		var width = rootCb.w - parseFloat(contentCs.paddingLeft) - parseFloat(contentCs.paddingRight);
		this.tabContainer.resize({w: width, h: height});
	},
	
	toggle: function(){
		this[this.open ? "hide" : "show"]();
	},
	
	show: function(){
		dojo.style(this.domNode, "display", "");
		this.open = true;
		dojo.cookie("xcShowDevelopmentDashboard", "true");
	},
	
	hide: function(){
		dojo.style(this.domNode, "display", "none");
		this.open = false;
		dojo.cookie("xcShowDevelopmentDashboard", "false");
	},
	
	_printStoreToConsole: function(){
		console.group(xcInitial.masterApplicationName.toUpperCase() + " STORE INDICES:");
		console.dir(excentos.shared.store._idx.applicationItems[xcInitial.masterApplicationName]);
		console.log("METADATA:");
		console.dir(excentos.shared.store._idx.metaData.byKey);
		console.groupEnd();	
	},
	
	_onResetAppClick: function(){
		excentos.shared.behavior.onRestart();
	},
	
	_getStages: function(){
		var store = excentos.shared.store;
		var stages = [];
		
		function x(fgItems){
			array.forEach(fgItems, function(fg){
				if(fg.type == "STAGE"){
					stages.push(fg);
				}else if(fg.facetGroupItems){
					x(store.getOrderedFacetGroupsByName(fg.name));
				}
			});
		}
		
		x(store.getOrderedFacetGroupsByName(store.getFacetGroups().facetRootGroup.name));
		
		return stages;
	},

//	_setStagesNotInView: function(stages){
//		array.forEach(stages, function(stage){
//			var node = dojo.byId(excentos.util.generateCssIdFromName(stage.name, "facetgroup"));
//			node && dojo.addClass(node, "xc_notinview");
//		});
//	},
//	
//	_setStageInView: function(stageName){
//	 	var node = dojo.byId(excentos.util.generateCssIdFromName(stageName, "facetgroup"));
//		node && dojo.removeClass(node, "xc_notinview");
//	},
//	
//	_clientMoveToStage: function(stageName){
//		this._setStagesNotInView(this._getStages());
//		this._setStageInView(stageName);
//	},
	
	_saveProfileSerialization: function(){
		var key = xcInitial.development.serviceBaseUrl + xcInitial.masterApplicationName + "/profileSerialization";
		localStorage.setItem(key, excentos.shared.store.getMetaData().queryProfileSerialization);
	},
	
	_getProfileSerialization: function(){
		var key = xcInitial.development.serviceBaseUrl + xcInitial.masterApplicationName + "/profileSerialization";
		return localStorage.getItem(key);
	},
	
	_applyProfileSerialization: function(){
		excentos.shared.controller.callService("setProfileBySerialization", {
			getParams: {
				returns: ["facetVars", "facetGroupVars"]
			},
			postParams: {
				queryProfileSerialization: this._getProfileSerialization()
			}
		});
	},
	
	_saveComparison: function(){
		var key = xcInitial.development.serviceBaseUrl + xcInitial.masterApplicationName + "/comparisonList";
		// TODO Add getter for ordered products in comparison list to store.
		var products = [];
		excentos.forIn(excentos.shared.store._data.applicationItems.app_riflescope.comparisonList.productItems, function(product){
			products.push("" + product.productId);
		});
		localStorage.setItem(key, dojo.toJson(products));
	},
	
	_loadComparison: function(){
		var key = xcInitial.development.serviceBaseUrl + xcInitial.masterApplicationName + "/comparisonList";
		return dojo.fromJson(localStorage.getItem(key));
	},
	
	_addSavedProductsToComparison: function(){
		excentos.shared.behavior.addProductsToComparison(this._loadComparison());
	},
	
	_restartWithNewSession: function(){
		// Delete session cookie.
		cookie("xcSessId", null, {expires: -1});
		cookie("JSESSIONID", null, {expires: -1, path: xcInitial.development.serviceBaseUrl.substr(0, xcInitial.development.serviceBaseUrl.length - 1)});
		// Reload page.
		location.reload();
	},
	
	refreshLogin: function(){
		var data = excentos.shared.store.getGlobalMetaData();
		if(data.validLogin){
			this.loggedInNode.style.display = "";
			this.loggedOutNode.style.display = "none";
			this.userNameNode.innerHTML = data.currentUserName;
		}else{
			this.loggedInNode.style.display = "none";
			this.loggedOutNode.style.display = "";
		}
	},
	
	_login: function(){
		excentos.shared.controller.callService("login", {postParams: {userName: "admin", password: "developer#42", terminal: ""}});
	},
	
	_logout: function(){
		excentos.shared.controller.callService("logout");		
	}
});

});
