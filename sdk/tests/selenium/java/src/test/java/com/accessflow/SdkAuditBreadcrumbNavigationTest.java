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
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Breadcrumb Navigation with Accessibility Audits (Selenium).
 * Mirrors Node sdk-audit-breadcrumb-navigation.test.js.
 */
public class SdkAuditBreadcrumbNavigationTest {

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
    @DisplayName("Navigate from failure to success page via breadcrumb and audit both")
    void testNavigateFailureToSuccess() {
        DriverHelper.navigateTo(driver, "/graphics/background-images_failure");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("background-images_failure"));

        AccessFlowSDK sdk = createSdk();
        Map<String, Object> failureReport = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), failureReport);
        LocalReportCollector.add(driver.getCurrentUrl(), failureReport);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement breadcrumbSelect = wait.until(
                ExpectedConditions.elementToBeClickable(By.cssSelector("[aria-label='Select variant type']")));
        assertTrue(breadcrumbSelect.isDisplayed());
        DriverHelper.scrollIntoView(driver, breadcrumbSelect);
        breadcrumbSelect.click();
        DriverHelper.sleep(500);

        WebElement successOption = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//li[@role='option' and text()='Success']")));
        DriverHelper.scrollIntoView(driver, successOption);
        successOption.click();
        DriverHelper.sleep(1000);

        assertTrue(driver.getCurrentUrl().contains("background-images_success"));

        Map<String, Object> successReport = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), successReport);
        LocalReportCollector.add(driver.getCurrentUrl(), successReport);

        assertNotNull(failureReport);
        assertNotNull(successReport);
    }

    @Test
    @DisplayName("Navigate from success back to failure using breadcrumb")
    void testNavigateSuccessToFailure() {
        DriverHelper.navigateTo(driver, "/graphics/background-images_success");
        DriverHelper.sleep(1000);
        assertTrue(driver.getCurrentUrl().contains("background-images_success"));

        AccessFlowSDK sdk = createSdk();
        Map<String, Object> successAudit = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), successAudit);
        LocalReportCollector.add(driver.getCurrentUrl(), successAudit);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement breadcrumbSelect = wait.until(
                ExpectedConditions.elementToBeClickable(By.cssSelector("[aria-label='Select variant type']")));
        assertTrue(breadcrumbSelect.isDisplayed());
        DriverHelper.scrollIntoView(driver, breadcrumbSelect);
        breadcrumbSelect.click();
        DriverHelper.sleep(500);

        WebElement failureOption = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//li[@role='option' and text()='Failure']")));
        DriverHelper.scrollIntoView(driver, failureOption);
        failureOption.click();
        DriverHelper.sleep(1000);

        assertTrue(driver.getCurrentUrl().contains("background-images_failure"));

        Map<String, Object> failureAudit = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), failureAudit);
        LocalReportCollector.add(driver.getCurrentUrl(), failureAudit);

        assertNotNull(successAudit);
        assertNotNull(failureAudit);
    }

    @Test
    @DisplayName("Audit multiple rule pages via breadcrumb navigation")
    void testAuditMultipleRulePages() {
        List<Map<String, Object>> auditResults = new ArrayList<>();

        String[][] rules = {
                {"Background Images", "/graphics/background-images"},
                {"Alt Text", "/graphics/alt-text"},
                {"Decorative Content", "/graphics/decorative-content"}
        };

        for (String[] rule : rules) {
            DriverHelper.navigateTo(driver, rule[1] + "_failure");
            DriverHelper.sleep(800);

            AccessFlowSDK sdk = createSdk();
            Map<String, Object> failureAudit = sdk.audit();
            AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), failureAudit);
            LocalReportCollector.add(driver.getCurrentUrl(), failureAudit);

            boolean successAuditDone = false;
            try {
                WebElement breadcrumbSelect = driver.findElement(
                        By.cssSelector("[aria-label='Select variant type']"));
                if (breadcrumbSelect.isDisplayed()) {
                    DriverHelper.scrollIntoView(driver, breadcrumbSelect);
                    breadcrumbSelect.click();
                    DriverHelper.sleep(300);

                    WebElement successOption = driver.findElement(
                            By.xpath("//li[@role='option' and text()='Success']"));
                    if (successOption.isDisplayed()) {
                        DriverHelper.scrollIntoView(driver, successOption);
                        successOption.click();
                        DriverHelper.sleep(800);

                        Map<String, Object> successAudit = sdk.audit();
                        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), successAudit);
                        LocalReportCollector.add(driver.getCurrentUrl(), successAudit);
                        successAuditDone = successAudit != null;
                    }
                }
            } catch (NoSuchElementException ignored) {
                System.out.println("Breadcrumb not available for " + rule[0] + ", skipping");
            }

            auditResults.add(Map.of(
                    "rule", rule[0],
                    "failureAudit", failureAudit != null,
                    "successAudit", successAuditDone
            ));
        }

        assertTrue(auditResults.size() > 0);
        assertTrue(auditResults.stream().allMatch(r ->
                (boolean) r.get("failureAudit") && (boolean) r.get("successAudit")));
    }
}
