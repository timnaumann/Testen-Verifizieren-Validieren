define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-class",
	"excentos/shared",
	"excentos/util",
	"../registry",
	"../_Widget",
	"../_ApiWidget"
], function(declare, array, domClass, shared, util, widgetRegistry, _Widget, _ApiWidget){

var SelectionTags = declare(
	"excentos.widget.facetgroup.SelectionTags",
	[_Widget, _ApiWidget],
{
	//	summary:
	//		Widget to display all user-answered facets in a group.
	//	ex:
	//	|	// create the selection tags for a group
	//	|	var selectionTags = new excentos.widget.facetgroup.SelectionTags({
	//	|		label: "Your Application Type:",
	//	|		facetGroupName:	"xcAjaxClient.wizard.Phase1"
	//	|	}).placeAt(document.body, "last");
	//	|	
	//	|	// create a static tag
	//	| 	var staticTag = new excentos.widget.facetgroup.SelectionTagStatic({
	//	|		label: "Ofen",
	//	|		url: "/BSH/app_oven/wursti-wursti.dev"
	//	|	})
	//	|
	//	|	// add the static tag to first position in the tags list
	//	|	var selectionTags.addTag(staticTag, 0); 	
	
	relativeTemplatePath: "facetgroup/SelectionTags.html",
	templateString: '<div class="xc_selectiontags xc_clear"\
						><div class="xc_label">%{facetGroup.label}</div\
						><div data-dojo-attach-point="containerNode"></div\
					></div>',
    
	// 	facetGroupName: String
	//		The name of the facet group to display the facets in group of
	facetGroupName:	"",
	
	//	label: String
	//		Decorates the followings tags.
	label: "",
	
	// 	tags: excentos.widget.facetgroup._SelectionTag[]
	//		a list of the tags 
	tags: null,
	
	// 	visible: boolean
	//		Flag that indicates visibility of the widget
	visible: true,
	
	//	isNested: boolean
	//		Flag that tells the widget to render nested tag structure
	isNested: false,
	
	// 	hideIfEmpty: boolean
	//		Flag that tell the widget to hide (or not) if there are no tags
	hideIfEmpty: true,
	
	// 	tagsAreClickable: boolean
	//		Flag that tells the widget that its tags have to be clickable or not.
	//		This will affect tags added to the widget!
	tagsAreClickable: true,
	
	//	multiStateSeparator: String
	//		A string to put between two state labels of a multi-state selection tag widget.
	multiStateSeparator: " / ",
	
	isApiWidget: false,
	
	// counterMode: Boolean
	//		Indcates whether the displayed SelectionTag should be the actual selection 
	//		(means the state label like "Brand: Adidas, Nike, Puma") or just a counter for how many
	//		selections have been made (like "Brands: 3 selected")
	counterMode: undefined,

	simpleCount: null,

	hashBoolFacetsRenderedAsSelectionTag: null,

	constructor: function(){
		this.tags = [];	
	},
	
	postMixInProperties: function(){
		this.facetGroup = shared.store.getFacetGroupByName(this.facetGroupName);
		if(!this.facetGroup){
			throw new Error(this.declaredClass, " there is no such facetGroup ´"+this.facetGroupName+"´");
		}
		
		var conf = this.facetGroup.configItems || {};
		// set `this,counterMode` based on what is really set
		this.counterMode = this.counterMode != undefined ? this.counterMode :  //check the property itself
						   conf["selectionTagsCounter"] != undefined ? conf["selectionTagsCounter"]=="true" :  //check config
						   util.objectKeys(shared.store.getFacetsInGroupByGroupNameRecursive(this.facetGroup.name)).length>1; //check if there is no more than one facetInGroup
						   
		this.inherited(arguments);
	},
	
	postCreate: function(){
		var contentItems = this.facetGroup.contentItems,
			configItems = this.facetGroup.configItems;
		
		if(this.label && this.labelNode){
			this.labelNode.innerHTML = this.label;
		}
		
		// Add static tags.
		// TODO Refactor static selection tags into a separate class.
		if(contentItems){
			var index = 1,
				_staticKey = "selectionTagsStatic";
				
			while(contentItems[_staticKey + "Label"]){
				var staticConf = {
					label: contentItems[_staticKey + "Label"]
				};
				if(configItems){
					staticConf.url = configItems[_staticKey + "Url"];
				}
				
				var staticTag = shared.widgetFactory.makeWidget("facetgroup.SelectionTagStatic", staticConf);
				this.addTag(staticTag);
				staticTag.refresh();
				
				_staticKey = "selectionTagsStatic" + (++index);
			}
		}
		
		
		if(this.counterMode){
			var tag = shared.widgetFactory.makeWidget("facetgroup.SelectionTagCounter", {
				facetGroup: this.facetGroup
			});
			this.addTag(tag,0);
		}
		
		if(this.isNested){
			domClass.add(this.domNode, "xc_nested");
		}
		
		this._checkVisibility();
	},
	
	refresh: function(){
		if(this.counterMode){
			this.tags[0] && this.tags[0].refresh();
		}else {
			this._refresh();
			//mark FacetGroup Widget
			SelectionTags.setHasSelection(this.facetGroup.name, !!this.tags.length);
		}
		this.simpleCount = shared.behavior.getSelectionTagsCount && shared.behavior.getSelectionTagsCount();
	},
	
	_refresh: function(/*Boolean?*/ clearEvenStatics){
		//	summary:
		//		rebuilds the selection tags.
		//	clearEvenStatics:
		//		optionally clear static tags	
		
		var store = shared.store,
			facetsInGroup = store.getOrderedFacetsInGroupByGroupNameRecursive(this.facetGroupName),
			facetNamesOfRenderedSelectionTags = {};

		this.hashBoolFacetsRenderedAsSelectionTag = {};

		// clear the list, pass through the clearStaticTags flag
		this.clear(clearEvenStatics);

		for(var i = 0, l = facetsInGroup.length; i < l; ++i){
			var facetInGroup = facetsInGroup[i],
				facetInGroupName = facetInGroup.name,
				facetVars = store.getFacetVarsByFacetName(facetInGroup.facetName);

			if(facetVars.answered){
				//	Check if we have to create a disabled top tag
				//	we have to do so if we are in nested selectionTags,
				//	the current facetInGroup is in the path of the cached
				//  disabledTopFacetInGroup-candidate at a deeper nesting level	
				//  see:
				//		 #1276 for more info
				if(this.isNested && this._disabledTopFacetInGroup){					
					if(facetInGroupName.match(
						"^" + 
						this._disabledTopFacetInGroup.name.substr(
							0, this._disabledTopFacetInGroup.name.lastIndexOf(".")
						)
					) !== null 
					&& (this._getNesting(facetInGroupName) > this._getNesting(this._disabledTopFacetInGroup.name))){						
						// create the disabled topTag
						var topTag = this._createTagOfFacetInGroup(this._disabledTopFacetInGroup);
						domClass.add(topTag.domNode, "xc_disabled");
						this.addTag(topTag);
						topTag.refresh();
						this._disabledTopFacetInGroup = null;
					}
				}

				// avoid duplicate selection tags for facets used in more than one phase
				if(!facetNamesOfRenderedSelectionTags[facetInGroup.facetName]){
					var tag = this._createTagOfFacetInGroup(facetInGroup, facetVars);

					if(tag){
						this.addTag(tag);
						tag.refresh();
						// flag for already rendered selection tags
						facetNamesOfRenderedSelectionTags[facetInGroup.facetName] = true;
					}
				}
				
			}else
				//	A facetInGroup may be a candidate for a disabled
				//	topTag, if it's not been answered and we are in
				//	nested selectionTags and there is either no cached
				//	disabledTopFacetInGroup or the current facetInGroup
				//	is located at a lower or equal nesting level then
				//	the last added tag
				//
				//	ATTENTION:
				//		this works for 2 levels only. There is no recursion so
				//		the behavior on deeper levels is undefined.
				//	see:
				//		 #1276 for more info
				if(this.isNested
				&& (!this._disabledTopFacetInGroup 
				|| this._currentNesting >= this._getNesting(facetInGroupName))){
					this._disabledTopFacetInGroup = facetInGroup;
				}
		}
		
		this._checkVisibility();

		return this;
	},
	
	_createTagOfFacetInGroup: function(/*Object*/ facetInGroup, /*Object?*/ facetVars){
		//	summary:
		//		Private TagFactory
		//		Create a Tag widget for given facetInGroup
		//	facetInGroup: Object
		//		The facetInGroup Object for to create the tag
		//	facetVars: Object
		//		optionally pass the corresponding facetVars if you have fetched them before
		var store = shared.store,
			tag = null,
			states = store.getFacetInGroupStateItemsByFacetInGroupName(facetInGroup.name),
			//prepare data object for mixin to SelectionTag* instances
			props = {
				facetGroup: this.facetGroup,
				facetInGroup: facetInGroup,
				facetVars: facetVars,
				states: null
			};
		
		facetVars = facetVars || store.getFacetVarsByFacetName(facetInGroup.facetName);
		
		//	check for nested selection tags and empty values
		//	to create `fake` state if necessary
		if(this.isNested && facetVars.currentValueItems === null){
			//NOTE: add legacy `stateObj` to props
			props.stateObj = {label: facetInGroup.label};
			props.states = [props.stateObj];
			tag = shared.widgetFactory.makeWidget("facetgroup.SelectionTag", props);
		}else 
			//	single state facet
			if(facetVars.currentValueItems.length === 1){
				if(!this.hashBoolFacetsRenderedAsSelectionTag[facetVars.currentValueItems[0]]){
					// HACK http://trac.excentos.lan/trac/xcProjects/ticket/1873#comment:2
					props.stateObj = states[facetVars.currentValueItems[0]] || states[parseFloat(facetVars.currentValueItems[0])];
					props.states = [props.stateObj];
					tag = shared.widgetFactory.makeWidget("facetgroup.SelectionTag", props);
					this.hashBoolFacetsRenderedAsSelectionTag[facetVars.currentValueItems[0]] = true;
				}
			}else
				// multivalue facet
				if(facetVars.currentValueItems.length > 1){	
					var values = [],
						self = this;
					
					array.forEach(facetVars.currentValueItems, function(value){
						if(!self.hashBoolFacetsRenderedAsSelectionTag[value]) {
							values.push(states[value]);
							self.hashBoolFacetsRenderedAsSelectionTag[value] = true;
						}
					});

					if(values.length > 0) {

						props.states = values;
						if (store.getFacetByName(facetInGroup.facetName).rangeSelection === true) {
							tag = shared.widgetFactory.makeWidget("facetgroup.SelectionTagRangeState", props);
						} else {
							props.separator = this.multiStateSeparator;
							tag = shared.widgetFactory.makeWidget("facetgroup.SelectionTagMultiState", props);
						}
					}
				}
		
		return tag;
	},
	
	clear: function(/*Boolean?*/ clearEvenStatics){
		//	summary:
		//		clears the list.
		//	clearEvenStatics:
		//		if true delete even static tags
		
		// reverse cleanup to avoid conflicts with tag indizies when removed
		for(var i = this.tags.length - 1; i >= 0; --i){
			if(!clearEvenStatics && 
				this.tags[i].isInstanceOf(SelectionTagStatic)){
				// keep static SelectionTags if not required explicitly
				continue;
			}else{
				// clean up
				this.removeTagAt(i);
			}
		}
		
		return this;
	},
	
	removeTagAt: function(/*Integer*/ index){
		//	summary:
		//		removes and destroys the tag at the given index.
		//	index:
		//		the position of the tag to remove
		var tag = this.tags[index];
		
		if(tag){
			tag.destroyRecursive();
			delete this.tags[index];
			
			this.tags.splice(index, 1);
		}
		
		return this;
	},
	
	getTag: function(/*Integer*/ index){
		//	summary:
		//		returns the tag at the given index.
		//	index:
		//		the index of the tag to fetch
		return this.tags[index] || null;
	},
	
	addTag: function(/*excentos.widget.facetGroup._SelectionTag*/ tag, /*Integer?*/ index){
		//	summary:
		//		adds a new tag to the list.
		//	index:
		//		optionally place the tag at this index
		
		if(this.counterMode 
		   || tag.isVisible() 
		   || this.getConfigItems("selectionTagsShowInvisible", "boolean")){


			if(index === undefined){
				index = this.tags.length;
			}
			
			tag.set("clickable", this.tagsAreClickable).placeAt(this.containerNode, index);
			
			this.tags.splice(index, 0, tag);
			
			//	apply nesting for nested selection tags
			if(this.isNested && tag.isInstanceOf(SelectionTag)){
				this._applyNesting(tag, index);
			}
		}
		
		return this;
	},
	
	_applyNesting: function(/*excentos.widget.facetGroup._SelectionTag*/ tag, /*Integer*/ index){
		//	summary:
		//		apply nesting with css classes xc_nestinglevel_[0-9]+
		//		the level is calculated relative to the level of 
		//		the previous tag in the list, starting with zero
		//	tag: excentos.widget.facetGroup._SelectionTag
		//		the tag to apply the nesting
		//	index: Integer
		//		the index of the tag for to calculate the nesting
		var prevTag = this.getTag(index-1);
		
		if(!prevTag || this._currentNesting === undefined){
			this._currentNesting = this._getNesting(tag.get("facetInGroup").name);
			this._currentNestingLevel = 0;
		}else{
			var nesting = this._getNesting(tag.get("facetInGroup").name);
			
			//	nesting level must not become less zero
			if(this._currentNesting > nesting && this._currentNestingLevel){
				--this._currentNestingLevel;
			}else if(this._currentNesting < nesting){
				++this._currentNestingLevel;
			}
			
			this._currentNesting = nesting;
		}
		
		domClass.add(tag.domNode, "xc_nestinglevel_" + this._currentNestingLevel);
	},
	
	_getNesting: function(/*String*/ name){
		var nesting = 0;
		
		for(var i = 0, l = name.length; i < l; ++i){
			if(name[i] == "."){
				++nesting;
			}
		}
		
		return nesting;
	},
	
	_checkVisibility: function(){
		// summary:
		//		show or hide the widget dependently on the hideIfEmpty Flag
		//		and the current tags count
		if(this.hideIfEmpty && (this.tags.length === 0)){
			this.hide();
		}else {
			this.show();
		}
	},
	
	show: function(){
		//	summary:
		//		shows the widget. 
		
		if(!this.visible){
			domClass.remove(this.domNode, "xc_hidden");
			this.visible = true;
		}
	},
	
	hide: function(){
		//	summary:
		//		hides the widget.
		
		if(this.visible){
			domClass.add(this.domNode, "xc_hidden");
			this.visible = false;
		}
	}
});

var _SelectionTag = declare(
	"excentos.widget.facetgroup._SelectionTag", 
	_Widget, {
	
	// summary: 
	//		The Base SelectionTag Class
	
	relativeTemplatePath: "facetgroup/SelectionTag.html",
	templateString: '<div data-dojo-attach-point="entryNode" data-dojo-attach-event="onclick:onClick" class="xc_selectiontag_entry"></div>',
	
	// clickable: boolean
	//		Flag that tells whether a tag is clickable or not
	clickable: true,
	
	_setClickableAttr: function(/*Boolean*/ clickable){
		//	summary:
		//		sets the clickability flag of a tag
		//		update the css class if changed
		if(clickable !== this.clickable){
			this.clickable = clickable;
			this.refresh();
		}
	},
	
	refresh: function(){
		// summary:
		//		refreshes the tag, updates css class that indicates clickability
		//		of the tag
		util.toggleClasses(this.domNode, {
			"clickable": this.clickable,
			"hidden": !this.getApiVars().visible
		});
	},
	
	onClick: function(){
		// summary:
		//		checks whether tag is clickable and calls _onClick callback
		if(this.clickable){
			this._onClick();
		}
	},
	
	_onClick: function(){
		// summary:
		//		onclick callback
	}
});

var SelectionTag = declare(
	"excentos.widget.facetgroup.SelectionTag", 
	[_ApiWidget, _SelectionTag], {	
	
	//	summary:
	//		Seletiontag representing a facet in group with exactly one state
	
	//	state:	Object
	//		The state/current user supplied value of the facet
	stateObj: null,
	
	//	facetVars: Object
	facetVars: null,
	
	// facetInGroup: Object
	facetInGroup: null,
	
	//	facetGroup: Object
	facetGroup: null,

	isApiWidget: false,
	
	constructor: function(){
		//	summary:
		//		initializes the tag's properties
		this.facetVars = this.stateObj = this.facetInGroup	= {};
	},
	
	refresh: function(){
		//	summary:
		//		refreshes the view of the tag
		this.inherited(arguments);
		
		var text = this._getStateText(this.stateObj);
		SelectionTags.setHasSelection(this.facetGroup.name, !!text);
		
		this.entryNode.innerHTML = text;
	},
	
	_getStateText: function(state){
		//	summary:
		//		fetches a user friendly string representative of a state depending on the facet type
		var type = shared.store.getFacetByName(this.facetInGroup.facetName).type,
			text = "";
		
		if(type == "OrdinalFacet" && this.facetInGroup.label){
			text = this.facetInGroup.label + ": ";
		}
		text += state.label;
		
		return text;
	},
	
	_onClick: function(){
		//	summary:
		//		on click event callback
		var facetName = this.facetInGroup.name;
		
		shared.behavior.moveToAccessibleStage(
			facetName.substr(0, facetName.lastIndexOf('.'))
		);
	}
});

var SelectionTagStatic = declare(
	"excentos.widget.facetgroup.SelectionTagStatic", 
	_SelectionTag, {
		
	//	url: String
	//		The URL to direct to when click on the tag
	url: "",
	
	//	label: String
	//		The label/text to display
	label: "",
	
	//	attributeMap: Object
	attributeMap: {
		label: {
			node: "entryNode",
			type: "innerHTML"
		}
	},
		
	_onClick: function(){
		//	summary:
		//		on click event callback	
		if(this.url){
			location.href = this.url;
		}
	}
});

var SelectionTagCounter = declare(
	"excentos.widget.facetgroup.SelectionTagCounter",
	[_ApiWidget, SelectionTagStatic], {
		
	countAnsweredFacets: function(){
		var figs = shared.store.getFacetsInGroupByGroupNameRecursive(this.facetGroup.name);
		var count = 0; 
		for(var figName in figs){
			var fig = figs[figName];
			var facetVars = shared.store.getFacetVarsByFacetName(fig.facetName);
			facetVars.currentValueItems && (count += facetVars.currentValueItems.length);
		}
		
		return count;
	},
		
	_getStateText: function(){
		this.inherited(arguments);
		var labels = this.getContentItems("selectiontags_counterLabels", "array") || [];
		
		var count = this.countAnsweredFacets();
		var text = !count ? 
				labels[2] || this.i18n.selectiontags_counterLabelNone || "" : 
				count + " "+(labels[count==1 ? 0 : 1] || this.i18n.selectiontags_counterLabel || "");
		
		// target the GroupWidget which a SelectionTag's SelectionTags-container belongs to
		
		return text;
	},
	
	refresh: SelectionTag.prototype.refresh //SelectionTagStatic does not inherit from SelectionTag
});

var SelectionTagMultiState = declare(
	"excentos.widget.facetgroup.SelectionTagMultiState",
	SelectionTag, {
	
	//	states: Array
	//		The list of states of the facet
	states: null,
	
	//	separator: String
	//		The Separator to display between each state
	separator: ' / ',
	
	constructor: function(){
		//	summary:
		//		initializes the tag
		this.states = [];
	},
	
	refresh: function(){
		//	summary:
		//		refreshes the tag's view
		var content = [];
		
		this.inherited(arguments);
		
		for(var i = 0, l = this.states.length; i < l; ++i){
			content.push(this._getStateText(this.states[i]));
		}
		
		this.entryNode.innerHTML = content.join(this.separator);
	}	
});
var SelectionTagRangeState = declare(
	"excentos.widget.facetgroup.SelectionTagRangeState",
	SelectionTagMultiState, {

	separator: ' - ',

	_getStateText: function(state) {
		return state.label;
	},

	refresh: function() {
		this.inherited(arguments);
		this.entryNode.innerHTML += ' ' + (this.facetInGroup.unit||"");
	}	
});


SelectionTags.setHasSelection = function(groupName, bool){
	var groupWidget = widgetRegistry.byName(groupName);
	groupWidget && domClass.toggle(groupWidget.domNode, "xc_has_selection", bool);
};

return {
	SelectionTags: SelectionTags,
	SelectionTag: SelectionTag,
	SelectionTagStatic: SelectionTagStatic,
	SelectionTagMultiState: SelectionTagMultiState,
	SelectionTagRangeState: SelectionTagRangeState
};

});
