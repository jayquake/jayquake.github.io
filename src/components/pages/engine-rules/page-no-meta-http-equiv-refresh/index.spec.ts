import { PageNoMetaHttpEquivRefresh } from "./index";
import type { ValidationMethodArguments } from "../../../test/unit/helpers/validation-method-arguments";
import validationMethodArguments from "../../../test/unit/helpers/validation-method-arguments";

describe("PageNoMetaHttpEquivRefresh Rule Validation", () => {
  let validateMethodArguments: ValidationMethodArguments;

  beforeEach(() => {
    validateMethodArguments = validationMethodArguments();
  });

  it("should pass when there are no <meta> elements with http-equiv='refresh'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta charset="UTF-8">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should pass when there are no <meta> elements", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toHaveLength(0);
  });

  it("should fail when there is a <meta> element with http-equiv='refresh'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="5;url=https://www.example.com">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when there are multiple <meta> elements with http-equiv='refresh'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="5;url=https://www.example.com">
        <meta http-equiv="refresh" content="10">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElements = document.querySelectorAll('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes.length).toBe(metaElements.length);
    metaElements.forEach((metaElement) => {
      expect(response.failedNodes).toContain(metaElement);
    });
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when the refresh meta content attribute is missing", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when the refresh meta content attribute is empty", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="   ">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should pass when content time is 0 and there is a redirect target after ';'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="0; https://w3.org">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(metaElement);
    expect(response.failedNodes).not.toContain(metaElement);
  });

  it("should pass when content time is greater than 72000 and there is a redirect target after ';'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="72001; URL='https://example.com'">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(metaElement);
    expect(response.failedNodes).not.toContain(metaElement);
  });

  it("should fail when content time is 0 but there is nothing after ';'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="0;">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when content time is 0 and there is only whitespace after ';'", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="0;   ">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when content time is not 0 and not greater than 72000 even if there is a redirect target", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="5; https://example.com">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should fail when content time is NaN even if there is a redirect target", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="abc; https://example.com">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.failedNodes).toContain(metaElement);
    expect(response.passedNodes).toHaveLength(0);
  });

  it("should pass when content time is 0 and redirect target uses URL= syntax with different casing", async () => {
    const { document, response } = validateMethodArguments;
    document.body.innerHTML = `
      <head>
        <meta http-equiv="refresh" content="0; uRl='https://example.com'">
        <title>Test Page</title>
      </head>
      <body>
        <p>Content of the page</p>
      </body>
    `;

    const metaElement = document.querySelector('meta[http-equiv="refresh"]');

    await PageNoMetaHttpEquivRefresh.validate(validateMethodArguments);
    expect(response.passedNodes).toContain(metaElement);
    expect(response.failedNodes).not.toContain(metaElement);
  });
});
