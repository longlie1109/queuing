import { Route, Routes } from "react-router-dom";
import HistoryUserTable from "./HistoryUserTable";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<HistoryUserTable />} />
    </Routes>
  );
};

export default index;
