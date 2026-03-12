"""Search Component Testing with AccessFlow SDK (Selenium). Mirrors Node sdk-audit-search-component.test.js."""

import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from conftest import navigate_to


class TestSearchComponentWithAccessFlowSDK:
    @pytest.fixture(autouse=True)
    def _visit_home(self, driver):
        navigate_to(driver, "/")
        driver.implicitly_wait(0.5)

    def test_should_display_search_input_when_drawer_is_open(self, driver, sdk):
        report = sdk.audit()
        assert report is not None

        wait = WebDriverWait(driver, 10)
        search_input = wait.until(
            EC.presence_of_element_located(
                (
                    By.CSS_SELECTOR,
                    'input[aria-label="Search for rules and criteria"], input[placeholder="Search..."]',
                )
            )
        )
        assert search_input.is_displayed()
        placeholder = search_input.get_attribute("placeholder")
        assert placeholder == "Search..."

    def test_should_display_result_details_in_dropdown(self, driver):
        wait = WebDriverWait(driver, 10)
        search_input = wait.until(
            EC.presence_of_element_located(
                (
                    By.CSS_SELECTOR,
                    'input[aria-label="Search for rules and criteria"], input[placeholder="Search..."]',
                )
            )
        )
        assert search_input.is_displayed()

        search_input.clear()
        search_input.send_keys("keyboard")
        driver.implicitly_wait(0.8)

        first_result = wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, '.MuiListItem-root, [role="option"], li')
            )
        )
        assert first_result.is_displayed()
        text = first_result.text
        assert text
        assert len(text.strip()) > 0
