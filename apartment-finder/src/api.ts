import { Router } from 'express';
import { prisma, loadCriteria, saveCriteria } from './db';
import { runScan } from './pipeline/run';
import { parseManualPost } from './sources/manual';
import { ingest } from './pipeline/ingest';
import { config } from './config';
import { log } from './logger';
import { DEFAULT_CRITERIA, type SearchCriteria, type UserActionStatus } from './types';

export const api = Router();

/** Guards against two scans running at once and fighting over the browser profile. */
let scanInFlight: Promise<unknown> | null = null;

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function serializeListing(row: Record<string, any>) {
  return {
    id: row.id,
    source: row.source,
    url: row.url,
    title: row.title,
    description: row.description,
    priceIls: row.priceIls,
    rooms: row.rooms,
    sizeSqm: row.sizeSqm,
    floor: row.floor,
    totalFloors: row.totalFloors,
    city: row.city,
    neighborhood: row.neighborhood,
    street: row.street,
    lat: row.lat,
    lng: row.lng,
    amenities: {
      elevator: row.hasElevator,
      parking: row.hasParking,
      balcony: row.hasBalcony,
      safeRoom: row.hasSafeRoom,
      furnished: row.isFurnished,
      pets: row.petsAllowed,
    },
    imageUrls: parseJsonArray(row.imageUrls),
    contact: row.contact,
    postedAt: row.postedAt,
    firstSeenAt: row.firstSeenAt,
    lastSeenAt: row.lastSeenAt,
    isActive: row.isActive,
    score: row.score,
    scoreReasons: parseJsonArray(row.scoreReasons),
    status: row.action?.status ?? null,
    notes: row.action?.notes ?? null,
    priceHistory: (row.priceHistory ?? []).map((p: any) => ({ priceIls: p.priceIls, seenAt: p.seenAt })),
  };
}

/** GET /api/listings — the main feed, filtered and sorted for the UI. */
api.get('/listings', async (req, res) => {
  const {
    status,
    source,
    minScore,
    maxPrice,
    minRooms,
    q,
    sort = 'score',
    includeHidden = 'false',
    includeInactive = 'false',
    limit = '100',
    offset = '0',
  } = req.query as Record<string, string>;

  const where: Record<string, unknown> = {};
  if (includeInactive !== 'true') where.isActive = true;
  if (source) where.source = source;
  if (minScore) where.score = { gte: Number(minScore) };
  if (maxPrice) where.priceIls = { lte: Number(maxPrice) };
  if (minRooms) where.rooms = { gte: Number(minRooms) };
  if (q) {
    where.OR = [{ title: { contains: q } }, { description: { contains: q } }, { neighborhood: { contains: q } }];
  }

  if (status) where.action = { status };
  else if (includeHidden !== 'true') {
    // Hidden listings stay out of the default feed but remain queryable.
    where.NOT = { action: { status: 'HIDDEN' } };
  }

  const orderBy =
    sort === 'price' ? { priceIls: 'asc' as const }
    : sort === 'newest' ? { firstSeenAt: 'desc' as const }
    : sort === 'size' ? { sizeSqm: 'desc' as const }
    : { score: 'desc' as const };

  try {
    const [rows, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        orderBy,
        take: Math.min(Number(limit) || 100, 500),
        skip: Number(offset) || 0,
        include: {
          action: true,
          priceHistory: { orderBy: { seenAt: 'asc' }, take: 30 },
        },
      }),
      prisma.listing.count({ where }),
    ]);

    res.json({ total, listings: rows.map(serializeListing) });
  } catch (err) {
    log.error('GET /listings failed', err);
    res.status(500).json({ error: 'failed to load listings' });
  }
});

api.get('/listings/:id', async (req, res) => {
  const row = await prisma.listing.findUnique({
    where: { id: req.params.id },
    include: { action: true, priceHistory: { orderBy: { seenAt: 'asc' } }, alerts: true },
  });
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(serializeListing(row));
});

/** POST /api/listings/:id/action — save, hide or mark contacted. */
api.post('/listings/:id/action', async (req, res) => {
  const { status, notes } = req.body as { status?: UserActionStatus; notes?: string };
  const valid: UserActionStatus[] = ['SAVED', 'HIDDEN', 'CONTACTED'];

  if (status != null && !valid.includes(status)) {
    return res.status(400).json({ error: `status must be one of ${valid.join(', ')}` });
  }

  const exists = await prisma.listing.findUnique({ where: { id: req.params.id } });
  if (!exists) return res.status(404).json({ error: 'not found' });

  // No status clears the action entirely, which is how "un-hide" works.
  if (!status) {
    await prisma.userAction.deleteMany({ where: { listingId: req.params.id } });
    return res.json({ ok: true, status: null });
  }

  const action = await prisma.userAction.upsert({
    where: { listingId: req.params.id },
    create: { listingId: req.params.id, status, notes: notes ?? null },
    update: { status, notes: notes ?? null },
  });

  res.json({ ok: true, status: action.status, notes: action.notes });
});

