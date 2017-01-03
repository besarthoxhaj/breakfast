'use strict';

var http = require('http');

http.createServer(function (req,res) {
  if(req.url === '/favicon.ico') return;
  console.log('req.headers.cookie',req.headers.cookie);
  res.setHeader('Set-Cookie','name=fooHere; HttpOnly');
  res.end('foo here');
}).listen(3001);