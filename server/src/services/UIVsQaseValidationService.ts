/**
 * UI vs Qase Validation Service
 * 
 * Compares Qase test cases against live UI observations from Playwright MCP.
 * Produces validation reports with mismatches, confidence scores, and suggested updates.
 */

import type { QaseConfig } from '../../../shared/types';
import type { PlaywrightSignal } from '../../../shared/types/playwrightSignals';

import { MCPService } from './MCPService';
import { QaseService } from './QaseService';

export type ValidationCase = {
  caseId: number;
  evidence: ValidationEvidence[];
  proposedChanges?: ProposedChanges;
  status: 'accurate' | 'mismatch' | 'needs_update';
  title: string;
};

export type ValidationEvidence = {
  expected: string;
  observed: string;
  severity: 'critical' | 'major' | 'minor';
  stepNumber?: number;
  type: 'missing_element' | 'selector_mismatch' | 'step_order' | 'text_mismatch' | 'ui_state';
};

export type ProposedChanges = {
  confidence: number;
  newDescription?: string;
  newSteps?: Array<{
    action: string;
    expected_result: string;
  }>;
  newTitle?: string;
  reason: string;
};

export type ValidationReport = {
  cases: ValidationCase[];
  metadata: {
    accurateCount: number;
    duration: number;
    errorCount: number;
    mismatchCount: number;
    needsUpdateCount: number;
    suiteId: number;
    timestamp: string;
    totalCases: number;
  };
  summary: {
    accuracyRate: number;
    highConfidenceUpdates: number;
    lowConfidenceUpdates: number;
  };
};

export class UIVsQaseValidationService {
  private mcpService: MCPService;
  private qaseService: QaseService;

  constructor(mcpServerUrl: string = 'http://localhost:3002') {
    this.mcpService = new MCPService(mcpServerUrl);
    this.qaseService = new QaseService();
  }

  /**
   * Validate a suite of test cases against live UI
   */
  async validateSuite(
    suiteId: number,
    baseUrl: string,
    qaseConfig: QaseConfig,
  ): Promise<ValidationReport> {
    const startTime = Date.now();

    console.log(`[UIVsQaseValidation] Starting validation for suite ${suiteId}`);
    console.log(`[UIVsQaseValidation] Base URL: ${baseUrl}`);

    // Fetch all test cases in the suite
    const testCases = await this.qaseService.getTestCasesBySuite(qaseConfig, suiteId);

    console.log(`[UIVsQaseValidation] Found ${testCases.length} test cases in suite`);

    const cases: ValidationCase[] = [];
    let accurateCount = 0;
    let mismatchCount = 0;
    let needsUpdateCount = 0;
    let errorCount = 0;

    // Validate each test case
    for (const testCase of testCases) {
      try {
        const validationCase = await this.validateCase(testCase, baseUrl, qaseConfig);
        cases.push(validationCase);

        switch (validationCase.status) {
          case 'accurate':
            accurateCount++;
            break;
          case 'mismatch':
            mismatchCount++;
            break;
          case 'needs_update':
            needsUpdateCount++;
            break;
        }
      } catch (error: any) {
        console.error(`[UIVsQaseValidation] Error validating case ${testCase.id}:`, error.message);
        errorCount++;
        
        cases.push({
          caseId: testCase.id,
          evidence: [{
            expected: 'Validation',
            observed: `Error: ${error.message}`,
            severity: 'critical',
            type: 'ui_state',
          }],
          status: 'mismatch',
          title: testCase.title,
        });
      }
    }

    const duration = Date.now() - startTime;
    const totalCases = testCases.length;
    const accuracyRate = totalCases > 0 ? (accurateCount / totalCases) * 100 : 0;

    // Calculate high/low confidence updates
    const highConfidenceUpdates = cases.filter(
      (c) => c.proposedChanges && c.proposedChanges.confidence >= 0.7,
    ).length;
    const lowConfidenceUpdates = cases.filter(
      (c) => c.proposedChanges && c.proposedChanges.confidence < 0.7,
    ).length;

    return {
      cases,
      metadata: {
        accurateCount,
        duration,
        errorCount,
        mismatchCount,
        needsUpdateCount,
        suiteId,
        timestamp: new Date().toISOString(),
        totalCases,
      },
      summary: {
        accuracyRate,
        highConfidenceUpdates,
        lowConfidenceUpdates,
      },
    };
  }

  /**
   * Validate a single test case against live UI
   */
  private async validateCase(
    testCase: any,
    baseUrl: string,
    qaseConfig: QaseConfig,
  ): Promise<ValidationCase> {
    const evidence: ValidationEvidence[] = [];

    // Navigate to the base URL
    try {
      await this.mcpService.navigate(baseUrl);
    } catch (error: any) {
      evidence.push({
        expected: `Navigate to ${baseUrl}`,
        observed: `Navigation failed: ${error.message}`,
        severity: 'critical',
        type: 'ui_state',
      });

      return {
        caseId: testCase.id,
        evidence,
        status: 'mismatch',
        title: testCase.title,
      };
    }

    // Get page snapshot
    let snapshot;
    try {
      snapshot = await this.mcpService.getSnapshot();
    } catch (error: any) {
      evidence.push({
        expected: 'Page snapshot',
        observed: `Snapshot failed: ${error.message}`,
        severity: 'critical',
        type: 'ui_state',
      });

      return {
        caseId: testCase.id,
        evidence,
        status: 'mismatch',
        title: testCase.title,
      };
    }

    // Validate test case steps against UI
    if (testCase.steps && testCase.steps.length > 0) {
      for (let i = 0; i < testCase.steps.length; i++) {
        const step = testCase.steps[i];
        const stepEvidence = this.validateStep(step, snapshot, i + 1);
        
        if (stepEvidence) {
          evidence.push(stepEvidence);
        }
      }
    }

    // Determine status and proposed changes
    if (evidence.length === 0) {
      return {
        caseId: testCase.id,
        evidence: [],
        status: 'accurate',
        title: testCase.title,
      };
    }

    const hasCritical = evidence.some((e) => e.severity === 'critical');
    const proposedChanges = this.generateProposedChanges(testCase, evidence, snapshot);

    return {
      caseId: testCase.id,
      evidence,
      proposedChanges,
      status: hasCritical ? 'mismatch' : 'needs_update',
      title: testCase.title,
    };
  }

