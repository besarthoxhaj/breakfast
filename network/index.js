'use strict';
/* @flow */

var fs = require('fs');
var http = require('http');
var https = require('https');
var serverConfig = {
  key:fs.readFileSync('key.pem'),
  cert:fs.readFileSync('cert.pem')
};

http.createServer(function(req,res) {
  console.log('REQUEST!');
  res.end('Hello, World! Port: 80');
}).listen(8000,'127.0.0.1');

// https.createServer(serverConfig,function(req,res) {
//   console.log('REQUEST!');
//   res.end('Hello, World! Port: 443');
// }).listen(443,'127.0.0.255');