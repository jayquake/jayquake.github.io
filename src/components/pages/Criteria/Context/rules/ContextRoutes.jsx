import React from "react";
import { Routes, Route } from "react-router-dom";
import ActivetabSuccess from "./Success/ActivetabSuccess";
import ActivetabFailures from "./Failures/ActivetabFailures";
import ArticleSetupSuccess from "./Success/ArticleSetupSuccess";
import ArticleSetupFailures from "./Failures/ArticleSetupFailures";
import FooterLandmarkSuccess from "./Success/FooterLandmarkSuccess";
import FooterLandmarkFailures from "./Failures/FooterLandmarkFailures";
import IframelabelingSuccess from "./Success/IframelabelingSuccess";
import IframelabelingFailures from "./Failures/IframelabelingFailures";
import IncorrectMainLandmarkSuccess from "./Success/Incorrect-main-landmarkSuccess";
import IncorrectMainLandmarkFailures from "./Failures/IncorrectmainlandmarkFailures";
import CopyOfScrollFocusSuccess from "./Success/Copy-of-scroll-focusSuccess";
import CopyOfScrollFocusFailures from "./Failures/Copy-of-scroll-focusFailures";
import MainLandmarkSuccess from "./Success/Main-landmarkSuccess";
import MainLandmarkFailure from "./Failures/Main-landmarkFailure";
import MultipleMainLandmarksFailure from "./Failures/Multiple-main-landmarksFailure";
import MultipleMainLandmarksSuccess from "./Success/Multiple-main-landmarksSuccess";
import PopupTaggingSuccess from "./Success/Popup-taggingSuccess";
import PopupTaggingFailures from "./Failures/Popup-taggingFailures";
import SalePrices_Success from "./Success/Sale-prices_Success";
import SalePrices_Failures from "./Failures/Sale-prices_Failures";
import TabPanelTaggingSuccess from "./Success/TabPanelTaggingSuccess";
import TabPanelTaggingFailure from "./Failures/TabPanelTaggingFailure";
import UserratingSuccess from "./Success/UserratingSuccess";
import UserratingFailure from "./Failures/UserratingFailure";
import TabsTaggingSuccess from "./Success/Tabs-taggingSuccess";
import TabsTaggingFailures from "./Failures/Tabs-taggingFailures";
const ContextRoutes = () => (
  <>
    <Route path="context/active-tab_success" element={<ActivetabSuccess />} />
    <Route path="context/active-tab_failure" element={<ActivetabFailures />} />
    <Route path="landmarks/article-setup_success" element={<ArticleSetupSuccess />} />
    <Route path="landmarks/article-setup_failure" element={<ArticleSetupFailures />} />
    <Route path="landmarks/footer-landmark_success" element={<FooterLandmarkSuccess />} />
    <Route path="landmarks/footer-landmark_failure" element={<FooterLandmarkFailures />} />
    <Route path="general/iframe-labeling_success" element={<IframelabelingSuccess />} />
    <Route path="general/iframe-labeling_failure" element={<IframelabelingFailures />} />
    <Route path="landmarks/incorrect-main-landmark_success" element={<IncorrectMainLandmarkSuccess />} />
    <Route path="landmarks/incorrect-main-landmark_failure" element={<IncorrectMainLandmarkFailures />} />
    <Route path="context/copy-of-scroll-focus_success" element={<CopyOfScrollFocusSuccess />} />
    <Route path="context/copy-of-scroll-focus_failure" element={<CopyOfScrollFocusFailures />} />
    <Route path="landmarks/main-landmark_success" element={<MainLandmarkSuccess />} />
    <Route path="landmarks/main-landmark_failure" element={<MainLandmarkFailure />} />
    <Route path="landmarks/multiple-main-landmarks_success" element={<MultipleMainLandmarksSuccess />} />
    <Route path="landmarks/multiple-main-landmarks_failure" element={<MultipleMainLandmarksFailure />} />
    <Route path="dialogs/popup-tagging_success" element={<PopupTaggingSuccess />} />
    <Route path="dialogs/popup-tagging_failure" element={<PopupTaggingFailures />} />
    <Route path="text-content/sale-prices_success" element={<SalePrices_Success />} />
    <Route path="text-content/sale-prices_failure" element={<SalePrices_Failures />} />
    <Route path="context/tab-panel-tagging_success" element={<TabPanelTaggingSuccess />} />
    <Route path="context/tab-panel-tagging_failure" element={<TabPanelTaggingFailure />} />
    <Route path="graphics/user-rating_success" element={<UserratingSuccess />} />
    <Route path="graphics/user-rating_failure" element={<UserratingFailure />} />
    <Route path="context/tabs-tagging_success" element={<TabsTaggingSuccess />} />
    <Route path="context/tabs-tagging_failure" element={<TabsTaggingFailures />} />





  
  </>
);

export default ContextRoutes;
