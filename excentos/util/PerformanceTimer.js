define(function(){

	/*
	 *  "START/STOP" {
	 *  	// via string identifier
	 *  		performanceTimer.start('stringId');
	 *  		...
	 *  		performanceTimer.end('stringId');
	 *
	 *		// or via handle
	 *  		var performanceTimerEndHandle = performanceTimer.start(unpredictableIdentifier());
	 *  		...
	 *  		performanceTimerEndHandle();
	 *
	 *  	// alternative end via handle
	 *  		var performanceTimerEndHandle = performanceTimer.start(unpredictableIdentifier());
	 *  		...
	 *  		performanceTimer.end(performanceTimerEndHandle);
	 *  }
	 *
	 *  "OUTPUT" {
	 *  	// print
	 *  	performanceTimer.print()
	 *  }
	 *
	 * xcPerformanceTimer.start();
	 * xcPerformanceTimer.end();
	 *
	 *
	 * xcPerformanceTimer.use("my-measure-case").start();
	 * xcPerformanceTimer.use("my-measure-case").end();
	 *
	 *
	 * xcPerformanceTimer.use("my-measure-case").start("WidgetId "+widget.id+" doing something");
	 * xcPerformanceTimer.use("my-measure-case").end();
	 *
	 *
	 * end = xcPerformanceTimer.use("my-measure-case").start("WidgetId "+widget.id+" doing something");
	 * end();
	 */
	var uid = 0;
	var _forEach = function(method){
		var list = PerformanceTimer.list, name;
		for(name in list){
			method.apply(list[name]);
		}
	};

	function PerformanceTimer(/*String?*/ name){
		this.name = name || "PerformanceTimer_" + (uid++);
		this._data = new PerformanceTimer.Data;
		PerformanceTimer.list[this.name] = this;
	}

	PerformanceTimer.list = {};
	PerformanceTimer.print = function(/*String?*/ name){
		var p = name ? PerformanceTimer.list[name] : this;

		console.group("PerformanceTimer " + p.name);
		console.table(p._data.results);
		this.summary(p.name);
		console.groupEnd("PerformanceTimer " + p.name);
	};
	PerformanceTimer.print.all = _forEach.bind(null, PerformanceTimer.print);


	PerformanceTimer.summary = function(name){
		var p = name ? PerformanceTimer.list[name] : this;
		var DP = PerformanceTimer.summary._DataPoint;
		var r = p._data.results, length = 0, v,
			_calcData = {
				runs: new DP("Runs", 0),
				sum: new DP("Sum (ms)", 0),
				avg: new DP("Average (ms)", 0),
				min: new DP("Minimum (ms)", Infinity),
				max: new DP("Maximum (ms)", -Infinity)
			},
			tableData = {};

		for(var key in r){
			++length;
			v = r[key].time;
			_calcData.min.value = Math.min(_calcData.min.value, v);
			_calcData.max.value = Math.max(_calcData.max.value, v);
			_calcData.sum.value += v;
		}
		_calcData.runs.value = length;

		if(length > 2){
			_calcData.sum.value -= _calcData.min.value + _calcData.max.value;
			length -= 2;
		}
		_calcData.avg.value = (( _calcData.sum.value / length * 1e3) | 0) / 1e3;

		var _data = {};
		Object.keys(_calcData).forEach(function(key){
			var dp = _calcData[key];
			tableData[dp.label] = dp.value;
		});
		_data[p.name + " SUMMARY"] = tableData;

		console.table(_data);
	};
	PerformanceTimer.summary.all = _forEach.bind(null, PerformanceTimer.summary);
	PerformanceTimer.summary._DataPoint = function(label, value){this.value = value; this.label = label};

	PerformanceTimer.create = function(name){
		return new PerformanceTimer(name);
	};
	PerformanceTimer.get = function(name){
		return name === undefined ? PerformanceTimer.list : PerformanceTimer.list[name];
	};
	PerformanceTimer.use = function(name){
		var instance = PerformanceTimer.list[name];
		return instance ? instance : new PerformanceTimer(name);
	};
	PerformanceTimer.Data = function(){
		this.running = {};
		this.results = {};
	};
	PerformanceTimer.Data.prototype = {
		constructor: PerformanceTimer.Data,
		running: null,
		results: null
	};

	PerformanceTimer.prototype = {
		constructor: PerformanceTimer,
		_data: null,
		_endRecent: null,
		name: "",
		start: function(/*String?*/ name){
			var d = this._data, n = Date.now();
			name = name || "NO_ID_" + n;
			d.running[name] = n;
			return this._endRecent = this.end.bind(this, name);
		},
		end: function(/*String|PerformanceTimer.end?*/ name){
			if(typeof name === "function")return name();
			if(name === undefined)return this._endRecent();

			var d = this._data, n = Date.now(), r;
			if(name in d.running){
				r = d.results[name] || (d.results[name] = {time: 0});
				r.time += n - d.running[name];
			}
		},
		print: PerformanceTimer.print,
		summary: PerformanceTimer.summary,
		create: PerformanceTimer.create,
		get: PerformanceTimer.get,
		use: PerformanceTimer.use
	};

	return window.xcPerformanceTimer = new PerformanceTimer("DEFAULT");
});