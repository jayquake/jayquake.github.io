const fs = require('fs');
const path = require('path');

const ENGINE_RULES_DIR = path.join(__dirname, '../src/components/pages/engine-rules');
const OUTPUT_FILE = path.join(__dirname, '../src/routes/engineRoutes.jsx');

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Get the actual export name from metadata.js file
function getExportNameFromMetadata(metadataPath) {
  if (!fs.existsSync(metadataPath)) return null;

  const content = fs.readFileSync(metadataPath, 'utf-8');
  const match = content.match(/export const (\w+) = \{/);
  return match ? match[1] : null;
}

// Get all rule directories that have Success and Failure components
function getRulesWithComponents() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['interfaces.ts', 'index.ts'].includes(name));

  const rulesWithComponents = [];

  for (const ruleName of ruleDirs) {
    const rulePath = path.join(ENGINE_RULES_DIR, ruleName);
    const pascalName = toPascalCase(ruleName);

    const successPath = path.join(rulePath, `${pascalName}Success.jsx`);
    const failurePath = path.join(rulePath, `${pascalName}Failure.jsx`);
    const metadataPath = path.join(rulePath, 'metadata.js');

    // Check if Success and Failure components exist
    if (fs.existsSync(successPath) && fs.existsSync(failurePath)) {
      // Get the actual export name from metadata file (may differ from pascalCase due to acronyms)
      const actualExportName = getExportNameFromMetadata(metadataPath) || pascalName;

      rulesWithComponents.push({
        kebabName: ruleName,
        pascalName: pascalName, // Used for component names
        exportName: actualExportName, // Used for metadata import
        rulePath: ruleName,
      });
    }
  }

  return rulesWithComponents;
}

// Generate the routes file
function generateRoutesFile() {
  const rules = getRulesWithComponents();

  // Generate imports
  const imports = [];
  const routes = [];

  rules.forEach(rule => {
    const { kebabName, pascalName, exportName, rulePath } = rule;

    // Import statements - use metadata.js files to avoid module resolution issues
    // Use exportName for metadata (may have special capitalizations like SVG, PDF, etc.)
    imports.push(`import { ${exportName} } from "../components/pages/engine-rules/${kebabName}/metadata.js";`);
    imports.push(`import ${pascalName}Success from "../components/pages/engine-rules/${kebabName}/${pascalName}Success";`);
    imports.push(`import ${pascalName}Failure from "../components/pages/engine-rules/${kebabName}/${pascalName}Failure";`);

    // Route elements
    // Detail page route (use exportName for the rule data)
    routes.push(`    <Route
      path="/engine/${kebabName}"
      element={<EngineRulePage ruleData={${exportName}} />}
    />`);
    // Success page route
    routes.push(`    <Route
      path="/engine/${kebabName}_success"
      element={<${pascalName}Success />}
    />`);
    // Failure page route
    routes.push(`    <Route
      path="/engine/${kebabName}_failure"
      element={<${pascalName}Failure />}
    />`);
  });

  // Generate the complete file
  const fileContent = `import React from "react";
import { Route } from "react-router-dom";
import EngineRulePage from "../components/layout/engineRulePage";

// Import all engine rules and their components
${imports.join('\n')}

const EngineRoutes = () => (
  <>
${routes.join('\n')}
  </>
);

export default EngineRoutes;
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`✅ Generated engineRoutes.jsx with ${rules.length} rules (${routes.length} routes)`);
  console.log(`   Routes per rule: 1 detail + 1 success + 1 failure = 3 routes`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

// Run the generator
generateRoutesFile();

