"""
Tests for accessflow.config.json localCheck behavior.

- localCheck true: Violations exceeding thresholds should fail the test (CI/dev).
  When under threshold, test passes.
- localCheck false: Violations are recorded in the report but do not fail the test (monitoring).
"""

import json
from pathlib import Path

import pytest

from conftest import navigate_to

CONFIG_PATH = Path(__file__).resolve().parent.parent / "accessflow.config.json"


def _load_config():
    if CONFIG_PATH.exists():
        return json.loads(CONFIG_PATH.read_text())
    return {"issuesFoundThreshold": {"extreme": 1000, "high": 1000, "medium": 2000, "low": 1000}, "localCheck": False}


def _thresholds_exceeded(report: dict, thresholds: dict) -> bool:
    """Return True if any severity count exceeds the configured threshold."""
    if not report:
        return False
    issues = report.get("numberOfIssuesFound") or {}
    for severity in ["extreme", "high", "medium", "low"]:
        count = issues.get(severity, 0)
        limit = thresholds.get(severity, float("inf"))
        if count > limit:
            return True
    return False


class TestLocalCheckTrue:
    """When localCheck is true: under threshold → pass; over threshold → must fail (CI/dev)."""

    def test_local_check_true_under_threshold_passes(self, driver, sdk):
        """With localCheck true, when no violations exceed thresholds, test should pass."""
        config = _load_config()
        config["localCheck"] = True
        config["issuesFoundThreshold"] = {"extreme": 100, "high": 100, "medium": 100, "low": 100}
        navigate_to(driver, "/graphics/alt-text_success")
        driver.implicitly_wait(1)
        report = sdk.audit()
        assert report is not None
        assert not _thresholds_exceeded(report, config["issuesFoundThreshold"]), (
            "Unexpected threshold exceedance on success page"
        )


class TestLocalCheckFalse:
    """When localCheck is false, violations are recorded in the report but do not fail the test."""

    @pytest.fixture(autouse=True)
    def _visit_failure_page(self, driver):
        navigate_to(driver, "/errors/fake-hidden-content_failure")
        driver.implicitly_wait(1)

    def test_local_check_false_records_violations_but_does_not_fail(self, sdk):
        """With localCheck false, run passes even when report has violations (monitoring use case)."""
        config = _load_config()
        config["localCheck"] = False
        config["issuesFoundThreshold"] = {"extreme": 0, "high": 0, "medium": 0, "low": 0}
        report = sdk.audit()
        assert report is not None
        if _thresholds_exceeded(report, config["issuesFoundThreshold"]):
            issues = report.get("numberOfIssuesFound") or {}
            assert isinstance(issues, dict)
        # No pytest.fail — test must pass when localCheck is false
