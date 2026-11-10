/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): carousel-next-slide-discernible, carousel-next-slide-discernible-correctly, carousel-previous-slide-discernible, carousel-previous-slide-discernible-correctly
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Carousels: Carousel Arrows - Failure";

const CarouselarrowsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="carousels-carousel-arrows-failure-failure-1"
          data-atomic-source="carousel-next-slide-discernible/carousel-controls-not-labelled"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control prev">&lt;</button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next"></button>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="carousels-carousel-arrows-failure-failure-2"
          data-atomic-source="carousel-next-slide-discernible-correctly/carousel-controls-labelled-wrongly"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control previous" aria-label="some button">&lt;</button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next" aria-label="some other button">&gt;</button>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="carousels-carousel-arrows-failure-failure-3"
          data-atomic-source="carousel-previous-slide-discernible/carousel-controls-not-labelled"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control prev"></button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next">&gt;</button>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="carousels-carousel-arrows-failure-failure-4"
          data-atomic-source="carousel-previous-slide-discernible-correctly/carousel-controls-labelled-wrongly"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" class="carousel" role="region" aria-roledescription="carousel" aria-label="News feed">
  <button class="control prev" aria-label="some button">&lt;</button>
  <ul class="carousel__slides-container">
    <li class="slide">slide 1</li>
    <li class="slide">slide 2</li>
    <li class="slide">slide 3</li>
  </ul>
  <button class="control next" aria-label="some other button">&gt;</button>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default CarouselarrowsFailure;
