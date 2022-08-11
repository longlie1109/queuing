import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Select,
  Typography,
  message as notice,
  Input,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  providerNumberSelector,
  get,
  getAll,
  addProviderNumber,
} from "../../../../store/reducers/providerNumberSlice";
import {
  serviceSelector,
  getAll as getServices,
} from "../../../../store/reducers/serviceSlice";
import { userSelector } from "../../../../store/reducers/userSlice";
import { add as addDiary } from "../../../../store/reducers/diarySlice";
import styles from "../Provider.module.scss";
import styles2 from "./Modal.module.scss";

const { Text, Title } = Typography;
const { Option } = Select;
interface formValue {
  name: string;
  phone: string;
  email: string | undefined;
}

const ProviderNumber = () => {
  const dispatch = useAppDispatch();
  const { loading, providerNumber } = useAppSelector(providerNumberSelector);
  const { services } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [service, setService] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const onFinish = (value: formValue) => {
    let time = new Date();
    let timeExp = new Date();
    timeExp.setHours(time.getHours() + 1);
    dispatch(
      addProviderNumber({
        service: service,
        stt: 0,
        src: "Hệ thống",
        status: "waiting",
        timeGet: Timestamp.fromDate(time),
        timeExp: Timestamp.fromDate(timeExp),
        name: value.name,
        phoneNumber: value.phone,
        email: value.email ? value.email : "",
      })
    ).then((data) => {
      if (data.payload) {
        const id = data.payload as string;
        dispatch(get(id)).then(() => {
          setVisible(false);
          setVisible2(true);
        });
        notice.success("Lấy số thành công", 3);
        dispatch(getAll());
        dispatch(
          addDiary({
            username: userLogin ? userLogin.username : "UnKnown",
            ip: "127.0.0.1",
            action: "Lấy số",
            time: Timestamp.fromDate(new Date()),
          })
        );
      } else {
        notice.error("Đã xảy ra lỗi", 3);
      }
    });
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <div className={clsx(styles.section, styles.section2)}>
      <Form
        name="provider-new"
        layout="vertical"
        onFinish={() => setVisible(true)}
      >
        <Title className={styles.title}>Quản lý cấp số</Title>
        <Card bordered>
          <Row gutter={24}>
            <Col span={8} offset={8}>
              <Title className={clsx(styles.title, styles.title2)}>
                Cấp số mới
              </Title>
              <Text className={styles.label1}>Dịch vụ khách hàng lựa chọn</Text>
              <Form.Item
                name="service"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dịch vụ",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Chọn dịch vụ"
                  onChange={(value) => setService(value)}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{
                        fontSize: "20px",
                        color: "#FF7506",
                      }}
                    />
                  }
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
          <Row gutter={32} justify="center" className={styles.buttonContainer}>
            <Col>
              <Button
                size="large"
                type="primary"
                ghost
                className={styles.button}
              >
                <Link to="../">Hủy bỏ</Link>
              </Button>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                className={styles.button}
                htmlType="submit"
              >
                In số
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
      <Modal
        centered
        visible={visible2}
        bodyStyle={{ borderRadius: "10px" }}
        onCancel={() => setVisible2(false)}
        width={470}
        footer={
          <div className={styles2.footerModal}>
            <Typography.Text className={styles2.text}>
              {"Thời gian cấp:" +
                moment(providerNumber?.timeGet.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                )}
            </Typography.Text>
            <Typography.Text className={styles2.text}>
              {"Hạn sử dụng:" +
                moment(providerNumber?.timeExp.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                )}
            </Typography.Text>
          </div>
        }
      >
        <div className={styles2.contentModal}>
          <Typography.Text className={styles2.text}>
            Số thứ tự được cấp
          </Typography.Text>
          <Typography.Text className={styles2.number}>
            {providerNumber?.number}
          </Typography.Text>
          <Typography.Text className={styles2.subtext}>
            Dv: {providerNumber?.service} <b>(tại quầy số 1)</b>
          </Typography.Text>
        </div>
      </Modal>
      <Modal
        centered
        closable={false}
        maskClosable={false}
        visible={visible}
        bodyStyle={{ borderRadius: "10px" }}
        onCancel={() => setVisible(false)}
        width={470}
        footer={null}
      >
        <Form
          className={styles2.formModal}
          layout="vertical"
          onFinish={onFinish}
        >
          <Typography.Title className={styles2.title}>
            Số thứ tự được cấp
          </Typography.Title>
          <Form.Item
            name="name"
            required={false}
            label={
              <Typography.Text className={styles2.label}>
                Họ và tên <span>*</span>
              </Typography.Text>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng điền họ tên",
              },
            ]}
          >
            <Input size="large" placeholder="Nhập họ tên của bạn" />
          </Form.Item>
          <Form.Item
            name="phone"
            required={false}
            label={
              <Typography.Text className={styles2.label}>
                Số điện thoại <span>*</span>
              </Typography.Text>
            }
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
            ]}
          >
            <Input size="large" placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <Typography.Text className={styles2.label}>Email</Typography.Text>
            }
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input size="large" placeholder="Nhập email của bạn" />
          </Form.Item>
          <Typography.Text className={styles2.note}>
            <span>*</span>Là trường thông tin bắt buộc
          </Typography.Text>
          <Row gutter={16} justify="center" className={styles.buttonContainer}>
            <Col>
              <Button
                size="large"
                type="primary"
                ghost
                className={styles.button}
                onClick={() => setVisible(false)}
              >
                <Link to="../">Hủy bỏ</Link>
              </Button>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                loading={loading}
                className={styles.button}
                htmlType="submit"
              >
                {loading ? "" : "Xác nhận"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ProviderNumber;
