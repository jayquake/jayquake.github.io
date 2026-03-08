import { type MCPAnalysis } from '../models/MCPAnalysis';
import { type TestResult } from '../models/TestRunData';

/**
 * TestResultMatcher - Service for matching analyses with results
 * Contains business logic for finding corresponding test results
 */
export class TestResultMatcher {
  /**
   * Find all analyses for a specific test result
   */
  static findAnalysesForTestResult(testResult: TestResult, analyses: MCPAnalysis[]): MCPAnalysis[] {
    return analyses.filter(analysis => {
      if (analysis.testResultId) {
        return analysis.testResultId === testResult.id;
      }
      return (
        (analysis.testName && analysis.testName === testResult.name) ||
        (analysis.testFile && analysis.testFile === testResult.file)
      );
    });
  }

  /**
   * Find test result for an MCP analysis
   */
  static findTestResult(analysis: MCPAnalysis, testResults: TestResult[]): null | TestResult {
    // Method 1: Match by testResultId
    if (analysis.testResultId) {
      return testResults.find(r => r.id === analysis.testResultId) || null;
    }

    // Method 2: Match by test name/file
    if (analysis.testName || analysis.testFile) {
      return (
        testResults.find(
          r =>
            (analysis.testName && r.name === analysis.testName) ||
            (analysis.testFile && r.file === analysis.testFile)
        ) || null
      );
    }

    return null;
  }
}
