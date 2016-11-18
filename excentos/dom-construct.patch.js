define([
    "dojo/_base/lang",
    "dojo/aspect",
	"dojo/dom-construct"
], function(lang, aspect, domConstruct){
	
var PatchMapEntry = function(name, condition,patch){
	this.name = name;
	this.condition = condition;
	this.patch = patch;
	
	var _test;
	this.test = function(){return _test = typeof _test !== "undefined" ?  _test : this.condition();};
	this.works = function(){return !!this.test();};
};

var patchMap = {
	/**
	 * Patches misbehavior (occured in IE7) when trying to place a <THEAD> as root node -> 
	 * frag.innerHTML = "<table><thead></thead></table>" //results in table > thead,tbody
	 */
	"thead": new PatchMapEntry(
				"thead",
				function(){
					return domConstruct.toDom("<thead></thead>").childNodes.length == 0;
				},
				function(resultDom, frag){
					//return "thead" from  #docFragment > table > thead,tbody 
					//MAKE SURE TBODY IS NOT INTENTIONALLY
					
					var tbody = resultDom.childNodes[1];
					if(
						resultDom.nodeType==11 && 
						resultDom.childNodes.length == 2 &&
						tbody.nodeName == "TBODY" &&
						tbody.childNodes.length == 0
					){
						resultDom = resultDom.firstChild;
					}
					return resultDom;
				}
	),
	/**
	 * Patches misbehavior (occured in IE7) when trying to place a <TABLE> as root node -> 
	 * frag.innerHTML = "<table></table>" //results in table > tbody
	 */
	"table": new PatchMapEntry(
				"table",
				function(){
					return domConstruct.toDom("<table></table>").childNodes.length == 0;
				},
				function(resultDom, frag){					
					//remove "tbody" from table
					
					var tbody = resultDom.firstChild;
					if(	
						resultDom.childNodes.length==1 && 
						tbody.nodeName == "TBODY" && 
						tbody.childNodes.length == 0 
					){
						resultDom.removeChild(resultDom.firstChild);
					}
					return resultDom;
				}
	)
};

//if any `hasBug` item from `pathMap`returns true
var failedTest;
(function(){
	for(var tagName in patchMap){
		if(!patchMap[tagName].works()){
			failedTest = true;
		}
	}
})();

if(failedTest){
	
	var tagRegex = /<\s*([\w\:]+)/;
	aspect.around(domConstruct, "toDom", function(toDom){
		return function(frag, doc){
			//DomNode || DocumentFragment;
			var resultDom = toDom(frag, doc);
			var match = frag.match(tagRegex),
				tag = match ? match[1].toLowerCase() : "";
				
			if(tag in patchMap && !patchMap[tag].works()){
				resultDom = patchMap[tag].patch(resultDom, frag);
			}			
			
			return resultDom;
		};
	});
}


});