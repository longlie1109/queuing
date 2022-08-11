import { Route, Routes } from "react-router-dom";
import ReportTable from "./ReportTable";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportTable />} />
    </Routes>
  );
};

export default index;
