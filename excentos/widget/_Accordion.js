define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/registry",
	"excentos/widget/registry",
	"excentos/widget/_Widget",
	"./_Collapsible" /*NMD:Ignore*/ /*implicit module declaration*/
], function(declare, lang, registry, xcregistry, _Widget, Collapsible){

var _Accordion = declare(
	"excentos.widget._Accordion",
	_Widget,
	{
		isAccordion: true,
		accordionTargets: null,
		collapsibles: null,

		constructor: function(){
			this.collapsibles = [];
		},

		postMixInProperties: function(){
			this.inherited(arguments);
			this.updatePropertyFromConfig("isAccordion", "boolean");
			this.updatePropertyFromConfig("accordionTargets", "array");
		},

		postCreate: function(){
			this.inherited(arguments);
			if(this.isAccordion){
				this._setupAccordion();
			}
		},

		collapseAllOthers: function(/*_Collapsible?*/ except){
			var widgets = this.collapsibles, i = widgets.length, widget;
			if(!widgets)return;

			//FIXME: currently requires at least two webservice requests (first PLUS all the others via 'invokeMany')
			while(i && i--){
				widget = widgets[i];
				//if `except` is given, collapse an expanded widget which is not the `except`ed one
				if(!except || widget != except && !widget.collapsed){
					//console.log(this.id, "collapseAllOthers", widget.id);
					widget.collapse();
				}
			}
		},

		collapseAll: function(){
			this.collapseAllOthers(null);
		},

		add: function(widget){
			//FIXME: `onExpand` is called on every child!
			this.connect(widget, "onExpand", lang.hitch(this, this.collapseAllOthers, widget));
			this.collapsibles.push(widget);
		},

		_setupAccordion: function(){
			this._setupCollapsibleChildren();
			//initial accordion logic
			var cwidgets = this.collapsibles;
			cwidgets && this.collapseAllOthers(cwidgets[cwidgets.length - 1]);
		},

		_setupCollapsibleChildren: function(){
			if(this.accordionTargets && this.accordionTargets.length){
				_gatherCollapsiblesFromList.call(this, this.accordionTargets);
			}else{
				_gatherCollapsiblesFromDomNode.call(this, this.domNode);
			}
		}
	}
);

/******* private *******/


function _gatherCollapsiblesFromList(/*Array*/ list){
	// summary:
	//  collects all collapsibles widgets from an array given the registry keys
	//  ex:  _gatherCollapsiblesFromList(["xcAjaxClient.wizard.phase1.group1.facet1"]);
	
	var i=list.length, widget=null;
	
	while(i-->0){
		widget = xcregistry.index.byName[list[i]];
		if(!widget)continue;
		
		"collapsible" in widget && this.add(widget);
	}
};
function _gatherCollapsiblesFromDomNode(/*DOMNode*/ fromNode){
	// summary:
	//  collects all collapsibles widgets within this.domNode
	
	fromNode = fromNode || this.domNode;
	var widgets = registry.findWidgets(fromNode), i=widgets.length, widget=null, isSubAccordion, isSubCollapsible;
	
	while(i && i--){
		widget = widgets[i];
		isSubAccordion = "isAccordion" in widget && widget.isAccordion; //check if it is accorion-like and also if it claims to actually be an accordion
		isSubCollapsible = "collapsible" in widget && widget.collapsible;
		
		isSubCollapsible && !isSubAccordion && this.add(widget);
		//dont gather nested collapsibles, nor take control over other accordions
		if(!isSubAccordion && !isSubCollapsible){
			arguments.callee.call(this,widget.domNode);
		}
	}
};

return _Accordion;
});