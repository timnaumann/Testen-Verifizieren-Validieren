var fs = require("fs");
var path = require("path");
var rmdir = require("rimraf");
var async = require("async");
var exec = require("child_process").exec;
var util = require("../util");

var NOOP = function(){};
//navigate up the tree   amdSymlinks < .nodejs < excentos < core < ajaxlclient
var ajaxclientRootDir = path.join(__dirname, "../../../../");
var symlinkRootDir = path.join(ajaxclientRootDir, "/.amd");

function removeSymlinkRootDir(cb){
	cb = cb || NOOP;
	rmdir(symlinkRootDir, cb);
}
function createSymlinkRootDir(cb){
	cb = cb || NOOP;
	fs.mkdir(symlinkRootDir, cb);
}
function createSymlinks(){
	_createSymlinksFromDestinationToTargetMap({
		"xcProject": "xcProject/",
		"excentos": "core/excentos/"
	});
}

function fsSymlinkCallback(err){
	if(err){
		console.error(err);
		var isWindows = /^win/.test(process.platform);
		if(isWindows){
			handleWindowsEpermDebounced();
		}
	}
}

function handleWindowsEperm(){
	console.log("========== INSUFFICIENT PERMISSIONS! ==========");
	console.log("directing to fallback solution ...");
	console.log("\n\n\nrun the 'symlinks.bat' as adminstrator (right click `symlinks.bat > run as administrator`)\n\n\n");

	removeSymlinkRootDir();
	setTimeout(function(){
		exec("explorer /select," + __filename.replace(".js", ".bat"));
	}, 3000);
}
var handleWindowsEpermDebounced = util.debounce(handleWindowsEperm, 500);

function _createSymlinksFromDestinationToTargetMap(symlinkDestinations){

	var fsSymlink;
	for(var symlinkDestination in symlinkDestinations){
		var symlinkTarget = symlinkDestinations[symlinkDestination];
		var isFile = !!path.parse(symlinkTarget).ext;
		var symlinkType = isFile ? 'file' : 'dir';

		var absoluteSymlinkTarget = path.join(ajaxclientRootDir, symlinkTarget);
		var relativeSymlinkTarget = path.relative(symlinkRootDir, absoluteSymlinkTarget);
		var absoluteSymlinkDestination = path.join(symlinkRootDir, symlinkDestination);

		fsSymlink = fs.symlink(absoluteSymlinkDestination, relativeSymlinkTarget, symlinkType, fsSymlinkCallback);
	}

	return fsSymlink;
}

function run(){
	async.series([
		removeSymlinkRootDir,
		createSymlinkRootDir,
		createSymlinks
	]);
}

module.exports = {
	run: run
};