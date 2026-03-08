import { type Request, type Response } from 'express';

import type { RuleLabEvent } from '../../../../shared/types';
import { getMcpConfig } from '../../config/mcp';
import { DatabaseService } from '../../infrastructure/database/DatabaseService';
import { RuleAnalysisService } from '../../services/RuleAnalysisService';

const analysisService = new RuleAnalysisService(getMcpConfig().url);
let broadcastFn: ((data: any) => void) | null = null;

export function setBroadcast(fn: (data: any) => void): void {
  broadcastFn = fn;
  analysisService.setEmitter((event: RuleLabEvent) => {
    fn({ ...event, channel: 'rule-lab' });
  });
}

export const analyze = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ruleId, ruleType, htmlSnippet, exampleType } = req.body;

    if (!htmlSnippet) {
      res.status(400).json({ error: 'Missing required field: htmlSnippet' });
      return;
    }

    const result = await analysisService.analyzeExample(
      ruleId || undefined,
      ruleType || 'engine',
      htmlSnippet,
      exampleType,
    );
    res.json(result);
  } catch (error: any) {
    console.error('[RuleAnalysisController] analyze error:', error);
    res.status(500).json({ error: error.message || 'Analysis failed' });
  }
};

export const discover = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ruleId, ruleType, siteUrl } = req.body;

    if (!ruleId || !ruleType || !siteUrl) {
      res.status(400).json({ error: 'Missing required fields: ruleId, ruleType, siteUrl' });
      return;
    }

    const result = await analysisService.discoverOnSite(ruleId, ruleType, siteUrl);
    res.json(result);
  } catch (error: any) {
    console.error('[RuleAnalysisController] discover error:', error);
    res.status(500).json({ error: error.message || 'Discovery failed' });
  }
};

export const discoverAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ruleId, ruleType } = req.body;

    if (!ruleId || !ruleType) {
      res.status(400).json({ error: 'Missing required fields: ruleId, ruleType' });
      return;
    }

    const prisma = DatabaseService.getInstance().getClient();
    const enabledSites = await prisma.curatedSite.findMany({ where: { enabled: true } });

    const sites = [];
    let totalExamples = 0;

    for (const site of enabledSites) {
      const result = await analysisService.discoverOnSite(ruleId, ruleType, site.url);
      sites.push(result);
      totalExamples += result.examples.length;
    }

    broadcastFn?.({ type: 'discovery:complete', ruleId, totalExamples, channel: 'rule-lab' });

    res.json({ ruleId, sites, totalExamples });
  } catch (error: any) {
    console.error('[RuleAnalysisController] discoverAll error:', error);
    res.status(500).json({ error: error.message || 'Discovery failed' });
  }
};

export const listSites = async (_req: Request, res: Response): Promise<void> => {
  try {
    const prisma = DatabaseService.getInstance().getClient();
    const sites = await prisma.curatedSite.findMany({ orderBy: { name: 'asc' } });
    res.json(sites);
  } catch (error: any) {
    console.error('[RuleAnalysisController] listSites error:', error);
    res.status(500).json({ error: error.message || 'Failed to list sites' });
  }
};

export const addSite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, url, category } = req.body;

    if (!name || !url || !category) {
      res.status(400).json({ error: 'Missing required fields: name, url, category' });
      return;
    }

    const prisma = DatabaseService.getInstance().getClient();
    const site = await prisma.curatedSite.create({ data: { name, url, category } });
    res.status(201).json(site);
  } catch (error: any) {
    console.error('[RuleAnalysisController] addSite error:', error);
    res.status(500).json({ error: error.message || 'Failed to add site' });
  }
};

export const updateSite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { siteId } = req.params;
    const { enabled, name, category } = req.body;

    const data: Record<string, any> = {};
    if (typeof enabled === 'boolean') data.enabled = enabled;
    if (name) data.name = name;
    if (category) data.category = category;

    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: 'No updatable fields provided (enabled, name, category)' });
      return;
    }

    const prisma = DatabaseService.getInstance().getClient();
    const site = await prisma.curatedSite.update({ where: { id: siteId }, data });
    res.json(site);
  } catch (error: any) {
    console.error('[RuleAnalysisController] updateSite error:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Site not found' });
      return;
    }
    res.status(500).json({ error: error.message || 'Failed to update site' });
  }
};

export const curateExample = async (req: Request, res: Response): Promise<void> => {
  try {
    const { exampleId } = req.params;

    const prisma = DatabaseService.getInstance().getClient();
    const existing = await prisma.ruleExample.findUnique({ where: { id: exampleId } });

    if (!existing) {
      res.status(404).json({ error: 'Example not found' });
      return;
    }

    const updated = await prisma.ruleExample.update({
      where: { id: exampleId },
      data: { curated: !existing.curated },
    });

    res.json(updated);
  } catch (error: any) {
    console.error('[RuleAnalysisController] curateExample error:', error);
    res.status(500).json({ error: error.message || 'Failed to toggle curation' });
  }
};

export const healthCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    const healthy = await analysisService.checkHealth();
    res.json({
      healthy,
      message: healthy ? 'MCP server is reachable' : 'MCP server is not reachable',
    });
  } catch (error: any) {
    console.error('[RuleAnalysisController] healthCheck error:', error);
    res.json({ healthy: false, message: error.message || 'Health check failed' });
  }
};
