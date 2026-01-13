const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Route: /
    if (path === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the Node.js HTTP Server");
    }

    // Route: /about
    else if (path === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>About Page</h1><p>This is a simple Node.js HTTP server.</p>");
    }

    // Route: /user
    else if (path === "/user") {
      const { name, age } = parsedUrl.query;

      const userData = {
        name: name || "Unknown",
        age: age || "Not provided",
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userData));
    }

    // Invalid Route
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page Not Found");
    }
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
