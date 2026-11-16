/**
 * UI smoke — no AccessFlow SDK (stable for CI when API keys rotate).
 */

const { By, until } = require("selenium-webdriver");
const { createDriver, navigateTo } = require("../helpers/driver");

let driver;

beforeAll(async () => {
  driver = await createDriver();
});

afterAll(async () => {
  if (driver) await driver.quit();
});

describe("Engine library UI smoke", () => {
  test("home shows library search field", async () => {
    await navigateTo(driver, "/");
    await driver.sleep(500);

    const search = await driver.wait(
      until.elementLocated(By.css('input[aria-label="Search rules"]')),
      15000
    );
    expect(await search.isDisplayed()).toBe(true);
  });

  test("rule page renders description toggle link", async () => {
    await navigateTo(driver, "/engine/alt-misuse?detail=open");
    await driver.sleep(800);

    const bodyText = await driver.findElement(By.css("body")).getText();
    expect(bodyText.toLowerCase()).toMatch(/rule description|hide description|show description/);
  });
});