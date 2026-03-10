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
    'flow-1TmAHDBGjDGX4aadlA0000VdvvxVnhZfP2',
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
        By.css('input[aria-label="Search for rules and criteria"], input[placeholder="Search..."]'),
      ),
      10000,
    );

    expect(await searchInput.isDisplayed()).toBe(true);

    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toBe('Search...');
  });

  test('should display result details in dropdown', async () => {
    const searchInput = await driver.wait(
      until.elementLocated(
        By.css('input[aria-label="Search for rules and criteria"], input[placeholder="Search..."]'),
      ),
      10000,
    );

    expect(await searchInput.isDisplayed()).toBe(true);

    await searchInput.clear();
    await searchInput.sendKeys('keyboard');
    await driver.sleep(800);

    const firstResult = await driver.wait(
      until.elementLocated(By.css('.MuiListItem-root, [role="option"], li')),
      5000,
    );

    expect(await firstResult.isDisplayed()).toBe(true);

    const text = await firstResult.getText();
    expect(text).toBeTruthy();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});
