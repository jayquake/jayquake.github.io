#!/usr/bin/env node
/**
 * Command line entry point, for running a scan from cron or by hand without
 * the HTTP server.
 *
 *   npm run scan            — full scan, sends notifications
 *   npm run scan:dry        — scrape and score, print the digest, send nothing
 *   npm run notify:test     — send a sample message to verify credentials
 */

import { runScan } from './pipeline/run';
import { buildNotifiers } from './notify';
import { formatDigest } from './notify/format';
import { prisma } from './db';
import { log } from './logger';
import { config } from './config';
import type { PendingAlert } from './pipeline/ingest';

const SAMPLE_ALERTS: PendingAlert[] = [
  {
    kind: 'NEW',
    listingId: 'sample-1',
    listing: {
      id: 'sample-1',
      title: 'דירת 3 חדרים משופצת',
      url: 'https://www.yad2.co.il/item/example',
      source: 'yad2',
      priceIls: 6400,
      rooms: 3,
      sizeSqm: 72,
      floor: 2,
      city: 'תל אביב יפו',
      neighborhood: 'פלורנטין',
      score: 82,
      scoreReasons: ['at or under ideal budget (₪6,400)', 'favorite area: פלורנטין'],
      imageUrls: [],
    },
  },
  {
    kind: 'PRICE_DROP',
    listingId: 'sample-2',
    oldPrice: 7800,
    newPrice: 7100,
    listing: {
      id: 'sample-2',
      title: 'דירת 3.5 חדרים עם מרפסת',
      url: 'https://www.yad2.co.il/item/example2',
      source: 'homeless',
      priceIls: 7100,
      rooms: 3.5,
      sizeSqm: 85,
      floor: 4,
      city: 'רמת גן',
      neighborhood: null,
      score: 74,
      scoreReasons: ['spacious (85m²)', 'mentions מרפסת, מעלית'],
      imageUrls: [],
    },
  },
];

async function main(): Promise<void> {
  const [command, ...flags] = process.argv.slice(2);
  const dryRun = flags.includes('--dry-run');

  switch (command) {
    case 'scan': {
      const summary = await runScan({ dryRun });
      log.info('scan complete', summary);
      // A scan that produced nothing but errors is a failure worth a non-zero
      // exit code, so a cron wrapper can notice.
      process.exitCode = summary.ok ? 0 : 1;
      break;
    }

    case 'notify-test': {
      const message = formatDigest(SAMPLE_ALERTS, { appUrl: config.publicBaseUrl });
      if (!message) {
        log.error('nothing to send');
        break;
      }
      const notifiers = buildNotifiers();
      for (const notifier of notifiers) {
        try {
          await notifier.send(message);
          log.info(`✓ ${notifier.channel} delivered`);
        } catch (err) {
          log.error(`✗ ${notifier.channel} failed`, err instanceof Error ? err.message : err);
          process.exitCode = 1;
        }
      }
      break;
    }

    default:
      console.log('usage: cli.ts <scan|notify-test> [--dry-run]');
      process.exitCode = 1;
  }

  await prisma.$disconnect().catch(() => undefined);
}

void main().catch((err) => {
  log.error('cli failed', err);
  process.exit(1);
});
