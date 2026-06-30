# Unified Engine Rules — Qase Coverage Pipeline

Source of truth for AccessFlow issue validation: **RAIDEN engine rule examples** (`/engine/{ruleId}`, `_success`, `_failure`) backed by **atomic-tests** fixtures from core-engine-auditor.

## Workflow

```
fetch snapshot → generate intended → compute delta → review → apply → spot-check → create plan
```

| File | Purpose |
|------|---------|
| `engine-rules-snapshot.json` | Current Qase suite 902 state (fetch once per session) |
| `engine-rules-intended.json` | Desired state for all 167 rules (generated from local examples) |
| `engine-rules-delta.json` | Computed diff — review before applying |
| `raw-suite-902-list.json` | Raw `list_cases` response used to build snapshot |

## Commands

```bash
# 1. Fetch suite 902 via Qase MCP list_cases (code=ACCESSFLOW, suite_id=902)
#    Save response to raw-suite-902-list.json

# 2. Build snapshot from fetch
node scripts/qase/build-snapshot-from-suite.js \
  scripts/qase/raw-suite-902-list.json \
  scripts/qase/engine-rules-snapshot.json

# 3. Generate intended state from engine-rules + atomic-tests
node scripts/qase/generate-engine-rules-intended.js

# 4. Compute delta
node scripts/qase/compute-delta.js \
  scripts/qase/engine-rules-snapshot.json \
  scripts/qase/engine-rules-intended.json \
  scripts/qase/engine-rules-delta.json

# 5. Review delta (casesToUpdate / casesToCreate counts)

# 6. Apply via MCP (rate limit: 5/batch, 3s delay) OR REST:
QASE_API_TOKEN=... QASE_PROJECT_CODE=ACCESSFLOW \
  node scripts/qase/apply-engine-rules-delta.js

# Dry run
node scripts/qase/apply-engine-rules-delta.js --dry-run
```

## Case Structure

Each of the **167 engine rules** gets one Qase case:

- **Title:** `Unified Engine: {ruleId} — {rule title}`
- **Suite:** accessFlow-Engine (902)
- **Tags:** `unified-engine`, `e2e`, `engine`, `audit`, `regression`, `{ruleId}`
- **5 structured steps:** RAIDEN detail → pass examples → fail examples → atomic audit → AccessFlow scan alignment
- **Params:** one row per atomic fixture (pass/fail filename + expected result)

Legacy suite cases (27) are **updated** in place via `lib/legacy-case-mapping.js`. Remaining rules are **created**.

## Coverage Summary (generated)

- **167** engine rules
- **164** rules with atomic fixtures (836 pass + 580 fail)
- **3** metadata-only rules (manual review step)

## Idempotency

Re-run `compute-delta.js` after a successful apply. Unchanged cases should produce a zero-entry or minimal delta.

## Post-apply artifacts

After applying the delta:

| File | Purpose |
|------|---------|
| `engine-rules-apply-results.json` | Apply log (update/create IDs) |
| `engine-rules-qase-id-map.json` | `ruleId` → Qase case ID (167 rules) |
| `engine-rules-case-ids.json` | Flat list of all case IDs for `create_plan` |

```bash
node scripts/qase/build-rule-qase-mapping.js scripts/qase/engine-rules-apply-results.json
```
