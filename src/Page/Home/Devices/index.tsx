import { Route, Routes } from "react-router-dom";
import DevicesTable from "./DeviceTable";
import AddDevices from "./AddDevices";
import DetailDevices from "./DetailDevices";

const index = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddDevices />} />
      <Route path="/edit/:id" element={<AddDevices />} />
      <Route path="/detail/:id" element={<DetailDevices />} />
      <Route path="/" element={<DevicesTable />} />
    </Routes>
  );
};

export default index;
