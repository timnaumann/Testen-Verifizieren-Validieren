define([
	"doh",
	"excentos/widget/explanation/displayWidget/_StageDisplayWidgetRefresher",
	"excentos/widget/registry",
	"./mocksfortests/UtilMock",
	"./mocksfortests/InputWidgetMock"
],function(doh,_StageDisplayWidgetRefresher,widgetRegistry,utilMock, InputWidget)


{
	_StageDisplayWidgetRefresher.getOtherExplainable = function(topic){
		topic = topic || this.getStageWidget();

		var otherAnsweredFacets = utilMock.getAnsweredFacetWidgets(topic.apiName);
		var i=otherAnsweredFacets.length;
		while(i--){
			var facetWidget = otherAnsweredFacets[i];
			if(facetWidget.isExplainable()){
				return facetWidget;
			}

			var stateWidget = this.getOtherExplainableState(facetWidget);
			if(stateWidget){
				return stateWidget;
			}
		}

		return null;
	};

	_StageDisplayWidgetRefresher.getOtherExplainableState = function(facetWidget){
		return this.getOtherExplainableStateMock;
	};

	_StageDisplayWidgetRefresher.getOtherExplainableStateMock = true;


	doh.register("excentos.newtests.NodeCoverageTest", [
		{


			//covers [1,2,3,4,5,7,8,9]
			name: "FirstNodeCoverageTest",

			setUp: function(){
				var widget1 = new InputWidget();
				widget1.setIsExplainableMock(false);
				utilMock.setAnsweredFacetWidgetsMock([widget1]);
				_StageDisplayWidgetRefresher.getOtherExplainableStateMock = "success";
			},
			runTest: function(){
				var result = _StageDisplayWidgetRefresher.getOtherExplainable(
					{
						apiName: "TestValue"
					}
				);

				doh.assertEqual(result,"success")
			},
			tearDown: function(){

			}
		},

		//covers [1,2,3,4,5,6]
		{
			name: "SecondNodeCoverageTest",
			resultID: "04179514-b7eb-11e6-80f5-76304dec7eb7",

			setUp: function () {
				var widget1 = new InputWidget();
				widget1.setIsExplainableMock(true);
				widget1.setIndividualID(this.resultID);

				utilMock.setAnsweredFacetWidgetsMock([widget1]);
				_StageDisplayWidgetRefresher.getOtherExplainableStateMock = "success";
			},
			runTest: function () {
				var result = _StageDisplayWidgetRefresher.getOtherExplainable(
					{
						apiName: "TestValue"
					}
				);

				doh.assertTrue(result);
				doh.assertEqual(result.getIndividualID(), this.resultID)
			},
			tearDown: function () {

			}
		},


		// covers [1,2,3,10]
		{
			name: "ThirdNodeCoverageTest",

			setUp: function () {
				utilMock.setAnsweredFacetWidgetsMock([]);
				_StageDisplayWidgetRefresher.getOtherExplainableStateMock = "success";
			},
			runTest: function () {
				var result = _StageDisplayWidgetRefresher.getOtherExplainable(
					{
						apiName: "TestValue"
					}
				);

				doh.assertFalse(result);
				doh.assertEqual(result, null)
			},
			tearDown: function () {

			}
		}

	]);
	
});



