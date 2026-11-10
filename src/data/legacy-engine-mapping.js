// Mapping between legacy AccessFlow rules and their related engine rules.
// Shape:
// {
//   [legacyShortCode]: [
//     {
//       id: string;    // engine kebabId (URL slug)
//       label: string;
//       path: string;  // /engine/<kebabId>
//     }
//   ]
// }
//
// Merged in arch #2b from local mapping ∪ AccessFlow engineRules,
// with retired ids and id≠kebabId aliases resolved.

const legacyEngineMapping = {
  activeTab: [
    {
      id: "tab-mismatch",
      label: "TabMismatch (Engine rule)",
      path: "/engine/tab-mismatch",
    },
    {
      id: "tab-misuse",
      label: "TabMisuse (Engine rule)",
      path: "/engine/tab-misuse",
    },
  ],

  altText: [
    {
      id: "image-discernible",
      label: "ImageDiscernible (Engine rule)",
      path: "/engine/image-discernible",
    },
    {
      id: "image-discernible-correctly",
      label: "ImageDiscernibleCorrectly (Engine rule)",
      path: "/engine/image-discernible-correctly",
    },
    {
      id: "alt-misuse",
      label: "AltMisuse (Engine rule)",
      path: "/engine/alt-misuse",
    },
  ],

  ambiguousLinks: [
    {
      id: "link-anchor-ambiguous",
      label: "LinkAnchorAmbiguous (Engine rule)",
      path: "/engine/link-anchor-ambiguous",
    },
    {
      id: "link-navigation-ambiguous",
      label: "LinkNavigationAmbiguous (Engine rule)",
      path: "/engine/link-navigation-ambiguous",
    },
  ],

  ariaLabelMisuse: [
    {
      id: "name-prohibited-no-aria-label",
      label: "NameProhibitedNoAriaLabel (Engine rule)",
      path: "/engine/name-prohibited-no-aria-label",
    },
  ],

  articleSetup: [
    {
      id: "article-misuse",
      label: "ArticleMisuse (Engine rule)",
      path: "/engine/article-misuse",
    },
  ],

  backgroundImages: [
    {
      id: "background-image-discernible",
      label: "BackgroundImageDiscernible (Engine rule)",
      path: "/engine/background-image-discernible",
    },
    {
      id: "background-image-discernible-image",
      label: "BackgroundImageDiscernibleImage (Engine rule)",
      path: "/engine/background-image-discernible-image",
    },
  ],

  breadcrumbs: [
    {
      id: "breadcrumbs-mismatch",
      label: "BreadcrumbsMismatch (Engine rule)",
      path: "/engine/breadcrumbs-mismatch",
    },
    {
      id: "breadcrumbs-nav",
      label: "BreadcrumbsNav (Engine rule)",
      path: "/engine/breadcrumbs-nav",
    },
  ],

  brokenAriaLabels: [
    {
      id: "visible-text-part-of-accessible-name",
      label: "VisibleTextPartOfAccessibleName (Engine rule)",
      path: "/engine/visible-text-part-of-accessible-name",
    },
  ],

  brokenAriaReference: [
    {
      id: "aria-labelledby-has-reference",
      label: "AriaLabelledByHasReference (Engine rule)",
      path: "/engine/aria-labelledby-has-reference",
    },
    {
      id: "aria-describedby-has-reference",
      label: "AriaDescribedByHasReference (Engine rule)",
      path: "/engine/aria-describedby-has-reference",
    },
  ],

  brokenList: [
    {
      id: "list-item-misuse",
      label: "ListItemMisuse (Engine rule)",
      path: "/engine/list-item-misuse",
    },
  ],

  brokenNavItems: [
    {
      id: "menu-item-avoid",
      label: "MenuItemAvoid (Engine rule)",
      path: "/engine/menu-item-avoid",
    },
  ],

  brokenNavTagging: [
    {
      id: "menu-avoid",
      label: "MenuAvoid (Engine rule)",
      path: "/engine/menu-avoid",
    },
    {
      id: "menu-bar-avoid",
      label: "MenuBarAvoid (Engine rule)",
      path: "/engine/menu-bar-avoid",
    },
  ],

  brokenSubmenuIndication: [
    {
      id: "menu-trigger-clickable",
      label: "MenuTriggerClickable (Engine rule)",
      path: "/engine/menu-trigger-clickable",
    },
  ],

  brokenTabindex: [
    {
      id: "tabindex-valid",
      label: "TabindexValid (Engine rule)",
      path: "/engine/tabindex-valid",
    },
  ],

  buttonRoles: [
    {
      id: "button-mismatch",
      label: "ButtonMismatch (Engine rule)",
      path: "/engine/button-mismatch",
    },
    {
      id: "toggle-button-mismatch",
      label: "ToggleButtonMismatch (Engine rule)",
      path: "/engine/toggle-button-mismatch",
    },
  ],

  captcha: [
    {
      id: "captcha-accessible-provider-2.0",
      label: "CaptchaAccessibleProviderV2.0 (Engine rule)",
      path: "/engine/captcha-accessible-provider-2.0",
    },
    {
      id: "captcha-accessible-provider-2.2",
      label: "CaptchaAccessibleProviderV2.2 (Engine rule)",
      path: "/engine/captcha-accessible-provider-2.2",
    },
  ],

  carouselArrows: [
    {
      id: "carousel-next-slide-discernible",
      label: "CarouselNextSlideDiscernible (Engine rule)",
      path: "/engine/carousel-next-slide-discernible",
    },
    {
      id: "carousel-next-slide-discernible-correctly",
      label: "CarouselNextSlideDiscernibleCorrectly (Engine rule)",
      path: "/engine/carousel-next-slide-discernible-correctly",
    },
    {
      id: "carousel-previous-slide-discernible",
      label: "CarouselPreviousSlideDiscernible (Engine rule)",
      path: "/engine/carousel-previous-slide-discernible",
    },
    {
      id: "carousel-previous-slide-discernible-correctly",
      label: "CarouselPreviousSlideDiscernibleCorrectly (Engine rule)",
      path: "/engine/carousel-previous-slide-discernible-correctly",
    },
  ],

  carouselLabeling: [
    {
      id: "carousel-mismatch",
      label: "CarouselMismatch (Engine rule)",
      path: "/engine/carousel-mismatch",
    },
    {
      id: "carousel-discernible",
      label: "CarouselDiscernible (Engine rule)",
      path: "/engine/carousel-discernible",
    },
    {
      id: "carousel-redundant-discernible-text",
      label: "CarouselRedundantDiscernibleText (Engine rule)",
      path: "/engine/carousel-redundant-discernible-text",
    },
  ],

  carouselPagination: [
    {
      id: "carousel-slide-picker-discernible",
      label: "CarouselSlidePickerDiscernible (Engine rule)",
      path: "/engine/carousel-slide-picker-discernible",
    },
  ],

  colorContrast: [
    {
      id: "color-contrast",
      label: "ColorContrast (Engine rule)",
      path: "/engine/color-contrast",
    },
  ],

  columnTableHeaders: [
    {
      id: "table-column-header",
      label: "TableColumnHeader (Engine rule)",
      path: "/engine/table-column-header",
    },
  ],

  customControlField: [
    {
      id: "checkbox-discernible",
      label: "CheckboxDiscernible (Engine rule)",
      path: "/engine/checkbox-discernible",
    },
    {
      id: "checkbox-aria-checked",
      label: "CheckboxAriaChecked (Engine rule)",
      path: "/engine/checkbox-aria-checked",
    },
    {
      id: "checkbox-mismatch",
      label: "CheckboxMismatch (Engine rule)",
      path: "/engine/checkbox-mismatch",
    },
    {
      id: "radio-discernible",
      label: "RadioDiscernible (Engine rule)",
      path: "/engine/radio-discernible",
    },
    {
      id: "radio-aria-checked",
      label: "RadioAriaChecked (Engine rule)",
      path: "/engine/radio-aria-checked",
    },
    {
      id: "radio-mismatch",
      label: "RadioMismatch (Engine rule)",
      path: "/engine/radio-mismatch",
    },
  ],

  customSelectField: [
    {
      id: "custom-select-trigger-combobox",
      label: "CustomSelectTriggerCombobox (Engine rule)",
      path: "/engine/custom-select-trigger-combobox",
    },
    {
      id: "custom-select-options-list-listbox",
      label: "CustomSelectOptionsListListbox (Engine rule)",
      path: "/engine/custom-select-options-list-listbox",
    },
    {
      id: "select-option-mismatch",
      label: "SelectOptionMismatch (Engine rule)",
      path: "/engine/select-option-mismatch",
    },
  ],

  decorativeContent: [
    {
      id: "icon-discernible",
      label: "IconDiscernible (Engine rule)",
      path: "/engine/icon-discernible",
    },
  ],

  duplicateIds: [
    {
      id: "duplicate-id",
      label: "DuplicateId (Engine rule)",
      path: "/engine/duplicate-id",
    },
  ],

  emptyHeadings: [
    {
      id: "heading-discernible",
      label: "HeadingDiscernible (Engine rule)",
      path: "/engine/heading-discernible",
    },
  ],

  emptyLinks: [
    {
      id: "link-anchor-discernible",
      label: "LinkAnchorDiscernible (Engine rule)",
      path: "/engine/link-anchor-discernible",
    },
    {
      id: "link-navigation-discernible",
      label: "LinkNavigationDiscernible (Engine rule)",
      path: "/engine/link-navigation-discernible",
    },
  ],

  emptyList: [
    {
      id: "list-not-empty",
      label: "ListNotEmpty (Engine rule)",
      path: "/engine/list-not-empty",
    },
  ],

  fakeHiddenContent: [
    {
      id: "visibility-misuse",
      label: "VisibilityMisuse (Engine rule)",
      path: "/engine/visibility-misuse",
    },
  ],

  fakeHiddenInteractive: [
    {
      id: "tabbable-exposed",
      label: "TabbableExposed (Engine rule)",
      path: "/engine/tabbable-exposed",
    },
  ],

  fieldLabel: [
    {
      id: "input-discernible",
      label: "InputDiscernible (Engine rule)",
      path: "/engine/input-discernible",
    },
  ],

  fieldRequired: [
    {
      id: "required-form-field-aria-required",
      label: "RequiredFormFieldAriaRequired (Engine rule)",
      path: "/engine/required-form-field-aria-required",
    },
  ],

  fieldValidations: [
    {
      id: "aria-invalid-mismatch",
      label: "AriaInvalidMismatch (Engine rule)",
      path: "/engine/aria-invalid-mismatch",
    },
    {
      id: "aria-invalid-misuse",
      label: "AriaInvalidMisuse (Engine rule)",
      path: "/engine/aria-invalid-misuse",
    },
  ],

  figureSetup: [
    {
      id: "figure-discernible",
      label: "FigureDiscernible (Engine rule)",
      path: "/engine/figure-discernible",
    },
  ],

  fontSizes: [
    {
      id: "font-sizes",
      label: "FontSizes (Engine rule)",
      path: "/engine/font-sizes",
    },
  ],

  footerLandmark: [
    {
      id: "region-footer",
      label: "RegionFooter (Engine rule)",
      path: "/engine/region-footer",
    },
  ],

  formDuplicateIDs: [
    {
      id: "form-duplicate-id",
      label: "FormDuplicateId (Engine rule)",
      path: "/engine/form-duplicate-id",
    },
  ],

  formSubmissionsStatus: [
    {
      id: "form-context-change-warning",
      label: "FormContextChangeWarning (Engine rule)",
      path: "/engine/form-context-change-warning",
    },
  ],

  headlessTables: [
    {
      id: "table-headers",
      label: "TableHeaders (Engine rule)",
      path: "/engine/table-headers",
    },
  ],

  hiddenVisibleContent: [
    {
      id: "visibility-mismatch",
      label: "VisibilityMismatch (Engine rule)",
      path: "/engine/visibility-mismatch",
    },
  ],

  iframeLabeling: [
    {
      id: "iframe-discernible",
      label: "IframeDiscernible (Engine rule)",
      path: "/engine/iframe-discernible",
    },
  ],

  incorrectMainLandmark: [
    {
      id: "region-main-content-misuse",
      label: "RegionMainContentMisuse (Engine rule)",
      path: "/engine/region-main-content-misuse",
    },
  ],

  keyboardNavigation: [
    {
      id: "tabbable-mismatch",
      label: "TabbableMismatch (Engine rule)",
      path: "/engine/tabbable-mismatch",
    },
  ],

  languageReport: [
    {
      id: "html-lang-valid",
      label: "HtmlLangValid (Engine rule)",
      path: "/engine/html-lang-valid",
    },
    {
      id: "html-lang",
      label: "HtmlLang (Engine rule)",
      path: "/engine/html-lang",
    },
  ],

  letterSpacing: [
    {
      id: "letter-spacing-positive",
      label: "LetterSpacingPositive (Engine rule)",
      path: "/engine/letter-spacing-positive",
    },
  ],

  linkContext: [
    {
      id: "link-context",
      label: "LinkContext (Engine rule)",
      path: "/engine/link-context",
    },
  ],

  liveCarousels: [
    {
      id: "carousel-aria-live",
      label: "CarouselAriaLive (Engine rule)",
      path: "/engine/carousel-aria-live",
    },
  ],

  loadAutofocus: [
    {
      id: "no-autofocus",
      label: "NoAutofocus (Engine rule)",
      path: "/engine/no-autofocus",
    },
  ],

  longHeadings: [
    {
      id: "heading-lengthy",
      label: "HeadingLengthy (Engine rule)",
      path: "/engine/heading-lengthy",
    },
  ],

  mainHeading: [
    {
      id: "heading-h1",
      label: "HeadingH1 (Engine rule)",
      path: "/engine/heading-h1",
    },
  ],

  mainLandmark: [
    {
      id: "region-main-content",
      label: "RegionMainContent (Engine rule)",
      path: "/engine/region-main-content",
    },
  ],

  marquee: [
    {
      id: "marquee-deprecated",
      label: "MarqueeDeprecated (Engine rule)",
      path: "/engine/marquee-deprecated",
    },
  ],

  missingFormButton: [
    {
      id: "form-submit-button-mismatch",
      label: "FormSubmitButtonMismatch (Engine rule)",
      path: "/engine/form-submit-button-mismatch",
    },
  ],

  missingNavItems: [
    {
      id: "navigation-item-link",
      label: "NavigationItemLink (Engine rule)",
      path: "/engine/navigation-item-link",
    },
  ],

  misusedNavTagging: [
    {
      id: "navigation-misuse",
      label: "NavigationMisuse (Engine rule)",
      path: "/engine/navigation-misuse",
    },
  ],

  multiMainLandmarks: [
    {
      id: "region-main-content-single",
      label: "RegionMainContentSingle (Engine rule)",
      path: "/engine/region-main-content-single",
    },
  ],

  multipleMainHeadings: [
    {
      id: "heading-single-h1",
      label: "HeadingSingleH1 (Engine rule)",
      path: "/engine/heading-single-h1",
    },
  ],

  navigationTagging: [
    {
      id: "navigation-mismatch",
      label: "NavigationMismatch (Engine rule)",
      path: "/engine/navigation-mismatch",
    },
    {
      id: "navigation-discernible",
      label: "NavigationDiscernible (Engine rule)",
      path: "/engine/navigation-discernible",
    },
  ],

  nestedNavigation: [
    {
      id: "navigation-not-nested",
      label: "NavigationNotNested (Engine rule)",
      path: "/engine/navigation-not-nested",
    },
  ],

  nestedTables: [
    {
      id: "table-not-nested",
      label: "TableNotNested (Engine rule)",
      path: "/engine/table-not-nested",
    },
  ],

  newWindowLinks: [
    {
      id: "link-new-window-warning",
      label: "LinkNewWindowWarning (Engine rule)",
      path: "/engine/link-new-window-warning",
    },
  ],

  noninteractiveTabindex: [
    {
      id: "tabbable-misuse",
      label: "TabbableMisuse (Engine rule)",
      path: "/engine/tabbable-misuse",
    },
  ],

  noticeableFocus: [
    {
      id: "focus-noticeable",
      label: "FocusNoticeable (Engine rule)",
      path: "/engine/focus-noticeable",
    },
  ],

  pageTitle: [
    {
      id: "page-title",
      label: "PageTitle (Engine rule)",
      path: "/engine/page-title",
    },
    {
      id: "page-title-valid",
      label: "PageTitleValid (Engine rule)",
      path: "/engine/page-title-valid",
    },
  ],

  popupFocus: [
    {
      id: "dialog-modal-focus",
      label: "DialogModalFocus (Engine rule)",
      path: "/engine/dialog-modal-focus",
    },
  ],

  popupTagging: [
    {
      id: "dialog-modal-mismatch",
      label: "DialogModalMismatch (Engine rule)",
      path: "/engine/dialog-modal-mismatch",
    },
  ],

  redundantAriaLabels: [
    {
      id: "redundant-discernible-content",
      label: "RedundantDiscernibleContent (Engine rule)",
      path: "/engine/redundant-discernible-content",
    },
  ],

  roleApplications: [
    {
      id: "no-role-application",
      label: "NoRoleApplication (Engine rule)",
      path: "/engine/no-role-application",
    },
  ],

  rowTableHeaders: [
    {
      id: "table-row-header",
      label: "TableRowHeader (Engine rule)",
      path: "/engine/table-row-header",
    },
  ],

  salePrices: [
    {
      id: "sale-price-discernible",
      label: "SalePriceDiscernible (Engine rule)",
      path: "/engine/sale-price-discernible",
    },
  ],

  searchFormTagging: [
    {
      id: "search-form-mismatch",
      label: "SearchFormMismatch (Engine rule)",
      path: "/engine/search-form-mismatch",
    },
  ],

  skipLinks: [
    {
      id: "skip-link-exists",
      label: "SkipLinkExists (Engine rule)",
      path: "/engine/skip-link-exists",
    },
  ],

  submenuState: [
    {
      id: "menu-trigger-correct-state",
      label: "MenuTriggerCorrectState (Engine rule)",
      path: "/engine/menu-trigger-correct-state",
    },
  ],

  submenuTagging: [
    {
      id: "menu-trigger-mismatch",
      label: "MenuTriggerMismatch (Engine rule)",
      path: "/engine/menu-trigger-mismatch",
    },
  ],

  submenuTriggerTagging: [
    {
      id: "menu-trigger-mismatch",
      label: "MenuTriggerMismatch (Engine rule)",
      path: "/engine/menu-trigger-mismatch",
    },
    {
      id: "menu-trigger-misuse",
      label: "MenuTriggerMisuse (Engine rule)",
      path: "/engine/menu-trigger-misuse",
    },
  ],

  svgContent: [
    {
      id: "svg-discernible",
      label: "SvgDiscernible (Engine rule)",
      path: "/engine/svg-discernible",
    },
  ],

  tabPanelTagging: [
    {
      id: "tab-panel-mismatch",
      label: "TabPanelMismatch (Engine rule)",
      path: "/engine/tab-panel-mismatch",
    },
    {
      id: "tab-panel-misuse",
      label: "TabPanelMisuse (Engine rule)",
      path: "/engine/tab-panel-misuse",
    },
  ],

  tableLayouts: [
    {
      id: "table-misuse",
      label: "TableMisuse (Engine rule)",
      path: "/engine/table-misuse",
    },
  ],

  tabsTagging: [
    {
      id: "tab-list-mismatch",
      label: "TabListMismatch (Engine rule)",
      path: "/engine/tab-list-mismatch",
    },
    {
      id: "tab-list-misuse",
      label: "TabListMisuse (Engine rule)",
      path: "/engine/tab-list-misuse",
    },
  ],

  titleMisuse: [
    {
      id: "no-extra-information-in-title",
      label: "NoExtraInformationInTitle (Engine rule)",
      path: "/engine/no-extra-information-in-title",
    },
  ],

  untaggedHeadings: [
    {
      id: "heading-mismatch",
      label: "HeadingMismatch (Engine rule)",
      path: "/engine/heading-mismatch",
    },
  ],

  userRating: [
    {
      id: "user-rating-discernible",
      label: "UserRatingDiscernible (Engine rule)",
      path: "/engine/user-rating-discernible",
    },
  ],

  viewportScalability: [
    {
      id: "page-meta-viewport-valid",
      label: "PageMetaViewportValid (Engine rule)",
      path: "/engine/page-meta-viewport-valid",
    },
    {
      id: "page-meta-viewport",
      label: "PageMetaViewport (Engine rule)",
      path: "/engine/page-meta-viewport",
    },
  ],

};

export default legacyEngineMapping;
