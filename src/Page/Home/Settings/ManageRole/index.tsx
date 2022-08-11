import React from "react";
import { Route, Routes } from "react-router-dom";
import ManageRoleTable from "./ManageRoleTable";
import AddManageRole from "./AddManageRole";

const index = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddManageRole />} />
      <Route path="/edit/:id" element={<AddManageRole />} />
      <Route path="/" element={<ManageRoleTable />} />
    </Routes>
  );
};

export default index;
