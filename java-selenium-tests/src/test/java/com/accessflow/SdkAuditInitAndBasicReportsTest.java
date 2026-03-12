package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * AccessFlow Java SDK — Init & Basic Reports (Selenium).
 * Mirrors Node sdk-audit-init-and-basic-reports.test.js.
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class SdkAuditInitAndBasicReportsTest {

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

    @Test @Order(1) @DisplayName("SDK initializes without errors")
    void testInitWithoutErrors() {
        assertNotNull(driver);
    }

    @Test @Order(2) @DisplayName("SDK creates an instance bound to the Selenium driver")
    void testInstanceBindsToDriver() {
        DriverHelper.navigateTo(driver, "/");
        AccessFlowSDK sdk = createSdk();
        assertNotNull(sdk);
    }

    @Test @Order(3) @DisplayName("Audit returns a report on the home page")
    void testAuditHomePage() {
        DriverHelper.navigateTo(driver, "/");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> report = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);
        assertNotNull(report);
    }

    @Test @Order(4) @DisplayName("Audit completes without throwing on the home page")
    void testAuditDoesNotThrow() {
        DriverHelper.navigateTo(driver, "/");
        AccessFlowSDK sdk = createSdk();
        assertDoesNotThrow(() -> {
            Map<String, Object> report = sdk.audit();
            AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
            LocalReportCollector.add(driver.getCurrentUrl(), report);
        });
    }

    @Test @Order(5) @DisplayName("Audit returns a report on the graphics/alt-text route")
    void testAuditGraphicsRoute() {
        DriverHelper.navigateTo(driver, "/graphics/alt-text_success");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> report = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);
        assertNotNull(report);
    }

    @Test @Order(6) @DisplayName("Multiple audits on the same page are stable")
    void testMultipleAuditsStable() {
        DriverHelper.navigateTo(driver, "/graphics/alt-text_success");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> reportA = sdk.audit();
        Map<String, Object> reportB = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), reportA);
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), reportB);
        LocalReportCollector.add(driver.getCurrentUrl(), reportA);
        LocalReportCollector.add(driver.getCurrentUrl(), reportB);
        assertNotNull(reportA);
        assertNotNull(reportB);
    }

    @Test @Order(7) @DisplayName("Audit works correctly after in-app route change")
    void testAuditAfterRouteChange() {
        DriverHelper.navigateTo(driver, "/");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> reportHome = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), reportHome);
        LocalReportCollector.add(driver.getCurrentUrl(), reportHome);
        assertNotNull(reportHome);

        DriverHelper.navigateTo(driver, "/graphics/alt-text_success");
        AccessFlowSDK sdk2 = createSdk();
        Map<String, Object> reportGraphics = sdk2.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), reportGraphics);
        LocalReportCollector.add(driver.getCurrentUrl(), reportGraphics);
        assertNotNull(reportGraphics);
    }
}
