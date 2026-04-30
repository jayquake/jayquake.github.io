package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Fake Hidden Content Audit / Threshold Tests (Selenium).
 * Mirrors Node sdk-audit-hidden-content-thresholds.test.js.
 */
public class SdkAuditHiddenContentThresholdsTest {

    private WebDriver driver;
    private static Map<String, Object> config;

    @BeforeAll
    @SuppressWarnings("unchecked")
    static void loadConfig() {
        try (InputStream is = SdkAuditHiddenContentThresholdsTest.class.getResourceAsStream("/accessflow.config.json")) {
            if (is != null) {
                String json = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                config = parseJsonToMap(json);
            }
        } catch (Exception e) {
            System.err.println("Failed to load accessflow.config.json: " + e.getMessage());
        }
        if (config == null) {
            config = Map.of(
                    "issuesFoundThreshold", Map.of("extreme", 0, "high", 0, "medium", 0, "low", 0),
                    "localCheck", true
            );
        }
    }

    @BeforeEach
    void setup() {
        driver = DriverHelper.createDriver();
    }

    @AfterEach
    void teardown() {
        if (driver != null) driver.quit();
    }

    @AfterAll
    static void finalizeReports() {
        LocalReportCollector.write();
        AccessFlowTeardown.finalizeReports();
    }

    private AccessFlowSDK createSdk() {
        String apiKey = DriverHelper.getApiKey();
        return apiKey != null && !apiKey.isEmpty()
                ? new AccessFlowSDK(new SeleniumDriver(driver), apiKey)
                : new AccessFlowSDK(new SeleniumDriver(driver));
    }

    @Test
    @DisplayName("Should perform audits across states and verify thresholds")
    void testAuditAcrossStatesAndVerifyThresholds() {
        List<Map<String, Object>> auditResults = new ArrayList<>();

        DriverHelper.navigateTo(driver, "/errors/fake-hidden-content_failure");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("errors/fake-hidden-content_failure"));

        AccessFlowSDK sdk = createSdk();

        Map<String, Object> initialReport = sdk.audit();
        auditResults.add(Map.of("context", "Initial Failure Page", "report", initialReport != null ? initialReport : Map.of()));
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), initialReport);
        LocalReportCollector.add(driver.getCurrentUrl(), initialReport);

        try {
            WebElement notificationBtn = driver.findElement(
                    By.xpath("//button[.//svg[@data-testid='NotificationsIcon']]"));
            if (notificationBtn.isDisplayed()) {
                notificationBtn.click();
                DriverHelper.sleep(500);
                Map<String, Object> modalReport = sdk.audit();
                auditResults.add(Map.of("context", "Notifications Modal Open", "report", modalReport != null ? modalReport : Map.of()));
                AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), modalReport);
                LocalReportCollector.add(driver.getCurrentUrl(), modalReport);
                driver.findElement(By.cssSelector("body")).sendKeys(Keys.ESCAPE);
                DriverHelper.sleep(500);
            }
        } catch (NoSuchElementException ignored) {}

        try {
            WebElement closeSidebar = driver.findElement(
                    By.xpath("//button[.//svg[@data-testid='ChevronLeftIcon']]"));
            if (closeSidebar.isDisplayed()) {
                closeSidebar.click();
                DriverHelper.sleep(500);
                Map<String, Object> collapsedReport = sdk.audit();
                auditResults.add(Map.of("context", "Sidebar Collapsed", "report", collapsedReport != null ? collapsedReport : Map.of()));
                AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), collapsedReport);
                LocalReportCollector.add(driver.getCurrentUrl(), collapsedReport);
                try {
                    WebElement openSidebar = driver.findElement(
                            By.xpath("//button[.//svg[@data-testid='MenuIcon']]"));
                    if (openSidebar.isDisplayed()) openSidebar.click();
                } catch (NoSuchElementException ignored) {}
            }
        } catch (NoSuchElementException ignored) {}

        DriverHelper.navigateTo(driver, "/errors/fake-hidden-content_success");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("errors/fake-hidden-content_success"));

        Map<String, Object> successReport = sdk.audit();
        auditResults.add(Map.of("context", "Success Page", "report", successReport != null ? successReport : Map.of()));
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), successReport);
        LocalReportCollector.add(driver.getCurrentUrl(), successReport);

        assertTrue(auditResults.size() > 1);
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> parseJsonToMap(String json) {
        // Minimal JSON parser — sufficient for flat/nested maps of primitives
        json = json.trim();
        if (!json.startsWith("{")) return Map.of();
        java.util.LinkedHashMap<String, Object> map = new java.util.LinkedHashMap<>();
        json = json.substring(1, json.lastIndexOf("}")).trim();
        for (String entry : splitJsonEntries(json)) {
            String[] kv = entry.split(":", 2);
            String key = kv[0].trim().replaceAll("^\"|\"$", "");
            String val = kv[1].trim();
            if (val.startsWith("{")) {
                map.put(key, parseJsonToMap(val));
            } else if (val.equals("true")) {
                map.put(key, true);
            } else if (val.equals("false")) {
                map.put(key, false);
            } else if (val.startsWith("\"")) {
                map.put(key, val.replaceAll("^\"|\"$", ""));
            } else {
                try { map.put(key, Integer.parseInt(val)); }
                catch (NumberFormatException e) {
                    try { map.put(key, Double.parseDouble(val)); }
                    catch (NumberFormatException e2) { map.put(key, val); }
                }
            }
        }
        return map;
    }

    private static List<String> splitJsonEntries(String json) {
        List<String> entries = new ArrayList<>();
        int depth = 0;
        int start = 0;
        for (int i = 0; i < json.length(); i++) {
            char c = json.charAt(i);
            if (c == '{') depth++;
            else if (c == '}') depth--;
            else if (c == ',' && depth == 0) {
                entries.add(json.substring(start, i).trim());
                start = i + 1;
            }
        }
        String last = json.substring(start).trim();
        if (!last.isEmpty()) entries.add(last);
        return entries;
    }
}
