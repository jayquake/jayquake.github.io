const fs = require("fs");
const path = require("path");

const ENGINE_RULES_DIR = path.join(
  __dirname,
  "../src/components/pages/engine-rules"
);

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// Helper to escape strings for template literals
function escapeForJSX(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\") // Escape backslashes first
    .replace(/`/g, "\\`") // Escape backticks for template literals
    .replace(/\$/g, "\\$"); // Escape dollar signs to prevent ${} interpolation
}

// Helper to escape strings for double-quoted strings in arrays
function escapeForDoubleQuotes(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\") // Escape backslashes first
    .replace(/"/g, '\\"'); // Escape double quotes
}

// Helper to extract HTML content from atomic test file
function extractHTMLContent(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  // Remove the testconfig comment
  const htmlContent = content
    .replace(/<!--testconfig[\s\S]*?-->\n?/, "")
    .trim();
  return htmlContent;
}

// Helper to read rule metadata from metadata.js
function getRuleMetadata(rulePath) {
  const metadataPath = path.join(rulePath, "metadata.js");
  if (!fs.existsSync(metadataPath)) return null;

  const content = fs.readFileSync(metadataPath, "utf-8");

  // Extract the object content
  const objectMatch = content.match(
    /export const \w+ = \{([^}]+(?:\{[^}]+\}[^}]*)*)\}/s
  );
  if (!objectMatch) return null;

  const objectContent = objectMatch[1];

  // Extract individual fields
  const id = (objectContent.match(/id:\s*"([^"]+)"/) || ["", ""])[1];

  // Extract title (supports both template literals and double quotes, multiline)
  const titleTemplateMatch = objectContent.match(/title:\s*`([\s\S]*?)`/);
  const titleQuoteMatch = objectContent.match(/title:\s*"([^"]+)"/);
  const title = titleTemplateMatch
    ? titleTemplateMatch[1]
    : titleQuoteMatch
    ? titleQuoteMatch[1].replace(/\\"/g, '"')
    : "";

  // Extract description (supports both template literals and double quotes, multiline)
  const descriptionTemplateMatch = objectContent.match(
    /description:\s*`([\s\S]*?)`/
  );
  const descriptionQuoteMatch = objectContent.match(/description:\s*"([^"]+)"/);
  const description = descriptionTemplateMatch
    ? descriptionTemplateMatch[1]
    : descriptionQuoteMatch
    ? descriptionQuoteMatch[1].replace(/\\"/g, '"')
    : "";

  // Extract advice (template literal, multiline)
  const adviceMatch = objectContent.match(/advice:\s*`([\s\S]*?)`/);
  const advice = adviceMatch
    ? adviceMatch[1]
        .replace(/\\`/g, "`")
        .replace(/\\\$/g, "$")
        .replace(/\\"/g, '"')
    : "";

  return {
    ruleId: id || "N/A",
    title: title || "N/A",
    description: description || "N/A",
    helpText: advice || "N/A",
    bestPractices: [], // Can be populated from advice if needed
    fixSteps: [], // Can be populated from advice if needed
  };
}

// Generate Success component using EngineIssueSuccess layout
function generateSuccessComponent(
  ruleName,
  pascalName,
  htmlExamples,
  metadata
) {
  const { ruleId, title, description, helpText, bestPractices } = metadata;

  // Create array of HTML examples with filenames
  const htmlExamplesArray = htmlExamples
    .map(({ filename, content }) => {
      const escapedHtml = escapeForJSX(content);
      const escapedFilename = escapeForDoubleQuotes(filename);
      return `  { filename: "${escapedFilename}", content: \`${escapedHtml}\` }`;
    })
    .join(",\n");

  const bestPracticesArray =
    bestPractices.length > 0
      ? bestPractices
          .map((bp) => `  "${escapeForDoubleQuotes(bp)}",`)
          .join("\n")
      : '  "Follow proper HTML semantics",\n  "Ensure screen reader compatibility",\n  "Test with assistive technologies"';

  return `import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ${pascalName}Success = () => {
  const ruleId = "${escapeForDoubleQuotes(ruleId)}";
  const title = \`${escapeForJSX(title)}\`;
  const description = \`${escapeForJSX(description)}\`;
  const helpText = \`${escapeForJSX(helpText)}\`;
  const bestPractices = [
${bestPracticesArray}
  ];
  const htmlExamples = [
${htmlExamplesArray}
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default ${pascalName}Success;
`;
}

// Generate Failure component using EngineIssueFailure layout
function generateFailureComponent(
  ruleName,
  pascalName,
  htmlExamples,
  metadata
) {
  const { ruleId, title, description, helpText, fixSteps } = metadata;

  // Create array of HTML examples with filenames
  const htmlExamplesArray = htmlExamples
    .map(({ filename, content }) => {
      const escapedHtml = escapeForJSX(content);
      const escapedFilename = escapeForDoubleQuotes(filename);
      return `  { filename: "${escapedFilename}", content: \`${escapedHtml}\` }`;
    })
    .join(",\n");

  const fixStepsArray =
    fixSteps.length > 0
      ? fixSteps.map((fs) => `  "${escapeForDoubleQuotes(fs)}",`).join("\n")
      : '  "Review the HTML structure",\n  "Apply proper accessibility attributes",\n  "Test with screen readers"';

  return `import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ${pascalName}Failure = () => {
  const ruleId = "${escapeForDoubleQuotes(ruleId)}";
  const title = \`${escapeForJSX(title)}\`;
  const description = \`${escapeForJSX(description)}\`;
  const helpText = \`${escapeForJSX(helpText)}\`;
  const fixSteps = [
${fixStepsArray}
  ];
  const htmlExamples = [
${htmlExamplesArray}
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default ${pascalName}Failure;
`;
}

// Main generator function
function generateRuleComponents() {
  const ruleDirs = fs
    .readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => !["interfaces.ts", "index.ts"].includes(name));

  let successCount = 0;
  let failureCount = 0;
  let errorCount = 0;

  for (const ruleName of ruleDirs) {
    const rulePath = path.join(ENGINE_RULES_DIR, ruleName);
    const pascalName = toPascalCase(ruleName);
    const metadata = getRuleMetadata(rulePath);

    if (!metadata) {
      console.log(`⚠️  Skipping ${ruleName}: No metadata found`);
      errorCount++;
      continue;
    }

    const passAtomicTestDir = path.join(rulePath, "atomic-tests", "pass");
    const failAtomicTestDir = path.join(rulePath, "atomic-tests", "fail");

    // Generate Success components
    if (fs.existsSync(passAtomicTestDir)) {
      const passFiles = fs
        .readdirSync(passAtomicTestDir)
        .filter((file) => file.endsWith(".html"));
      if (passFiles.length > 0) {
        const htmlExamples = passFiles.map((file) => ({
          filename: file.replace(".html", "").replace(/-/g, " "),
          content: extractHTMLContent(path.join(passAtomicTestDir, file)),
        }));

        const componentContent = generateSuccessComponent(
          ruleName,
          pascalName,
          htmlExamples,
          metadata
        );
        const outputPath = path.join(rulePath, `${pascalName}Success.jsx`);
        fs.writeFileSync(outputPath, componentContent);
        successCount++;
      }
    }

    // Generate Failure components
    if (fs.existsSync(failAtomicTestDir)) {
      const failFiles = fs
        .readdirSync(failAtomicTestDir)
        .filter((file) => file.endsWith(".html"));
      if (failFiles.length > 0) {
        const htmlExamples = failFiles.map((file) => ({
          filename: file.replace(".html", "").replace(/-/g, " "),
          content: extractHTMLContent(path.join(failAtomicTestDir, file)),
        }));

        const componentContent = generateFailureComponent(
          ruleName,
          pascalName,
          htmlExamples,
          metadata
        );
        const outputPath = path.join(rulePath, `${pascalName}Failure.jsx`);
        fs.writeFileSync(outputPath, componentContent);
        failureCount++;
      }
    }
  }

  console.log("\n=== Generation Summary ===");
  console.log(`✅ Success components: ${successCount}`);
  console.log(`❌ Failure components: ${failureCount}`);
  console.log(`⚠️  Errors: ${errorCount}`);
  console.log(`\n📁 Output directory: ${ENGINE_RULES_DIR}`);
}

// Run the generator
generateRuleComponents();
