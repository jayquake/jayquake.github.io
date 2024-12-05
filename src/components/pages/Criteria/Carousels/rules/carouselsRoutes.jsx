import React from "react";
import { Route, Routes } from "react-router-dom";
import SuccessCarousel from "./Success/Carousel-arrowsSuccess";
import FailureCarousel from "./Failure/Carousel-arrowsFailure";
import CarousellabelingSuccess from "./Success/Carousel-labelingSuccess";
import CarousellabelingFailure from "./Failure/Carousel-labelingFailure";

const CarouselRoutes = () => (
  <>
  <Route path="carousels/carousel-arrows_success" element={<SuccessCarousel />} />
  <Route path="carousels/carousel-arrows_failure" element={<FailureCarousel />} />
  <Route path="carousels/carousel-labeling_success" element={<CarousellabelingSuccess />} />
  <Route path="carousels/carousel-labeling_failure" element={<CarousellabelingFailure />} />



  </>
);

export default CarouselRoutes;
