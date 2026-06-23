#!/usr/bin/env python3
"""Convert Qase-style ACCESSFLOW JSON export (suites + cases) to PDF."""

import html
import json
import re
import sys
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

HTML_TAG_RE = re.compile(r"<[^>]+>")
MD_HEADER_RE = re.compile(r"^#{1,6}\s+", re.MULTILINE)


def strip_markup(text):
    if not text:
        return ""
    s = html.unescape(str(text))
    s = HTML_TAG_RE.sub("", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = MD_HEADER_RE.sub("", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def xml_escape(text):
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def truncate(text, max_len=500):
    text = strip_markup(text)
    if len(text) <= max_len:
        return text
    return text[: max_len - 3] + "..."


def count_cases(suites):
    total = 0
    for suite in suites:
        total += len(suite.get("cases", []))
        total += count_cases(suite.get("suites", []))
    return total


def collect_suite_titles(suites, depth=0):
    rows = []
    for suite in suites:
        title = suite.get("title") or f"Suite {suite.get('id', '?')}"
        case_count = len(suite.get("cases", []))
        rows.append((depth, title, case_count, suite.get("id")))
        rows.extend(collect_suite_titles(suite.get("suites", []), depth + 1))
        case_count += count_cases(suite.get("suites", []))
    return rows


def build_case_paragraphs(case, styles):
    elements = []
    cid = case.get("id", "")
    title = strip_markup(case.get("title", "Untitled"))
    meta = [
        f"<b>ID:</b> {cid}",
        f"<b>Status:</b> {case.get('status', '—')}",
        f"<b>Automation:</b> {case.get('automation', '—')}",
        f"<b>Layer:</b> {case.get('layer', '—')}",
        f"<b>Priority:</b> {case.get('priority', '—')}",
    ]
    elements.append(
        Paragraph(
            f"<b>{xml_escape(title)}</b><br/>{' &nbsp;|&nbsp; '.join(meta)}",
            styles["CaseTitle"],
        )
    )
    desc = strip_markup(case.get("description") or "")
    if desc:
        elements.append(
            Paragraph(f"<i>Description:</i> {xml_escape(truncate(desc, 400))}", styles["Body"])
        )
    pre = strip_markup(case.get("preconditions") or "")
    if pre:
        elements.append(
            Paragraph(
                f"<i>Preconditions:</i> {xml_escape(truncate(pre, 300))}",
                styles["Body"],
            )
        )
    tags = case.get("tags") or []
    if tags:
        elements.append(
            Paragraph(f"<i>Tags:</i> {xml_escape(', '.join(tags))}", styles["BodySmall"])
        )
    steps = case.get("steps") or []
    if steps:
        step_lines = []
        for step in steps[:6]:
            pos = step.get("position", "?")
            action = truncate(step.get("action") or "", 220)
            expected = truncate(step.get("expected_result") or "", 180)
            step_lines.append(
                f"{pos}. {xml_escape(action)}"
                + (f" → <i>{xml_escape(expected)}</i>" if expected else "")
            )
        if len(steps) > 6:
            step_lines.append(f"… +{len(steps) - 6} more steps")
        elements.append(
            Paragraph("<br/>".join(step_lines), styles["Steps"])
        )
    params = case.get("params") or []
    if params:
        param_bits = []
        for p in params[:4]:
            pname = p.get("title", "param")
            vals = p.get("values") or []
            preview = ", ".join(strip_markup(v)[:40] for v in vals[:3])
            if len(vals) > 3:
                preview += f" (+{len(vals) - 3} more)"
            param_bits.append(f"<b>{xml_escape(pname)}:</b> {xml_escape(preview)}")
        elements.append(Paragraph(" | ".join(param_bits), styles["BodySmall"]))
    elements.append(Spacer(1, 4))
    return elements


def render_suite(suite, story, styles, depth=0):
    title = suite.get("title") or f"Suite {suite.get('id', '?')}"
    indent = "&nbsp;" * (depth * 4)
    case_count = len(suite.get("cases", [])) + count_cases(suite.get("suites", []))
    story.append(
        Paragraph(
            f"{indent}<b>{xml_escape(title)}</b> "
            f"<font color='#555555'>({case_count} cases, ID {suite.get('id', '—')})</font>",
            styles["SuiteH1"] if depth == 0 else styles["SuiteH2"],
        )
    )
    story.append(Spacer(1, 6))
    for case in suite.get("cases", []):
        story.extend(build_case_paragraphs(case, styles))
    for child in suite.get("suites", []):
        render_suite(child, story, styles, depth + 1)


def main():
    input_path = Path(
        sys.argv[1]
        if len(sys.argv) > 1
        else "/Users/jasonquaicoo/Downloads/ACCESSFLOW-2026-06-04.json"
    )
    output_path = Path(
        sys.argv[2]
        if len(sys.argv) > 2
        else str(input_path.with_suffix(".pdf"))
    )

    with open(input_path, encoding="utf-8") as f:
        data = json.load(f)

    suites = data.get("suites", [])
    total_cases = count_cases(suites)
    generated = datetime.now().strftime("%Y-%m-%d %H:%M")

    base = getSampleStyleSheet()
    styles = {
        "Title": ParagraphStyle(
            "DocTitle",
            parent=base["Title"],
            fontSize=22,
            spaceAfter=12,
            alignment=TA_CENTER,
        ),
        "Subtitle": ParagraphStyle(
            "DocSubtitle",
            parent=base["Normal"],
            fontSize=12,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#444444"),
        ),
        "Heading": ParagraphStyle(
            "SectionHeading",
            parent=base["Heading1"],
            fontSize=14,
            spaceBefore=12,
            spaceAfter=8,
        ),
        "SuiteH1": ParagraphStyle(
            "SuiteH1",
            parent=base["Heading2"],
            fontSize=13,
            spaceBefore=14,
            spaceAfter=6,
            textColor=colors.HexColor("#1a5276"),
        ),
        "SuiteH2": ParagraphStyle(
            "SuiteH2",
            parent=base["Heading3"],
            fontSize=11,
            spaceBefore=10,
            spaceAfter=4,
            leftIndent=12,
            textColor=colors.HexColor("#2874a6"),
        ),
        "CaseTitle": ParagraphStyle(
            "CaseTitle",
            parent=base["Normal"],
            fontSize=9,
            spaceBefore=4,
            leftIndent=8,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontSize=8,
            leftIndent=16,
            spaceAfter=2,
        ),
        "BodySmall": ParagraphStyle(
            "BodySmall",
            parent=base["Normal"],
            fontSize=7,
            leftIndent=16,
            textColor=colors.HexColor("#333333"),
        ),
        "Steps": ParagraphStyle(
            "Steps",
            parent=base["Normal"],
            fontSize=7,
            leftIndent=20,
            textColor=colors.HexColor("#222222"),
        ),
    }

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.6 * inch,
        leftMargin=0.6 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
        title=input_path.stem,
        author="AccessFlow Export",
    )

    story = []
    story.append(Paragraph("ACCESSFLOW Test Export", styles["Title"]))
    story.append(
        Paragraph(
            f"Source: {xml_escape(input_path.name)}<br/>"
            f"Generated: {generated}",
            styles["Subtitle"],
        )
    )
    story.append(Spacer(1, 0.3 * inch))

    summary_data = [
        ["Metric", "Value"],
        ["Top-level suites", str(len(suites))],
        ["Total test cases", str(total_cases)],
        ["Export date (filename)", "2026-06-04"],
    ]
    summary_table = Table(summary_data, colWidths=[2.2 * inch, 3.5 * inch])
    summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1a5276")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                ("TOPPADDING", (0, 0), (-1, 0), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f4f6f7")]),
            ]
        )
    )
    story.append(Paragraph("Summary", styles["Heading"]))
    story.append(summary_table)
    story.append(Spacer(1, 0.2 * inch))

    story.append(Paragraph("Suite index", styles["Heading"]))
    index_rows = [["Suite", "Cases", "ID"]]
    for depth, title, direct_cases, sid in collect_suite_titles(suites):
        prefix = "  " * depth
        index_rows.append([f"{prefix}{title}", str(direct_cases), str(sid or "")])
    index_table = Table(index_rows, colWidths=[4.0 * inch, 0.9 * inch, 0.8 * inch])
    index_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2874a6")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(index_table)
    story.append(PageBreak())

    story.append(Paragraph("Test cases by suite", styles["Heading"]))
    story.append(Spacer(1, 8))
    for suite in suites:
        render_suite(suite, story, styles, 0)

    doc.build(story)
    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"Wrote {output_path} ({size_mb:.2f} MB, {total_cases} cases)")


if __name__ == "__main__":
    main()
