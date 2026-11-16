/**
 * Search Component Testing with AccessFlow SDK (Selenium)
 *
 * Mirrors the Playwright search.spec.js using Selenium WebDriver.
 */

const { By, until } = require('selenium-webdriver');
const { AccessFlowSDK, SeleniumDriver } = require('@acsbe/accessflow-sdk');
const { createDriver, navigateTo } = require('../helpers/driver');

AccessFlowSDK.init({
  apiKey:
    process.env.AF_NODE_PACKAGE_KEY ||
    process.env.AF_Node_Package_Key ||
    'flow-1U2ZoybZBK4gZacuqsA0008F9xAVgoirEn',
});

let driver;

beforeAll(async () => {
  driver = await createDriver();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

describe('Search Component Testing with AccessFlow SDK', () => {
  beforeEach(async () => {
    await navigateTo(driver, '/');
    await driver.sleep(500);
  });

  test('should display search input when the drawer is open', async () => {
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));
    const report = await sdk.audit();
    console.log('Audit completed:', report ? 'Success' : 'No report');

    const searchInput = await driver.wait(
      until.elementLocated(
        By.css('input[aria-label="Search rules"], input[aria-label="Filter rules in sidebar"]'),
      ),
      10000,
    );

    expect(await searchInput.isDisplayed()).toBe(true);

    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toMatch(/search rules/i);
  });

  test('should display result details in dropdown', async () => {
    const searchInput = await driver.wait(
      until.elementLocated(
        By.css('input[aria-label="Search rules"], input[aria-label="Filter rules in sidebar"]'),
      ),
      10000,
    );

    expect(await searchInput.isDisplayed()).toBe(true);

    await searchInput.clear();
    await searchInput.sendKeys('keyboard');
    await driver.sleep(800);

    const tableLink = await driver.wait(
      until.elementLocated(By.css('table a[href*="/engine/"]')),
      10000
    );
    expect(await tableLink.isDisplayed()).toBe(true);
    expect((await tableLink.getText()).trim().length).toBeGreaterThan(0);
  });
});
