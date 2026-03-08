import { existsSync, mkdirSync, statSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

import { type PrismaClient } from '@prisma/client';

import type { RuleLabEvent } from '../../../shared/types';
import { DatabaseService } from '../infrastructure/database/DatabaseService';
import { PlaywrightMCPClient, type MCPResponse } from '../infrastructure/mcp/PlaywrightMCPClient';

export type AnalysisResult = {
  analysisId: string;
  accessibilityTree: string;
  computedRoles: string[];
  screenReaderNarration: string;
  screenshotPath?: string;
  elementInfo: Record<string, any>;
  error?: string;
};

export type DiscoveryResult = {
  siteUrl: string;
  siteName: string;
  examples: {
    id: string;
    htmlSnippet: string;
    accessibilityTree: string;
    computedRoles: string[];
    screenReaderNarration: string;
    exampleType: string;
  }[];
  total: number;
  error?: string;
};

/**
 * Maps rule ID prefixes to the element patterns we search for in snapshots.
 * Each entry is a regex that matches lines in a Playwright MCP accessibility snapshot.
 */
const RULE_ELEMENT_PATTERNS: Record<string, RegExp> = {
  'alt':      /\bimg\b|role="img"/i,
  'img':      /\bimg\b|role="img"/i,
  'image':    /\bimg\b|role="img"/i,
  'link':     /\blink\b|<a[\s>]/i,
  'button':   /\bbutton\b|role="button"/i,
  'heading':  /\bheading\b|<h[1-6][\s>]/i,
  'form':     /\btextbox\b|\bcombobox\b|\bcheckbox\b|\bradio\b|\bslider\b/i,
  'input':    /\btextbox\b|\bcombobox\b/i,
  'select':   /\bcombobox\b/i,
  'checkbox': /\bcheckbox\b/i,
  'radio':    /\bradio\b/i,
  'label':    /\blabel\b|\btextbox\b/i,
  'aria':     /\brole=/i,
  'table':    /\btable\b|\bgrid\b/i,
  'list':     /\blist\b|\blistitem\b/i,
  'dialog':   /\bdialog\b/i,
  'tab':      /\btab\b|\btablist\b/i,
  'menu':     /\bmenu\b|\bmenuitem\b/i,
};

export class RuleAnalysisService {
  private mcpClient: PlaywrightMCPClient;
  private db: PrismaClient;
  private tmpDir: string;
  private emitter?: (event: RuleLabEvent) => void;

  constructor(mcpServerUrl?: string) {
    this.mcpClient = new PlaywrightMCPClient(mcpServerUrl);
    this.db = DatabaseService.getInstance().getClient();
    this.tmpDir = join(__dirname, '../../tmp');
  }

  setEmitter(emitter: (event: RuleLabEvent) => void): void {
    this.emitter = emitter;
  }

  private emit(event: RuleLabEvent): void {
    this.emitter?.(event);
  }

  /**
   * Analyze an existing HTML example in a real browser via MCP.
   * Creates a temporary HTML page, navigates MCP browser to it,
   * extracts accessibility tree, computed roles, screen reader narration.
   */
  async analyzeExample(
    ruleId: string | undefined,
    ruleType: string,
    htmlSnippet: string,
    exampleType: string = 'success',
  ): Promise<AnalysisResult> {
    const effectiveRuleId = ruleId || 'anonymous';
    this.emit({ type: 'analysis:start', ruleId: effectiveRuleId, ruleType });
    const tempFile = this.writeTempHtml(htmlSnippet, effectiveRuleId);

    try {
      const navResponse = await this.callMCP('browser_navigate', {
        url: `file://${tempFile}`,
      });

      if (navResponse.isError) {
        const msg = `Navigation failed: ${this.extractText(navResponse)}`;
        this.emit({ type: 'analysis:error', ruleId: effectiveRuleId, error: msg });
        return this.errorResult(msg);
      }

      await this.sleep(500);

      const snapshotResponse = await this.callMCP('browser_snapshot', {});
      const snapshotText = this.extractText(snapshotResponse);

      if (snapshotResponse.isError || !snapshotText) {
        const msg = `Snapshot failed: ${snapshotText || 'empty response'}`;
        this.emit({ type: 'analysis:error', ruleId: effectiveRuleId, error: msg });
        return this.errorResult(msg);
      }

      this.emit({ type: 'analysis:snapshot', ruleId: effectiveRuleId, accessibilityTree: snapshotText });

      const computedRoles = this.parseRolesFromSnapshot(snapshotText);
      const narration = this.buildNarrationFromSnapshot(snapshotText);
      const elementInfo = this.parseElementInfoFromSnapshot(snapshotText);

      let screenshotPath: string | undefined;
      try {
        const screenshotResponse = await this.callMCP('browser_take_screenshot', {
          type: 'png',
        });
        if (!screenshotResponse.isError) {
          screenshotPath = this.extractScreenshotPath(screenshotResponse);
        }
      } catch {
        // Screenshot is best-effort
      }

      const analysis = await this.db.mCPAnalysis.create({
        data: {
          ruleId: ruleId || null,
          ruleType,
          selector: 'body',
          suggestedSelectors: JSON.stringify([]),
          elementInfo: JSON.stringify(elementInfo),
          confidence: 1.0,
          analysisData: JSON.stringify({
            accessibilityTree: snapshotText,
            computedRoles,
            screenReaderNarration: narration,
            htmlSnippet,
          }),
          screenshotPath,
        },
      });

      if (ruleId) {
        await this.db.ruleExample.create({
          data: {
            ruleId,
            ruleType,
            exampleType,
            htmlSnippet,
            accessibilityTree: snapshotText,
            computedRoles: JSON.stringify(computedRoles),
            screenReaderNarration: narration,
            screenshotPath,
            curated: true,
            analysisId: analysis.id,
          },
        });
      }

      const result: AnalysisResult = {
        analysisId: analysis.id,
        accessibilityTree: snapshotText,
        computedRoles,
        screenReaderNarration: narration,
        screenshotPath,
        elementInfo,
      };

      this.emit({ type: 'analysis:complete', ruleId: effectiveRuleId, result });

      return result;
    } catch (error: any) {
      console.error('[RuleAnalysisService] analyzeExample error:', error.message);
      this.emit({ type: 'analysis:error', ruleId: effectiveRuleId, error: error.message });
      return this.errorResult(error.message);
    } finally {
      this.cleanupTempFile(tempFile);
    }
  }

  /**
   * Discover examples on a curated site for a specific rule.
   * Navigates to the site, gets a snapshot, finds elements matching the rule's pattern.
   */
  async discoverOnSite(
    ruleId: string,
    ruleType: string,
    siteUrl: string,
  ): Promise<DiscoveryResult> {
    const siteName = this.extractSiteName(siteUrl);
    this.emit({ type: 'discovery:start', ruleId, siteUrl });

    try {
      const navResponse = await this.callMCP('browser_navigate', { url: siteUrl });

      if (navResponse.isError) {
        const msg = `Navigation failed: ${this.extractText(navResponse)}`;
        this.emit({ type: 'discovery:error', ruleId, siteUrl, error: msg });
        return {
          siteUrl,
          siteName,
          examples: [],
          total: 0,
          error: msg,
        };
      }

      await this.sleep(2000);

      const snapshotResponse = await this.callMCP('browser_snapshot', {});
      const snapshotText = this.extractText(snapshotResponse);

      if (snapshotResponse.isError || !snapshotText) {
        const msg = `Snapshot failed: ${snapshotText || 'empty response'}`;
        this.emit({ type: 'discovery:error', ruleId, siteUrl, error: msg });
        return {
          siteUrl,
          siteName,
          examples: [],
          total: 0,
          error: msg,
        };
      }

      const pattern = this.getElementPatternForRule(ruleId);
      const matchedSections = this.findMatchingSections(snapshotText, pattern);
      const limited = matchedSections.slice(0, 5);

      const examples: DiscoveryResult['examples'] = [];

      for (const section of limited) {
        const roles = this.parseRolesFromSnapshot(section.text);
        const narration = this.buildNarrationFromSnapshot(section.text);
        const htmlSnippet = this.reconstructHtmlFromSnapshot(section.text, ruleId);

        const ruleExample = await this.db.ruleExample.create({
          data: {
            ruleId,
            ruleType,
            exampleType: 'discovered',
            htmlSnippet,
            sourceUrl: siteUrl,
            siteName,
            accessibilityTree: section.text,
            computedRoles: JSON.stringify(roles),
            screenReaderNarration: narration,
            curated: false,
          },
        });

        examples.push({
          id: ruleExample.id,
          htmlSnippet,
          accessibilityTree: section.text,
          computedRoles: roles,
          screenReaderNarration: narration,
          exampleType: 'discovered',
        });

        this.emit({
          type: 'discovery:progress',
          ruleId,
          siteUrl,
          found: examples.length,
          total: matchedSections.length,
        });
      }

      this.emit({
        type: 'discovery:site-complete',
        ruleId,
        siteUrl,
        examples: examples.length,
      });

      return {
        siteUrl,
        siteName,
        examples,
        total: matchedSections.length,
      };
    } catch (error: any) {
      console.error('[RuleAnalysisService] discoverOnSite error:', error.message);
      this.emit({ type: 'discovery:error', ruleId, siteUrl, error: error.message });
      return {
        siteUrl,
        siteName,
        examples: [],
        total: 0,
        error: error.message,
      };
    }
  }

  /**
   * Check whether the MCP server is reachable.
   */
  async checkHealth(): Promise<boolean> {
    return this.mcpClient.checkMCPServer();
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private async callMCP(toolName: string, args: Record<string, any>): Promise<MCPResponse> {
    console.log(`[RuleAnalysisService] callMCP: ${toolName}`, Object.keys(args));
    return this.mcpClient.callTool(toolName, args);
  }

  private extractText(response: MCPResponse): string {
    if (!response.content || response.content.length === 0) return '';
    return response.content
      .filter((c) => c.type === 'text' && c.text)
      .map((c) => c.text!)
      .join('\n');
  }

  private extractScreenshotPath(response: MCPResponse): string | undefined {
    for (const item of response.content || []) {
      if (item.type === 'text' && item.text) {
        const pathMatch = item.text.match(/saved?\s+(?:to|at|as)\s+(\S+)/i);
        if (pathMatch) return pathMatch[1];
      }
      if (item.type === 'image' && item.data) {
        const dir = join(this.tmpDir, 'screenshots');
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        const filePath = join(dir, `screenshot-${Date.now()}.png`);
        writeFileSync(filePath, Buffer.from(item.data, 'base64'));
        return filePath;
      }
    }
    return undefined;
  }

  /**
   * Parse ARIA roles from a Playwright MCP snapshot.
   *
   * Snapshot lines look like:
   *   - heading "Page Title" [level=1] [ref=e1]
   *   - button "Submit" [ref=e5]
   *   - img "Logo" [ref=e3]
   */
  private parseRolesFromSnapshot(snapshot: string): string[] {
    const roles = new Set<string>();
    const rolePattern = /^\s*-\s+(\w+)\s/gm;
    let match: RegExpExecArray | null;
    while ((match = rolePattern.exec(snapshot)) !== null) {
      const role = match[1].toLowerCase();
      if (role !== 'text' && role !== 'page' && role !== 'generic') {
        roles.add(role);
      }
    }
    return Array.from(roles);
  }

  /**
   * Build a screen reader narration string from the snapshot's accessible names and roles.
   */
  private buildNarrationFromSnapshot(snapshot: string): string {
    const parts: string[] = [];
    const lines = snapshot.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('-')) continue;

      // Match: - role "name" [ref=...]
      const namedElement = trimmed.match(/^-\s+(\w+)\s+"([^"]+)"/);
      if (namedElement) {
        const [, role, name] = namedElement;
        if (role === 'text') {
          parts.push(name);
        } else {
          parts.push(`${name}, ${role}`);
        }
        continue;
      }

      // Match: - role [ref=...]  (no name)
      const unnamedElement = trimmed.match(/^-\s+(\w+)\s+\[ref=/);
      if (unnamedElement) {
        const role = unnamedElement[1];
        if (role !== 'generic' && role !== 'page') {
          parts.push(role);
        }
      }
    }

    return parts.join('. ') || 'No narration available';
  }

  /**
   * Extract element info (tag, role, name, attributes) from snapshot.
   */
  private parseElementInfoFromSnapshot(snapshot: string): Record<string, any> {
    const elements: Record<string, any>[] = [];
    const lines = snapshot.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('-')) continue;

      const match = trimmed.match(/^-\s+(\w+)(?:\s+"([^"]*)")?(?:\s+\[([^\]]*)\])?/);
      if (match) {
        const [, role, name, attrs] = match;
        if (role === 'page' || role === 'generic') continue;

        const element: Record<string, any> = { role };
        if (name) element.name = name;
        if (attrs) {
          const attrPairs = attrs.split(/\]\s*\[/).map((a) => a.replace(/[\[\]]/g, ''));
          for (const pair of attrPairs) {
            const eqIdx = pair.indexOf('=');
            if (eqIdx > 0) {
              element[pair.slice(0, eqIdx)] = pair.slice(eqIdx + 1);
            }
          }
        }
        elements.push(element);
      }
    }

    return { elements, rawLength: snapshot.length };
  }

  /**
   * Find sections of the snapshot that match a given element pattern.
   * Returns each matching line plus surrounding context (parent + children).
   */
  private findMatchingSections(
    snapshot: string,
    pattern: RegExp,
  ): { text: string; lineIndex: number }[] {
    const lines = snapshot.split('\n');
    const sections: { text: string; lineIndex: number }[] = [];
    const usedLines = new Set<number>();

    for (let i = 0; i < lines.length; i++) {
      if (usedLines.has(i)) continue;
      if (!pattern.test(lines[i])) continue;

      const indent = lines[i].search(/\S/);
      const start = Math.max(0, i - 1);
      let end = i + 1;

      // Capture child lines (deeper indent) up to 10 lines
      while (end < lines.length && end < i + 10) {
        const childIndent = lines[end].search(/\S/);
        if (childIndent <= indent && lines[end].trim().length > 0) break;
        end++;
      }

      const sectionLines: string[] = [];
      for (let j = start; j < end; j++) {
        sectionLines.push(lines[j]);
        usedLines.add(j);
      }

      sections.push({ text: sectionLines.join('\n'), lineIndex: i });
    }

    return sections;
  }

  /**
   * Get the element-matching regex for a rule based on its ID prefix.
   */
  private getElementPatternForRule(ruleId: string): RegExp {
    const lower = ruleId.toLowerCase();
    for (const [prefix, pattern] of Object.entries(RULE_ELEMENT_PATTERNS)) {
      if (lower.startsWith(prefix) || lower.includes(`-${prefix}`)) {
        return pattern;
      }
    }
    // Fallback: try to match the first word of the ruleId as a role
    const firstWord = lower.replace(/[-_].*/, '');
    return new RegExp(`\\b${firstWord}\\b`, 'i');
  }

  /**
   * Reconstruct a plausible HTML snippet from snapshot accessibility info.
   * This is a best-effort approximation since the snapshot doesn't contain raw HTML.
   */
  private reconstructHtmlFromSnapshot(sectionText: string, ruleId: string): string {
    const lines = sectionText.split('\n');
    const parts: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('-')) continue;

      const match = trimmed.match(/^-\s+(\w+)(?:\s+"([^"]*)")?/);
      if (!match) continue;
      const [, role, name] = match;

      switch (role) {
        case 'img':
          parts.push(`<img alt="${name || ''}" src="[discovered]" />`);
          break;
        case 'link':
          parts.push(`<a href="#">${name || 'link'}</a>`);
          break;
        case 'button':
          parts.push(`<button>${name || 'button'}</button>`);
          break;
        case 'heading':
          parts.push(`<h2>${name || 'heading'}</h2>`);
          break;
        case 'textbox':
          parts.push(`<input type="text" aria-label="${name || ''}" />`);
          break;
        case 'checkbox':
          parts.push(`<input type="checkbox" aria-label="${name || ''}" />`);
          break;
        case 'radio':
          parts.push(`<input type="radio" aria-label="${name || ''}" />`);
          break;
        case 'combobox':
          parts.push(`<select aria-label="${name || ''}"><option>${name || ''}</option></select>`);
          break;
        case 'text':
          if (name) parts.push(`<span>${name}</span>`);
          break;
        default:
          if (name) parts.push(`<div role="${role}">${name}</div>`);
          break;
      }
    }

    return parts.join('\n') || `<!-- No elements reconstructed for rule ${ruleId} -->`;
  }

  private extractSiteName(url: string): string {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  private writeTempHtml(htmlSnippet: string, ruleId: string): string {
    if (!existsSync(this.tmpDir)) {
      mkdirSync(this.tmpDir, { recursive: true });
    }

    const filename = `rule-analysis-${ruleId}-${Date.now()}.html`;
    const filePath = join(this.tmpDir, filename);
    const fullHtml = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head><meta charset="UTF-8"><title>Rule Analysis</title></head>',
      '<body>',
      htmlSnippet,
      '</body>',
      '</html>',
    ].join('\n');

    writeFileSync(filePath, fullHtml, 'utf-8');
    return filePath;
  }

  private cleanupTempFile(filePath: string): void {
    try {
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (error: any) {
      console.warn('[RuleAnalysisService] Failed to clean up temp file:', error.message);
    }
  }

  private errorResult(message: string): AnalysisResult {
    return {
      analysisId: '',
      accessibilityTree: '',
      computedRoles: [],
      screenReaderNarration: '',
      elementInfo: {},
      error: message,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
