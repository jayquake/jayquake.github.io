import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";
import { StarRatingFailure } from "./StarRatingFailure";
import { ThumbsRatingFailure } from "./ThumbsRatingFailure";
import { EmojiReactionsFailure } from "./EmojiReactionsFailure";
import { SliderRatingFailure } from "./SliderRatingFailure";
import { BarGraphRatingFailure } from "./BarGraphRatingFailure";
import AmazonPopoverRating from "./AmazonPopoverRating";

const itemDescription = "Criteria: Context - User Rating - Failure";
const GoogleReviewsFailure = () => (
  <div>
    <div className="review">
      ★★★★☆ - Great experience!
      {/* No semantic structure, no keyboard navigation */}
    </div>
  </div>
);

const NetflixRatingFailure = () => (
  <div>
    <button>👍</button>
    <button>👎</button>
    {/* Missing aria-label and feedback */}
  </div>
);

const YelpBarGraphFailure = () => (
  <div>
    <div style={{ width: '80%' }}>★★★★★</div>
    <div style={{ width: '60%' }}>★★★★☆</div>
    <div style={{ width: '40%' }}>★★★☆☆</div>
    <div style={{ width: '20%' }}>★★☆☆☆</div>
    <div style={{ width: '10%' }}>★☆☆☆☆</div>
    {/* No aria-label or descriptive text */}
  </div>
);

const SpotifyEmojiFeedbackFailure = () => (
  <div>
    🎵 😊 😡 😢
    {/* Not focusable, no labels, no feedback */}
  </div>
);

const TripAdvisorSliderFailure = () => (
  <div>
    <input type="range" min="1" max="10" step="1" />
    {/* Missing aria attributes and label */}
  </div>
);
const AmazonRatingFailure = () => (
  <div>
    <span>Amazon Rating</span>
    <a href="javascript:void(0)" role="button" className="a-popover-trigger a-declarative">
      <span className="a-size-base a-color-base">4.7</span>
      <i className="a-icon a-icon-star a-star-4-5 cm-cr-review-stars-spacing-big">
        <span className="a-icon-alt">4.7 out of 5 stars</span>
      </i>
      <i className="a-icon a-icon-popover"></i>
    </a>
    {/* Popover content not accessible */}
  </div>
);

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="userRating-failure-1">
          <StarRatingFailure />
        </div>
        <div className="list-item" id="userRating-failure-2">
          <ThumbsRatingFailure />
        </div>
        <div className="list-item" id="userRating-failure-3">
          <EmojiReactionsFailure />
        </div>
        <div className="list-item" id="userRating-failure-4">
          <SliderRatingFailure />
        </div>
        <div className="list-item" id="userRating-failure-5">
          <BarGraphRatingFailure />
        </div>
        <div className="list-item" id="userRating-failure-6">
          <GoogleReviewsFailure />
        </div>
        <div className="list-item" id="userRating-failure-7">
          <NetflixRatingFailure />
        </div>
        <div className="list-item" id="userRating-failure-8">
          <YelpBarGraphFailure />
        </div>
        <div className="list-item" id="userRating-failure-9">
          <SpotifyEmojiFeedbackFailure />
        </div>
        <div className="list-item" id="userRating-failure-10">
          <TripAdvisorSliderFailure />
        </div>
        <div className="list-item" id="userRating-failure-11">
          <span> Yelp </span>  
          <div class="arrange-unit__09f24__rqHTg arrange-unit-fill__09f24__CUubG y-css-1n5biw7" data-testid="BizHeaderReviewCount"><span class=" y-css-1jz061g" data-font-weight="semibold">4.3 </span><span class=" y-css-r8orer"><a href="#reviews" class="y-css-1x1e1r2">(2.4k reviews)</a></span></div>
        </div>
        <div className="list-item" id="userRating-failure-12">
          <AmazonPopoverRating />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
