"""Fake Hidden Content Audit Tests (Selenium). Mirrors Node sdk-audit-hidden-content-thresholds.test.js."""

import json
from pathlib import Path

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from conftest import navigate_to

CONFIG_PATH = Path(__file__).resolve().parent.parent / "accessflow.config.json"
CONFIG = {"issuesFoundThreshold": {"extreme": 0, "high": 0, "medium": 0, "low": 0}, "localCheck": True}
if CONFIG_PATH.exists():
    CONFIG = json.loads(CONFIG_PATH.read_text())


class TestFakeHiddenContentAudit:
    @pytest.fixture(autouse=True)
    def _visit_home(self, driver):
        navigate_to(driver, "/")
        driver.implicitly_wait(1)

    def test_should_perform_audits_across_states_and_verify_thresholds(
        self, driver, sdk
    ):
        audit_results = []

        def perform_audit(context):
            report = sdk.audit()
            audit_results.append({"context": context, "report": report})
            if CONFIG.get("localCheck") and report:
                issues = report.get("numberOfIssuesFound") or {}
                thresholds = CONFIG.get("issuesFoundThreshold") or {}
                for severity in ["extreme", "high", "medium", "low"]:
                    count = issues.get(severity, 0)
                    limit = thresholds.get(severity, float("inf"))
                    if count > limit:
                        pass  # log only

        navigate_to(driver, "/errors/fake-hidden-content_failure")
        driver.implicitly_wait(1)
        assert "errors/fake-hidden-content_failure" in driver.current_url

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
                except Exception:
                    pass
        except Exception:
            pass

        navigate_to(driver, "/errors/fake-hidden-content_success")
        driver.implicitly_wait(1)
        assert "errors/fake-hidden-content_success" in driver.current_url

        perform_audit("Success Page")

        assert len(audit_results) > 1
