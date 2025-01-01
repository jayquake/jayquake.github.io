import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";
import {StarRatingFailure} from "./StarRatingFailure";
import {ThumbsRatingFailure} from "./ThumbsRatingFailure";
import {EmojiReactionsFailure} from "./EmojiReactionsFailure";  
import {SliderRatingFailure} from "./SliderRatingFailure";
import {BarGraphRatingFailure} from "./BarGraphRatingFailure";

const itemDescription = "Criteria: Context - User Rating - Failure";

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
      </>
    }
    itemDescription={itemDescription}
  />
);
