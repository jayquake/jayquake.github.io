import { theme, raidenType } from './theme';
import { MIN_TEXT_SIZE } from './theme/mgsTokens';

describe('Theme font size floor (12px)', () => {
  /**
   * Convert font size (number, px, or rem) to pixels.
   * Strictly validates format: numeric values must be finite; strings must match {N}px or {N}rem exactly.
   */
  function convertToPx(value: string | number): number {
    if (typeof value === 'number') {
      if (!isFinite(value)) {
        throw new Error(`Invalid font size: number must be finite, received: ${value}`);
      }
      return value;
    }
    if (typeof value === 'string') {
      // Strict regex: numeric part (int or decimal) followed by unit only
      const pxMatch = value.match(/^(\d+(?:\.\d+)?)px$/);
      if (pxMatch) {
        return parseFloat(pxMatch[1]);
      }
      const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
      if (remMatch) {
        // Assume base font size is 16px (browser default)
        return parseFloat(remMatch[1]) * 16;
      }
    }
    throw new Error(`Unsupported font size unit or format: ${value}. Expected: number, "{N}px", or "{N}rem"`);
  }

  describe('convertToPx utility', () => {
    it('converts finite numbers as-is', () => {
      expect(convertToPx(12)).toBe(12);
      expect(convertToPx(0.5)).toBe(0.5);
    });

    it('rejects non-finite numbers', () => {
      expect(() => convertToPx(Infinity)).toThrow(/must be finite/);
      expect(() => convertToPx(NaN)).toThrow(/must be finite/);
    });

    it('converts px and rem strings correctly', () => {
      expect(convertToPx('12px')).toBe(12);
      expect(convertToPx('0.72rem')).toBe(11.52);
    });

    it('rejects malformed px/rem strings', () => {
      expect(() => convertToPx('12garbagepx')).toThrow(/Unsupported font size/);
      expect(() => convertToPx('Infinityrem')).toThrow(/Unsupported font size/);
      expect(() => convertToPx('12em')).toThrow(/Unsupported font size/);
      expect(() => convertToPx('px12')).toThrow(/Unsupported font size/);
    });
  });

  describe('MIN_TEXT_SIZE constant', () => {
    it('should define MIN_TEXT_SIZE as 12px', () => {
      expect(MIN_TEXT_SIZE).toBeDefined();
      const px = convertToPx(MIN_TEXT_SIZE);
      expect(px).toBe(12);
    });
  });

  describe('Theme typography variants', () => {
    it('subtitle2 fontSize should be >= 12px', () => {
      const fontSize = theme.typography.subtitle2?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });

    it('overline fontSize should be >= 12px', () => {
      const fontSize = theme.typography.overline?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });

    it('caption fontSize should be >= 12px', () => {
      const fontSize = theme.typography.caption?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });
  });

  describe('MuiButton component overrides', () => {
    it('root fontSize should be >= 12px', () => {
      const fontSize = (theme.components?.MuiButton?.styleOverrides?.root as any)?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });
  });

  describe('MuiChip component overrides', () => {
    it('root fontSize should be >= 12px', () => {
      const fontSize = (theme.components?.MuiChip?.styleOverrides?.root as any)?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });
  });

  describe('MuiTab component overrides', () => {
    it('root fontSize should be >= 12px', () => {
      const fontSize = (theme.components?.MuiTab?.styleOverrides?.root as any)?.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });
  });

  describe('raidenType preset typography', () => {
    it('tableHead fontSize should be >= 12px', () => {
      const fontSize = raidenType.tableHead.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });

    it('ruleId fontSize should be >= 12px', () => {
      const fontSize = raidenType.ruleId.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });

    it('sectionLabel fontSize should be >= 12px', () => {
      const fontSize = raidenType.sectionLabel.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });

    it('navLabel fontSize should be >= 12px', () => {
      const fontSize = raidenType.navLabel.fontSize;
      expect(fontSize).toBeDefined();
      const px = convertToPx(fontSize!);
      expect(px).toBeGreaterThanOrEqual(12);
    });
  });
});
