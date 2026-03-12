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
 * Collects audits from tests and writes a local JSON report for inspection.
 * Mirrors the Playwright java-tests LocalReportCollector.
 */
public final class LocalReportCollector {

    private static final List<Map<String, Object>> ENTRIES = new ArrayList<>();

    public static void add(String url, Map<String, Object> audits) {
        Map<String, Object> entry = new LinkedHashMap<>();
        entry.put("url", url);
        entry.put("audits", audits);
        ENTRIES.add(entry);
    }

    public static void write() {
        if (ENTRIES.isEmpty()) return;

        try {
            Path baseDir = Paths.get("test-results").toAbsolutePath();
            Files.createDirectories(baseDir);
            Path reportPath = baseDir.resolve("accessflow-report-summary.json");

            Map<String, Object> summary = new LinkedHashMap<>();
            summary.put("totalAudits", ENTRIES.size());
            summary.put("routes", ENTRIES);

            String json = toJson(summary);
            Files.writeString(reportPath, json);

            System.out.println("[AccessFlow] Local report written to: " + reportPath);
        } catch (IOException e) {
            System.err.println("[AccessFlow] Failed to write local report: " + e.getMessage());
        }
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
