package com.accessflow;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

/**
 * Shared Selenium WebDriver creation and navigation helpers.
 * Mirrors helpers/driver.js from the Node Selenium suite.
 */
public final class DriverHelper {

    private static final String BASE_URL =
            System.getenv("BASE_URL") != null ? System.getenv("BASE_URL") : "http://localhost:3000";

    private DriverHelper() {}

    public static WebDriver createDriver() {
        ChromeOptions options = new ChromeOptions();

        String ci = System.getenv("CI");
        String headless = System.getenv("HEADLESS");
        if ("true".equalsIgnoreCase(ci) || "true".equalsIgnoreCase(headless)) {
            options.addArguments("--headless=new");
        }

        options.addArguments(
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--window-size=1280,720"
        );

        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        return driver;
    }

    public static void navigateTo(WebDriver driver, String path) {
        String url = path.startsWith("/") ? BASE_URL + path : BASE_URL + "/" + path;
        driver.get(url);
        sleep(1000);
    }

    public static void scrollIntoView(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({ block: 'center', behavior: 'instant' });", element);
        sleep(300);
    }

    public static void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) { Thread.currentThread().interrupt(); }
    }

    public static String getBaseUrl() {
        return BASE_URL;
    }

    public static String getApiKey() {
        String key = System.getenv("AF_NODE_PACKAGE_KEY");
        if (key != null && !key.isEmpty()) return key;
        key = System.getenv("JAVA_ACCESSFLOW_SDK_TOKEN");
        if (key != null && !key.isEmpty()) return key;
        key = System.getenv("ACCESSFLOW_SDK_API_KEY");
        return key;
    }
}
