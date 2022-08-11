import { useEffect } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message as notice,
} from "antd";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  userSelector,
  add,
  get,
  update,
} from "../../../../store/reducers/userSlice";
import { roleSelector, getAll } from "../../../../store/reducers/roleSlice";
import { add as addDiary } from "../../../../store/reducers/diarySlice";
import styles from "./ManageAccount.module.scss";

const { Option } = Select;

interface formValue {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
  name: string;
  isActive: boolean;
}

const AddManageAccount = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLoading, message, user, userLogin } =
    useAppSelector(userSelector);
  const { roles } = useAppSelector(roleSelector);

  const onFinish = (value: formValue) => {
    if (id) {
      dispatch(
        update({
          id,
          ...value,
        })
      ).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          dispatch(get(id));
          notice.success("Cập nhật thành công", 3);
          dispatch(
            addDiary({
              username: userLogin ? userLogin.username : "",
              ip: "127.0.0.1",
              action: "Cập nhật thông tin tài khoản",
              time: Timestamp.fromDate(new Date()),
            })
          );
        } else {
          notice.error("Đã xảy ra lỗi", 3);
        }
      });
    } else {
      dispatch(add(value)).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          notice.success("Thêm thành công", 3);
          navigate("../");
          dispatch(
            addDiary({
              username: userLogin ? userLogin.username : "",
              ip: "127.0.0.1",
              action: "Thêm tài khoản",
              time: Timestamp.fromDate(new Date()),
            })
          );
        } else {
          notice.error("Đã xảy ra lỗi", 3);
        }
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      passwordConfirm: user?.password,
    });
  }, [user]);
  useEffect(() => {
    dispatch(getAll());
    if (id) {
      dispatch(get(id));
    }
  }, []);

  return (
    <Form
      layout="vertical"
      name="user-add"
      form={id ? form : undefined}
      className={clsx(styles.section, styles.section2)}
      onFinish={onFinish}
    >
      <Typography.Title className={styles.title}>
        Quản lý tài khoản
      </Typography.Title>
      <Card>
        <Row>
          <Col>
            <Typography.Title className={clsx(styles.title, styles.title2)}>
              Thông tin tài khoản
            </Typography.Title>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={
                <Typography.Text className={styles.label}>
                  Họ tên
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập họ tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label={
                <Typography.Text className={styles.label}>
                  Tên đăng nhập
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập tên đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label={
                <Typography.Text className={styles.label}>
                  Số điện thoại
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label={
                <Typography.Text className={styles.label}>
                  Mật khẩu
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label={
                <Typography.Text className={styles.label}>
                  Email
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="passwordConfirm"
              label={
                <Typography.Text className={styles.label}>
                  Nhập lại mật khẩu:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label={
                <Typography.Text className={styles.label}>
                  Vai trò
                </Typography.Text>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Chọn vai trò"
                suffixIcon={
                  <CaretDownOutlined
                    style={{
                      fontSize: "20px",
                      color: "#FF7506",
                    }}
                  />
                }
              >
                {roles.map((role) => {
                  return (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isActive"
              label={
                <Typography.Text className={styles.label}>
                  Tình trạng
                </Typography.Text>
              }
            >
              <Select
                size="large"
                defaultValue={true}
                suffixIcon={
                  <CaretDownOutlined
                    style={{
                      fontSize: "20px",
                      color: "#FF7506",
                    }}
                  />
                }
              >
                <Option key={1} value={true}>
                  Hoạt động
                </Option>
                <Option key={2} value={false}>
                  Ngưng hoạt động
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Row gutter={32} justify="center" className={styles.buttonContainer}>
        <Col>
          <Button type="primary" ghost size="large" className={styles.button}>
            <Link to="../">Hủy bỏ</Link>
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            type="primary"
            className={styles.button}
            htmlType="submit"
            loading={authLoading}
          >
            {authLoading ? "" : id ? "Cập nhật" : "Thêm"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddManageAccount;
