---
name: sdk-update-ci-reenable
description: Update an AccessFlow SDK package and re-enable its muted CI test lane. Use when the user adds a new SDK .tgz, .whl, or .jar to nodeSDK/, pythonSdk/, or javaSdk/ and wants to wire it up and unmute the corresponding CI job. Also use when the user mentions updating an SDK, re-enabling tests in CI, or uncommenting a test lane.
---

# SDK Update & CI Re-enable

When a new AccessFlow SDK package is dropped into a SDK directory, perform these steps to wire it up and re-enable its CI test lane.

## SDK Lanes Reference

| Lane | SDK Dir | Package Format | Dependency Reference Location | CI Job Name | Verify Command |
|------|---------|----------------|-------------------------------|-------------|----------------|
| **Node/JS** | `nodeSDK/` | `.tgz` | `package.json` → `devDependencies["@acsbe/accessflow-sdk"]` | `test-js` | `npm ls @acsbe/accessflow-sdk` |
| **Python** | `pythonSdk/` | `.whl` | CI workflow → `pip install` step | `test-python` | `python -c "import importlib.metadata as m; print(m.version('accessflow-sdk'))"` |
| **Java** | `javaSdk/` | `.jar` | `java-tests/pom.xml` → `systemPath` | `test-java` | `mvn test -B` (in `java-tests/`) |

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Identify the new SDK package and its lane
- [ ] Step 2: Update the dependency reference
- [ ] Step 3: Uncomment the CI test job
- [ ] Step 4: Verify the install locally
- [ ] Step 5: Clean up old package (optional)
```

### Step 1: Identify the new SDK package

List the SDK directory to find the new file:

```bash
ls -la nodeSDK/    # or pythonSdk/ or javaSdk/
```

Compare with the current reference to identify old vs new filename.

### Step 2: Update the dependency reference

**Node/JS** — Edit `package.json`, update the `file:` path:

```json
"@acsbe/accessflow-sdk": "file:nodeSDK/<new-filename>.tgz"
```

**Python** — Edit `.github/workflows/ci-test-deploy.yml`, update the `pip install` line in `test-python`:

```yaml
pip install --force-reinstall --no-deps ../pythonSdk/<new-filename>.whl
```

**Java** — Edit `java-tests/pom.xml`, update the `<systemPath>` for the accessflow-sdk dependency to point to the new `.jar`.

### Step 3: Uncomment the CI test job

In `.github/workflows/ci-test-deploy.yml`:

1. Find the commented-out job block for the lane (`test-js`, `test-python`, or `test-java`)
2. Remove the `#` prefix from every line in the job block
3. Remove any "Muted:" comment explaining why it was disabled
4. Keep the section header comment (`# ===...=== # Lane Name...`)
5. For the Node lane: ensure `npm ci` uses `--legacy-peer-deps` to match the deploy job

### Step 4: Verify the install locally

**Node/JS:**

```bash
npm install --legacy-peer-deps
npm ls @acsbe/accessflow-sdk
```

Expect the package version to resolve from the tarball (e.g., `@acsbe/accessflow-sdk@1.0.1`).

**Python:**

```bash
pip install --force-reinstall --no-deps pythonSdk/<new-filename>.whl
python -c "import importlib.metadata as m; print('accessflow-sdk:', m.version('accessflow-sdk'))"
```

**Java:**

```bash
cd java-tests && mvn compile -q
```

### Step 5: Clean up old package (optional)

If the old package file is no longer needed, confirm with the user before deleting. Keep the old file if the user wants a rollback option.

## Important Notes

- The CI workflow file is `.github/workflows/ci-test-deploy.yml`
- All three test lanes are independent jobs — they can be enabled/disabled individually
- The `deploy` and `accessibility-summary` jobs do not depend on the test jobs
- Secret env vars per lane: `AF_NODE_PACKAGE_KEY` (JS), `PYTHON_ACCESSFLOW_SDK_TOKEN` (Python), `JAVA_ACCESSFLOW_SDK_TOKEN` (Java)
