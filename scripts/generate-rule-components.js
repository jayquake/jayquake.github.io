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

// Helper to extract HTML content from atomic test file (skip testconfig comment)
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

  // Extract title
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';

  // Extract description
  const descriptionMatch = content.match(/description:\s*"([^"]+)"/);
  const description = descriptionMatch ? descriptionMatch[1] : '';

  // Extract advice
  const adviceMatch = content.match(/advice:\s*`([^`]+)`/);
  const advice = adviceMatch ? adviceMatch[1] : '';

  // Extract rule id
  const idMatch = content.match(/id:\s*"([^"]+)"/);
  const ruleId = idMatch ? idMatch[1] : '';

  return { title, description, advice, ruleId };
}

// Generate Success component
function generateSuccessComponent(ruleName, metadata, passExamples) {
  const componentName = `${toPascalCase(ruleName)}Success`;

  const examplesJSX = passExamples.map((example, index) => {
    const fileName = path.basename(example.path, '.html');
    const displayName = fileName.replace(/-/g, ' ');

    return `      <div className="list-item">
        <h3>{/* ${displayName} */}</h3>
        <pre>
{\`${example.content}\`}
        </pre>
      </div>`;
  }).join('\n');

  const bestPractices = [
    `Follow proper HTML semantics for ${ruleName.replace(/-/g, ' ')}`,
    `Ensure accessibility attributes are correctly applied`,
    `Test with assistive technologies to verify implementation`,
    `Refer to WCAG guidelines for best practices`
  ];

  return `import React from "react";
import IssueSuccess from "../../../layout/issueSuccess";

const ${componentName} = () => {
  const description = "${metadata.description}";

  const helpText = "${metadata.advice}";

  const bestPractices = ${JSON.stringify(bestPractices, null, 4)};

  const content = (
    <div>
${examplesJSX}
    </div>
  );

  return (
    <IssueSuccess
      itemContent={content}
      itemDescription={description}
      helpText={helpText}
      bestPractices={bestPractices}
    />
  );
};

export default ${componentName};
`;
}

// Generate Failure component
function generateFailureComponent(ruleName, metadata, failExamples) {
  const componentName = `${toPascalCase(ruleName)}Failure`;

  const examplesJSX = failExamples.map((example, index) => {
    const fileName = path.basename(example.path, '.html');
    const displayName = fileName.replace(/-/g, ' ');

    return `      <div className="list-item">
        <h3>{/* ${displayName} */}</h3>
        <pre>
{\`${example.content}\`}
        </pre>
      </div>`;
  }).join('\n');

  const fixSteps = [
    `Identify and fix ${ruleName.replace(/-/g, ' ')} issues in your code`,
    `${metadata.advice}`,
    `Validate changes with accessibility testing tools`,
    `Retest with assistive technologies`
  ];

  return `import React from "react";
import IssueFailure from "../../../layout/issueFailure";

const ${componentName} = () => {
  const description = "${metadata.description}";

  const helpText = "${metadata.advice}";

  const fixSteps = ${JSON.stringify(fixSteps, null, 4)};

  const content = (
    <div>
${examplesJSX}
    </div>
  );

  return (
    <IssueFailure
      itemContent={content}
      itemDescription={description}
      helpText={helpText}
      fixSteps={fixSteps}
    />
  );
};

export default ${componentName};
`;
}

// Main function to process all rules
function generateComponents() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['interfaces.ts', 'index.ts'].includes(name));

  let created = 0;
  let skipped = 0;

  for (const ruleName of ruleDirs) {
    const rulePath = path.join(ENGINE_RULES_DIR, ruleName);
    const atomicTestsPath = path.join(rulePath, 'atomic-tests');

    // Skip if no atomic-tests folder
    if (!fs.existsSync(atomicTestsPath)) {
      console.log(`⏭️  Skipping ${ruleName} (no atomic-tests)`);
      skipped++;
      continue;
    }

    // Get rule metadata
    const metadata = getRuleMetadata(rulePath);
    if (!metadata) {
      console.log(`⏭️  Skipping ${ruleName} (no metadata)`);
      skipped++;
      continue;
    }

    // Read pass examples
    const passDir = path.join(atomicTestsPath, 'pass');
    const passExamples = [];
    if (fs.existsSync(passDir)) {
      const passFiles = fs.readdirSync(passDir).filter(f => f.endsWith('.html'));
      passFiles.forEach(file => {
        const filePath = path.join(passDir, file);
        const content = extractHTMLContent(filePath);
        passExamples.push({ path: filePath, content });
      });
    }

    // Read fail examples
    const failDir = path.join(atomicTestsPath, 'fail');
    const failExamples = [];
    if (fs.existsSync(failDir)) {
      const failFiles = fs.readdirSync(failDir).filter(f => f.endsWith('.html'));
      failFiles.forEach(file => {
        const filePath = path.join(failDir, file);
        const content = extractHTMLContent(filePath);
        failExamples.push({ path: filePath, content });
      });
    }

    // Generate Success component if pass examples exist
    if (passExamples.length > 0) {
      const successComponent = generateSuccessComponent(ruleName, metadata, passExamples);
      const successPath = path.join(rulePath, `${toPascalCase(ruleName)}Success.jsx`);
      fs.writeFileSync(successPath, successComponent);
      console.log(`✅ Created ${successPath}`);
      created++;
    }

    // Generate Failure component if fail examples exist
    if (failExamples.length > 0) {
      const failureComponent = generateFailureComponent(ruleName, metadata, failExamples);
      const failurePath = path.join(rulePath, `${toPascalCase(ruleName)}Failure.jsx`);
      fs.writeFileSync(failurePath, failureComponent);
      console.log(`✅ Created ${failurePath}`);
      created++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created} components`);
  console.log(`   Skipped: ${skipped} rules`);
}

// Run the generator
generateComponents();

