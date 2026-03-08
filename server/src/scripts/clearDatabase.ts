/**
 * Clear Database Script
 *
 * Clears all test data from the database for fresh testing
 */

import { DatabaseService } from '../infrastructure/database/DatabaseService';

async function clearDatabase() {
  console.log('🗑️  Clearing database...\n');

  const db = DatabaseService.getInstance();
  const prisma = db.getClient();

  try {
    // Delete in order of dependencies (children first, parents last)
    console.log('Deleting TestSteps...');
    const stepsDeleted = await prisma.testStep.deleteMany();
    console.log(`✅ Deleted ${stepsDeleted.count} test steps`);

    console.log('Deleting TestArtifacts...');
    const artifactsDeleted = await prisma.testArtifact.deleteMany();
    console.log(`✅ Deleted ${artifactsDeleted.count} test artifacts`);

    console.log('Deleting MCPArtifacts...');
    const mcpArtifactsDeleted = await prisma.mCPArtifact.deleteMany();
    console.log(`✅ Deleted ${mcpArtifactsDeleted.count} MCP artifacts`);

    console.log('Deleting MCPAnalyses...');
    const mcpAnalysesDeleted = await prisma.mCPAnalysis.deleteMany();
    console.log(`✅ Deleted ${mcpAnalysesDeleted.count} MCP analyses`);

    console.log('Deleting TestResults...');
    const resultsDeleted = await prisma.testResult.deleteMany();
    console.log(`✅ Deleted ${resultsDeleted.count} test results`);

    console.log('Deleting TestLogs...');
    const logsDeleted = await prisma.testLog.deleteMany();
    console.log(`✅ Deleted ${logsDeleted.count} test logs`);

    console.log('Deleting TestRuns...');
    const runsDeleted = await prisma.testRun.deleteMany();
    console.log(`✅ Deleted ${runsDeleted.count} test runs`);

    console.log('\n✨ Database cleared successfully!\n');

    // Show current stats
    const stats = {
      mcpAnalyses: await prisma.mCPAnalysis.count(),
      mcpArtifacts: await prisma.mCPArtifact.count(),
      testArtifacts: await prisma.testArtifact.count(),
      testLogs: await prisma.testLog.count(),
      testResults: await prisma.testResult.count(),
      testRuns: await prisma.testRun.count(),
      testSteps: await prisma.testStep.count(),
    };

    console.log('📊 Current Database Stats:');
    console.log(JSON.stringify(stats, null, 2));
  } catch (error: any) {
    console.error('❌ Error clearing database:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
clearDatabase();
