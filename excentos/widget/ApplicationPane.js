define([
	"dojo/dom-construct",
	"dojo/_base/declare",
	"./_Widget"
], function(domConstruct, declare, _Widget){

return declare(
	"excentos.widget.ApplicationPane",
	_Widget,
{
	//	summary:
	//		A widget that holds all the application's main widgets and lets you place them in a template.
	//	description:
	//		One widget to bind them all.
	
	relativeTemplatePath: "ApplicationPane.html",
	widgetsInTemplate: true,
	
	addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex, /*String*/ attachPoint){
		// summary:
		//		Makes the given widget a child of this widget.
		// description:
		//		Override `dijit._Container` to be able to pass a name of an attach point
		//		so we can define to which node the child is added.

		var refNode = this.containerNode;
		if(insertIndex && typeof insertIndex == "number"){
			var children = this.getChildren();
			if(children && children.length >= insertIndex){
				refNode = children[insertIndex-1].domNode;
				insertIndex = "after";
			}
		}
		if(attachPoint && this[attachPoint]){
			refNode = this[attachPoint];
		}
		domConstruct.place(widget.domNode, refNode, insertIndex);

		// If I've been started but the child widget hasn't been started,
		// start it now.  Make sure to do this after widget has been
		// inserted into the DOM tree, so it can see that it's being controlled by me,
		// so it doesn't try to size itself.
		if(this._started && !widget._started){
			widget.startup();
		}
	}

});

});
