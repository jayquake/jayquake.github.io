import { type Request, type Response } from 'express';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, resolve } from 'path';

import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { TestArtifactRepository } from '../../repositories/TestArtifactRepository';

/**
 * Scans the HTML report data/ directory and builds a map of file size → URL path.
 * Used to resolve stale `test-results/` artifact paths to their persistent copies
 * in the HTML report output directory.
 */
function buildReportDataIndex(runId: string): Map<number, string> {
  const index = new Map<number, string>();
  // Navigate from backend/dist/api/controllers → project root
  const projectRoot = resolve(join(__dirname, '../../../../../'));
  const dataDir = join(projectRoot, 'reports', 'html', runId, 'data');
  if (!existsSync(dataDir)) return index;
  try {
    for (const filename of readdirSync(dataDir)) {
      const filePath = join(dataDir, filename);
      const stat = statSync(filePath);
      // Map size → relative URL path (first match wins for each size)
      if (!index.has(stat.size)) {
        index.set(stat.size, `/api/reports/${runId}/data/${filename}`);
      }
    }
  } catch {
    // Silently ignore read errors; caller handles missing resolvedUrl
  }
  return index;
}

/**
 * Detect whether a log artifact is a page snapshot (accessibility tree YAML)
 * based on its filename.
 */
function isPageSnapshotArtifact(filename: string): boolean {
  return filename === 'error-context.md' || filename.endsWith('-snapshot.md');
}

/**
 * Read the content of a page snapshot artifact from disk.
 * Falls back to the HTML report data/ directory if the original path is stale.
 */
function readPageSnapshotContent(artifactPath: string, resolvedUrl: string | null, runId: string): string | null {
  // Try original path first
  const projectRoot = resolve(join(__dirname, '../../../../../'));
  const fullOrigPath = join(projectRoot, artifactPath);
  if (existsSync(fullOrigPath)) {
    try {
      return readFileSync(fullOrigPath, 'utf-8');
    } catch { /* fall through */ }
  }

  // Try to read from the resolved report data file
  if (resolvedUrl) {
    // resolvedUrl is like /api/reports/:runId/data/:hash.md
    const parts = resolvedUrl.split('/');
    const filename = parts[parts.length - 1];
    const dataPath = join(projectRoot, 'reports', 'html', runId, 'data', filename);
    if (existsSync(dataPath)) {
      try {
        return readFileSync(dataPath, 'utf-8');
      } catch { /* fall through */ }
    }
  }

  return null;
}

/**
 * ArtifactsController - API endpoints for test artifacts
 */
