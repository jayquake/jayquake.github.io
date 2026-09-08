# Application Font-Size Floor Design

## Goal

Ensure product UI text renders at a minimum of 12px across the application while preserving intentionally undersized accessibility test fixtures.

## Context

AccessFlow reported `Font-Sizes-2a5d8a11e7` on Engine Rules pages. The reported selector resolves to a MUI `Typography` link in the shared rules table whose explicit `0.68rem` size renders below 12px. The application theme and product UI also contain other text sizes below the rule's threshold.

A blanket rule such as `body * { font-size: 15px; }` is not suitable because it would override typography hierarchy, alter component behavior, and invalidate intentional failure fixtures.

## Design

Use `0.75rem` as the minimum product UI text size, equivalent to 12px with the application's default 16px root size.

1. Add a named minimum font-size token to the shared theme tokens.
2. Raise MUI typography variants and text-bearing component defaults below the floor.
3. Replace explicit sub-12px text sizes in application-shell and product UI components with the shared minimum token.
4. Do not alter intentional engine-rule examples or other fixtures whose purpose is to exercise undersized-text detection.
5. Do not apply a universal descendant selector or `!important` override.

Icon dimensions, decorative geometry, and other non-text `fontSize` values are outside scope.

## Boundaries

Product UI includes navigation, tables, filters, rule details, Rule Lab, test-management views, result views, and shared standalone components.

Intentional fixtures include success/failure example components and fixture content under engine-rule and legacy criteria test areas when their typography is part of the condition under test.

## Verification

- Add a focused regression test that checks shared theme typography and text-bearing component defaults do not fall below 12px.
- Run focused tests for modified components where available.
- Run the production build to catch TypeScript, JavaScript, and styling integration failures.
- Re-scan the affected pages through AccessFlow when the updated application is available.

## Success Criteria

- The reported Engine Rules table links render at 12px or larger.
- Shared product UI typography defaults render at 12px or larger.
- Explicit product UI text overrides below 12px are removed or raised.
- Intentional font-size failure fixtures continue to test text below 12px.
- Existing typography hierarchy, layout, and interaction behavior remain intact.
