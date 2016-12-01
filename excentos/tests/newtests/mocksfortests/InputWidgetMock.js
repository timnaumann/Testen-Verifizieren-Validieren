define([
    "dojo/_base/declare"
], function (declare, _Input, tracker, registry) {

    return declare(
        "excentos.tests.newtests.mocksfortests.InputWidgetMock",[],
        {
            isExplainableMock:  true,
            _individualID: null,

            constructor: function () {
            },

            isExplainable: function(){
                return this.isExplainableMock;
            },

            setIsExplainableMock: function(value){
                this.isExplainableMock = value;
            },

            setIndividualID: function(value){
                this._individualID = value;
            },

            getIndividualID: function(){
                return this._individualID;
            }
        });

});
