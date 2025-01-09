import React, { useState } from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation : Broken Submenu Indication - Failure";

export default () => {
  const [menuOpen, setMenuOpen] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    menu8: false,
    menu9: false,
    menu10: false,
    menu11: false,
    menu12: false,
  });

  const toggleMenu = (menu) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <IssueFailure
      itemContent={
        <>
          {/* Failure 1 */}
          <div className="list-item" id="broken-submenu-indication-failure-1">
            <div
              aria-expanded={menuOpen.menu1}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu1")}
            >
              Menu Item 1
            </div>
            {menuOpen.menu1 && (
              <ul>
                <li><a href="#">Submenu 1.1</a></li>
                <li><a href="#">Submenu 1.2</a></li>
              </ul>
            )}
            <p>Description: A <b>div</b> is used as a menu toggle, which lacks semantic meaning and keyboard support.</p>
          </div>

          {/* Failure 2 */}
          <div className="list-item" id="broken-submenu-indication-failure-2">
            <span
              aria-expanded={menuOpen.menu2}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu2")}
            >
              Menu Item 2
            </span>
            {menuOpen.menu2 && (
              <ul>
                <li><a href="#">Submenu 2.1</a></li>
                <li><a href="#">Submenu 2.2</a></li>
              </ul>
            )}
            <p>Description: A <b>span</b> is used for toggling, which is non-interactive and lacks proper semantics.</p>
          </div>

          {/* Failure 3 */}
          <div className="list-item" id="broken-submenu-indication-failure-3">
            <img
              src="menu-icon.png"
              alt="Menu Item 3"
              aria-expanded={menuOpen.menu3}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu3")}
            />
            {menuOpen.menu3 && (
              <ul>
                <li><a href="#">Submenu 3.1</a></li>
                <li><a href="#">Submenu 3.2</a></li>
              </ul>
            )}
            <p>Description: An <b>img</b> is used as an interactive toggle, which lacks keyboard accessibility and semantics.</p>
          </div>

          {/* Failure 4 */}
          <div className="list-item" id="broken-submenu-indication-failure-4">
            <li
              aria-expanded={menuOpen.menu4}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu4")}
            >
              Menu Item 4
            </li>
            {menuOpen.menu4 && (
              <ul>
                <li><a href="#">Submenu 4.1</a></li>
                <li><a href="#">Submenu 4.2</a></li>
              </ul>
            )}
            <p>Description: A <b>list item</b> (<b>li</b>) is used as a toggle, which lacks interactive roles.</p>
          </div>

          {/* Failure 5 */}
          <div className="list-item" id="broken-submenu-indication-failure-5">
            <p
              aria-expanded={menuOpen.menu5}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu5")}
            >
              Menu Item 5
            </p>
            {menuOpen.menu5 && (
              <ul>
                <li><a href="#">Submenu 5.1</a></li>
                <li><a href="#">Submenu 5.2</a></li>
              </ul>
            )}
            <p>Description: A <b>paragraph</b> is used as a toggle, which is incorrect and lacks focusability.</p>
          </div>

          {/* Failure 6 */}
          <div className="list-item" id="broken-submenu-indication-failure-6">
            <h3
              aria-expanded={menuOpen.menu6}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu6")}
            >
              Menu Item 6
            </h3>
            {menuOpen.menu6 && (
              <ul>
                <li><a href="#">Submenu 6.1</a></li>
                <li><a href="#">Submenu 6.2</a></li>
              </ul>
            )}
            <p>Description: A <b>heading</b> (<b>h3</b>) is used for toggling, which is semantically incorrect for menus.</p>
          </div>

          {/* Failure 7 */}
          <div className="list-item" id="broken-submenu-indication-failure-7">
            <table
              aria-expanded={menuOpen.menu7}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu7")}
            >
              <tr>
                <td>Menu Item 7</td>
              </tr>
            </table>
            {menuOpen.menu7 && (
              <ul>
                <li><a href="#">Submenu 7.1</a></li>
                <li><a href="#">Submenu 7.2</a></li>
              </ul>
            )}
            <p>Description: A <b>table</b> element is misused as a menu toggle, which is inappropriate and lacks semantics.</p>
          </div>

          {/* Failure 8 */}
          <div className="list-item" id="broken-submenu-indication-failure-8">
            <section
              aria-expanded={menuOpen.menu8}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu8")}
            >
              Menu Item 8
            </section>
            {menuOpen.menu8 && (
              <ul>
                <li><a href="#">Submenu 8.1</a></li>
                <li><a href="#">Submenu 8.2</a></li>
              </ul>
            )}
            <p>Description: A <b>section</b> element is used for toggling, which is not focusable or interactive.</p>
          </div>

          {/* Failure 9 */}
          <div className="list-item" id="broken-submenu-indication-failure-9">
            <label
              aria-expanded={menuOpen.menu9}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu9")}
            >
              Menu Item 9
            </label>
            {menuOpen.menu9 && (
              <ul>
                <li><a href="#">Submenu 9.1</a></li>
                <li><a href="#">Submenu 9.2</a></li>
              </ul>
            )}
            <p>Description: A <b>label</b> element is used as a toggle, which is confusing and non-interactive.</p>
          </div>

          {/* Failure 10 */}
          <div className="list-item" id="broken-submenu-indication-failure-10">
            <article
              aria-expanded={menuOpen.menu10}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu10")}
            >
              Menu Item 10
            </article>
            {menuOpen.menu10 && (
              <ul>
                <li><a href="#">Submenu 10.1</a></li>
                <li><a href="#">Submenu 10.2</a></li>
              </ul>
            )}
            <p>Description: An <b>article</b> element is used for toggling, which is inappropriate for interactive elements.</p>
          </div>

          {/* Failure 11 */}
          <div className="list-item" id="broken-submenu-indication-failure-11">
            <footer
              aria-expanded={menuOpen.menu11}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu11")}
            >
              Menu Item 11
            </footer>
            {menuOpen.menu11 && (
              <ul>
                <li><a href="#">Submenu 11.1</a></li>
                <li><a href="#">Submenu 11.2</a></li>
              </ul>
            )}
            <p>Description: A <b>footer</b> element is used as a toggle, which is non-semantic for menus.</p>
          </div>

          {/* Failure 12 */}
          <div className="list-item" id="broken-submenu-indication-failure-12">
            <aside
              aria-expanded={menuOpen.menu12}
              aria-haspopup="true"
              onClick={() => toggleMenu("menu12")}
            >
              Menu Item 12
            </aside>
            {menuOpen.menu12 && (
              <ul>
                <li><a href="#">Submenu 12.1</a></li>
                <li><a href="#">Submenu 12.2</a></li>
              </ul>
            )}
            <p>Description: An <b>aside</b> element is misused as a menu toggle, which is not focusable or interactive.</p>
          </div>
        </>
      }
      itemDescription={itemDescription}
    />
  );
};
