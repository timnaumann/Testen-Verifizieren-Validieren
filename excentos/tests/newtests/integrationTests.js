define([
    "doh"
],function(doh){

    doh.register("excentos.newtests.integrationTests", [


        {
            name: "SecondTest",
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

            },
            tearDown: function(){

            }
        }
    ]);

});



