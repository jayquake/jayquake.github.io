/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-headers
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Tables: Headless Tables - Failure";

const HeadlesstablesFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-1"
          data-atomic-source="table-headers/multi-role-table-without-headers"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="table">
    <div role="rowgroup">
        <div role="row">
            <div role="cell">Toyota Camry</div>
            <div role="cell">\$25,000</div>
            <div role="cell">120 mph</div>
            <div role="cell">2022</div>
        </div>
        <div role="row">
            <div role="cell">Honda Civic</div>
            <div role="cell">\$20,000</div>
            <div role="cell">110 mph</div>
            <div role="cell">2021</div>
        </div>
        <div role="row">
            <div role="cell">Ford Mustang</div>
            <div role="cell">\$35,000</div>
            <div role="cell">150 mph</div>
            <div role="cell">2022</div>
        </div>
    </div>
</div>
<div id="test-subject2" role="table">
    <div role="rowgroup">
        <div role="row">
            <div role="cell">Toyota Camry</div>
            <div role="cell">\$25,000</div>
            <div role="cell">120 mph</div>
            <div role="cell">2022</div>
        </div>
        <div role="row">
            <div role="cell">Honda Civic</div>
            <div role="cell">\$20,000</div>
            <div role="cell">110 mph</div>
            <div role="cell">2021</div>
        </div>
        <div role="row">
            <div role="cell">Ford Mustang</div>
            <div role="cell">\$35,000</div>
            <div role="cell">150 mph</div>
            <div role="cell">2022</div>
        </div>
    </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-2"
          data-atomic-source="table-headers/multi-table-without-th"
          dangerouslySetInnerHTML={{
            __html: `<table>
    <thead>
        <tr>
            <td>Car Model</td>
            <td>Price</td>
            <td>Speed</td>
            <td>Year of Release</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Toyota Camry</td>
            <td>\$25,000</td>
            <td>120 mph</td>
            <td>2022</td>
        </tr>
        <tr>
            <td>Honda Civic</td>
            <td>\$20,000</td>
            <td>110 mph</td>
            <td>2021</td>
        </tr>
        <tr>
            <td>Ford Mustang</td>
            <td>\$35,000</td>
            <td>150 mph</td>
            <td>2022</td>
        </tr>
    </tbody>
</table>

<table>
    <thead>
    <tr>
        <td>Car Model</td>
        <td>Price</td>
        <td>Speed</td>
        <td>Year of Release</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Toyota Camry</td>
        <td>\$25,000</td>
        <td>120 mph</td>
        <td>2022</td>
    </tr>
    <tr>
        <td>Honda Civic</td>
        <td>\$20,000</td>
        <td>110 mph</td>
        <td>2021</td>
    </tr>
    <tr>
        <td>Ford Mustang</td>
        <td>\$35,000</td>
        <td>150 mph</td>
        <td>2022</td>
    </tr>
    </tbody>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-3"
          data-atomic-source="table-headers/role-table-without-headers"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" role="table">
    <div role="rowgroup">
        <div role="row">
            <div role="cell">Toyota Camry</div>
            <div role="cell">\$25,000</div>
            <div role="cell">120 mph</div>
            <div role="cell">2022</div>
        </div>
        <div role="row">
            <div role="cell">Honda Civic</div>
            <div role="cell">\$20,000</div>
            <div role="cell">110 mph</div>
            <div role="cell">2021</div>
        </div>
        <div role="row">
            <div role="cell">Ford Mustang</div>
            <div role="cell">\$35,000</div>
            <div role="cell">150 mph</div>
            <div role="cell">2022</div>
        </div>
    </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-4"
          data-atomic-source="table-headers/role-tables-with-and-without-headers"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" role="table">
  <div role="rowgroup">
    <div role="row">
      <div role="cell">Toyota Camry</div>
      <div role="cell">\$25,000</div>
      <div role="cell">120 mph</div>
      <div role="cell">2022</div>
    </div>
    <div role="row">
      <div role="cell">Honda Civic</div>
      <div role="cell">\$20,000</div>
      <div role="cell">110 mph</div>
      <div role="cell">2021</div>
    </div>
    <div role="row">
      <div role="cell">Ford Mustang</div>
      <div role="cell">\$35,000</div>
      <div role="cell">150 mph</div>
      <div role="cell">2022</div>
    </div>
  </div>
</div>
<div class="with-headers" role="table">
  <div role="row">
    <div role="columnheader">Car Model</div>
    <div role="columnheader">Price</div>
    <div role="columnheader">Speed</div>
    <div role="columnheader">Year of Release</div>
  </div>
  <div role="row">
    <div>Toyota Camry</div>
    <div>\$25,000</div>
    <div>120 mph</div>
    <div>2022</div>
  </div>
  <div role="row">
    <div>Honda Civic</div>
    <div>\$20,000</div>
    <div>110 mph</div>
    <div>2021</div>
  </div>
  <div role="row">
    <div>Ford Mustang</div>
    <div>\$35,000</div>
    <div>150 mph</div>
    <div>2022</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-5"
          data-atomic-source="table-headers/table-and-role-table-without-headers"
          dangerouslySetInnerHTML={{
            __html: `<table id="test-subject1">
    <thead>
    <tr>
        <td>Car Model</td>
        <td>Price</td>
        <td>Speed</td>
        <td>Year of Release</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Toyota Camry</td>
        <td>\$25,000</td>
        <td>120 mph</td>
        <td>2022</td>
    </tr>
    <tr>
        <td>Honda Civic</td>
        <td>\$20,000</td>
        <td>110 mph</td>
        <td>2021</td>
    </tr>
    <tr>
        <td>Ford Mustang</td>
        <td>\$35,000</td>
        <td>150 mph</td>
        <td>2022</td>
    </tr>
    </tbody>
</table>
<div id="test-subject2" role="table">
    <div role="row">
        <div>Toyota Camry</div>
        <div>\$25,000</div>
        <div>120 mph</div>
        <div>2022</div>
    </div>
    <div role="row">
        <div>Honda Civic</div>
        <div>\$20,000</div>
        <div>110 mph</div>
        <div>2021</div>
    </div>
    <div role="row">
        <div>Ford Mustang</div>
        <div>\$35,000</div>
        <div>150 mph</div>
        <div>2022</div>
    </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-6"
          data-atomic-source="table-headers/table-without-th"
          dangerouslySetInnerHTML={{
            __html: `<table>
    <thead>
        <tr>
            <td>Car Model</td>
            <td>Price</td>
            <td>Speed</td>
            <td>Year of Release</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Toyota Camry</td>
            <td>\$25,000</td>
            <td>120 mph</td>
            <td>2022</td>
        </tr>
        <tr>
            <td>Honda Civic</td>
            <td>\$20,000</td>
            <td>110 mph</td>
            <td>2021</td>
        </tr>
        <tr>
            <td>Ford Mustang</td>
            <td>\$35,000</td>
            <td>150 mph</td>
            <td>2022</td>
        </tr>
    </tbody>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-failure-failure-7"
          data-atomic-source="table-headers/tables-with-and-without-th"
          dangerouslySetInnerHTML={{
            __html: `<table class="with-th">
  <tr>
    <th>Car Model</th>
    <th>Price</th>
    <th>Speed</th>
    <th>Year of Release</th>
  </tr>
  <tr>
    <td>Toyota Camry</td>
    <td>\$25,000</td>
    <td>120 mph</td>
    <td>2022</td>
  </tr>
  <tr>
    <td>Honda Civic</td>
    <td>\$20,000</td>
    <td>110 mph</td>
    <td>2021</td>
  </tr>
  <tr>
    <td>Ford Mustang</td>
    <td>\$35,000</td>
    <td>150 mph</td>
    <td>2022</td>
  </tr>
</table>
<table class="without-th">
  <thead>
    <tr>
      <td>Car Model</td>
      <td>Price</td>
      <td>Speed</td>
      <td>Year of Release</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Toyota Camry</td>
      <td>\$25,000</td>
      <td>120 mph</td>
      <td>2022</td>
    </tr>
    <tr>
      <td>Honda Civic</td>
      <td>\$20,000</td>
      <td>110 mph</td>
      <td>2021</td>
    </tr>
    <tr>
      <td>Ford Mustang</td>
      <td>\$35,000</td>
      <td>150 mph</td>
      <td>2022</td>
    </tr>
  </tbody>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default HeadlesstablesFailure;
