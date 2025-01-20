import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation : menu-trigger-clickable - Failure";

export default () => {
  return (
    <IssueFailure
      itemContent={
        <>
          {/* Failure 1 */}
          <nav className="list-item" id="menu-trigger-failure-1">
            <li>
              <div
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu1"
              >
                Options
              </div>
              <ul id="submenu1" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: A <b>div</b> is used as a menu trigger, which is non-interactive by default and lacks keyboard focusability.</p>
            </li>
          </nav>

          {/* Failure 2 */}
          <nav className="list-item" id="menu-trigger-failure-2">
            <li>
              <span
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu2"
              >
                Options
              </span>
              <ul id="submenu2" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: A <b>span</b> is used as a menu trigger, which is non-interactive and not appropriate for accessibility.</p>
            </li>
          </nav>

          {/* Failure 3 */}
          <nav className="list-item" id="menu-trigger-failure-3">
            <li>
              <img
                src="menu-icon.png"
                alt="Options"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu3"
              />
              <ul id="submenu3" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: An <b>img</b> is used as a menu trigger, which is not inherently interactive or keyboard-accessible.</p>
            </li>
          </nav>

          {/* Failure 4 */}
          <nav className="list-item" id="menu-trigger-failure-4">
            <li>
              <p
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu4"
              >
                Options
              </p>
              <ul id="submenu4" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: A <b>p</b> element is used as a menu trigger, which is semantically incorrect and not focusable.</p>
            </li>
          </nav>

          {/* Failure 5 */}
          <nav className="list-item" id="menu-trigger-failure-5">
            <li>
              <section
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu5"
              >
                Options
              </section>
              <ul id="submenu5" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: A <b>section</b> is used as a menu trigger, which is inappropriate for this purpose.</p>
            </li>
          </nav>

          {/* Failure 6 */}
          <nav className="list-item" id="menu-trigger-failure-6">
            <li>
              <article
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls="submenu6"
              >
                Options
              </article>
              <ul id="submenu6" role="menu">
                <li role="menuitem"><a href="#">Option A</a></li>
                <li role="menuitem"><a href="#">Option B</a></li>
              </ul>
              <p>Description: An <b>article</b> is used as a menu trigger, which is semantically incorrect and not accessible.</p>
            </li>
          </nav>
        </>
      }
      itemDescription={itemDescription}
    />
  );
};