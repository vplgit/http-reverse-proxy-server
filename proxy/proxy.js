const { createProxyMiddleware } = require("http-proxy-middleware");

const createPortProxy = (port, host, pathPrefix) => {
  return createProxyMiddleware({
    target: port != null ? `http://${host}:${port}` : host,
    changeOrigin: true, // Needed for virtual hosted sites
    // pathRewrite: {
    //   [`^${pathPrefix}`]: "", // remove the pathPrefix from the path
    // },

    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
    },
    onProxyRes: function (proxyRes, req, res) {
      // Set correct Content-Type headers for CSS and JavaScript files
      if (
        proxyRes.headers["content-type"] &&
        (proxyRes.headers["content-type"].includes("text/css") ||
          proxyRes.headers["content-type"].includes("application/javascript"))
      ) {
        proxyRes.headers["content-type"] = "text/css"; // Adjust as needed
      }
    },
    onError: (err, req, res) => {
      console.error(`Proxy error: ${err.message}`);
      res.status(500).send("Proxy error");
    },
  });
};
module.exports = createPortProxy;
