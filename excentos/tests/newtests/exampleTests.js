define([
	"doh"
],function(doh){
	
	doh.register("excentos.newtests.exampleTests", [


		{
			name: "JustOneTest",
			setUp: function(){

			},
			runTest: function(){

				function assertTrueTest(){
					doh.assertTrue(true);
					doh.assertTrue(1);
					doh.assertTrue(!false);
				};

				var iwas = assertTrueTest;
				iwas();
				assertTrueTest();
                asdasd
			},
			tearDown: function(){

			}
		}
	]);
	
});



