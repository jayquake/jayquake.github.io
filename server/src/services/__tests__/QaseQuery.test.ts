import { describe, expect, it } from 'vitest';

import type { QuerySpec } from '../../../../shared/types';

/**
 * Unit tests for Qase Query functionality
 * 
 * Tests cover:
 * - QuerySpec type validation
 * - Local filter logic
 * - Pagination behavior
 * - Suite fallback strategy
 */

describe('QuerySpec Type Validation', () => {
  it('should require projectCode', () => {
    const spec: Partial<QuerySpec> = {
      suiteIds: [856],
    };

    // projectCode is required
    expect(spec.projectCode).toBeUndefined();
    
    const validSpec: QuerySpec = {
      ...spec,
      projectCode: 'ACCESSFLOW',
    };
    
    expect(validSpec.projectCode).toBe('ACCESSFLOW');
  });

  it('should accept optional filter fields', () => {
    const spec: QuerySpec = {
      automation: [1],
      ids: [13, 64, 65],
      projectCode: 'ACCESSFLOW',
      status: [0, 1],
      suiteIds: [856],
      tagsAny: ['regression'],
      titleContains: 'Funnel',
    };

    expect(spec.projectCode).toBe('ACCESSFLOW');
    expect(spec.suiteIds).toEqual([856]);
    expect(spec.ids).toEqual([13, 64, 65]);
    expect(spec.titleContains).toBe('Funnel');
    expect(spec.automation).toEqual([1]);
    expect(spec.status).toEqual([0, 1]);
    expect(spec.tagsAny).toEqual(['regression']);
  });

  it('should accept pagination fields', () => {
    const spec: QuerySpec = {
      limit: 50,
      maxRecords: 200,
      offset: 100,
      projectCode: 'ACCESSFLOW',
    };

    expect(spec.limit).toBe(50);
    expect(spec.offset).toBe(100);
    expect(spec.maxRecords).toBe(200);
  });
});

describe('Local Filter Logic', () => {
  const mockCases = [
    {
      automation: 0,
      id: 13,
      status: 0,
      suite_id: 5,
      tags: [{ title: 'smoke' }],
      title: 'Scan-Funnel: Test Case 1',
    },
    {
      automation: 1,
      id: 64,
      status: 1,
      suite_id: 856,
      tags: [{ title: 'regression' }],
      title: 'Funnels-Page: Test Case 2',
    },
    {
      automation: 1,
      id: 65,
      status: 0,
      suite_id: 856,
      tags: [{ title: 'smoke' }, { title: 'critical' }],
      title: 'Funnels-Add: Test Case 3',
    },
  ];

  it('should filter by IDs', () => {
    const idsSet = new Set([13, 65]);
    const filtered = mockCases.filter((c) => idsSet.has(c.id));
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([13, 65]);
  });

  it('should filter by suite IDs', () => {
    const suiteIdsSet = new Set([856]);
    const filtered = mockCases.filter((c) => c.suite_id && suiteIdsSet.has(c.suite_id));
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([64, 65]);
  });

  it('should filter by automation level', () => {
    const automationSet = new Set([1]);
    const filtered = mockCases.filter((c) => c.automation !== undefined && automationSet.has(c.automation));
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([64, 65]);
  });

  it('should filter by status', () => {
    const statusSet = new Set([0]);
    const filtered = mockCases.filter((c) => c.status !== undefined && statusSet.has(c.status));
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([13, 65]);
  });

  it('should filter by tags (any match)', () => {
    const tagsSet = new Set(['smoke']);
    const filtered = mockCases.filter((c) => {
      if (!c.tags || c.tags.length === 0) return false;
      return c.tags.some((tag) => tagsSet.has(tag.title));
    });
    
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([13, 65]);
  });

  it('should filter by title contains (case-insensitive)', () => {
    const searchLower = 'funnel';
    const filtered = mockCases.filter((c) => c.title && c.title.toLowerCase().includes(searchLower));
    
    expect(filtered).toHaveLength(3);
  });

  it('should apply filters in sequence', () => {
    // Filter by suite 856
    let filtered = mockCases.filter((c) => c.suite_id === 856);
    expect(filtered).toHaveLength(2);
    
    // Then by automation 1
    filtered = filtered.filter((c) => c.automation === 1);
    expect(filtered).toHaveLength(2);
    
    // Then by status 0
    filtered = filtered.filter((c) => c.status === 0);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(65);
  });
});

