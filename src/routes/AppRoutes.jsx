// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Clickables from "../components/pages/Criteria/Clickables/Clickables";
import Context from "../components/pages/Criteria/Context/Context";
import Carousels from "../components/pages/Criteria/Carousels/Carousels";
import Forms from "../components/pages/Criteria/Forms/Forms";
import Document from "../components/pages/Criteria/Document/Document";
import Errors from "../components/pages/Criteria/Errors/Errors";
import Graphics from "../components/pages/Criteria/Graphics/Graphics";
import Keyboard from "../components/pages/Criteria/Keyboard/Keyboard";
import Navigation from "../components/pages/Criteria/Navigation/Navigation";
import Readability from "../components/pages/Criteria/Readability/Readability";
import Headings from "../components/pages/Criteria/Headings/Headings";
import Tables from "../components/pages/Criteria/Tables/Tables";
import KeyboardRoutes from "../components/pages/Criteria/Keyboard/KbruleRoutes";
import FormruleRoutes from "../components/pages/Criteria/Forms/rules/FormruleRoutes";
import ClickableruleRoutes from "../components/pages/Criteria/Clickables/rules/ClickableRoutes";
import ContextRoutes from "../components/pages/Criteria/Context/rules/ContextRoutes";
import AllRulesWithRoutes from "../components/pages/Criteria/AllRulesLinks";
import ListRoutes from "../routes/routes";

const AppRoutes = ({ navigate }) => (
  <Routes>
    <Route index element={<Home navigate={navigate} title="Home" />} />
    <Route path="/rules/*" element={<ListRoutes />} />
    <Route path="/*" element={<AllRulesWithRoutes navigate={navigate} />} />
    <Route path="/clickables" element={<Clickables navigate={navigate} title="Clickables" />} />
    <Route path="/context" element={<Context navigate={navigate} title="Context" />} />
    <Route path="/headings" element={<Headings navigate={navigate} title="Headings" />} />
    <Route path="/document" element={<Document navigate={navigate} title="Document" />} />
    <Route path="/errors" element={<Errors navigate={navigate} title="Errors" />} />
    <Route path="/forms" element={<Forms navigate={navigate} title="Forms" />} />
    <Route path="/graphics" element={<Graphics navigate={navigate} title="Graphics" />} />
    <Route path="/keyboard" element={<Keyboard navigate={navigate} title="Keyboard" />} />
    {KeyboardRoutes}
    {FormruleRoutes}
    {ClickableruleRoutes}
    {ContextRoutes}
    <Route path="/navigation" element={<Navigation navigate={navigate} title="Navigation" />} />
    <Route path="/readability" element={<Readability navigate={navigate} title="Readability" />} />
    <Route path="/tables" element={<Tables navigate={navigate} title="Tables" />} />
  </Routes>
);

export default AppRoutes;
