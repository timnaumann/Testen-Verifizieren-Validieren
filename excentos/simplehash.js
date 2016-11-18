define([
	"dojo/hash",
	"dojo/_base/lang",
	"dojo/topic"
], function(dojoHash, lang, topic){

	//re-implementation of "dojo/hash" which correctly handles hashchanges in <base href> scenarios

	/**
	 usages;
	 require("excentos/simplehash", function(simplehash){
	 	// get hash
	 	simplehash();

	 	//set hash
	 	simplehash("myhash");
	 	simplehash("myhashNoNewHistory", true);

	 	// `subscribe` to hashchange
		topic.subscribe(simeplehash.SIGNAL_HASHCHANGE, function(newHash, oldHash){
	 		console.log(newHash, oldHash);
	 	});

	 	// `subscribe` to hashchange shorthand
	 	simplehash.subscribe(function(newHash, oldHash){
	 		console.log(newHash, oldHash);
	 	});

	 });
	 **/

	var SIGNAL_HASHCHANGE = "/excentos/hashchange",
		_recentHash = "";

	var simplehash = function(/* String? */ hash, /* Boolean? */ replace){
		hash = arguments.length ? hash : dojoHash();
		
		if(replace){
			simplehash.replace(hash);
		}else {
			simplehash.set(hash);
		}

		return hash;
	};
	simplehash.replace = function(/* String? */ hash){
		//fix base href scenarios - replace the whole url to avoid base href redirecting due to relative hash-url
		var url = location.href.replace(location.hash, "#"+hash);
		location.replace(url);
	};
	simplehash.set = function(/* String? */ hash){
		//fix base href scenarios - explicitely use location.hash
		location.hash = hash.replace("#","");
	};
	simplehash.subscribe = lang.hitch(topic, topic.subscribe, SIGNAL_HASHCHANGE); //bind
	simplehash.SIGNAL_HASHCHANGE = SIGNAL_HASHCHANGE;

	topic.subscribe("/dojo/hashchange", function(newHash){
		topic.publish(SIGNAL_HASHCHANGE, newHash, _recentHash);
		_recentHash = newHash;
	});

	return simplehash;
});
