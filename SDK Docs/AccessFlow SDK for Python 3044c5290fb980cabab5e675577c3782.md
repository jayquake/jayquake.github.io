# AccessFlow SDK for Python

# 

Professional accessibility testing for Python applications using Playwright.

AccessFlow SDK enables engineering teams to automatically detect **WCAG 2.1 accessibility issues** directly within automated test suites. Built for modern CI/CD workflows, it ensures accessibility validation is continuous, enforceable, and scalable.

---

# Overview

With AccessFlow SDK for Python, you can:

- ✅ Automatically detect WCAG 2.1 violations (A, AA, AAA)
- ✅ Integrate accessibility checks directly into Playwright tests
- ✅ Generate structured reports with severity levels and selectors
- ✅ Aggregate results across test runs
- ✅ Automatically upload reports in CI/CD environments
- ✅ Enforce accessibility quality gates per build

---

# Prerequisites

You will receive the following from the AccessFlow team:

| Item | Purpose |
| --- | --- |
| **Registry Install Token** | Install the SDK package |
| **Python Registry URL** | Private package registry location |
| **SDK API Key** | Authenticate audit requests at runtime |

> **Important:** The **Registry Install Token** is used to download/install the SDK package. The **SDK API Key** is used at runtime when running accessibility audits. These are two separate credentials.
> 

---

# Installation

### Option 1 — Install from Private Registry (Recommended)

### Direct Installation

```
pip install accessflow-sdk --index-url https://_json_key_base64:REGISTRY_INSTALL_TOKEN@PYTHON_REGISTRY_URL/simple/
```

Replace:

- `PYTHON_REGISTRY_URL`
- `REGISTRY_INSTALL_TOKEN`

with credentials provided by AccessFlow.

### **Option 2: Install from Local Package File**

If you've received a package file directly:

```bash
# Install from wheel file (recommended)
pip install /path/to/accessflow_sdk-1.0.1-py3-none-any.whl

# Or from tar.gz source distribution
pip install /path/to/accessflow_sdk-1.0.1.tar.gz
```

---

# Quick Start

## 1️⃣ Configure SDK API Key

### Recommended: Environment Variable

```python
export ACCESSFLOW_SDK_API_KEY=your-api-key
```

The SDK automatically reads this value — no additional configuration required.

---

### Optional: Pass API Key Explicitly

```python
sdk = AccessFlowSDK(page, api_key="your-api-key")
```

---

## 2️⃣ Basic Usage Example

```python
from playwright.sync_api import sync_playwright
from accessflow_sdk import AccessFlowSDK

def test_homepage_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Initialize SDK
        sdk = AccessFlowSDK(page)
        page.goto("https://example.com")

        # Run audit
        audits = sdk.audit()
        report = sdk.generate_report(audits)

        # Check results
        print("Issues found:", report["numberOfIssuesFound"])
        assert report["numberOfIssuesFound"].get("extreme", 0) == 0

        browser.close()
```

---

# Pytest Integration (Recommended)

### `conftest.py`

```python
import pytest
from accessflow_sdk import AccessFlowSDK, finalize_reports

@pytest.fixture
def sdk(page):
    """Provides AccessFlow SDK instance"""
    return AccessFlowSDK(page)

def pytest_sessionfinish(session, exitstatus):
    """
    Global teardown: finalize all accessibility reports.
    This runs once after all tests have completed.
    Aggregates and uploads reports in CI environments (when ACCESSFLOW_SDK_API_KEY is set).
    """
    finalize_reports()
```

### Test Example

**How it works:**

1. Each call to `sdk.audit()` automatically records results for aggregation
2. After all tests complete, `pytest_sessionfinish()` runs once to:
    - Aggregate all recorded audits into a single report
    - Upload the report to AccessFlow (in CI environments with `ACCESSFLOW_SDK_API_KEY` set)
    - Validate against configured thresholds (if any)

