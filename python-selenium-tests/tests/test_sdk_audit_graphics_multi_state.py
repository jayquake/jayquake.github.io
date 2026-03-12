"""Graphics Audit Tests with SDK (Selenium). Mirrors Node sdk-audit-graphics-multi-state.test.js."""

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from conftest import navigate_to


class TestGraphicsAuditWithSDK:
    def test_should_perform_audits_across_multiple_states_on_background_images_page(
        self, driver, sdk
    ):
        audit_results = []

        def perform_audit(context, max_attempts=1, wait_between_ms=2000):
            for attempt in range(1, max_attempts + 1):
                report = sdk.audit()
                if report:
                    audit_results.append({"context": context, "report": report})
                    assert report is not None
                    return
                if attempt < max_attempts:
                    driver.implicitly_wait(wait_between_ms / 1000)
            audit_results.append({"context": context, "report": None})

        def perform_success_page_audit():
            perform_audit("Success Page", max_attempts=4, wait_between_ms=2500)
            if audit_results and audit_results[-1].get("report") is None:
                wait = WebDriverWait(driver, 10)
                wait.until(
                    EC.presence_of_element_located(
                        (By.CSS_SELECTOR, 'main, [role="main"], h1, h2')
                    )
                )
                driver.implicitly_wait(1.2)
                perform_audit("Success Page (stability retry)", max_attempts=2, wait_between_ms=3000)

        navigate_to(driver, "/graphics/background-images_failure")
        driver.implicitly_wait(1)
        assert "graphics/background-images_failure" in driver.current_url

        perform_audit("Initial Failure Page")

        try:
            notification_btn = driver.find_element(
                By.XPATH, '//button[.//svg[@data-testid="NotificationsIcon"]]'
            )
            if notification_btn.is_displayed():
                notification_btn.click()
                driver.implicitly_wait(0.5)
                perform_audit("Notifications Modal Open")
                body = driver.find_element(By.CSS_SELECTOR, "body")
                body.send_keys(Keys.ESCAPE)
                driver.implicitly_wait(0.5)
        except Exception:
            pass

        try:
            close_sidebar = driver.find_element(
                By.XPATH, '//button[.//svg[@data-testid="ChevronLeftIcon"]]'
            )
            if close_sidebar.is_displayed():
                close_sidebar.click()
                driver.implicitly_wait(0.5)
                perform_audit("Sidebar Collapsed")
                try:
                    open_sidebar = driver.find_element(
                        By.XPATH, '//button[.//svg[@data-testid="MenuIcon"]]'
                    )
                    if open_sidebar.is_displayed():
                        open_sidebar.click()
                        driver.implicitly_wait(0.5)
                        perform_audit("Sidebar Expanded")
                except Exception:
                    pass
        except Exception:
            pass

        navigate_to(driver, "/graphics/background-images_success")
        driver.implicitly_wait(2)
        wait = WebDriverWait(driver, 10)
        wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, 'main, [role="main"], h1, h2')
            )
        )
        driver.implicitly_wait(0.8)

        perform_success_page_audit()

        assert len(audit_results) > 1
        successful = [r for r in audit_results if r.get("report")]
        assert len(successful) >= 2
