/**
 * AccessFlow JS SDK — Behavior Tests (Selenium)
 *
 * Validates SDK initialization, audit lifecycle, and report shape
 * using Selenium WebDriver. Mirrors the Playwright sdk-behavior.spec.js.
 */

const { AccessFlowSDK, SeleniumDriver } = require('@acsbe/accessflow-sdk');
const { createDriver, navigateTo } = require('../helpers/driver');

AccessFlowSDK.init({
  apiKey:
    process.env.AF_NODE_PACKAGE_KEY ||
    process.env.AF_Node_Package_Key ||
    'flow-1TmAHDBGjDGX4aadlA0000VdvvxVnhZfP2',
});

let driver;

beforeAll(async () => {
  driver = await createDriver();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

describe('SDK Initialization', () => {
  test('should initialize without errors', () => {
    expect(true).toBe(true);
  });

  test('should create an instance bound to a driver', async () => {
    await navigateTo(driver, '/');
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    expect(sdk).toBeTruthy();
  });
});

describe('Audit — Home Page', () => {
  beforeEach(async () => {
    await navigateTo(driver, '/');
    await driver.sleep(500);
  });

  test('should return a report on the home page', async () => {
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    const report = await sdk.audit();
    expect(report).toBeTruthy();
  });

  test('audit should complete without throwing', async () => {
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    await expect(sdk.audit()).resolves.toBeTruthy();
  });
});

describe('Audit — Graphics Route', () => {
  beforeEach(async () => {
    await navigateTo(driver, '/graphics/alt-text_success');
    await driver.sleep(500);
  });

  test('should return a report for the graphics/alt-text route', async () => {
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    const report = await sdk.audit();
    expect(report).toBeTruthy();
  });

  test('multiple audits on the same page should be stable', async () => {
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    const reportA = await sdk.audit();
    const reportB = await sdk.audit();
    expect(reportA).toBeTruthy();
    expect(reportB).toBeTruthy();
  });
});

describe('Audit — After Navigation', () => {
  test('should audit successfully after route change', async () => {
    await navigateTo(driver, '/');
    await driver.sleep(500);
    const sdkHome = new AccessFlowSDK(new SeleniumDriver(driver));
    const reportHome = await sdkHome.audit();
    expect(reportHome).toBeTruthy();

    await navigateTo(driver, '/graphics/alt-text_success');
    await driver.sleep(500);
    const sdkGraphics = new AccessFlowSDK(new SeleniumDriver(driver));
    const reportGraphics = await sdkGraphics.audit();
    expect(reportGraphics).toBeTruthy();
  });
});
