/**
 * Shared browser session.
 *
 * Both supported sources sit behind a JS bot challenge — Yad2 uses Radware Bot
 * Manager, Homeless uses Cloudflare — and both return a challenge page rather
 * than listings to a plain HTTP client. Verified directly: `curl` against a
 * Yad2 search URL returns HTTP 200 whose body is a Radware loader page, and
 * Homeless returns 403 "Just a moment...". A `fetch()`-based scraper cannot
 * work here; a real browser is required.
 *
 * Two things make the challenge pass reliably:
 *
 *  - A persistent user-data directory, so the clearance cookie issued after the
 *    first solve is reused on later runs.
 *  - A plausible browser fingerprint: real UA, Hebrew locale, Israel timezone,
 *    and no `navigator.webdriver` flag.
 *
 * Expect this to work from a home/residential IP. Datacenter ranges are
 * frequently challenged harder or blocked outright, which is why the intended
 * deployment is local or a home server.
 */

import { chromium, type BrowserContext, type Page } from 'playwright-core';
import { config } from '../config';
import { log } from '../logger';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

let context: BrowserContext | null = null;

export async function getContext(): Promise<BrowserContext> {
  if (context) return context;

  context = await chromium.launchPersistentContext(config.browser.userDataDir, {
    executablePath: config.browser.executablePath,
    headless: config.browser.headless,
    proxy: config.browser.proxy ? { server: config.browser.proxy } : undefined,
    userAgent: USER_AGENT,
    locale: 'he-IL',
    timezoneId: 'Asia/Jerusalem',
    viewport: { width: 1366, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      // Removes the most-checked automation tell.
      '--disable-blink-features=AutomationControlled',
    ],
  });

  context.setDefaultNavigationTimeout(config.browser.navigationTimeoutMs);

  // `navigator.webdriver` is still true even with the flag above; delete it
  // before any page script runs.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  return context;
}

export async function closeBrowser(): Promise<void> {
  if (!context) return;
  await context.close().catch(() => undefined);
  context = null;
}

const sleep = (ms: number): Promise<void> => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Heuristics for "this is a bot wall, not the page I asked for". */
function looksLikeChallenge(html: string, title: string): boolean {
  const t = title.toLowerCase();
  if (t.includes('just a moment') || t.includes('radware') || t.includes('attention required')) return true;
  return /_Incapsula_Resource|__uzdbm_|challenge-platform|cf-browser-verification/.test(html);
}

/**
 * Navigates to `url` and waits for the bot challenge to resolve.
 *
 * The challenge pages self-redirect once their JS finishes, so the strategy is
 * to load, then poll for the challenge markers to disappear rather than trust a
 * fixed sleep.
 */
export async function openPage(url: string, waitForSelector?: string): Promise<Page> {
  const ctx = await getContext();
  const page = await ctx.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const deadline = Date.now() + config.browser.navigationTimeoutMs;
  while (Date.now() < deadline) {
    const [html, title] = await Promise.all([page.content(), page.title()]);
    if (!looksLikeChallenge(html, title)) break;
    log.debug(`bot challenge in progress at ${url}, waiting…`);
    await sleep(2500);
  }

  if (waitForSelector) {
    await page
      .waitForSelector(waitForSelector, { timeout: 20_000 })
      .catch(() => log.warn(`selector ${waitForSelector} never appeared at ${url}`));
  }

  // Listing grids lazy-load below the fold; scroll so images and later cards render.
  await autoScroll(page);
  return page;
}

async function autoScroll(page: Page): Promise<void> {
  await page
    .evaluate<void>(async () => {
      await new Promise<void>((resolve) => {
        let total = 0;
        const step = 600;
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.body.scrollHeight || total > 12000) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    })
    .catch(() => undefined);
}

/** Polite delay between page loads. */
export function throttle(): Promise<void> {
  return sleep(config.browser.throttleMs);
}
