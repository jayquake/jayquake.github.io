"""
Shared fixtures and session-level setup for Python AccessFlow SDK tests.
"""

import os
import subprocess
import time
import urllib.request
import urllib.error

import pytest
from accessflow_sdk import AccessFlowSDK, finalize_reports, record_audit


BASE_URL = "http://localhost:3000"
DEFAULT_API_TOKEN = "flow-1iqGS8DggNOeZaZLO2w000BuHpUZhYUOrL"


# ---------------------------------------------------------------------------
# Session fixtures
# ---------------------------------------------------------------------------

@pytest.fixture(scope="session", autouse=True)
def _ensure_app_server():
    """Start the React dev server if it is not already running."""
    if _server_is_ready(BASE_URL):
        yield
        return

    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    proc = subprocess.Popen(
        ["npm", "start"],
        cwd=project_root,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env={**os.environ, "BROWSER": "none"},
    )

    # Poll until the server responds (up to 60 s)
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
    """Finalize/upload aggregated reports after the full test session."""
    yield
    finalize_reports()


# ---------------------------------------------------------------------------
# Per-test fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def sdk(page):
    """Provide an AccessFlow SDK instance bound to the current Playwright page."""
    api_key = os.environ.get("AF_Python_Package_Key", DEFAULT_API_TOKEN)
    sdk_instance = AccessFlowSDK(page, config={"apiToken": api_key})

    original_audit = sdk_instance.audit

    def _audit_with_recording():
        audits = original_audit()
        record_audit(page.url, audits)
        return audits

    sdk_instance.audit = _audit_with_recording
    return sdk_instance


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _server_is_ready(url: str) -> bool:
    try:
        urllib.request.urlopen(url, timeout=3)
        return True
    except (urllib.error.URLError, ConnectionError, OSError):
        return False
