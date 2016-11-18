define([
	"doh/runner",
	"dojo/_base/array",
	"excentos/Store"
], function(doh, array, Store){

	var store = new Store;
	
	doh.register("excentos.Store", [
	{
		name: "_mergeResults#default result",
		runTest: function(d) {
			var testParams = [
				[{}, true],
				[true, {}, ""],
				[undefined, undefined, undefined, {}, []],
				[null, 1]
			];
			
			array.forEach(testParams, function(args){
				var merged = store._mergeResults.call(store, args);
				
				d.assertEqual({applicationItems:{}}, merged , merged.toSource() + " != {}");
			});
		}
	},
	{
		name: "_mergeResults#data",
		runTest: function(d){
			var data1 = {
				exceptionItems: [{message:"test1"}],
				applicationItems: {
					app: {
						facetVars: {
							x : 1,
							z : null
						}
					}
				},
				bla: true	
			},
			data2 = {
				exceptionItems: [{
					message: "test2"	
				}],
				applicationItems: {
					app: {
						facetVars: {
							y: 2,
							x: 3
						}
					},
					app2: {
						foo : "bar"
					}
				},
				metaData: {
					sId: "foo-bar"
				}
			};
			
			var result = store._mergeResults([data1, data2]);
			
			d.assertEqual(data1.bla, result.bla);
			d.assertNotEqual(data1.exceptions, result.exceptions, "expected " + data1.exceptions.toSource() +" != " + result.exceptions.toSource());
			d.assertEqual(data1.applicationItems.app.facetVars.z, result.applicationItems.app.facetVars.z);
			
			d.assertEqual(data2.applicationItems.app.facetVars.x, result.applicationItems.app.facetVars.x);
			d.assertEqual(data2.applicationItems.app.facetVars.y, result.applicationItems.app.facetVars.y);
			d.assertEqual(data2.applicationItems.app2, result.applicationItems.app2);
			d.assertEqual(data2.exceptions[0], result.exceptions[0]);
			d.assertEqual(data2.exceptions, result.exceptions);
			d.assertEqual(data2.metaData, result.metaData);
			d.assertEqual(data2.metaData.sId, result.metaData.sId);
			d.assertEqual(data2.exceptions, result.exceptions);
		}
	}
	]);
});
