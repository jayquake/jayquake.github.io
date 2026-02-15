"""
Shared fixtures and session-level setup for Python AccessFlow SDK tests.

Mirrors the JS lane pattern:
  - SDK init once per session (like AccessFlowSDK.init(...) at file top level)
  - Per-test SDK instance bound to the Playwright page
  - App server availability check before tests run
"""

import os
import subprocess
import time
import urllib.request
import urllib.error

import pytest
from accessflow_sdk import AccessFlowSDK


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
def _init_accessflow_sdk():
    """Initialize the AccessFlow SDK once for the entire test session."""
    api_key = os.environ.get("ACCESSFLOW_API_KEY", "")
    if not api_key:
        pytest.exit(
            "ACCESSFLOW_API_KEY environment variable is required to run these tests.",
            returncode=1,
        )
    AccessFlowSDK.init(api_key=api_key)


# ---------------------------------------------------------------------------
# Per-test fixtures
# ---------------------------------------------------------------------------

@pytest.fixture
def sdk(page):
    """Provide an AccessFlow SDK instance bound to the current Playwright page."""
    return AccessFlowSDK(page)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _server_is_ready(url: str) -> bool:
    try:
        urllib.request.urlopen(url, timeout=3)
        return True
    except (urllib.error.URLError, ConnectionError, OSError):
        return False
