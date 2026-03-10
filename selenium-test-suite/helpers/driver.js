const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function createDriver() {
  const options = new chrome.Options();

  if (process.env.CI === 'true' || process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }

  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1280,720',
  );

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 30000 });

  return driver;
}

async function navigateTo(driver, path) {
  const url = `${BASE_URL}${path}`;
  await driver.get(url);
  await driver.sleep(1000);
}

async function waitForPageLoad(driver, timeoutMs = 10000) {
  const { until } = require('selenium-webdriver');
  await driver.wait(
    until.elementLocated({ css: 'body' }),
    timeoutMs,
  );
  await driver.sleep(500);
}

/** Scroll element into view so it can be clicked (avoids ElementClickInterceptedError) */
async function scrollIntoView(driver, element) {
  await driver.executeScript(
    'arguments[0].scrollIntoView({ block: "center", behavior: "instant" });',
    element,
  );
  await driver.sleep(300);
}

module.exports = { createDriver, navigateTo, waitForPageLoad, scrollIntoView, BASE_URL };
