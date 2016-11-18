var testResourceRegEx = /^excentos\/tests\//;
var ignoreResourceRegEx = /^excentos\/\.nodejs\//;

var profile = {
	resourceTags: {
		ignore: function(filename, mid){
			return ignoreResourceRegEx.test(mid);
		},
		test: function(filename, mid){
			return testResourceRegEx.test(mid);
		}/*,
		Disabled because modules tagged as "amd" don't get dojo.cache strings inlined. #1397
		amd: function(filename, mid){
			return /\.js$/.test(filename);
		}*/
	}
};
