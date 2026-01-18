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

// Helper to convert kebab-case to Title Case
function toTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper to extract HTML content from atomic test file
function extractHTMLContent(filePath) {
  if (!fs.existsSync(filePath)) return '';
  
  const content = fs.readFileSync(filePath, 'utf-8');
  // Remove the testconfig comment
  const htmlContent = content.replace(/<!--testconfig[\s\S]*?-->\n?/, '').trim();
  return htmlContent;
}

// Escape special characters in strings for JSX
function escapeForJSX(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// Generate Success component template
function generateSuccessComponent(ruleName, successExamples) {
  const componentName = `${toPascalCase(ruleName)}Success`;
  const title = toTitleCase(ruleName);
  const ruleId = ruleName;
  
  const description = `This rule ensures proper ${title.toLowerCase()} implementation for accessibility.`;
  const helpText = `Ensure proper ${title.toLowerCase()} usage following WCAG guidelines.`;
  
  const bestPractices = [
    `Follow proper HTML semantics for ${title.toLowerCase()}`,
    'Ensure screen reader compatibility',
    'Test with assistive technologies',
    'Follow WCAG 2.1 guidelines'
  ];

  const examplesCode = successExamples.map((example, index) => `  {
    title: "Example ${index + 1}: ${example.name}",
    code: \`${escapeForJSX(example.html)}\`
  }`).join(',\n');

  return `import React from 'react';
import IssueSuccess from '../../../layout/issueSuccess';

const ruleId = "${ruleId}";
const title = "${title}";
const description = "${description}";

const helpText = "${helpText}";

const bestPractices = [
  "${bestPractices.join('",\n  "')}"
];

const successExamples = [
${examplesCode}
];

const ${componentName} = () => {
  return (
    <IssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      successExamples={successExamples}
    />
  );
};

export default ${componentName};
`;
}

// Generate Failure component template
function generateFailureComponent(ruleName, failureExamples) {
  const componentName = `${toPascalCase(ruleName)}Failure`;
  const title = toTitleCase(ruleName);
  const ruleId = ruleName;
  
  const description = `This rule ensures proper ${title.toLowerCase()} implementation for accessibility.`;
  const helpText = `Ensure proper ${title.toLowerCase()} usage following WCAG guidelines.`;
  
  const fixSteps = [
    `Identify and fix ${title.toLowerCase()} issues in your code`,
    'Test with screen readers',
    'Validate against WCAG 2.1 guidelines',
    'Verify with automated accessibility tools'
  ];

  const examplesCode = failureExamples.map((example, index) => `  {
    title: "Example ${index + 1}: ${example.name}",
    code: \`${escapeForJSX(example.html)}\`,
    error: "This example demonstrates improper usage"
  }`).join(',\n');

  return `import React from 'react';
import IssueFailure from '../../../layout/issueFailure';

const ruleId = "${ruleId}";
const title = "${title}";
const description = "${description}";

const helpText = "${helpText}";

const fixSteps = [
  "${fixSteps.join('",\n  "')}"
];

const failureExamples = [
${examplesCode}
];

const ${componentName} = () => {
  return (
    <IssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      failureExamples={failureExamples}
    />
  );
};

export default ${componentName};
`;
}

// Process all rules
function processAllRules() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let fixed = 0;
  let errors = 0;

  for (const ruleName of ruleDirs) {
    try {
      const rulePath = path.join(ENGINE_RULES_DIR, ruleName);
      const atomicTestsPath = path.join(rulePath, 'atomic-tests');
      
      if (!fs.existsSync(atomicTestsPath)) continue;

      // Get pass examples
      const passDir = path.join(atomicTestsPath, 'pass');
      const passExamples = [];
      if (fs.existsSync(passDir)) {
        const passFiles = fs.readdirSync(passDir).filter(f => f.endsWith('.html'));
        for (const file of passFiles) {
          const html = extractHTMLContent(path.join(passDir, file));
          if (html) {
            passExamples.push({
              name: file.replace('.html', '').replace(/-/g, ' '),
              html
            });
          }
        }
      }

      // Get fail examples
      const failDir = path.join(atomicTestsPath, 'fail');
      const failExamples = [];
      if (fs.existsSync(failDir)) {
        const failFiles = fs.readdirSync(failDir).filter(f => f.endsWith('.html'));
        for (const file of failFiles) {
          const html = extractHTMLContent(path.join(failDir, file));
          if (html) {
            failExamples.push({
              name: file.replace('.html', '').replace(/-/g, ' '),
              html
            });
          }
        }
      }

      // Generate Success component
      if (passExamples.length > 0) {
        const successContent = generateSuccessComponent(ruleName, passExamples);
        fs.writeFileSync(
          path.join(rulePath, `${toPascalCase(ruleName)}Success.jsx`),
          successContent
        );
      }

      // Generate Failure component
      if (failExamples.length > 0) {
        const failureContent = generateFailureComponent(ruleName, failExamples);
        fs.writeFileSync(
          path.join(rulePath, `${toPascalCase(ruleName)}Failure.jsx`),
          failureContent
        );
      }

      fixed++;
      console.log(`✓ Fixed: ${ruleName}`);
    } catch (error) {
      errors++;
      console.error(`✗ Error fixing ${ruleName}:`, error.message);
    }
  }

  console.log(`\n=== Fix Summary ===`);
  console.log(`Fixed: ${fixed} rules`);
  console.log(`Errors: ${errors}`);
}

processAllRules();

