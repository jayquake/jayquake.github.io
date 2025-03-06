import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Criteria: Context - User Rating - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
    
  {/* Failure 1: No text alternative, inaccessible rating */}
<div className="list-item visible-failure" id="userRating-failure-1">
  <div className="stars" role="presentation" aria-hidden="true">
    <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
    <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
    <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
    <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
    <svg><use xlinkHref="#v2-icon-star"></use></svg>
    {/* Screen readers will completely ignore this now */}
  </div>
  <p className="failure-description">❌ No text alternative or accessible name for screen readers.</p>
</div>
        

        {/* Failure 2: Ratings as an image without alt text */}
        <div className="list-item visible-failure" id="userRating-failure-2">
          <div>
            <img src="stars-3.png" />
            {/* Image-based rating with no alt text */}
          </div>
          <p className="failure-description">❌ Ratings as an image without alt text.</p>

        </div>
        

        {/* Failure 3: No aria-hidden on empty stars (Visible Issue) */}
        <div className="list-item visible-failure" id="userRating-failure-3">
          <div className="rating">
            <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
            <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
            <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
            <svg><use xlinkHref="#v2-icon-star_filled"></use></svg>
            <svg><use xlinkHref="#v2-icon-star"></use></svg>
            {/* Empty stars should be aria-hidden */}
          </div>
          <p className="failure-description">❌ Empty stars are not hidden from screen readers, causing unnecessary verbosity.</p>
        </div>

        {/* Failure 4: Text rating has no actual value displayed */}
        <div className="list-item" id="userRating-failure-4">
          <div className="rating--b0ef1 primaryBold--1abd6 centerAligned--5225d"></div>
          <p className="failure-description">❌ Empty div for ratings with no text or interactive element.</p>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);