import clsx from "clsx";
import { Col, Row } from "antd";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import ChangePass from "./ChangePass/ChangePass";
import ForgotPass from "./ForgoPass/ForgotPass";
import loginImage from "../../Assets/illustrationLogin.svg";
import loginImage2 from "../../Assets/illustrationHelp.svg";
import Logo from "../../Assets/logo.svg";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col span={10} style={{ background: "#F6F6F6" }}>
          <div className={clsx(styles.logo)}>
            <img src={Logo} alt="Alta" />
          </div>
          <div className={clsx(styles.formContainer)}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/change-password" element={<ChangePass />} />
              <Route path="/forgot-password" element={<ForgotPass />} />
            </Routes>
          </div>
        </Col>
        <Col span={14}>
          <Routes>
            <Route
              path="/login"
              element={
                <img className={styles.image} src={loginImage} alt="Alta" />
              }
            />
            <Route
              path="/change-password"
              element={
                <img className={styles.image} src={loginImage2} alt="Alta" />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <img className={styles.image} src={loginImage2} alt="Alta" />
              }
            />
          </Routes>
        </Col>
      </Row>
    </>
  );
};

export default Login;
