const http = require('http');

// Create an HTTP server
const startServer = () => {
  const server = http.createServer((req, res) => {
    console.log('request hit');
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      Etag: '1',
    });
    res.end('okay');
  });
  server.listen(3000, '127.0.0.1', () => {
    console.log('server listen :3000');
  });
};

const run = () => {
  startServer();
};

run();
