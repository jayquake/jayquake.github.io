import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RegionFooterMisuseSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Region Footer Misuse"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "footer region", content: `<!DOCTYPE html>
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
    <footer>
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
    </footer>
  </body>
</html>` },
  { filename: "role content info", content: `<!DOCTYPE html>
<html>
  <head>
    <style>
      /* ... styles ... */

      .footer {
        background-color: #202020;
        color: #fff;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        width: 100%;
      }

      .footer a {
        text-decoration: none;
        padding: 5px 10px;
      }

      .footer a:hover {
        text-decoration: underline;
      }

      .footer .logo {
        font-size: 20px;
        font-weight: bold;
      }

      .footer .links {
        display: flex;
      }

      .footer .links a {
        margin-right: 20px;
      }

      .footer .social-icons {
        display: flex;
      }

      .footer .social-icons i {
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
    <div class="footer" role="contentinfo">
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
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default RegionFooterMisuseSuccess;
