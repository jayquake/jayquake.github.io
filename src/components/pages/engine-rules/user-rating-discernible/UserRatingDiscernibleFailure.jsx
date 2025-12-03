import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const UserRatingDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="User Rating Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "theknot ratings number no explantory text", content: `<div id="test-subject" class="rating--b0ef1 primaryBold--1abd6 centerAligned--5225d"></div>` },
  { filename: "theknot ratings stars no discernible text", content: `<div id="test-subject" class="stars--fc5d5 centerAligned--5225d caption-lg--e66c1">
    <div class="container--eef31 star--ebf69">
        <div class="filledStarContainer--c22d2">
            <div class="cropContainer--d0023" style="width:100%"><svg class="icon--1935d icon-has-no-size--189a8  ">
                    <use xlink:href="#v2-icon-star_filled"></use>
                </svg></div>
        </div><svg class="icon--1935d icon-has-no-size--189a8  ">
            <use xlink:href="#v2-icon-star"></use>
        </svg>
    </div>
    <div class="container--eef31 star--ebf69">
        <div class="filledStarContainer--c22d2">
            <div class="cropContainer--d0023" style="width:100%"><svg class="icon--1935d icon-has-no-size--189a8  ">
                    <use xlink:href="#v2-icon-star_filled"></use>
                </svg></div>
        </div><svg class="icon--1935d icon-has-no-size--189a8  ">
            <use xlink:href="#v2-icon-star"></use>
        </svg>
    </div>
    <div class="container--eef31 star--ebf69">
        <div class="filledStarContainer--c22d2">
            <div class="cropContainer--d0023" style="width:100%"><svg class="icon--1935d icon-has-no-size--189a8  ">
                    <use xlink:href="#v2-icon-star_filled"></use>
                </svg></div>
        </div><svg class="icon--1935d icon-has-no-size--189a8  ">
            <use xlink:href="#v2-icon-star"></use>
        </svg>
    </div>
    <div class="container--eef31 star--ebf69">
        <div class="filledStarContainer--c22d2">
            <div class="cropContainer--d0023" style="width:100%"><svg class="icon--1935d icon-has-no-size--189a8  ">
                    <use xlink:href="#v2-icon-star_filled"></use>
                </svg></div>
        </div><svg class="icon--1935d icon-has-no-size--189a8  ">
            <use xlink:href="#v2-icon-star"></use>
        </svg>
    </div>
    <div class="container--eef31 star--ebf69">
        <div class="filledStarContainer--c22d2">
            <div class="cropContainer--d0023" style="width:64%"><svg class="icon--1935d icon-has-no-size--189a8  ">
                    <use xlink:href="#v2-icon-star_filled"></use>
                </svg></div>
        </div><svg class="icon--1935d icon-has-no-size--189a8  ">
            <use xlink:href="#v2-icon-star"></use>
        </svg>
    </div>
</div>` }
      ]}
    />
  );
};

export default UserRatingDiscernibleFailure;
