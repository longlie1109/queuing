import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./Page/Auth/LoginForm";
import Home from "./Page/Home/Home";
import store from "./store";
import Aaa from "./Page/components/DateRange/index";
import "./App.less";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/test" element={<Aaa />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Provider>
  );
};

export default App;
