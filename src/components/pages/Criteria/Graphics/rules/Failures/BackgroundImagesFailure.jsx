/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): background-image-discernible, background-image-discernible-image
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Background Images - Failure";

const BackgroundImagesFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-background-images-failure-failure-1"
          data-atomic-source="background-image-discernible/background-image-without-discernible-elements"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
</style>

<div class="background-image-element">Hello</div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-background-images-failure-failure-2"
          data-atomic-source="background-image-discernible/backgroung-image-with-empty-sr-only-first-child"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .background-image {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    height: 250px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>

<div id="test-case-1" class="test-case background-image pass">
  <span class="sr-only" role="img"></span>
  <p>Test Case 1: Pass</p>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-background-images-failure-failure-3"
          data-atomic-source="background-image-discernible/backgroung-image-with-first-child-discernible-that-is-not-sr-only"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
</style>

<div class="background-image-element">
  <span role="img" aria-label="Background image of diverse professionals collaborating in a modern office"></span>
  <h1>Welcome to Our Website</h1>
  <p>Discover our range of services and products tailored for you.</p>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-background-images-failure-failure-4"
          data-atomic-source="background-image-discernible-image/background-image-with-first-child-discernible-sr-only-that-doesnt-have-role-img"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .background-image-element {
    background-image: url("path/to/your/image.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>

<div class="background-image-element">
  <span class="sr-only" aria-label="Background image of diverse professionals collaborating in a modern office"></span>
  <h1>Welcome to Our Website</h1>
  <p>Discover our range of services and products tailored for you.</p>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BackgroundImagesFailure;
