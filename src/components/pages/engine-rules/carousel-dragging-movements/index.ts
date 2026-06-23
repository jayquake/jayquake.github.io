import type { Rule } from "~/rules/interfaces";
import { PassCondition } from "~/rules/interfaces";
import { PerceivableComponentCarouselLibrary, PerceivableComponentCarouselSlidePickerLibrary, PerceivableComponentCarouselArrowPreviousLibrary, PerceivableComponentCarouselArrowNextLibrary, PerceivableComponentCarouselSlidersWrapperLibrary } from "@acsbe/core-engine-classifier";

const OVERFLOW_TOLERANCE_PX_WIDTH = 10;
const OVERFLOW_TOLERANCE_MULTIPLE_HEIGHT = 3;

export const CarouselDraggingMovements: Rule = {
  id: "carousel-dragging-movements",
  metadata: {
    category: "Carousels",
    profile: ["Motor Impaired"],
    wcagVersion: "2.2",
    wcagLevel: "AA",
  },
  impact: "serious",
  title: "Carousels that require dragging movements should provide alternative methods of operation with a single pointer",
  description: "Carousels that require dragging movements should provide alternative methods of operation with a single pointer for example prev and next buttons or pagination.",
  advice: "The nodes in the failed nodes indicate that this carousel may not be operable with a single pointer. If this is the case, ensure that the carousel can be operated using a single pointer. For example, provide “Previous” and “Next” buttons to navigate between slides, or pagination controls that allow direct access to specific slides.",
  refs: [
    {
      type: "WCAG",
      id: "2.5.7",
      level: "AA",
      link: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html",
    },
  ],
  associatedDetectors: [PerceivableComponentCarouselLibrary, PerceivableComponentCarouselSlidePickerLibrary, PerceivableComponentCarouselArrowPreviousLibrary, PerceivableComponentCarouselArrowNextLibrary, PerceivableComponentCarouselSlidersWrapperLibrary],
  passCondition: PassCondition.NoFailedNodes,
  async validate({ response, classifier }) {
    const carousels = classifier.getMatched([PerceivableComponentCarouselLibrary]);

    for (const carousel of carousels) {
      const slidersWrapper = classifier.getMatched([PerceivableComponentCarouselSlidersWrapperLibrary], carousel)[0];
      if (slidersWrapper) {
        const slidersWrapperWidth = classifier.getOperations(slidersWrapper).layoutInfo.scrollWidth;
        const carouselWidth = classifier.getOperations(carousel).layoutInfo.width;

        const slidersWrapperHeight = classifier.getOperations(slidersWrapper).layoutInfo.scrollHeight;
        const carouselHeight = classifier.getOperations(carousel).layoutInfo.height;

        // if the carousel is not overflowed (not draggable) in this screen size (resolution)
        if (slidersWrapperWidth <= carouselWidth + OVERFLOW_TOLERANCE_PX_WIDTH && slidersWrapperHeight <= carouselHeight * OVERFLOW_TOLERANCE_MULTIPLE_HEIGHT) {
          response.inapplicableNodes.push(carousel);
          continue;
        }
      }

      const carouselParent = carousel.parentElement || carousel;
      // We are not checking in this rule if clicking the prev/next buttons or slide pickers actually changes the slide, we only check that they are present and visible
      if (classifier.getMatched([PerceivableComponentCarouselSlidePickerLibrary], carouselParent).length > 0 || classifier.getMatched([PerceivableComponentCarouselArrowPreviousLibrary], carouselParent).length > 0 || classifier.getMatched([PerceivableComponentCarouselArrowNextLibrary], carouselParent).length > 0) {
        response.passedNodes.push(carousel);
      } else {
        response.failedNodes.push(carousel);
      }
    }
  },
};
