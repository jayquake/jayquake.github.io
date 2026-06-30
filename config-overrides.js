const path = require("path");
const { removeModuleScopePlugin, babelInclude } = require("customize-cra");

module.exports = function override(config) {
  removeModuleScopePlugin()(config);
  babelInclude([
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "shared"),
  ])(config);

  const isProduction = process.env.NODE_ENV === "production";
  config.resolve.alias = {
    ...config.resolve.alias,
    "react-dom$": path.resolve(
      __dirname,
      "node_modules/react-dom/cjs",
      isProduction ? "react-dom.production.min.js" : "react-dom.development.js",
    ),
  };

  if (process.env.ANALYZE === "true") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: path.resolve(
          __dirname,
          "docs/test-plans/performance/bundle-report.html"
        ),
      })
    );
  }

  return config;
};
