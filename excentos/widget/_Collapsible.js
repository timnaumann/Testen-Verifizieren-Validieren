define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/dom-class"
], function(lang, declare, domClass){

	
	/**
	 * Adds collapse / expand logic to a Widget.
	 * A Collapsible is not collapsed implicitly - content should usually be visible to the user;
	 * The QestionFlow can decide to override this behavior and allow a widget to be collapsed initially.
	 * In the end a user's decision is the one which counts and should always be restored to the last chosen state.
	 * In short:
	 *  User decision > configuration > default
	 *  
	 *  To avoid conflicts with the API variable ´expanded´ the widget is dealing with its counterpart ´collapsed´.
	 *  Setting ´collapsed´ to ´true´ will store ´expanded=false´ on the server side.
	 */
	//FIXME: there is a major issue regarding the way the setter-lifecycle is implemented here which contradicts the usual
	//		_Stateful behavioral expectations. It is currently not possible to trigger listeners via `this.watch("collapsed", listener)`.
	//		The Pattern here focuses very much on the intermediate handling of transitioning from `collapsed=true` to `collapsed=false`
	//		and vice versa. One has to explicitly use AOP approaches on `onExpand/ed()|onCollapse/d()`.
	//		> As it turns out _WidgetBase ist to blame for this one where an alternative implementation of _Stateful exists.
	//		  Plain _Stateful instances would react as expected; bit _WidgetBase does not handle changes on custom setters.
	//		  As refactoring goal one should consider to compose a Widget/Class with 1..n _Stateful objects:
	//		  MyWidget { state /*_Stateful*/, ... };  w = new MyWidget;  w.state.watch("collapsed", onchange);  w.state.set("collapsed");
	//		>> Workaround is to avoid custom setters / getters (in any widget btw)!

var CSS_BASE_CLASS =		"xc_collapsible",
	CSS_CLASS_COLLAPSING = 	"xc_collapsible_collapsing",
	CSS_CLASS_COLLAPSED = 	"xc_collapsible_collapsed",
	CSS_CLASS_EXPANDING = 	"xc_collapsible_expanding",
	CSS_CLASS_EXPANDED = 	"xc_collapsible_expanded",
	CSS_CLASS_COLLAPSER_NODE = "xc_collapser_node",
	CSS_CLASS_COLLAPSIBLE_NODE = "xc_collapsible_node",
	CSS_CLASSES = [CSS_CLASS_COLLAPSED, CSS_CLASS_COLLAPSING, CSS_CLASS_EXPANDED, CSS_CLASS_EXPANDING];

var _Collapsible = declare(
	"excentos.widget._Collapsible",
	null,
	{		
			
		// collapsible: Boolean
		//	whether this widget can be collapsed
		collapsible: true,
		
		// collapsed: Boolean
		//	whether this widget is collapsed or not
		collapsed: false,
		
		// collapsibleNode: DOMElement
		//	the element that collapses (usually a wrapper for states or facets)
		collapsibleNode: null,
		
		// collapserNode: DOMElement
		//	the element the user can click on to trigger the collapse
		collapserNode: null,
		
		// _onCollapserClickHandler: dojo connect handler
		_onCollapserClickHandler: null,

		constructor: function(){
			this.own(
				this.watch("_collapsed", lang.hitch(this, "onCollapsedChange"))
			);
		},
		
		postCreate: function(){
			this.inherited(arguments);
			this._updateNodes();
			
			//initial collapsed state should be reflected in css classes
			this._updateCssClasses(this.collapsed ? CSS_CLASS_COLLAPSED : CSS_CLASS_EXPANDED, CSS_CLASSES);
		},
		
		/*********** PUBLIC ***********/
		
		collapse: function(){
			this.set("collapsed", true);
		},
		
		expand: function(){
			this.set("collapsed", false);
		},
		
		collapseToggle: function(){
			if(this.collapsed){
				this.expand();
			}else{
				this.collapse();
			}
		},
		
		//NOTE: the class name needs to be prefixed with ´xc_collapsible_´ because ´xc_collapsed´ is already defined as cssClass from api
		onExpand: function(){
			this._updateCssClasses(CSS_CLASS_EXPANDING, CSS_CLASSES);
			this._setCollapsed(false);
		},
		onExpanded: function(){
			this._updateCssClasses(CSS_CLASS_EXPANDED, CSS_CLASSES);
		},
		onCollapse: function(){
			this._updateCssClasses(CSS_CLASS_COLLAPSING, CSS_CLASSES);
			this._setCollapsed(true);
		},
		onCollapsed: function(){
			this._updateCssClasses(CSS_CLASS_COLLAPSED, CSS_CLASSES);
		},

		//aop attachpoint
		onCollapsedChange: function(property, oldValue, newValue){},
		
		/*********** PROTECTED ***********/
		
		_onCollapseClick: function(){
			this.collapseToggle();
		},
		
		_updateNodes: function(){
			// summary:
			//	Removes or adds click handler and css-classes depending on the widget's ´collapsible´ setup.
			var collapsible = this.collapsible;

			//add CSS_BASE_CLASS if this is collapsible, and remove CSS_BASE_CLASS if its not
			this._updateCssClasses(collapsible && CSS_BASE_CLASS, CSS_BASE_CLASS);
			
			if(this.collapsibleNode && collapsible){
				this.collapsibleNode && domClass.toggle(this.collapsibleNode, CSS_CLASS_COLLAPSIBLE_NODE, collapsible);
			}
			
			if(this.collapserNode){
				//remove click handler - in case of re-targeting
				this._onCollapserClickHandler && this._onCollapserClickHandler.remove();
				domClass.toggle(this.collapserNode, CSS_CLASS_COLLAPSER_NODE, collapsible);
				
				if(collapsible){
					this._onCollapserClickHandler = this.connect(this.collapserNode, "onclick", this._onCollapseClick);
				}
			}
		},
		
		_updateCssClasses: function(/*String*/ setClass, /*String?*/ removeClass){
			setClass == undefined 	  && (setClass = "");
			removeClass == undefined  && (removeClass = "");
			
			//TODO: maybe use a NodeList, to avoid multiple "reflows"
									domClass.replace(this.domNode, 		   setClass, removeClass);
			this.collapsibleNode && domClass.replace(this.collapsibleNode, setClass, removeClass);
			this.collapserNode   && domClass.replace(this.collapserNode,   setClass, removeClass);
		},
		
		_setCollapsed: function(bool){
			//summary:
			// the finally called function that really sets the ´collapsed´ property after onCollapsed/onExpanded
			this.collapsed = bool;
			this.set("_collapsed", bool);
		},
		
		/*********** GETTER / SETTER ***********/

		_setExpandedAttr: function(bool){
			this.set("collapsed",!bool);
		},
		_getExpandedAttr: function(){
			return !this.collapsed;
		},
		
		_setCollapsibleAttr: function(bool){
			if(this.collapsible != bool){
				this.collapsible = bool;
				this._updateNodes();
			}
		},
		
		_setCollapsedAttr: function(bool){
			if(this.collapsible && bool != this.collapsed){
				if(bool){
					this.onCollapse();
					this.onCollapsed();
				}else {
					this.onExpand();
					this.onExpanded();
				}				
			}
		}
	}
);

return _Collapsible;
});