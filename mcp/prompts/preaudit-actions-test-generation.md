# Test Generation Prompt for Pre-audit Actions Management

## Context
You are working with a Playwright test automation framework for the AccessFlow application. The focus is on testing the "Settings > Site Settings > Pre-audit actions > Manage" functionality, which handles bypass login configurations for website auditing.

## Current Implementation
- **Test File**: `site-settings-preaudit-manage-clean.spec.ts`
- **Page Object**: `SiteSettingsPage` with methods for managing site access settings
- **Modal Objects**: `UserAgentModal`, `CookieDetailsModal`, `CustomHeaderModal`, `AuthPromptModal`
- **Fixture Pattern**: Uses `trialSetup` fixture for environment setup

## Existing Test Coverage

### 1. CRUD Operations for Site Access Settings
- **User Agent**: Create, Read, Update, Delete user agent strings
- **Cookie Details**: Manage cookies for maintaining session state
- **Custom Headers**: Configure HTTP headers for audit requests
- **Auth Prompt**: Set up authentication credentials for protected sites

### 2. UI/UX Validation
- Tooltip validation for all configuration sections
- Empty state validation and proper button visibility
- Form validation and error handling

### 3. Error Handling
- Required field validation (username/password)
- Invalid input scenarios

## Available Page Object Methods

### SiteSettingsPage Methods
```typescript
// Navigation
navigateToSiteSettingsPage()
validateSiteSettingsPage()

// User Agent
validateUserAgentEmptyState()
validateUserAgentFilledSuccessfully(expected?: RegExp | string)
validateEditedUserAgent(expected?: RegExp | string)
openUserAgentModal()
openDeleteUserAgentModal()

// Cookie Details  
validateCookieDetailsEmptyState()
validateCookieFilledSuccessfully(expected?: RegExp | string)
validateEditedCookieDetails(expected?: RegExp | string)
openCookieDetailsModal()
openDeleteCookieDetailsModal()

// Custom Header
validateCustomHeaderEmptyState()
validateCustomHeaderFilledSuccessfully(expected?: RegExp | string)
validateEditedCustomHeader(expected?: RegExp | string)
openCustomHeaderModal()
openDeleteCustomHeaderModal()

// Auth Prompt
validateAuthPromptEmptyState()
validateAuthPromptFilledSuccessfully(username?: string)
validateEditedAuthPrompt(username?: string)
openAuthPromptModal()
openDeleteAuthPromptModal()

// Tooltips
hoverAndValidateUserAgentTooltip(sectionName: string, tooltipText: string)
hoverAndValidateCookieTooltip(sectionName: string, tooltipText: string)
hoverAndValidateCustomHeaderTooltip(sectionName: string, tooltipText: string)
hoverAndValidateAuthPromptTooltip(sectionName: string, tooltipText: string)
```

### Modal Methods
```typescript
// Common Modal Methods
verifyModalIsVisible()
closeModalX()
followCtaApply()
validateErrorMessageVisible()

// UserAgentModal
fillUserAgentFormValid(userAgent: string)

// CookieDetailsModal  
fillCookieFormValid(cookieString: string)

// CustomHeaderModal
fillCustomHeaderFormValid(headerName: string, headerValue: string)

// AuthPromptModal
fillAuthPromptFormValid(username: string, password: string)
confirmDeleteAuthPrompt()
authPromptDeleteConfirmationHeading
```

## Related Qase Test Cases
Based on the existing test database, here are relevant test case IDs:

- **3894**: Auth Prompt CRUD operations
- **3893, 3898**: Auth Prompt validation (empty username/password)
- **3599, 3525**: Manual/Recording bypass login setup  
- **3600, 3601, 3602, 3603**: Pre-audit actions error handling
- **3900-3904**: Placeholder IDs for new test coverage

## Test Pattern Example
```typescript
test('Configuration Name - Action Description', async ({ pageManager }) => {
  qase.id(XXXX);

  await pageManager.siteSettingsPage().navigateToSiteSettingsPage();
  await pageManager.siteSettingsPage().validateSiteSettingsPage();
  await pageManager.general().closeZendeskMessage();

  await test.step('Step Description', async () => {
    // Test implementation
  });
});
```

## Generate Tests For

Please generate comprehensive Playwright tests focusing on:

1. **Advanced Error Scenarios**:
   - Invalid cookie format validation
   - Invalid custom header format validation  
   - Invalid user agent string handling
   - Network error handling during save operations
   - Concurrent modification scenarios

2. **Edge Cases**:
   - Maximum length input validation
   - Special character handling
   - Unicode character support
   - Boundary value testing

3. **Integration Scenarios**:
   - Configuration persistence across page reloads
   - Multiple configurations interaction
   - Configuration priority handling
   - Audit integration validation

4. **Accessibility & Keyboard Navigation**:
   - Keyboard-only navigation through forms
   - Tab order validation
   - Screen reader compatibility
   - Focus management

5. **Performance & Load Testing**:
   - Large configuration handling
   - Rapid configuration changes
   - Memory leak detection
   - Response time validation

## Requirements
- Follow the existing test structure and naming conventions
- Use appropriate qase.id() references
- Include proper test steps with descriptive names
- Add comprehensive assertions and validations
- Include proper error handling and cleanup
- Follow the PageManager pattern for page interactions
- Use the trialSetup fixture for environment setup

## Expected Output
Provide well-structured Playwright test cases that can be added to the existing test suite, focusing on the areas not currently covered and following the established patterns.
