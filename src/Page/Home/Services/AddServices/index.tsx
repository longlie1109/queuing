import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
  message as notice,
} from "antd";
import { Timestamp } from "firebase/firestore";
import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  serviceSelector,
  addService,
  get,
  update,
} from "../../../../store/reducers/serviceSlice";
import { userSelector } from "../../../../store/reducers/userSlice";
import { add as addDiary } from "../../../../store/reducers/diarySlice";
import styles from "../Services.module.scss";

const { Text, Title } = Typography;

interface formValue {
  code: string;
  name: string;
  description: string;
  increaseStart?: number;
  increaseEnd?: number;
  prefix: string | undefined;
  surfix: string | undefined;
  reset: boolean;
}

const AddService = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, service } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);

  const [prefix, setPrefix] = useState(false);
  const [surfix, setSurfix] = useState(false);
  const [increase, setIncrease] = useState(false);

  const onFinish = (value: formValue) => {
    if (id) {
      dispatch(
        update({
          id,
          ...value,
          prefix: value.prefix ? value.prefix : "",
          surfix: value.surfix ? value.surfix : "",
        })
      ).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          dispatch(get(id));
          notice.success("Cập nhật thành công", 3);
          dispatch(
            addDiary({
              username: userLogin ? userLogin.username : "",
              ip: "127.0.0.1",
              action: "Cập nhật thông tin dịch vụ",
              time: Timestamp.fromDate(new Date()),
            })
          );
        } else {
          notice.error("Đã xảy ra lỗi", 3);
        }
      });
    } else {
      dispatch(
        addService({
          ...value,
          prefix: value.prefix ? value.prefix : "",
          surfix: value.surfix ? value.surfix : "",
          isActive: true,
        })
      ).then((data) => {
        if (data.meta.requestStatus == "fulfilled") {
          notice.success("Thêm thành công", 3);
          navigate("../");
          dispatch(
            addDiary({
              username: userLogin ? userLogin.username : "",
              ip: "127.0.0.1",
              action: "Thêm dịch vụ",
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
    if (id) {
      form.setFieldsValue(service);
      if (service?.prefix) setPrefix(true);
      if (service?.surfix) setSurfix(true);
      if (service?.increaseStart) setIncrease(true);
    }
  }, [service]);
  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
  }, []);

  return (
    <div className={clsx(styles.section, styles.section2)}>
      <Form
        name="service-add"
        layout="vertical"
        form={id ? form : undefined}
        onFinish={onFinish}
      >
        <Title level={2} className={styles.title}>
          Quản lý dịch vụ
        </Title>
        <Card bordered>
          <Row gutter={24}>
            <Col span={24}>
              <Title className={clsx(styles.title, styles.title2)}>
                Thông tin dịch vụ
              </Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label={<Text className={styles.label}>Mã dịch vụ:</Text>}
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã dịch vụ",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                name="name"
                label={<Text className={styles.label}>Tên dịch vụ:</Text>}
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã dịch vụ",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label={<Text className={styles.label}>Mô tả:</Text>}
              >
                <Input.TextArea
                  size="large"
                  placeholder="Mô tả dịch vụ"
                  style={{ height: "150px" }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Title className={clsx(styles.title, styles.title2)}>
                Quy tắc cấp số
              </Title>
            </Col>

            <Col span={12}>
              <div className={styles.itemWrapper}>
                <Row className={styles.itemContainer}>
                  <Col span={7}>
                    <Checkbox
                      checked={increase}
                      onChange={(e) => setIncrease(!increase)}
                    >
                      <Text className={styles.label}>Tăng tự động từ:</Text>
                    </Checkbox>
                  </Col>
                  <Col span={17}>
                    <Form.Item noStyle name={"increaseStart"}>
                      <InputNumber
                        min={0}
                        max={9999}
                        size="large"
                        className={styles.providerInput}
                        controls={false}
                        disabled={!increase}
                      />
                    </Form.Item>
                    <Typography.Text
                      className={styles.text}
                      style={{ margin: "0 8px" }}
                    >
                      đến
                    </Typography.Text>
                    <Form.Item noStyle name={"increaseEnd"}>
                      <InputNumber
                        min={0}
                        max={9999}
                        size="large"
                        className={styles.providerInput}
                        controls={false}
                        disabled={!increase}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={styles.itemContainer}>
                  <Col span={7}>
                    <Checkbox
                      checked={prefix}
                      onChange={(e) => setPrefix(!prefix)}
                    >
                      <Text className={styles.label}>Prefix:</Text>
                    </Checkbox>
                  </Col>
                  <Col span={17}>
                    <Form.Item noStyle name={"prefix"}>
                      <Input
                        size="large"
                        className={styles.providerInput}
                        disabled={!prefix}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={styles.itemContainer}>
                  <Col span={7}>
                    <Checkbox
                      checked={surfix}
                      onChange={(e) => setSurfix(!surfix)}
                    >
                      <Text className={styles.label}>Surfix:</Text>
                    </Checkbox>
                  </Col>
                  <Col span={17}>
                    <Form.Item noStyle name={"surfix"}>
                      <Input
                        size="large"
                        className={styles.providerInput}
                        disabled={!surfix}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={styles.itemContainer}>
                  <Col span={24}>
                    <Form.Item noStyle name={"reset"} valuePropName="checked">
                      <Checkbox>
                        <Text className={styles.label}>Reset mỗi ngày</Text>
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>

        <Row gutter={32} justify="center" className={styles.buttonContainer}>
          <Col>
            <Button size="large" type="primary" ghost className={styles.button}>
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
              {loading ? "" : id ? "Cập nhật" : "Thêm dịch vụ"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddService;