**No manual recording needed** — just call `audit()` in your tests and configure the session finish hook.

Then use in your tests:

```
def test_homepage(page, sdk):
    page.goto("https://example.com")

    audits = sdk.audit()
    report = sdk.generate_report(audits)

    assert report["numberOfIssuesFound"].get("extreme", 0) == 0
    assert report["numberOfIssuesFound"].get("high", 0) <= 5
```

---

# API Reference

## AccessFlowSDK

```
AccessFlowSDK(page, config=None)
```

### Parameters

- `page` — Playwright Page object
- `api_key` (str, optional): API key (defaults to `ACCESSFLOW_SDK_API_KEY` env var)

---

## `audit()`

Runs accessibility audit on the current page.

```
audits = sdk.audit()
```

Returns raw audit data as a dictionary.

**Note:** `audit()` automatically records results for CI/CD report aggregation. You don't need to manually call `record_audit()`. Just configure a session-level teardown to call `finalize_reports()` (see [pytest Fixture Setup](https://file+.vscode-resource.vscode-cdn.net/Users/idokan-tor/Cursor/accessFlow/src/accessflow-sdk/python/README.md#pytest-fixture-setup)).

---

## `generate_report(audits)`

Generates a structured summary report.

```
report = sdk.generate_report(audits)
```

Report includes:

```
{
  "numberOfIssuesFound": {
    "extreme": 0,
    "high": 5,
    "medium": 8,
    "low": 12
  },
  "ruleViolations": {
    "colorContrast": {
      "severity": "medium",
      "WCAGLevel": "AA",
      "selectors": [".header", ".footer"]
    }
  }
}
```

---

## **Teardown Functions**

