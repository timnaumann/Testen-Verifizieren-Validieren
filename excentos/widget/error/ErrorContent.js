define([
	"dojo/_base/declare",
	"dojo/dom-style",
	"excentos/shared",
	"./ServiceContent",
	"../../rpc/ProfilerAPIError",
	"../../rpc/ProfilerAPIException"
], function(declare, style, shared, ServiceContent, ProfilerAPIError, ProfilerAPIException){

return declare(
	"excentos.widget.error.ErrorContent",
	[ServiceContent],
{
	relativeTemplatePath: "error/ErrorContent.html",
	templateString: '<div class="xc_errordialog_content">\
						<div data-dojo-attach-point="profilerErrorPaneNode">\
							<div class="xc_heading">Profiler Error</div>\
						</div>\
						<div data-dojo-attach-point="profilerExceptionPaneNode">\
							<div class="xc_heading">Profiler Exception</div>\
						</div>\
						<div data-dojo-attach-point="clientErrorPaneNode">\
							<div class="xc_heading">Client Error</div>\
						</div>\
						<div data-dojo-attach-point="userErrorPaneNode">\
							<div class="xc_heading">%{i18n.serviceerrordialog_error_heading}</div>\
							<div class="xc_errormessage">%{i18n.serviceerrordialog_error_text}</div>\
						</div>\
						<div class="xc_errortype" data-dojo-attach-point="errTypeNode"></div>\
						<div class="xc_errorcode" data-dojo-attach-point="errCodeNode"></div>\
						<div class="xc_errormessage" data-dojo-attach-point="errMessageNode"></div>\
						<pre class="xc_errorstack" data-dojo-attach-point="errStackNode"></pre>	\
						<div class="xc_button" data-dojo-attach-point="closeButtonNode" data-dojo-attach-event="onclick:onReloadPage">\
							<span data-dojo-attach-point="closeButtonTextNode">%{i18n.serviceerrordialog_error_reload}</span>\
						</div>\
					</div>',
	
	TYPE_OF_ERROR: {
		UNKNOWN:			{pane:null,					handled:false},
		NATIVE_ERROR: 		{pane:"clientError",		handled:false},
		PROFILER_ERROR: 	{pane:"profilerError", 		handled:true},
		PROFILER_EXCEPTION:	{pane:"profilerException",	handled:true}
	},
	
	error: null,
	aspectHandlers: null,
	activePane: "",
	
	constructor: function(){
		this.aspectHandlers = [];
	},

	postCreate: function(){
		this.inherited(arguments);
		//handle case where `this.error` is already set
		if(this.error){
			this.onError(this.error);
		}
	},
		
	_showPane: function(pane){
		this.activePane = pane;
		
		// Hide all panes.
		style.set(this.profilerErrorPaneNode, "display", "none");
		style.set(this.profilerExceptionPaneNode, "display", "none");
		style.set(this.clientErrorPaneNode, "display", "none");
		style.set(this.userErrorPaneNode, "display", "none");
		
		// Show pane.
		if(!pane)return;
		style.set(this[pane + "PaneNode"], "display", "");
	},
	
	onError: function(err){
		this.error = err;
		
		var code = err.code==undefined ? "" : "ERROR #"+err.code,
			type = err.type==undefined ? "" : "TYPE #"+err.type,
			message = err.message || err.description || "",
			stack = err.stack || err.trace || "",
			typeOfError = this.getTypeOfError(err),
			paneName = this.TYPE_OF_ERROR[typeOfError].pane;
		
		if(this.isHandledError(typeOfError)){
			if(xcInitial.debug){
				this.errCodeNode.innerHTML 		= code;
				this.errMessageNode.innerHTML 	= message;
				this.errStackNode.innerHTML 	= "<pre>"+stack+"<pre>"; //http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
				this.errTypeNode.innerHTML 			= type;
				this._showPane(paneName);
				
				//the dialog misses a resize after the pane is shown
				//so we give it a little hint
				var dialogWidget = this.getParent();
				dialogWidget.layout();
			}
			 else {
				this.errCodeNode.innerHTML 		= "";
				this.errMessageNode.innerHTML 	= "";
				this.errStackNode.innerHTML 	= "";
				this.closeButtonTextNode.innerHTML = this.i18n.serviceerrordialog_error_reload;
				this._showPane("userError");
			}
		}
	},
	
	isHandledError: function(typeOfError){
		for(var name in this.TYPE_OF_ERROR){
			if(name==typeOfError){
				return true;
			}
		}
		return false;
	},
	
	_onClick: function(){
		if(this.activePane == "userError"){
			this.onReloadPage();
		}
		else {
			this.onClose();
		}
	},
	onReloadPage: function(){
		location.reload();
	},
	onClose: function(){
		shared.behavior.errorManager.hideServiceErrorDialog();
	},
	
	showFallback: function(){
		domStyle.set("xc_application", "display", "none");
		domStyle.set("xc_fallback", "display", "block");
	},
	
	getTypeOfError: function(err){
		if(err instanceof ProfilerAPIException){
			return "PROFILER_EXCEPTION";
		}
		
		if(err instanceof ProfilerAPIError){
			return "PROFILER_ERROR";
		}
		
		if(Object.prototype.toString.call(err) == "[object Error]"){
			return "NATIVE_ERROR";
		}

		return "UNKNOWN";

	}

});

});
