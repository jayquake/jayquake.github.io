# AccessFlow SDK for Java

Professional accessibility testing for Java applications using Playwright.

AccessFlow SDK for Java enables engineering teams to automatically detect **WCAG 2.1 accessibility issues** directly within automated test suites. It integrates seamlessly with Playwright and CI/CD pipelines to ensure accessibility validation is continuous and enforceable.

---

# Overview

With AccessFlow SDK for Java, you can:

- ✅ Automatically detect WCAG 2.1 violations (A, AA, AAA)
- ✅ Integrate accessibility testing into JUnit, TestNG, Cucumber, or custom frameworks
- ✅ Aggregate results across parallel test runs
- ✅ Automatically upload reports to the AccessFlow Dashboard
- ✅ Enforce CI/CD quality gates
- ✅ Configure severity thresholds per build

---

# Prerequisites

You will receive the following from the AccessFlow team:

| Item | Purpose |
| --- | --- |
| **Registry Install Token** | Install the SDK package |
| **Maven Registry URL** | Private Maven registry location |
| **SDK API Key** | Authenticate audit requests at runtime |

> The Registry Install Token is used for installation.
> 
> 
> The SDK API Key is used during test execution.
> 

---

# Installation

## Option 1 — Install from Private Package Registry (Recommended)

### Maven (`pom.xml`)

Add the AccessFlow repository and dependency:

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

Configure credentials in `~/.m2/settings.xml`:

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

### Gradle (`build.gradle`)

```
repositories {
    maven {
        url "https://MAVEN_REGISTRY_URL"
        credentials {
            username = "_json_key_base64"
            password = project.findProperty("REGISTRY_INSTALL_TOKEN")
                ?: System.getenv("ACCESSFLOW_REGISTRY_TOKEN")
        }
    }
}

dependencies {
    testImplementation 'com.acsbe:accessflow-sdk:1.0.1'
}
```

For local development:

```
# ~/.gradle/gradle.properties
REGISTRY_INSTALL_TOKEN=your-base64-token-here
```

---

## Option 2 — Install from Local JAR

If you received a JAR file directly:

### Install to Local Maven Repository

```
mvn install:install-file 
  -Dfile=/path/to/accessflow-sdk.jar 
  -DgroupId=com.acsbe 
  -DartifactId=accessflow-sdk 
  -Dversion=1.0.1 
  -Dpackaging=jar
```

Then use the dependency block normally.

---

# Quick Start

## 1️⃣ Configure SDK API Key

### Recommended: Environment Variable

```
export ACCESSFLOW_SDK_API_KEY=your-api-key-here
```

Then initialize normally:

```
AccessFlowSDK sdk = new AccessFlowSDK(page);
```

---

### Alternative: Pass API Key to Constructor

```
AccessFlowSDK sdk = new AccessFlowSDK(page, "your-api-key-here");
```

---

### Alternative: System Property (CI Runs)

```
mvn test -DACCESSFLOW_SDK_API_KEY=your-api-key
```

---

## 2️⃣ Basic Example (JUnit 5)

```
import com.microsoft.playwright.*;
import com.acsbe.accessflow.AccessFlowSDK;
import org.junit.jupiter.api.*;
import java.util.Map;

public class AccessibilityTest {

    @Test
    public void testHomepageAccessibility() {
        Playwright playwright = Playwright.create();
        Browser browser = playwright.chromium().launch();
        Page page = browser.newPage();

        AccessFlowSDK sdk = new AccessFlowSDK(page);

        page.navigate("https://example.com");

        Map<String, Object> audits = sdk.audit();
        Map<String, Object> report = sdk.generateReport(audits);

        System.out.println("Issues found: " +
            report.get("numberOfIssuesFound"));

        browser.close();
        playwright.close();
    }
}
```

---

# Recommended: Test Suite Integration

To aggregate results and upload automatically:

```
@BeforeAll
void setupSuite() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch();
}

@AfterAll
void teardownSuite() {
    AccessFlowTeardown.finalizeReports();
}
```

This enables:

- Parallel worker aggregation
- Single report upload
- CI threshold enforcement

---

# API Reference

## AccessFlowSDK

### Constructors

```
AccessFlowSDK(Page page)
AccessFlowSDK(Page page, String apiKey)
```

### Methods

**Run Audit**

```
Map<String, Object> audits = sdk.audit();
```

**Generate Report**

```
Map<String, Object> report = sdk.generateReport(audits);
```

The report includes:

- Issue counts by severity
- Rule violations
- WCAG level
- Descriptions
- CSS selectors

---

## AccessFlowTeardown

Used for parallel test execution and report aggregation.

```
AccessFlowTeardown.finalizeReports();
```

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

- `issuesFoundThreshold` — Max allowed violations per severity
- `localCheck` — Apply thresholds locally (default: false)

---

# CI/CD Integration

In CI, configure these secrets:

| Secret | Purpose |
| --- | --- |
| `ACCESSFLOW_REGISTRY_TOKEN` | Install SDK |
| `ACCESSFLOW_SDK_API_KEY` | Authenticate audits |

Reports will:

- Run per page
- Aggregate across workers
- Upload automatically
- Fail builds if thresholds exceeded

---

# Requirements

- Java 11+
- Playwright for Java
- Maven or Gradle

---

# Troubleshooting

### API Key Issues

Check:

```
System.getenv("ACCESSFLOW_SDK_API_KEY");
```

Never hardcode API keys. Use:

- Environment variables
- CI secrets
- System properties
- Secure local configuration

---

### Reports Not Uploading

- Confirm `AccessFlowTeardown.finalizeReports()` is called
- Verify API key permissions

---

# License

ISC