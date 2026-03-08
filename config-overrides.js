const path = require('path');
const { removeModuleScopePlugin, babelInclude } = require('customize-cra');

module.exports = function override(config) {
  removeModuleScopePlugin()(config);
  babelInclude([
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'shared'),
  ])(config);
  return config;
};
