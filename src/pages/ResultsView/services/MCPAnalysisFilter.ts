import { type MCPAnalysis } from '../models/MCPAnalysis';
import { type TestResult } from '../models/TestRunData';

/**
 * MCPAnalysisFilter - Service for filtering MCP analyses
 * Contains business logic for filtering analyses to only failed tests
 */
export class MCPAnalysisFilter {
  /**
   * Filter analyses to only include those for failed tests
   */
  static filterFailedTests(analyses: MCPAnalysis[], testResults: TestResult[]): MCPAnalysis[] {
    if (!analyses.length || !testResults.length) return [];

    return analyses.filter(analysis => analysis.isForFailedTest(testResults));
  }

  /**
   * Get statistics about filtered analyses
   */
  static getFilterStats(
    allAnalyses: MCPAnalysis[],
    filteredAnalyses: MCPAnalysis[]
  ): { excluded: number; filtered: number; total: number; } {
    return {
      excluded: allAnalyses.length - filteredAnalyses.length,
      filtered: filteredAnalyses.length,
      total: allAnalyses.length,
    };
  }

  /**
   * Group analyses by test result
   */
  static groupByTestResult(analyses: MCPAnalysis[]): Map<string, MCPAnalysis[]> {
    const grouped = new Map<string, MCPAnalysis[]>();

    analyses.forEach(analysis => {
      const key = analysis.testResultId || analysis.testName || 'unknown';
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(analysis);
    });

    return grouped;
  }
}