export class ArtifactsController {
  /**
   * GET /api/artifacts/run/:runId
   * Get all artifacts for a test run
   */
  static async getRunArtifacts(req: Request, res: Response) {
    try {
      const { runId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();
      const artifactRepository = new TestArtifactRepository(prisma);

      // Get TestRun to get the database ID
      const { TestRunRepository } = await import('../../repositories/TestRunRepository');
      const testRunRepository = new TestRunRepository(prisma);
      const run = await testRunRepository.findByRunId(runId);

      if (!run) {
        return res.status(404).json({
          error: 'Test run not found',
          success: false,
        });
      }

      // Get all artifacts for this run
      const artifacts = await artifactRepository.findByTestRun(run.id);

      // Group artifacts by type
      const groupedArtifacts = {
        logs: artifacts.filter((a) => a.type === 'log'),
        screenshots: artifacts.filter((a) => a.type === 'screenshot'),
        traces: artifacts.filter((a) => a.type === 'trace'),
        videos: artifacts.filter((a) => a.type === 'video'),
      };

      res.json({
        artifacts: groupedArtifacts,
        stats: {
          logs: groupedArtifacts.logs.length,
          screenshots: groupedArtifacts.screenshots.length,
          traces: groupedArtifacts.traces.length,
          videos: groupedArtifacts.videos.length,
        },
        success: true,
        total: artifacts.length,
      });
    } catch (error: any) {
      console.error('[ArtifactsController] Error getting run artifacts:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/artifacts/stats/:runId
   * Get artifact statistics for a test run
   */
  static async getRunArtifactStats(req: Request, res: Response) {
    try {
      const { runId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();
      const artifactRepository = new TestArtifactRepository(prisma);

      // Get TestRun to get the database ID
      const { TestRunRepository } = await import('../../repositories/TestRunRepository');
      const testRunRepository = new TestRunRepository(prisma);
      const run = await testRunRepository.findByRunId(runId);

      if (!run) {
        return res.status(404).json({
          error: 'Test run not found',
          success: false,
        });
      }

      const stats = await artifactRepository.getStatsForRun(run.id);

      res.json({
        stats,
        success: true,
      });
    } catch (error: any) {
      console.error('[ArtifactsController] Error getting artifact stats:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/artifacts/result/:resultId
   * Get all artifacts for a specific test result.
   * Each artifact is enriched with a `resolvedUrl` that points to the persistent
   * HTML report data/ copy (matched by file size) rather than the potentially stale
   * test-results/ path. Log artifacts that are page snapshots also include
   * `pageSnapshotContent` (the raw YAML accessibility tree text).
   */
  static async getTestResultArtifacts(req: Request, res: Response) {
    try {
      const { resultId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();
      const artifactRepository = new TestArtifactRepository(prisma);

      const artifacts = await artifactRepository.findByTestResult(resultId);

      // Resolve the string runId from the first artifact's testRunId
      let stringRunId: null | string = null;
      if (artifacts.length > 0) {
        const testRun = await prisma.testRun.findUnique({
          select: { runId: true },
          where: { id: artifacts[0].testRunId },
        });
        stringRunId = testRun?.runId ?? null;
      }

      // Build size → URL index for persistent report data files
      const reportDataIndex = stringRunId ? buildReportDataIndex(stringRunId) : new Map<number, string>();

      // Enrich each artifact with resolvedUrl (and pageSnapshotContent for snapshots)
      const enriched = artifacts.map((a) => {
        const resolvedUrl = a.size != null ? (reportDataIndex.get(a.size) ?? null) : null;
        let pageSnapshotContent: null | string = null;

        if (a.type === 'log' && isPageSnapshotArtifact(a.filename) && stringRunId) {
          pageSnapshotContent = readPageSnapshotContent(a.path, resolvedUrl, stringRunId);
        }

        return { ...a, pageSnapshotContent, resolvedUrl };
      });

      // Group artifacts by type
      const groupedArtifacts = {
        logs: enriched.filter((a) => a.type === 'log'),
        screenshots: enriched.filter((a) => a.type === 'screenshot'),
        traces: enriched.filter((a) => a.type === 'trace'),
        videos: enriched.filter((a) => a.type === 'video'),
      };

      res.json({
        artifacts: groupedArtifacts,
        success: true,
        total: artifacts.length,
      });
    } catch (error: any) {
      console.error('[ArtifactsController] Error getting test result artifacts:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }

  /**
   * GET /api/artifacts/file/:artifactId
   * Stream/serve an artifact file
   */
  static async serveArtifactFile(req: Request, res: Response) {
    try {
      const { artifactId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();
      const artifactRepository = new TestArtifactRepository(prisma);

      // Get artifact from DB
      const artifact = await artifactRepository.findById(artifactId);

      if (!artifact) {
        return res.status(404).json({
          error: 'Artifact not found',
          success: false,
        });
      }

      // Update last accessed timestamp
      await artifactRepository.updateLastAccessed(artifactId);

      // Get full file path — try original path first, then fall back to report data/
      const testE2eDir = join(__dirname, '../../../../../');
      let fullPath = join(testE2eDir, artifact.path);

      if (!existsSync(fullPath) && artifact.size != null) {
        // Original path is stale — try to find a size-matched file in the report data/ dir
        const testRun = await prisma.testRun.findUnique({
          select: { runId: true },
          where: { id: artifact.testRunId },
        }).catch(() => null);
        const runId = testRun?.runId;
        if (runId) {
          const dataDir = join(testE2eDir, 'reports', 'html', runId, 'data');
          if (existsSync(dataDir)) {
            const ext = extname(artifact.filename);
            for (const f of readdirSync(dataDir)) {
              const candidate = join(dataDir, f);
              if (statSync(candidate).size === artifact.size && (!ext || f.endsWith(ext))) {
                fullPath = candidate;
                break;
              }
            }
          }
        }
      }

      if (!existsSync(fullPath)) {
        return res.status(404).json({
          error: 'Artifact file not found on disk',
          path: artifact.path,
          success: false,
        });
      }

      // Set appropriate content type
      if (artifact.contentType) {
        res.setHeader('Content-Type', artifact.contentType);
      }

      // Set filename for download
      res.setHeader('Content-Disposition', `inline; filename="${artifact.filename}"`);

      // Stream the file
      res.sendFile(fullPath);
    } catch (error: any) {
      console.error('[ArtifactsController] Error serving artifact file:', error);
      res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  }
}
