define([
	"dojo/_base/array"
],function(array){
    var logFunc = function(){},
        _interfaces = ["log","info","warn","error","group","groupCollapsed","groupEnd"], i = _interfaces.length;
    while(i-->0){logFunc[_interfaces[i]] = logFunc;}

    if(xcInitial.debug){
        var _log = function(consoleMethodName, subject, message, args){
            var config = xcInitial.development.log || [],params=[];
            if(!config.length)return;
            if(array.indexOf(config,"all") != -1 || array.indexOf(config,subject) != -1){
                params = ["|"+subject+"|",message];
                args && params.push(args);

                (console[consoleMethodName]||console.log).apply(console,params);
            }
        };

        var _createLog = function(method){
            return function(subject, message, args){
                _log(method, subject, message, args);
            };
        };

        i=_interfaces.length;
        logFunc = _createLog("log");
        while(i-->0){logFunc[_interfaces[i]] = _createLog(_interfaces[i]);}

    }


return logFunc;

});
