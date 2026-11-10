import { type Request, type Response } from 'express';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { createRequire } from 'module';

import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { PathUtils } from '../../infrastructure/utils/PathUtils';

const requireFromCjs = createRequire(__filename);
const {
  loadCatalogFromDisk,
} = requireFromCjs('../../../../src/lib/rulesCatalog/index.js') as {
  loadCatalogFromDisk: (repoRoot?: string) => {
    rules: EngineRuleMetadata[];
    byId: Record<string, EngineRuleMetadata>;
  };
};

interface EngineRuleMetadata {
  id: string;
  kebabId: string;
  title: string;
  description: string;
  advice: string;
  adviceHtml?: string;
  impact: string;
  refs: Array<{ type: string; id: string; level: string; link: string }>;
  detailUrl: string;
  successUrl: string;
  failureUrl: string;
  populated?: boolean;
}

interface LegacyRule {
  name: string;
  route: string;
  shortCode?: string;
  severity?: string;
  criteria?: string;
  WCAGLevel?: string;
  shortDescription?: string;
  issueDescription?: string;
  issueResolution?: string;
  suggestedFix?: string;
  [key: string]: unknown;
}

interface HtmlExample {
  filename: string;
  content: string;
}

let cachedEngineRules: EngineRuleMetadata[] | null = null;
let cachedEngineById: Record<string, EngineRuleMetadata> | null = null;
let cachedLegacyRules: LegacyRule[] | null = null;

function loadEngineRules(): EngineRuleMetadata[] {
  if (cachedEngineRules) return cachedEngineRules;
  const catalog = loadCatalogFromDisk(PathUtils.getProjectRoot());
  cachedEngineRules = catalog.rules;
  cachedEngineById = catalog.byId;
  return cachedEngineRules!;
}

function findEngineRule(ruleId: string): EngineRuleMetadata | undefined {
  loadEngineRules();
  return cachedEngineById?.[ruleId];
}

function loadLegacyRules(): LegacyRule[] {
  if (cachedLegacyRules) return cachedLegacyRules;
  const filePath = join(PathUtils.getProjectRoot(), 'src/data/legacy-rules.json');
  const raw = readFileSync(filePath, 'utf-8');
  cachedLegacyRules = JSON.parse(raw);
  return cachedLegacyRules!;
}

function parseHtmlExamplesFromJsx(filePath: string): HtmlExample[] {
  if (!existsSync(filePath)) return [];
  const source = readFileSync(filePath, 'utf-8');

  const match = source.match(/const\s+htmlExamples\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return [];

  try {
    const arrayContent = match[1];
    const examples: HtmlExample[] = [];
    const itemRegex = /\{\s*filename:\s*"([^"]*?)"\s*,\s*content:\s*`([\s\S]*?)`\s*\}/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
      examples.push({ filename: itemMatch[1], content: itemMatch[2] });
    }
    return examples;
  } catch {
    return [];
  }
}

export class RuleController {
  async listRules(_req: Request, res: Response): Promise<void> {
    try {
      const engineRules = loadEngineRules();
      const legacyRules = loadLegacyRules();

      res.json({
        engineRules,
        legacyRules,
        total: engineRules.length + legacyRules.length,
      });
    } catch (error: any) {
      console.error('[RuleController] Error listing rules:', error);
      res.status(500).json({ error: error.message || 'Failed to list rules' });
    }
  }

  async getRule(req: Request, res: Response): Promise<void> {
    try {
      const { ruleId } = req.params;
      const legacyRules = loadLegacyRules();

      const engineRule = findEngineRule(ruleId);
      const legacyRule = legacyRules.find((r) => r.route === ruleId);

      if (!engineRule && !legacyRule) {
        res.status(404).json({ error: `Rule "${ruleId}" not found` });
        return;
      }

      const prisma = DatabaseService.getInstance().getClient();

      const [analysesCount, examplesCount] = await Promise.all([
        prisma.mCPAnalysis.count({ where: { ruleId } }),
        prisma.ruleExample.count({ where: { ruleId } }),
      ]);

      const ruleType = engineRule ? 'engine' : 'legacy';
      const metadata = engineRule || legacyRule;

      res.json({
        ...metadata,
        ruleType,
        analysesCount,
        examplesCount,
      });
    } catch (error: any) {
      console.error('[RuleController] Error getting rule:', error);
      res.status(500).json({ error: error.message || 'Failed to get rule' });
    }
  }

  async getRuleExamples(req: Request, res: Response): Promise<void> {
    try {
      const { ruleId } = req.params;
      const engineRule = findEngineRule(ruleId);

      const discovered: { success: HtmlExample[]; failure: HtmlExample[] } = {
        success: [],
        failure: [],
      };

      if (engineRule) {
        const ruleDir = join(
          PathUtils.getProjectRoot(),
          'src/components/pages/engine-rules',
          engineRule.kebabId,
        );

        if (existsSync(ruleDir)) {
          const files = readdirSync(ruleDir);
          const successFile = files.find((f) => f.endsWith('Success.jsx'));
          const failureFile = files.find((f) => f.endsWith('Failure.jsx'));

          if (successFile) {
            discovered.success = parseHtmlExamplesFromJsx(join(ruleDir, successFile));
          }
          if (failureFile) {
            discovered.failure = parseHtmlExamplesFromJsx(join(ruleDir, failureFile));
          }
        }
      }

      const prisma = DatabaseService.getInstance().getClient();
      const existing = await prisma.ruleExample.findMany({
        where: { ruleId },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ existing, discovered });
    } catch (error: any) {
      console.error('[RuleController] Error getting rule examples:', error);
      res.status(500).json({ error: error.message || 'Failed to get rule examples' });
    }
  }

  async getRuleAnalyses(req: Request, res: Response): Promise<void> {
    try {
      const { ruleId } = req.params;
      const prisma = DatabaseService.getInstance().getClient();

      const analyses = await prisma.mCPAnalysis.findMany({
        where: { ruleId },
        orderBy: { createdAt: 'desc' },
      });

      res.json(analyses);
    } catch (error: any) {
      console.error('[RuleController] Error getting rule analyses:', error);
      res.status(500).json({ error: error.message || 'Failed to get rule analyses' });
    }
  }
}
