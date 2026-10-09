const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const OUT_DIR = path.join(__dirname, "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

function serveFile(res, filePath) {
  const stream = fs.createReadStream(filePath);
  res.setHeader("Content-Type", getMimeType(filePath));
  stream.pipe(res);
  stream.on("error", () => {
    res.writeHead(500);
    res.end("Internal Server Error");
  });
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);

  // Try exact file first
  let filePath = path.join(OUT_DIR, urlPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(OUT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // If path is a directory, try index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // If no extension, try adding .html (Next.js static export pattern)
  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    filePath += ".html";
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
  } else {
    // Serve 404 page if it exists, otherwise plain text
    const notFoundPage = path.join(OUT_DIR, "404.html");
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404);
      serveFile(res, notFoundPage);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Static server running on http://0.0.0.0:${PORT}`);
});
