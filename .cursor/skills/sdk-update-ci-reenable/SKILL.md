---
name: sdk-update-ci-reenable
description: >
  Install or update AccessFlow SDK packages and manage CI test lanes.
  Use when the user drops new SDK files (.tgz, .whl, .jar, .tar.gz) into
  nodeSDK/, pythonSdk/, or javaSdk/ and wants to wire them up for Selenium
  and/or Playwright tests. Also use when the user mentions updating an SDK,
  reinstalling SDKs, re-enabling or muting CI test lanes, or uncommenting
  a test job in the workflow.
---

# SDK Update & CI Re-enable

## Overview

This project has **six independent CI test lanes** across three SDKs and two
test frameworks. Each lane can be enabled or muted individually.

## SDK Lanes Reference

| Lane | CI Job Name | SDK Dir | Package Format | Test Dir | Framework |
|------|-------------|---------|----------------|----------|-----------|
| JS Playwright | `test-js` | `nodeSDK/` | `.tgz` | `test-suite/` | Playwright |
| JS Selenium | `test-js-selenium` | `nodeSDK/` | `.tgz` | `selenium-test-suite/` | Jest + Selenium |
| Python Playwright | `test-python` | `pythonSdk/` | `.whl` | `python-tests/` | pytest-playwright |
| Python Selenium | `test-python-selenium` | `pythonSdk/` | `.whl` | `python-selenium-tests/` | pytest + Selenium |
| Java Playwright | `test-java` | `javaSdk/` | `.jar` | `java-tests/` | JUnit 5 + Playwright |
| Java Selenium | `test-java-selenium` | `javaSdk/` | `.jar` | `java-selenium-tests/` | JUnit 5 + Selenium |

## Dependency Reference Locations

| SDK | Where the filename is referenced |
|-----|----------------------------------|
| **Node** | `package.json` → `devDependencies["@acsbe/accessflow-sdk"]` (root, `file:nodeSDK/<name>.tgz`) |
| **Node** | `selenium-test-suite/package.json` → `dependencies["@acsbe/accessflow-sdk"]` (`file:../nodeSDK/<name>.tgz`) |
| **Python** | `python-tests/requirements.txt` (last line: `../pythonSdk/<name>.whl`) |
| **Python** | `python-selenium-tests/requirements.txt` (last line: `../pythonSdk/<name>.whl`) |
| **Python** | `.github/workflows/ci-test-deploy.yml` → `pip install` steps in `test-python` and `test-python-selenium` |
| **Java** | `java-tests/pom.xml` → `<systemPath>` for accessflow-sdk dependency |
| **Java** | `java-selenium-tests/pom.xml` → `<systemPath>` for accessflow-sdk dependency |

## CI Secrets

| Secret | Used by |
|--------|---------|
| `AF_NODE_PACKAGE_KEY` | JS lanes (Playwright + Selenium) |
| `ACCESSFLOW_SDK_API_KEY` | JS lanes (Playwright + Selenium) |
| `PYTHON_ACCESSFLOW_SDK_TOKEN` | Python lanes |
| `JAVA_ACCESSFLOW_SDK_TOKEN` | Java Playwright lane |

## Full Reinstall Workflow

Use this when the user drops new SDK files into the SDK directories.

```
Task Progress:
- [ ] Step 1: Identify and rename SDK packages
- [ ] Step 2: Update dependency references
- [ ] Step 3: Clean install npm dependencies
- [ ] Step 4: Update CI workflow (enable/mute lanes, update filenames)
- [ ] Step 5: Update CI needs: arrays
- [ ] Step 6: Validate YAML and verify installs
```

### Step 1: Identify and rename SDK packages

List each SDK directory:

```bash
ls -la nodeSDK/ pythonSdk/ javaSdk/
```

**Common issues to fix:**
- Filenames with spaces or parentheses (e.g., `acsbe-accessflow-sdk (1).tgz`)
  must be renamed to clean names (e.g., `acsbe-accessflow-sdk-1.1.1.tgz`)
