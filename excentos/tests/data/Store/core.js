define([
	"doh/runner",
	"excentos/Store"
], function(doh, Store){

	doh.registerTest("excentos.Store", {
		name:	"_core",
		
		setUp:	function() {
			this.store = new Store;
		},
		
		tearDown: function() {
			delete this.store;
		},
		
		runTest: function(d){
			d.assertTrue(this.store instanceof Store);
		}
	});
});
