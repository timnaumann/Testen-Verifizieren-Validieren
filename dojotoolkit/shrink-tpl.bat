RD /S /Q dojo\tests
RD /S /Q dojox\fx\tests
RD /S /Q dijit\tests
RD /S /Q demos\

MD dojox_tmp\layout\resources\icons
MD dojox_tmp\form\resources
MOVE dojox\main.js dojox_tmp
MOVE dojox\fx dojox_tmp
MOVE dojox\collections dojox_tmp
MOVE dojox\fx.js dojox_tmp
MOVE dojox\form\_RangeSliderMixin.js dojox_tmp\form
MOVE dojox\form\HorizontalRangeSlider.js dojox_tmp\form
MOVE dojox\form\VerticalRangeSlider.js dojox_tmp\form
MOVE dojox\form\resources\HorizontalRangeSlider.html dojox_tmp\form\resources
MOVE dojox\form\resources\VerticalRangeSlider.html dojox_tmp\form\resources
MOVE dojox\layout\resources\icons\resizeRtl.png dojox_tmp\layout\resources\icons
MOVE dojox\layout\resources\icons\resize.png dojox_tmp\layout\resources\icons
MOVE dojox\layout\resources\ResizeHandle.css dojox_tmp\layout\resources
MOVE dojox\layout\ResizeHandle.js dojox_tmp\layout
MOVE dojox\gesture dojox_tmp
RD /S /Q dojox_tmp\gesture\tests
RD /S /Q dojox_tmp\collections\tests
RD /S /Q dojox
MOVE dojox_tmp dojox

RD /S /Q util\docscripts
RD /S /Q util\jsdoc
RD /S /Q util\less
RD /S /Q util\migration