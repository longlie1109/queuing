import { Button, Col, Form, Input, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/index";
import { userSelector, findByEmail } from "../../../store/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Form.module.scss";

interface formValue {
  email: string;
}

const ForgotPass = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLoading, user, message } = useAppSelector(userSelector);

  const onFinish = (value: formValue) => {
    dispatch(findByEmail(value.email)).then((data) => {
      data.payload && navigate("/auth/change-password");
    });
  };
  return (
    <Form
      name="login"
      layout="vertical"
      className={clsx(styles.form)}
      onFinish={onFinish}
    >
      <Typography.Title className={clsx(styles.title)}>
        Đặt lại mật khẩu
      </Typography.Title>
      <Form.Item
        label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
        name="email"
        required={false}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email",
          },
          {
            type: "email",
            message: "Email không hợp lệ",
          },
        ]}
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
        <Input size="large" style={{ borderRadius: "8px" }} />
      </Form.Item>
      <Form.Item>
        <div
          className={clsx(styles.buttonContainer)}
          style={{ flexDirection: "row" }}
        >
          <Button
            className={clsx(styles.btn)}
            type="primary"
            htmlType="submit"
            ghost
          >
            <Link to="/auth/login">Huỷ</Link>
          </Button>
          <Button
            className={clsx(styles.btn)}
            type="primary"
            htmlType="submit"
            loading={authLoading}
          >
            {authLoading ? "" : "Tiếp tục"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ForgotPass;
