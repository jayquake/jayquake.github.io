"""
Shared fixtures and session-level setup for Python AccessFlow SDK Selenium tests.
"""

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
    """Finalize/upload aggregated reports after the full test session."""
    yield
    finalize_reports()


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
    """Provide an AccessFlow SDK instance bound to the Selenium driver."""
    api_key = (
        os.environ.get("PYTHON_ACCESSFLOW_SDK_TOKEN")
        or os.environ.get("ACCESSFLOW_SDK_API_KEY")
    )
    if not api_key:
        pytest.skip(
            "PYTHON_ACCESSFLOW_SDK_TOKEN or ACCESSFLOW_SDK_API_KEY not set. "
            "For local testing, create python-selenium-tests/.env with:\n"
            "  PYTHON_ACCESSFLOW_SDK_TOKEN=flow-your-key-here"
        )
    return AccessFlowSDK(SeleniumDriver(driver), api_key=api_key)
