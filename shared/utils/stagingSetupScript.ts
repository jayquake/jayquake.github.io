/**
 * Staging Setup Script Generator
 *
 * Generates a Playwright script string for the MCP `browser_run_code` tool
 * that automates the staging-setup login flow. This replicates the same
 * authentication flow used by test fixtures (prefillSetup / trialSetup).
 *
 * **CRITICAL**: The `stagingSetupUrl` parameter MUST be a clean URL without
 * embedded credentials. Embedding HTTP Basic Auth credentials in the URL
 * (e.g., `https://test:acsb123@domain.com`) causes `TRPCClientError:
 * Request cannot be constructed from a URL that includes credentials`
 * because the browser sends those credentials with every subsequent fetch().
 *
 * The two-phase HTTP auth approach is handled BEFORE this script runs:
 *   Phase 1: Navigate WITH credentials (caches browser auth)
 *   Phase 2: Navigate to CLEAN URL (this is what stagingSetupUrl should be)
 *
 * Locators mirror those in:
 *   - apps/accessFlow/components/forms/stagingSetupForm.ts
 *   - apps/accessFlow/components/pages/stagingSetupPage.ts
 *
 * @see MCPService.authenticateViaStagingSetup — orchestrates the two-phase flow
 */

export interface StagingSetupParams {
  domain: string;
  email: string;
  /** Which fixture produced these params (for debugging) */
  fixture?: string;
  pageCount: number;
  plan: string;
}

/**
 * Default params for Navigate-to-Failure authentication.
 *
 * Uses a MOCK domain (not a real website) to avoid external dependencies
 * during the staging-setup flow. The staging environment generates a test
 * license for whatever domain is provided.
 */
export const PREFILLED_SETUP_PARAMS: StagingSetupParams = {
  domain: 'test-mock-domain-e2e.com',
  email: 'jasonqu@accessibe.com',
  fixture: 'prefillSetup',
  pageCount: 5,
  plan: 'standard',
};

/**
 * Generate a Playwright script that automates the staging-setup login flow.
 * The returned string is intended to be passed to the MCP `browser_run_code` tool.
 *
 * The script:
 *   1. Ensures we're on /staging-setup (navigates there if redirected)
 *   2. Retries up to 3x with page reload if the email input is not visible
 *      (mirrors the retry logic from utils/fixtures.ts prefillSetup/trialSetup)
 *   3. Fills the email, domain, and page count fields
 *   4. Selects the plan from the dropdown
 *   5. Clicks "Upsert Domain and User"
 *   6. Waits for the Login link to appear, then clicks it
 *   7. Waits for redirect to /dashboard (authenticated)
 *   8. Dismisses the Flow Intro modal if it appears (for trialSetup fixture)
 *
 * @param params - Form field values
 * @param stagingSetupUrl - CLEAN URL to /staging-setup (NO embedded credentials!)
 */