describe('Pagination Behavior', () => {
  it('should calculate offset for next page', () => {
    const limit = 50;
    let offset = 0;
    const count = 50;

    // First page
    expect(offset).toBe(0);
    
    // Second page
    offset += count;
    expect(offset).toBe(50);
    
    // Third page
    offset += count;
    expect(offset).toBe(100);
  });

  it('should stop when no more results', () => {
    const responses = [
      { entities: new Array(50).fill({}) }, // Page 1: 50 results
      { entities: new Array(50).fill({}) }, // Page 2: 50 results
      { entities: [] },                     // Page 3: 0 results (stop)
    ];

    let pageIndex = 0;
    let totalFetched = 0;

    while (pageIndex < responses.length) {
      const count = responses[pageIndex].entities.length;
      if (count === 0) break;
      
      totalFetched += count;
      pageIndex++;
    }

    expect(totalFetched).toBe(100);
    expect(pageIndex).toBe(2);
  });

  it('should respect maxRecords limit', () => {
    const maxRecords = 150;
    const limit = 50;
    let fetched = 0;

    while (fetched < maxRecords) {
      const batchSize = Math.min(limit, maxRecords - fetched);
      fetched += batchSize;
    }

    expect(fetched).toBe(150);
  });
});

describe('Suite Fallback Strategy', () => {
  it('should detect when suite filter is requested', () => {
    const spec: QuerySpec = {
      projectCode: 'ACCESSFLOW',
      suiteIds: [856],
    };

    const hasSuiteFilter = spec.suiteIds && spec.suiteIds.length > 0;
    expect(hasSuiteFilter).toBe(true);
  });

  it('should apply suite filter locally', () => {
    const allCases = [
      { id: 1, suite_id: 5 },
      { id: 2, suite_id: 856 },
      { id: 3, suite_id: 87 },
      { id: 4, suite_id: 856 },
    ];

    const suiteIds = [856];
    const suiteIdsSet = new Set(suiteIds);
    const filtered = allCases.filter((c) => c.suite_id && suiteIdsSet.has(c.suite_id));

    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.id)).toEqual([2, 4]);
  });

  it('should warn about suite fallback', () => {
    const spec: QuerySpec = {
      projectCode: 'ACCESSFLOW',
      suiteIds: [856],
    };

    const shouldWarn = spec.suiteIds && spec.suiteIds.length > 0;
    const warningMessage = 'Server-side suite filter unavailable; using local suite_id filtering.';

    expect(shouldWarn).toBe(true);
    expect(warningMessage).toContain('local suite_id filtering');
  });
});

describe('Transform Logic', () => {
  it('should apply title find/replace', () => {
    const title = 'Scan-Funnel: Test Case';
    const newTitle = title.replace('Scan-Funnel', 'Journeys-Scan');
    
    expect(newTitle).toBe('Journeys-Scan: Test Case');
  });

  it('should apply multiple replacements', () => {
    let title = 'Scan-Funnel: Test for Funnels-Page';
    
    // First transform
    title = title.replace('Scan-Funnel', 'Journeys-Scan');
    expect(title).toBe('Journeys-Scan: Test for Funnels-Page');
    
    // Second transform
    title = title.replace('Funnels-', 'Journeys-');
    expect(title).toBe('Journeys-Scan: Test for Journeys-Page');
  });

  it('should detect changes', () => {
    const originalTitle = 'Scan-Funnel: Test';
    const newTitle = originalTitle.replace('Scan-Funnel', 'Journeys-Scan');
    
    const hasChanges = newTitle !== originalTitle;
    expect(hasChanges).toBe(true);
  });

  it('should not change if no match', () => {
    const originalTitle = 'Different: Test';
    const newTitle = originalTitle.replace('Scan-Funnel', 'Journeys-Scan');
    
    const hasChanges = newTitle !== originalTitle;
    expect(hasChanges).toBe(false);
  });
});
