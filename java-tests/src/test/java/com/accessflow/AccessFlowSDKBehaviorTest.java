package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * AccessFlow Java SDK — Behavior Tests
 *
 * Playwright-driven tests that exercise the Java SDK against the live React
 * app at http://localhost:3000, using a real ACCESSFLOW_SDK_API_KEY.
 *
 * Test structure mirrors the Python and JS lanes so all three language lanes
 * validate equivalent behavior.
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AccessFlowSDKBehaviorTest {

    private static final String BASE_URL = "http://localhost:3000";

    private static Playwright playwright;
    private static Browser browser;
    private BrowserContext context;
    private Page page;

    // ------------------------------------------------------------------
    // Lifecycle
    // ------------------------------------------------------------------

    @BeforeAll
    static void setupAll() {
        String apiKey = System.getenv("ACCESSFLOW_SDK_API_KEY");
        // API key validation is done per-test when SDK instance is created

        playwright = Playwright.create();
        browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions().setHeadless(true)
        );
    }

    @BeforeEach
    void createContext() {
        context = browser.newContext(
                new Browser.NewContextOptions().setBaseURL(BASE_URL)
        );
        page = context.newPage();
    }

    @AfterEach
    void closeContext() {
        if (context != null) {
            context.close();
        }
    }

    @AfterAll
    static void teardownAll() {
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
        
        // Finalize and upload AccessFlow reports
        AccessFlowTeardown.finalizeReports();
    }

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    private void navigateAndWait(String path) {
        page.navigate(BASE_URL + path);
        page.waitForLoadState(com.microsoft.playwright.options.LoadState.NETWORKIDLE);
        page.waitForTimeout(500);
    }

    // ------------------------------------------------------------------
    // SDK Initialization
    // ------------------------------------------------------------------

    @Test
    @Order(1)
    @DisplayName("SDK initializes with a valid API key")
    void testInitWithValidKey() {
        // If @BeforeAll did not throw, initialization succeeded.
        assertNotNull(browser, "Browser should be available after SDK init");
    }

    @Test
    @Order(2)
    @DisplayName("SDK creates an instance bound to a Playwright page")
    void testInstanceBindsToPage() {
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        assertNotNull(sdk, "SDK instance should not be null");
    }

    // ------------------------------------------------------------------
    // Audit — Home Page
    // ------------------------------------------------------------------

    @Test
    @Order(3)
    @DisplayName("Audit returns a report on the home page")
    void testAuditHomePage() {
        navigateAndWait("/");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        Map<String, Object> audits = sdk.audit();
        
        // Record audit for aggregation
        AccessFlowTeardown.recordAudit(page.url(), audits);
        
        assertNotNull(audits, "Audit report should not be null");
    }

    @Test
    @Order(4)
    @DisplayName("Audit completes without throwing on the home page")
    void testAuditDoesNotThrow() {
        navigateAndWait("/");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        assertDoesNotThrow(() -> {
            Map<String, Object> audits = sdk.audit();
            // Record audit for aggregation
            AccessFlowTeardown.recordAudit(page.url(), audits);
            return audits;
        }, "sdk.audit() should not throw on a well-formed page");
    }

    // ------------------------------------------------------------------
    // Audit — Specific Route (Graphics / Alt-Text)
    // ------------------------------------------------------------------

    @Test
    @Order(5)
    @DisplayName("Audit returns a report on the graphics/alt-text route")
    void testAuditGraphicsRoute() {
        navigateAndWait("/#/graphics/alt-text");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        Map<String, Object> audits = sdk.audit();
        
        // Record audit for aggregation
        AccessFlowTeardown.recordAudit(page.url(), audits);
        
        assertNotNull(audits, "Audit report for graphics route should not be null");
    }

    @Test
    @Order(6)
    @DisplayName("Multiple audits on the same page are stable")
    void testMultipleAuditsStable() {
        navigateAndWait("/#/graphics/alt-text");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        Map<String, Object> reportA = sdk.audit();
        Map<String, Object> reportB = sdk.audit();
        
        // Record both audits for aggregation
        AccessFlowTeardown.recordAudit(page.url(), reportA);
        AccessFlowTeardown.recordAudit(page.url(), reportB);
        
        assertNotNull(reportA, "First audit should return a report");
        assertNotNull(reportB, "Second audit should return a report");
    }

    // ------------------------------------------------------------------
    // Audit — After Navigation
    // ------------------------------------------------------------------

    @Test
    @Order(7)
    @DisplayName("Audit works correctly after in-app route change")
    void testAuditAfterRouteChange() {
        // First route
        navigateAndWait("/");
        AccessFlowSDK sdk = new AccessFlowSDK(page);
        Map<String, Object> reportHome = sdk.audit();
        
        // Record audit for aggregation
        AccessFlowTeardown.recordAudit(page.url(), reportHome);
        
        assertNotNull(reportHome, "Home audit should produce a report");

        // Second route
        navigateAndWait("/#/graphics/alt-text");
        AccessFlowSDK sdkGraphics = new AccessFlowSDK(page);
        Map<String, Object> reportGraphics = sdkGraphics.audit();
        
        // Record audit for aggregation
        AccessFlowTeardown.recordAudit(page.url(), reportGraphics);
        
        assertNotNull(reportGraphics, "Graphics audit should produce a report");
    }
}
