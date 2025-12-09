# Example Navigation Flow - Engine Rules UI

This document demonstrates a complete navigation flow through the engine rules UI using the **button-discernible** rule as an example.

## 🎯 Complete User Journey

### Step 1: Rule Detail Page
**URL**: `/engine/button-discernible`

#### What the User Sees:

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Home > Engine Rules > Button Discernible                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔬 Engine Rule Details                                         │
│  This is an automated accessibility validation rule from        │
│  the audit engine with comprehensive testing coverage.          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Button Discernible                                      │  │
│  │  Rule ID: button-discernible                             │  │
│  │                                                           │  │
│  │  Buttons that do not contain visible text should be      │  │
│  │  assigned labels that informs screen reader users of     │  │
│  │  their purpose.                                           │  │
│  │                                                           │  │
│  │  [🔬 Engine Rule] [⚖️ Impact: Major] [♿ WCAG Compliant]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  📋 Description                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Buttons that do not contain visible text should be      │  │
│  │  assigned labels that informs screen reader users of     │  │
│  │  their purpose.                                           │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  💡 Implementation Advice                                       │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  [Copy Button]                                            │  │
│  │  Use aria-label, aria-labelledby, or visible text to     │  │
│  │  provide an accessible name for buttons without text.    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  View Examples                                                  │
│  Explore both successful implementations and common failures    │
│                                                                  │
│  [✅ Success Examples]    [❌ Failure Examples]                 │
│                                                                  │
│  🔗 References & Documentation                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  WCAG 4.1.2 - Level A                                     │  │
│  │  [View WCAG Guideline]                                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### User Actions:
- ✅ Click "Success Examples" button → Navigate to `/engine/button-discernible_success`
- ❌ Click "Failure Examples" button → Navigate to `/engine/button-discernible_failure`
- 📋 Click copy button → Copy implementation advice to clipboard
- 🔗 Click WCAG links → Open WCAG documentation in new tab

---

### Step 2A: Success Examples Page
**URL**: `/engine/button-discernible_success`

#### What the User Sees:

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Home > Engine Rules > Button Discernible > Success          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ Accessibility Success Examples                              │
│  Buttons that do not contain visible text should be assigned    │
│  labels that informs screen reader users of their purpose.      │
│                                                                  │
│  [✅ Compliant] [ℹ️ 9 Examples]                                 │
│                                                                  │
│  💡 Understanding Best Practices [Expand ▼]                     │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Best Practices:                                          │  │
│  │  • Follow proper HTML semantics for button discernible   │  │
│  │  • Ensure accessibility attributes are correctly applied  │  │
│  │  • Test with assistive technologies to verify            │  │
│  │  • Refer to WCAG guidelines for best practices           │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ✅ Success Examples                                            │
│  The following examples demonstrate proper accessibility        │
│  implementation. These patterns show how to create inclusive    │
│  and compliant code.                                            │
│  ──────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✅ Success Example #1  [Best Practice ✓]  [📋 Copy]     │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <label for="my-button">Download</label>            │   │  │
│  │  │ <button id="my-button"></button>                    │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✅ Success Example #2  [Best Practice ✓]  [📋 Copy]     │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <label id="my-label">Download</label>              │   │  │
│  │  │ <button aria-labelledby="my-label"></button>       │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✅ Success Example #3  [Best Practice ✓]  [📋 Copy]     │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <button aria-label="Download"></button>            │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✅ Success Example #4  [Best Practice ✓]  [📋 Copy]     │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <button>                                            │   │  │
│  │  │   <svg>...</svg>                                    │   │  │
│  │  │   <span class="sr-only">Search</span>              │   │  │
│  │  │ </button>                                           │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  💡 Tip: Use the copy button to grab example code.             │
│  These examples show the correct way to implement               │
│  accessibility features.                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### User Actions:
- 📋 Click copy button on any example → Copy that example's HTML to clipboard
- 🔍 Review each example to understand correct patterns
- 💡 Expand/collapse best practices section
- ← Navigate back via breadcrumbs

---

### Step 2B: Failure Examples Page
**URL**: `/engine/button-discernible_failure`

