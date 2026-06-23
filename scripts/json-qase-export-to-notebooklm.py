#!/usr/bin/env python3
"""Export Qase JSON to NotebookLM Markdown — AccessFlow how-to procedures."""

import html
import json
import re
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

HTML_TAG_RE = re.compile(r"<[^>]+>")
MD_HEADER_RE = re.compile(r"^#{1,6}\s+", re.MULTILINE)
SLUG_RE = re.compile(r"[^a-zA-Z0-9]+")
ENTRY_POINT_RE = re.compile(r"entryPoint:\s*([^\n*]+)", re.I)
GO_TO_RE = re.compile(r"(?:^|\n)\s*\d+\.\s*(Go to [^\n]+)", re.I)
BUTTON_TAG_RE = re.compile(r"buttonTag[=:]?\s*([a-zA-Z0-9_-]+)", re.I)

TOPIC_PATTERNS = [
    (r"bypass\s*login|login\s*wall|login\s*steps", "Bypass login"),
    (r"\bfunnel", "Funnels / Journeys"),
    (r"\bjourney", "Funnels / Journeys"),
    (r"\baudit", "Audits"),
    (r"\bscan", "Scans"),
    (r"\bwebsite", "Websites"),
    (r"\bwebpage", "Webpages"),
    (r"\bissue", "Issues"),
    (r"\brule", "Rules"),
    (r"\bdashboard", "Dashboard"),
    (r"\bextension", "Browser extension"),
    (r"\bintegration", "Integrations"),
    (r"\bonboarding", "Onboarding"),
    (r"\btoken", "Token management"),
    (r"\bdomain", "Domains"),
    (r"\bsdk", "SDK"),
    (r"\bmcp", "MCP"),
    (r"\bmixpanel|analytics", "Analytics"),
    (r"\buser.?management|invite", "User management"),
    (r"\bnavigation", "Navigation"),
    (r"\bengine", "Unified engine"),
]


