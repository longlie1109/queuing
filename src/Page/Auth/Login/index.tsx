import { useEffect } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/index";
import { userSelector, login, load } from "../../../store/reducers/userSlice";
import styles from "../Form.module.scss";

interface formValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLoading, message, userLogin } = useAppSelector(userSelector);

  const onFinish = (value: formValue) => {
    dispatch(login(value)).then(() => dispatch(load()));
  };

  useEffect(() => {
    dispatch(load());
  }, []);

  useEffect(() => {
    if (userLogin) {
      navigate("/dashboard");
    }
  }, [userLogin]);

  return (
    <Form
      name="login"
      layout="vertical"
      className={clsx(styles.form)}
      onFinish={onFinish}
    >
      <Form.Item label="Tên đăng nhập" name="username">
        <Input
          style={{ borderRadius: "8px" }}
          status={message.fail ? "error" : undefined}
          size="large"
          disabled={authLoading}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        // rules={[{ required: true, message: "Không được bỏ trống" }]}
        help={
          message.fail ? (
            <div className={styles.warningWrapper}>
              <Row
                justify="start"
                align="middle"
                className={styles.warningContainer}
              >
                <Col>
                  <InfoCircleOutlined style={{ fontSize: 20 }} />
                </Col>
                <Col>
                  <Typography.Text className={styles.warningText}>
                    {message.text}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          ) : undefined
        }
      >
        <Input.Password
          style={{ borderRadius: "8px" }}
          status={message.fail ? "error" : undefined}
          size="large"
          disabled={authLoading}
        />
      </Form.Item>
      <Form.Item>
        <div className={clsx(styles.buttonContainer)}>
          <Button
            className={clsx(styles.btn)}
            type="primary"
            htmlType="submit"
            loading={authLoading}
          >
            {authLoading ? "" : "Đăng nhập"}
          </Button>
          <Link className={clsx(styles.link)} to="/auth/forgot-password">
            Quên mật khẩu ?
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
