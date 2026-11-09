/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-mismatch, menu-trigger-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Submenu Trigger Tagging - Failure";

const SubmenutriggertaggingFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-1"
          data-atomic-source="menu-trigger-mismatch/button-within-nav-with-aria-expanded-without-aria-haspopup-without-aria-controls"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-expanded="false">Menu</button>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-2"
          data-atomic-source="menu-trigger-mismatch/button-within-nav-with-aria-haspopup-with-aria-controls-without-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-haspopup="true" aria-controls="sub-menu">Menu</button>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-3"
          data-atomic-source="menu-trigger-mismatch/button-within-nav-without-aria-haspopup-with-aria-controls-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-expanded="false" aria-controls="sub-menu">Menu</button>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-4"
          data-atomic-source="menu-trigger-mismatch/menu-trigger-without-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-video-fallback-src="" data-element="inner" data-pb-style="EM2MYR0">
  <div data-content-type="html" data-appearance="default" data-element="main" data-pb-style="PYTK9WD" data-decoded="true">
    <ul class="menuTop" id="topmenu">
      <li>
        <a href="/about-hoffmaster" id="about-hoffmaster">About</a>
        <ul id="topmenudropdown">
          <li><a href="/history">History</a></li>
          <li><a href="/social-responsibility">Social Responsibility</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/terms-conditions">Terms and Conditions</a></li>
        </ul>
      </li>
      <li><a href="https://us231.dayforcehcm.com/CandidatePortal/en-US/hoffmaster" target=" _blank">Employment</a></li>
      <li><a href="/customer-care">Customer Care</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-5"
          data-atomic-source="menu-trigger-mismatch/menu-trigger-without-aria-haspopup-and-without-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-video-fallback-src="" data-element="inner" data-pb-style="EM2MYR0">
  <div data-content-type="html" data-appearance="default" data-element="main" data-pb-style="PYTK9WD" data-decoded="true">
    <ul class="menuTop" id="topmenu">
      <li>
        <a href="/about-hoffmaster" id="about-hoffmaster" aria-haspopup="menu">About</a>
        <ul id="topmenudropdown">
          <li><a href="/history">History</a></li>
          <li><a href="/social-responsibility">Social Responsibility</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/terms-conditions">Terms and Conditions</a></li>
        </ul>
      </li>
      <li><a href="https://us231.dayforcehcm.com/CandidatePortal/en-US/hoffmaster" target=" _blank">Employment</a></li>
      <li><a href="/customer-care">Customer Care</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-6"
          data-atomic-source="menu-trigger-mismatch/menu-trigger-without-aria-haspopup"
          dangerouslySetInnerHTML={{
            __html: `<div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-video-fallback-src="" data-element="inner" data-pb-style="EM2MYR0">
  <div data-content-type="html" data-appearance="default" data-element="main" data-pb-style="PYTK9WD" data-decoded="true">
    <ul class="menuTop" id="topmenu">
      <li>
        <a href="/about-hoffmaster" id="about-hoffmaster" aria-expanded="true">About</a>
        <ul id="topmenudropdown">
          <li><a href="/history">History</a></li>
          <li><a href="/social-responsibility">Social Responsibility</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/terms-conditions">Terms and Conditions</a></li>
        </ul>
      </li>
      <li><a href="https://us231.dayforcehcm.com/CandidatePortal/en-US/hoffmaster" target=" _blank">Employment</a></li>
      <li><a href="/customer-care">Customer Care</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-7"
          data-atomic-source="menu-trigger-mismatch/perceivable-menu-triggger-not-compliant"
          dangerouslySetInnerHTML={{
            __html: `<nav id="TableOfContents">
  <ul>
    <li><a href="#overview" class="">Overview</a></li>
    <li><a href="#accessibility" class="">Accessibility</a></li>
    <li>
      <a href="#examples" class="">Examples</a>
      <ul>
        <li><a href="#single-button" class="">Single button</a></li>
        <li><a href="#split-button" class="">Split button</a></li>
      </ul>
    </li>
    <li><a href="#sizing" class="">Sizing</a></li>
    <li><a href="#dark-dropdowns" class="">Dark dropdowns</a></li>
    <li>
      <a aria-expanded="true" id="test-subject" href="#directions" class="">Directions</a>
      <ul>
        <li><a href="#centered" class="">Centered</a></li>
        <li><a href="#dropup" class="">Dropup</a></li>
        <li><a href="#dropup-centered" class="">Dropup centered</a></li>
        <li><a href="#dropend" class="">Dropend</a></li>
        <li><a href="#dropstart" class="">Dropstart</a></li>
      </ul>
    </li>
    <li>
      <a href="#menu-items">Menu items</a>
      <ul>
        <li><a href="#active">Active</a></li>
        <li><a href="#disabled">Disabled</a></li>
      </ul>
    </li>
    <li>
      <a href="#menu-alignment">Menu alignment</a>
      <ul>
        <li><a href="#responsive-alignment">Responsive alignment</a></li>
        <li><a href="#alignment-options">Alignment options</a></li>
      </ul>
    </li>
    <li>
      <a href="#menu-content">Menu content</a>
      <ul>
        <li><a href="#headers">Headers</a></li>
        <li><a href="#dividers">Dividers</a></li>
        <li><a href="#text">Text</a></li>
        <li><a href="#forms">Forms</a></li>
      </ul>
    </li>
    <li>
      <a href="#dropdown-options">Dropdown options</a>
      <ul>
        <li><a href="#auto-close-behavior">Auto close behavior</a></li>
      </ul>
    </li>
    <li>
      <a href="#css">CSS</a>
      <ul>
        <li><a href="#variables">Variables</a></li>
        <li><a href="#sass-variables">Sass variables</a></li>
        <li><a href="#sass-mixins">Sass mixins</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#via-data-attributes">Via data attributes</a></li>
        <li><a href="#via-javascript">Via JavaScript</a></li>
        <li>
          <a href="#options">Options</a>
          <ul>
            <li>
              <a href="#using-function-with-popperconfig">Using function with <code>popperConfig</code></a>
            </li>
          </ul>
        </li>
        <li><a href="#methods">Methods</a></li>
        <li><a href="#events">Events</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-8"
          data-atomic-source="menu-trigger-misuse/koffeekult-not-menu-trigger-li-aria-expanded-false"
          dangerouslySetInnerHTML={{
            __html: `<li id="test-subject" class="site-nav__item site-nav__expanded-item site-nav--has-dropdown site-nav--is-megamenu" aria-haspopup="true" aria-expanded="false">
  <a href="/collections/coffee" class="site-nav__link site-nav__link--underline site-nav__link--has-dropdown"> Coffee </a>
  <div class="site-nav__dropdown megamenu text-left">
    <div class="page-width">
      <div class="grid">
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-1">
          <a href="/collections/coffee/%23" class="megamenu__colection-image" aria-label="Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/roast-type_400x.jpg?v=1740497449)"></a>
          <div class="h5">
            <a href="/collections/coffee/%23" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Filter Coffee</a>
          </div>
          <div>
            <a href="/collections/single-origin-coffee-subscription" class="site-nav__dropdown-link"> Single Origin </a>
          </div>
          <div>
            <a href="/collections/blends-espresso-subscribe-and-save" class="site-nav__dropdown-link"> Blends </a>
          </div>
          <div>
            <a href="/collections/decaf" class="site-nav__dropdown-link"> Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-2">
          <a href="/collections/espresso" class="megamenu__colection-image" aria-label="Espresso Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/espresso-machine_06404c44-cb92-4852-a4f8-f5e22d042685_400x.jpg?v=1740152999)"></a>
          <div class="h5">
            <a href="/collections/espresso" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Espresso</a>
          </div>
          <div>
            <a href="/collections/espresso/single-origin" class="site-nav__dropdown-link"> Espresso Single Origin </a>
          </div>
          <div>
            <a href="/collections/espresso/blend" class="site-nav__dropdown-link"> Espresso Blends </a>
          </div>
          <div>
            <a href="/collections/espresso/decaf" class="site-nav__dropdown-link"> Espresso Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-3">
          <a href="/collections/coffee/%23" class="megamenu__colection-image" aria-label="Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/roast-type_400x.jpg?v=1740497449)"></a>
          <div class="h5">
            <a href="/collections/coffee/%23" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Roast</a>
          </div>
          <div>
            <a href="/collections/dark-roast-coffee" class="site-nav__dropdown-link"> Dark Roast </a>
          </div>
          <div>
            <a href="/collections/medium-roast-coffee" class="site-nav__dropdown-link"> Medium Roast </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-4">
          <a href="/collections/single-serve/Single-Serve-Cups+Single-Serve-Pods" class="megamenu__colection-image" aria-label="Koffee Kult Single Serve Cups and Pods" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/single-serve-brewer_400x.jpg?v=1739546024)"></a>
          <div class="h5">
            <a href="/collections/single-serve/Single-Serve-Cups+Single-Serve-Pods" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Single Serve Cups</a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-dark-roast-coffee-in-single-serve" class="site-nav__dropdown-link"> Dark Roast </a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-medium-roast-coffee-in-single-serve-cups" class="site-nav__dropdown-link"> Medium Roast </a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-colombia-decaf-coffee-in-single-serve-cups" class="site-nav__dropdown-link"> Colombia Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-5">
          <a href="/collections/bundles" class="megamenu__colection-image" aria-label="Bundles" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/Coffee-Bundles-Feature_400x.png?v=1742924947)"></a>
          <div class="h5">
            <a href="/collections/bundles" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Bundles</a>
          </div>
          <div>
            <a href="/products/6-x-12oz-coffee-bundle" class="site-nav__dropdown-link"> 6 x 12oz coffee bundle </a>
          </div>
          <div>
            <a href="/products/6-x-32oz-coffee-bundle" class="site-nav__dropdown-link"> 6 x 32oz coffee bundle </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-9"
          data-atomic-source="menu-trigger-misuse/koffeekult-not-menu-trigger-li-aria-expanded-true"
          dangerouslySetInnerHTML={{
            __html: `<li id="test-subject" class="site-nav__item site-nav__expanded-item site-nav--has-dropdown site-nav--is-megamenu" aria-haspopup="true" aria-expanded="true">
  <a href="/collections/coffee" class="site-nav__link site-nav__link--underline site-nav__link--has-dropdown"> Coffee </a>
  <div class="site-nav__dropdown megamenu text-left">
    <div class="page-width">
      <div class="grid">
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-1">
          <a href="/collections/coffee/%23" class="megamenu__colection-image" aria-label="Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/roast-type_400x.jpg?v=1740497449)"></a>
          <div class="h5">
            <a href="/collections/coffee/%23" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Filter Coffee</a>
          </div>
          <div>
            <a href="/collections/single-origin-coffee-subscription" class="site-nav__dropdown-link"> Single Origin </a>
          </div>
          <div>
            <a href="/collections/blends-espresso-subscribe-and-save" class="site-nav__dropdown-link"> Blends </a>
          </div>
          <div>
            <a href="/collections/decaf" class="site-nav__dropdown-link"> Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-2">
          <a href="/collections/espresso" class="megamenu__colection-image" aria-label="Espresso Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/espresso-machine_06404c44-cb92-4852-a4f8-f5e22d042685_400x.jpg?v=1740152999)"></a>
          <div class="h5">
            <a href="/collections/espresso" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Espresso</a>
          </div>
          <div>
            <a href="/collections/espresso/single-origin" class="site-nav__dropdown-link"> Espresso Single Origin </a>
          </div>
          <div>
            <a href="/collections/espresso/blend" class="site-nav__dropdown-link"> Espresso Blends </a>
          </div>
          <div>
            <a href="/collections/espresso/decaf" class="site-nav__dropdown-link"> Espresso Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-3">
          <a href="/collections/coffee/%23" class="megamenu__colection-image" aria-label="Coffee" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/roast-type_400x.jpg?v=1740497449)"></a>
          <div class="h5">
            <a href="/collections/coffee/%23" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Roast</a>
          </div>
          <div>
            <a href="/collections/dark-roast-coffee" class="site-nav__dropdown-link"> Dark Roast </a>
          </div>
          <div>
            <a href="/collections/medium-roast-coffee" class="site-nav__dropdown-link"> Medium Roast </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-4">
          <a href="/collections/single-serve/Single-Serve-Cups+Single-Serve-Pods" class="megamenu__colection-image" aria-label="Koffee Kult Single Serve Cups and Pods" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/single-serve-brewer_400x.jpg?v=1739546024)"></a>
          <div class="h5">
            <a href="/collections/single-serve/Single-Serve-Cups+Single-Serve-Pods" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Single Serve Cups</a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-dark-roast-coffee-in-single-serve" class="site-nav__dropdown-link"> Dark Roast </a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-medium-roast-coffee-in-single-serve-cups" class="site-nav__dropdown-link"> Medium Roast </a>
          </div>
          <div>
            <a href="/products/original-koffee-kult-colombia-decaf-coffee-in-single-serve-cups" class="site-nav__dropdown-link"> Colombia Decaf </a>
          </div>
        </div>
        <div class="grid__item medium-up--one-fifth appear-animation appear-delay-5">
          <a href="/collections/bundles" class="megamenu__colection-image" aria-label="Bundles" style="background-image: url(//www.koffeekult.com/cdn/shop/collections/Coffee-Bundles-Feature_400x.png?v=1742924947)"></a>
          <div class="h5">
            <a href="/collections/bundles" class="site-nav__dropdown-link site-nav__dropdown-link--top-level">Bundles</a>
          </div>
          <div>
            <a href="/products/6-x-12oz-coffee-bundle" class="site-nav__dropdown-link"> 6 x 12oz coffee bundle </a>
          </div>
          <div>
            <a href="/products/6-x-32oz-coffee-bundle" class="site-nav__dropdown-link"> 6 x 32oz coffee bundle </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</li>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-failure-failure-10"
          data-atomic-source="menu-trigger-misuse/link-in-nav"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main"></nav>
<ul>
  <li><a href="/home">Home</a></li>
  <li><a href="/shop">Shop</a></li>
  <li class="has-submenu">
    <a href="#" aria-expanded="false"> Space Bears </a>
    <ul>
      <li><a aria-haspopup="true" aria-expanded="false" id="test-subject" href="/space-bear-6">Space Bear 6</a></li>
      <li><a href="/space-bear-6-plus">Space Bear 6 Plus</a></li>
    </ul>
  </li>
  <li><a href="/mars-cars">Mars Cars</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmenutriggertaggingFailure;
