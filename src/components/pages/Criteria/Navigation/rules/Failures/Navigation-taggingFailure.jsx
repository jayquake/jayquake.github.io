import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Navigation Tagging - Failure";

export default () => (
    <IssueFailure
        itemContent={
            <>
                <div className="list-item" id="navigation-discernible-failure-1">
                    <nav>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-discernible-failure-2">
                    <nav aria-label="">
                        <ul>
                            <li><a href="/about">About</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-discernible-failure-3">
                    <nav aria-labelledby="nonExistingId">
                        <ul>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/support">Support</a></li>
                            <li><a href="/careers">Careers</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-discernible-failure-4">
                    <nav aria-describedby="hiddenText">
                        <p id="hiddenText" style={{ display: "none" }}>Main navigation</p>
                        <ul>
                            <li><a href="/portfolio">Portfolio</a></li>
                            <li><a href="/news">News</a></li>
                            <li><a href="/team">Team</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-discernible-failure-5">
                    <nav>
                        <ul aria-label="navigation">
                            <li><a href="/features">Features</a></li>
                            <li><a href="/testimonials">Testimonials</a></li>
                            <li><a href="/partnerships">Partnerships</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-discernible-failure-6">
                    <nav role="menu">
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                            <li><a href="/help">Help</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-1">
                    <div>
                        <ul>
                            <li><a href="/portfolio">Portfolio</a></li>
                            <li><a href="/news">News</a></li>
                            <li><a href="/team">Team</a></li>
                        </ul>
                    </div>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-2">
                    <section>
                        <ul>
                            <li><a href="/features">Features</a></li>
                            <li><a href="/testimonials">Testimonials</a></li>
                            <li><a href="/partnerships">Partnerships</a></li>
                        </ul>
                    </section>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-3">
                    <article>
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/register">Register</a></li>
                            <li><a href="/help">Help</a></li>
                        </ul>
                    </article>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-4">
                    <div role="banner">
                        <ul>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-5">
                    <header>
                        <ul>
                            <li><a href="/pricing">Pricing</a></li>
                            <li><a href="/features">Features</a></li>
                            <li><a href="/careers">Careers</a></li>
                        </ul>
                    </header>
                </div>

                <div className="list-item" id="navigation-mismatch-failure-6">
                    <footer>
                        <ul>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/sitemap">Sitemap</a></li>
                        </ul>
                    </footer>
                </div>
                <div class="nav">
                    <ul>
                        <li>
                            <a href="#main-content">Skip to main content</a>
                        </li>
                        <li>
                            <a href="#footer">Skip to footer</a>
                        </li>
                    </ul>
                </div>
            </>
        }
        itemDescription={itemDescription}
    />
);