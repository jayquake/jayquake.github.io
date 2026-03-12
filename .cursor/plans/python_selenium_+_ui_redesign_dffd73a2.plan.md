---
name: Python Selenium + UI Redesign
overview: Create a Python Selenium test suite mirroring the existing Node Selenium tests, wire it into CI (disabling the Node Selenium lane), register it as a project, and redesign the projects page to group by framework (Playwright/Selenium) with language sub-cards.
todos:
  - id: create-test-suite
    content: Create `python-selenium-tests/` directory with conftest.py, pytest.ini, requirements.txt, accessflow.config.json, and 6 test files mirroring the Node Selenium tests
    status: completed
  - id: register-project
    content: Create `server/projects/accessflow-python-selenium.json` and update `public/static-projects.json` with the new project
    status: completed
  - id: ci-disable-node-selenium
    content: Comment out the `test-js-selenium` job in `.github/workflows/ci-test-deploy.yml`
    status: completed
  - id: ci-add-python-selenium
    content: Add `test-python-selenium` job in CI workflow with Python + Chrome + Selenium setup
    status: completed
  - id: ci-update-summary
    content: Update `accessibility-summary` job to reference Python Selenium test results
    status: completed
  - id: ui-redesign-projects
    content: Redesign the project selection page in TestLibrary/index.tsx to group by framework (Playwright/Selenium) with language sub-cards and 'Coming Soon' placeholders
    status: completed
isProject: false
---

# Python Selenium Test Suite, CI Wiring, and Projects Page Redesign

## Part 1: Create Python Selenium Test Suite

Create a new `python-selenium-tests/` directory with pytest + Selenium WebDriver + AccessFlow Python SDK.

The Python SDK (`accessflow_sdk-1.0.1-py3-none-any.whl`) already includes a `SeleniumDriver` adapter at `accessflow_sdk.SeleniumDriver`. The SDK API is:

```python
from accessflow_sdk import AccessFlowSDK, SeleniumDriver, finalize_reports
sdk = AccessFlowSDK(SeleniumDriver(driver), api_key="...")
audits = sdk.audit()
report = sdk.generate_report(audits)
```

### Files to create

- `**python-selenium-tests/pytest.ini**` -- pytest config with `testpaths = tests`, verbose output, JUnit XML output
- `**python-selenium-tests/requirements.txt**` -- dependencies: `pytest>=7.0`, `selenium>=4.20`, `python-dotenv>=1.0`, and `../pythonSdk/accessflow_sdk-1.0.1-py3-none-any.whl`
- `**python-selenium-tests/accessflow.config.json**` -- threshold config matching the Node Selenium suite thresholds (from [selenium-test-suite/accessflow.config.json](selenium-test-suite/accessflow.config.json))
- `**python-selenium-tests/conftest.py**` -- shared fixtures:
  - Session-scoped `_ensure_app_server` fixture (start dev server if not running)
  - Session-scoped `_finalize_accessflow_reports` fixture (call `finalize_reports()` after all tests)
  - Per-test `driver` fixture (Chrome WebDriver, headless in CI)
  - Per-test `sdk` fixture (AccessFlowSDK + SeleniumDriver bound to driver)
  - Helper `navigate_to(driver, path)` function
- **6 test files** mirroring Node Selenium tests (pattern from [selenium-test-suite/tests/sdk-audit-init-and-basic-reports.test.js](selenium-test-suite/tests/sdk-audit-init-and-basic-reports.test.js)):

| Node Selenium Test                            | Python Selenium Test                                |
| --------------------------------------------- | --------------------------------------------------- |
| `sdk-audit-init-and-basic-reports.test.js`    | `tests/test_sdk_audit_init_and_basic_reports.py`    |
| `sdk-audit-breadcrumb-navigation.test.js`     | `tests/test_sdk_audit_breadcrumb_navigation.py`     |
| `sdk-audit-navigation-timing.test.js`         | `tests/test_sdk_audit_navigation_timing.py`         |
| `sdk-audit-search-component.test.js`          | `tests/test_sdk_audit_search_component.py`          |
| `sdk-audit-graphics-multi-state.test.js`      | `tests/test_sdk_audit_graphics_multi_state.py`      |
| `sdk-audit-hidden-content-thresholds.test.js` | `tests/test_sdk_audit_hidden_content_thresholds.py` |

