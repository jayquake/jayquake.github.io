# AccessFlow SDK – Internal Setup And Delivery Guide

> **INTERNAL USE ONLY**
> 
> 
> This document is for AccessFlow developers and sales personnel. It is **NOT** intended for SDK clients.
> 

This guide covers the end-to-end process of building, publishing, and distributing the AccessFlow SDK, including how to generate credentials for SDK clients.

---

# Table of Contents

1. Building SDK Packages Locally
2. Publishing SDK Packages to Staging (CircleCI)
3. Publishing SDK Packages to Production (GitHub Tags)
4. Viewing Packages in GCP Artifact Registry
5. Generating a Read-Only Service Account for SDK Clients
6. Generating the Registry Install Token
7. Generating an SDK API Key (AccessFlow UI)
8. Storing Credentials in CI/CD Systems
9. Getting Registry URLs
10. Client Configuration Files
11. Quick Reference – What to Give SDK Clients

---

# 1. Building SDK Packages Locally

All build scripts are defined in:

```
src/accessflow-sdk/package.json
```

## Build All Packages (Node.js + Python + Java)

```
cd src/accessflow-sdk
npm install
npm run build:all-packages
```

This runs the full pipeline:

1. `npm run build` – Compiles TypeScript SDK
2. `npm run build:binaries` – Builds platform-specific `aflow-core` binaries
3. `npm run copy:lang-assets` – Copies binaries/assets to Python/Java
4. `npm pack` – Creates Node.js `.tgz`
5. `npm run build:python` – Builds Python `.whl` + `.tar.gz`
6. `npm run build:java` – Builds Java `.jar` via Maven
7. `npm run collect:packages` – Collects all outputs into `packages/`

## Build Individual Language Packages

```
# Node.js + Python
npm run build:js-python

# Python only
npm run build && npm run build:binaries && npm run copy:python-assets && npm run build:python

# Java only
npm run build && npm run build:binaries && npm run copy:java-assets && npm run build:java
```

## Production Builds

Set `IS_PRODUCTION = true` in `sdk.config.ts`, then:

```
npm run build:tgz:prod
npm run build:python:prod
npm run build:java:prod
```

## Output Files

All built packages are collected in:

```
src/accessflow-sdk/packages/
```

| File | Language | Format |
| --- | --- | --- |
| `acsbe-accessflow-sdk.tgz` | Node.js | npm tarball |
| `accessflow_sdk-*.whl` | Python | Wheel |
| `accessflow_sdk-*.tar.gz` | Python | Source dist |
| `accessflow-sdk.jar` | Java | JAR |

> ⚠ If multiple JARs match the wildcard, copy the correct one manually:
> 

```
cp java/target/accessflow-sdk-1.0.1.jar packages/accessflow-sdk.jar
```

---

# 2. Publishing SDK Packages to Staging (CircleCI)

Staging publishing is triggered via CircleCI when:

```
DEPLOY_SDK = true
```

## How to Trigger

1. Go to CircleCI → `accessFlow` project
2. Select your `env/*` branch
3. Click **Trigger Pipeline**
4. Add parameter:
    - Name: `DEPLOY_SDK`
    - Type: `boolean`
    - Value: `true`

Two workflows run:

- `staging-sdk-publish`
- `sdk-test`

## Version Format (Staging)

| Language | Format | Example |
| --- | --- | --- |
| Node.js | `{version}-dev.{build}` | `1.0.1-dev.123` |
| Python | `{version}.dev{build}` | `1.0.1.dev123` |
| Java | `{version}-dev-{build}` | `1.0.1-dev-123` |

---

# 3. Publishing SDK Packages to Production (GitHub Tags)

Production publishing requires:

### Step 1 – Version Bump (GitHub Actions)

PR merged to `main` **with label**:

- `version:patch`
- `version:minor`
- `version:major`

The workflow:

- Updates version files
- Commits `chore(release): bump SDK to vX.X.X`
- Creates tag `vX.X.X`

