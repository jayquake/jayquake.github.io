# SDK Report Generation & CI Alignment

## Current Status

### ✅ JS/Node SDK (test-js)
**Status:** Fully configured ✅

- **Global Teardown:** ✅ Configured in `test-suite/global-teardown.js`
- **Report Finalization:** ✅ Calls `accessFlowSdkGlobalTeardown()`
- **CI Environment Variable:** `AF_Node_Package_Key`
- **CI Artifacts Uploaded:**
  - ✅ `js-playwright-report` (Playwright HTML report)
  - ✅ `js-test-results` (Test results + AccessFlow reports)
- **AccessFlow Report Location:** `test-suite/test-results/accessFlow-report-summary.json`

---

### ✅ Python SDK (test-python)
**Status:** Fully configured ✅

- **Session Teardown:** ✅ Configured in `python-tests/conftest.py`
- **Report Finalization:** ✅ Calls `finalize_reports()` via `@pytest.fixture(scope="session", autouse=True)`
- **Audit Recording:** ✅ Each test records audits via wrapped `sdk.audit()` method
- **CI Environment Variable:** `AF_Python_Package_Key`
- **CI Artifacts Uploaded:**
  - ✅ `python-test-results` (JUnit XML + AccessFlow reports)
- **AccessFlow Report Location:** `python-tests/test-results/`
- **Windows Encoding Fix:** ✅ Applied (UTF-8 encoding fix in v1.0.1)

---

### ⚠️ Java SDK (test-java)
**Status:** Missing report finalization ⚠️

- **Teardown:** ❌ NO report finalization in `@AfterAll`
- **Report Finalization:** ❌ NOT calling `AccessFlowTeardown.finalizeReports()`
- **Audit Recording:** ❌ NOT recording audits with `AccessFlowTeardown.recordAudit()`
- **CI Environment Variable:** ✅ `ACCESSFLOW_API_KEY` (correct, different from SDK install key)
- **CI Artifacts Uploaded:**
  - ✅ `java-test-results` (Surefire reports)
  - ❌ AccessFlow reports NOT being generated/uploaded
- **AccessFlow Report Location:** ❌ Not configured

---

## Required Changes

### 1. Java Test Suite Alignment

#### Update `AccessFlowSDKBehaviorTest.java`

Add report recording and finalization:

```java
package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;  // ADD THIS
import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;

import java.util.Map;  // ADD THIS

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AccessFlowSDKBehaviorTest {

    // ... existing code ...

    @AfterAll
    static void teardownAll() {
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
        
        // ADD THIS - Finalize and upload AccessFlow reports
        AccessFlowTeardown.finalizeReports();
    }

    // ... existing code ...

    @Test
    @Order(3)
    @DisplayName("Audit returns a report on the home page")
    void testAuditHomePage() {
        navigateAndWait("/");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        Map<String, Object> audits = sdk.audit();  // CHANGE from Object to Map
        
        // ADD THIS - Record audit for aggregation
        AccessFlowTeardown.recordAudit(page.url(), audits);
        
        assertNotNull(audits, "Audit report should not be null");
    }

    // ... repeat for ALL test methods that call sdk.audit() ...
}
```

---

### 2. CI Environment Variable Alignment

#### Current Variables (Inconsistent):
- JS: `AF_Node_Package_Key`
- Python: `AF_Python_Package_Key`
- Java: `ACCESSFLOW_API_KEY`

#### Recommended Standardization:

**Option A: Separate keys per SDK (Current approach)**
Keep as-is but document clearly:
- `AF_Node_Package_Key` - Node SDK authentication
- `AF_Python_Package_Key` - Python SDK authentication
- `ACCESSFLOW_API_KEY` - Java SDK authentication

**Option B: Unified key (Recommended)**
Use the same environment variable name across all SDKs:
```yaml
env:
  ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}
```

Update `.github/workflows/ci-test-deploy.yml`:
```yaml
- name: Run JS Playwright Tests
  run: npm run test:e2e
  env:
    CI: true
    ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}  # Changed

- name: Run Python Playwright Tests
  working-directory: python-tests
  run: pytest --junitxml=test-results/results.xml -v
  env:
    CI: true
    ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}  # Changed

- name: Run Java Playwright Tests
  working-directory: java-tests
  run: mvn test -B
  env:
    CI: true
    ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}  # Same
```

---

### 3. Accessibility Summary Enhancement

#### Current: Only shows JS results
```yaml
accessibility-summary:
  name: Accessibility Test Summary
  needs: test-js  # Only depends on JS
  runs-on: ubuntu-latest
  if: always()
  
  steps:
    - name: Download JS Test Results
      uses: actions/download-artifact@v4
      with:
        name: js-test-results
```

