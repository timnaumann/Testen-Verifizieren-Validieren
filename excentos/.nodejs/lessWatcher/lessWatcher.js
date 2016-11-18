var watch = require("node-watch");
var exec = require("child_process").exec;
var path = require("path");
var glob = require("glob");
var util = require("../util");
var eventHub = new require("events").EventEmitter;

var args = process.argv.slice(2);

if(args[0] === '-h'){
	console.log("$ node lessWatcher/launch [ARG_MATCH_THEMENAME [ARG_GLOB_LESS_FILES]]");
	//default ARG_MATCH_THEMENAME = "."
	//default ARG_GLOB_LESS_FILES = "**/less/theme.less"

	console.log("\n","//compile theme.less files if folder matches /mobile/");
	console.log("$ node lessWatcher/launch \"/mobile/\"");

	console.log("\n","//compile theme.less files if folder matches /mobile|responsive/");
	console.log("$ node lessWatcher/launch \"/mobile|responsive/\"");

	console.log("\n","//glob **/theme-loader.less and compile any (.) of them");
	console.log("$ node lessWatcher/launch \".\" **/theme-loader.less");
	process.exit();
}

var DEFAULT_MATCH_THEMENAME = /./;

var ARG_MATCH_THEMENAME = args[0] ? new RegExp(args[0]) : DEFAULT_MATCH_THEMENAME;
var ARG_GLOB_LESS_FILES = args[1] || "**/less/theme.less";

/******************* util*******************/
var getPrettyCssFileName = function(fileName){
	return _getPretty(fileName, "css/theme.css");
};
var getPrettyLessFileName = function(fileName){
	return _getPretty(fileName, "less/theme.less");
};

var _getPretty = function(fileName, appendStr){
	return path.join(getThemeDirInfo(fileName).themeName, appendStr);
};

var compileLess = function(targetLessFile, cb){

	var themeDirInfo = getThemeDirInfo(targetLessFile);
	var cwd = themeDirInfo.themeDir;

	var lessDir = path.join(cwd,"/less");
	var relativeAjaxclientRootDir = "../../../../";
	var absoluteAjaxclientRootDir = path.join(lessDir, relativeAjaxclientRootDir);
	var lesscArgs = [
		"--no-color",
		"--source-map",
		//FIXME: theme.css.map creates absolute references for either xcProject/* or core/excentos/* or even both ... wanted relative ones :(
		"--source-map-basepath=" + absoluteAjaxclientRootDir, //strips the absolute local path out of sourcemaps //Users/root/filepath/SportScheck/ajaxclient
		"--source-map-rootpath=" + relativeAjaxclientRootDir, //back to ajaxclient/
		"less/theme.less",
		"css/theme.css"
	];

	console.log(util.getTime(), "cd " + cwd + "\n", "lessc\n\t" + lesscArgs.join("\n\t"));
	//we need to use exec on Windows systems
	exec("lessc " + lesscArgs.join(" "), {cwd: cwd}, function(error, stdout, stderr){
		var err = error || stderr;

		if(err){
			console.error("======================= ERROR =======================");
			console.error(util.getTime(), err);
			console.error("======================= ERROR =======================");
		}else{
			console.log(util.getTime(), getPrettyCssFileName(targetLessFile), "DONE");
		}

		typeof cb === "function" && cb({error:err, cwd:cwd, themeDirInfo:themeDirInfo});
	});
};

/******************* util*******************/

/******************* theme.less -> theme.css *******************/
var themeDirInfoRegex = /(^.+(.)theme\2)([^\\/]+)/;
var fileFilterRegex = /\.less$/;

var getThemeDirInfo = function(filename){
	var matches = filename.match(themeDirInfoRegex);
	return {
		themeDir: matches[0],
		parentThemeDir: matches[1],
		pathDelimiter: matches[2],
		themeName: matches[3]
	}
};

/***** trigger by file relative *****/
var triggerThemeLessToThemeCssBySubfileName = function(filename, cb){
	var folderInfo = getThemeDirInfo(filename);
	var targetFile = path.join(folderInfo.themeDir, "less/theme.less");

	compileLess(targetFile, cb);
};
var triggerThemeLessToThemeCssBySubfileNameDebounced = util.debounce(triggerThemeLessToThemeCssBySubfileName, 500);

/***** trigger by static theme.less filelist *****/
var triggerThemeLessToThemeCssByStaticThemeLessFileList = function(){
	STATIC_THEME_LESS_FILES.forEach(compileLess);
};
var triggerThemeLessToThemeCssByStaticThemeLessFileListDebounced = util.debounce(triggerThemeLessToThemeCssByStaticThemeLessFileList, 500);

/******************* theme.less -> theme.css *******************/

/******************* filewatcher *******************/
var hasThemeFolderRegex = /(.)theme\1/;
var filter = function(pattern, fn){
	return function(filename){
		if(pattern.test(filename)){
			fn(filename);
		}
	}
};

var handleLessFileChange = function(filename){
	if(hasThemeFolderRegex.test(filename)){
		console.log("==============================================");
		console.log(util.getTime(), "changed", filename);

		if(ARG_MATCH_THEMENAME){
			triggerThemeLessToThemeCssByStaticThemeLessFileListDebounced();
		}else {
			triggerThemeLessToThemeCssBySubfileNameDebounced(filename, handleOnSingleSubfileCompiled);
		}

	}
};
var handleOnSingleSubfileCompiled = function(obj){
	!obj.error && triggerThemeLessToThemeCssByStaticThemeLessFileListDebounced();
};

/******************* filewatcher *******************/

/******************* RUN *******************/
var STATIC_THEME_LESS_FILES = [];
function run(){

	console.log(util.getTime(), "... launching", path.parse(__filename).base);
	var ajaxclientRootDir = path.join(__dirname, "../../../../");
	var _NIX_WATCH_FOLDER = ajaxclientRootDir.split(path.sep).join("/"); //dirty replaceAll

	console.log(util.getTime(), "... gathering ",ARG_GLOB_LESS_FILES," resources");

	glob.sync(ARG_GLOB_LESS_FILES, {cwd: _NIX_WATCH_FOLDER}).forEach(function(themeFolder){
		if(ARG_MATCH_THEMENAME.test(themeFolder)){
			STATIC_THEME_LESS_FILES.push(path.resolve(ajaxclientRootDir, themeFolder));
		}
	});
	console.log(util.getTime(), "found files:", "\n\t", STATIC_THEME_LESS_FILES.map(getPrettyLessFileName).join("\n\t"));

	console.log(util.getTime(), "... invoke file watcher for ", ajaxclientRootDir);
	watch(ajaxclientRootDir, filter(fileFilterRegex, handleLessFileChange));

	console.log(util.getTime(), "DONE - awaiting file changes");

	if(ARG_MATCH_THEMENAME === DEFAULT_MATCH_THEMENAME && STATIC_THEME_LESS_FILES.length > 1){
		console.log("\n\tTIP:", "reduce active file watchers by adding a RegEx filter as first argument");
		console.log("\tlike:  $ node lessWatcher/launch \"/(mobile|ipad)/\"");
	}
}
/******************* RUN *******************/

module.exports = {
	run: run
};