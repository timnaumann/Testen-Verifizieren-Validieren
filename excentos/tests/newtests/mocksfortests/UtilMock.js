define([
    "dojo/_base/declare",
    "dojo/_base/lang"
], function (declare, lang) {

    var utilMock = {}; //initialize as object to allow IDEs to recognize `util` as export module, because return type of `lang.getObject` is not being discovered as being Object
    utilMock = lang.getObject("excentos.utilMock", true);

    utilMock.answeredFacetWidgetsMock= [];

    utilMock.getAnsweredFacetWidgets = function(apiName){
        return this.answeredFacetWidgetsMock;
    };

    utilMock.setAnsweredFacetWidgetsMock = function(mockedValues){
        this.answeredFacetWidgetsMock = mockedValues;
    };

    return utilMock
});
