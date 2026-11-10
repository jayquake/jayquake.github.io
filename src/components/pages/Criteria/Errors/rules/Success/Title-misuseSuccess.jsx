/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): no-extra-information-in-title
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Title Misuse - Success";

const TitlemisuseSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-title-misuse-success-success-1"
          data-atomic-source="no-extra-information-in-title/div-with-title-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!--
    The div is name-prohibited, so the title's information cannot be added to its name. Without the gate the
    aria-label satisfies the rule's \`accessibleName\` check, the title is missing from that name, and the node fails.
-->
<div class="account-menu" title="Opens the account menu" aria-label="Account">Account</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-2"
          data-atomic-source="no-extra-information-in-title/i-srVisibleText-contains-the-title"
          dangerouslySetInnerHTML={{
            __html: `<i title="Search"><span class="anything">Search 123</span></i>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-3"
          data-atomic-source="no-extra-information-in-title/img-with-alt-contains-the-title"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img alt="A beautiful beach with clear blue water | info" title="info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-4"
          data-atomic-source="no-extra-information-in-title/img-with-title-and-alt-aria-hidden-true"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img alt="A beautiful beach with clear blue water" title="info" aria-hidden="true" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-5"
          data-atomic-source="no-extra-information-in-title/img-with-title-and-empty-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img alt="" title="info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-6"
          data-atomic-source="no-extra-information-in-title/img-with-title-without-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img title="info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-7"
          data-atomic-source="no-extra-information-in-title/input-with-aria-label-contains-the-title"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <input title="info" aria-label="Search | info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-8"
          data-atomic-source="no-extra-information-in-title/input-with-title-with-empty-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <input title="info" aria-label="" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-9"
          data-atomic-source="no-extra-information-in-title/input-with-title-without-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <input title="info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-10"
          data-atomic-source="no-extra-information-in-title/srVisibleText-contains-the-trim-title"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img alt="Moshe-Ivgy" title=" Ivgy" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-11"
          data-atomic-source="no-extra-information-in-title/title-and-alt-content-are-the-same"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
</head>
<body>
<img title="info" alt="info"/>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-12"
          data-atomic-source="no-extra-information-in-title/title-content-is-empty"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
</head>
<body>
<div title="">First</div>
<div title="   ">Second</div>
<div title>Third</div>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-13"
          data-atomic-source="no-extra-information-in-title/title-has-content-no-children-with-sr-only"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div title="info">
        <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">info</span>
    </div>
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-14"
          data-atomic-source="no-extra-information-in-title/title-has-content-no-children"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div title="info"></div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-15"
          data-atomic-source="no-extra-information-in-title/title-has-content-with-children-with-sr-only"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div title="info">
        <div>Hi 1</div>
        <div>Hi 2</div>
        <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">info</span>
    </div>
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-success-success-16"
          data-atomic-source="no-extra-information-in-title/title-has-content-with-children"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div title="info">
      <div>Hi 1</div>
      <div>Hi 2</div>
    </div>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default TitlemisuseSuccess;
