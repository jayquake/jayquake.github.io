#!/usr/bin/env bash
# Usage: importers.sh <file>...   (run from repo root)
# Prints files under src/ and scripts/ that import each given module by basename.
for f in "$@"; do
  if [ ! -e "$f" ]; then echo "MISSING $f"; continue; fi
  b=$(basename "$f"); b=${b%.*}
  esc=$(printf '%s' "$b" | sed 's/[()]/\\&/g')
  hits=$(grep -rlE "(from|import\(|require\()[[:space:]]*['\"][^'\"]*/${esc}(\.[a-z]+)?['\"]" src scripts \
    --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx' --include='*.cjs' 2>/dev/null \
    | grep -vxF "$f" | tr '\n' ' ')
  echo "$f <- [${hits}]"
done