#### Enhanced: Show all SDK results
```yaml
accessibility-summary:
  name: Accessibility Test Summary (All SDKs)
  needs: [test-js, test-python, test-java]  # All SDKs
  runs-on: ubuntu-latest
  if: always()
  
  steps:
    - name: Download JS Test Results
      uses: actions/download-artifact@v4
      with:
        name: js-test-results
        path: js-results
      continue-on-error: true

    - name: Download Python Test Results
      uses: actions/download-artifact@v4
      with:
        name: python-test-results
        path: python-results
      continue-on-error: true

    - name: Download Java Test Results
      uses: actions/download-artifact@v4
      with:
        name: java-test-results
        path: java-results
      continue-on-error: true

    - name: Display Comprehensive AccessFlow Summary
      run: |
        echo "## Accessibility Test Summary (All SDKs)" >> $GITHUB_STEP_SUMMARY
        echo "" >> $GITHUB_STEP_SUMMARY
        
        # JS Results
        echo "### Node/JS SDK Results" >> $GITHUB_STEP_SUMMARY
        if [ -f "js-results/accessFlow-report-summary.json" ]; then
          echo "✅ AccessFlow audit completed" >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`json" >> $GITHUB_STEP_SUMMARY
          cat js-results/accessFlow-report-summary.json >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
        else
          echo "❌ No AccessFlow summary found" >> $GITHUB_STEP_SUMMARY
        fi
        echo "" >> $GITHUB_STEP_SUMMARY
        
        # Python Results
        echo "### Python SDK Results" >> $GITHUB_STEP_SUMMARY
        if [ -f "python-results/accessflow-local-report.json" ] || [ -f "python-results/accessflow-full-app-report.json" ]; then
          echo "✅ AccessFlow audit completed" >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`json" >> $GITHUB_STEP_SUMMARY
          cat python-results/accessflow-full-app-report.json 2>/dev/null || cat python-results/accessflow-local-report.json
          echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
        else
          echo "❌ No AccessFlow summary found" >> $GITHUB_STEP_SUMMARY
        fi
        echo "" >> $GITHUB_STEP_SUMMARY
        
        # Java Results
        echo "### Java SDK Results" >> $GITHUB_STEP_SUMMARY
        if [ -f "java-results/accessflow-report-summary.json" ]; then
          echo "✅ AccessFlow audit completed" >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`json" >> $GITHUB_STEP_SUMMARY
          cat java-results/accessflow-report-summary.json >> $GITHUB_STEP_SUMMARY
          echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
        else
          echo "⚠️ Java SDK not configured for report generation (needs AccessFlowTeardown.finalizeReports())" >> $GITHUB_STEP_SUMMARY
        fi
        
        echo "" >> $GITHUB_STEP_SUMMARY
        echo "### Test Artifacts" >> $GITHUB_STEP_SUMMARY
        echo "- 📦 \`js-playwright-report\` - Detailed JS Playwright HTML report" >> $GITHUB_STEP_SUMMARY
        echo "- 📦 \`js-test-results\` - JS test data + AccessFlow reports" >> $GITHUB_STEP_SUMMARY
        echo "- 📦 \`python-test-results\` - Python test data + AccessFlow reports" >> $GITHUB_STEP_SUMMARY
        echo "- 📦 \`java-test-results\` - Java test data" >> $GITHUB_STEP_SUMMARY
```

---

## Action Items

### Priority 1: Java SDK Report Generation
- [ ] Update `AccessFlowSDKBehaviorTest.java` to add `AccessFlowTeardown.finalizeReports()` in `@AfterAll`
- [ ] Add `AccessFlowTeardown.recordAudit()` calls in each test method
- [ ] Test locally to verify reports are generated
- [ ] Commit and push changes

### Priority 2: CI Workflow Enhancement
- [ ] Update `.github/workflows/ci-test-deploy.yml` to standardize environment variables
- [ ] Enhance `accessibility-summary` job to show all SDK results
- [ ] Test CI workflow on a branch

### Priority 3: Documentation
- [ ] Update README.md with report generation requirements
- [ ] Document environment variable usage
- [ ] Add troubleshooting section for missing reports

---

## Verification Checklist

After implementing changes, verify:

### Local Testing
- [ ] JS tests generate `test-results/accessFlow-report-summary.json`
- [ ] Python tests generate reports in `python-tests/test-results/`
- [ ] Java tests generate AccessFlow reports (after implementing teardown)

### CI Testing
- [ ] All three SDK test jobs pass
- [ ] Artifacts are uploaded for all three SDKs
- [ ] Accessibility summary shows results from all SDKs
- [ ] Reports are properly uploaded to AccessFlow dashboard (if configured)

### Cross-Platform
- [ ] Tests pass on Ubuntu (CI)
- [ ] Tests pass on Windows (Python SDK with UTF-8 fix)
- [ ] Tests pass on macOS (optional)

---

## Current Test Results

### Python SDK on Windows ✅
```
============================= test session starts =============================
platform win32 -- Python 3.13.7, pytest-9.0.2, pluggy-1.6.0
======================== 10 passed in 75.93s (0:01:15) ========================
```
**Status:** All tests passing with UTF-8 encoding fix applied

### Java SDK on Windows ✅ (Compilation)
```
Tests run: 7, Failures: 1, Errors: 4, Skipped: 0
```
**Status:** SDK loads correctly (no encoding errors), failures only due to missing API key

### JS/Node SDK
**Status:** Not tested on Windows locally, assumed working based on CI success