These functions are needed to sync the results of your tests with the AccessFlow app (e.g. for report uploads and dashboard visibility). Unlike the Node.js SDK (which uses Playwright's `globalTeardown` in config), Python has no built-in global teardown — add `finalize_reports()` in your **`conftest.py`** using the **`pytest_sessionfinish`** hook so it runs once after all tests complete. See [Pytest Integration](https://file+.vscode-resource.vscode-cdn.net/Users/idokan-tor/Cursor/accessFlow/src/accessflow-sdk/python/README.md#3-pytest-integration-recommended) for the exact code.

### **`record_audit(url: str, audits: dict)`**

Records an audit for later aggregation (useful for parallel test execution).

```python
from accessflow_sdk import record_audit

record_audit(page.url, audits)
```

### **`finalize_reports(api_key: str = None, run_id: str = None, output_dir: str = './test-results')`**

Finalizes and uploads all recorded audits. Call this once after all tests complete.

```python
from accessflow_sdk import finalize_reports

finalize_reports()
```

**Parameters:**

- `api_key` (str, optional): Override API key from environment
- `run_id` (str, optional): Custom run ID for reports
- `output_dir` (str): Directory for local JSON reports (default: './test-results')

---

# Configuration

Create `accessflow.config.json`:

```
{
  "issuesFoundThreshold": {
    "extreme": 0,
    "high": 5,
    "medium": 10,
    "low": 20
  },
  "localCheck": false
}
```

### Options

- `issuesFoundThreshold` — Maximum allowed violations per severity
- `localCheck` — Apply thresholds locally (default: false)

## **How It Works**

### **Local Development**

- ✅ Audits run on each page
- ✅ JSON reports saved to `./test-results` directory
- ❌ Reports NOT uploaded to dashboard (prevents accidental uploads)

### **CI/CD Environment**

- ✅ Audits run on each page
- ✅ Results aggregated from parallel test workers
- ✅ Automatically uploaded to AccessFlow dashboard
- ✅ Threshold checks applied (fail build if exceeded)

**Supported CI platforms:** CircleCI, GitHub Actions, GitLab CI, Jenkins, Azure Pipelines, Bitbucket Pipelines, Travis CI

---

# CI/CD Integration

In CI pipelines, configure two secrets:

| Secret | Purpose |
| --- | --- |
| `ACCESSFLOW_REGISTRY_TOKEN` | Install SDK package |
| `ACCESSFLOW_SDK_API_KEY` | Authenticate audits |

---

### **GitHub Actions**

```yaml
name: Accessibility Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-22.04  # Use 22.04 for Playwright compatibility
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - run: |
          pip install -r requirements.txt
          pip install accessflow-sdk \
            --index-url https://_json_key_base64:${ACCESSFLOW_REGISTRY_TOKEN}@PYTHON_REGISTRY_URL/simple/
          playwright install chromium        env:
          ACCESSFLOW_REGISTRY_TOKEN: ${{ secrets.ACCESSFLOW_REGISTRY_TOKEN }}
      - run: pytest -v
        env:
          ACCESSFLOW_SDK_API_KEY: ${{ secrets.ACCESSFLOW_SDK_API_KEY }}
```

### **CircleCI**

```yaml
jobs:
  test:
    docker:
      - image: cimg/python:3.10
    steps:
      - checkout
      - run: |
          pip install -r requirements.txt
          pip install accessflow-sdk \
            --index-url https://_json_key_base64:${ACCESSFLOW_REGISTRY_TOKEN}@PYTHON_REGISTRY_URL/simple/
          playwright install chromium      - run: pytest -v
    environment:
      ACCESSFLOW_REGISTRY_TOKEN: ${ACCESSFLOW_REGISTRY_TOKEN}
      ACCESSFLOW_SDK_API_KEY: ${ACCESSFLOW_SDK_API_KEY}
```

### **GitLab CI**

```yaml
test:
  image: python:3.10
  variables:
    ACCESSFLOW_REGISTRY_TOKEN: $ACCESSFLOW_REGISTRY_TOKEN
    ACCESSFLOW_SDK_API_KEY: $ACCESSFLOW_SDK_API_KEY
  script:
    - pip install -r requirements.txt
    - pip install accessflow-sdk
        --index-url https://_json_key_base64:${ACCESSFLOW_REGISTRY_TOKEN}@PYTHON_REGISTRY_URL/simple/
    - playwright install chromium
    - pytest -v
```

## **Advanced Usage**

### **Multiple Pages**

```python
def test_multi_page(page, sdk):
    # Test homepage
    page.goto("https://example.com")
    home_audits = sdk.audit()

    # Test about page
    page.goto("https://example.com/about")
    about_audits = sdk.audit()

    # Generate reports
    home_report = sdk.generate_report(home_audits)
    about_report = sdk.generate_report(about_audits)
```

### **Async Playwright**

```python
import pytest
from playwright.async_api import async_playwright
from accessflow_sdk import AccessFlowSDK

@pytest.mark.asyncio
async def test_async_accessibility():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        sdk = AccessFlowSDK(page)
        await page.goto("https://example.com")

        audits = sdk.audit()  # Note: audit() is synchronous
        report = sdk.generate_report(audits)

        assert report['numberOfIssuesFound'].get('extreme', 0) == 0
        await browser.close()
```

## **Requirements**

- Python 3.7+
- Playwright for Python (`pip install playwright`)
- Playwright browsers installed (`playwright install`)

## **Troubleshooting**

### **API Key Issues**

```python
# Check if environment variable is set
import os
print(os.getenv('ACCESSFLOW_SDK_API_KEY'))

# Pass API key explicitly
sdk = AccessFlowSDK(page, api_key='your-api-key')
```

**Never hardcode API keys in your source code!** Use:

- Constructor parameters for local development
- Environment variables for CI/CD (stored as secrets)
- Configuration files excluded from version control

### **Reports Not Uploading**

- Check that `finalize_reports()` is called after all tests (e.g. in `pytest_sessionfinish` in `conftest.py`)
- Verify your API key has upload permissions