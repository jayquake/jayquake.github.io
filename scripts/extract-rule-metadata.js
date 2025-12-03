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

// Extract metadata from index.ts file WITHOUT executing the imports
function extractMetadataFromIndexTS(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the export const object (e.g., export const AltMisuse: Rule = { ... })
  const exportMatch = content.match(/export const (\w+):\s*Rule\s*=\s*\{([^}]+(?:\{[^}]+\}[^}]*)*)\}/s);

  if (!exportMatch) {
    console.error(`Could not extract metadata from: ${filePath}`);
    return null;
  }

  const exportName = exportMatch[1];
  const objectContent = exportMatch[2];

  // Extract individual fields
  const id = (objectContent.match(/id:\s*"([^"]+)"/)||['',''])[1];
  const title = (objectContent.match(/title:\s*"([^"]+)"/)||['',''])[1];
  const description = (objectContent.match(/description:\s*"([^"]+)"/)||['',''])[1];
  const advice = (objectContent.match(/advice:\s*`([^`]+)`/)||['',''])[1] || (objectContent.match(/advice:\s*"([^"]+)"/)||['',''])[1];
  const impact = (objectContent.match(/impact:\s*"([^"]+)"/)||['',''])[1];

  // Extract refs array
  const refsMatch = objectContent.match(/refs:\s*\[([^\]]+(?:\[[^\]]+\][^\]]*)*)\]/s);
  let refs = [];
  if (refsMatch) {
    const refsContent = refsMatch[1];
    const refObjects = refsContent.match(/\{[^}]+\}/g) || [];
    refs = refObjects.map(refStr => {
      const type = (refStr.match(/type:\s*"([^"]+)"/)||['',''])[1];
      const refId = (refStr.match(/id:\s*"([^"]+)"/)||['',''])[1];
      const level = (refStr.match(/level:\s*"([^"]+)"/)||['',''])[1];
      const link = (refStr.match(/link:\s*"([^"]+)"/)||['',''])[1];
      return { type, id: refId, level, link };
    });
  }

  return {
    exportName,
    id,
    title,
    description,
    advice,
    impact,
    refs
  };
}

// Generate a simple metadata export file
function generateMetadataFile(ruleName, metadata) {
  if (!metadata) return;

  const { exportName, id, title, description, advice, impact, refs } = metadata;

  // Escape special characters in strings
  const escapeForJS = (str) => str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');

  const refsArray = refs.map(ref => {
    const parts = [];
    if (ref.type) parts.push(`type: "${ref.type}"`);
    if (ref.id) parts.push(`id: "${ref.id}"`);
    if (ref.level) parts.push(`level: "${ref.level}"`);
    if (ref.link) parts.push(`link: "${ref.link}"`);
    return `    { ${parts.join(', ')} }`;
  }).join(',\n');

  const content = `// Generated metadata for ${ruleName}
// This file is auto-generated from index.ts to avoid module resolution issues

export const ${exportName} = {
  id: "${id}",
  title: "${escapeForJS(title)}",
  description: "${escapeForJS(description)}",
  advice: \`${escapeForJS(advice)}\`,
  impact: "${impact}",
  refs: [
${refsArray}
  ]
};
`;

  return content;
}

// Main function
function extractAllMetadata() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['interfaces.ts', 'index.ts'].includes(name));

  let successCount = 0;
  let errorCount = 0;

  for (const ruleName of ruleDirs) {
    const indexPath = path.join(ENGINE_RULES_DIR, ruleName, 'index.ts');

    if (!fs.existsSync(indexPath)) {
      console.log(`⊘ Skipping ${ruleName} - no index.ts`);
      continue;
    }

    try {
      const metadata = extractMetadataFromIndexTS(indexPath);
      if (metadata) {
        const metadataContent = generateMetadataFile(ruleName, metadata);
        const outputPath = path.join(ENGINE_RULES_DIR, ruleName, 'metadata.js');
        fs.writeFileSync(outputPath, metadataContent);
        successCount++;
        console.log(`✓ Generated metadata for: ${ruleName}`);
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${ruleName}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Success: ${successCount} metadata files`);
  console.log(`Errors: ${errorCount}`);
}

// Run the script
extractAllMetadata();

