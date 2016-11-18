define(["dojo/dom-geometry"], function(domGeometry){
	
	var module = {
		getMarginBox: function(node){
			//basically complete return value of domGeometry::getMarginSize()
			var nodeRect = this.getBoundingClientRect(node);
			var nodeMargins = domGeometry.getMarginExtents(node);
			var nodeMarginRect = {
				l: nodeRect.left - nodeMargins.l | 0,
				r: nodeRect.right + nodeMargins.r | 0,
				w: nodeRect.right - nodeRect.left + nodeMargins.w | 0, //old IEs dont implement getBoundingClientRect()::width
				t: nodeRect.top - nodeMargins.t | 0,
				b: nodeRect.bottom + nodeMargins.b | 0,
				h: nodeRect.bottom - nodeRect.top + nodeMargins.h | 0 //old IEs dont implement getBoundingClientRect()::height
			};
				
			return nodeMarginRect;
		},
		getBoundingClientRect: function(node){
			//safety method in case getBoundingClientRect is not available (is the case for document.documentElement aka <HTML>)
			if(!node.getBoundingClientRect){
				console.warn("excentos/dom-geometry::getBoundingclientRect",node," does not provide such method `getBoundingClientRect`");
				return {top:0,right:0,bottom:0,left:0};
			}
			return node.getBoundingClientRect();
		},
		getLocalMarginBox: function(node){
			//summary returns a MarginBox without inherited offsets
			var nodeBox = this.getMarginBox(node);
			if(node.parentNode){
				var containerBox = this.getMarginBox(node.parentNode);
				
				nodeBox.l -= containerBox.l;
				nodeBox.r -= containerBox.l;
				nodeBox.t -= containerBox.t;
				nodeBox.b -= containerBox.t;
			}
			
			return nodeBox;
		},
		getOffsets: function(/*DOMNode*/ node){
			return node instanceof NodeOffsets ?
					node :
					new NodeOffsets(node);
		},
		getScrollPosition: function(node){
			//summary returns information about the potential scroll-ability of a node
			var scrolls = {
				l: node.scrollLeft | 0,
				r: 0,
				w: Math.max(0, node.scrollWidth - node.offsetWidth) | 0,
				t: node.scrollTop | 0,
				b: 0,
				h: Math.max(0, node.scrollHeight - node.offsetHeight) | 0
			};
			
			scrolls.r = Math.max(0, scrolls.w - scrolls.l) | 0;
			scrolls.b = Math.max(0, scrolls.h - scrolls.t) | 0;
			
			return scrolls;
		},
		getOutOfBounds: function(/*DOMNode || NodeOffset*/ target, /*DOMNode? || NodeOffset?*/ container){
			//summary: Returns which sides of `target` are out of `container`'s bounds.
			//			 0 = within boundaries, 1 = out of bounds right/bottom, -1 = out of bounds left/top
			//
			//			{t:-1,r:0,b:0,l:0} -> `target`'s top border is above `container`
			//			{t:-1,r:0,b:-1,l:0} -> `target` is way above `container` (completely out of view)
			//			{t:0,r:0,b:1,l:0} -> `target`'s bottom is outside of `container`
			
			
			target = target instanceof NodeOffsets ? target : this.getOffsets(target);
			container = container instanceof NodeOffsets ? container : this.getOffsets(container || target.node.parentNode);
			
			var bounds = {
				t: target.marginBox.t > container.marginBox.b ? 1 :
						target.marginBox.t < 0 ? -1 :
						0,
				r: target.marginBox.r > container.marginBox.r ? 1 : 
						target.marginBox.r < 0 ? -1 : 
						0,
				b: target.marginBox.b > container.marginBox.b ? 1 : 
						target.marginBox.b < 0 ? -1 : 
						0,
				l: target.marginBox.l > container.marginBox.r ? 1 :
						target.marginBox.l < 0 ? -1 :
						0
			};
			
			return bounds;
		},
		getScrollBounds: function(/*DOMNode || NodeOffset*/ target, /*DOMNode || NodeOffset*/ container){
			//summary: returns the scroll positions for container to reach a boundary of target
			//NOTE: the returned values are absolute scrollTop/scrollLeft values
			//NOTE: the values may be smaller than expected as the container may not allow to scroll to further ...
			
			target = target instanceof NodeOffsets ? target : this.getOffsets(target);
			container = container instanceof NodeOffsets ? container : this.getOffsets(container);

			var bounds = {
				t: Math.min(container.scrolls.t + target.marginBox.t, container.scrolls.h),
				r: Math.min(container.scrolls.l + target.marginBox.r, container.scrolls.w),
				b: Math.min(container.scrolls.t + target.marginBox.b, container.scrolls.h),
				l: Math.min(container.scrolls.l + target.marginBox.l, container.scrolls.w)
			};
			
			return bounds;
		}
	};
		
	var NodeOffsets = function(node){
		this.node = node;
		this.marginBox = module.getLocalMarginBox(node);
		this.scrolls = module.getScrollPosition(node);
	};
	return module;
});
