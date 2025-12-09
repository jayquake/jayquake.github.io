# SDK Disabled in Playwright Tests

## Summary of Changes

All AccessFlow SDK usage has been temporarily commented out in the Playwright E2E tests.

## Files Modified

### 1. `test-suite/global-teardown.js`

- Commented out SDK import
- Commented out SDK teardown call
- Added console log for tracking

### 2. `test-suite/tests/graphics-audit.spec.js`

- Commented out SDK import and initialization
- Commented out SDK instantiation and audit calls
- Tests now skip audits with logging

### 3. `test-suite/tests/breadcrumb-toggle-audit.spec.js`

- Commented out SDK import and initialization
- Commented out all SDK instantiation and audit calls
- Added mock return values for navigation testing
- Tests focus on UI navigation without audits

### 4. `test-suite/tests/fake-hidden-content-audit.spec.js`

- Commented out SDK import and initialization
- Commented out audit calls (mock data still works)
- Tests skip audits but verify navigation

### 5. `test-suite/tests/search.spec.js`

- Commented out SDK import and initialization
- Commented out SDK instantiation and audit call
- Tests focus on search functionality without audits

### 6. `test-suite/tests/navigation-audit-timing.spec.js`

- Commented out SDK import
- Set `ENABLE_SDK_AUDIT = false`
- Commented out SDK initialization
- All SDK calls already wrapped in `if (ENABLE_SDK_AUDIT)` checks

## Why SDK Was Disabled

- Temporary measure to run tests without SDK dependencies
- Allows testing of UI functionality and navigation
- Reduces external dependencies and potential failures
- Faster test execution

## What Still Works

✅ **Navigation Tests** - All breadcrumb and page navigation
✅ **Search Tests** - Search input and filter functionality
✅ **UI Interaction** - Buttons, dropdowns, modals
✅ **Timing Measurements** - Page load and navigation timing
✅ **Visual Verification** - Element visibility and content

## What Is Skipped

❌ **Accessibility Audits** - No SDK audit reports generated
❌ **Threshold Validation** - Cannot verify accessibility thresholds
❌ **Issue Detection** - No accessibility issue detection

## Re-enabling SDK

To re-enable SDK in the future:

1. **Uncomment all SDK imports:**

   ```javascript
   // Change from:
   // import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
   // To:
   import { AccessFlowSDK } from "@acsbe/accessflow-sdk";
   ```

2. **Uncomment SDK initialization:**

   ```javascript
   // Change from:
   // AccessFlowSDK.init({ apiKey: "..." });
   // To:
   AccessFlowSDK.init({ apiKey: "..." });
   ```

3. **Uncomment SDK instantiation and audit calls**
   Remove `//` from all SDK-related lines marked with `TODO: Temporarily commented out SDK`

4. **For navigation-audit-timing.spec.js:**
   ```javascript
   // Change from:
   const ENABLE_SDK_AUDIT = false;
   // To:
   const ENABLE_SDK_AUDIT = true;
   ```

## Running Tests

Tests can now be run without SDK:

```bash
# Run all tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- tests/breadcrumb-toggle-audit.spec.js

# Run in UI mode
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed
```

## Test Results

All tests should pass with SDK disabled:

- ✅ Breadcrumb navigation tests
- ✅ Search component tests
- ✅ Graphics page navigation
- ✅ Fake hidden content navigation
- ✅ Navigation timing tests

---

**Date:** December 9, 2025
**Status:** SDK Temporarily Disabled
**Impact:** Tests focus on UI/UX functionality without accessibility audits
