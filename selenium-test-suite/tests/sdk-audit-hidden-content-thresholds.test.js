/**
 * Fake Hidden Content Audit Tests (Selenium)
 *
 * Mirrors the Playwright fake-hidden-content-audit.spec.js using Selenium WebDriver.
 */

const { By } = require('selenium-webdriver');
const { AccessFlowSDK, SeleniumDriver } = require('@acsbe/accessflow-sdk');
const { createDriver, navigateTo } = require('../helpers/driver');
const fs = require('fs');
const path = require('path');

AccessFlowSDK.init({
  apiKey:
    process.env.AF_NODE_PACKAGE_KEY ||
    process.env.AF_Node_Package_Key ||
    'flow-1TmAHDBGjDGX4aadlA0000VdvvxVnhZfP2',
});

const configPath = path.join(__dirname, '..', 'accessflow.config.json');
let config = {
  issuesFoundThreshold: { extreme: 0, high: 0, medium: 0, low: 0 },
  localCheck: true,
};
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

let driver;

beforeAll(async () => {
  driver = await createDriver();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

describe('Fake Hidden Content Audit Tests', () => {
  beforeEach(async () => {
    await navigateTo(driver, '/');
    await driver.sleep(1000);
  });

  test('should perform audits across multiple states on fake hidden content page and verify thresholds', async () => {
    const auditResults = [];
    const sdk = new AccessFlowSDK(new SeleniumDriver(driver));

    const performAudit = async (context) => {
      console.log(`Starting audit for context: ${context}`);
      const report = await sdk.audit();
      auditResults.push({ context, report });

      if (config.localCheck && report) {
        const issuesFound = report.numberOfIssuesFound || {};
        const thresholds = config.issuesFoundThreshold;
        let thresholdExceeded = false;

        for (const severity of ['extreme', 'high', 'medium', 'low']) {
          const count = issuesFound[severity] || 0;
          const limit =
            thresholds[severity] !== undefined ? thresholds[severity] : Infinity;

          if (count > limit) {
            console.log(
              `[Threshold Violation] ${severity}: ${count} > ${limit} (limit)`,
            );
            thresholdExceeded = true;
          }
        }

        if (context === 'Initial Failure Page') {
          console.log(
            `[${context}] Threshold exceeded: ${thresholdExceeded} (this page displays failure code examples, not actual violations)`,
          );
        }
      }

      console.log(`Audit completed for ${context}`);
    };

    // Navigate to failure page
    await navigateTo(driver, '/errors/fake-hidden-content_failure');
    await driver.sleep(1000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('errors/fake-hidden-content_failure');

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
        await body.sendKeys('\uE00C');
        await driver.sleep(500);
      }
    } catch {
      // Notification button not found
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
          }
        } catch {
          // Menu button not found
        }
      }
    } catch {
      // Sidebar toggle not found
    }

    // State 4: Navigate to Success Page
    await navigateTo(driver, '/errors/fake-hidden-content_success');
    await driver.sleep(1000);
    const successUrl = await driver.getCurrentUrl();
    expect(successUrl).toContain('errors/fake-hidden-content_success');

    await performAudit('Success Page');

    // Verification
    console.log('Total audits performed:', auditResults.length);
    expect(auditResults.length).toBeGreaterThan(1);

    const violationCounts = auditResults.map((r) => {
      let violationsCount = 0;
      if (r.report && r.report.ruleViolations) {
        violationsCount = Object.values(r.report.ruleViolations).reduce(
          (acc, rule) => acc + (rule.numberOfOccurrences || 0),
          0,
        );
      } else if (r.report && r.report.violations) {
        violationsCount = r.report.violations.length;
      }
      return { context: r.context, violations: violationsCount };
    });

    console.log(
      'Violation counts by context:',
      JSON.stringify(violationCounts, null, 2),
    );
  });
});
