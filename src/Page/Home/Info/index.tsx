import { useEffect } from "react";
import { Card, Form, Input, Row, Col, Avatar, Typography } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../store/index";
import { userSelector } from "../../../store/reducers/userSlice";
import { roleSelector, get } from "../../../store/reducers/roleSlice";
import avatarImage from "../../../Assets/avatar.svg";
import styles from "./Info.module.scss";

const Info = () => {
  const dispatch = useAppDispatch();
  const { userLogin } = useAppSelector(userSelector);
  const { role } = useAppSelector(roleSelector);

  useEffect(() => {
    if (userLogin) {
      dispatch(get(userLogin.role));
    }
  }, [userLogin]);

  return (
    <div style={{ padding: "80px 104px 0 24px" }}>
      <Card bordered={false}>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={6}>
              <div className={styles.inforLeft}>
                <div style={{ position: "relative" }}>
                  <Avatar src={avatarImage} className={styles.avatar} />
                  <CameraOutlined className={styles.icon} />
                </div>
                <Typography.Title className={styles.name}>
                  {userLogin?.name}
                </Typography.Title>
              </div>
            </Col>
            <Col span={18}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Tên người dùng">
                    <Input
                      className={styles.input}
                      disabled
                      value={userLogin?.name}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên đăng nhập">
                    <Input
                      className={styles.input}
                      disabled
                      value={userLogin?.username}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại">
                    <Input
                      className={styles.input}
                      disabled
                      value={userLogin?.phoneNumber}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Mật khẩu">
                    <Input
                      className={styles.input}
                      disabled
                      value={userLogin?.password}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      className={styles.input}
                      disabled
                      value={userLogin?.email}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Vai trò">
                    <Input
                      className={styles.input}
                      disabled
                      value={role?.name}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Info;