def strip_markup(text):
    if text is None:
        return ""
    s = html.unescape(str(text))
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = HTML_TAG_RE.sub("", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = re.sub(r"`([^`]+)`", r"\1", s)
    s = MD_HEADER_RE.sub("", s)
    lines = [re.sub(r"[ \t]+", " ", line).strip() for line in s.splitlines()]
    s = "\n".join(lines)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def truncate(text, max_len=500):
    if len(text) <= max_len:
        return text
    return text[: max_len - 3] + "..."


def slugify(text, max_len=48):
    s = SLUG_RE.sub("-", text.lower()).strip("-")
    return (s[:max_len] or "suite").rstrip("-")


def count_cases(suites):
    n = 0
    for suite in suites:
        n += len(suite.get("cases", []))
        n += count_cases(suite.get("suites", []))
    return n


def walk_cases(suites, suite_path=""):
    for suite in suites:
        title = strip_markup(suite.get("title") or "")
        path = f"{suite_path} / {title}" if suite_path else title
        for case in suite.get("cases", []):
            yield path, case
        yield from walk_cases(suite.get("suites", []), path)


def md_heading(level, text):
    level = min(max(level, 1), 6)
    return f"{'#' * level} {text}\n\n"


def extract_entry_points(case):
    points = []
    for param in case.get("params") or []:
        if (param.get("title") or "").lower() == "entrypoint":
            for val in param.get("values") or []:
                clean = strip_markup(val)
                if clean and clean not in points:
                    points.append(clean)
    blob = strip_markup(json.dumps(case.get("steps") or []))
    for m in ENTRY_POINT_RE.finditer(blob):
        clean = strip_markup(m.group(1))
        if clean and len(clean) < 200 and clean not in points:
            points.append(clean)
    return points


def extract_navigation_hints(case):
    hints = []
    for step in case.get("steps") or []:
        action = strip_markup(step.get("action") or "")
        for m in GO_TO_RE.finditer(action):
            hint = m.group(1).strip()
            if hint not in hints:
                hints.append(hint)
        for line in action.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if re.match(r"^\d+\.", line):
                body = re.sub(r"^\d+\.\s*", "", line)
                if any(
                    kw in body.lower()
                    for kw in ("click", "go to", "navigate", "open", "select", "under ", "in the ")
                ):
                    if body not in hints and len(body) < 300:
                        hints.append(body)
    return hints[:12]


def extract_button_tags(case):
    tags = set()
    blob = strip_markup(json.dumps(case))
    for m in BUTTON_TAG_RE.finditer(blob):
        tag = m.group(1).strip("'\"")
        if tag.lower() not in ("tbd", "null", "close"):
            tags.add(tag)
    return sorted(tags)


def infer_topics(text):
    topics = []
    for pattern, label in TOPIC_PATTERNS:
        if re.search(pattern, text, re.I) and label not in topics:
            topics.append(label)
    return topics


def infer_use_case(title, desc, expected_blob):
    title = strip_markup(title)
    desc = strip_markup(desc)
    if desc:
        lead = desc.split(".")[0].strip()
        if len(lead) > 20:
            return lead
    if expected_blob:
        first = expected_blob.split(".")[0].strip()
        if len(first) > 15:
            return f"Verify or achieve: {first[:200]}"
    return f"Perform the workflow: {title}"


def write_case(case, lines, suite_path=""):
    cid = case.get("id", "")
    title = strip_markup(case.get("title") or "Untitled")
    desc = strip_markup(case.get("description") or "")
    pre = strip_markup(case.get("preconditions") or "")
    steps = case.get("steps") or []
    expected_blob = " ".join(strip_markup(s.get("expected_result") or "") for s in steps)
    post = strip_markup(case.get("postconditions") or "")

    entry_points = extract_entry_points(case)
    nav_hints = extract_navigation_hints(case)
    button_tags = extract_button_tags(case)
    topics = infer_topics(f"{suite_path} {title} {desc} {' '.join(entry_points)}")
    use_case = infer_use_case(title, desc, expected_blob)

    lines.append(md_heading(3, f"Case {cid}: {title}"))
    lines.append(f"**Use this procedure to:** {use_case}\n\n")
    lines.append(f"**Application area:** {suite_path or 'General'}\n\n")
    if topics:
        lines.append(f"**Topics:** {', '.join(topics)}\n\n")
    if entry_points:
        lines.append("**Entry points in AccessFlow**\n\n")
        for ep in entry_points:
            lines.append(f"- {ep}\n")
        lines.append("\n")
    if nav_hints:
        lines.append("**Navigation summary**\n\n")
        for hint in nav_hints:
            lines.append(f"- {hint}\n")
        lines.append("\n")
    if button_tags:
        lines.append(f"**UI control IDs:** `{', '.join(button_tags)}`\n\n")

    if desc:
        lines.append(f"**Description**\n\n{desc}\n\n")
    if pre:
        lines.append(f"**Setup before starting**\n\n{pre}\n\n")

    if steps:
        lines.append("**Procedure — actions in AccessFlow**\n\n")
        for step in steps:
            pos = step.get("position", "?")
            action = strip_markup(step.get("action") or "")
            expected = strip_markup(step.get("expected_result") or "")
            data = strip_markup(step.get("data") or "")
            lines.append(f"#### Step {pos}\n\n")
            lines.append(f"**Do this:**\n\n{action or '(none)'}\n\n")
            if expected:
                lines.append(f"**Expected outcome:**\n\n{expected}\n\n")
            if data:
                lines.append(f"**Test data:**\n\n{data}\n\n")

    params = case.get("params") or []
    if params:
        lines.append("**Scenario variants**\n\n")
        for p in params:
            pname = p.get("title", "Parameter")
            if pname.lower() == "entrypoint":
                continue
            values = p.get("values") or []
            lines.append(f"##### {pname} ({len(values)} variants)\n\n")
            for i, v in enumerate(values, 1):
                lines.append(f"{i}. {strip_markup(v)}\n\n")

    if post or expected_blob:
        lines.append("**Final outcome**\n\n")
        lines.append(f"{post or truncate(expected_blob, 600)}\n\n")

    keywords = set()
    for part in [title, suite_path] + entry_points + nav_hints[:5]:
        for word in re.findall(r"[A-Za-z][A-Za-z0-9-]{2,}", part):
            if word.lower() not in ("the", "and", "for", "with", "that", "this"):
                keywords.add(word.lower())
    if keywords:
        lines.append(f"**Keywords:** {', '.join(sorted(keywords)[:25])}\n\n")
    lines.append("---\n\n")


def write_suite(suite, lines, depth=2, suite_path=""):
    title = strip_markup(suite.get("title") or f"Suite {suite.get('id')}")
    path = f"{suite_path} / {title}" if suite_path else title
    sid = suite.get("id", "")
    total_here = len(suite.get("cases", [])) + count_cases(suite.get("suites", []))
    lines.append(md_heading(depth, f"{title} (Suite ID {sid}, {total_here} procedures)"))
    for case in suite.get("cases", []):
        write_case(case, lines, path)
    for child in suite.get("suites", []):
        write_suite(child, lines, min(depth + 1, 4), path)


def render_suite_file(suite, out_path):
    title = strip_markup(suite.get("title") or f"Suite {suite.get('id')}")
    total = len(suite.get("cases", [])) + count_cases(suite.get("suites", []))
    lines = [
        md_heading(1, f"ACCESSFLOW Procedures — {title}"),
        f"Procedures: {total} | Export: 2026-06-04\n\n",
        "Each case below is a **how-to** for AccessFlow. Follow **Procedure** steps; "
        "use **Expected outcome** to confirm success.\n\n---\n\n",
    ]
    write_suite(suite, lines, depth=2)
    out_path.write_text("".join(lines), encoding="utf-8")
    return total, len("".join(lines))


def build_topic_index(all_records):
    by_topic = defaultdict(list)
    for rec in all_records:
        topics = rec["topics"] or ["Other"]
        for topic in topics:
            by_topic[topic].append(rec)

    lines = [
        md_heading(1, "ACCESSFLOW Topic Index"),
        "Find procedures by feature. Open the Case ID in the matching suite file for full steps.\n\n",
        '**Example:** "How do I configure bypass login?" → see **Bypass login** → Case IDs with '
        "entry `Audits dashboard > Bypass login` → follow Procedure steps.\n\n---\n\n",
    ]
    for topic in sorted(by_topic.keys(), key=lambda t: (t == "Other", t)):
        records = by_topic[topic]
        lines.append(md_heading(2, f"{topic} ({len(records)} procedures)"))
        for rec in sorted(records, key=lambda r: r["title"])[:60]:
            ep = rec["entry_points"][0] if rec["entry_points"] else (
                rec["nav_hints"][0] if rec["nav_hints"] else rec["suite_path"]
            )
            lines.append(
                f"- **Case {rec['id']}:** {rec['title'][:90]}  \n"
                f"  Entry: {truncate(ep, 100)}  \n"
                f"  Purpose: {truncate(rec['use_case'], 90)}\n"
            )
        if len(records) > 60:
            lines.append(f"\n*+{len(records) - 60} more in this topic*\n")
        lines.append("\n")
    return "".join(lines)


def build_guide(total_cases, suite_count, generated):
    return f"""# ACCESSFLOW NotebookLM Guide

**Generated:** {generated} | **Procedures:** {total_cases} | **Suite files:** {suite_count}

## Purpose

These Qase test cases document **how to use AccessFlow** — not just QA coverage.
Each case contains real navigation paths, clicks, and expected outcomes.

When asked *"How do I configure bypass login?"* or similar:

1. Search for the feature keyword (e.g. bypass login, funnel, audit).
2. Open matching cases from **01-TOPIC-INDEX.md** or suite files.
3. Answer using the **Procedure** steps — do not invent steps not in sources.
4. Include **Expected outcome** and cite the **Case ID**.

## Example: Configure bypass login

Typical path from test cases:

1. Go to **Audits** page → **Dashboard** → **Audit settings**
2. Under **Bypass login**, choose:
   - **Add manually** — enter login steps in a modal
   - **Record Steps** — use the browser extension to capture login flow
3. Save & validate steps (`buttonTag=save-and-validate-steps-bypass-login`)
4. Expected: login wall bypass configured; scans can proceed past login

See **Bypass login** in `01-TOPIC-INDEX.md` and full steps in `07-audits.md`, `10-dashboard.md`, `04-analytics.md`.

## Upload order for NotebookLM

1. `00-NOTEBOOKLM-GUIDE.md` (this file)
2. `01-TOPIC-INDEX.md`
3. `02-INDEX.md`
4. Suite files for areas you need (or all `{suite_count + 2:02d}-*.md` files)

## Files

| File | Role |
|------|------|
| 00-NOTEBOOKLM-GUIDE.md | Instructions for the AI |
| 01-TOPIC-INDEX.md | Feature → Case ID lookup |
| 02-INDEX.md | Suite file list |
| 03-*.md … | Full procedures per product area |
"""


def main():
    input_path = Path(sys.argv[1] if len(sys.argv) > 1 else "/Users/jasonquaicoo/Downloads/ACCESSFLOW-2026-06-04.json")
    out_dir = Path(sys.argv[2] if len(sys.argv) > 2 else str(input_path.parent / f"{input_path.stem}-notebooklm"))
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(input_path, encoding="utf-8") as f:
        data = json.load(f)

    suites = data.get("suites", [])
    total_cases = count_cases(suites)
    generated = datetime.now().strftime("%Y-%m-%d %H:%M")

    all_records = []
    for suite_path, case in walk_cases(suites):
        entry_points = extract_entry_points(case)
        nav_hints = extract_navigation_hints(case)
        title = strip_markup(case.get("title") or "")
        desc = strip_markup(case.get("description") or "")
        steps = case.get("steps") or []
        expected_blob = " ".join(strip_markup(s.get("expected_result") or "") for s in steps)
        all_records.append({
            "id": case.get("id"),
            "title": title,
            "suite_path": suite_path,
            "topics": infer_topics(f"{suite_path} {title} {desc} {' '.join(entry_points)}"),
            "entry_points": entry_points,
            "nav_hints": nav_hints,
            "use_case": infer_use_case(title, desc, expected_blob),
        })

    (out_dir / "00-NOTEBOOKLM-GUIDE.md").write_text(build_guide(total_cases, len(suites), generated), encoding="utf-8")
    (out_dir / "01-TOPIC-INDEX.md").write_text(build_topic_index(all_records), encoding="utf-8")

    index_lines = [md_heading(1, "Suite File Index"), f"**Procedures:** {total_cases}\n\n"]
    for i, suite in enumerate(suites, 1):
        title = strip_markup(suite.get("title") or f"suite-{suite.get('id')}")
        fname = f"{i + 2:02d}-{slugify(title)}.md"
        case_count, char_count = render_suite_file(suite, out_dir / fname)
        index_lines.append(f"- **{fname}** — {title} ({case_count} procedures, ~{char_count/1024:.0f} KB)\n")

    (out_dir / "02-INDEX.md").write_text("".join(index_lines), encoding="utf-8")

    print(f"Done: {out_dir}")
    print(f"  6869 procedures | upload 00-NOTEBOOKLM-GUIDE.md + 01-TOPIC-INDEX.md first")


if __name__ == "__main__":
    main()
