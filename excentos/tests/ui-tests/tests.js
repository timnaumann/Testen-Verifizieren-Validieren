/**
 * UI Test Functions
 */

"use strict";

var utils = require("./util");
var logger = require("./logger");

module.exports = {
	/**
	 * Checks the xcInitial content to be valid.
	 * Returns true if everything is ok. Otherwise false.
	 */
	checkXcInitial: function(page){
		return page.evaluate(function(){
			// xcInitial is missing
			if((typeof xcInitial) === "undefined" || xcInitial === null){
				logger.log("xcInitial: undefined");
				return false;
			}
			// has errorCode set
			if( xcInitial.errorCode > 0 ){
				logger.log("xcInitial: error code set: " + xcInitial.errorCode);
				return false;
			}
			// no valid payload
			if(xcInitial.payload === undefined && xcInitial.payload === null){
				logger.log("xcInitial: no valid payload");
				return false;
			}
			// service exceptions in payload
			if(xcInitial.payload.serviceExceptionItems !== undefined && xcInitial.payload.serviceExceptionItems !== null){
				logger.log("xcInitial: service exception items in payload");
				return false;
			}
			return true;
		});
	},
	/**
	 * Checks the master application name from the xcInitial object
	 */
	checkMasterApplicationName: function(page){
		return utils.getMasterApplicationName(page);
	},
	/**
	 * Checks for theme
	 */
	checkThemeName: function(page){
		return utils.getThemeName(page);
	},
	/**
	 * Checks for phase
	 */
	checkStageName: function(page){
		return utils.getStageName(page);
	},
	/**
	 * Checks for wizard navigation
	 */
	checkWizardNavigation: function(page){
		//return utils.getDomNodesCount(page, "[widgetid*=widget_facetgroup_wizard_TopicNavigation]") || utils.getDomNodesCount(page, "[widgetid*=widget_facetgroup_wizard_PhaseNavigation]");
		return utils.getDomNodesCount(page, "[class*=xc_navigation]");
	},
	/**
	 * Checks for wizard
	 */
	checkWizard: function(page){
		return utils.getDomNodesCount(page, "[data-dojo-attach-point='wizardNode']");
	},
	/**
	 * Checks for primary action button - check stage in path navigation
	 */
	checkStageInPathNavigation: function(page){
		return utils.getDomNodesCount(page, "[widgetid*=xc_stage_in_path_navigation]");
	}
};
