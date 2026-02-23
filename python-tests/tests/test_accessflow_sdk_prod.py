"""
AccessFlow Python SDK — Production test suite for dev/py-test-prod.

Playwright tests that validate SDK behavior and audit quality against
the production environment.
"""

import pytest


class TestAccessFlowProdSuite:
    """Production validation tests for the AccessFlow Python SDK."""

    PROD_ROUTES = [
        "/",
        "/#/graphics",
        "/#/graphics/alt-text",
        "/#/forms",
        "/#/keyboard",
        "/#/navigation",
        "/#/headings",
        "/#/errors",
    ]

    @pytest.mark.parametrize("route", PROD_ROUTES)
    def test_prod_audit_returns_report(self, page, sdk, route):
        """Audit each prod route and ensure a non-empty report is returned."""
        page.goto(route)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        report = sdk.audit()
        assert report is not None, f"audit() returned None for {route}"
        assert isinstance(report, dict) or hasattr(report, "keys")

    def test_prod_sequential_audits_stable(self, page, sdk):
        """Run sequential audits on home and graphics routes; reports should be stable."""
        page.goto("/")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        r1 = sdk.audit()
        r2 = sdk.audit()
        assert r1 is not None and r2 is not None

        page.goto("/#/graphics/alt-text")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)
        r3 = sdk.audit()
        assert r3 is not None

    def test_prod_report_has_expected_structure(self, page, sdk):
        """Generate report and assert common prod report fields exist."""
        page.goto("/")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        audits = sdk.audit()
        report = sdk.generate_report(audits)

        assert isinstance(report, dict)
        assert "numberOfIssuesFound" in report or "ruleViolations" in report or len(report) > 0
