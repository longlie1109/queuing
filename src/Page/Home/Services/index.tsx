import { Route, Routes } from "react-router-dom";
import ServicesTable from "./ServicesTable";
import AddServices from "./AddServices";
import DetailServices from "./DetailServices";

const index = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddServices />} />
      <Route path="/edit/:id" element={<AddServices />} />
      <Route path="/detail/:id" element={<DetailServices />} />
      <Route path="/" element={<ServicesTable />} />
    </Routes>
  );
};

export default index;
