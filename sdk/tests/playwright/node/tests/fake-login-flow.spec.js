/**
 * Fake login flow (imauser / miaadmin)
 *
 * Exercises the /login → /login/success protected route using stable DOM ids.
 * SDK coverage is handled separately by sdk-audit-smoke.spec.js in CI.
 */

const { expect, test } = require("@playwright/test");

const IDS = {
  page: "fake-login-page",
  usernameInput: "fake-login-username-input",
  passwordInput: "fake-login-password-input",
  submitButton: "fake-login-submit-button",
  errorMessage: "fake-login-error-message",
  successPage: "fake-login-success-page",
  successHeading: "fake-login-success-heading",
  signOutButton: "fake-login-sign-out-button",
};

const VALID_USERNAME = "imauser";
const VALID_PASSWORD = "miaadmin";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.evaluate(() => sessionStorage.clear());
  await page.goto("/login");
});

test("fake login flow — valid credentials reach protected success page", async ({
  page,
}) => {
  await expect(page.locator(`#${IDS.page}`)).toBeVisible();
  await page.locator(`#${IDS.usernameInput}`).fill(VALID_USERNAME);
  await page.locator(`#${IDS.passwordInput}`).fill(VALID_PASSWORD);
  await page.locator(`#${IDS.submitButton}`).click();

  await expect(page).toHaveURL(/\/login\/success$/);
  await expect(page.locator(`#${IDS.successPage}`)).toBeVisible();
  await expect(page.locator(`#${IDS.successHeading}`)).toHaveText(/login successful/i);
});

test("fake login flow — invalid credentials show error and block success page", async ({
  page,
}) => {
  await page.locator(`#${IDS.usernameInput}`).fill("wrong-user");
  await page.locator(`#${IDS.passwordInput}`).fill("wrong-pass");
  await page.locator(`#${IDS.submitButton}`).click();

  await expect(page.locator(`#${IDS.errorMessage}`)).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator(`#${IDS.successPage}`)).toHaveCount(0);
});

test("fake login flow — success page redirects to login when unauthenticated", async ({
  page,
}) => {
  await page.goto("/login/success");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator(`#${IDS.page}`)).toBeVisible();
});
