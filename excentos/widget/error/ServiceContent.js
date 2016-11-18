define([
	"dojo/_base/declare",
	"dojo/dom-style",
	"excentos/shared",
	"../_Widget"
], function(declare, style, shared, _Widget){

return declare(
	"excentos.widget.error.ServiceContent",
	_Widget,
{
	templateString: '<div class="xc_serviceerrordialog_content">\
						<div data-dojo-attach-point="timeoutPaneNode">\
							<div class="xc_heading">%{i18n.serviceerrordialog_timeout_heading}</div>\
							<div>%{i18n.serviceerrordialog_timeout_text}</div>\
							<div class="xc_loader"></div>\
							<div class="xc_button" data-dojo-attach-event="onclick:onReloadPage">\
								<span data-dojo-attach-point="closeButtonTextNode">%{i18n.serviceerrordialog_error_reload}</span>\
							</div>\
						</div>\
						<div data-dojo-attach-point="newSessionPaneNode">\
							<div class="xc_heading">%{i18n.serviceerrordialog_newsession_heading}</div>\
							<div>%{i18n.serviceerrordialog_newsession_text}</div>\
							<div class="xc_button" data-dojo-attach-event="onclick:_onNewSessionConfirmClick">\
								<span data-dojo-attach-point="closeButtonTextNode">%{i18n.serviceerrordialog_newsession_button}</span>\
							</div>\
						</div>\
						<div data-dojo-attach-point="newSessionAfterTimeoutPaneNode">\
							<div class="xc_heading">%{i18n.serviceerrordialog_newsessionaftertimeout_heading}</div>\
							<div>%{i18n.serviceerrordialog_newsessionaftertimeout_text}</div>\
							<div class="xc_button" data-dojo-attach-event="onclick:_onNewSessionConfirmClick">\
								<span data-dojo-attach-point="closeButtonTextNode">%{i18n.serviceerrordialog_newsessionaftertimeout_button}</span>\
							</div>\
						</div>\
					</div>',
	
	_showPane: function(pane){
		// Hide all panes.
		style.set(this.timeoutPaneNode, "display", "none");
		style.set(this.newSessionPaneNode, "display", "none");
		style.set(this.newSessionAfterTimeoutPaneNode, "display", "none");
		// Show pane.
		style.set(this[pane + "PaneNode"], "display", "");
	},
	
	onTimeout: function(){
		this._showPane("timeout");
		shared.behavior.errorManager.onTimeoutRetry();
	},
	
	onTimeoutResolved: function(){
		shared.behavior.errorManager.hideServiceErrorDialog();
	},
	
	onNewSession: function(){
		this._showPane("newSession");
	},
	
	onNewSessionAfterTimeout: function(){
		this._showPane("newSessionAfterTimeout");
	},
	
	_onNewSessionConfirmClick: function(){
		shared.behavior.errorManager.onNewSessionConfirm();
	},
	
	onReloadPage: function(){
		location.reload();
	}

});

});
