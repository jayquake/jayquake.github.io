"""
AccessFlow Python SDK — Additional production validation audits.

These tests add broader route/state coverage to generate more audit runs
for CI while keeping assertions stable and implementation-agnostic.
"""

import pytest


class TestProductionValidationAudits:
    """Extra SDK audits intended for production-like validation coverage."""

    ROUTES = [
        "/",
        "/#/graphics",
        "/#/graphics/alt-text",
        "/#/forms",
        "/#/keyboard",
        "/#/navigation",
        "/#/headings",
        "/#/errors",
    ]

    @pytest.mark.parametrize("route", ROUTES)
    def test_audit_each_core_route(self, page, sdk, route):
        """Audit every major route and assert a report is returned."""
        page.goto(route)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        report = sdk.audit()
        assert report is not None, f"audit() returned None for route {route}"

    def test_audit_with_viewport_changes(self, page, sdk):
        """Run audits under multiple viewport sizes to broaden signal."""
        scenarios = [
            (1280, 720, "/"),
            (1024, 768, "/#/graphics/alt-text"),
            (390, 844, "/#/forms"),
        ]

        for width, height, route in scenarios:
            page.set_viewport_size({"width": width, "height": height})
            page.goto(route)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            report = sdk.audit()
            assert report is not None, (
                f"audit() returned None for {route} at {width}x{height}"
            )

    def test_audit_after_multi_step_navigation(self, page, sdk):
        """Audit at each step of a longer end-user navigation flow."""
        journey = [
            "/",
            "/#/navigation",
            "/#/headings",
            "/#/errors",
            "/#/graphics/alt-text",
        ]

        for route in journey:
            page.goto(route)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            report = sdk.audit()
            assert report is not None, f"audit() returned None for journey route {route}"

    def test_generate_report_shape_is_consistent(self, page, sdk):
        """Validate generated report shape on representative routes."""
        sample_routes = ["/", "/#/graphics/alt-text", "/#/forms"]

        for route in sample_routes:
            page.goto(route)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            audits = sdk.audit()
            generated = sdk.generate_report(audits)

            assert isinstance(generated, dict), (
                f"generate_report() did not return dict for {route}"
            )
            assert "numberOfIssuesFound" in generated, (
                f"numberOfIssuesFound missing for {route}"
            )
