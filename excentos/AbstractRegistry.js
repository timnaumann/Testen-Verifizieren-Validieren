define([
	"dojo/_base/declare"
	//,"excentos/util"  circular dependency
], function(declare){

	return declare("excentos.AbstractRegistry", null, {

		index: null,

		constructor: function(){
			this.index = {};
		},

		toIndex: function(/*Array*/ components, /*Object?*/ thing, /*Object|Array?*/ createAs){
			// summary:
			//		called by Store::makeWidget; stores a widget to a specified index - 
			//	    substitution for lang.setObject as we use dot-separated name delimiter in "xcAjaxClient.wizard.phase3.explorer"
			//      which dojo does not handle as needed
			//	components: Array
			//		the object path like ´A.b.c.d´ as Array representation ["A","b","c","d"]; 
			//		example: toIndex(["byType","other"], "thing") would store this.index["byType"]["other"] = "thing";
			//	thing: *
			//		the widget you want to assign to the index
			//	createAs: {} | []
			//		optional; tell what the index should be if it needs to be created for the first time
			//		usually Object  {} serves as hashmap, and Array [] serves as list

			createAs || (createAs = {});

			if(!(components instanceof Array)){
				components = [components.toString()];
			}

			var i = 0, l = components.length, context = this.index, component = "";
			//create object; cant use lang.getObject because we have dots contained in name
			for(; i < l - 1; ++i){context = context[components[i]] || (context[components[i]] = {});}
			//... now the last bit of the components			
			var lastComponent = context[components[i]] || (context[components[i]] = createAs);

			lastComponent instanceof Array ?
				lastComponent.push(thing) : //push if array
				context[components[i]] = thing; //add to context if undefined (or override)
		},

		register: function(/*Object*/ thing){
			var declaredClass = thing.declaredClass;
			var type = excentos.util.getClassType(declaredClass); //NOTE excentos.util to avoid circular dependency

			this.toIndex(["list"], thing, []);
			thing.id && this.toIndex(["byId", thing.id], thing, {});
			thing.name && this.toIndex(["byName", thing.name], thing, []);
			type && this.toIndex(["byType", type], thing, []);
			declaredClass && this.toIndex(["byDeclaredClass", declaredClass], thing, []);
		},

		getIndex: function(/*String?*/ by, /*String?*/ hash){
			// summary: 
			//		simply returns the whole index

			var index = this.index;
			by && (index = index[by]);
			index && hash && (index = index[hash]);

			return index;
		},

		list: function(){
			// summary:
			//		returns all the Transition instances as array

			return this.index.list;
		},

		byId: function(/*String?*/ id){
			// summary:
			//		returns the Widgets by given id - or the whole index by id
			// id: String
			//		something along "xc_wizard", "excentos_widget_Button_0", or "xc_state_wizard-phase1-running_style-user_running_type-back"

			return this.getIndex("byId", id);
		},

		byName: function(/*String?*/ name){
			// summary:
			//		returns the Widgets by given name - or the whole index by name
			// name: String
			//		object name from API like "xcAjaxClient.wizard.phase3.explorer"

			return this.getIndex("byName", name);
		},

		byType: function(/*String?*/ type){
			// summary:
			//		returns the Widgets by given type - or the whole index by type
			//		type refers to a more simple representation of declaredClass.
			// type: String
			//		something along "widget.facet._Input", "Behavior", "transition.Transitions" ,...

			return this.getIndex("byType", type);
		},

		byDeclaredClass: function(/*String?*/ name){
			// summary:
			//		returns the Widgets by given name - or the whole index by name
			// name: String
			//		object name from API like "xcAjaxClient.wizard.phase3.explorer"

			return this.getIndex("byDeclaredClass", name);
		}
	});

});