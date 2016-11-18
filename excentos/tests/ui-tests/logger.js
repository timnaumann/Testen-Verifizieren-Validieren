"use strict";

/**
 * Logger logs strings by type, and
 * Usage:
 * {{{
 *  var logger = require("./logger");
 *  logger.queue("Hello");
 *  logger.queue("World");
 *
 *  logger.log(logger.getQueue()); // "Hello
 *  							  //  World"
 *
 *
 * }}}
 */

var Logger = function(){this.init();};
Logger.create = function(){return new Logger();}
Logger.prototype = {
	messages: null,
	formatters: null,
	constructor: Logger,
	defaultMessageType: "log",

	init: function(){
		this.messages = {};
		this.formatters = {};

		this.setFormatter("unformatted",function(/*String*/ message){return message});
		this.setFormatter(this.defaultMessageType, this.getFormatter("unformatted"));
	},

	create: function(){
		return Logger.create();
	},

	getMessages: function(/*String?*/ type){
		var _type = type || this.defaultMessageType;
		return this.messages[_type] || (this.messages[_type] = []);
	},

	setFormatter: function(/*String*/ type, /*Function*/ format){
		var self = this;
		this.formatters[type] = function(/*String*/ message){
			return format.call(self, message, type);
		}
	},

	getFormatter: function(/*String?*/ type){
		var _type = type || this.defaultMessageType;
		return this.formatters[_type];
	},

	queue: function(/*String|Array*/ message, /*String?*/ type){
		var _message = message instanceof Array ? message.join(" ") : message;

		var messages = this.getMessages(type);
		messages.push(_message);
		return message;
	},

	log: function(/*String|Array*/ message, /*String?*/ formatterName){
		var _message = message instanceof Array ? message.join(" ") : message;
		var formatted = this.getFormatter(formatterName)(_message);
		console.log(formatted);
		return formatted;
	},

	getQueue: function(/*String?*/ type, /*String?*/ formatterName){
		var formatter = this.getFormatter(formatterName||type);
		var messages = this.getMessages(type);
		var formatted = messages.map(formatter).join("\n");
		messages.length = 0; //reset array

		return formatted;
	}
};
module.exports = new Logger;