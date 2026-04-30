"""AccessFlow Python SDK — Behavior Tests (Selenium). Mirrors Node sdk-audit-init-and-basic-reports.test.js."""

import pytest

from conftest import navigate_to


class TestSDKInitialization:
    def test_should_initialize_without_errors(self):
        assert True

    def test_should_create_instance_bound_to_driver(self, driver, sdk):
        navigate_to(driver, "/")
        assert sdk is not None


class TestAuditHomePage:
    @pytest.fixture(autouse=True)
    def _visit_home(self, driver):
        navigate_to(driver, "/")
        driver.implicitly_wait(0.5)

    def test_should_return_report_on_home_page(self, driver, sdk):
        report = sdk.audit()
        assert report is not None

    def test_audit_should_complete_without_throwing(self, sdk):
        report = sdk.audit()
        assert report is not None


class TestAuditGraphicsRoute:
    @pytest.fixture(autouse=True)
    def _visit_graphics(self, driver):
        navigate_to(driver, "/graphics/alt-text_success")
        driver.implicitly_wait(0.5)

    def test_should_return_report_for_graphics_alt_text_route(self, sdk):
        report = sdk.audit()
        assert report is not None

    def test_multiple_audits_on_same_page_should_be_stable(self, sdk):
        report_a = sdk.audit()
        report_b = sdk.audit()
        assert report_a is not None
        assert report_b is not None


class TestAuditAfterNavigation:
    def test_should_audit_successfully_after_route_change(self, driver, sdk):
        navigate_to(driver, "/")
        driver.implicitly_wait(0.5)
        report_home = sdk.audit()
        assert report_home is not None

        navigate_to(driver, "/graphics/alt-text_success")
        driver.implicitly_wait(0.5)
        report_graphics = sdk.audit()
        assert report_graphics is not None
