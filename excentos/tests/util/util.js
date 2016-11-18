define([
	"doh/runner",
	"dojo/_base/array",
	"excentos/util"
], function(doh, array, util){
	
var xcUtil = util;
doh.register(
	"excentos.util",
	//self executing function which generates the real tests - was too lazy to create 80 methods manually
	(function(){
		var functionList = [];
		var types = ["boolean","number","string","array"];
		var conversion = [
		    {from:undefined,	to:{"boolean":false,	"string":"",			"number":NaN,	"array":[]}},
		    {from:"true",		to:{"boolean":true,		"string":"true",		"number":1,		"array":["true"]}},
		    {from:"false",		to:{"boolean":false,	"string":"false",		"number":0,		"array":["false"]}},
		    {from:"",			to:{"boolean":false,	"string":"",			"number":NaN,	"array":[]}},
		    {from:"0",			to:{"boolean":false,	"string":"0",			"number":0,		"array":[0]}},
		    {from:"5.9",		to:{"boolean":true,		"string":"5.9",			"number":5.9,	"array":["5.9"]}},
		    {from:"1,2,3",		to:{"boolean":true,		"string":"1,2,3",		"number":NaN,	"array":[1,2,3]}},
		    {from:"a,b,c",		to:{"boolean":true,		"string":"a,b,c",		"number":NaN,	"array":["a","b","c"]}}
		];
		var _test=null, _testfunc = null;
		array.forEach(types,function(_type){
			array.forEach(conversion,function(_conv){
				
				//skip not defined conversions
				if(!_conv.to.hasOwnProperty(_type))return;
				
				//doh.assertEqual() alias d.is() does not perform typesafe checks!
				_testfunc = function(d){d.is(xcUtil.castValueToType(_conv.from,_type)===_conv.to[_type],true);};
				if(isNaN(_conv.to[_type])){
					_testfunc = function(d){d.is(isNaN(xcUtil.castValueToType(_conv.from,_type)),true);};
				}
				if(_type == "array"){
					_testfunc = function(d){d.is(xcUtil.castValueToType(_conv.from,_type),_conv.to[_type]);};
				}
					
				_test = {
					name:"castValueToType("+_conv.from+"::"+(typeof _conv.from)+", "+_type+")",
					runTest: _testfunc
				};
				functionList.push(_test);
			});
		});
		return functionList;
	})().concat([
		{
			name: "uniqueArray",
			runTest: function(d) {
				var arr = [1,2,3,2,3,4,3,4,5],
					str = xcUtil.uniqueArray(arr).toString();
				
				d.is(str,"1,2,3,4,5");
			}
		},
		{
			name: "objectIsEmpty simpleObject",
			runTest: function(d) {
				var obj = {value:null};
				d.t(xcUtil.objectIsEmpty(obj));
			}
		},
		{
			name: "objectIsEmpty complexObject#1",
			runTest: function(d) {
				var obj = {
					value:[
					   null, 
					   undefined,
					   {deep: [,[,[,{}],],,,]}
					]};
				d.t(xcUtil.objectIsEmpty(obj));
			}
		},
		{
			name: "objectIsEmpty complexObject#2",
			runTest: function(d) {
				var obj = {
					value:[
					   null, 
					   undefined,
					   {deep: [,[,[1,{}],],,,]}
					]};
				d.f(xcUtil.objectIsEmpty(obj));
			}
		}
	])
);
})