# AccessFlow SDK - main doc

Professional accessibility testing for modern web applications.

AccessFlow SDK enables teams to automatically detect **WCAG 2.1 accessibility issues** directly within their automated test suites. Built for engineering teams, it integrates seamlessly with Playwright and CI/CD workflows to ensure accessibility is validated continuously — not retroactively.

---

# Why AccessFlow SDK?

Modern development moves fast. Accessibility often falls behind.

AccessFlow SDK allows you to:

- ✅ Automatically detect WCAG 2.1 issues (A, AA, AAA)
- ✅ Integrate accessibility checks into Playwright tests
- ✅ Generate detailed issue reports with severity and selectors
- ✅ Enforce quality gates in CI/CD pipelines
- ✅ Upload results automatically to the AccessFlow Dashboard
- ✅ Run in parallel test environments
- ✅ Work across Windows, macOS, and Linux

Accessibility becomes part of your development lifecycle — not an afterthought.

---

# Supported Languages

AccessFlow SDK is available in:

| Language | Package |
| --- | --- |
| **JavaScript / TypeScript** | `@acsbe/accessflow-sdk` |
| **Python** | `accessflow-sdk` |
| **Java** | `com.acsbe:accessflow-sdk` |

---

# Getting Started

Before installation, you will receive two credentials from the AccessFlow team:

| Credential | Purpose |
| --- | --- |
| **Registry Install Token** | Used to install the SDK package |
| **SDK API Key** | Used at runtime to authenticate audits |

> These are separate credentials and must be configured independently.
> 

---

# Installation & Setup

## JavaScript / TypeScript

### 1. Configure Package Registry Access

Create a `.npmrc` file in your project root:

```
@acsbe:registry=https://NPM_REGISTRY_URL/
//NPM_REGISTRY_URL/:username=_json_key_base64
//NPM_REGISTRY_URL/:_password=NPM_INSTALL_TOKEN
//NPM_REGISTRY_URL/:always-auth=true
```

Replace:

- `NPM_REGISTRY_URL`
- `NPM_INSTALL_TOKEN`

with the credentials provided by AccessFlow.

> Note: The npm token is double base64-encoded. The AccessFlow team provides the correct format.
> 

---

### 2. Install the SDK

```
npm install -D @acsbe/accessflow-sdk
```

---

### 3. Run Accessibility Audit in Playwright

```
import { test } from '@playwright/test';
import AccessFlowSDK from '@acsbe/accessflow-sdk';

test('accessibility check', async ({ page }) => {
  const sdk = new AccessFlowSDK(page);

  await page.goto('https://example.com');

  const audits = await sdk.audit();
  const report = await sdk.generateReport(audits);

  console.log('Issues found:', report.numberOfIssuesFound);
});
```

---

## Python

### Install

```
pip install accessflow-sdk \
  --index-url https://_json_key_base64:REGISTRY_INSTALL_TOKEN@PYTHON_REGISTRY_URL/simple/
```

---

### Usage Example

```
from playwright.sync_api import Page
from accessflow_sdk import AccessFlowSDK

def test_accessibility(page: Page):
    sdk = AccessFlowSDK(page)
    page.goto('https://example.com')

    audits = sdk.audit()
    report = sdk.generate_report(audits)

    print(f"Issues found: {report['numberOfIssuesFound']}")
```

---

## Java

### Add to `pom.xml`

```
<repositories>
  <repository>
    <id>accessflow-registry</id>
    <url>https://MAVEN_REGISTRY_URL</url>
  </repository>
</repositories>

<dependency>
    <groupId>com.acsbe</groupId>
    <artifactId>accessflow-sdk</artifactId>
    <version>1.0.1</version>
    <scope>test</scope>
</dependency>
```

---

### Configure Authentication

In `~/.m2/settings.xml`:

```
<settings>
  <servers>
    <server>
      <id>accessflow-registry</id>
      <username>_json_key_base64</username>
      <password>REGISTRY_INSTALL_TOKEN</password>
    </server>
  </servers>
</settings>
```

---

### Usage Example

```
import com.acsbe.accessflow.AccessFlowSDK;
import com.microsoft.playwright.*;

@Test
public void testAccessibility() {
    Page page = browser.newPage();
    AccessFlowSDK sdk = new AccessFlowSDK(page);

    page.navigate("https://example.com");

    Map<String, Object> audits = sdk.audit();
    Map<String, Object> report = sdk.generateReport(audits);

    System.out.println("Issues found: " + report.get("numberOfIssuesFound"));
}
```

---

# How It Works

1. Integrate the SDK into your automated tests
2. Run your test suite
3. Accessibility audits execute automatically
4. Reports are generated per page
5. In CI/CD environments, reports upload automatically to the AccessFlow Dashboard

Your team gains full visibility into accessibility health across releases.

---

# API Key Configuration

The **SDK API Key** authenticates your audit requests at runtime.

## Recommended: Environment Variable

Set:

```
ACCESSFLOW_SDK_API_KEY
```

### Local Development

```
export ACCESSFLOW_SDK_API_KEY=your-api-key-here
```

### CI/CD

Store as a secure environment variable in your pipeline platform (GitHub Actions, GitLab, Jenkins, Azure DevOps, etc.).

---

## Optional: Programmatic Initialization

If needed, you may set the API key in code:

**JavaScript**

```
AccessFlowSDK.init({ apiKey: process.env.ACCESSFLOW_SDK_API_KEY! });
```

**Python**

```
sdk = AccessFlowSDK(page, api_key='your-api-key')
```

**Java**

```
AccessFlowSDK sdk = new AccessFlowSDK(page, "your-api-key");
```

---

# Enforcing Accessibility Quality Gates

You can configure build thresholds using an `accessflow.config.json` file:

```
{
  "issuesFoundThreshold": {
    "extreme": 0,
    "high": 5,
    "medium": 10,
    "low": 20
  }
}
```

This allows your CI/CD pipeline to fail when accessibility violations exceed defined limits.

---

# License

ISC License

---

For full language-specific guides and advanced configuration options, contact the AccessFlow team or refer to your project onboarding materials.