### Step 2 – Publish (CircleCI)

Trigger CircleCI on `main` with:

```
DEPLOY_SDK = true
```

⚠ If the latest commit is not a version bump commit, publishing halts.

---

# 4. Viewing Packages in GCP Artifact Registry

## Via GCP Console

1. Go to Google Cloud Console
2. Select project
3. Open **Artifact Registry**

Repositories:

| Repo | Language |
| --- | --- |
| `stag-accessflow-npm` | Node |
| `stag-accessflow-python` | Python |
| `stag-accessflow-maven` | Java |

---

# 5. Generating Read-Only Service Account

Grant role:

```
roles/artifactregistry.reader
```

CLI example:

```
gcloud iam service-accounts create sdk-reader-clientname \
  --display-name="SDK Reader - Client Name"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SA@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"
```

---

# 6. Generating the Registry Install Token

## Step 1 – Generate JSON Key

```
gcloud iam service-accounts keys create service-account-key.json \
  --iam-account="SA@PROJECT_ID.iam.gserviceaccount.com"
```

## Step 2 – Base64 Encode

Single encoding (Python / Java):

```
base64 -w 0 service-account-key.json > artifact_token.txt
```

Double encoding (npm):

```
base64 -w 0 service-account-key.json | base64 -w 0 > artifact_token_npm.txt
```

| File | Used By |
| --- | --- |
| `artifact_token.txt` | Python, Java |
| `artifact_token_npm.txt` | npm |

> npm auto-decodes `_password`, so double encoding is required.
> 

---

# 7. Generating SDK API Key

1. Log into AccessFlow
2. User Profile → Token Management
3. Generate token
4. Scope: **Audit SDK token**

Provide as:

```
ACCESSFLOW_SDK_API_KEY
```

---

# 8. Storing Credentials in CI/CD

### Required Secrets

| Name | Value |
| --- | --- |
| `ACCESSFLOW_SDK_API_KEY` | SDK API key |
| `ACCESSFLOW_REGISTRY_TOKEN` | Single base64 |
| `ACCESSFLOW_NPM_REGISTRY_TOKEN` | Double base64 |

### Required Variables

| Name | Notes |
| --- | --- |
| `GCP_SDK_NPM_REGISTRY_URL` | No `https://` |
| `GCP_SDK_PYTHON_REGISTRY_URL` | No `https://` |
| `GCP_SDK_MAVEN_REGISTRY_URL` | Must include `https://` |

---

# 9. Getting Registry URLs

## URL Patterns

| Language | Format |
| --- | --- |
| npm | `us-east1-npm.pkg.dev/PROJECT/REPO/` |
| Python | `us-east1-python.pkg.dev/PROJECT/REPO` |
| Maven | `https://us-east1-maven.pkg.dev/PROJECT/REPO` |

⚠ Remove `https://` for npm and Python.

---

# 10. Client Configuration Files

## Node.js – `.npmrc`

```
@acsbe:registry=https://REGISTRY_URL
//REGISTRY_URL:username=_json_key_base64
//REGISTRY_URL:_password=DOUBLE_BASE64_TOKEN
//REGISTRY_URL:always-auth=true
```

## Python

```
pip install accessflow-sdk \
  --index-url https://_json_key_base64:TOKEN@REGISTRY/simple/
```

## Java – `settings.xml`

Uses profile-based configuration with:

```
<username>_json_key_base64</username>
<password>${ACCESSFLOW_REGISTRY_TOKEN}</password>
```

---

# 11. Quick Reference – What to Give SDK Clients

| Item | Notes |
| --- | --- |
| Registry Install Token | Single base64 |
| NPM Install Token | Double base64 |
| SDK API Key | From UI |
| NPM URL | No https |
| Python URL | No https |
| Maven URL | With https |

---

### CI/CD Note

Use **Ubuntu 22.04** in CI/CD when using Playwright. Ubuntu 24.04 has known dependency issues.