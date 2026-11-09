/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-headers
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Tables: Headless Tables - Success";

const HeadlesstablesSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-headless-tables-success-success-1"
          data-atomic-source="table-headers/role-table-with-role-columnheaders"
          dangerouslySetInnerHTML={{
            __html: `<div role="table">
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
          id="tables-headless-tables-success-success-2"
          data-atomic-source="table-headers/role-table-with-role-rowheaders"
          dangerouslySetInnerHTML={{
            __html: `<div role="table">
  <div role="row">
    <div role="rowheader">Car Model</div>
    <div role="cell">Toyota Camry</div>
    <div role="cell">Honda Civic</div>
    <div role="cell">Ford Mustang</div>
  </div>
  <div role="row">
    <div role="rowheader">Price</div>
    <div role="cell">\$25,000</div>
    <div role="cell">\$20,000</div>
    <div role="cell">\$35,000</div>
  </div>
  <div role="row">
    <div role="rowheader">Speed</div>
    <div role="cell">120 mph</div>
    <div role="cell">110 mph</div>
    <div role="cell">150 mph</div>
  </div>
  <div role="row">
    <div role="rowheader">Year of Release</div>
    <div role="cell">2022</div>
    <div role="cell">2021</div>
    <div role="cell">2022</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-success-success-3"
          data-atomic-source="table-headers/table-with-column-headers"
          dangerouslySetInnerHTML={{
            __html: `<table>
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
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-headless-tables-success-success-4"
          data-atomic-source="table-headers/table-with-row-headers"
          dangerouslySetInnerHTML={{
            __html: `<table>
  <tr>
    <th scope="row">Car Model</th>
    <td>Toyota Camry</td>
    <td>Honda Civic</td>
    <td>Ford Mustang</td>
  </tr>
  <tr>
    <th scope="row">Price</th>
    <td>\$25,000</td>
    <td>\$20,000</td>
    <td>\$35,000</td>
  </tr>
  <tr>
    <th scope="row">Speed</th>
    <td>120 mph</td>
    <td>110 mph</td>
    <td>150 mph</td>
  </tr>
  <tr>
    <th scope="row">Year of Release</th>
    <td>2022</td>
    <td>2021</td>
    <td>2022</td>
  </tr>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default HeadlesstablesSuccess;
