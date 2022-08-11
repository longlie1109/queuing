import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message as notice,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/index";
import { userSelector, changePass } from "../../../store/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Form.module.scss";

interface formValue {
  password: string;
  passwordConfirm: string;
}

const ChangePass = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLoading, userId } = useAppSelector(userSelector);

  const [message, setMessage] = useState<string>("");

  const onFinish = (value: formValue) => {
    if (value.password === value.passwordConfirm) {
      setMessage("");
      dispatch(
        changePass({
          id: userId,
          password: value.password,
        })
      ).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          notice.success("Đổi mật khẩu thành công", 3);
          navigate("/auth/login");
        } else {
          notice.error("Đã xảy ra lỗi", 3);
        }
      });
    } else {
      setMessage("Mật khẩu không khớp");
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/auth/forgot-password");
    }
  }, [userId]);
  return (
    <Form
      name="login"
      layout="vertical"
      className={clsx(styles.form)}
      onFinish={onFinish}
    >
      <Typography.Title className={clsx(styles.title)}>
        Đặt lại mật khẩu mới
      </Typography.Title>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống",
          },
        ]}
      >
        <Input.Password size="large" style={{ borderRadius: "8px" }} />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="passwordConfirm"
        help={
          message ? (
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
                    {message}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          ) : undefined
        }
      >
        <Input.Password size="large" style={{ borderRadius: "8px" }} />
      </Form.Item>
      <Form.Item>
        <div className={clsx(styles.buttonContainer)}>
          <Button
            className={clsx(styles.btn)}
            type="primary"
            htmlType="submit"
            loading={authLoading}
          >
            {authLoading ? "" : "Xác nhận"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ChangePass;
