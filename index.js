// Minimal native Node.js HTTP server demonstrating common patterns
const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  const reqUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = reqUrl.pathname;

  // GET example
  if (request.method === 'GET' && pathname === '/users') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
  }

  // POST example
  if (request.method === 'POST' && pathname === '/users') {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      response.writeHead(201, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'User created', data: body }));
    });
    return;
  }

  // PUT example
  if (request.method === 'PUT' && pathname === '/users/1') {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'User updated', data: body }));
    });
    return;
  }

  // DELETE example
  if (request.method === 'DELETE' && pathname === '/users/1') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'User deleted' }));
  }

  // Default: 404
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Native Node server listening on http://localhost:${PORT}`);
});
