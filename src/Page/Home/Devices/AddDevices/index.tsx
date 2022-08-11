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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  deviceSelector,
  addDevice,
  get,
  update,
} from "../../../../store/reducers/deviceSlice";
import {
  serviceSelector,
  getAll,
} from "../../../../store/reducers/serviceSlice";
import { userSelector } from "../../../../store/reducers/userSlice";
import { add as addDiary } from "../../../../store/reducers/diarySlice";
import styles from "../Devices.module.scss";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";

const { Option } = Select;
interface formValue {
  code: string;
  name: string;
  username: string;
  password: string;
  type: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  services: string[];
}

const AddDevices = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, device } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);

  const onFinish = (value: formValue) => {
    console.log(value);
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
              action: "Cập nhật thông tin thiết bị",
              time: Timestamp.fromDate(new Date()),
            })
          );
        } else {
          notice.error("Đã xảy ra lỗi", 3);
        }
      });
    } else {
      dispatch(addDevice(value)).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          notice.success("Thêm thành công", 3);
          navigate("../");
          dispatch(
            addDiary({
              username: userLogin ? userLogin.username : "",
              ip: "127.0.0.1",
              action: "Thêm thiết bị",
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
    form.setFieldsValue(device);
  }, [device]);
  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
    dispatch(getAll());
  }, []);

  return (
    <Form
      layout="vertical"
      className={clsx(styles.section, styles.section2)}
      form={id ? form : undefined}
      onFinish={onFinish}
    >
      <Typography.Title className={styles.title}>
        Quản lý thiết bị
      </Typography.Title>
      <Card>
        <Row>
          <Col>
            <Typography.Title className={clsx(styles.title, styles.title2)}>
              Thông tin thiết bị
            </Typography.Title>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="code"
              label={
                <Typography.Text className={styles.label}>
                  Mã thiết bị:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã thiết bị",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập mã thiết bị" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label={
                <Typography.Text className={styles.label}>
                  Loại thiết bị:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại thiết bị",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Chọn loại thiết bị"
                suffixIcon={
                  <CaretDownOutlined
                    style={{
                      fontSize: "20px",
                      color: "#FF7506",
                    }}
                  />
                }
              >
                <Option key={1} value={"kisok"}>
                  {"Kisok"}
                </Option>
                <Option key={2} value={"Hệ thống"}>
                  {"Hệ thống"}
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label={
                <Typography.Text className={styles.label}>
                  Tên thiết bị:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên thiết bị",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập tên thiết bị" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label={
                <Typography.Text className={styles.label}>
                  Tên đăng nhập:
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
              <Input size="large" placeholder="Nhập tài khoản" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ip"
              label={
                <Typography.Text className={styles.label}>
                  Địa chỉ IP:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ ip",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập địa chỉ IP" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label={
                <Typography.Text className={styles.label}>
                  Mật khẩu:
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
              <Input size="large" placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="services"
              label={
                <Typography.Text className={styles.label}>
                  Dịch vụ sử dụng:
                </Typography.Text>
              }
              required={false}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn dịch vụ sử dụng",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                size="large"
                placeholder="Chọn dịch vụ sử dụng"
              >
                {services.map((service) => {
                  return (
                    <Option key={service.id} value={service.id}>
                      {service.name}
                    </Option>
                  );
                })}
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
            loading={loading}
          >
            {loading ? "" : id ? "Cập nhật" : "Thêm thiết bị"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddDevices;
