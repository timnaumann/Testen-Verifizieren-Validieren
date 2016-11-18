define([
	"dojo/_base/lang",
	"dojo/number",
	"dojo/has", 
	"excentos/shared",
	"excentos/util",
	"excentos/image/registry"
], function(lang, number, has, shared, util, registry){
	
	var colorRegex = /^[^\:\/\.]+$/;
	// turns out that a regex is the fastest approach see http://jsperf.com/check-valid-color
	function isValidColor(/*String*/ color){return colorRegex.test(color);}
	
	return {
		safe: function(value, key, params, widget){
			return value==undefined ? "" : value;
		},
	
		debug: function(value, key, params, widget){
			return value==undefined ? "%{"+key+"}" : value;
		},
	
		baseUrl: function(value, key, params, widget){
			return value==undefined ? 
				this.safe.apply(this, arguments) : 
				xcInitial.appBaseUrl+"/"+value;
		},
		
		percent: function(value, key, params, widget){
			// summary: 
			//		returns the percentage of `value` in relation to the parameter `base`
			//
			// example:
			//	|	<div class="xc_rating_fill" style="width:%{product.attributeItem.main.rating$base=5:percent}"></div>
			
			value = parseFloat(value); isNaN(value) && (value=0);
			var base = parseFloat(params.replace("$base=","")) || 1;
			return Math.round(value / base * 100) + "%";
		},

		number: function(value, key, params, widget){
			return number.format(value*1, {pattern:params.replace("$pattern=","")});
		},
		
		has: function(value, key, params, widget){
			// summary:
			//	returns "has" if the value exists and "hasno" if it does not.
			//  Use in cases where we have to to add some logic for css classes like "xc_has_rating" / "xc_hasno_rating"
			//
			// example:
			//	|	<div class="xc_product_rating xc_%{product.attributeItem.main.rating:has}_rating">
			
			var num = parseFloat(value);
			return (!isNaN(num) && isFinite(num)) || (value && typeof value == "string") ? "has" : "hasno";
		},

		hasAttribute: function(value, key, params, widget){
			// summary:
			//	returns "has" if the value exists and "hasno" if it does not.
			//  Use in cases where we have to to add some logic for css classes like "xc_has_rating" / "xc_hasno_rating"
			//
			// example:
			//	|	<div class="xc_product_rating xc_%{product.attributeItem.main.rating:has}_rating">

			var num = parseFloat(value);
			return (!isNaN(num) && isFinite(num)) || (value && typeof value == "string") ? value : "";
		},
		
		/**
		 * imageTag formatter. Fills an existing <img> tag with the img URL and style annotations. 
		 * Cannot be used for editables, use editableImageBackground if you need editability.
		 * Pushes generated image URLs into the image Preloader, but doesn't decide whether to preload or not
		 *  
		 *  Usage in the template: 
		 *  <img class="xc_foobar" %{data.contentItems.decoration_image:imageTag}></img>
		 *  <img class="xc_foobar" %{data.contentItems.decoration_image$widthDp=640&heightDp=200:imageTag}></img>
		 *  
		 *  See image resizer documentation for usage of the parameters following the dollar sign.
		 *  
		 *  Resulting HTML (scale is dynamically detected)
		 *  <img class="xc_foobar" 
		 *       src="/BSH/DE/images/foobar/meineDecoration$widthDp=640&heightDp=200&scale=mdpi" 
		 *       style="width:1280px;height:400px"></img>
		 */
		imageTag : function(value, key, params, widget) {
			return value==undefined ?
					this.safe.apply(this, arguments) : 		
					this._getImageTagString(this._parseImgParams.apply(this, arguments), value, params, widget);
		},
				
		/**
		 * imageBackground & editableImageBackground formatters. 
		 * Fills an existing tag with image background, size styleing and optionally customer backend annotations.
		 * Pushes generated image URLs into the image Preloader, but doesn't decide whether to preload or not.  
		 *  
		 *  usage in the template: 
		 *  <div class="xc_foobar" %{data.contentItems.decoration_image:imageBackground}></div>
		 *  <div class="xc_foobar" %{data.contentItems.decoration_image$widthDp=640&heightDp=200:imageBackground}></div>
		 *  
		 *  see image resizer documentation for usage of the parameters following the dollar sign.
		 *  
		 *  resulting HTML for non-editable: (scale is dynamically detected)
		 *  <div class="xc_foobar" 
		 *       style="width:1280px;
		 *              height:400px;
		 *              background-image:url(/BSH/DE/images/foobar/meineDecoration$widthDp=640&heightDp=200&scale=xhdpi)"></div>
		 *
		 *  resulting HTML for editable:
		 *  <div class="xc_foobar" 
		 *       style="width:1280px;
		 *              height:400px;
		 *              background-image:url(/BSH/DE/images/foobar/meineDecoration$widthDp=640&heightDp=200&scale=xhdpi)"
		 *              background-image:url(/BSH/DE/images/foobar/meineDecoration?revision=54SDG31A3DG41$widthDp=640&heightDp=200&scale=xhdpi)"
		 *        data-xc-key="facet.group.scope"
		 *        data-xc-edit-type="contentImage"
	     *        data-xc-content-object="decoration_image"
	     *        data-xc-image-dimensions="1280x400"></div>
		 */
		
		// TODO man kann derzeit noch pixelwerte mit Kommazahlen produzieren, indem man dP Werte angibt, die nicht
		//      glatt umrechenbar sind. Sollte mindestens Warnung ausgeben und selbst runden. 
		
		background: function(value, key, params, widget){
			var valid = isValidColor(value);
			return valid ?
				this._editablePlainTextData.apply(this, arguments)+" style=\"background-color:"+value+";\"" :
				this.editableImageBackground.apply(this, arguments);
		},
		imageBackground : function(value, key, params, widget) {
			return value==undefined ? 
				this.safe.apply(this, arguments) : 
				this._getImageBackgroundString(this._parseImgParams.apply(this, arguments), value, params, widget);		
		},
		editableImageBackground : function(value, key, params, widget) {
			var p = this._parseImgParams.apply(this, arguments);
			return value==undefined ? 
				this.safe.apply(this, arguments) :
				this._getImageBackgroundString(p, value, params, widget) + this._getImageContentEditString(p, widget);	
		},
		
		/**
		 * availableWidthImageBackground formatter
		 * Typically to be used in mobile or responsive Themes that fill the available device or window
		 * width. ASSUMES that the theme class implementation provides a property named "availableWidth"
		 * that contains an integer with the real available content width in CSS pixels. If not, the formatter quits.
		 * for robustness sake the actual CSS sets "100%" as width instead of the calculated value that is passed to 
		 * the server for getting the actual image.
		 *  
		 *  usage in the template (fixed height, background covers area, image bottom cropped):
		 *  <div class="xc_foobar" %{data.contentItems.decoration_image$heightPx=100&widthPaddingPx=10:availableWidthImageBackground}></div>
		 *  
		 *  usage in the template (image aspect ratio given as "width in relation to height"):
		 *  <div class="xc_foobar" %{data.contentItems.decoration_image$aspectRatioPercent=186&widthPaddingPx=10:availableWidthImageBackground}></div>
		 *    
		 *  resulting HTML (retina case with 360px calculated available CSS width): 
		 *  <div class="xc_foobar" 
		 *       style="display:block;
		 *              width:100%;
		 *              height:100px;
		 *              background-image:url(/BSH/DE/images/foobar/meineDecoration$widthPx=680);
		 *              background-size:cover;"></div>
		 *  
		 *  when using a fixed aspect Ratio the height value is calculated dynamically
		 */
		availableWidthImageBackground : function(value, key, params, widget) {
			return value==undefined ? 
				this.safe.apply(this, arguments) : 
				this._getAvailableWidthImageString(value, key, params, widget);
		},
		_getAvailableWidthImageString: function(value, key, params, widget){
			var fixedHeight = this._parseIntParam(params, /heightPx=(\d+)/);
			var aspectRatio = this._parseIntParam(params, /aspectRatioPercent=(\d+)/);
			var wPad = this._parseIntParam(params, /widthPaddingPx=(\d+)/, 0);
			
			var availW = util.getCurrentTheme().availableWidth;
			if(!availW) return "";

			var	imgWidth = availW - 2*wPad;
			var physImgWidth = util.getPracticalImageDpr() * imgWidth; 
			var imgHeight = aspectRatio ? Math.round(imgWidth / aspectRatio * 100) : fixedHeight; // if aspect ratio is set it wins
			var cssHeight = aspectRatio ? imgHeight+"px" : fixedHeight+"px"; // dito
			var url = xcInitial.serviceBaseUrl+lang.trim(value)+"$widthPx="+physImgWidth+this._getCacheBust("?");;
			registry.add(url, widget, "projectImage");
			return " style=\"display:block;width:100%;height:"+cssHeight+";background-image:url('"+url+"');background-size:cover;\" ";
		},
		
		/**
		 * imageServerProductImage formatter
		 * auto-fills an html tag with the sizing and background-formatting code for 
		 * an (http external) Image URL that is pushed through the excentos imageserver 
		 * for re-scaling etc.  The size Notation is taken from the scaler annotations of 
		 * the content images (see above) and translated into the image server notation.
		 * Retina (2x physical dpi) displays are autodetected and images are loaded in higher
		 * resolution respectively. You can use "px" instead of "dp" notation, but then 
		 * you won't get retina images and won't be prepared for responsive designs.
		 * Fallback images aren't set because we're setting the image as a background image.
		 * Fallback image should be set via CSS in the theming code.
		 * 
		 *  usage in the template: 
		 *  <div class="xc_foobar" %{image.large:imageServerProductImage}></div>
		 *  <div class="xc_foobar" %{image.large$widthDp=180&heightDp=240:imageServerProductImage}></div>
		 *  
		 *  usage as product details exit link:
		 *  <a class="xc_foobar" %{image.large$widthDp=180&heightDp=240:imageServerProductImage} href="%{product.detailsPageUrl}"></a>
		 *  
		 *  resulting HTML (ldpi, no-retina case):
		 *  <div class="xc_foobar" 
		 *       style="width:135px;
		 *              height:180px;
		 *              background-image:url(http://images.excentos.com/dynamic/getImage.php?width=135&height=180&trim&highq&imgurl=urlEncodedFoobarUrl);
		 *              background-position:center center;
		 *              background-repeat:no-repeat;"></div>
		 *   
		 */
		imageServerProductImage : function(value, key, params, widget) {
			return this._imageServerProductImage(value, key, params, widget, "&trim");	
		},
		imageServerProductImageWithCrop : function(value, key, params, widget) {
			return this._imageServerProductImage(value, key, params, widget, "&croptofit");
		},
		untrimmedImageServerProductImage : function(value, key, params, widget) {
			return this._imageServerProductImage(value, key, params, widget, "");
		},
		_imageServerProductImage : function(value, key, params, widget, imageServerParams){
			return value==undefined ? 
					this.safe.apply(this, arguments) : 
					this._getImgSrvString(this._parseImgParams(value, key, params, widget), value, params, widget, imageServerParams);	
		},
		
		/**
		 * utility functions for all image formatters:
		 */
		_parseIntParam : function(params, regex, ifnomatch){
			// default no-match value is an empty string (falsy and no risk of meaning something as number or String)
			var ifnomatch = typeof(ifnomatch)=="undefined" ? "" : ifnomatch;
			var res = params.match(regex);
			return (res && res[1]) ? parseInt(res[1]) : ifnomatch; 
		},
		
		_parseImgParams : function(value, key, params, widget){
			var p={wDp:0,hDp:0,wPx:0,hPx:0,contentKey:key.substring(key.lastIndexOf(".")+1)};
			if(params == undefined || !params) return p;
			var dpiScale = util.getCurrentTheme().dpiScale;
			var factor = shared.constants.DPI_SCALES[dpiScale];
			p.wDp = this._parseIntParam(params, /widthDp=(\d+)/);
			if(p.wDp){
				p.wPx = p.wDp * factor;
			}else{
				p.wPx = this._parseIntParam(params, /widthPx=(\d+)/);
			}
			p.hDp = this._parseIntParam(params, /heightDp=(\d+)/);
			if(p.hDp){
				p.hPx = p.hDp * factor;
			}else{
				p.hPx = this._parseIntParam(params, /heightPx=(\d+)/);
			}
			return p;
		},
		
		_getImageTagString: function(p, value, params, widget){
			var result = "";
			if(value != ""){
				var url = this._getImageUrl(p, value);
				registry.add(url, widget, "projectImage");
				result += " src=\""+url+"\"";
			}
			result += this._getWidthHeightStyleString(p);
			return result += "\"";
		},
		
		_getImageBackgroundString: function(p, value, params, widget){
			var result = this._getWidthHeightStyleString(p);
			if(value != ""){
				var url = this._getImageUrl.apply(this, arguments);
				registry.add(url, widget, "projectImage");
				result += "background-image:url('"+url+"');";
				result += (p.wDp || p.hDp)? "background-size:cover;" : "";
			}
			return result += "\"";
		},
		
		_getImageUrl: function(p, value, params, widget){
			// TODO document me!  -> zusammenspiel mit dem Trenner vom cachebust ist wichtig.
			var queryIndex = value.indexOf("?");
			var query = ~queryIndex ? value.substring(queryIndex) : "";
			var plainValue = ~queryIndex ? value.substring(0,queryIndex) : value;
			
			var url = xcInitial.serviceBaseUrl + lang.trim(plainValue) + (params||"");
			url += (p.wDp || p.hDp)? "&scale=" + util.getPhysicalDpiScale() : "";
			url += query ? query + this._getCacheBust("&") : this._getCacheBust("?");
			
			return url;
		},
		
		_getImgSrvString : function(p, value, params, widget, modifier){
			var result = this._getWidthHeightStyleString(p);
			// Image URLs passed to the image server must be absolute URLs (loose check only)
			if(value != "" && value.indexOf("http") === 0){
				var url = this._getImgSrvUrl(p, value, params, widget, modifier);
				registry.add(url, widget, "imageServerProductImage");
				result += "background-size:"+Math.round(p.wPx)+"px "+Math.round(p.hPx)+"px;background-position:center center;background-repeat:no-repeat;background-image:url('"+url+"');";
			}
			return result += "\"";
		},
		
		_getImgSrvUrl : function(p, value, params, widget, modifier){
			var r = util.getPracticalImageDpr();
			var url = "http://images.excentos.com/dynamic/getImage.php?useimagick"+modifier;
			url += p.wPx ? "&width="+ Math.round(p.wPx*r) : "";
			url += p.hPx ? "&height="+ Math.round(p.hPx*r) : "";
		    url += (r == 1) ? "&highq" : "";
		    url += "&fallbackimgurl="+encodeURIComponent("http://images.excentos.com/static/XcDefaultCEModels/no-photo.png");
			return url += "&imgurl="+encodeURIComponent(value); // NO cacheBust here (external images)			
		},
		
		_getWidthHeightStyleString: function(p){
			var result = " style=\"display:block;";
			result += p.wPx ? "width:"+Math.round(p.wPx)+"px;" : "";
			return result += p.hPx ? "height:"+Math.round(p.hPx)+"px;" : "";			
		},
		
		_getImageContentEditString: function(p, widget){
			if(!has("customer-backend")) return "";
			if(widget.apiName == undefined) widget =  widget.enrichableWidget;
			var result = " data-xc-key=\""+widget.apiName+"\""
				   +  " data-xc-edit-type=\"contentImage\" data-xc-content-object=\""+p.contentKey+"\""
			       +  " data-xc-image-dimensions=\"";
			return result += (p.wDp || p.hDp) ? p.wDp+"x"+p.hDp+"\"" : Math.round(p.wPx)+"x"+Math.round(p.hPx)+"\"";
		},
		
		_getCacheBust : function(sep){
			var r = shared.store.getGlobalMetaDataByKey("projectRevision");
			r = r=="SET_FROM_ANT" || r=="${env.SVN_REVISION}" ? "" : r; // crappy former default
			return r ? sep+"cacheBust="+r : "";
		},
				
		
		/**
		 * editablePlainText formatter  
		 * auto-generates the content management annotations if the client is started inside the content
		 * management backend. 
		 * Currently only meant for content inside the "contentItems" area (to be tested for other keys). 
		 *  
		 *  usage in the template: 
		 *  <div class="xc_textfoo">%{data.contentItems.explanation_title:editableText}</div>
		 *  (just add the formatter, that's it)
		 *
		 *  resulting HTML outside customer backend:
		 *  <div class="xc_textfoo">Hello, this is my Text value"</div>
		 *  
		 *  resulting HTML in the customer backend:
		 *  <div class="xc_textfoo">
		 *  	<span data-xc-key="my.facet.group.scope.or.whatever" 
		 *       data-xc-edit-type="contentText" 
		 *       data-xc-content-object="explanation_title"
		 *       data-xc-content-type="text/plain">Hello, this is my Text value</span>
		 *  </div>
		 */
		editablePlainText: function(value, key, params, widget){
			if(value==undefined){
				return this.safe.apply(this, arguments);
			}
			if(has("customer-backend")){
				if(widget.apiName == undefined) widget = widget.enrichableWidget;
				// TODO works only for keys in contentItems until now. 
				return "<span "+this._editablePlainTextData.apply(this, arguments)+">"+value+"</span>";
			}else{
				return value;
			}
		},
		
		_editablePlainTextData: function(value, key, params, widget){
			return  "\
					data-xc-edit-type=\"contentText\" \
					data-xc-content-type=\"text/plain\" \
				 	data-xc-key=\""+widget.apiName+"\" \
				 	data-xc-content-object=\""+key.substring(key.lastIndexOf(".")+1)+"\"";

		}
		
	};
});