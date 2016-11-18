var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs')

var isDevClient = !!fs.existsSync(path.join(__dirname, '../../xcProject/app_XXXappnameXXX.js'))
var SERVER_PORT = 50080;
var CLIENT_PARAM_NAME = "xcClientUrl";

function serve(request, response) {
	if (url.parse(request.url).pathname.indexOf('/static') === 0) {
		return serve_static(request, response)
	}
	else {
		return serve_proxy(request, response)
	}
}

var contentTypes = {
	standard: 	"text/plain",
	html: 		"text/html",
	js: 		"text/javascript",
	css: 		"text/css",
	png: 		"image/png",
	jpg: 		"image/jpg",
	gif: 		"image/gif"
};

function serve_static(request, response) {
	var urlPath = url.parse(request.url).pathname||"",
		filename,
		ext = path.extname(urlPath),
		extMatch = (ext.match(/\.([a-z0-9]+)/)||[]).pop(),
		contentType = contentTypes[extMatch] || contentTypes.standard;
	
	// Remove "/static" from URL path as it only serves as hint to not use the proxy.
	urlPath = urlPath.replace(/^\/static/, '')
	// Rewrite the request of an uncompressed dojo layer to the usual name for the case that we're on a deployed server in client debug mode.
	urlPath = urlPath.replace(/^(.*?\/dojo\.js)\.uncompressed\.js$/, '$1')
	
	// Rewrites for DevClient.
	if (isDevClient) {
		//FIXME: check the rewrites the new project structure xcProject/theme/THEMENAME/theme.js has not been tested with the server yet!
		// rewrites
		urlPath = urlPath.replace(/\/app_\w+\.js$/, '/app_XXXappnameXXX.js').replace(/xcProject\/theme\/\w+\/theme\.js$/, '/xcProject/theme/XXXthemeXXX/theme.js')
		if (urlPath.indexOf("/xcProject/theme/css/") !== 0 && urlPath.indexOf("/xcProject/theme/templates/") !== 0) {
			urlPath = urlPath.replace(/^\/xcProject\/theme\/\w+\/css\/theme\.css$/, '/xcProject/theme/XXXthemeXXX/css/theme.css')
		}
	}
	
	// If a 3rd parameter is given, take it as absolute path to document root, else it's "WebContent/ajaxclient/".
	if (process.argv[4]) {
		filename = path.join(process.argv[4], urlPath)		
	}
	else {
		filename = path.join(__dirname, '../..', urlPath)
	}
	fs.exists(filename, function(exists) { 
		if (!exists) { 
			response.writeHead(404, {'Content-Type': 'text/plain'})
			response.write('404 Not Found\n' + filename)
			response.end()
			return
		}
		fs.readFile(filename, 'binary', function(err, file) {
			if (err) {
				response.writeHead(500, {'Content-Type': 'text/plain'})
				response.end(err + '\n')
				return
		  	}
			response.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Content-Type': contentType
			})
			response.write(file, 'binary')
			response.end()
		})
	})
}

function serve_proxy(request, response) {
	var urlObj = url.parse(request.url, true),
		urlPath = urlObj.path
		
	// Add "xcClientUrl=http://hostname:port/static/" to the URL if not given as a convenience
	// as the whole point of the proxy is to serve the page from the same host as the client.
	if (urlPath.indexOf(CLIENT_PARAM_NAME+'=') == -1) {
		var clientUrlQueryParam = CLIENT_PARAM_NAME+'=http://' + request.headers.host + '/static/'
		if (urlObj.search) {
			urlPath = urlPath.replace(/(.*?)\?(.*)/, '$1?' + clientUrlQueryParam + '&$2')
		}
		else if (urlObj.hash) {
			urlPath = urlPath.replace(/(.*?)#(.*)/, '$1?' + clientUrlQueryParam + '#$2')
		}
		else {
			urlPath = urlPath.replace(/(.*?)\?(.*)/, '$1?' + clientUrlQueryParam)
		}
	}
	
	var options = {
		host: process.argv[2] || 'localhost',
		port: process.argv[3] || 8080,
		path: urlPath,
		headers: {}
	}
	for (var header in request.headers) {
		if (header != "host") {
			options.headers[header] = request.headers[header]
		}
	}
	
	http.get(options, function(proxyResponse) {
		response.writeHead(proxyResponse.statusCode, proxyResponse.headers)
		proxyResponse.on('data', function(chunk) {
			response.write(chunk, 'binary')
		})
		proxyResponse.on('end', function(){
			response.end()
		})
	}).on('error', function(e) {
		console.log("Got error: " + e.message)
	})
}

http.createServer(serve).listen(SERVER_PORT)
console.log('Server running at port '+SERVER_PORT+', use the following url parameter to start:\n');
console.log('?'+CLIENT_PARAM_NAME+'=http://localhost:'+SERVER_PORT+'/static/');