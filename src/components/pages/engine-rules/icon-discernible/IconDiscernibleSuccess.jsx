import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const IconDiscernibleSuccess = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "font awesome icon aria label", content: `<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> 
</head>
<i class="fa fa-star" aria-label="star"></i>
<span class="fa fa-star" aria-label="star"></span>
<div class="fa fa-star" aria-label="star"></div>` },
  { filename: "font awesome icon role presentation", content: `<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> 
</head>
<i class="fa fa-star" role="presentation"></i>
<span class="fa fa-star" role="presentation"></span>
<div class="fa fa-star" role="presentation"></div>` },
  { filename: "img aria label", content: `<style>
    img {
        width: 40;
        height: 20;
        display: block;
    }
</style>
<img src="https://banner2.cleanpng.com/20180411/oqq/kisspng-computer-icons-star-5-star-5acdd9ec67db40.8458493715234401084254.jpg" alt="Example Image" aria-label="star" />` },
  { filename: "img role presentation", content: `<style>
    img {
        width: 40;
        height: 20;
        display: block;
    }
</style>
<img role="presentation" src="https://banner2.cleanpng.com/20180411/oqq/kisspng-computer-icons-star-5-star-5acdd9ec67db40.8458493715234401084254.jpg" alt="Example Image" />` },
  { filename: "svg aria label", content: `<svg aria-label="circle" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg inside link with aria label", content: `<a href="/cart" aria-label="Cart"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg></a>` },
  { filename: "svg inside named button", content: `<button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg> Save</button>` },
  { filename: "svg role presentation", content: `<svg role="presentation" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default IconDiscernibleSuccess;
