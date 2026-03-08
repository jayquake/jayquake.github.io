import type { ParsedTestResult, TestStep } from './TestReportParser';

/**
 * MCPTestNavigator class helps navigate to failure points in tests
 * and identify the step right before failure.
 */
export class MCPTestNavigator {
  /**
   * Extract selector from test step
   */
  extractSelectorFromStep(step: TestStep): null | string {
    // Look for common selector patterns in step title
    const patterns = [
      /getByRole\(['"]([^'"]+)['"]/i,
      /getByText\(['"]([^'"]+)['"]/i,
      /getByLabel\(['"]([^'"]+)['"]/i,
      /getByPlaceholder\(['"]([^'"]+)['"]/i,
      /locator\(['"]([^'"]+)['"]/i,
      /getByTestId\(['"]([^'"]+)['"]/i,
      /selector: ['"]([^'"]+)['"]/i,
    ];

    for (const pattern of patterns) {
      const match = step.title.match(pattern);
      if (match) {
        return match[1];
      }
    }

    // Check location for file/line info that might help
    if (step.location) {
      // Could parse the actual test file at this location
      // For now, return null and let MCP analyze the page
      return null;
    }

    return null;
  }

  /**
   * Extract URL from test step location or test context
   */
  extractUrlFromStep(step: TestStep, baseUrl: string, testResult: ParsedTestResult): string {
    // Check if step title contains a URL or path
    const urlMatch = step.title.match(/https?:\/\/[^\s]+/i);
    if (urlMatch) {
      return urlMatch[0];
    }

    // Check for navigation patterns
    const navMatch = step.title.match(/navigate to ["']([^"']+)["']/i);
    if (navMatch) {
      const path = navMatch[1];
      // If it's a relative path, combine with baseUrl
      if (path.startsWith('/')) {
        return `${baseUrl}${path}`;
      }
      // If it's already a full URL, return it
      if (path.startsWith('http')) {
        return path;
      }
      // Otherwise, treat as relative path
      return `${baseUrl}/${path}`;
    }

    // Check for goto patterns
    const gotoMatch = step.title.match(/goto ["']([^"']+)["']/i);
    if (gotoMatch) {
      const path = gotoMatch[1];
      if (path.startsWith('/')) {
        return `${baseUrl}${path}`;
      }
      if (path.startsWith('http')) {
        return path;
      }
      return `${baseUrl}/${path}`;
    }

    // Try to infer path from test file name / directory structure
    const filePath = testResult.file?.toLowerCase() || '';
    if (filePath.includes('journeys') || filePath.includes('journey')) {
      return `${baseUrl}/journeys`;
    }
    if (filePath.includes('audit') || filePath.includes('/pages/')) {
      return `${baseUrl}/pages`;
    }
    if (filePath.includes('explore')) {
      return `${baseUrl}/explore`;
    }
    if (filePath.includes('site-settings') || filePath.includes('settings')) {
      return `${baseUrl}/settings/site-settings`;
    }
    if (filePath.includes('onboarding') && filePath.includes('availability')) {
      return `${baseUrl}/website-availability`;
    }
    if (filePath.includes('onboarding') && filePath.includes('configuration')) {
      return `${baseUrl}/website-configuration`;
    }

    // Default to baseUrl
    return baseUrl;
  }

  /**
   * Find the step right before failure in a test result
   */
  findStepBeforeFailure(testResult: ParsedTestResult): {
    failureStep: null | TestStep;
    failureStepIndex: number;
    step: null | TestStep;
    stepIndex: number;
  } {
    if (!testResult.steps || testResult.steps.length === 0) {
      return {
        failureStep: null,
        failureStepIndex: -1,
        step: null,
        stepIndex: -1,
      };
    }

    // Find the first failed step
    let failureStepIndex = -1;
    let failureStep: null | TestStep = null;

    for (let i = 0; i < testResult.steps.length; i++) {
      if (testResult.steps[i].status === 'failed') {
        failureStepIndex = i;
        failureStep = testResult.steps[i];
        break;
      }
    }

    // If no failed step found, return null
    if (failureStepIndex === -1) {
      return {
        failureStep: null,
        failureStepIndex: -1,
        step: null,
        stepIndex: -1,
      };
    }

    // Get the step before failure (or first step if failure is at index 0)
    const stepBeforeIndex = failureStepIndex > 0 ? failureStepIndex - 1 : 0;
    const stepBefore = testResult.steps[stepBeforeIndex];

    return {
      failureStep,
      failureStepIndex,
      step: stepBefore,
      stepIndex: stepBeforeIndex,
    };
  }

  /**
   * Get navigation context for a failed test
   */
  getNavigationContext(
    testResult: ParsedTestResult,
    baseUrl: string,
  ): {
    context: string;
    failureStep: null | TestStep;
    selector: null | string;
    stepBeforeFailure: null | TestStep;
    url: string;
  } {
    const { failureStep, step, stepIndex } = this.findStepBeforeFailure(testResult);

    // Determine URL - try to get from step before failure, or use baseUrl
    let url = baseUrl;
    if (step) {
      url = this.extractUrlFromStep(step, baseUrl, testResult);
    }

    // Extract selector from failure step or step before
    let selector: null | string = null;
    if (failureStep) {
      selector = this.extractSelectorFromStep(failureStep);
    }
    if (!selector && step) {
      selector = this.extractSelectorFromStep(step);
    }

    // Build context string
    const context = [
      `Test: ${testResult.title}`,
      `File: ${testResult.file}`,
      step ? `Step before failure: ${step.title}` : 'No previous step',
      failureStep ? `Failure step: ${failureStep.title}` : 'No failure step found',
      failureStep?.error ? `Error: ${failureStep.error}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return {
      context,
      failureStep,
      selector,
      stepBeforeFailure: step,
      url,
    };
  }
}
