import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Avoid role menu/menubar - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="menu-avoid-failure-1">
          <nav role="menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
        </div>
        <div className="list-item" id="menu-avoid-failure-2">
          <header>
            <nav role="menu" aria-label="Header Menu">
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>
        </div>
        <div className="list-item" id="menu-avoid-failure-3">
          <footer>
            <nav role="menu">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </nav>
          </footer>
        </div>
        <div className="list-item" id="menu-bar-avoid-failure-4">
          <nav role="menubar" aria-label="Main Menubar">
            <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </nav>
        </div>
        <div className="list-item" id="menu-bar-avoid-failure-5">
          <nav role="menubar">
            <ul>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </nav>
        </div>
        <div className="list-item" id="menu-bar-avoid-failure-6">
          <nav role="menubar" aria-label="Footer Menubar">
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </nav>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);