define([
	"dojo/_base/declare",
	"dojo/_base/unload",
	"dojo/_base/window",
	"dojo/has",
	"dojo/json",
	"dojo/dom-class",
	"./widget/registry"
], function(declare, djUnload, djWin, has, JSON, domClass, xcregistry){

var CustomerBackendMixin = declare(null,{
	
	constructor: function(){
		if(CustomerBackendMixin.enabled){
			domClass.add(djWin.body(),"xc_has_customerbackend");
		}
	},
	
	getCustomerBackendInterface: function(){
		return CustomerBackendMixin.enabled ? window.parent.excentos : null;
	},
	
	callEditAction: function(/*String*/ type,/*Object*/ params){
		var cb = this.getCustomerBackendInterface();
		cb && cb.callWicket(
			"editContent",
			JSON.stringify(params)
		);
	},
	
	toggleEditImages: function(/*Object*/ params){
		this.toggleEditActions("contentImage", params);
	},
	
	toggleEditQuestions: function(/*Object*/ params){
		this.toggleEditActions("contentText", params);
	},
	
	toggleEditUiElements: function(/*Object*/ params){
		this.toggleEditActions("all", params);
	},
	
	toggleEditActions: function(/*String*/ type, /*Object*/ params){
		type || (type="all");

		var isActive = params && params.isActive;
		//without the setTimeout delay css3 transitions would be skipped
		setTimeout(function(){
			var args = [djWin.body(), "xc_show_editactions_"+type];

			isActive!=undefined && args.push(isActive);
			domClass.toggle.apply(domClass, args);
		});
	}
});

var customerBackendEnabled = false;
try { customerBackendEnabled = !!window.parent.XC_CUSTOMER_BACKEND }catch(e){ console.info("CustomerBackendMixin::enabled encountered a crossdomain issue" ) }
CustomerBackendMixin.enabled = customerBackendEnabled;
has.add("customer-backend", CustomerBackendMixin.enabled);

return CustomerBackendMixin;
});