export function generateStagingSetupScript(
  params: StagingSetupParams,
  stagingSetupUrl: string,
): string {
  // Safety check: strip any embedded credentials from the URL
  let cleanUrl = stagingSetupUrl;
  try {
    const parsed = new URL(stagingSetupUrl);
    if (parsed.username || parsed.password) {
      console.warn('[generateStagingSetupScript] WARNING: stagingSetupUrl has embedded credentials — stripping them');
      parsed.username = '';
      parsed.password = '';
      cleanUrl = parsed.toString();
    }
  } catch {
    // URL parsing failed, use as-is
  }

  const email = JSON.stringify(params.email);
  const domain = JSON.stringify(params.domain);
  const pageCount = JSON.stringify(String(params.pageCount));
  const plan = JSON.stringify(params.plan);
  const setupUrl = JSON.stringify(cleanUrl);
  const fixture = JSON.stringify(params.fixture ?? 'unknown');

  return `async (page) => {
  const log = [];
  const step = (msg) => { log.push('[' + new Date().toISOString().split('T')[1] + '] ' + msg); };
  try {
    step('Current URL: ' + page.url());
    step('Fixture: ' + ${fixture});

    // If the page was redirected away from staging-setup (e.g. stale session
    // cookie auto-redirects to /dashboard), navigate back explicitly.
    if (!page.url().includes('/staging-setup')) {
      step('Redirected away — navigating back to staging-setup');
      await page.goto(${setupUrl}, { waitUntil: 'domcontentloaded' });
      step('Navigated to staging-setup, new URL: ' + page.url());
    }

    await page.waitForLoadState('domcontentloaded');
    step('DOM content loaded');

    // Wait for the staging setup form heading to be visible before interacting
    const heading = page.getByRole('heading', { name: 'Staging Setup' });
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    step('Heading "Staging Setup" visible');

    // Retry logic for email input — mirrors utils/fixtures.ts prefillSetup/trialSetup.
    // The input may not appear immediately due to client-side hydration.
    const maxAttempts = 3;
    let emailInputReady = false;
    const emailInput = page.getByLabel('User Email');
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await emailInput.waitFor({ state: 'visible', timeout: 5000 });
        emailInputReady = true;
        step('Email input visible (attempt ' + attempt + ')');
        break;
      } catch {
        step('Email input not visible — reloading page (attempt ' + attempt + '/' + maxAttempts + ')');
        await page.reload({ timeout: 5000 }).catch(() => {});
        await page.waitForLoadState('domcontentloaded').catch(() => {});
        if (attempt === maxAttempts) {
          throw new Error('Email input not visible after ' + maxAttempts + ' reload attempts');
        }
      }
    }

    // Fill staging setup form (mirrors stagingSetupForm.ts locators)
    await emailInput.fill(${email});
    step('Filled email: ' + ${email});

    await page.getByLabel('Domain').fill(${domain});
    step('Filled domain: ' + ${domain});

    await page.getByLabel('Page Count').fill(${pageCount});
    step('Filled page count: ' + ${pageCount});

    // Select plan (mirrors stagingSetupForm.selectPlan)
    step('Clicking default "standard" text to open plan dropdown');
    await page.getByText('standard').click();
    step('Dropdown opened — looking for plan button: ' + ${plan});

    const option = page.locator(\`button:has-text(${plan})\`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    step('Plan selected: ' + ${plan});

    // Submit form (mirrors stagingSetupForm.submitForm)
    step('Clicking "Upsert Domain and User" button');
    await page.getByRole('button', { name: 'Upsert Domain and User' }).click();
    step('Form submitted — waiting for Login link');

    // Wait for login link and click it (mirrors stagingSetupForm.submitForm)
    const loginLink = page.getByRole('link', { name: 'Login' });
    await loginLink.waitFor({ state: 'visible', timeout: 15000 });
    step('Login link visible — clicking');
    await loginLink.click();

    // Wait for redirect to dashboard (authenticated session established)
    step('Waiting for /dashboard redirect');
    await page.waitForURL(/\\/dashboard/, { timeout: 15000 });
    step('Reached dashboard — authenticated!');

    // Dismiss Flow Intro modal if it appears (for trialSetup fixture).
    // The modal appears on first login for new trial accounts.
    try {
      const modalCloseButton = page.locator('[data-testid="flow-intro-close"], button[aria-label="Close"]').first();
      const modalVisible = await modalCloseButton.isVisible().catch(() => false);
      if (modalVisible) {
        await modalCloseButton.click();
        step('Flow Intro modal dismissed');
      } else {
        step('No Flow Intro modal detected — skipping');
      }
    } catch {
      step('Flow Intro modal check skipped (element not found)');
    }

    return 'authenticated | steps: ' + log.join(' >> ');
  } catch (err) {
    step('ERROR: ' + (err.message || String(err)));
    return 'error: ' + (err.message || String(err)) + ' | url=' + page.url() + ' | steps: ' + log.join(' >> ');
  }
}`;
}
