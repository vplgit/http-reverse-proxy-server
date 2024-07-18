const proxyTable = require("./proxy/proxy_table");
const createPortProxy = require("./proxy/proxy");
const express = require("express");
const httpProxy = require("http-proxy");
const path = require("path");
const app = express();
const proxy = httpProxy.createProxyServer({});

// app.all("", (req, res) => {
//   console.log("Proxying request:", req.url);
//   proxy.web(req, res, {
//     target:
//       "https://65e1bfe3d0709bc55b36ed09--incandescent-valkyrie-ab707d.netlify.app/auth/signin",
//     changeOrigin: true,
//     secure: false, // If your target is using HTTPS and you have self-signed certificates
//     // pathRewrite: {
//     //   "^/web-app": "", // Remove /web-app prefix when forwarding
//     // },
//   });
// });

// Error handling
// proxy.on("error", (err, req, res) => {
//   console.error("Proxy Error:", err);
//   res.status(500).send("Proxy Error");
// });

//app.use(express.static(path.join(__dirname, "./my-react-app/src")));
// Route to serve the specific static page for /api
// app.get("/", (req, res) => {
//   res.send("Hello From Web-App");
// });

app.get("/user", (req, res) => {
  res.send("Hello From Web-App I am user");
});

app.get("/app", (req, res) => {
  res.send("Hello this is web app");
});

//Start the serve
Object.keys(proxyTable).forEach((app_locator) => {
  app.use(
    app_locator,
    createPortProxy(
      proxyTable[app_locator].port,
      proxyTable[app_locator].host,
      app_locator
    )
  );
});

const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
