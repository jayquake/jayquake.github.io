const accessFlowSdkGlobalTeardown =
  require('@acsbe/accessflow-sdk/dist/src/playwright/global-teardown').default;

module.exports = async function globalTeardown() {
  await accessFlowSdkGlobalTeardown();
  console.log('AccessFlow global teardown completed');

  if (global.__SERVER_PROCESS__) {
    global.__SERVER_PROCESS__.kill();
    console.log('Application server stopped');
  }
};
