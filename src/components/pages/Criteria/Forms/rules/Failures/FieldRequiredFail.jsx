import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Form - Field Required Failures";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <ul>
          <li className="list-item">
            <div>
              <p>❌ <strong>Missing `required` attribute.</strong> The field is not programmatically enforced as required.</p>
              <label htmlFor="fullname2">Full Name *</label>
              <input type="text" id="fullname2" />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Missing `required` attribute.</strong> Screen readers won’t announce this as required.</p>
              <label htmlFor="email2">Email *</label>
              <input type="email" id="email2" />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Visually marked required, but no `required` attribute.</strong> Assistive technology won’t recognize it.</p>
              <label htmlFor="password2">Password *</label>
              <input type="password" id="password2" />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Missing `required` attribute.</strong> The field is optional in terms of validation.</p>
              <label htmlFor="phone2">Phone Number *</label>
              <input type="tel" id="phone2" />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>The label indicates required, but there is no `required` attribute.</strong></p>
              <label htmlFor="dob2">Date of Birth *</label>
              <input type="date" id="dob2" />
            </div>
          </li>

          {/* New failure cases using `required` but improperly implemented */}

          <li className="list-item">
            <div>
              <p>❌ <strong>Using `aria-required="false"` with `required`.</strong> Conflicting information confuses screen readers.</p>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" required aria-required="false" />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Required attribute is set, but there’s no label.</strong> The field is not properly associated with a description.</p>
              <input type="text" id="city" name="city" required />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Using placeholder instead of label.</strong> The field is required but lacks a visible or accessible name.</p>
              <input type="text" id="company" name="company" placeholder="Enter company name" required />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Field is required, but the label doesn’t use `for`.</strong> There’s no explicit connection between the label and input.</p>
              <label>Username</label>
              <input type="text" id="username" name="username" required />
            </div>
          </li>

          <li className="list-item">
            <div>
              <p>❌ <strong>Visual-only "required" indicator.</strong> The label mentions required, but it’s not programmatically enforced.</p>
              <label htmlFor="zipcode">Zip Code (required)</label>
              <input type="text" id="zipcode" name="zipcode" />
            </div>
          </li>
        </ul>

        <input type="submit" value="Submit" />
      </>
    }
    itemDescription={itemDescription}
  />
);