Each test will use `SeleniumDriver(driver)` + `AccessFlowSDK(...)` to run audits, following the same patterns as the Node tests but translated to Python/pytest idioms.

---

## Part 2: Register the Project

### Server-side project config

Create `**server/projects/accessflow-python-selenium.json`:

```json
{
  "id": "accessflow-python-selenium",
  "name": "AccessFlow (Python Selenium)",
  "description": "AccessFlow Python SDK test suite using pytest + Selenium WebDriver",
  "logo": "/logos/python.svg",
  "logos": ["/logos/python.svg", "/logos/selenium.svg"],
  "sdkType": "python",
  "testFramework": "pytest",
  "testCommand": "pytest -v --junitxml=test-results/results.xml",
  "testDirectory": "python-selenium-tests/tests",
  "workingDirectory": "python-selenium-tests",
  "outputDirectory": "python-selenium-tests/test-results",
  "apiKeyEnvVar": "PYTHON_ACCESSFLOW_SDK_TOKEN",
  "defaultBaseUrl": "http://localhost:3000",
  "configPath": "python-selenium-tests/pytest.ini",
  "qaseProjectCode": "ACCESSFLOW",
  "envHubNames": ["accessflow"]
}
```

### Static projects config

Update **[public/static-projects.json](public/static-projects.json)** to add the Python Selenium project entry with matching fields.

---

## Part 3: CI Changes

Edit **[.github/workflows/ci-test-deploy.yml](.github/workflows/ci-test-deploy.yml)**:

### Disable Node Selenium lane

- Comment out the entire `test-js-selenium` job (lines 83-146)

### Add Python Selenium lane

- New job `test-python-selenium` with:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` (Node 20.x for app build)
  - `npm ci --legacy-peer-deps && npm run build` (build the app)
  - `actions/setup-python@v5` (Python 3.12)
  - `browser-actions/setup-chrome@v1` (Chrome + ChromeDriver)
  - `pip install -r python-selenium-tests/requirements.txt` + force-reinstall the SDK wheel
  - `npx serve -s build -l 3000 &` + wait for app
  - `cd python-selenium-tests && pytest -v --junitxml=test-results/results.xml`
  - Env vars: `CI=true`, `HEADLESS=true`, `BASE_URL=http://localhost:3000`, `PYTHON_ACCESSFLOW_SDK_TOKEN` from secrets
  - Upload `python-selenium-test-results` artifact

### Update accessibility-summary

- Update the `accessibility-summary` job to download `python-selenium-test-results` instead of `js-selenium-test-results`

---

## Part 4: Projects Page UI Redesign

Redesign the project selection view in **[src/pages/TestLibrary/index.tsx](src/pages/TestLibrary/index.tsx)** (the section that renders when `!project`, lines 543-682).

### New layout structure

```
Run SDK Tests
Select a project to configure and run tests
---------------------------------------------

Playwright  [playwright icon]
  [Node card]  [Python card]  [Java card]

Selenium  [selenium icon]
  [Node card]  [Python card (NEW)]  [Java card: Coming Soon]
```

### Implementation approach

- Define a `frameworkGroups` data structure that maps framework -> language -> project
- Build from `allProjects` by matching `testFramework` and `sdkType`
- Two framework sections: **Playwright** (`playwright`, `pytest`, `maven`) and **Selenium** (`selenium` + the new pytest-selenium projects)
  - The mapping: `playwright`/`pytest`/`maven` testFramework -> Playwright group, `selenium` testFramework -> Selenium group
  - **Better approach**: Group by checking if project `logos` or `description` contains "Selenium" or "Playwright", or use a mapping based on project IDs
  - **Simplest reliable approach**: Hardcode the known project ID -> group mapping, then auto-detect new projects
- For each language (Node, Python, Java), show a card with the language icon and framework badge
- Available projects are clickable; missing combos show as disabled "Coming Soon" cards
- Use the existing logos: `/logos/playwright.svg`, `/logos/selenium.svg`, `/logos/nodejs.svg`, `/logos/python.svg`, `/logos/java.svg`

### Card design

- Section headers with framework icon and name
- Sub-cards show language icon, project name, status chips
- "Coming Soon" cards use a muted/disabled style with a subtle overlay
