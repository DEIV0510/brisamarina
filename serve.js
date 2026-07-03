// Servidor estático mínimo para previsualizar la landing de Brisa Marina.
// Uso:  node serve.js    →    http://localhost:5234
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5234;
const ROOT = __dirname;
const TYPES = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml',
  '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg', '.mp4':'video/mp4', '.ico':'image/x-icon',
  '.woff2':'font/woff2', '.json':'application/json',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); return res.end('404 — no encontrado'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Brisa Marina en  http://localhost:${PORT}`));
