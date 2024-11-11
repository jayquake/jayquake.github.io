import React from "react";
import { Route } from "react-router-dom";
import ActivetabSuccess from "./Success/ActivetabSuccess";
import ActivetabFailures from "./Failures/ActivetabFailures";
import ArticleSetupSuccess from "./Success/ArticleSetupSuccess";
import ArticleSetupFailures from "./Failures/ArticleSetupFailures";
import FooterLandmarkSuccess from "./Success/FooterLandmarkSuccess";
import FooterLandmarkFailures from "./Failures/FooterLandmarkFailures";
import IframelabelingSuccess from "./Success/IframelabelingSuccess";
import IframelabelingFailures from "./Failures/IframelabelingFailures";
import IncorrectMainLandmarkSuccess from "./Success/Incorrect-main-landmarkSuccess";
import IncorrectmainlandmarkFailures from "./Failures/IncorrectmainlandmarkFailures";
import CopyOfScrollFocusSuccess from "./Success/Copy-of-scroll-focusSuccess";
import CopyOfScrollFocusFailures from "./Failures/Copy-of-scroll-focusFailures";
import MainLandmarkSuccess from "./Success/Main-landmarkSuccess";
import MainLandmarkFailure from "./Failures/Main-landmarkFailure";
import MultipleMainLandmarksFailure from "./Failures/Multiple-main-landmarksFailure";
import MultipleMainLandmarksSuccess from "./Success/Multiple-main-landmarksSuccess";


export default (
  <>
    <Route
      path="/context/active-tab_success"
      element={<ActivetabSuccess />}
    />
    <Route
      path="/context/active-tab_failure"
      element={<ActivetabFailures />}
    />
    <Route
      path="/context/article-setup_success"
      element={<ArticleSetupSuccess />}
    />
    <Route
      path="/context/article-setup_failure"
      element={<ArticleSetupFailures />}
    />
   <Route
      path="/context/footer-landmark_success"
      element={<FooterLandmarkSuccess />}
    />
    <Route
      path="/context/footer-landmark_failure"
      element={<FooterLandmarkFailures />}
    />
    <Route
      path="/context/iframe-labeling_success"
      element={<IframelabelingSuccess />}
    />
    <Route
      path="/context/iframe-labeling_failure"
      element={<IframelabelingFailures />}
    />
    <Route
      path="/context/incorrect-main-landmark_success"
      element={<IncorrectMainLandmarkSuccess />}
    />
    <Route
      path="/context/incorrect-main-landmark_failure"
      element={<IncorrectmainlandmarkFailures />}
    />
   <Route
      path="/context/copy-of-scroll-focus_success"
      element={<CopyOfScrollFocusSuccess />}
    />
    <Route
      path="/context/copy-of-scroll-focus_failure"
      element={<CopyOfScrollFocusFailures />}
    />
   <Route
      path="/context/main-landmark_success"
      element={<MainLandmarkSuccess />}
    />
    <Route
      path="/context/main-landmark_failure"
      element={<MainLandmarkFailure />}
    />
    <Route
      path="/context/multiple-main-landmarks_success"
      element={<MultipleMainLandmarksSuccess />}
    />
    <Route
      path="/context/multiple-main-landmarks_failure"
      element={<MultipleMainLandmarksFailure />}
    />
  </>
);
