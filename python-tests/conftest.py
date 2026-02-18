"""
Shared fixtures and session-level setup for Python AccessFlow SDK tests.
"""

import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

import pytest
from dotenv import load_dotenv
from accessflow_sdk import AccessFlowSDK, finalize_reports, record_audit

# Load .env from python-tests/ for local testing (AF_Python_Package_Key)
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

BASE_URL = "http://localhost:3000"


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

    # On Windows, use npm.cmd instead of npm or use shell=True
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
    api_key = os.environ.get("AF_Python_Package_Key")
    if not api_key:
        pytest.skip(
            "AF_Python_Package_Key not set. For local testing, create python-tests/.env with:\n"
            "  AF_Python_Package_Key=flow-your-key-here"
        )
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
