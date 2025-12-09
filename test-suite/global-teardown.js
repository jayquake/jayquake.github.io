// global-teardown.js
// TODO: Temporarily commented out SDK
// const accessFlowSdkGlobalTeardown = require('@acsbe/accessflow-sdk/dist/src/playwright/global-teardown').default;

async function globalTeardown() {
  // Your custom teardown logic, if any
  // await doSomethingCustom();

  // Call the SDK's teardown
  // TODO: Temporarily commented out SDK
  // await accessFlowSdkGlobalTeardown();

  console.log("Global teardown completed (SDK disabled)");
}

module.exports = globalTeardown;
