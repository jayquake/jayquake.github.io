import React from "react";
import { Route, Routes } from "react-router-dom";
import NestedTablesSuccess from "./Success/Nested-tablesSuccess";
import NestedTablesFailure from "./Failure/Nested-tablesFailure";

const TablesRoutes = () => (
  <>
    <Route path="tables/nested-tables_success" element={<NestedTablesSuccess />} />
    <Route path="tables/nested-tables_failure" element={<NestedTablesFailure />} />

  </>
);

export default TablesRoutes;
