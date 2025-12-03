const fs = require('fs');
const path = require('path');

const ENGINE_RULES_DIR = path.join(__dirname, '../src/components/pages/engine-rules');
const OUTPUT_FILE = path.join(__dirname, '../src/data/engine-rules-metadata.json');

// Get all rule directories
function getAllRules() {
  const ruleDirs = fs.readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['interfaces.ts', 'index.ts'].includes(name));

  const allRules = [];

  for (const ruleName of ruleDirs) {
    const metadataPath = path.join(ENGINE_RULES_DIR, ruleName, 'metadata.js');
    
    if (!fs.existsSync(metadataPath)) {
      console.log(`⊘ Skipping ${ruleName} - no metadata.js`);
      continue;
    }

    try {
      // Read and parse the metadata file
      const content = fs.readFileSync(metadataPath, 'utf-8');
      
      // Extract the export
      const match = content.match(/export const (\w+) = \{([^}]+(?:\{[^}]+\}[^}]*)*)\};/s);
      
      if (!match) {
        console.error(`Could not parse metadata for: ${ruleName}`);
        continue;
      }

      const objectContent = match[2];
      
      // Extract fields
      const id = (objectContent.match(/id:\s*"([^"]+)"/)||['',''])[1];
      const titleMatch = objectContent.match(/title:\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1].replace(/\\"/g, '"') : '';
      const descriptionMatch = objectContent.match(/description:\s*"([^"]+)"/);
      const description = descriptionMatch ? descriptionMatch[1].replace(/\\"/g, '"') : '';
      const adviceMatch = objectContent.match(/advice:\s*`([^`]+)`/);
      const advice = adviceMatch ? adviceMatch[1].replace(/\\`/g, '`').replace(/\\\$/g, '$') : '';
      const impact = (objectContent.match(/impact:\s*"([^"]+)"/)||['',''])[1];
      
      // Extract refs array
      const refsMatch = objectContent.match(/refs:\s*\[([^\]]*)\]/s);
      let refs = [];
      if (refsMatch && refsMatch[1].trim()) {
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

      allRules.push({
        id,
        kebabId: ruleName,
        title,
        description,
        advice,
        impact,
        refs,
        detailUrl: `/engine/${ruleName}`,
        successUrl: `/engine/${ruleName}_success`,
        failureUrl: `/engine/${ruleName}_failure`,
      });
      
      console.log(`✓ Processed: ${ruleName}`);
    } catch (error) {
      console.error(`✗ Error processing ${ruleName}:`, error.message);
    }
  }

  return allRules;
}

// Generate the JSON file
function generateMetadataJSON() {
  const rules = getAllRules();
  
  // Sort by ID
  rules.sort((a, b) => a.id.localeCompare(b.id));
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rules, null, 2));
  
  console.log(`\n=== Summary ===`);
  console.log(`✅ Generated metadata for ${rules.length} rules`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);
  
  // Statistics
  const impactCounts = rules.reduce((acc, rule) => {
    acc[rule.impact] = (acc[rule.impact] || 0) + 1;
    return acc;
  }, {});
  
  console.log(`\n📊 Impact Distribution:`);
  Object.entries(impactCounts).sort(([,a], [,b]) => b - a).forEach(([impact, count]) => {
    console.log(`   ${impact}: ${count} rules`);
  });
}

// Run the generator
generateMetadataJSON();

