import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionFooterMisuseFailure = () => {
  const ruleId = "region-footer-misuse";
  const title = `An element without global site information is tagged as a contentinfo landmark`;
  const description = `When a region without global site information is tagged as a contentinfo landmark, screen reader users may be misled about its purpose and expect website-level details, such as copyright or contact information.`;
  const helpText = `If the failing element is a custom contentinfo region, remove role="contentinfo". If the failing element is coded using a HTML <footer> tag, change the tag to a <div> or an element with a suitable role.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "content info not footer", content: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* ... styles ... */

      nav {
        background-color: #202020;
        color: #fff;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        width: 100%;
      }

      nav a {
        text-decoration: none;
        padding: 5px 10px;
      }

      nav a:hover {
        text-decoration: underline;
      }

      nav .logo {
        font-size: 20px;
        font-weight: bold;
      }

      nav .links {
        display: flex;
      }

      nav .links a {
        margin-right: 20px;
      }

      nav .social-icons {
        display: flex;
      }

      nav .social-icons i {
        font-size: 20px;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <header>Header content</header>
    <div>
      <section style="height: 600px">Nested main content</section>
    </div>
    <nav>
      <a href="#" class="logo">MyStore</a>
      <div class="links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </div>
      <div class="social-icons">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
      </div>
    </nav>
    <div class="footer" role="contentinfo">Product list</div>
  </body>
</html>` },
  { filename: "footer not footer", content: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* ... styles ... */

      nav {
        background-color: #202020;
        color: #fff;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        width: 100%;
      }

      nav a {
        text-decoration: none;
        padding: 5px 10px;
      }

      nav a:hover {
        text-decoration: underline;
      }

      nav .logo {
        font-size: 20px;
        font-weight: bold;
      }

      nav .links {
        display: flex;
      }

      nav .links a {
        margin-right: 20px;
      }

      nav .social-icons {
        display: flex;
      }

      nav .social-icons i {
        font-size: 20px;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <header>Header content</header>
    <div>
      <section style="height: 600px">Nested main content</section>
    </div>
    <nav>
      <a href="#" class="logo">MyStore</a>
      <div class="links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </div>
      <div class="social-icons">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-instagram"></i>
      </div>
    </nav>
    <footer>Product list</footer>
  </body>
</html>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default RegionFooterMisuseFailure;