  /**
   * Validate a single step against UI snapshot
   */
  private validateStep(
    step: any,
    snapshot: any,
    stepNumber: number,
  ): ValidationEvidence | null {
    const action = step.action || '';
    const expectedResult = step.expected_result || '';

    // Extract element references from action
    const elementPatterns = [
      /click\s+(?:on\s+)?["']?([^"']+)["']?/i,
      /enter\s+[^in]+in\s+["']?([^"']+)["']?/i,
      /select\s+[^in]+in\s+["']?([^"']+)["']?/i,
      /navigate\s+to\s+["']?([^"']+)["']?/i,
    ];

    for (const pattern of elementPatterns) {
      const match = action.match(pattern);
      if (match) {
        const elementDesc = match[1];
        
        // Check if element exists in snapshot
        if (!this.findElementInSnapshot(elementDesc, snapshot)) {
          return {
            expected: `Element: ${elementDesc}`,
            observed: 'Element not found in current UI',
            severity: 'major',
            stepNumber,
            type: 'missing_element',
          };
        }
      }
    }

    // Check for text mismatches in expected results
    if (expectedResult && expectedResult.length > 0) {
      const textMatch = expectedResult.match(/["']([^"']+)["']/);
      if (textMatch) {
        const expectedText = textMatch[1];
        if (!this.findTextInSnapshot(expectedText, snapshot)) {
          return {
            expected: `Text: "${expectedText}"`,
            observed: 'Text not found in current UI',
            severity: 'minor',
            stepNumber,
            type: 'text_mismatch',
          };
        }
      }
    }

    return null;
  }

  /**
   * Find element in snapshot by description
   */
  private findElementInSnapshot(elementDesc: string, snapshot: any): boolean {
    if (!snapshot || !snapshot.content) {
      return false;
    }

    const content = JSON.stringify(snapshot).toLowerCase();
    const searchTerm = elementDesc.toLowerCase();

    // Simple text search in snapshot
    return content.includes(searchTerm);
  }

  /**
   * Find text in snapshot
   */
  private findTextInSnapshot(text: string, snapshot: any): boolean {
    if (!snapshot || !snapshot.content) {
      return false;
    }

    const content = JSON.stringify(snapshot).toLowerCase();
    const searchTerm = text.toLowerCase();

    return content.includes(searchTerm);
  }

  /**
   * Generate proposed changes based on evidence
   */
  private generateProposedChanges(
    testCase: any,
    evidence: ValidationEvidence[],
    snapshot: any,
  ): ProposedChanges {
    const criticalCount = evidence.filter((e) => e.severity === 'critical').length;
    const majorCount = evidence.filter((e) => e.severity === 'major').length;

    // Calculate confidence based on evidence severity
    let confidence = 1.0;
    confidence -= criticalCount * 0.3;
    confidence -= majorCount * 0.2;
    confidence = Math.max(0, confidence);

    const changes: ProposedChanges = {
      confidence,
      reason: `Found ${evidence.length} mismatch(es): ${criticalCount} critical, ${majorCount} major`,
    };

    // Suggest title updates if there are critical mismatches
    if (criticalCount > 0) {
      changes.newTitle = `${testCase.title} [NEEDS UI UPDATE]`;
    }

    // Suggest description updates
    const evidenceSummary = evidence
      .map((e) => `- ${e.type}: ${e.expected} (observed: ${e.observed})`)
      .join('\n');

    changes.newDescription = `${testCase.description || ''}\n\n**Validation Issues Found:**\n${evidenceSummary}`;

    return changes;
  }

  /**
   * Convert validation results to Playwright signals
   */
  convertToPlaywrightSignals(report: ValidationReport, baseUrl: string): PlaywrightSignal[] {
    const signals: PlaywrightSignal[] = [];

    for (const validationCase of report.cases) {
      if (validationCase.status === 'accurate') {
        continue; // Skip accurate cases
      }

      const signal: PlaywrightSignal = {
        context: {
          baseUrl,
          browser: 'chromium',
          flowName: validationCase.title,
          sessionId: `validation-${validationCase.caseId}`,
        },
        metadata: {
          capturedBy: 'UIVsQaseValidation',
          flowType: 'page',
          qaseReference: {
            caseId: validationCase.caseId,
          },
        },
        observations: validationCase.evidence.map((ev, index) => ({
          expectedOutcome: ev.expected,
          order: index + 1,
          timestamp: new Date().toISOString(),
          type: 'assertion',
        })),
        source: 'mcp-snapshot',
        timestamp: new Date().toISOString(),
      };

      signals.push(signal);
    }

    return signals;
  }
}
