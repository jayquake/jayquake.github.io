import React from "react";
import CarouselsRoutes from "../components/pages/Criteria/Carousels/rules/carouselsRoutes";
import ClickablesRoutes from "../components/pages/Criteria/Clickables/rules/ClickableRoutes";
import ContextRoutes from "../components/pages/Criteria/Context/rules/ContextRoutes";
import DocumentRoutes from "../components/pages/Criteria/Document/rules/documentRoutes";
import ErrorsRoutes from "../components/pages/Criteria/Errors/rules/errorsRoutes";
import FormruleRoutes from "../components/pages/Criteria/Forms/rules/FormruleRoutes";
import GraphicsRoutes from "../components/pages/Criteria/Graphics/rules/graphicsRoutes";
import HeadingsRoutes from "../components/pages/Criteria/Headings/rules/headingsRoutes";
import KeyboardRoutes from "../components/pages/Criteria/Keyboard/rules/KeyboardRoutes";
import NavigationRoutes from "../components/pages/Criteria/Navigation/rules/navigationRoutes";
import ReadabilityRoutes from "../components/pages/Criteria/Readability/rules/readabilityRoutes";
import TablesRoutes from "../components/pages/Criteria/Tables/rules/tablesRoutes";

const CRITERIA_PREFIXES = [
  "/graphics",
  "/forms",
  "/keyboard",
  "/navigation",
  "/headings",
  "/errors",
  "/carousels",
  "/clickables",
  "/context",
  "/document",
  "/readability",
  "/tables",
];

export function isCriteriaPath(pathname) {
  return CRITERIA_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** All legacy criteria rule detail routes in one lazy-loaded chunk. */
export default function CriteriaRoutesBundle() {
  return (
    <>
      {ClickablesRoutes()}
      {ContextRoutes()}
      {KeyboardRoutes()}
      {FormruleRoutes()}
      {DocumentRoutes()}
      {ErrorsRoutes()}
      {ReadabilityRoutes()}
      {GraphicsRoutes()}
      {HeadingsRoutes()}
      {CarouselsRoutes()}
      {TablesRoutes()}
      {NavigationRoutes()}
    </>
  );
}
