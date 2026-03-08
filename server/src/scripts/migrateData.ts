import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { TestRunSummary } from '../domain/valueObjects/TestRunSummary';
import { databaseService } from '../infrastructure/database/DatabaseService';
import { TestLogRepository } from '../repositories/TestLogRepository';
import { TestResultRepository } from '../repositories/TestResultRepository';
import { TestRunRepository } from '../repositories/TestRunRepository';

/**
 * Migration script to migrate data from JSON files to SQLite database
 */
async function migrateData() {
  console.log('[Migration] Starting data migration from JSON to SQLite...');

  // Connect to database
  await databaseService.connect();

  const testRunRepository = new TestRunRepository();
  const testResultRepository = new TestResultRepository();
  const testLogRepository = new TestLogRepository();

  // Find JSON files in standalone-app/data/runs/
  const dataDir = join(__dirname, '../../../data/runs');

  if (!existsSync(dataDir)) {
    console.log('[Migration] No data directory found, skipping migration');
    return;
  }

  const files = readdirSync(dataDir).filter((f) => f.endsWith('.json'));
  console.log(`[Migration] Found ${files.length} JSON files to migrate`);

  let migrated = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const filePath = join(dataDir, file);
      const data = JSON.parse(readFileSync(filePath, 'utf-8'));

      // Check if already migrated
      const existing = await testRunRepository.findByRunId(data.id);
      if (existing) {
        console.log(`[Migration] Run ${data.id} already exists, skipping`);
        continue;
      }

      // Create test run
      const summary =
        data.summary ?
          typeof data.summary === 'string' ?
            JSON.parse(data.summary)
          : data.summary
        : { failed: 0, passed: 0, skipped: 0, total: 0 };

      const testRun = await testRunRepository.create({
        config: JSON.stringify(data.config),
        duration: data.duration,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        flowId: data.flowId,
        projectId: data.projectId,
        reportPath: data.reportPath,
        runId: data.id,
        startTime: new Date(data.startTime),
        status: data.status || 'completed',
        summary: JSON.stringify(summary),
      });

      // Migrate test results if available
      if (data.results && Array.isArray(data.results)) {
        for (const result of data.results) {
          await testResultRepository.create({
            duration: result.duration,
            endTime: data.endTime ? new Date(data.endTime) : undefined,
            error: result.error,
            file: result.testFile || result.file,
            name: result.testName || result.name,
            qaseId: result.qaseId,
            startTime: new Date(data.startTime),
            status: result.status || 'skipped',
            testRunId: testRun.id,
          });
        }
      }

      migrated++;
      console.log(`[Migration] Migrated run ${data.id}`);
    } catch (error: any) {
      errors++;
      console.error(`[Migration] Error migrating file ${file}:`, error.message);
    }
  }

  console.log(`[Migration] Complete! Migrated ${migrated} runs, ${errors} errors`);

  await databaseService.disconnect();
}

// Run migration if called directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('[Migration] Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('[Migration] Migration failed:', error);
      process.exit(1);
    });
}

export { migrateData };