- Python `.tar.gz` source tarballs sometimes land in `nodeSDK/` — move them
  to `pythonSdk/`
- The Java `.jar` keeps the same name (`accessflow-sdk.jar`), so a copy
  overwrites the old one

### Step 2: Update dependency references

**Node/JS** — Two `package.json` files:

```json
// package.json (root)
"@acsbe/accessflow-sdk": "file:nodeSDK/<new-name>.tgz"

// selenium-test-suite/package.json
"@acsbe/accessflow-sdk": "file:../nodeSDK/<new-name>.tgz"
```

**Python** — Two `requirements.txt` files AND two CI pip install lines:

```
# python-tests/requirements.txt
../pythonSdk/<new-name>.whl

# python-selenium-tests/requirements.txt
../pythonSdk/<new-name>.whl
```

In `.github/workflows/ci-test-deploy.yml`, update the `pip install` lines
in both `test-python` and `test-python-selenium` jobs.

**Java** — Two `pom.xml` files:

```xml
<!-- java-tests/pom.xml -->
<systemPath>${project.basedir}/../javaSdk/accessflow-sdk.jar</systemPath>

<!-- java-selenium-tests/pom.xml -->
<systemPath>${project.basedir}/../javaSdk/accessflow-sdk.jar</systemPath>
```

Also update the `<version>` tag to match the new SDK version.

### Step 3: Clean install npm dependencies

```bash
# Root
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Selenium test suite
cd selenium-test-suite
rm -rf node_modules package-lock.json
npm install

# Verify
npm ls @acsbe/accessflow-sdk   # from root
cd selenium-test-suite && npm ls @acsbe/accessflow-sdk
```

### Step 4: Update CI workflow

The CI file is `.github/workflows/ci-test-deploy.yml`.

**To enable a muted lane:** Remove the `# ` prefix from every line in the
job block. Remove any `(MUTED)` or `(DISABLED)` annotations from the
section header comment. Keep the `# ===...===` section separator.

**To mute an active lane:** Prefix every line in the job block with `# `.
Add `(MUTED)` to the section header comment.

**Important:** When enabling lanes, ensure:
- All `npm ci` steps use `--legacy-peer-deps`
- Python Playwright lane uses `npx serve -s build -l 3000` (not `npm start`)
- All lanes have an API key check step

### Step 5: Update CI needs: arrays

The `deploy` and `accessibility-summary` jobs have `needs:` arrays that
must list ONLY the currently-active test jobs. If you enable or mute a
lane, update both `needs:` arrays.

Active jobs go in the array; muted jobs must be removed or YAML will fail
with "depends on unknown job" errors.

### Step 6: Validate and verify

```bash
# YAML syntax check
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci-test-deploy.yml')); print('YAML valid')"

# Confirm active jobs
grep -E '^  test-|^  deploy:|^  accessibility' .github/workflows/ci-test-deploy.yml

# Node SDK version
npm ls @acsbe/accessflow-sdk

# Playwright test listing
cd test-suite && npx playwright test --list
```

## Selective Lane Enable/Mute

When the user says "only run X and Y in CI":

1. Enable only the requested lanes (uncomment)
2. Mute all other test lanes (comment out)
3. Update BOTH `needs:` arrays in `deploy` and `accessibility-summary`
   to list only the active test jobs
4. The `accessibility-summary` download steps have `continue-on-error: true`
   so missing artifacts from muted lanes are silently skipped

## Quick Reference: User Phrases → Actions

| User says | Action |
|-----------|--------|
| "reinstall SDKs" | Steps 1-3 + Step 6 |
| "enable all CI lanes" | Steps 4-6 |
| "only run Playwright" | Mute Selenium lanes, enable Playwright lanes, update needs |
| "only run JS and Python" | Mute Java lanes, enable JS+Python, update needs |
| "update the Node SDK" | Steps 1-3 for Node only |
| "mute Java" | Comment out test-java + test-java-selenium, remove from needs |

## .gitignore Reminders

Ensure `.gitignore` has:
- `node_modules` (not `/node_modules` — must match subdirectories)
- `**/target/` (Java Maven build output)
