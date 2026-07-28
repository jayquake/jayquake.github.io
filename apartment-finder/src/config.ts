import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

function num(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function bool(value: string | undefined, fallback = false): boolean {
  if (value == null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function list(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const config = {
  port: num(process.env.PORT, 8080),
  databaseUrl: process.env.DATABASE_URL ?? 'file:./data/apartments.db',

  /** Cron expression for the morning scan. Default: 07:30 every day. */
  scanCron: process.env.SCAN_CRON ?? '30 7 * * *',
  /** IANA timezone the cron is evaluated in. */
  timezone: process.env.TZ_NAME ?? 'Asia/Jerusalem',
  /** Run a scan as soon as the server boots, useful on first setup. */
  scanOnStartup: bool(process.env.SCAN_ON_STARTUP, false),

  /** Which sources to scan, in order. */
  sources: list(process.env.SOURCES).length ? list(process.env.SOURCES) : ['yad2', 'homeless'],

  browser: {
    /**
     * Path to a Chromium/Chrome binary. Playwright's own download is used when
     * this is unset. In Docker we point it at the system Chromium.
     */
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: bool(process.env.HEADLESS, true),
    /**
     * Persisting the profile matters: Yad2 (Radware) and Homeless (Cloudflare)
     * both hand out a clearance cookie after the first JS challenge. Reusing
     * the profile means later scans skip the challenge instead of re-solving
     * it, which is both faster and much less bot-like.
     */
    userDataDir: process.env.BROWSER_PROFILE_DIR ?? path.resolve(process.cwd(), 'data/browser-profile'),
    /** Milliseconds to wait between page loads, to stay polite. */
    throttleMs: num(process.env.SCRAPE_THROTTLE_MS, 4000),
    navigationTimeoutMs: num(process.env.NAV_TIMEOUT_MS, 60_000),
    /** Max result pages to walk per source per scan. */
    maxPages: num(process.env.MAX_PAGES_PER_SOURCE, 3),
    proxy: process.env.SCRAPE_PROXY || undefined,
  },

  notify: {
    /** "whatsapp" | "telegram" | "console". Comma-separated for several. */
    channels: list(process.env.NOTIFY_CHANNELS).length ? list(process.env.NOTIFY_CHANNELS) : ['console'],

    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
      authToken: process.env.TWILIO_AUTH_TOKEN ?? '',
      /** Sandbox default; replace with your own number once approved. */
      from: process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886',
      to: process.env.TWILIO_WHATSAPP_TO ?? '',
      /**
       * Required only when messaging outside the 24h service window. Leave
       * empty while testing against the sandbox.
       */
      contentSid: process.env.TWILIO_CONTENT_SID || undefined,
    },

    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN ?? '',
      chatId: process.env.TELEGRAM_CHAT_ID ?? '',
    },
  },

  /** Public base URL, used to build deep links inside the alert message. */
  publicBaseUrl: (process.env.PUBLIC_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, ''),

  /** Listings not seen in this many days are marked inactive. */
  staleAfterDays: num(process.env.STALE_AFTER_DAYS, 14),
};

export type Config = typeof config;
