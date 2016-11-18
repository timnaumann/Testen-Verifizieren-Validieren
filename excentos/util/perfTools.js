define([
        "dojo/_base/lang",
        "excentos/shared"
], function(lang, shared) {
	/**
	 * collection of tools for analyzing our efficiency
	 */
	var perfTools = lang.getObject("excentos.util.perfTools", true);

	perfTools.analyzeDomByClass = function() {
		var allTags = document.body.getElementsByTagName('*');
		var classFreq = {}; // {"className" : /*frequency*/ 99, ...}
		for ( var tg = 0; tg < allTags.length; tg++) {
			var tag = allTags[tg];
			if (tag.className) {
				var classes = tag.className.split(" ");
				for ( var cn = 0; cn < classes.length; cn++) {
					var cName = classes[cn];
					if (!classFreq[cName]) {
						classFreq[cName] = 1;
					} else {
						classFreq[cName]++;
					}
				}
			}
		}
		var sortable = [];
		for (var cls in classFreq){
			sortable.push([ cls, classFreq[cls] ]);
		}
		sortable.sort(function(a, b){return b[1] - a[1];});
		console.log("[the following is a wikitext table]\n ||=CSS class=||=# of DOM nodes set=||");
		for (var i = 0; i < sortable.length; i++) {
			console.log("||" + sortable[i][0] + "||" + sortable[i][1]+"||");
		}
	};
	
	perfTools.printWidgetBuildTimings = function(){
		var raw = shared.widgetFactory.getPerfData(); // [["widget.class.name", "instance.id", /*time in ms*/ 99], ...]
		var perClass = {}; // {"class.name": {total: 9999, count: 999}, ...}
		for(var i=1;i<raw.length;i++){
			if(!perClass[raw[i][0]]){ // init
				perClass[raw[i][0]] = {total: raw[i][2], count: 1};
			}else{ // increment
				perClass[raw[i][0]].total += raw[i][2];
				perClass[raw[i][0]].count++;
			}
		}
		// TODO sort by total
		console.log("[the following is a wikitext table]\n ||=widget class=||=total time (ms)=||=instance count=||=time per istance (ms)=||");
		for(var key in perClass){
			val = perClass[key];
			console.log("||"+key+"||"+val.total+"||"+val.count+"||"+Math.round(val.total/val.count));
		}
	};
	
	return perfTools;

});
