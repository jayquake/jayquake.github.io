package com.accessflow;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Collects audits from tests and writes a local JSON report matching the
 * format expected by AccessFlowAuditProcessor (pages-based summary).
 */
public final class LocalReportCollector {

    private static final List<Map<String, Object>> ENTRIES = new ArrayList<>();

    public static void add(String url, Map<String, Object> audits) {
        Map<String, Object> entry = new LinkedHashMap<>();
        entry.put("url", url);
        entry.put("audits", audits);
        ENTRIES.add(entry);
    }

    @SuppressWarnings("unchecked")
    public static void write() {
        if (ENTRIES.isEmpty()) return;

        try {
            Path baseDir = Paths.get("test-results").toAbsolutePath();
            Files.createDirectories(baseDir);

            // Build pages-based structure: { pages: { url: { numberOfIssuesFound, ruleViolations } } }
            Map<String, Map<String, Object>> pages = new LinkedHashMap<>();

            for (Map<String, Object> entry : ENTRIES) {
                String url = (String) entry.get("url");
                Map<String, Object> audits = (Map<String, Object>) entry.get("audits");
                if (url == null || audits == null) continue;

                if (!pages.containsKey(url)) {
                    Map<String, Object> pageData = new LinkedHashMap<>();
                    Map<String, Integer> counts = new LinkedHashMap<>();
                    counts.put("extreme", 0);
                    counts.put("high", 0);
                    counts.put("medium", 0);
                    counts.put("low", 0);
                    pageData.put("numberOfIssuesFound", counts);
                    pageData.put("ruleViolations", new LinkedHashMap<String, Object>());
                    pages.put(url, pageData);
                }

                Map<String, Object> pageData = pages.get(url);
                Map<String, Integer> counts = (Map<String, Integer>) pageData.get("numberOfIssuesFound");
                Map<String, Object> ruleViolations = (Map<String, Object>) pageData.get("ruleViolations");

                for (Map.Entry<String, Object> ruleEntry : audits.entrySet()) {
                    String ruleKey = ruleEntry.getKey();
                    Object violationsObj = ruleEntry.getValue();
                    if (!(violationsObj instanceof Map)) continue;

                    Map<String, Object> violations = (Map<String, Object>) violationsObj;
                    if (violations.isEmpty()) continue;

                    String severity = RULE_SEVERITY.getOrDefault(ruleKey, "medium");

                    if (!ruleViolations.containsKey(ruleKey)) {
                        Map<String, Object> rv = new LinkedHashMap<>();
                        rv.put("name", camelToTitle(ruleKey));
                        rv.put("severity", severity);
                        rv.put("numberOfOccurrences", 0);
                        rv.put("selectorData", new ArrayList<Map<String, Object>>());
                        ruleViolations.put(ruleKey, rv);
                    }

                    Map<String, Object> rv = (Map<String, Object>) ruleViolations.get(ruleKey);
                    List<Map<String, Object>> selectorData = (List<Map<String, Object>>) rv.get("selectorData");

                    int occurrences = 0;
                    for (Map.Entry<String, Object> selEntry : violations.entrySet()) {
                        if (!(selEntry.getValue() instanceof Map)) continue;
                        Map<String, Object> detail = (Map<String, Object>) selEntry.getValue();
                        int occ = detail.containsKey("occurrences") ? ((Number) detail.get("occurrences")).intValue() : 1;
                        occurrences += occ;

                        Map<String, Object> sd = new LinkedHashMap<>();
                        sd.put("selector", detail.getOrDefault("selector", selEntry.getKey()));
                        sd.put("HTML", detail.getOrDefault("HTML", ""));
                        selectorData.add(sd);
                    }

                    rv.put("numberOfOccurrences", ((Number) rv.get("numberOfOccurrences")).intValue() + occurrences);
                    counts.put(severity, counts.getOrDefault(severity, 0) + occurrences);
                }
            }

            Map<String, Object> summary = new LinkedHashMap<>();
            summary.put("pages", pages);

            Path reportPath = baseDir.resolve("accessflow-report-summary.json");
            Files.writeString(reportPath, toJson(summary));
            System.out.println("[AccessFlow] Local report written to: " + reportPath);

            // Also write raw JSONL for the processor's fallback path
            Path jsonlPath = baseDir.resolve("accessFlow-raw-audits-" + ProcessHandle.current().pid() + ".jsonl");
            StringBuilder jsonlContent = new StringBuilder();
            for (Map<String, Object> entry : ENTRIES) {
                Map<String, Object> line = new LinkedHashMap<>();
                line.put("url", entry.get("url"));
                line.put("audit", entry.get("audits"));
                jsonlContent.append(toJson(line)).append("\n");
            }
            Files.writeString(jsonlPath, jsonlContent.toString());
            System.out.println("[AccessFlow] Raw audit JSONL written to: " + jsonlPath);

        } catch (IOException e) {
            System.err.println("[AccessFlow] Failed to write local report: " + e.getMessage());
        }
    }

    private static final Map<String, String> RULE_SEVERITY = Map.ofEntries(
        Map.entry("altText", "extreme"),
        Map.entry("pageTitle", "extreme"),
        Map.entry("missingFormLabels", "extreme"),
        Map.entry("languageAttribute", "extreme"),
        Map.entry("backgroundImages", "high"),
        Map.entry("ariaLabelMisuse", "high"),
        Map.entry("brokenAriaLabels", "high"),
        Map.entry("brokenAriaReference", "high"),
        Map.entry("brokenNavItems", "high"),
        Map.entry("colorContrast", "medium"),
        Map.entry("emptyHeadings", "medium"),
        Map.entry("fontSizes", "medium"),
        Map.entry("headingOrder", "medium"),
        Map.entry("tabIndex", "medium"),
        Map.entry("ambiguousLinks", "medium"),
        Map.entry("brokenList", "medium"),
        Map.entry("breadcrumbs", "low"),
        Map.entry("decorativeContent", "low")
    );

    private static String camelToTitle(String key) {
        return key.replaceAll("([A-Z])", " $1").substring(0, 1).toUpperCase()
            + key.replaceAll("([A-Z])", " $1").substring(1);
    }

    private static String toJson(Object obj) {
        StringBuilder sb = new StringBuilder();
        appendJson(sb, obj, 0);
        return sb.toString();
    }

    @SuppressWarnings("unchecked")
    private static void appendJson(StringBuilder sb, Object obj, int indent) {
        String pad = "  ".repeat(indent);
        if (obj == null) {
            sb.append("null");
        } else if (obj instanceof Map) {
            Map<?, ?> m = (Map<?, ?>) obj;
            sb.append("{\n");
            var it = m.entrySet().iterator();
            while (it.hasNext()) {
                var e = it.next();
                sb.append(pad).append("  \"").append(escape(e.getKey().toString())).append("\": ");
                appendJson(sb, e.getValue(), indent + 1);
                sb.append(it.hasNext() ? ",\n" : "\n");
            }
            sb.append(pad).append("}");
        } else if (obj instanceof List) {
            List<?> l = (List<?>) obj;
            sb.append("[\n");
            for (int i = 0; i < l.size(); i++) {
                sb.append(pad).append("  ");
                appendJson(sb, l.get(i), indent + 1);
                sb.append(i < l.size() - 1 ? ",\n" : "\n");
            }
            sb.append(pad).append("]");
        } else if (obj instanceof String) {
            sb.append("\"").append(escape((String) obj)).append("\"");
        } else if (obj instanceof Number || obj instanceof Boolean) {
            sb.append(obj);
        } else {
            sb.append("\"").append(escape(String.valueOf(obj))).append("\"");
        }
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
