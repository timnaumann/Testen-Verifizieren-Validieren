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
		if(facetWidget.success){
			return facetWidget.success;
		} else{
			return this.getOtherExplainableStateMock;
		}
	};

	_StageDisplayWidgetRefresher.getOtherExplainableStateMock = true;


	doh.register("excentos.newtests.PrimePathCoverageTest", [
		{


			//covers [1,2,3,4,5,7,8,9]
			name: "FirstPrimePathCoverageTest",

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
			name: "SecondPrimePathCoverageTest",
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
			name: "ThirdPrimePathCoverageTest",

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
		},


		// covers [1,2,3,4,5,7,8,2,3,10]
		{
			name: "ForthPrimePathCoverageTest",

			setUp: function () {
				var widget1 = new InputWidget();
				widget1.setIsExplainableMock(false);

				utilMock.setAnsweredFacetWidgetsMock([widget1]);
				_StageDisplayWidgetRefresher.getOtherExplainableStateMock = null;
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
		},

		// covers [1,2,3,4,5,7,8,2,3,4,5,7,8,9]
		{
			name: "FifthPrimePathCoverageTest",

			setUp: function () {
				var widget1 = new InputWidget();
				widget1.setIsExplainableMock(false);
				_StageDisplayWidgetRefresher.getOtherExplainableStateMock = false;

				var widget2 = new InputWidget();
				widget2.setIsExplainableMock(false);
				widget2.success = "success";
				utilMock.setAnsweredFacetWidgetsMock([widget1,widget2]);

			},
			runTest: function () {
				var result = _StageDisplayWidgetRefresher.getOtherExplainable(
					{
						apiName: "TestValue"
					}
				);

				doh.assertEqual(result, "success");
			},
			tearDown: function () {

			}
		}

	]);
	
});



