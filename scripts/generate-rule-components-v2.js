const fs = require('fs');
const path = require('path');

const ENGINE_RULES_DIR = path.join(__dirname, '../src/components/pages/engine-rules');

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Helper to escape quotes in strings for JSX
function escapeForJSX(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

// Helper to extract HTML content from atomic test file
function extractHTMLContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Remove the testconfig comment
  const htmlContent = content.replace(/<!--testconfig[\s\S]*?-->\n?/, '').trim();
  return htmlContent;
}

// Helper to read rule metadata from index.ts
function getRuleMetadata(rulePath) {
  const indexPath = path.join(rulePath, 'index.ts');
  if (!fs.existsSync(indexPath)) return null;

  const content = fs.readFileSync(indexPath, 'utf-8');

  // Extract exports
  const ruleIdMatch = content.match(/export const ruleId = ['"](.*)['"];/);
  const descriptionMatch = content.match(/export const description = ['"](.*)['"];/);
  const helpTextMatch = content.match(/export const helpText = ['"](.*)['"];/);
  const bestPracticesMatch = content.match(/export const bestPractices = \[([\s\S]*?)\];/);
  const fixStepsMatch = content.match(/export const fixSteps = \[([\s\S]*?)\];/);

  const extractArrayContent = (match) => {
    if (!match || !match[1]) return [];
    return match[1]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith("'") || line.startsWith('"'))
      .map(line => {
        // Remove quotes and trailing comma
        const cleaned = line.replace(/^['"]|['"],?$/g, '');
        return cleaned;
      });
  };

  return {
    ruleId: ruleIdMatch ? ruleIdMatch[1] : 'N/A',
    description: descriptionMatch ? descriptionMatch[1] : 'N/A',
    helpText: helpTextMatch ? helpTextMatch[1] : 'N/A',
    bestPractices: extractArrayContent(bestPracticesMatch),
    fixSteps: extractArrayContent(fixStepsMatch),
  };
}

// Generate Success component using EngineIssueSuccess layout
function generateSuccessComponent(ruleName, pascalName, htmlExamples, metadata) {
  const { ruleId, description, helpText, bestPractices } = metadata;
  const title = pascalName.replace(/([A-Z])/g, ' $1').trim();

  // Create array of HTML examples with filenames
  const htmlExamplesArray = htmlExamples.map(({ filename, content }) => {
    const escapedHtml = escapeForJSX(content);
    const escapedFilename = escapeForJSX(filename);
    return `  { filename: "${escapedFilename}", content: \`${escapedHtml}\` }`;
  }).join(',\n');

  const bestPracticesArray = bestPractices.length > 0
    ? bestPractices.map(bp => `  "${escapeForJSX(bp)}",`).join('\n')
    : '  "Follow proper HTML semantics",\n  "Ensure screen reader compatibility",\n  "Test with assistive technologies"';

  return `import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ${pascalName}Success = () => {
  return (
    <EngineIssueSuccess
      ruleId="${escapeForJSX(ruleId)}"
      title="${escapeForJSX(title)}"
      description="${escapeForJSX(description)}"
      helpText="${escapeForJSX(helpText)}"
      bestPractices={[
${bestPracticesArray}
      ]}
      htmlExamples={[
${htmlExamplesArray}
      ]}
    />
  );
};

export default ${pascalName}Success;
`;
}

// Generate Failure component using EngineIssueFailure layout
function generateFailureComponent(ruleName, pascalName, htmlExamples, metadata) {
  const { ruleId, description, helpText, fixSteps } = metadata;
  const title = pascalName.replace(/([A-Z])/g, ' $1').trim();

  // Create array of HTML examples with filenames
  const htmlExamplesArray = htmlExamples.map(({ filename, content }) => {
    const escapedHtml = escapeForJSX(content);
    const escapedFilename = escapeForJSX(filename);
    return `  { filename: "${escapedFilename}", content: \`${escapedHtml}\` }`;
  }).join(',\n');

  const fixStepsArray = fixSteps.length > 0
    ? fixSteps.map(fs => `  "${escapeForJSX(fs)}",`).join('\n')
    : '  "Review the HTML structure",\n  "Apply proper accessibility attributes",\n  "Test with screen readers"';

  return `import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ${pascalName}Failure = () => {
  return (
    <EngineIssueFailure
      ruleId="${escapeForJSX(ruleId)}"
      title="${escapeForJSX(title)}"
      description="${escapeForJSX(description)}"
      helpText="${escapeForJSX(helpText)}"
      fixSteps={[
${fixStepsArray}
      ]}
      htmlExamples={[
${htmlExamplesArray}
      ]}
    />
  );
};

export default ${pascalName}Failure;
`;
}

// Main generator function
function generateRuleComponents() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['interfaces.ts', 'index.ts'].includes(name));

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

    const passAtomicTestDir = path.join(rulePath, 'atomic-tests', 'pass');
    const failAtomicTestDir = path.join(rulePath, 'atomic-tests', 'fail');

    // Generate Success components
    if (fs.existsSync(passAtomicTestDir)) {
      const passFiles = fs.readdirSync(passAtomicTestDir).filter(file => file.endsWith('.html'));
      if (passFiles.length > 0) {
        const htmlExamples = passFiles.map(file => ({
          filename: file.replace('.html', '').replace(/-/g, ' '),
          content: extractHTMLContent(path.join(passAtomicTestDir, file))
        }));

        const componentContent = generateSuccessComponent(ruleName, pascalName, htmlExamples, metadata);
        const outputPath = path.join(rulePath, `${pascalName}Success.jsx`);
        fs.writeFileSync(outputPath, componentContent);
        successCount++;
      }
    }

    // Generate Failure components
    if (fs.existsSync(failAtomicTestDir)) {
      const failFiles = fs.readdirSync(failAtomicTestDir).filter(file => file.endsWith('.html'));
      if (failFiles.length > 0) {
        const htmlExamples = failFiles.map(file => ({
          filename: file.replace('.html', '').replace(/-/g, ' '),
          content: extractHTMLContent(path.join(failAtomicTestDir, file))
        }));

        const componentContent = generateFailureComponent(ruleName, pascalName, htmlExamples, metadata);
        const outputPath = path.join(rulePath, `${pascalName}Failure.jsx`);
        fs.writeFileSync(outputPath, componentContent);
        failureCount++;
      }
    }
  }

  console.log('\n=== Generation Summary ===');
  console.log(`✅ Success components: ${successCount}`);
  console.log(`❌ Failure components: ${failureCount}`);
  console.log(`⚠️  Errors: ${errorCount}`);
  console.log(`\n📁 Output directory: ${ENGINE_RULES_DIR}`);
}

// Run the generator
generateRuleComponents();

