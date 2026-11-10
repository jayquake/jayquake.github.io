/**
 * Node entry: browser-safe catalog API + disk loader.
 */
module.exports = {
  ...require("./index"),
  ...require("./loadFromDisk"),
};
