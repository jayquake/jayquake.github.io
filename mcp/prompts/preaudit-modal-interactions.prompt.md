# Pre-audit Actions Modal Interactions - AI Test Generation Prompt

## Context
You are generating Playwright tests for the **Pre-audit Actions** section in AccessFlow's Site Settings page. Focus specifically on the "Add manually" button functionality and various modal closing methods.

## Key UI Elements (Based on Screenshots)
```
Pre-audit actions
Configure steps to execute before the audit starts (e.g. login wall bypass, or accept cookie consent). Learn more

┌─────────────────────────────────────────────────────────────┐
│ 🔒 Pre-audit actions     ℹ️                                  │
│     No actions configured                                   │
│                                    [+ Add manually] [● Record steps] │
└─────────────────────────────────────────────────────────────┘
```

## Test Scenarios to Generate

### 1. Modal Opening & Closing Combinations
- **Open via "Add manually"** → **Close with X button**
- **Open via "Add manually"** → **Close by clicking outside modal**  
- **Open via "Add manually"** → **Close with Cancel button**
- **Open via "Add manually"** → **Close with ESC key**

### 2. Modal State Management
- **Multiple rapid clicks** on "Add manually" (should only open one modal)
- **Click inside modal** (should NOT close modal)
- **Verify modal elements** are present (title, buttons, form fields)

### 3. Edge Cases
- **Record steps button** interactions
- **Modal persistence** during form interactions
- **Keyboard navigation** within modal

## Existing Page Objects & Methods

### SiteSettingsPage Methods
```typescript
// Navigation & Validation
await pageManager.siteSettingsPage().navigateToSiteSettingsPage();
await pageManager.siteSettingsPage().validateSiteSettingsPage();

// Pre-audit Actions
await pageManager.siteSettingsPage().validatePreAuditActionsEmptyState();
await pageManager.siteSettingsPage().clickAddManuallyButton();
await pageManager.siteSettingsPage().clickRecordStepsButton();
await pageManager.siteSettingsPage().validateRecordStepsButtonVisible();
```

### PreAuditActionsModal Methods
```typescript
// Modal Visibility
await pageManager.preAuditActionsModal().verifyModalIsVisible();
await pageManager.preAuditActionsModal().verifyModalIsClosed();
await pageManager.preAuditActionsModal().verifyModalTitle('Pre-audit actions');

// Modal Interactions
await pageManager.preAuditActionsModal().clickCloseButton();
await pageManager.preAuditActionsModal().clickCancelButton();
await pageManager.preAuditActionsModal().clickApplyButton();
await pageManager.preAuditActionsModal().clickOutsideModal();
await pageManager.preAuditActionsModal().clickInsideModal();
await pageManager.preAuditActionsModal().pressEscapeKey();

// Modal Validation
await pageManager.preAuditActionsModal().verifyCloseButtonVisible();
await pageManager.preAuditActionsModal().verifyCancelButtonVisible();
await pageManager.preAuditActionsModal().verifyApplyButtonVisible();
await pageManager.preAuditActionsModal().verifyOnlyOneModalIsOpen();
```

## Test Structure Template

```typescript
import { qase } from 'playwright-qase-reporter';
import { test } from '../../../utils/fixtures';

test.describe('Pre-Audit Actions - Modal Interactions', () => {
  test.beforeEach(async ({ trialSetup }) => {
    await trialSetup;
  });

  test('Test Name Here', async ({ pageManager }) => {
    qase.id(XXXX); // Use appropriate Qase ID
    
    await pageManager.siteSettingsPage().navigateToSiteSettingsPage();
    await pageManager.siteSettingsPage().validateSiteSettingsPage();
    await pageManager.general().closeZendeskMessage();

    await test.step('Step description', async () => {
      // Test implementation
    });
  });
});
```

## Expected User Flows (From Screenshots)

### Flow 1: Open & Close by X
1. Navigate to Site Settings > Pre-audit actions
2. Select "Add manually" to open modal  
3. Click X button to close modal

### Flow 2: Open & Close by Outside Click
1. Navigate to Site Settings > Pre-audit actions
2. Select "Add manually" to open modal
3. Click outside modal to close

### Flow 3: Open & Close by Cancel
1. Navigate to Site Settings > Pre-audit actions  
2. Select "Add manually" to open modal
3. Click Cancel button to close

## Qase Integration
- Use appropriate `qase.id()` for each test
- Follow existing pattern from other site settings tests
- Include comprehensive test steps with `await test.step()`

## Guidelines
- Focus on **modal interaction patterns** rather than form validation
- Test **all closing methods** thoroughly
- Verify **empty state returns** after modal closes
- Include **edge cases** like rapid clicking and keyboard interactions
- Follow **existing test patterns** from the codebase
- Use **descriptive test names** that clearly indicate the interaction being tested

Generate comprehensive, focused tests that specifically validate the "Add manually" button and modal closing behavior shown in the provided screenshots.
