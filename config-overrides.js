const path = require("path");
const { removeModuleScopePlugin, babelInclude } = require("customize-cra");

module.exports = function override(config) {
  removeModuleScopePlugin()(config);
  babelInclude([
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "shared"),
  ])(config);

  // Webpack 5 cannot statically analyze react-dom's conditional CJS require
  // when MUI v7 ESM files do `import * as ReactDOM from 'react-dom'`.
  // Pointing directly to the CJS source exposes exports.createPortal etc.
  // which webpack CAN analyze, eliminating the "module has no exports" error.
  const isProduction = process.env.NODE_ENV === "production";
  config.resolve.alias = {
    ...config.resolve.alias,
    "react-dom$": path.resolve(
      __dirname,
      "node_modules/react-dom/cjs",
      isProduction ? "react-dom.production.min.js" : "react-dom.development.js",
    ),
  };

  return config;
};
