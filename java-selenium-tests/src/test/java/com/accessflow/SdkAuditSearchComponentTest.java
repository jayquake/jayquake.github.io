package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.acsbe.accessflow.SeleniumDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Search Component Testing with AccessFlow SDK (Selenium).
 * Mirrors Node sdk-audit-search-component.test.js.
 */
public class SdkAuditSearchComponentTest {

    private WebDriver driver;

    @BeforeEach
    void setup() {
        driver = DriverHelper.createDriver();
        DriverHelper.navigateTo(driver, "/");
        DriverHelper.sleep(500);
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
    @DisplayName("Should display search input when the drawer is open")
    void testSearchInputDisplayed() {
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> report = sdk.audit();
        AccessFlowTeardown.recordAudit(driver.getCurrentUrl(), report);
        LocalReportCollector.add(driver.getCurrentUrl(), report);

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[aria-label='Search for rules and criteria'], input[placeholder='Search...']")));

        assertTrue(searchInput.isDisplayed());
        assertEquals("Search...", searchInput.getAttribute("placeholder"));
    }

    @Test
    @DisplayName("Should display result details in dropdown")
    void testSearchResultDetails() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement searchInput = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[aria-label='Search for rules and criteria'], input[placeholder='Search...']")));

        assertTrue(searchInput.isDisplayed());
        searchInput.clear();
        searchInput.sendKeys("keyboard");
        DriverHelper.sleep(800);

        WebElement firstResult = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector(".MuiListItem-root, [role='option'], li")));

        assertTrue(firstResult.isDisplayed());
        String text = firstResult.getText();
        assertNotNull(text);
        assertFalse(text.trim().isEmpty());
    }
}
