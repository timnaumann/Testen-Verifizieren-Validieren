define({
	major: 2,
	minor: 6,
	patch: "x",
	flag: "trunk",

	toString: function(){
		return 	this.major+"."+
				this.minor+"."+
				this.patch+
				this.flag ? " - this.flag" : "";
	}
})