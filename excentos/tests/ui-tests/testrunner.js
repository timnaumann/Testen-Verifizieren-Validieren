/**
 * PhantomJS - Test Runner
 * Load config.js and execute enabled tests from tests.js
 * Use Utils from util.js
 *
 * Usage: phantomjs <component file> <site integration URL>
 */

"use strict";

var config = require("./configDefault");
var tests = require("./tests");
var utils = require("./util");
var logger = require("./logger");

var LOG_SAFE = "jenkins-build-safe";
//replace uncontrolled occurrences of "error" with "failure"
logger.setFormatter(LOG_SAFE, function(message){
	return (message+"")
		.replace(/Error/g, "Err")
		.replace(/ERROR/g, "ERR")
		.replace(/error/gi, "err");
});

function Testrunner(nameString, customConfigObject, customTestFunctionsObject){

	var testrunner = this;

	if(!(this instanceof Testrunner)){
		return new Testrunner(nameString, customConfigObject, customTestFunctionsObject);
	}

	// test name
	this.name = nameString;
	this.customConfigObject = customConfigObject;
	this.customTestFunctionsObject = customTestFunctionsObject;

	// update config and test cases
	this.updateConfig();
	this.updateTests();

	// setup context
	this.page = require('webpage').create();
	this.page.settings.userAgent = 'Mozilla/5.0 (compatible; excentosbot/1.0;)';
	this.page.settings.resourceTimeout = 10000; // 10 seconds

	// development settings
	this.page.settings.javascriptEnabled = true;
	this.page.onConsoleMessage = function(/*String*/ message, /*Number*/ lineNum, /*String*/ sourceId) {
		logger.queue(message + '(from ' + sourceId + '#' + lineNum + ')');
	};
	this.page.onError = function(/*String*/ message, /*Array*/ trace) {
		var msgStack = [message];

		if (trace && trace.length) {
			trace.forEach(function(t) {
				msgStack.push('-> ' + t.file + ':' + t.line + (t["function"] ? ' (in function "' + t["function"] +'")' : ''));
			});
		}
		logger.queue(msgStack.join('\n'));
	};

	// listen for page on load event
	this.page.onLoadFinished = function(status){

		if(status === 'success'){
			// start testing
			testrunner.run();
		} else {
			// some other status than 'success' on page load finished
			logger.queue('FAILED TO LOAD CUSTOMER PAGE');
			testrunner.exitOnError();
		}
	};

	//run with --ssl-protocol=tlsv1 to avoid numerous SSL handshake errors
	this.page.onResourceError = function(request) {

		//log failures, but avoid mentioning "error" which triggers a build failed in jenkins log parsing
		logger.queue(['RESOURCEERROR #', request.errorCode, request.url, request.errorString]);
		
		var isExcentosUrl = /\.excentos\./.test(request.url);
		if(isExcentosUrl){
			logger.queue('EXCENTOS RESOURCE COULD NOT BE LOADED');
			testrunner.exitOnError();
		}
	};

	// load web page
	this.page.open(phantom.args[0], function(status) {

		if(status === 'fail'){
			logger.queue('FAILED TO LOAD CUSTOMER PAGE');
			testrunner.exitOnError();
		}
	});
}

Testrunner.prototype.updateConfig = function() {

	// overwrite default config with custom settings
	if(this.customConfigObject){
		config = utils.getMergedObject(config, this.customConfigObject);
	}
};

Testrunner.prototype.updateTests = function() {

	// add custom tests to defaults
	if(this.customTestFunctionsObject){
		tests = utils.getMergedObject(tests, this.customTestFunctionsObject);
	}
};

Testrunner.prototype.run = function(){

	var testrunner = this;
	var page = this.page;

	utils.onAdvisorReady(
		page,
		// on 'excentos.shared.initDone': callback execute tests - util function is polling for initDone
		function(){testrunner.executeTests(testrunner)},
		// errback: no match or too much time polling
		function(){logger.queue('ADVISOR UNAVAILABLE'); testrunner.exitOnError()}
	)
};

Testrunner.prototype.executeTests = function(testrunner){

	var page = this.page;

	var enabledTests = Object.keys(config).forEach(function(key){
		//check if test is enabled
		if(config[key] === true){
			// execute enabled tests and check result with assert function
			testrunner.assert(tests[key](page), key, testrunner);
		}
	
	});

	testrunner.exitOnDone();
};

// check test result - on error take scrennshot and exit phantomjs testing
Testrunner.prototype.assert = function (condition, testName, testrunner){

	var page = this.page;

	// test failed
	if(!condition){
		logger.log("ERROR: " + testName);
		if(utils.getProp(page, "xcInitial")) {
			utils.getScreenShot(page, this.name, utils.getMasterApplicationName(page), utils.getThemeName(page), utils.getStageName(page));
		}
		testrunner.exitOnError();
	}
	// test passed
	else{
		logger.log("Test '" + testName + "' passed: " + condition);
	}
};

Testrunner.prototype.exitOnError = function(){
	this.exit(1, "EXIT ON ERROR");
};

Testrunner.prototype.exitOnDone = function(){
	this.exit(0, "EXIT ON ALL TESTS PASSED");
};

Testrunner.prototype.exit = function(errorCode, /*String*/ msg){
	var _errorCode = errorCode === undefined ? 0 : errorCode,
		_msg = msg || "";
	
	logger.log(_msg);
	logger.log("\nconsole messages:");
	logger.log(logger.getQueue(), LOG_SAFE);
	logger.log("------------------------------------------------------\n");

	phantom.exit(_errorCode);
};

module.exports = Testrunner;
