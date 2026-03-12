"""
Shared fixtures and session-level setup for Python AccessFlow SDK Selenium tests.
"""

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

import pytest
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from accessflow_sdk import AccessFlowSDK, SeleniumDriver, finalize_reports

# Load .env from python-selenium-tests/ for local testing (PYTHON_ACCESSFLOW_SDK_TOKEN)
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000")


# ---------------------------------------------------------------------------
# Local report collection (mirrors Java LocalReportCollector)
# ---------------------------------------------------------------------------

RULE_SEVERITY = {
    "altText": "extreme", "pageTitle": "extreme", "missingFormLabels": "extreme",
    "languageAttribute": "extreme", "backgroundImages": "high", "ariaLabelMisuse": "high",
    "brokenAriaLabels": "high", "brokenAriaReference": "high", "brokenNavItems": "high",
    "colorContrast": "medium", "emptyHeadings": "medium", "fontSizes": "medium",
    "headingOrder": "medium", "tabIndex": "medium", "ambiguousLinks": "medium",
    "brokenList": "medium", "breadcrumbs": "low", "decorativeContent": "low",
}

_collected_audits: list[dict] = []


def _record_audit(url: str, audit_data: dict) -> None:
    _collected_audits.append({"url": url, "audit": audit_data})


def _write_local_reports() -> None:
    if not _collected_audits:
        return

    results_dir = os.path.join(os.path.dirname(__file__), "test-results")
    os.makedirs(results_dir, exist_ok=True)

    # Build pages-based summary matching AccessFlowAuditProcessor expectations
    pages: dict = {}
    for entry in _collected_audits:
        url = entry["url"]
        audit = entry.get("audit") or {}

        if url not in pages:
            pages[url] = {
                "numberOfIssuesFound": {"extreme": 0, "high": 0, "medium": 0, "low": 0},
                "ruleViolations": {},
            }

        page = pages[url]
        counts = page["numberOfIssuesFound"]
        rule_violations = page["ruleViolations"]

        for rule_key, violations in audit.items():
            if not isinstance(violations, dict) or not violations:
                continue

            severity = RULE_SEVERITY.get(rule_key, "medium")

            if rule_key not in rule_violations:
                rule_violations[rule_key] = {
                    "name": _camel_to_title(rule_key),
                    "severity": severity,
                    "numberOfOccurrences": 0,
                    "selectorData": [],
                }

            rv = rule_violations[rule_key]
            occurrences = 0

            for sel_key, detail in violations.items():
                if not isinstance(detail, dict):
                    continue
                occ = detail.get("occurrences", 1)
                occurrences += occ
                rv["selectorData"].append({
                    "selector": detail.get("selector", sel_key),
                    "HTML": detail.get("HTML", ""),
                })

            rv["numberOfOccurrences"] += occurrences
            counts[severity] = counts.get(severity, 0) + occurrences

    summary_path = os.path.join(results_dir, "accessflow-report-summary.json")
    with open(summary_path, "w") as f:
        json.dump({"pages": pages}, f, indent=2)
    print(f"[AccessFlow] Local report written to: {summary_path}")

    # Also write raw JSONL for the processor's fallback path
    jsonl_path = os.path.join(results_dir, f"accessFlow-raw-audits-{os.getpid()}.jsonl")
    with open(jsonl_path, "w") as f:
        for entry in _collected_audits:
            f.write(json.dumps(entry) + "\n")
    print(f"[AccessFlow] Raw audit JSONL written to: {jsonl_path}")


def _camel_to_title(key: str) -> str:
    import re
    return re.sub(r"([A-Z])", r" \1", key).strip().title()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _server_is_ready(url: str, timeout: int = 3) -> bool:
    try:
        urllib.request.urlopen(url, timeout=timeout)
        return True
    except (urllib.error.URLError, ConnectionError, OSError):
        return False


def navigate_to(driver, path: str) -> None:
    """Navigate driver to BASE_URL + path."""
    url = f"{BASE_URL.rstrip('/')}{path}" if path.startswith("/") else f"{BASE_URL}/{path}"
    driver.get(url)
    driver.implicitly_wait(1)
    time.sleep(1)


def scroll_into_view(driver, element) -> None:
    """Scroll element into view so it can be clicked."""
    driver.execute_script(
        'arguments[0].scrollIntoView({ block: "center", behavior: "instant" });',
        element,
    )
    time.sleep(0.3)


# ---------------------------------------------------------------------------
# Session fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session", autouse=True)
def _ensure_app_server():
    """Start the React dev server if it is not already running (local dev only)."""
    if _server_is_ready(BASE_URL):
        yield
        return

    is_ci = os.environ.get("CI", "").lower() == "true"
    if is_ci or os.environ.get("NODE_ENV") == "production":
        pytest.fail(f"Server not reachable at {BASE_URL} — expected it to be running already in CI")

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    if sys.platform == "win32":
        npm_cmd = "npm.cmd"
    else:
        npm_cmd = "npm"

    proc = subprocess.Popen(
        [npm_cmd, "start"],
        cwd=project_root,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env={**os.environ, "BROWSER": "none"},
        shell=(sys.platform == "win32"),
    )

    for _ in range(60):
        if _server_is_ready(BASE_URL):
            break
        time.sleep(1)
    else:
        proc.terminate()
        pytest.fail(f"App server at {BASE_URL} did not become ready within 60 s")

    yield
    proc.terminate()
    proc.wait(timeout=10)


@pytest.fixture(scope="session", autouse=True)
def _finalize_accessflow_reports():
    """Finalize/upload aggregated reports and write local summary after the full test session."""
    yield
    finalize_reports()
    _write_local_reports()


# ---------------------------------------------------------------------------
# Per-test fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def driver():
    """Provide a Chrome WebDriver instance (headless in CI)."""
    options = Options()
    if os.environ.get("CI", "").lower() == "true" or os.environ.get("HEADLESS", "").lower() == "true":
        options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1280,720")

    service = Service()
    wd = webdriver.Chrome(service=service, options=options)
    wd.set_page_load_timeout(30)
    wd.implicitly_wait(5)
    yield wd
    wd.quit()


@pytest.fixture
def sdk(driver):
    """Provide an AccessFlow SDK instance bound to the Selenium driver.

    Wraps audit() to auto-record results for local report generation.
    """
    api_key = (
        os.environ.get("AF_NODE_PACKAGE_KEY")
        or os.environ.get("PYTHON_ACCESSFLOW_SDK_TOKEN")
        or os.environ.get("ACCESSFLOW_SDK_API_KEY")
    )
    if not api_key:
        pytest.skip(
            "AF_NODE_PACKAGE_KEY, PYTHON_ACCESSFLOW_SDK_TOKEN, or ACCESSFLOW_SDK_API_KEY not set. "
            "For local testing, create python-selenium-tests/.env with:\n"
            "  PYTHON_ACCESSFLOW_SDK_TOKEN=flow-your-key-here"
        )
    real_sdk = AccessFlowSDK(SeleniumDriver(driver), api_key=api_key)

    original_audit = real_sdk.audit

    def _recording_audit(*args, **kwargs):
        result = original_audit(*args, **kwargs)
        if result is not None:
            _record_audit(driver.current_url, result)
        return result

    real_sdk.audit = _recording_audit
    return real_sdk
