define([
	"dojo/_base/declare",
	"dijit/registry",
	"dijit/WidgetSet",
	"../AbstractRegistry"
], function(declare, dijitRegistry, WidgetSet, AbstractRegistry){

	//	summary;
	//		Provide filters to get certain widget sets from the `dijit.registry`.

	var WidgetRegistry = declare("excentos.widget.registry", AbstractRegistry, {

		byWidgetType: function(/*String?*/ widgetType){
			// summary:
			//		returns the Widgets by given widgetype - or the whole index by widget type
			// widgetType: String
			//		something like "wizard.EndGame" or "input.MultiSelect"

			return this.getIndex("byWidgetType", widgetType);
		},

		byApiType: function(/*String?*/ type){
			// summary:
			//		returns the Widgets by given type - or the whole index by type
			//		type refers to a more simple representation of widgetType.
			// type: String
			//		usually "state", "facetInGroup" or "facetGroup"

			return this.getIndex("byType", type);	//TODO will be this.getIndex("byApiType", type);
		},

		byWidgetClass: function(/*String*/ cls){
			// summary:
			//		Reduce the dijit.registry's widget set to a new widget set of a particular widget class,
			//		i.e. all widgets with a certain declared class name after "*.widget.".
			//
			// cls: String
			//		The widget class name to scan for. Declared class name after "*.widget.".
			//
			// example:
			//		Find all `facetgroup.wizard.Phase`s in a page:
			//		|	excentos.widget.registry.byWidgetClass("facetgroup.wizard.Phase").forEach(function(phaseWidget){ phaseWidget.refresh(); });

			var res = new WidgetSet(), id, widget, constStr, strPos;
			for(id in dijitRegistry._hash){
				widget = dijitRegistry._hash[id];

				// Check if `cls` ends with `".widget." + cls`.
				constStr = ".widget.";
				strPos = widget.declaredClass.indexOf(constStr + cls);
				if(strPos > 0 && widget.declaredClass.length == strPos + constStr.length + cls.length){
					res.add(widget);
				}
			}
			return res; // dijit.WidgetSet
		},

		byInstanceOf: function(/*Function*/ cls){
			// summary:
			//		Reduce the dijit.registry's widget set to a new set of widgets that are an instance of `cls`.
			//
			// cls: Function
			//		Class or constructor function to filter widgets that are an instance of.
			//
			// example:
			//		Find all widgets that are instance of `excentos.widget.facetgroup.FacetGroup` in a page:
			//		|	excentos.widget.registry.byInstanceOf(excentos.widget.facetgroup.FacetGroup).forEach(function(fgWidget){ fgWidget.refresh(); });

			var res = new WidgetSet(), id, widget;
			for(id in dijitRegistry._hash){
				widget = dijitRegistry._hash[id];
				if(widget instanceof cls || widget.isInstanceOf(cls)){
					res.add(widget);
				}
			}
			return res; // dijit.WidgetSet
		}
	});

	return new WidgetRegistry;

});
