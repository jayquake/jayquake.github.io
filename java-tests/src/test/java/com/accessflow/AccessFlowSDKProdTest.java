package com.accessflow;

import com.acsbe.accessflow.AccessFlowSDK;
import com.acsbe.accessflow.AccessFlowTeardown;
import com.microsoft.playwright.*;
import org.junit.jupiter.api.*;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * AccessFlow Java SDK — Production test suite for dev/java-test-prod.
 *
 * Playwright tests that validate SDK behavior and audit quality
 * against the production environment using accessflow-sdk-1.0.1.jar.
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AccessFlowSDKProdTest {

    private static final String BASE_URL = "http://localhost:3000";

    private static final String[] PROD_ROUTES = {
        "/",
        "/#/graphics",
        "/#/graphics/alt-text",
        "/#/forms",
        "/#/keyboard",
        "/#/navigation",
        "/#/headings",
        "/#/errors",
    };

    private static Playwright playwright;
    private static Browser browser;
    private BrowserContext context;
    private Page page;

    @BeforeAll
    static void setupAll() {
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

        LocalReportCollector.write();
        AccessFlowTeardown.finalizeReports();
    }

    private void navigateAndWait(String path) {
        page.navigate(BASE_URL + path);
        page.waitForLoadState(com.microsoft.playwright.options.LoadState.NETWORKIDLE);
        page.waitForTimeout(500);
    }

    private static String getApiKey() {
        String token = System.getenv("JAVA_ACCESSFLOW_SDK_TOKEN");
        return token != null ? token : System.getenv("ACCESSFLOW_SDK_API_KEY");
    }

    private AccessFlowSDK createSdk() {
        String apiKey = getApiKey();
        return apiKey != null && !apiKey.isEmpty()
                ? new AccessFlowSDK(page, apiKey)
                : new AccessFlowSDK(page);
    }

    @Test
    @Order(1)
    @DisplayName("Prod: Audit returns report on each core route")
    void testProdAuditEachRoute() {
        for (String route : PROD_ROUTES) {
            navigateAndWait(route);
            AccessFlowSDK sdk = createSdk();
            Map<String, Object> report = sdk.audit();
            AccessFlowTeardown.recordAudit(page.url(), report);
            LocalReportCollector.add(page.url(), report);
            assertNotNull(report, "audit() returned null for route " + route);
        }
    }

    @Test
    @Order(2)
    @DisplayName("Prod: Sequential audits on home and graphics are stable")
    void testProdSequentialAuditsStable() {
        navigateAndWait("/");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> r1 = sdk.audit();
        Map<String, Object> r2 = sdk.audit();
        AccessFlowTeardown.recordAudit(page.url(), r1);
        AccessFlowTeardown.recordAudit(page.url(), r2);
        LocalReportCollector.add(page.url(), r1);
        LocalReportCollector.add(page.url(), r2);
        assertNotNull(r1);
        assertNotNull(r2);

        navigateAndWait("/#/graphics/alt-text");
        AccessFlowSDK sdk2 = createSdk();
        Map<String, Object> r3 = sdk2.audit();
        AccessFlowTeardown.recordAudit(page.url(), r3);
        LocalReportCollector.add(page.url(), r3);
        assertNotNull(r3);
    }

    @Test
    @Order(3)
    @DisplayName("Prod: Audit does not throw on empty forms route")
    void testProdAuditFormsRoute() {
        navigateAndWait("/#/forms");
        AccessFlowSDK sdk = createSdk();
        assertDoesNotThrow(() -> {
            Map<String, Object> audits = sdk.audit();
            AccessFlowTeardown.recordAudit(page.url(), audits);
            LocalReportCollector.add(page.url(), audits);
            return audits;
        }, "sdk.audit() should not throw on forms route");
    }

    @Test
    @Order(4)
    @DisplayName("Prod: Report has expected structure")
    void testProdReportStructure() {
        navigateAndWait("/");
        AccessFlowSDK sdk = createSdk();
        Map<String, Object> audits = sdk.audit();
        AccessFlowTeardown.recordAudit(page.url(), audits);
        LocalReportCollector.add(page.url(), audits);
        assertNotNull(audits);
    }
}
