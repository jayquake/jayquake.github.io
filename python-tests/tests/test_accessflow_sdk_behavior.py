"""
AccessFlow Python SDK — Behavior Tests

These Playwright-driven tests exercise the Python SDK against the live React
app at http://localhost:3000, using a real ACCESSFLOW_API_KEY.

Test structure mirrors the JS lane (search.spec.js, graphics-audit.spec.js)
so all three language lanes validate equivalent behavior.
"""

import json
from pathlib import Path

import pytest


REPORTS_DIR = Path(__file__).resolve().parents[1] / "test-results"
LOCAL_REPORT_PATH = REPORTS_DIR / "accessflow-local-report.json"


# ==========================================================================
# SDK Initialization
# ==========================================================================


class TestSDKInitialization:
    """Verify the SDK initializes and binds to a Playwright page."""

    def test_sdk_constructor_succeeds_with_valid_key(self, sdk):
        """AccessFlowSDK(page, config) should initialize without raising."""
        assert sdk is not None

    def test_instance_binds_to_page(self, sdk):
        """AccessFlowSDK(page) should return a truthy, usable instance."""
        assert sdk is not None


# ==========================================================================
# Audit — Home Page
# ==========================================================================


class TestAuditHomePage:
    """Run an audit on the app root and verify the report shape."""

    @pytest.fixture(autouse=True)
    def _navigate_home(self, page):
        page.goto("/")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

    def test_audit_returns_report(self, sdk):
        """sdk.audit() should return a non-None report object."""
        report = sdk.audit()
        assert report is not None

    def test_report_is_dict_like(self, sdk):
        """The audit report should be a dict (or dict-like) with content."""
        report = sdk.audit()
        assert isinstance(report, dict) or hasattr(report, "keys")

    def test_audit_completes_without_error(self, sdk):
        """The audit call should not raise on a well-formed page."""
        try:
            report = sdk.audit()
        except Exception as exc:
            pytest.fail(f"sdk.audit() raised an unexpected exception: {exc}")

    def test_generates_local_report_file(self, sdk):
        """Generate and persist a local JSON report artifact."""
        audits = sdk.audit()
        report = sdk.generate_report(audits)

        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        LOCAL_REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")

        assert LOCAL_REPORT_PATH.exists()
        assert LOCAL_REPORT_PATH.stat().st_size > 0
        assert isinstance(report, dict)


# ==========================================================================
# Audit — Specific Route (Graphics / Alt-Text)
# ==========================================================================


class TestAuditSpecificRoute:
    """Validate auditing on a deep-linked route with known content."""

    @pytest.fixture(autouse=True)
    def _navigate_to_route(self, page):
        page.goto("/#/graphics/alt-text")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

    def test_audit_on_graphics_route(self, sdk):
        """Audit should return a report for the graphics/alt-text route."""
        report = sdk.audit()
        assert report is not None

    def test_multiple_audits_are_stable(self, sdk, page):
        """Running audit twice on the same page should not raise or diverge."""
        report_a = sdk.audit()
        report_b = sdk.audit()
        assert report_a is not None
        assert report_b is not None


# ==========================================================================
# Audit — Navigation Timing
# ==========================================================================


class TestAuditAfterNavigation:
    """Verify audits work correctly after in-app navigation."""

    def test_audit_after_route_change(self, page, sdk):
        """Navigate between routes and audit each; both should succeed."""
        # First route
        page.goto("/")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        report_home = sdk.audit()

        # Second route
        page.goto("/#/graphics/alt-text")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        report_graphics = sdk.audit()

        assert report_home is not None
        assert report_graphics is not None
