-- AlterTable
ALTER TABLE "TestRun" ADD COLUMN "qaseId" INTEGER;

-- CreateIndex
CREATE INDEX "TestRun_qaseId_idx" ON "TestRun"("qaseId");
