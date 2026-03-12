const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'server', 'projects');
const outputPath = path.join(__dirname, '..', 'public', 'static-projects.json');

const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
const projects = files.map(f => JSON.parse(fs.readFileSync(path.join(projectsDir, f), 'utf-8')));

fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`[generate-static-projects] Wrote ${projects.length} projects to public/static-projects.json`);
