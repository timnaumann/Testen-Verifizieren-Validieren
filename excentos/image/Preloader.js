define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/DeferredList",
	"../shared",
	"./preload",
	"../util",
	"../Singleton"
], function(declare, array, DeferredList, shared, ImagePreload, util, Singleton){

var deferredCount = 0;
var _cache = {byFacetGroupName: {}, byFileName: {}};


function stringifyObj(obj){
	//TODO: check if JSON.stringify would be faster
	var str="", name="";
	for(name in obj){str += "\n"+obj[name];}
	return str;
};
var imageFileNameRegex = /[^\"\'\r\n ]+?\.(?:jpg|png|gif)/ig;
function getFilesFromString(/*String*/ str){
	var matches = [];
	matches = str && str.match(imageFileNameRegex);
	return matches ? matches : [];
};

function addFilesToCache(/*Array*/ files, /*string*/ name){
	var results = [];
	if(files && files.length){
		for(var i=0, file, l=files.length; i<l; i++){
			file = files[i];
			if(!(file in _cache.byFileName)){
				_cache.byFileName[file] = file;
			}
			results.push(file);
			
			var c = _cache.byFacetGroupName;
			(c[name] || (c[name]=[])) && !~array.indexOf(c[name],file) && c[name].push(file);
		}
	}
	return results;
};


return Singleton(declare("excentos.image.Preloader",null,{
	
	constructor: function(){
		this.deferreds= {};
		this.staticImages = {};
	},
	
	getStaticImages: function(identifier){
		return this.staticImages[identifier] || [];
	},	
	
	getDynamicImagesByFacetGroupName: function(name){
		console.warn(this.declaredClass+"::"+arguments.callee.nom+" is deprectated");
		if(!name)return;
		
		var results = [];
		if(name in _cache.byFacetGroupName)return _cache.byFacetGroupName[name];
		
		var groups = shared.store.getFacetGroupsByNameRecursive(name);
		var facets = shared.store.getFacetsInGroupByGroupNameRecursive(name);
		
		if(groups){
			for(var fgname in groups){
				var fg = groups[fgname];
				var groupImgs = this.getImagesFromData("group", fg);
				results = results.concat(groupImgs);
			}
		}
		
		if(facets){
			for(var figname in facets){
				var fig = facets[figname];
				var facetImgs = this.getImagesFromData("facet", fig);
				results = results.concat(facetImgs);
				
				for(var stateName in facets[figname].facetInGroupStateItems){
					var state = fig.facetInGroupStateItems[stateName];
					stateImgs = this.getImagesFromData("state", state, fig);
					results = results.concat(stateImgs);
				}
			}
		}
		
		addFilesToCache(results, name);
		return results;
	},
	
	getImagesFromData: function(type, data, parent){
		var dataString = stringifyObj(data.contentItems) + stringifyObj(data.configItems);
		var fileList = !!dataString && getFilesFromString(dataString);
		return fileList || [];
	},
	
	load: function(urls, name, timeout){
		name = name || "deferred"+(++deferredCount);
		
		var defs = this.deferreds;
		var def = defs[name];
		var newdef = [new ImagePreload(urls, timeout)];

		def && newdef.unshift(def);
		def = defs[name] = new DeferredList(newdef);
		def.then(function(){delete defs[name];});
		
		return def;
	},
	
	loadStatic: function(identifier){return this.load(this.getStaticImages(identifier), identifier);},
	loadDynamic: function(identifier){return this.load(this.getDynamicImagesByFacetGroupName(identifier), identifier);},
	
	add: function(type, imageUrls){
		imageUrls = typeof imageUrls == "string" ? [imageUrls] : imageUrls;
		var arr = this.staticImages[type] || (this.staticImages[type]=[]);
		arr.push.apply(arr,imageUrls);
	},
	
	getDeferred: function(name){
		// summary:
		//	returns a deferred by given name , or a DeferredList of all available Deferreds
		// returns Deferred
		var def = this.deferreds;
		if(name){
			return def[name];
		}else {
			var defs = [];
			for(var name in def){
				!~def.fired && defs.push(def[name]);
			}
			return new DeferredList(defs);
		}
	}
	
}));

});