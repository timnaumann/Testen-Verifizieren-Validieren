define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"./shared",
	"./widget/WidgetFactory",
	"./widget/registry",
	"./widget/error/Dialog",
	"./widget/error/ServiceContent",
	"./widget/error/ErrorContent"
], function(declare, array, shared, WidgetFactory, xcWidgetRegistry, Dialog, ServiceErrorContent, ErrorContent){

	function getInstance(_class, makeParams){
		var id = makeParams && makeParams.id,
			instance = 	xcWidgetRegistry.byId(id) ||
						WidgetFactory.makeWidget(_class, makeParams);

		return instance;
	}

return declare(null, {
	
	onError: function(type, errors){
		function test(args){
			return array.every(args, function(arg){
				for(var i = 0, l = errors.length; i < l; i++){
					if(arg == errors[i] || arg == errors[i].name){
						return true;
					}
				}
				return false;
			});
		}
		function getArgs(name){
			for(var i = 0, l = errors.length; i < l; i++){
				if(errors[i].name == name){
					return errors[i].args || [];
				}
			}
		}
		if(test(["timeout resolved", "new session"])){
			this.onNewSessionAfterTimeout();
		}else if(test(["timeout"])){
			this.onTimeout();
		}else if(test(["timeout resolved"])){
			this.onTimeoutResolved();
		}else if(test(["new session"])){
			this.onNewSession();
		}else if(test(["error"])){
			this.showError(getArgs("error")[0]);
		}
	},
	
	showServiceErrorDialog: function(/*dijit._Widget*/ content){
		var dialog = getInstance(Dialog, {id: "xc_service_error_dialog"});
		// Set content only if content is a widget that is not already a child of the dialog.
		// Otherwise the widget will be destroyed and any connect etc will be lost. #1268
		if(!array.some(dialog.getChildren(), function(child){ return child == content; })){
			dialog.set("content", content.domNode);
		}
		dialog.show();
	},
	
	hideServiceErrorDialog: function(){
		var dialog = getInstance(Dialog, {id: "xc_service_error_dialog"});
		dialog.hide();
	},	
	
	showError: function(err){
		if(!xcInitial.debug)return;
		var dialogContent = getInstance(ErrorContent, {id: "xc_error_dialog_content"});
		this.showServiceErrorDialog(dialogContent);
		dialogContent.onError(err);
	},
	
	onTimeout: function(){
		var dialogContent = getInstance(ServiceErrorContent, {id: "xc_service_error_dialog_content"});
		this.showServiceErrorDialog(dialogContent);
		dialogContent.onTimeout();
	},
	
	onTimeoutRetry: function(){
		shared.controller.sendPendingRequests();
	},
	
	onTimeoutResolved: function(){
		var dialogContent = getInstance(ServiceErrorContent, {id: "xc_service_error_dialog_content"});
		dialogContent.onTimeoutResolved();
	},
	
	onNewSession: function(){
		var dialogContent = getInstance(ServiceErrorContent, {id: "xc_service_error_dialog_content"});
		this.showServiceErrorDialog(dialogContent);
		dialogContent.onNewSession();
	},
	
	onNewSessionAfterTimeout: function(){
		var dialogContent = getInstance(ServiceErrorContent, {id: "xc_service_error_dialog_content"});
		dialogContent.onNewSessionAfterTimeout();
	},
	
	onNewSessionConfirm: function(){
		// Reload page with 'xcReset' parameter and no stage info in hash.
		// The question flow needs the reset to set a stage in view.
		location.hash = "xcReset";
		//chrome started to ignore the call to relaod while handling the hash change
		setTimeout(function(){location.reload();},500);
	}
});

});
