"""Breadcrumbs with Accessibility Audits (Selenium). Mirrors Node sdk-audit-breadcrumb-navigation.test.js."""

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from conftest import navigate_to, scroll_into_view


class TestBreadcrumbsWithAccessibilityAudits:
    def test_should_navigate_from_failure_to_success_via_breadcrumb_and_audit_both(
        self, driver, sdk
    ):
        navigate_to(driver, "/graphics/background-images_failure")
        driver.implicitly_wait(1)

        assert "background-images_failure" in driver.current_url

        failure_report = sdk.audit()
        assert failure_report is not None

        wait = WebDriverWait(driver, 10)
        breadcrumb_select = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[aria-label="Select variant type"]'))
        )
        assert breadcrumb_select.is_displayed()
        scroll_into_view(driver, breadcrumb_select)
        breadcrumb_select.click()
        driver.implicitly_wait(0.5)

        success_option = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, '//li[@role="option" and text()="Success"]')
            )
        )
        scroll_into_view(driver, success_option)
        success_option.click()
        driver.implicitly_wait(1)

        assert "background-images_success" in driver.current_url

        success_report = sdk.audit()
        assert success_report is not None
        assert failure_report is not None
        assert success_report is not None

    def test_should_navigate_from_success_back_to_failure_using_breadcrumb(
        self, driver, sdk
    ):
        navigate_to(driver, "/graphics/background-images_success")
        driver.implicitly_wait(1)

        assert "background-images_success" in driver.current_url

        success_audit = sdk.audit()
        assert success_audit is not None

        wait = WebDriverWait(driver, 10)
        breadcrumb_select = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[aria-label="Select variant type"]'))
        )
        assert breadcrumb_select.is_displayed()
        scroll_into_view(driver, breadcrumb_select)
        breadcrumb_select.click()
        driver.implicitly_wait(0.5)

        failure_option = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, '//li[@role="option" and text()="Failure"]')
            )
        )
        scroll_into_view(driver, failure_option)
        failure_option.click()
        driver.implicitly_wait(1)

        assert "background-images_failure" in driver.current_url

        failure_audit = sdk.audit()
        assert failure_audit is not None
        assert success_audit is not None
        assert failure_audit is not None

    def test_should_audit_multiple_rule_pages_via_breadcrumb_navigation(
        self, driver, sdk
    ):
        audit_results = []
        rules = [
            {"name": "Background Images", "path": "/graphics/background-images"},
            {"name": "Alt Text", "path": "/graphics/alt-text"},
            {"name": "Decorative Content", "path": "/graphics/decorative-content"},
        ]

        for rule in rules:
            navigate_to(driver, f"{rule['path']}_failure")
            driver.implicitly_wait(0.8)

            failure_audit = sdk.audit()

            try:
                breadcrumb_select = driver.find_element(
                    By.CSS_SELECTOR, '[aria-label="Select variant type"]'
                )
                if breadcrumb_select.is_displayed():
                    scroll_into_view(driver, breadcrumb_select)
                    breadcrumb_select.click()
                    driver.implicitly_wait(0.3)

                    success_option = driver.find_element(
                        By.XPATH, '//li[@role="option" and text()="Success"]'
                    )
                    if success_option.is_displayed():
                        scroll_into_view(driver, success_option)
                        success_option.click()
                        driver.implicitly_wait(0.8)

                        success_audit = sdk.audit()
                        audit_results.append({
                            "rule": rule["name"],
                            "failure_audit": bool(failure_audit),
                            "success_audit": bool(success_audit),
                        })
            except Exception:
                pass

        assert len(audit_results) > 0
        assert all(r["failure_audit"] and r["success_audit"] for r in audit_results)
