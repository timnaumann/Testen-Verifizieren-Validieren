define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"excentos/util"
], function(declare, lang, util){

	// configKeyRegex: matches config keys like  "theme_my-theme-name_label = Custom Theme Label" or "theme_my-theme-name_configItems_layout = Custom Theme Layout"
	var configKeyRegex = /theme_([^_]+)_([^_]+)(?:_(.+)?)?/;
	var themeNameList = null;
	var ThemeDataMixin = declare(null, {
		//object of current theme's specific data
		// apiThemeData = {configItems: {layout:"mix-match-layout"}, contentItems: {label: "mix-match label"}}
		apiThemeData: null,
		//whole object of theme specific data
		// apiCurrentThemeData = {"mix-match": {configItems: {layout:"mix-match-layout"}, contentItems: {label: "mix-match label"}}, "responsive": ...}
		apiCurrentThemeData: null,

		// plain data from api
		apiData: null,

		//_mapDataSources: Array
		//list of api data properties being checked for theme specific overrides
		_mapDataSources: ["configItems", "contentItems"],

		postMixInProperties: function(){
			this.inherited(arguments);
			this._mixinThemeData();
		},

		_mixinThemeData: function(){
			this.apiData = lang.mixin({}, this.data); //copy original data to `apiData`; dont use lang.clone (100x slower)

			if(!this.apiData){return;}
			this.apiThemeData = this.mapApiDataSources(this._mapDataSources, this.apiData);

			//fetch api them data across inherited themes
			themeNameList || (themeNameList = util.getThemeChain("name"));
			for(var _mapDataSourceName in this.apiThemeData){
				var apiThemeData = this.apiThemeData[_mapDataSourceName];
				if(apiThemeData){
					var i = themeNameList.length;
					while(i-- > 0){
						var themeName = themeNameList[i];
						apiThemeData[themeName] && (this.apiCurrentThemeData = util.merge(this.apiCurrentThemeData || {}, apiThemeData[themeName]));
					}

					//apply / override theme config
					this.apiCurrentThemeData && util.merge(this.data, this.apiCurrentThemeData);
				}
			}
			
		},

		mapApiDataSources: function(/*Array?*/ sources, /*Object?*/ apiData){
			sources = sources || this._mapDataSources;
			apiData = apiData || this.apiData;

			var apiThemeData = {};
			for(var i=0, l=sources.length; i<l; ++i){
				var dataSource = sources[i];
				apiThemeData[dataSource] = ThemeDataMixin.getThemeData(apiData[dataSource]);
			}
			return apiThemeData; //return {configItems:{mobile:{...},default:{...},otherThemeName:{...}},contentItems:{}
		}
	});

	ThemeDataMixin.getThemeData = function(/*ApiData*/ config){
		// summary:
		//	returns theme specific data from config object
		//  ex.: {"default":{label:""}, "my-special-theme-name":{configItems:{layout:"special"}}}
		var apiThemeData = {};
		for(var configProperty in config){
			util.merge(apiThemeData, ThemeDataMixin.getThemeDataEntries(config, configProperty));
		}
		return apiThemeData;
	};

	ThemeDataMixin.getThemeDataEntries = function(/*ApiData*/ config, /*String*/ configProperty){
		// summary:
		//		map a key `configItems.theme_my-theme-name_configItems_layout` to `configItems.layout` for the current theme context
		var configValue, regexMatches, apiThemeDataPropertyString, dataThemeName, dataProperty, dataNestedProperty, apiProperty = {};

		configValue = config[configProperty];

		regexMatches = (configProperty.match(configKeyRegex) || []);
		dataThemeName = regexMatches[1];
		dataProperty = regexMatches[2];
		dataNestedProperty = regexMatches[3]; //we only have one level deeper nesting

		if(dataThemeName && dataProperty){
			apiThemeDataPropertyString = dataThemeName + "." + dataProperty;
			dataNestedProperty && (apiThemeDataPropertyString += "." + dataNestedProperty);

			lang.setObject(apiThemeDataPropertyString, configValue, apiProperty);
		}

		return apiProperty;
	};

	return ThemeDataMixin;
});