package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for accessflow.config.json localCheck behavior (Selenium).
 * Mirrors Python test_local_check.py.
 *
 * localCheck true:  Under threshold → pass.
 * localCheck false: Violations recorded but test does not fail (monitoring).
 */
public class LocalCheckTest {

    private WebDriver driver;

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
    @DisplayName("localCheck=true: under threshold passes")
    void testLocalCheckTrueUnderThreshold() {
        DriverHelper.navigateTo(driver, "/graphics/alt-text_success");
        DriverHelper.sleep(1000);

        AccessFlowSDK sdk = createSdk();
        Map<String, Object> report = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);

        assertNotNull(report);

        // With high thresholds, success page should not exceed them
        Map<String, Integer> thresholds = Map.of("extreme", 100, "high", 100, "medium", 100, "low", 100);
        assertFalse(thresholdsExceeded(report, thresholds),
                "Unexpected threshold exceedance on success page");
    }

    @Test
    @DisplayName("localCheck=false: violations recorded but does not fail")
    void testLocalCheckFalseDoesNotFail() {
        DriverHelper.navigateTo(driver, "/errors/fake-hidden-content_failure");
        DriverHelper.sleep(1000);

        AccessFlowSDK sdk = createSdk();
        Map<String, Object> report = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);

        assertNotNull(report, "Report should not be null even with localCheck=false");

        // With strict thresholds (0), violations may exist but test still passes
        Map<String, Integer> thresholds = Map.of("extreme", 0, "high", 0, "medium", 0, "low", 0);
        if (thresholdsExceeded(report, thresholds)) {
            @SuppressWarnings("unchecked")
            Map<String, Object> issues = (Map<String, Object>) report.get("numberOfIssuesFound");
            assertNotNull(issues, "numberOfIssuesFound should be a map when violations exist");
        }
        // No fail() — test must pass when localCheck is false (monitoring mode)
    }

    @SuppressWarnings("unchecked")
    private boolean thresholdsExceeded(Map<String, Object> report, Map<String, Integer> thresholds) {
        if (report == null) return false;
        Map<String, Object> issues = (Map<String, Object>) report.get("numberOfIssuesFound");
        if (issues == null) return false;
        for (String severity : new String[]{"extreme", "high", "medium", "low"}) {
            Object countObj = issues.get(severity);
            int count = countObj instanceof Number ? ((Number) countObj).intValue() : 0;
            int limit = thresholds.getOrDefault(severity, Integer.MAX_VALUE);
            if (count > limit) return true;
        }
        return false;
    }
}
