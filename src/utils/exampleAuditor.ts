/**
 * The app's example auditor: the exampleAudit policy bound to the real adapters
 * (static-deployment check, in-browser analysis, Rule Lab backend, analysis cache).
 */
import { createExampleAuditor } from '../lib/exampleAudit';
import { analyzeHtmlClientSide } from './clientAccessibilityTree';
import { cacheAnalysis, getCachedAnalysis } from './analysisCache';
import { isStaticDeployment } from './environment';

async function api() {
  return (await import('../api/client')).api;
}

export const analyzeExample = createExampleAuditor({
  isStatic: isStaticDeployment,
  client: analyzeHtmlClientSide,
  backend: {
    checkHealth: async () => (await api()).ruleLab.checkHealth(),
    analyze: async (ruleId, ruleType, html, variant) =>
      (await api()).ruleLab.analyzeExample(ruleId, ruleType, html, variant),
  },
  cache: { get: getCachedAnalysis, set: cacheAnalysis },
});
