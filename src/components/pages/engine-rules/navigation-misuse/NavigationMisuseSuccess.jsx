import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NavigationMisuseSuccess = () => {
  const ruleId = "navigation-misuse";
  const title = `Navigation landmark does not contain key site navigation links`;
  const description = `A navigation landmark should identify a section that contains primary links for moving through the site or page. Using navigation landmarks for minor or secondary link groups makes it harder for screen reader users to locate the page’s key navigation areas.`;
  const helpText = `Use navigation landmarks only for key navigation sections, such as the main site menu, table of contents, breadcrumbs, or pagination. Avoid using them for general link lists, social links, related links, or other secondary link groups, and keep the number of navigation landmarks as limited as practical.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu nav", fixture: "navigation-misuse/0-accessibe-main-menu-nav.html" },
  { filename: "breadcrumb nav list items mixed inline displays", fixture: "navigation-misuse/1-breadcrumb-nav-list-items-mixed-inline-displays.html" },
  { filename: "breadcrumb role navigation list items mixed inline displays", fixture: "navigation-misuse/2-breadcrumb-role-navigation-list-items-mixed-inline-displays.html" },
  { filename: "bsnsports com main menu", fixture: "navigation-misuse/3-bsnsports-com-main-menu.html" },
  { filename: "nav element is container of multiple list menus nav links", fixture: "navigation-misuse/4-nav-element-is-container-of-multiple-list-menus-nav-links.html" },
  { filename: "nav element is container of multiple list menus", fixture: "navigation-misuse/5-nav-element-is-container-of-multiple-list-menus.html" },
  { filename: "nav element is container of single list menu", fixture: "navigation-misuse/6-nav-element-is-container-of-single-list-menu.html" },
  { filename: "nav role is container of multiple list menus nav links", fixture: "navigation-misuse/7-nav-role-is-container-of-multiple-list-menus-nav-links.html" },
  { filename: "nav role is container of multiple list menus", fixture: "navigation-misuse/8-nav-role-is-container-of-multiple-list-menus.html" },
  { filename: "nav role is container of single list menu", fixture: "navigation-misuse/9-nav-role-is-container-of-single-list-menu.html" },
  { filename: "shop.qorpak.com nav has direct child breadcrumb", fixture: "navigation-misuse/10-shop-qorpak-com-nav-has-direct-child-breadcrumb.html" },
  { filename: "shopify main nav", fixture: "navigation-misuse/11-shopify-main-nav.html" }
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

export default NavigationMisuseSuccess;
