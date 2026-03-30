/**
 * Breadcrumbs with Accessibility Audits (Selenium)
 *
 * Mirrors the Playwright breadcrumb-toggle-audit.spec.js using Selenium WebDriver.
 */

const { By, until } = require('selenium-webdriver');
const { AccessFlowSDK, SeleniumDriver } = require('@acsbe/accessflow-sdk');
const { createDriver, navigateTo, scrollIntoView } = require('../helpers/driver');

AccessFlowSDK.init({
  apiKey:
    process.env.AF_NODE_PACKAGE_KEY ||
    process.env.AF_Node_Package_Key ||
    'flow-1Rne8TWPwxRONacpdjA000gvFjBP5bY8fv',
});

let driver;

beforeAll(async () => {
  driver = await createDriver();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

describe('Breadcrumbs with Accessibility Audits', () => {
  test('should navigate from failure to success page using breadcrumb dropdown and audit both', async () => {
    await navigateTo(driver, '/graphics/background-images_failure');
    await driver.sleep(1000);

    let currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('background-images_failure');

    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));

    console.log('Running audit on FAILURE page...');
    const failureReport = await sdk.audit();
    console.log(
      'Failure page audit completed:',
      failureReport ? 'Success' : 'No report',
    );

    // Open the breadcrumb dropdown (MUI Select) — scroll into view so it's clickable
    const breadcrumbSelect = await driver.wait(
      until.elementLocated(By.css('[aria-label="Select variant type"]')),
      10000,
    );

    expect(await breadcrumbSelect.isDisplayed()).toBe(true);
    await scrollIntoView(driver, breadcrumbSelect);

    console.log('Opening breadcrumb dropdown...');
    await breadcrumbSelect.click();
    await driver.sleep(500);

    // Select the "Success" option — scroll into view if needed
    console.log('Selecting SUCCESS option...');
    const successOption = await driver.wait(
      until.elementLocated(By.xpath('//li[@role="option" and text()="Success"]')),
      5000,
    );
    await scrollIntoView(driver, successOption);
    await successOption.click();

    await driver.sleep(1000);

    currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('background-images_success');
    console.log('Successfully navigated to SUCCESS page');

    console.log('Running audit on SUCCESS page...');
    const successReport = await sdk.audit();
    console.log(
      'Success page audit completed:',
      successReport ? 'Success' : 'No report',
    );

    expect(failureReport).toBeDefined();
    expect(successReport).toBeDefined();
  });

  test('should navigate from success back to failure using breadcrumb', async () => {
    await navigateTo(driver, '/graphics/background-images_success');
    await driver.sleep(1000);

    let currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('background-images_success');

    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));

    console.log('Auditing SUCCESS page...');
    const successAudit = await sdk.audit();
    console.log('Success audit:', successAudit ? 'Complete' : 'No report');

    const breadcrumbSelect = await driver.wait(
      until.elementLocated(By.css('[aria-label="Select variant type"]')),
      10000,
    );

    expect(await breadcrumbSelect.isDisplayed()).toBe(true);
    await scrollIntoView(driver, breadcrumbSelect);

    console.log('Opening breadcrumb dropdown...');
    await breadcrumbSelect.click();
    await driver.sleep(500);

    console.log('Selecting FAILURE option...');
    const failureOption = await driver.wait(
      until.elementLocated(By.xpath('//li[@role="option" and text()="Failure"]')),
      5000,
    );
    await scrollIntoView(driver, failureOption);
    await failureOption.click();

    await driver.sleep(1000);

    currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('background-images_failure');
    console.log('Successfully navigated to FAILURE page');

    console.log('Auditing FAILURE page...');
    const failureAudit = await sdk.audit();
    console.log('Failure audit:', failureAudit ? 'Complete' : 'No report');

    expect(successAudit).toBeDefined();
    expect(failureAudit).toBeDefined();
  });

  test('should audit multiple rule pages via breadcrumb navigation', async () => {
    const auditResults = [];

    const rules = [
      { name: 'Background Images', path: '/graphics/background-images' },
      { name: 'Alt Text', path: '/graphics/alt-text' },
      { name: 'Decorative Content', path: '/graphics/decorative-content' },
    ];

    for (const rule of rules) {
      await navigateTo(driver, `${rule.path}_failure`);
      await driver.sleep(800);

      const sdk = new AccessFlowSDK(new SeleniumDriver(driver));

      console.log(`\nAuditing ${rule.name} - FAILURE...`);
      const failureAudit = await sdk.audit();

      try {
        const breadcrumbSelect = await driver.findElement(
          By.css('[aria-label="Select variant type"]'),
        );

        if (await breadcrumbSelect.isDisplayed()) {
          await scrollIntoView(driver, breadcrumbSelect);
          await breadcrumbSelect.click();
          await driver.sleep(300);

          const successOption = await driver.findElement(
            By.xpath('//li[@role="option" and text()="Success"]'),
          );

          if (await successOption.isDisplayed()) {
            await scrollIntoView(driver, successOption);
            await successOption.click();
            await driver.sleep(800);

            console.log(`Auditing ${rule.name} - SUCCESS...`);
            const successAudit = await sdk.audit();

            auditResults.push({
              rule: rule.name,
              failureAudit: !!failureAudit,
              successAudit: !!successAudit,
            });

            console.log(`${rule.name}: Both audits completed`);
          }
        }
      } catch {
        console.log(`Breadcrumb not available for ${rule.name}, skipping`);
      }
    }

    console.log('\nAudit Results Summary:');
    auditResults.forEach((result) => {
      console.log(
        `   ${result.rule}: Failure ${result.failureAudit ? 'pass' : 'fail'}, Success ${result.successAudit ? 'pass' : 'fail'}`,
      );
    });

    expect(auditResults.length).toBeGreaterThan(0);
    expect(auditResults.every((r) => r.failureAudit && r.successAudit)).toBe(
      true,
    );
  });
});
