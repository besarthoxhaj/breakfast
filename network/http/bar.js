'use strict';

var http = require('http');

http.createServer(function (req,res) {
  if(req.url === '/favicon.ico') return;
  console.log('req.headers',req.headers)
  console.log('req.headers.cookie',req.headers.cookie);
  res.setHeader('Set-Cookie','name=barHere; HttpOnly');
  res.end('<p>bar here</p>\n<img src="http://localhost:3001/cat.png">');
}).listen(3000);

