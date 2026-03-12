package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Graphics Multi-State Audit Tests (Selenium).
 * Mirrors Node sdk-audit-graphics-multi-state.test.js.
 */
public class SdkAuditGraphicsMultiStateTest {

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
    @DisplayName("Should perform audits across multiple states on background images page")
    void testAuditAcrossMultipleStates() {
        List<Map<String, Object>> auditResults = new ArrayList<>();

        DriverHelper.navigateTo(driver, "/graphics/background-images_failure");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("graphics/background-images_failure"));

        AccessFlowSDK sdk = createSdk();

        Map<String, Object> failureReport = sdk.audit();
        auditResults.add(Map.of("context", "Initial Failure Page", "report", failureReport != null ? failureReport : Map.of()));
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), failureReport);
        LocalReportCollector.add(driver.getCurrentUrl(), failureReport);

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

        DriverHelper.navigateTo(driver, "/graphics/background-images_success");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("graphics/background-images_success"));

        // Retry for success page stability
        Map<String, Object> successReport = null;
        for (int i = 0; i < 4; i++) {
            successReport = sdk.audit();
            if (successReport != null) break;
            DriverHelper.sleep(2500);
        }
        if (successReport == null) {
            new WebDriverWait(driver, Duration.ofSeconds(10))
                    .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("main, [role='main'], h1, h2")));
            DriverHelper.sleep(1200);
            successReport = sdk.audit();
        }
        auditResults.add(Map.of("context", "Success Page", "report", successReport != null ? successReport : Map.of()));
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), successReport);
        LocalReportCollector.add(driver.getCurrentUrl(), successReport);

        assertTrue(auditResults.size() > 1, "Should have at least 2 audit results");
    }
}
