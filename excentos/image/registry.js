define([
    "dojo/_base/array",
    "./preload"
], function(array, preload){

//	summary;
//		a database of image URLs and the widgets where they are used
//      helps application code to selectively pre-load images without having
//      to scan the DOM or maintain manually edited URL lists.
//      Triggering preloads multiple times for the same widget is ok (remembers 
//      what's preloaded already). 

return {
	images:[],
	
	add: function(/*String*/ url, /*Widget*/ widget, /*String*/ type){
		// summary:
		//		called by code that generates or handles image URLs in the context of a widget
		//      adds a new image to the index, assuming it's not been preloaded yet
		//	url: String
		//		Image Url
		//	widget: Widget
		//		the widget that contains the Image Reference 
		//      (if enrichment, the enrichable is written into the datatbase)
		//  type: String
		//      an arbitrary string passed by the code adding the image
		if(widget.enrichableWidget !== undefined) widget = widget.enrichableWidget;
		var img = {url: url, widget: widget, type : type, done : false};
		img.apiName = widget.isApiWidget ? widget.apiName : "";
		this.images.push(img);
	},
	
	preloadApiWidget: function(/*String*/ apiName){
		// summary:
		//		triggers preloading of the images contained in the given apiWidget 
		//      and all its child apiWidgets as far as they're known to the registry. 
		// apiName: String
		//		something like "wizard.phase1.requirements".  
		//      See excentos/widget/_ApiWidget for details
		// returns:
		//      a deferredList for the resulting preloads
		var images = array.filter(this.images, function(item){
			return (item.apiName.indexOf(apiName) == 0
					&& !item.done);
		});
		var urls = array.map(images, function(item){
			item.done = true;
			return item.url;
		});
		return preload(urls);
	}
};

});
