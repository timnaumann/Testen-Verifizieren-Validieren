define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dijit/registry",
	"dijit/_Widget",
	"dijit/_Container",
	"excentos/shared",
	"excentos/util",
	"./_Widget"
], function(declare, lang, domClass, registry, _Widget, _Container, shared, util, _xcWidget){

var _ColumnMixin = declare("excentos.widget._ColumnMixin", null, {
	useColumns: undefined,
	rows: 0,
	cols: 0,
	_columnContainerWidget: null,

	postCreate: function(){
		this.inherited(arguments);
		this.setupColumnContainer();
	},

	setupColumnContainer: function(){
		this.useColumns = this.useColumns!=undefined ? 
				this.useColumns : 
				!!(
					 this.rows || this.cols || 
					 (this.rows = this.getConfigItems("columnOptionRows", "number") || 0) || 
					 (this.cols = this.getConfigItems("columnOptionCols", "number") || 0)
				);
				
		if(this.useColumns){
			
			this._columnContainerWidget = shared.widgetFactory.makeWidget("ColumnContainer", {
				apiWidget: this,
				cols: this.cols,
				rows: this.rows
			});
			
			switch(this.getApiType()){
				case "facet":
					if(this.slider)return;
					this._columnContainerWidget.placeAt(this.statesNode);
				break;
				case "group":
					this._columnContainerWidget.placeAt(this.subFacetGroupsNode);
				break;
			}
		}
	},
	
	refresh: function(){
		this.inherited(arguments);
		if(this.isVisible() && this.useColumns){
			this._columnContainerWidget.refresh();
		}
	}
});
//legacy 2.4.x - 2.6.x
lang.setObject("excentos.widget.facet.input._ColumnMixin", _ColumnMixin);


var ColumnContainer = declare("excentos.widget.ColumnContainer", [_xcWidget, _Container], {
	
	templateString: "<div class='xc_columns'></div>",

	//what has priority - rows or columns
	optionPriority: "",
	
	//the maximum elements per column, favoured before ´cols´
	rows: 0,
	//the maximum of columns to use if ´rows´ isnt set
	cols: 0,
	
	//	headlines: Array
	headlines: null,

	//	columnWidgets: xcProject.widget.facet.input.Column[]
	columnWidgets: null,
	
	//	apiWidget: reference to the coupled widget (most likely the parent Widget)
	apiWidget: null,
	
	// subWidgets: list of widgets that could occur in columnWidgets
	subWidgets: null,
	
	postCreate: function(){
		if(!this.rows && !this.cols){
			return;
		}	
		
		this.subWidgets = this.getSubWidgets();
		this.setupColumns();
	},
	
	refresh: function(){
		this._refreshColumns();
	},
	
	isVisibleWidget: function(widget){
		//returns true during creation phase
		// afterwards checks the widget for visibility
		return !this._created || util.isVisible(widget);
	},
	
	getSubWidgets: function(){
		return registry.findWidgets(this.apiWidget.domNode);
	},
	
	getVisibleSubWidgets: function(){
		var widgets = [], subWidgets = this.subWidgets;
		for(var i = 0, l = subWidgets.length; i < l; ++i){
			var subWidget = subWidgets[i];
			
			this.isVisibleWidget(subWidget) &&
			widgets.push(subWidget);
		}
		return widgets;
	},
	
	setupColumns: function(){
		this.optionPriority = this.rows && "rows" || this.cols && "cols";
		this.headlines 		= this.headlines || this.apiWidget.getContentItems("columnOptionHeadlines", "array") || [];
		
		this._buildColumns();
		this._refreshColumns();
	},
	
	getRowCount: function(){
		//NOTE: rows are being refreshed at runtime - here we consider visible subWidgets only
		// summary: returns the amount of rows but takes care of configured priority
		return	this.optionPriority == "rows" && this.rows ||
				this.cols && Math.ceil(this.getVisibleSubWidgets().length/this.cols);
	},
	
	getColCount: function(){
		//NOTE: columns are being build once upon the maximum available subWidgets
		// summary: returns the amount of rows but takes care of configured priority
		return	this.optionPriority == "cols" && this.cols ||
				this.rows && Math.ceil(this.getSubWidgets().length/this.rows);
	},
	
	_buildColumns: function(){
		this.columnWidgets = [];
		
		for(var i = 0, l = this.getColCount(); i<l; ++i){
			var column = shared.widgetFactory.makeWidget("Column", {
				headline: this.headlines[i] || ""
			});
			
			this.columnWidgets.push(column);
			this.addChild(column);
		}
	},
	
	_refreshColumns: function(){
		//order all subWidgets into existing columnWidgets
		
		var columnWidgetIndex = 0,
			columnWidget = this.columnWidgets[0],
			visibleCount = 0,
			rowCount = this.getRowCount();
		
		//NOTE: we have to iterate over all sub widgets (not just the visible ones), to account for those subwidgets that got invisible recently
		for(var i = 0, l = this.subWidgets.length; i<l && columnWidget; ++i){
			var subWidget = this.subWidgets[i];
			
			if(this.isVisibleWidget(subWidget)){
				++visibleCount;
			}
			
			columnWidget.addChild(subWidget);
			
			if(visibleCount == rowCount){
				columnWidget = this.columnWidgets[++columnWidgetIndex];
				visibleCount = 0 ;
			}
		}
		
		this._updateCssClasses();
	},
	
	_updateCssClasses: function(){
		
		var i=this.columnWidgets.length, 
			currentColCount=0, 
			currentRowCount=0,
			firstColumn, lastColumn;
		
		while(i--){
			var columnWidget = this.columnWidgets[i];
			var childrenCount = columnWidget.count();
			var isEmpty = childrenCount === 0;
			
			if(i===0)currentRowCount = childrenCount;
			domClass.toggle(columnWidget.domNode, "xc_empty", isEmpty);
			domClass.remove(columnWidget.domNode, "xc_first xc_last");
			
			if(!isEmpty){
				++currentColCount;
				!lastColumn && (lastColumn = columnWidget);
				firstColumn = columnWidget;
			}
		}
		
		domClass.add(firstColumn.domNode, "xc_first");
		domClass.add(lastColumn.domNode, "xc_last");
		
		this.domNode.className = this.domNode.className
					.replace(/\s*xc_column_count\d+/, "")
					.replace(/\s*xc_row_count\d+/, "");
		
		domClass.add(this.domNode, "xc_column_count"+currentColCount+" xc_row_count"+currentRowCount);
		
	}
});
//legacy 2.4.x - 2.6.x
lang.setObject("excentos.widget.facet.input.ColumnContainer", ColumnContainer);



var Column = declare("excentos.widget.Column", [_xcWidget, _Container], {
	
	templateString: '<div class="xc_column"><div class="xc_columnheadline">%{headline}</div></div>',
	headline: null,
	
	count: function(){
		return this.getChildren().length;
	}
});
//legacy 2.4.x - 2.6.x
lang.setObject("excentos.widget.facet.input.Column", Column);



return _ColumnMixin;
	

});
