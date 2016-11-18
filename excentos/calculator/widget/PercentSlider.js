define([
    "dojo/_base/declare",
    "./HorizontalSlider"
], function(declare, HorizontalSlider){

return declare("excentos.calculator.widget.PercentSlider", [HorizontalSlider], {

	intermediateChanges: true,
	showButtons: false,
	minimum: 0,
	maximum: 1,
	discreteValues: 101,
	pattern: "##0 %",
	labelNodeTarget: "sliderHandle"
});

});