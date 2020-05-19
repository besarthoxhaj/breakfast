const http = require('http');

http.createServer((req, res) => {
  res.end('From Docker: Hello, World!');
}).listen(80);
