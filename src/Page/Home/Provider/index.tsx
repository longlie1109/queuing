import { Route, Routes } from "react-router-dom";
import ProviderTable from "./ProviderTable";
import ProviderNumber from "./ProviderNumber";
import Detail from "./Detail";

const index = () => {
  return (
    <Routes>
      <Route path="/new" element={<ProviderNumber />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/" element={<ProviderTable />} />
    </Routes>
  );
};

export default index;
