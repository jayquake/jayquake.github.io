package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Navigation Timing with Accessibility Audits (Selenium).
 * Mirrors Node sdk-audit-navigation-timing.test.js.
 */
public class SdkAuditNavigationTimingTest {

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
    @DisplayName("Should measure home page load and audit time")
    void testHomePageTimings() {
        long navStart = System.currentTimeMillis();
        DriverHelper.navigateTo(driver, "/");
        long navDuration = System.currentTimeMillis() - navStart;
        System.out.println("Home page navigation: " + navDuration + " ms");

        AccessFlowSDK sdk = createSdk();
        long auditStart = System.currentTimeMillis();
        Map<String, Object> report = sdk.audit();
        long auditDuration = System.currentTimeMillis() - auditStart;
        System.out.println("Home page audit: " + auditDuration + " ms");

        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);

        assertNotNull(report);
        assertTrue(navDuration < 30000, "Navigation should complete within 30 s");
    }

    @Test
    @DisplayName("Should measure navigation through legacy rule pages with timing")
    void testLegacyRulePageTimings() {
        String[] legacyPaths = {
                "/graphics/alt-text_failure",
                "/graphics/alt-text_success",
                "/graphics/background-images_failure",
                "/graphics/background-images_success"
        };

        for (String path : legacyPaths) {
            long navStart = System.currentTimeMillis();
            DriverHelper.navigateTo(driver, path);
            long navDuration = System.currentTimeMillis() - navStart;

            AccessFlowSDK sdk = createSdk();
            long auditStart = System.currentTimeMillis();
            Map<String, Object> report = sdk.audit();
            long auditDuration = System.currentTimeMillis() - auditStart;

            AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
            LocalReportCollector.add(driver.getCurrentUrl(), report);

            System.out.printf("  %s — nav: %d ms, audit: %d ms%n", path, navDuration, auditDuration);
            assertNotNull(report, "Audit report should not be null for " + path);
        }
    }

    @Test
    @DisplayName("Should measure navigation through engine rule pages with timing")
    void testEngineRulePageTimings() {
        String[] enginePaths = {
                "/errors/fake-hidden-content_failure",
                "/errors/fake-hidden-content_success",
                "/graphics/decorative-content_failure",
                "/graphics/decorative-content_success"
        };

        for (String path : enginePaths) {
            long navStart = System.currentTimeMillis();
            DriverHelper.navigateTo(driver, path);
            long navDuration = System.currentTimeMillis() - navStart;

            AccessFlowSDK sdk = createSdk();
            long auditStart = System.currentTimeMillis();
            Map<String, Object> report = sdk.audit();
            long auditDuration = System.currentTimeMillis() - auditStart;

            AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
            LocalReportCollector.add(driver.getCurrentUrl(), report);

            System.out.printf("  %s — nav: %d ms, audit: %d ms%n", path, navDuration, auditDuration);
            assertNotNull(report, "Audit report should not be null for " + path);
        }
    }
}
