//todo use dojo/tobotx for automated clicks
define([
	"dojo/json",
	"dojo/query",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/on",
	"excentos/util",
	"excentos/tracking/linkTracker",
	"excentos/tracking/Tracker",
	"dojo/domReady!"
], function(json, query, array, lang, on, util, linkTracker, Tracker){

	var TestWidget = function(url, /*String?*/ target, /*String?*/ text){this.init.apply(this, arguments)}
	TestWidget.prototype = {
		constructor: TestWidget,

		url: "",
		target: "",
		text: "",

		linkNode: null,
		domNode: null,
		outputNode: null,

		init: function(/*String*/ url, /*String?*/ target, /*String?*/ text){
			this.url = url;
			this.target = target;
			this.text = text;

			this._createLink();
			this._addClick();
		},

		_createLink: function(){
			var div = document.createElement("div");
			var txt = document.createElement("textarea");
			var a = document.createElement("a");

			a.innerHTML = [url, target||"", text||""].join(", ");
			a.href = url;
			a.target = target || "";

			div.appendChild(a);
			div.appendChild(txt);

			this.domNode = div;
			this.linkNode = a;
			this.outputNode = txt;
		},

		_addClick: function(){
			on(this.linkNode, "click", lang.hitch(this, this._onClick));
		},

		_onClick: function(/*Event*/ e){
			this._output(json.stringify({
				xcRedispatchedEvent: !!e.xcRedispatchedEvent
			}));
		},

		_assertClickEvent: function(/*Event*/ e){
			return
		},

		_output: function(/*String*/ text){
			this.outputNode.innerHTML += text+"<br>";
		},

		addSimulatedExternalClickHandler: function(){
			on(this.linkNode, "click", lang.hitch(this, this.onSimulatedExternalClick));
		},

		onSimulatedExternalClick: function(/*Event*/ e){
			this._output(json.stringify({
				onSimulatedExternalClick: true
			}));
		}
	};

	(function run(){
		//override
		Tracker.track = function(){alert("... tracking", [].slice.call(arguments)+"")};

		var links = [
			new TestWidget("http://excentos.com", ""),
			new TestWidget("http://excentos.com", "_self"),
			new TestWidget("http://excentos.com", "_blank")
		];

		linkTracker.initLinks(document.documentElement, ["goto.product.details",0]);


		array.forEach(links, function(w){w.addSimulatedExternalClickHandler()})
	}());

});



