define([
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/dom-construct",
    "excentos/shared",
	"./Table",
	"./Header",
	"./HeaderRow",
	"./HeaderCell",
	"./RowGroup",
	"./Row",
	"./Cell"
], function(lang, Deferred, domConstruct, shared){
	
	
	function setContent(/*TableElement*/ ref, /*Any*/ content){
		if(content == undefined)return;
		
		//ducktype checks here - QUAK
		content.domNode		&& (ref.addChild(content) || 1)				|| 	//it's a widget
		(content.nodeType || content.indexOf("<")==0) && 
			domConstruct.place(content, ref.containerNode, "only")	|| 	//it's HTML something
		ref.set("label", content+"");									//it's ... well i dont care
	};
	
	function addChild(/*TableElement*/ child, /*TableElement*/ ref){
		setTimeout(lang.hitch(ref,"addChild",child));
	};
	
	function make(/*String*/ tableComponentName){
		return shared.widgetFactory.makeWidget("table."+tableComponentName);
	}
	
	function createTable(data){
		return data instanceof Array ?
			createTableFromCsvArray(data) :
			createTableFromObject(data);
	};
	
	/*
	recognized data structure:
	
	DataObject {
		head: 
			THEADArray [
				TRArray [
					TDArray [
					]
				]
			],
		body: 
			TBODYArray [
				TRArray [
					TDArray [
					]
				]
			]
	}
	
	
	CSVArray [
		CSVHeadArray [],
		CSVDataRowArray [],
		CSVDataRowArray [],...
	]
	 */
	var CsvArray = function(){
		//2-dimensional array; the the head-row is already defined (just empty)
		this.push([]); 
	};
	CsvArray.prototype = []; 
	
	var DataObject = function(){
		//contains two types of 3-dimensional arrays ROWGROUP [ ROW [ COLUMN [ value, value, value] ] ]
		this.head = [];
		this.body = [];
	};
	DataObject.prototype = {}; 
	
	var classNameMap = {
		head:	{rowGroup:"Header", 	row:"HeaderRow",	col:"HeaderCell"},
		body:	{rowGroup:"RowGroup",	row:"Row", 			col:"Cell"}
	};
	
	function createTableFromObject(/*DataObject*/ data){
		
		var table = make("Table");
		var rowGroup, row, col, content;
		
		for(var rowGroupType in data){
			
			//THEAD | TBODY
			var rowGroupData = data[rowGroupType], rowGroupNum = 0, rowGroupLength = rowGroupData.length;
			for(; rowGroupNum < rowGroupLength; rowGroupNum++){
				
				rowGroup = make(classNameMap[rowGroupType]["rowGroup"]);
				
				//TR
				var rowData = rowGroupData[rowGroupNum], rowNum = 0, rowLength = rowData.length;
				for(; rowNum < rowLength; rowNum++){
					content = rowData[rowNum][0];
					
					row = make(classNameMap[rowGroupType]["row"]);
					setContent(row, content);
					
					//TH | TD
					var colData = rowData[rowNum], colNum = 1, colLength = colData.length;
					for(; colNum <  colLength;  colNum++){
						content = colData[colNum];
						
						//span undefined values
						//if  content undefined incerement span of prev col
						if(col && content == undefined){
							col.domNode.colSpan++;
						}else {
							col = make(classNameMap[rowGroupType]["col"]);
							setContent(col, content);
							
							addChild(col, row);
						}
					}
					
					addChild(row, rowGroup);
				}
				
				addChild(rowGroup, table);
			}
		}
		
		return table;
	};
	
	function createTableFromCsvArray(/*CsvArray*/ data){
		var objData = {
				head:[data.slice(0,1)],
				body:[data.slice(1)]
			};
		
		return createTableFromObject(objData);
	};
	
	return {
		make: make,
		createTable: createTable,
		dataTypes: {
			CsvArray: CsvArray,
			DataObject: DataObject
		}
		
	};
});