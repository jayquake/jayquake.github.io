import { HtmlLangValid, hasKnownPrimaryLanguageTag } from ".";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("HtmlLangValid Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
    const { document } = validateMethodArguments;
    // Prepare a clean state for the document
    document.documentElement.lang = ""; // Clear any lang attribute
  });

  it("should mark as inapplicable when no lang attribute is present", async () => {
    const { response, document } = validateMethodArguments;
    await HtmlLangValid.validate(validateMethodArguments);

    // Check for inapplicability due to missing lang attribute (lang is empty string or not set)
    expect(response.inapplicableNodes).toContain(document.documentElement);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  // New test for lang attributes that become empty after trimming
  const inapplicableLangAttributeValues = [
    "   ", // Trimmed to "", triggering inapplicableNodes
  ];

  it.each(inapplicableLangAttributeValues)("should mark as inapplicable when lang attribute is whitespace-only: %s", async (lang) => {
    const { response, document } = validateMethodArguments;
    document.documentElement.lang = lang;
    await HtmlLangValid.validate(validateMethodArguments);

    expect(response.inapplicableNodes).toContain(document.documentElement);
    expect(response.passedNodes.length).toBe(0);
    expect(response.failedNodes.length).toBe(0);
  });

  // Test cases for the main validate function
  const validLangAttributeValues = [
    "en",
    "fr-CA",
    "es-419",
    "zh-Hant",
    "en-UK-GB", // Should pass as 'en' is valid primary tag and subtags are alphanumeric
    "en-us",
    "fr-be",
    "de-ch",
    "ar-latn",
    "pt-br",
    "ru",
    "es-MX",
    "EN", // Case-insensitive primary tag check
    "fr-Latn-CA",
    "zh-Hans-CN",
  ];

  it.each(validLangAttributeValues)("should pass with a valid lang attribute value: %s", async (lang) => {
    const { response, document } = validateMethodArguments;
    document.documentElement.lang = lang;
    await HtmlLangValid.validate(validateMethodArguments);

    expect(response.passedNodes).toContain(document.documentElement);
    expect(response.failedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(0);
  });

  const invalidLangAttributeValues = [
    "e", // Primary tag not two letters
    "eng", // Primary tag not two letters
    "12", // Primary tag not two letters
    "en1", // Primary tag not two letters
    "ab-!@", // Non-alphanumeric subtag
    "ab--cd", // Empty subtag
    "zz-ZZ", // 'zz' is likely not in ISO_639_1_ALPHA2
    "abcd-efgh", // Primary tag not two letters (e.g., 'abcd')
    "en_US", // Underscore instead of hyphen (not alphanumeric)
    "en- us", // Space in subtag (not alphanumeric)
    "en-US-", // Trailing hyphen (empty subtag)
  ];

  it.each(invalidLangAttributeValues)("should fail with an invalid lang attribute value: %s", async (lang) => {
    const { response, document } = validateMethodArguments;
    document.documentElement.lang = lang;
    await HtmlLangValid.validate(validateMethodArguments);

    // These cases should consistently fail
    expect(response.failedNodes).toContain(document.documentElement);
    expect(response.passedNodes.length).toBe(0);
    expect(response.inapplicableNodes.length).toBe(0);
  });

  // New describe block for hasKnownPrimaryLanguageTag helper function
  describe("hasKnownPrimaryLanguageTag helper function", () => {
    // Valid cases
    const validTags = [
      "en",
      "EN",
      "eN",
      "En",
      "fr-CA",
      "fr-ca",
      "FR-CA",
      "es-419",
      "ES-419",
      "zh-Hant",
      "ZH-HANT",
      "en-US-oed", // Lenient check, passes if 'en' is valid primary and parts are alphanumeric
      "de-Latn-1996",
      "pt-BR",
      "ru",
      "en-Latn-US-variant",
      "zh-Hans-CN",
    ];
    it.each(validTags)("should return true for valid language tag: %s", (tag) => {
      expect(hasKnownPrimaryLanguageTag(tag)).toBe(true);
    });

    // Invalid cases
    const invalidTags = [
      "",
      "   ",
      "e", // Primary tag not two letters
      "eng", // Primary tag not two letters
      "1", // Primary tag not two letters
      "123", // Primary tag not two letters
      "en1", // Primary tag not two letters
      "en-!@", // Non-alphanumeric subtag
      "en--US", // Empty subtag
      "ab-", // Empty subtag at the end
      "-ab", // Empty subtag at the start
      "zz-ZZ", // Assuming 'zz' is not in ISO_639_1_ALPHA2
      "abcd-efgh", // Primary not two letters
      "en- us", // Space in subtag (not alphanumeric)
      "en_US", // Underscore instead of hyphen (not alphanumeric)
      "en-US-", // Trailing hyphen (empty subtag)
    ];
    it.each(invalidTags)("should return false for invalid language tag: %s", (tag) => {
      expect(hasKnownPrimaryLanguageTag(tag)).toBe(false);
    });
  });
});
