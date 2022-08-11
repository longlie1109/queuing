import React from "react";
import { Route, Routes } from "react-router-dom";
import ManageRole from "./ManageRole";
import ManageAccount from "./ManageAccount";
import HistoryUser from "./HistoryUser";

const index = () => {
  return (
    <Routes>
      <Route path="/manage-roles/*" element={<ManageRole />} />
      <Route path="/manage-accounts/*" element={<ManageAccount />} />
      <Route path="/user-history" element={<HistoryUser />} />
    </Routes>
  );
};

export default index;
