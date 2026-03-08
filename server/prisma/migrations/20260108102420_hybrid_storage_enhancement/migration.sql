-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN "browserName" TEXT;
ALTER TABLE "TestResult" ADD COLUMN "playwrightData" TEXT;
ALTER TABLE "TestResult" ADD COLUMN "projectName" TEXT;
ALTER TABLE "TestResult" ADD COLUMN "retryCount" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "TestArtifact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testRunId" TEXT NOT NULL,
    "testResultId" TEXT,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER,
    "metadata" TEXT,
    "lastAccessed" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "retentionPolicy" TEXT,
    "markedForDeletion" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TestArtifact_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TestArtifact_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "projectId" TEXT,
    "flowId" TEXT,
    "status" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "duration" INTEGER,
    "reportPath" TEXT,
    "config" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "htmlGenerated" BOOLEAN NOT NULL DEFAULT false,
    "htmlGeneratedAt" DATETIME,
    "testCount" INTEGER DEFAULT 0,
    "passedCount" INTEGER DEFAULT 0,
    "failedCount" INTEGER DEFAULT 0,
    "skippedCount" INTEGER DEFAULT 0,
    "totalArtifacts" INTEGER DEFAULT 0,
    "totalArtifactSize" INTEGER DEFAULT 0,
    "artifactRetentionUntil" DATETIME
);
INSERT INTO "new_TestRun" ("config", "createdAt", "duration", "endTime", "flowId", "id", "projectId", "reportPath", "runId", "startTime", "status", "summary", "updatedAt") SELECT "config", "createdAt", "duration", "endTime", "flowId", "id", "projectId", "reportPath", "runId", "startTime", "status", "summary", "updatedAt" FROM "TestRun";
DROP TABLE "TestRun";
ALTER TABLE "new_TestRun" RENAME TO "TestRun";
CREATE UNIQUE INDEX "TestRun_runId_key" ON "TestRun"("runId");
CREATE INDEX "TestRun_projectId_idx" ON "TestRun"("projectId");
CREATE INDEX "TestRun_flowId_idx" ON "TestRun"("flowId");
CREATE INDEX "TestRun_startTime_idx" ON "TestRun"("startTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "TestArtifact_testRunId_idx" ON "TestArtifact"("testRunId");

-- CreateIndex
CREATE INDEX "TestArtifact_testResultId_idx" ON "TestArtifact"("testResultId");

-- CreateIndex
CREATE INDEX "TestArtifact_type_idx" ON "TestArtifact"("type");

-- CreateIndex
CREATE INDEX "TestArtifact_createdAt_idx" ON "TestArtifact"("createdAt");

-- CreateIndex
CREATE INDEX "TestArtifact_lastAccessed_idx" ON "TestArtifact"("lastAccessed");

-- CreateIndex
CREATE INDEX "TestArtifact_markedForDeletion_idx" ON "TestArtifact"("markedForDeletion");

-- CreateIndex
CREATE INDEX "TestResult_status_idx" ON "TestResult"("status");

-- CreateIndex
CREATE INDEX "TestResult_qaseId_idx" ON "TestResult"("qaseId");
