const fs = require("fs");
const path = require("path");

const ENGINE_RULES_DIR = path.join(
  __dirname,
  "../../../src/components/pages/engine-rules"
);
const METADATA_PATH = path.join(
  __dirname,
  "../../../src/data/engine-rules-metadata.json"
);

const IMPACT_TO_SEVERITY = {
  blocker: 2,
  critical: 2,
  major: 3,
  medium: 4,
  minor: 5,
};

function parseTestConfig(content) {
  const match = content.match(/<!--testconfig\s*([\s\S]*?)-->/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function extractHtml(content) {
  return content.replace(/<!--testconfig[\s\S]*?-->\n?/, "").trim();
}

function readFixtures(ruleDir, variant) {
  const dir = path.join(ruleDir, "atomic-tests", variant);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((filename) => {
      const fullPath = path.join(dir, filename);
      const content = fs.readFileSync(fullPath, "utf-8");
      const config = parseTestConfig(content);
      const html = extractHtml(content);
      const label = filename.replace(/\.html$/, "").replace(/-/g, " ");
      return {
        filename,
        label,
        variant,
        relativePath: `atomic-tests/${variant}/${filename}`,
        htmlPreview: html.length > 200 ? `${html.slice(0, 200)}…` : html,
        config,
        expectedResult: variant === "pass" ? "Passed node" : "Failed node",
      };
    });
}

function getMetadataById() {
  const rows = JSON.parse(fs.readFileSync(METADATA_PATH, "utf-8"));
  const map = new Map();
  for (const row of rows) {
    const id = row.id || row.kebabId;
    if (id) map.set(id, row);
  }
  return map;
}

function buildStep(actionLines, expectedLines, dataLines = []) {
  const action = [
    "Action:",
    ...actionLines.map((line, i) => `${i + 1}. ${line}`),
  ].join("\n");
  const expected_result = [
    "Expected Result:",
    ...expectedLines.map((line, i) => `${i + 1}. ${line}`),
  ].join("\n");
  const data =
    dataLines.length > 0
      ? ["Data:", ...dataLines.map((line) => line)].join("\n")
      : "";
  return { action, expected_result, data, attachments: [] };
}

function buildCaseForRule(ruleId, metadata) {
  const ruleDir = path.join(ENGINE_RULES_DIR, ruleId);
  const passFixtures = readFixtures(ruleDir, "pass");
  const failFixtures = readFixtures(ruleDir, "fail");
  const allFixtures = [...passFixtures, ...failFixtures];

  const title = metadata?.title || ruleId;
  const description = metadata?.description || "";
  const advice = metadata?.advice || "";
  const impact = (metadata?.impact || "medium").toLowerCase();
  const severity = IMPACT_TO_SEVERITY[impact] ?? 4;

  const caseTitle = `Unified Engine: ${ruleId} — ${title}`.slice(0, 255);

  const caseDescription = [
    `**Engine rule ID:** \`${ruleId}\``,
    `**RAIDEN routes:** \`/engine/${ruleId}\`, \`/engine/${ruleId}_success\`, \`/engine/${ruleId}_failure\``,
    `**Atomic tests:** \`src/components/pages/engine-rules/${ruleId}/atomic-tests/\``,
    `**Qase suite:** accessFlow-Engine (902)`,
    "",
    "## Flow Phases",
    "",
    "### Phase 1 — RAIDEN Library Review (Steps 1–3)",
    "Validate rule metadata and HTML examples in the Engine Rules Library.",
    "",
    "### Phase 2 — Atomic Auditor Validation (Step 4)",
    "Run core-engine atomic audit against each fixture; confirm pass/fail node expectations.",
    "",
    "### Phase 3 — AccessFlow Issue Alignment (Step 5)",
    "Scan a page hosting the fixtures; generated issues must match RAIDEN examples.",
    "",
    "---",
    "",
    description ? `**Rule description:** ${description}` : "",
    advice ? `**Remediation advice:** ${advice}` : "",
    `**Fixtures:** ${passFixtures.length} pass, ${failFixtures.length} fail`,
  ]
    .filter(Boolean)
    .join("\n");

  const preconditions = [
    "1. **RAIDEN** Engine Rules Library running (`BASE_URL` from project `.env`).",
    "2. **core-engine-auditor** atomic test runner available for rule validation.",
    "3. **AccessFlow** environment with website scan capability.",
    `4. **Rule** \`${ruleId}\` examples published at \`/engine/${ruleId}_success\` and \`/engine/${ruleId}_failure\`.`,
    `5. **Fixture count:** ${passFixtures.length} pass, ${failFixtures.length} fail atomic HTML files.`,
  ].join("\n");

  const postconditions = [
    "1. All pass fixtures produce **passed nodes** in atomic audit and no false-positive issues in AccessFlow.",
    "2. All fail fixtures produce **failed nodes** in atomic audit and matching issues in AccessFlow.",
    "3. RAIDEN example pages match atomic fixture HTML and expected outcomes.",
  ].join("\n");

  const fixtureList =
    allFixtures.length > 0
      ? allFixtures
          .map(
            (f) =>
              `- ${f.variant}/${f.filename} → ${f.expectedResult}${
                f.config?.expect
                  ? ` (${JSON.stringify(f.config.expect)})`
                  : ""
              }`
          )
          .join("\n")
      : "- No atomic fixtures (metadata-only rule)";

  const steps = [
    buildStep(
      [
        `**Step 1 — Open rule detail page in RAIDEN**`,
        `Navigate to \`/engine/${ruleId}\` in the Engine Rules Library.`,
        `Verify rule title, description, WCAG references, and impact (\`${impact}\`) are displayed.`,
        `Confirm navigation breadcrumbs show Engine Rules → ${ruleId}.`,
      ],
      [
        "Rule detail page loads without errors.",
        "Title and description match engine-rules metadata.",
        "WCAG references and remediation advice are visible when present.",
      ],
      [
        `BASE_URL/engine/${ruleId}`,
        `ruleId = ${ruleId}`,
        `impact = ${impact}`,
      ]
    ),
    buildStep(
      [
        `**Step 2 — Review compliant (pass) examples**`,
        `Navigate to \`/engine/${ruleId}_success\`.`,
        `For each pass fixture listed in Data, locate the matching HTML example card.`,
        `Verify each example is labeled compliant and HTML matches the atomic fixture.`,
      ],
      [
        "Success page loads with COMPLIANT status chip.",
        "Each pass fixture from atomic-tests/pass/ is represented as an example.",
        "Example HTML content matches the corresponding atomic test file.",
      ],
      [
        `BASE_URL/engine/${ruleId}_success`,
        `passFixtures = ${passFixtures.length}`,
        ...passFixtures.slice(0, 5).map((f) => f.relativePath),
      ]
    ),
    buildStep(
      [
        `**Step 3 — Review non-compliant (fail) examples**`,
        `Navigate to \`/engine/${ruleId}_failure\`.`,
        `For each fail fixture listed in Data, locate the matching HTML example card.`,
        `Verify each example is labeled needs-fix and HTML matches the atomic fixture.`,
      ],
      [
        "Failure page loads with NEEDS FIX status chip.",
        "Each fail fixture from atomic-tests/fail/ is represented as an example.",
        "Example HTML content matches the corresponding atomic test file.",
      ],
      [
        `BASE_URL/engine/${ruleId}_failure`,
        `failFixtures = ${failFixtures.length}`,
        ...failFixtures.slice(0, 5).map((f) => f.relativePath),
      ]
    ),
    buildStep(
      [
        `**Step 4 — Run atomic auditor on each fixture**`,
        `For each fixture in Data, run the core-engine atomic test harness.`,
        `Assert \`response.passed === true\` for pass fixtures and \`false\` for fail fixtures.`,
        `Verify passedNodes/failedNodes match testconfig expect blocks.`,
      ],
      [
        "All pass fixtures return response.passed = true.",
        "All fail fixtures return response.passed = false.",
        "Node-level expect.passedNodes / expect.failedNodes assertions pass.",
      ],
      [
        `testedClass from index.ts for ${ruleId}`,
        fixtureList,
      ]
    ),
    buildStep(
      [
        `**Step 5 — Validate AccessFlow scan issues align with examples**`,
        `Host pass and fail fixture HTML on a test webpage (or use RAIDEN example URLs).`,
        `Run an AccessFlow scan on the page with rule \`${ruleId}\` enabled.`,
        `Compare generated issues against RAIDEN fail examples; pass examples must not raise false positives.`,
      ],
      [
        "AccessFlow scan completes successfully.",
        "Issues for fail fixtures match rule title and affected nodes from atomic tests.",
        "No issues raised for pass-only scenarios (no false positives).",
      ],
      [
        `ruleId = ${ruleId}`,
        `issueSource = RAIDEN examples at /engine/${ruleId}_success and /engine/${ruleId}_failure`,
      ]
    ),
  ];

  const params = {
    scenario: allFixtures.map(
      (f) => `${f.variant}: ${f.label} (${f.filename})`
    ),
    fixturePath: allFixtures.map((f) => f.relativePath),
    expectedResult: allFixtures.map((f) => f.expectedResult),
  };

  if (allFixtures.length === 0) {
    params.scenario = ["metadata-only: no atomic fixtures"];
    params.fixturePath = ["n/a"];
    params.expectedResult = ["Manual review required"];
  }

  return {
    ruleId,
    title: caseTitle,
    description: caseDescription,
    preconditions,
    postconditions,
    severity,
    priority: 1,
    type: 8,
    layer: 1,
    behavior: 2,
    automation: 1,
    status: 3,
    is_flaky: false,
    steps_type: "classic",
    suite_id: 902,
    tags: ["unified-engine", "e2e", "engine", "audit", "regression", ruleId],
    custom_field: { 2: "8" },
    steps,
    params,
    fixtureSummary: {
      pass: passFixtures.length,
      fail: failFixtures.length,
      total: allFixtures.length,
    },
  };
}

function listRuleIds() {
  return fs
    .readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !name.startsWith("_"))
    .sort();
}

function buildAllCases() {
  const metadataById = getMetadataById();
  const ruleIds = listRuleIds();
  const cases = {};

  for (const ruleId of ruleIds) {
    const metadata = metadataById.get(ruleId);
    cases[ruleId] = buildCaseForRule(ruleId, metadata);
  }

  return { ruleIds, cases };
}

module.exports = {
  buildCaseForRule,
  buildAllCases,
  listRuleIds,
  readFixtures,
  ENGINE_RULES_DIR,
};
