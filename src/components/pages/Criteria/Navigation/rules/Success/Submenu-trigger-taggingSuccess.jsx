/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-mismatch, menu-trigger-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Submenu Trigger Tagging - Success";

const SubmenutriggertaggingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-1"
          data-atomic-source="menu-trigger-mismatch/anchor-within-nav-with-aria-haspopup-with-aria-controls-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #sub-menu {
    display: none;
  }

  li #test-subject[aria-expanded="true"] + #sub-menu {
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="sub-menu">Menu</a>
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
          id="navigation-submenu-trigger-tagging-success-success-2"
          data-atomic-source="menu-trigger-mismatch/button-within-nav-with-aria-haspopup-with-aria-controls-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #sub-menu {
    display: none;
  }

  li #test-subject[aria-expanded="true"] + #sub-menu {
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <button id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="sub-menu">Menu</button>
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
          id="navigation-submenu-trigger-tagging-success-success-3"
          data-atomic-source="menu-trigger-mismatch/menu-trigger-with-aria-haspopup-and-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-video-fallback-src="" data-element="inner" data-pb-style="EM2MYR0">
  <div data-content-type="html" data-appearance="default" data-element="main" data-pb-style="PYTK9WD" data-decoded="true">
    <ul class="menuTop" id="topmenu">
      <li>
        <a href="/about-hoffmaster" id="about-hoffmaster" aria-haspopup="menu" aria-expanded="true">About</a>
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
          id="navigation-submenu-trigger-tagging-success-success-4"
          data-atomic-source="menu-trigger-mismatch/remediated-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-expanded="false" aria-controls="sub-menu" aria-haspopup="menu">Menu</button>
      <ul id="sub-menu">
        <li><a href="link://#">Home</a></li>
        <li><a href="link://#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-5"
          data-atomic-source="menu-trigger-mismatch/simple-nav-without-sub-menu"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul id="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-6"
          data-atomic-source="menu-trigger-misuse/bootstrap-dropdown-menu"
          dangerouslySetInnerHTML={{
            __html: `<div class="bd-example m-0 border-0">
  <div class="dropdown">
    <li>
      <button id="test-subject" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown button</button>
    </li>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-7"
          data-atomic-source="menu-trigger-misuse/content-index-open-links-menu"
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
      <a aria-haspopup="true" aria-expanded="true" id="test-subject" href="#directions" class="">Directions</a>
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
          id="navigation-submenu-trigger-tagging-success-success-8"
          data-atomic-source="menu-trigger-misuse/mui-react-menu"
          dangerouslySetInnerHTML={{
            __html: `<div role="menuitem">
  <button
    id="test-subject"
    class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-ytqdf0"
    tabindex="0"
    type="button"
    id="basic-button"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Dashboard
    <span class="MuiTouchRipple-root css-w0pj6f"></span>
  </button>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-9"
          data-atomic-source="menu-trigger-misuse/no-compliant-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<div class="bd-example m-0 border-0">
  <div class="dropdown">
    <li>
      <button id="test-subject" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown button</button>
    </li>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-10"
          data-atomic-source="menu-trigger-misuse/partner-co-il-link-in-packages"
          dangerouslySetInnerHTML={{
            __html: `<div _ngcontent-ng-c4126628557="" class="roaming-wrapper" style="--mobileBG: url(./media/ewzppiu5/roaming-bg-mob.jpg); --desktopBG: url(./media/jbrn1c4a/roaming-bg-desk.jpg); background-color: rgb(46, 213, 196)">
  <app-title _ngcontent-ng-c4126628557="" _nghost-ng-c3293789212="">
    <div _ngcontent-ng-c3293789212="" class="wraps-title ng-star-inserted">
      <span _ngcontent-ng-c3293789212="" style="color: rgb(255, 255, 255)">בוחרים חבילה בקליק</span>
      <h2 _ngcontent-ng-c3293789212="" style="color: rgb(255, 255, 255)">וטסים בראש שקט</h2>
    </div>
    <!---->
  </app-title>
  <div _ngcontent-ng-c4126628557="" class="packages-wrapper">
    <div _ngcontent-ng-c4126628557="" class="package ng-star-inserted">
      <div _ngcontent-ng-c4126628557="" class="top" style="background-color: rgb(255, 255, 255); --packBG: url(./media/tdxk210j/group-26086211.png)">
        <div _ngcontent-ng-c4126628557="" class="title">חופשה משפחתית</div>
        <div _ngcontent-ng-c4126628557="" class="price-and-size">
          <div _ngcontent-ng-c4126628557="" class="deleted-price ng-star-inserted">₪319</div>
          <!---->
          <div _ngcontent-ng-c4126628557="" class="shekel">&nbsp;₪</div>
          <div _ngcontent-ng-c4126628557="" class="price">299&nbsp;</div>
          <div _ngcontent-ng-c4126628557="" class="v-divider"></div>
          <div _ngcontent-ng-c4126628557="" class="size">&nbsp;50GB</div>
        </div>
        <div _ngcontent-ng-c4126628557="" class="flag">מחיר מיוחד לאתר</div>
      </div>
      <div _ngcontent-ng-c4126628557="" class="bottom">
        <div _ngcontent-ng-c4126628557="" class="bottom-wrapper">
          <div _ngcontent-ng-c4126628557="" class="details">
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/nktloipe/שיחות-svg.svg" alt="300 דקות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">300 דקות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/pbjmkec3/הודעות-svg.svg" alt="300 הודעות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">300 הודעות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/swxjrjvf/שעון-1.svg" alt="בתוקף ל-30 ימים" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">בתוקף ל-30 ימים</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/3ydbjwxb/איקון-2-7-לקוחות-1.svg" alt="ללקוחות בעלי 2-7 מנויים" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">ללקוחות בעלי 2-7 מנויים</div>
            </div>
            <!---->
          </div>
          <div _ngcontent-ng-c4126628557="" class="marketing-button-wrapper">
            <div _ngcontent-ng-c4126628557="" class="marketing">כל המשפחה בחבילה אחת!</div>
            <div _ngcontent-ng-c4126628557="" class="button-wrapper">
              <app-pass-button _ngcontent-ng-c4126628557="" _nghost-ng-c206148852=""><button _ngcontent-ng-c206148852="" class="brand-btn btn-style-2" style="margin: 0px; padding: 0px; width: 100%; color: rgb(0, 0, 0); background: rgb(46, 213, 196)">אני רוצה את החבילה</button></app-pass-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div _ngcontent-ng-c4126628557="" class="package ng-star-inserted">
      <div _ngcontent-ng-c4126628557="" class="top" style="background-color: rgb(252, 203, 4); --packBG: url(./media/tdxk210j/group-26086211.png)">
        <div _ngcontent-ng-c4126628557="" class="title">חו"ל מושלמת</div>
        <div _ngcontent-ng-c4126628557="" class="price-and-size">
          <div _ngcontent-ng-c4126628557="" class="deleted-price ng-star-inserted">₪289</div>
          <!---->
          <div _ngcontent-ng-c4126628557="" class="shekel">&nbsp;₪</div>
          <div _ngcontent-ng-c4126628557="" class="price">269&nbsp;</div>
          <div _ngcontent-ng-c4126628557="" class="v-divider"></div>
          <div _ngcontent-ng-c4126628557="" class="size">&nbsp;30GB</div>
        </div>
        <div _ngcontent-ng-c4126628557="" class="flag">מחיר מיוחד לאתר</div>
      </div>
      <div _ngcontent-ng-c4126628557="" class="bottom">
        <div _ngcontent-ng-c4126628557="" class="bottom-wrapper">
          <div _ngcontent-ng-c4126628557="" class="details">
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/nktloipe/שיחות-svg.svg" alt="300 דקות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">300 דקות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/pbjmkec3/הודעות-svg.svg" alt="300 הודעות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">300 הודעות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/swxjrjvf/שעון-1.svg" alt="בתוקף ל-30 ימים" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">בתוקף ל-30 ימים</div>
            </div>
            <!---->
          </div>
          <div _ngcontent-ng-c4126628557="" class="marketing-button-wrapper">
            <div _ngcontent-ng-c4126628557="" class="marketing">מבצע לבני המשפחה! חבילת 5GB גלישה ב-49 ש״ח בלבד</div>
            <div _ngcontent-ng-c4126628557="" class="button-wrapper">
              <app-pass-button _ngcontent-ng-c4126628557="" _nghost-ng-c206148852=""><button _ngcontent-ng-c206148852="" class="brand-btn btn-style-2" style="margin: 0px; padding: 0px; width: 100%; color: rgb(0, 0, 0); background: rgb(46, 213, 196)">אני רוצה את החבילה</button></app-pass-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div _ngcontent-ng-c4126628557="" class="package ng-star-inserted">
      <div _ngcontent-ng-c4126628557="" class="top" style="background-color: rgb(242, 112, 96); --packBG: url(./media/tdxk210j/group-26086211.png)">
        <div _ngcontent-ng-c4126628557="" class="title">חו"ל בסטייל</div>
        <div _ngcontent-ng-c4126628557="" class="price-and-size">
          <div _ngcontent-ng-c4126628557="" class="deleted-price ng-star-inserted">₪269</div>
          <!---->
          <div _ngcontent-ng-c4126628557="" class="shekel">&nbsp;₪</div>
          <div _ngcontent-ng-c4126628557="" class="price">249&nbsp;</div>
          <div _ngcontent-ng-c4126628557="" class="v-divider"></div>
          <div _ngcontent-ng-c4126628557="" class="size">&nbsp;15GB</div>
        </div>
        <div _ngcontent-ng-c4126628557="" class="flag">מחיר מיוחד לאתר</div>
      </div>
      <div _ngcontent-ng-c4126628557="" class="bottom">
        <div _ngcontent-ng-c4126628557="" class="bottom-wrapper">
          <div _ngcontent-ng-c4126628557="" class="details">
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/nktloipe/שיחות-svg.svg" alt="150 דקות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">150 דקות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/pbjmkec3/הודעות-svg.svg" alt="150 הודעות" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">150 הודעות</div>
            </div>
            <div _ngcontent-ng-c4126628557="" class="detail ng-star-inserted">
              <div _ngcontent-ng-c4126628557="" class="image-wrapper"><img _ngcontent-ng-c4126628557="" class="image" src="./media/swxjrjvf/שעון-1.svg" alt="בתוקף ל-14 יום" /></div>
              <div _ngcontent-ng-c4126628557="" class="text">בתוקף ל-14 יום</div>
            </div>
            <!---->
          </div>
          <div _ngcontent-ng-c4126628557="" class="marketing-button-wrapper">
            <div _ngcontent-ng-c4126628557="" class="marketing">מבצע לבני המשפחה! חבילת 5GB גלישה ב-49 ש״ח בלבד</div>
            <div _ngcontent-ng-c4126628557="" class="button-wrapper">
              <app-pass-button _ngcontent-ng-c4126628557="" _nghost-ng-c206148852=""><button _ngcontent-ng-c206148852="" class="brand-btn btn-style-2" style="margin: 0px; padding: 0px; width: 100%; color: rgb(0, 0, 0); background: rgb(46, 213, 196)">אני רוצה את החבילה</button></app-pass-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----><!---->
  </div>
  <div _ngcontent-ng-c4126628557="" class="main-button-wrapper">
    <app-pass-button _ngcontent-ng-c4126628557="" _nghost-ng-c206148852=""
      ><li><button aria-haspopup="menu" aria-expanded="true" id="test-subject" _ngcontent-ng-c206148852="" class="brand-btn btn-style-2" style="margin: 0px; padding: 0px; width: 100%; color: rgb(255, 255, 255); background: rgb(0, 0, 0)">לצפייה בחבילות נוספות</button></li></app-pass-button
    >
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-trigger-tagging-success-success-11"
          data-atomic-source="menu-trigger-misuse/search-dialog-trigger"
          dangerouslySetInnerHTML={{
            __html: `<li>
  <button aria-haspopup="menu" aria-expanded="false" id="test-subject" aria-labelledby="app-search-label" class="css-wapq0y">
    <svg class="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-e448n7" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
    </svg>
    <span id="app-search-label" class="css-babxg9">Search…</span>
    <kbd aria-hidden="true" class="css-pniafb">⌘K</kbd>
  </button>
</li>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmenutriggertaggingSuccess;
