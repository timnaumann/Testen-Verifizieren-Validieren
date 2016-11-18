define([
	"doh/runner",
	"dojo/json",
	"excentos/Store",
	"dojo/text!../payload.json" //data based on ZeissSO app_riflescope
],function(doh, JSON, Store, payloadJSON){
	
		var payload = JSON.parse(payloadJSON),
			reasonRootGroup = payload.applicationItems.app_riflescope.recommendations.recommendationRootGroup.recommendationGroupItems["app_riflescope.recommendationGroup.alternative"].recommendationItems["app_riflescope.recommendation.position.0"].reasonRootGroup,
			store = new Store();

		store.setResult(payload);

	doh.register("excentos.Store.reasons", [
		{
			name: "structure test",
			runTest: function(d){
				var reasonItems = store.getOrderedReasonsByPosition(0),
					depths = [], depth=0, maxdepths=0,
					recurse = function(group){
						depths.push(depth++);
						var subgroup = group.reasonGroupItems,
							i=subgroup&&subgroup.length || 0;
						
						while(i-->0)recurse(subgroup[i]);
					};
				
				for(var i=0, l=reasonItems.length; i<l; i++){
					depth=0;
					recurse(reasonItems[i]);
				}
				maxdepths = depths.sort().pop();
				
				d.is(3, maxdepths);
			}
		}
	]);
});