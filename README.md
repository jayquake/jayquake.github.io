# Accessibility Rule Testing

React application with multi-language AccessFlow SDK test lanes (JS, Python, Java).

## Prerequisites

- **Node.js 20.x** and npm
- **Python 3.12+** (for the Python test lane)
- **Java 17+** and Maven (for the Java test lane)
- An `ACCESSFLOW_API_KEY` environment variable (required by all test lanes)

## Quick Start

```bash
npm install
npm start          # http://localhost:3000
```

---

## SDK Artifacts

| Language | Artifact Path | Type |
|----------|--------------|------|
| JS       | `nodeSDK/acsbe-accessflow-sdk.tgz` | npm tarball |
| Python   | `pythonSdk/accessflow_sdk-1.0.1-py3-none-any.whl` | Python wheel |
| Java     | `javaSdk/accessflow-sdk.jar` | JAR |

---

## Test Lanes

All three lanes run Playwright-driven behavior tests against the React app at `http://localhost:3000`.

### JS Lane (existing + extended)

```bash
# Install dependencies (includes the local SDK tgz)
npm ci

# Install Playwright browsers
npx playwright install --with-deps chromium

# Run all E2E tests
npm run test:e2e

# Run only the SDK behavior spec
cd test-suite && npx playwright test tests/sdk-behavior.spec.js

# Other helpful commands
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:headed   # Headed browser
npm run test:e2e:debug    # Debug mode
npm run test:e2e:report   # Open HTML report
```

**Environment variables:**
```bash
export ACCESSFLOW_API_KEY="your-key-here"
```

### Python Lane

```bash
# Create and activate a virtual environment
cd python-tests
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
# .venv\Scripts\activate       # Windows

# Install dependencies (installs the local wheel automatically)
pip install -r requirements.txt

# Install Playwright browsers
python -m playwright install --with-deps chromium

# Make sure the app is running in another terminal:
#   cd .. && npm start

# Run the tests
pytest

# Run with verbose output and JUnit XML
pytest -v --junitxml=test-results/results.xml
```

**Environment variables:**
```bash
export ACCESSFLOW_API_KEY="your-key-here"
```

> The Python test suite will auto-start the React dev server if it is not
> already running. You need Node.js available on `PATH` for this to work.

### Java Lane

```bash
cd java-tests

# Resolve dependencies and install Playwright browsers
mvn compile
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install --with-deps chromium"

# Make sure the app is running in another terminal:
#   cd .. && npm start

# Run the tests
mvn test
```

**Environment variables:**
```bash
export ACCESSFLOW_API_KEY="your-key-here"
```

---

## CI / GitHub Actions

The workflow (`.github/workflows/ci-test-deploy.yml`) runs three parallel test jobs:

| Job | Runtime | SDK |
|-----|---------|-----|
| `test-js` | Node 20.x | `nodeSDK/acsbe-accessflow-sdk.tgz` |
| `test-python` | Python 3.12 | `pythonSdk/accessflow_sdk-1.0.1-py3-none-any.whl` |
| `test-java` | Java 17 (Temurin) | `javaSdk/accessflow-sdk.jar` |

All jobs use the `ACCESSFLOW_API_KEY` secret and upload test artifacts on completion.

Deploy to GitHub Pages runs after all three lanes pass.

---

## Project Structure

```
.
├── nodeSDK/                    # JS SDK artifact
├── pythonSdk/                  # Python SDK artifact
├── javaSdk/                    # Java SDK artifact
├── test-suite/                 # JS Playwright tests
│   ├── playwright.config.js
│   ├── global-teardown.js
│   ├── accessflow.config.json
│   └── tests/
│       ├── sdk-behavior.spec.js   # SDK behavior tests (JS)
│       ├── search.spec.js
│       └── ...
├── python-tests/               # Python Playwright tests
│   ├── requirements.txt
│   ├── pytest.ini
│   ├── conftest.py
│   ├── accessflow.config.json
│   └── tests/
│       └── test_accessflow_sdk_behavior.py
├── java-tests/                 # Java Playwright tests
│   ├── pom.xml
│   └── src/test/
│       ├── java/com/accessflow/
│       │   └── AccessFlowSDKBehaviorTest.java
│       └── resources/
│           └── accessflow.config.json
├── src/                        # React application source
├── package.json
└── .github/workflows/
    └── ci-test-deploy.yml
```
