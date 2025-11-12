// global-teardown.js
const accessFlowSdkGlobalTeardown = require('@acsbe/accessflow-sdk/dist/src/playwright/global-teardown').default;

async function globalTeardown() {
  // Your custom teardown logic, if any
  // await doSomethingCustom();

  // Call the SDK's teardown
  await accessFlowSdkGlobalTeardown();
}

module.exports = globalTeardown;

