
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

// Serve up public/ftp folder
var serve = serveStatic('public/', {'index': ['index.html']});

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
});

// Listen
server.listen(server_port);