#### What the User Sees:

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Home > Engine Rules > Button Discernible > Failure          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ❌ Accessibility Failure Detected                              │
│  Buttons that do not contain visible text should be assigned    │
│  labels that informs screen reader users of their purpose.      │
│                                                                  │
│  [🐛 Needs Fix] [ℹ️ 9 Examples]                                │
│                                                                  │
│  ℹ️ Understanding This Issue [Expand ▼]                         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  How to Fix:                                              │  │
│  │  • Identify and fix button discernible issues in code    │  │
│  │  • Add aria-label, aria-labelledby, or visible text      │  │
│  │  • Validate changes with accessibility testing tools     │  │
│  │  • Retest with assistive technologies                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ❌ Failure Examples                                            │
│  The following examples demonstrate common accessibility        │
│  failures. Review each example to understand what makes it      │
│  problematic.                                                   │
│  ──────────────────────────────────────────────────────────    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ❌ Failure Example #1  [Accessibility Issue 🐛] [📋]    │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <button>                                            │   │  │
│  │  │   <span aria-hidden="true">Download</span>         │   │  │
│  │  │ </button>                                           │   │  │
│  │  │                                                      │   │  │
│  │  │ ⚠️ Issue: Text is hidden from screen readers       │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ❌ Failure Example #2  [Accessibility Issue 🐛] [📋]    │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <button>                                            │   │  │
│  │  │   <span style="display: none;">Download</span>     │   │  │
│  │  │ </button>                                           │   │  │
│  │  │                                                      │   │  │
│  │  │ ⚠️ Issue: Text is hidden with CSS                  │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ❌ Failure Example #3  [Accessibility Issue 🐛] [📋]    │  │
│  │  ┌───────────────────────────────────────────────────┐   │  │
│  │  │ <button></button>                                   │   │  │
│  │  │                                                      │   │  │
│  │  │ ⚠️ Issue: No label or text content                 │   │  │
│  │  └───────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│  💡 Tip: Use the copy button to grab example code.             │
│  Each example shows a specific way this accessibility rule      │
│  can fail.                                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### User Actions:
- 📋 Click copy button on any example → Copy that example's HTML to clipboard
- 🔍 Review each example to understand what NOT to do
- 🔧 Expand/collapse fix steps section
- ← Navigate back via breadcrumbs

---

## 🔄 Navigation Patterns

### Pattern 1: Rule → Success → Back to Rule
```
/engine/button-discernible
  ↓ (click Success Examples)
/engine/button-discernible_success
  ↓ (click breadcrumb)
/engine/button-discernible
```

### Pattern 2: Rule → Failure → Back to Rule
```
/engine/button-discernible
  ↓ (click Failure Examples)
/engine/button-discernible_failure
  ↓ (click breadcrumb)
/engine/button-discernible
```

### Pattern 3: Rule → Success → Rule → Failure (Compare Pattern)
```
/engine/button-discernible
  ↓ (click Success Examples)
/engine/button-discernible_success
  ↓ (navigate back)
/engine/button-discernible
  ↓ (click Failure Examples)
/engine/button-discernible_failure
```

### Pattern 4: Direct Navigation (Bookmarked)
Users can bookmark and directly navigate to any page:
- `/engine/button-discernible` - Rule details
- `/engine/button-discernible_success` - Success examples
- `/engine/button-discernible_failure` - Failure examples

---

## 📊 Example Statistics for button-discernible

### Success Examples (9 total):
1. button-for-other-element.html
2. button-labled-by-other-element.html
3. button-no-text-with-aria-label.html
4. button-svg-icon-labelled.html
5. button-with-discernible-image.html
6. button-with-text.html
7. cart-button-with-aria-label.html
8. invisible-button-with-text.html
9. plus-minus-buttons-with-aria-labels.html

### Failure Examples (9 total):
1. button-aria-hidden-child-with-text.html
2. button-display-none-child-with-text.html
3. button-no-text.html
4. button-non-interactable-child.html
5. button-svg-icon.html
6. button-with-non-discernible-image.html
7. cart-button-without-aria-label.html
8. plus-minus-buttons-without-aria-labels.html
9. role-button-with-hidden-text.html

---

## 🎯 Key Features Demonstrated

### ✅ On Success Page:
- **Green Theme**: Positive, encouraging design
- **Multiple Examples**: 9 different correct implementations
- **Best Practices**: Expandable section with guidelines
- **Copy Functionality**: Each example can be copied
- **Example Titles**: Descriptive names from filenames

### ❌ On Failure Page:
- **Red Theme**: Warning, alert design
- **Multiple Examples**: 9 different failure patterns
- **Fix Steps**: Expandable section with remediation
- **Copy Functionality**: Each example can be copied
- **Issue Badges**: Clear "Accessibility Issue" labels

### 📋 On Rule Detail Page:
- **Comprehensive Info**: Full rule description
- **Implementation Advice**: Actionable guidance
- **Impact Level**: Severity indicator
- **WCAG Links**: Direct links to standards
- **Navigation Buttons**: Clear paths to examples

---

## 💡 User Benefits

### For Developers:
- See correct implementations before making changes
- Understand common mistakes to avoid
- Copy-paste example code
- Learn from real-world patterns
- Quick reference during development

### For Accessibility Specialists:
- Educate team members on rules
- Document compliance requirements
- Create training materials
- Review and audit patterns
- Reference WCAG standards

### For QA Engineers:
- Understand what to test
- Create test cases from examples
- Validate implementations
- Document issues found
- Track compliance

---

**This complete flow is available for all 156 engine rules!**

Each rule follows this exact pattern:
- Detailed rule page with advice and references
- Success page with passing examples
- Failure page with failing examples
- Seamless navigation between all three

