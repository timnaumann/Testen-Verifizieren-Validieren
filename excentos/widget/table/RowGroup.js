define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"./Row"
], function(declare, domClass, Row){

return declare(
	"excentos.widget.table.RowGroup",
	Row,
{
	templateString: '<tbody class="xc_table_element xc_table_rowgroup xc_open" data-dojo-attach-point="containerNode">\
						<tr>\
							<th colspan="99" class="xc_label xc_table_rowgroup_label" data-dojo-attach-point="labelNode" data-dojo-attach-event="onclick:_onClick">${label}</th>\
						</tr>\
					</tbody>',
	
	//from api, yet static
	collapsible: true,
	collapsed: false,
	
	_onClick: function(e){
		this.toggle();
	},
	
	_setCollapsedAttr: function(bool){
		if(this.collapsed != bool){
			this.collapsed = bool;
			bool ? this.hide() : this.show();
		}
	},
	
	_setCollapsibleAttr: function(bool){
		if(this.collapsible != bool){
			this.collapsible = bool;
		}
	},
	
	toggle: function(collapse){
		//if ´collapse´ is set use that value - else invert ´this.collpased´
		var collapsed = collapse!=undefined ? collapse : !this.collapsed;
		this.set("collapsed", collapsed);
	},
	show: function(){
		domClass.replace(this.domNode, "xc_open", "xc_close");
	},
	hide: function(){
		domClass.replace(this.domNode, "xc_close", "xc_open");
	}
});

});
