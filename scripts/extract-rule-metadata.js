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

// Extract metadata from index.ts file WITHOUT executing the imports
function extractMetadataFromIndexTS(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract the export const object (e.g., export const AltMisuse: Rule = { ... })
  // Need to handle nested braces properly
  const exportStartMatch = content.match(/export const (\w+):\s*Rule\s*=\s*\{/);

  if (!exportStartMatch) {
    console.error(`Could not extract metadata from: ${filePath}`);
    return null;
  }

  const exportName = exportStartMatch[1];
  const startIndex = exportStartMatch.index + exportStartMatch[0].length;

  // Find the closing brace by counting braces
  let braceCount = 1;
  let endIndex = startIndex;
  let inString = false;
  let stringChar = null;
  let escaped = false;

  for (let i = startIndex; i < content.length && braceCount > 0; i++) {
    const char = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if ((char === '"' || char === "'" || char === "`") && !inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar && inString) {
      inString = false;
      stringChar = null;
    } else if (!inString) {
      if (char === "{") braceCount++;
      if (char === "}") braceCount--;
    }

    if (braceCount === 0) {
      endIndex = i;
      break;
    }
  }

  const objectContent = content.substring(startIndex, endIndex);

  // Helper to extract a field value (handles strings and template literals)
  const extractField = (fieldName) => {
    // Try to match the field with quoted string or template literal
    const regex = new RegExp(`${fieldName}:\\s*(["\`'])([\\s\\S]*?)\\1`, "m");
    const match = objectContent.match(regex);
    return match ? match[2] : "";
  };

  // Extract individual fields
  const id = extractField("id");
  const title = extractField("title");
  const description = extractField("description");
  const advice = extractField("advice");
  const impactMatch = objectContent.match(/impact:\s*["']([^"']+)["']/);
  const impact = impactMatch ? impactMatch[1] : "";

  // Extract refs array
  const refsMatch = objectContent.match(/refs:\s*\[([\s\S]*?)\]/);
  let refs = [];
  if (refsMatch) {
    const refsContent = refsMatch[1];
    // Match each object in the refs array
    const refObjects = [];
    const refObjRegex = /\{[\s\S]*?\}/g;
    let refMatch;

    while ((refMatch = refObjRegex.exec(refsContent)) !== null) {
      const refStr = refMatch[0];
      const typeMatch = refStr.match(/type:\s*["']([^"']+)["']/);
      const idMatch = refStr.match(/id:\s*["']([^"']+)["']/);
      const levelMatch = refStr.match(/level:\s*["']([^"']+)["']/);
      const linkMatch = refStr.match(/link:\s*["']([^"']+)["']/);

      refObjects.push({
        type: typeMatch ? typeMatch[1] : "",
        id: idMatch ? idMatch[1] : "",
        level: levelMatch ? levelMatch[1] : "",
        link: linkMatch ? linkMatch[1] : "",
      });
    }
    refs = refObjects;
  }

  return {
    exportName,
    id,
    title,
    description,
    advice,
    impact,
    refs,
  };
}

// Generate a simple metadata export file
function generateMetadataFile(ruleName, metadata) {
  if (!metadata) return;

  const { exportName, id, title, description, advice, impact, refs } = metadata;

  // Escape special characters in strings
  const escapeForJS = (str) =>
    str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");

  const refsArray = refs
    .map((ref) => {
      const parts = [];
      if (ref.type) parts.push(`type: "${ref.type}"`);
      if (ref.id) parts.push(`id: "${ref.id}"`);
      if (ref.level) parts.push(`level: "${ref.level}"`);
      if (ref.link) parts.push(`link: "${ref.link}"`);
      return `    { ${parts.join(", ")} }`;
    })
    .join(",\n");

  const content = `// Generated metadata for ${ruleName}
// This file is auto-generated from index.ts to avoid module resolution issues

export const ${exportName} = {
  id: "${id}",
  title: \`${escapeForJS(title)}\`,
  description: \`${escapeForJS(description)}\`,
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
  const ruleDirs = fs
    .readdirSync(ENGINE_RULES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => !["interfaces.ts", "index.ts"].includes(name));

  let successCount = 0;
  let errorCount = 0;

  for (const ruleName of ruleDirs) {
    const indexPath = path.join(ENGINE_RULES_DIR, ruleName, "index.ts");

    if (!fs.existsSync(indexPath)) {
      console.log(`⊘ Skipping ${ruleName} - no index.ts`);
      continue;
    }

    try {
      const metadata = extractMetadataFromIndexTS(indexPath);
      if (metadata) {
        const metadataContent = generateMetadataFile(ruleName, metadata);
        const outputPath = path.join(ENGINE_RULES_DIR, ruleName, "metadata.js");
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
