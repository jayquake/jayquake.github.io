"""Navigation Timing Tests (Selenium). Mirrors Node sdk-audit-navigation-timing.test.js."""

import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from conftest import navigate_to

ENABLE_SDK_AUDIT = True


def _format_time(ms: float) -> str:
    if ms < 1000:
        return f"{ms:.0f}ms"
    return f"{ms / 1000:.2f}s"


class TestNavigationTiming:
    def test_should_measure_home_page_load_and_audit_time(self, driver, sdk):
        navigate_to(driver, "/")
        driver.implicitly_wait(0.5)

        if ENABLE_SDK_AUDIT:
            start = time.perf_counter()
            report = sdk.audit()
            elapsed = (time.perf_counter() - start) * 1000
            assert report is not None
            assert elapsed >= 0

        wait = WebDriverWait(driver, 10)
        heading = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[contains(text(), "Rule Library")]')
            )
        )
        assert heading.is_displayed()

    def test_should_measure_navigation_through_legacy_rule_pages_with_timing(
        self, driver, sdk
    ):
        rule_pages = [
            {"name": "Background Images", "path": "/graphics/background-images_success"},
            {"name": "Form Labels", "path": "/forms/form-labels_success"},
            {"name": "Keyboard Traps", "path": "/keyboard/keyboard-traps_success"},
            {"name": "Skip Links", "path": "/navigation/skip-links_success"},
            {"name": "Heading Order", "path": "/headings/heading-order_success"},
            {"name": "Error Identification", "path": "/errors/error-identification_success"},
        ]

        for rule_page in rule_pages:
            nav_start = time.perf_counter()
            navigate_to(driver, rule_page["path"])
            driver.implicitly_wait(0.3)
            nav_time = (time.perf_counter() - nav_start) * 1000

            if ENABLE_SDK_AUDIT:
                audit_start = time.perf_counter()
                sdk.audit()
                audit_time = (time.perf_counter() - audit_start) * 1000
                assert audit_time >= 0

            assert nav_time >= 0

    def test_should_measure_navigation_through_engine_rule_pages_with_timing(
        self, driver, sdk
    ):
        engine_pages = [
            {"name": "Page Title", "path": "/engine/page-title_success"},
            {"name": "Alt Misuse", "path": "/engine/alt-misuse_success"},
            {"name": "Link Discernible", "path": "/engine/link-anchor-discernible_success"},
            {"name": "Button Discernible", "path": "/engine/button-discernible_success"},
            {"name": "Color Contrast", "path": "/engine/color-contrast_success"},
            {"name": "Heading Order", "path": "/engine/heading-order_success"},
        ]

        for engine_page in engine_pages:
            navigate_to(driver, engine_page["path"])
            driver.implicitly_wait(0.3)

            if ENABLE_SDK_AUDIT:
                report = sdk.audit()
                assert report is not None
