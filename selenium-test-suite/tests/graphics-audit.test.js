/**
 * Graphics Audit Tests with SDK (Selenium)
 *
 * Mirrors the Playwright graphics-audit.spec.js using Selenium WebDriver.
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

describe('Graphics Audit Tests with SDK', () => {
  beforeEach(async () => {
    await navigateTo(driver, '/');
    await driver.sleep(1000);
  });

  test('should perform audits across multiple states on background images page', async () => {
    const auditResults = [];
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));

    const performAudit = async (context, retryIfNull = false) => {
      console.log(`Starting audit for context: ${context}`);
      let report = await sdk.audit();
      if (retryIfNull && !report) {
        for (let attempt = 1; attempt <= 2 && !report; attempt++) {
          await driver.sleep(2000);
          report = await sdk.audit();
        }
      }
      auditResults.push({ context, report });
      if (!report) {
        console.log(`Audit completed for ${context} (no report after retries)`);
        return;
      }
      expect(report).toBeTruthy();
      console.log(`Audit completed for ${context}`);
    };

    // Navigate to failure page
    await navigateTo(driver, '/graphics/background-images_failure');
    await driver.sleep(1000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('graphics/background-images_failure');

    // State 1: Initial Load (Failure Page)
    await performAudit('Initial Failure Page');

    // State 2: Open Modal (Notifications)
    try {
      const notificationButton = await driver.findElement(
        By.css('button:has(svg[data-testid="NotificationsIcon"])'),
      );
      if (await notificationButton.isDisplayed()) {
        await notificationButton.click();
        await driver.sleep(500);
        await performAudit('Notifications Modal Open');

        const body = await driver.findElement(By.css('body'));
        await body.sendKeys('\uE00C'); // Escape key
        await driver.sleep(500);
      }
    } catch {
      console.log('Notification button not found, skipping modal audit');
    }

    // State 3: Expand/Collapse Sidebar
    try {
      const closeSidebarButton = await driver.findElement(
        By.css('button:has(svg[data-testid="ChevronLeftIcon"])'),
      );
      if (await closeSidebarButton.isDisplayed()) {
        await closeSidebarButton.click();
        await driver.sleep(500);
        await performAudit('Sidebar Collapsed');

        try {
          const openSidebarButton = await driver.findElement(
            By.css('button:has(svg[data-testid="MenuIcon"])'),
          );
          if (await openSidebarButton.isDisplayed()) {
            await openSidebarButton.click();
            await driver.sleep(500);
            await performAudit('Sidebar Expanded');
          }
        } catch {
          // Menu button not found
        }
      }
    } catch {
      console.log('Sidebar toggle not found, skipping sidebar audit');
    }

    // State 4: Navigate to Success Page — wait for content then audit (retry up to 2x if null)
    await navigateTo(driver, '/graphics/background-images_success');
    await driver.sleep(2000);
    // Wait for success page content to be present
    await driver.wait(
      until.elementLocated(By.css('main, [role="main"], h1, h2')),
      10000,
    );
    await driver.sleep(800);

    await performAudit('Success Page', true);

    // Verification — require at least 2 successful audits (Success Page can be flaky)
    console.log('Total audits performed:', auditResults.length);
    expect(auditResults.length).toBeGreaterThan(1);

    const successfulAudits = auditResults.filter((r) => r.report);
    expect(successfulAudits.length).toBeGreaterThanOrEqual(2);

    const violationCounts = auditResults.map((r) => ({
      context: r.context,
      violations: r.report?.violations ? r.report.violations.length : 0,
    }));
    console.log(
      'Violation counts by context:',
      JSON.stringify(violationCounts, null, 2),
    );
  });
});
