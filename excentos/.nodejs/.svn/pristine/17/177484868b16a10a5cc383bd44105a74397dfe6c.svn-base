function debounce(cb, wait){
	// execute `cb` after `wait` milliseconds
	var timer;
	return function(){
		if(timer){
			clearTimeout(timer);
		}
		var self = this;
		var a = arguments;
		timer = setTimeout(function(){
			cb.apply(self, a);
		}, wait);
	};
}

function getTime(){
	var d = new Date(), p = function(n, l){return padNumber(n, l || 2);};
	return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + '.' + p(d.getMilliseconds(),3);
}

function padNumber(num, len){
	var n, s = num < 0 ? '-' : '', l = (n = Math.abs(num) + '').length;
	return len < l ? num + '' : s + Array(len - l + 1).join('0') + n;
}

module.exports = {
	debounce: debounce,
	getTime: getTime,
	padNumber: padNumber
};