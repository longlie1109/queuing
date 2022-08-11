import { Route, Routes } from "react-router-dom";
import ManageAccountTable from "./ManageAccountTable";
import AddManageAccount from "./AddManageAccount";

const index = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddManageAccount />} />
      <Route path="/edit/:id" element={<AddManageAccount />} />
      <Route path="/" element={<ManageAccountTable />} />
    </Routes>
  );
};

export default index;