/** GET/PUT /api/criteria — edit the search from the phone. */
api.get('/criteria', async (_req, res) => {
  res.json({ criteria: await loadCriteria(), defaults: DEFAULT_CRITERIA });
});

api.put('/criteria', async (req, res) => {
  const incoming = req.body as Partial<SearchCriteria>;
  const current = await loadCriteria();

  const merged: SearchCriteria = {
    ...current,
    ...incoming,
    preferences: { ...current.preferences, ...(incoming.preferences ?? {}) },
  };

  // Guard the few fields where a bad value would either silence the alerts
  // entirely or turn them into a firehose.
  merged.minScoreToAlert = Math.max(0, Math.min(100, Number(merged.minScoreToAlert) || 0));
  merged.minPriceDropPercent = Math.max(0, Math.min(100, Number(merged.minPriceDropPercent) || 0));
  merged.maxAlertsPerRun = Math.max(1, Math.min(50, Number(merged.maxAlertsPerRun) || 10));
  merged.cities = (merged.cities ?? []).map(String).filter(Boolean);
  merged.neighborhoods = (merged.neighborhoods ?? []).map(String).filter(Boolean);
  merged.excludeKeywords = (merged.excludeKeywords ?? []).map(String).filter(Boolean);

  await saveCriteria(merged);
  res.json({ ok: true, criteria: merged });
});

/** POST /api/scan — trigger a scan by hand. */
api.post('/scan', async (req, res) => {
  if (scanInFlight) return res.status(409).json({ error: 'a scan is already running' });

  const dryRun = req.body?.dryRun === true;
  const promise = runScan({ dryRun }).finally(() => {
    scanInFlight = null;
  });
  scanInFlight = promise;

  // Scraping takes minutes, so return immediately and let the UI poll /status.
  if (req.body?.wait !== true) return res.status(202).json({ ok: true, started: true });

  try {
    res.json({ ok: true, summary: await promise });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

/**
 * POST /api/ingest/manual — paste a Facebook-group post (or any free text) and
 * have it tracked like a scraped listing.
 */
api.post('/ingest/manual', async (req, res) => {
  const { text, url } = req.body as { text?: string; url?: string };
  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: 'text is required and must be at least 20 characters' });
  }

  const parsed = parseManualPost(text, url);
  if (!parsed) return res.status(400).json({ error: 'could not parse a listing out of that text' });

  const criteria = await loadCriteria();
  const result = await ingest(prisma, [parsed], criteria);

  res.json({
    ok: true,
    parsed,
    created: result.created,
    updated: result.updated,
    rejected: result.rejected,
    // Explaining the rejection is the difference between "it silently vanished"
    // and "ah, it's over my budget".
    note: result.rejected > 0 ? 'parsed, but it does not match your current criteria' : undefined,
  });
});

/** GET /api/status — last scan, counts, whether a scan is running now. */
api.get('/status', async (_req, res) => {
  const [lastRun, activeCount, savedCount, alertCount] = await Promise.all([
    prisma.scanRun.findFirst({ orderBy: { startedAt: 'desc' } }),
    prisma.listing.count({ where: { isActive: true } }),
    prisma.userAction.count({ where: { status: 'SAVED' } }),
    prisma.alert.count(),
  ]);

  res.json({
    scanning: scanInFlight !== null,
    schedule: { cron: config.scanCron, timezone: config.timezone },
    channels: config.notify.channels,
    sources: config.sources,
    counts: { active: activeCount, saved: savedCount, alertsSent: alertCount },
    lastRun: lastRun
      ? {
          startedAt: lastRun.startedAt,
          finishedAt: lastRun.finishedAt,
          ok: lastRun.ok,
          seen: lastRun.seenCount,
          new: lastRun.newCount,
          drops: lastRun.dropCount,
          errors: parseJsonArray(lastRun.errors),
          sourceStats: lastRun.sourceStats ? JSON.parse(lastRun.sourceStats) : {},
        }
      : null,
  });
});
