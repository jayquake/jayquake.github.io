-- CreateTable
CREATE TABLE "QaseTestCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qaseId" INTEGER NOT NULL,
    "projectCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER,
    "severity" INTEGER,
    "priority" INTEGER,
    "layer" INTEGER,
    "isFlaky" INTEGER,
    "suiteId" INTEGER,
    "automation" INTEGER,
    "customFields" TEXT,
    "fullData" TEXT NOT NULL,
    "lastFetched" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fetchCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "QaseTestCase_projectCode_idx" ON "QaseTestCase"("projectCode");

-- CreateIndex
CREATE INDEX "QaseTestCase_qaseId_idx" ON "QaseTestCase"("qaseId");

-- CreateIndex
CREATE INDEX "QaseTestCase_lastFetched_idx" ON "QaseTestCase"("lastFetched");

-- CreateIndex
CREATE UNIQUE INDEX "QaseTestCase_projectCode_qaseId_key" ON "QaseTestCase"("projectCode", "qaseId");
