#!/usr/bin/env bash
# Build branch, crawl a baseline build + branch build back-to-back, diff.
# Usage: scripts/verify/verify.sh [baseline-build-dir]
# Default baseline: scripts/verify/baseline (copy a prior iteration's build there).
set -u
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
C="$REPO/scripts/verify"
BASELINE="${1:-$C/baseline}"
cd "$REPO"

if [ ! -d "$BASELINE" ]; then
  echo "Baseline build not found at $BASELINE" >&2
  echo "Pass a path to the previous iteration's build directory." >&2
  exit 1
fi

mkdir -p "$C/out"

echo "== build branch"
npm run build > "$C/out/build-branch.log" 2>&1; echo "build exit $?"
tail -3 "$C/out/build-branch.log"
# Builds rewrite generatedAt; drop that churn until 2b fixes it.
git checkout -q public/engine-rules.json 2>/dev/null || true
rm -rf "$C/out/build-branch" && cp -R build "$C/out/build-branch"

crawl() { # name dir port
  npx serve -s "$2" -l "$3" > "$C/out/serve-$1.log" 2>&1 &
  local pid=$!
  sleep 4
  node "$C/crawl.js" "$REPO" "http://localhost:$3" "$C/out/$1.json"
  kill $pid 2>/dev/null
  wait $pid 2>/dev/null || true
}
echo "== crawl baseline"; crawl baseline "$BASELINE" 5055
echo "== crawl branch"; crawl branch "$C/out/build-branch" 5056

echo "== diff"
node - "$C/out/baseline.json" "$C/out/branch.json" <<'EOF'
const [a,b]=process.argv.slice(2).map(f=>require(f));
const norm=e=>e.replace(/localhost:\d+/g,"").replace(/\.[0-9a-f]{8}\.chunk/g,".HASH.chunk");
let diffs=0;
for (const r of new Set([...Object.keys(a),...Object.keys(b)])) {
  const x=a[r]||{}, y=b[r]||{};
  const ex=new Set((x.errors||[]).map(norm)), ey=new Set((y.errors||[]).map(norm));
  const added=[...ey].filter(e=>!ex.has(e)), removed=[...ex].filter(e=>!ey.has(e));
  const issues=[];
  if (x.path!==y.path) issues.push(`path ${x.path} -> ${y.path}`);
  if (x.h1!==y.h1) issues.push(`h1 "${x.h1}" -> "${y.h1}"`);
  if (x.textLen && y.textLen && Math.abs(x.textLen-y.textLen) > Math.max(200, x.textLen*0.1)) issues.push(`textLen ${x.textLen} -> ${y.textLen}`);
  if (added.length) issues.push("NEW errors: "+added.join(" | "));
  if (removed.length) issues.push("gone errors: "+removed.join(" | "));
  if (issues.length){diffs++;console.log(r+"\n   "+issues.join("\n   "));}
}
console.log(`\n${Object.keys(b).length} routes, ${diffs} with differences`);
EOF
