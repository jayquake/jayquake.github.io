-- CreateTable
CREATE TABLE "TestRun" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testRunId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER,
    "error" TEXT,
    "qaseId" INTEGER,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    CONSTRAINT "TestResult_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testResultId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "duration" INTEGER,
    "error" TEXT,
    "location" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "TestStep_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "domain" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "projectId" TEXT,
    "metadata" TEXT,
    "lastUsed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TestFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "qaseId" INTEGER,
    "qaseSuiteId" INTEGER,
    "metadata" TEXT,
    "lastRun" DATETIME
);

-- CreateTable
CREATE TABLE "TestLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testRunId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" DATETIME NOT NULL,
    "metadata" TEXT,
    CONSTRAINT "TestLog_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MCPAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testRunId" TEXT NOT NULL,
    "testResultId" TEXT,
    "selector" TEXT NOT NULL,
    "suggestedSelectors" TEXT NOT NULL,
    "elementInfo" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "error" TEXT,
    "qaseId" INTEGER,
    "analysisData" TEXT NOT NULL,
    "screenshotPath" TEXT,
    "tracePath" TEXT,
    "navigationContext" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MCPAnalysis_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MCPAnalysis_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MCPArtifact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "analysisId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MCPArtifact_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "MCPAnalysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TestRun_runId_key" ON "TestRun"("runId");

-- CreateIndex
CREATE INDEX "TestRun_projectId_idx" ON "TestRun"("projectId");

-- CreateIndex
CREATE INDEX "TestRun_flowId_idx" ON "TestRun"("flowId");

-- CreateIndex
CREATE INDEX "TestRun_startTime_idx" ON "TestRun"("startTime");

-- CreateIndex
CREATE INDEX "TestResult_testRunId_idx" ON "TestResult"("testRunId");

-- CreateIndex
CREATE INDEX "TestStep_testResultId_idx" ON "TestStep"("testResultId");

-- CreateIndex
CREATE UNIQUE INDEX "Environment_domain_key" ON "Environment"("domain");

-- CreateIndex
CREATE INDEX "Environment_projectId_idx" ON "Environment"("projectId");

-- CreateIndex
CREATE INDEX "Environment_domain_idx" ON "Environment"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "TestFile_path_key" ON "TestFile"("path");

-- CreateIndex
CREATE INDEX "TestFile_projectId_idx" ON "TestFile"("projectId");

-- CreateIndex
CREATE INDEX "TestFile_qaseId_idx" ON "TestFile"("qaseId");

-- CreateIndex
CREATE INDEX "TestLog_testRunId_idx" ON "TestLog"("testRunId");

-- CreateIndex
CREATE INDEX "TestLog_level_idx" ON "TestLog"("level");

-- CreateIndex
CREATE INDEX "TestLog_timestamp_idx" ON "TestLog"("timestamp");

-- CreateIndex
CREATE INDEX "MCPAnalysis_testRunId_idx" ON "MCPAnalysis"("testRunId");

-- CreateIndex
CREATE INDEX "MCPAnalysis_testResultId_idx" ON "MCPAnalysis"("testResultId");

-- CreateIndex
CREATE INDEX "MCPAnalysis_qaseId_idx" ON "MCPAnalysis"("qaseId");

-- CreateIndex
CREATE INDEX "MCPArtifact_analysisId_idx" ON "MCPArtifact"("analysisId");

-- CreateIndex
CREATE INDEX "MCPArtifact_type_idx" ON "MCPArtifact"("type");
