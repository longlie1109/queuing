import { useEffect, useState } from "react";
import {
  EditOutlined,
  RollbackOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { serviceSelector, get } from "../../../../store/reducers/serviceSlice";
import {
  providerNumberSelector,
  getByIdService,
} from "../../../../store/reducers/providerNumberSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import SearchInput from "../../../components/SearchInput";
import styles from "../Services.module.scss";

const { Text, Title } = Typography;
const { Option } = Select;

const columns = [
  {
    title: "Số thứ tự",
    key: "stt",
    dataIndex: "stt",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
];

const data = [
  {
    key: "1",
    stt: "201001",
    status: <Status type="success" text="Đang hoàn thành" />,
  },
  {
    key: "2",
    stt: "201002",
    status: <Status type="waiting" text="Đang thực hiện" />,
  },
  {
    key: "3",
    stt: "201003",
    status: <Status type="used" text="Vắng" />,
  },
  {
    key: "4",
    stt: "201004",
    status: <Status type="success" text="Đang hoàn thành" />,
  },
  {
    key: "3",
    stt: "201003",
    status: <Status type="used" text="Vắng" />,
  },
  {
    key: "4",
    stt: "201004",
    status: <Status type="success" text="Đang hoàn thành" />,
  },
];

const DetailService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { service } = useAppSelector(serviceSelector);
  const { loading, providerNumbersFilter } = useAppSelector(
    providerNumberSelector
  );
  const [status, setStatus] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);

  useEffect(() => {
    if (id) {
      dispatch(
        getByIdService({
          id,
          filter: {
            status,
            keywords,
            dateRange: dateRange
              ? [dateRange[0] as Moment, dateRange[1] as Moment]
              : null,
          },
        })
      );
    }
  }, [id, status, keywords, dateRange]);

  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
  }, [id]);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title}>
        Quản lý thiết bị
      </Typography.Title>
      <Row>
        <Col span={8}>
          <Card className={styles.card} style={{ marginRight: "24px" }}>
            <Title className={clsx(styles.title, styles.title2)}>
              Thông tin dịch vụ
            </Title>
            <div className={styles.itemWrapper}>
              <Row className={styles.itemContainer}>
                <Col span={7}>
                  <Typography.Text className={styles.label}>
                    Mã dịch vụ:
                  </Typography.Text>
                </Col>
                <Col span={17}>
                  <Typography.Text className={styles.text}>
                    {service?.code}
                  </Typography.Text>
                </Col>
              </Row>
              <Row className={styles.itemContainer}>
                <Col span={7}>
                  <Typography.Text className={styles.label}>
                    Tên dịch vụ:
                  </Typography.Text>
                </Col>
                <Col span={17}>
                  <Typography.Text className={styles.text}>
                    {service?.name}
                  </Typography.Text>
                </Col>
              </Row>
              <Row className={styles.itemContainer}>
                <Col span={7}>
                  <Typography.Text className={styles.label}>
                    Mô tả:
                  </Typography.Text>
                </Col>
                <Col span={17}>
                  <Typography.Text className={styles.text}>
                    {service?.description}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
            <Title className={clsx(styles.title, styles.title2)}>
              Quy tắc cấp số
            </Title>
            <div className={styles.itemWrapper}>
              <Row className={styles.itemContainer}>
                <Col span={7}>
                  <Typography.Text className={styles.label}>
                    Tăng tự động:
                  </Typography.Text>
                </Col>
                <Col span={17}>
                  <Input
                    className={styles.inputValue}
                    readOnly
                    value={service?.increaseStart}
                    size="large"
                  />
                  <Typography.Text
                    className={styles.text}
                    style={{ margin: "0 8px" }}
                  >
                    đến
                  </Typography.Text>
                  <Input
                    className={styles.inputValue}
                    readOnly
                    value={service?.increaseEnd}
                    size="large"
                  />
                </Col>
              </Row>
              <Row className={styles.itemContainer}>
                <Col span={7}>
                  <Typography.Text className={styles.label}>
                    Prefix:
                  </Typography.Text>
                </Col>
                <Col span={17}>
                  <Input
                    className={styles.inputValue}
                    readOnly
                    value={service?.prefix}
                    size="large"
                  />
                </Col>
              </Row>
              <Row className={styles.itemContainer}>
                <Col span={24}>
                  <Typography.Text className={styles.label}>
                    Reset mỗi ngày
                  </Typography.Text>
                </Col>
                <Col span={24}>
                  <Typography.Text className={styles.text}>
                    Ví dụ: 201 - 2001
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={14}>
          <Card className={styles.card}>
            <Form layout="vertical">
              <Row justify="space-between" className={styles.inputContainer2}>
                <Col span={24}>
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Item
                      label={
                        <Typography.Text className={styles.label}>
                          Trạng thái
                        </Typography.Text>
                      }
                      className={styles.selectContianer}
                    >
                      <Select
                        size="large"
                        defaultValue={null}
                        value={status}
                        onChange={(value) => setStatus(value)}
                        suffixIcon={
                          <CaretDownOutlined
                            style={{
                              fontSize: "20px",
                              color: "#FF7506",
                            }}
                          />
                        }
                      >
                        <Option value={null}>Tất cả</Option>
                        <Option value="used">Đã hoàn thành</Option>
                        <Option value="waiting">Đang thực hiện</Option>
                        <Option value="skip">Vắng</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={
                        <Typography.Text className={styles.label}>
                          Chọn thời gian{" "}
                        </Typography.Text>
                      }
                    >
                      <Form.Item noStyle>
                        <DatePicker size="large" style={{ width: "150px" }} />
                      </Form.Item>
                      <CaretRightOutlined
                        style={{
                          margin: "0 4px",
                          fontSize: "10px",
                        }}
                      />
                      <Form.Item noStyle>
                        <DatePicker size="large" style={{ width: "150px" }} />
                      </Form.Item>
                    </Form.Item>
                    <Form.Item
                      label={
                        <Typography.Text className={styles.label}>
                          Từ khóa
                        </Typography.Text>
                      }
                    >
                      <SearchInput
                        placeholder="Nhập từ khóa"
                        onSearch={setKeywords}
                      />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    columns={columns}
                    loading={loading}
                    dataSource={providerNumbersFilter.map((providerNumber) => {
                      return {
                        key: providerNumber.id,
                        stt: providerNumber.number,
                        status: (
                          <Status
                            type={
                              providerNumber.status == "skip"
                                ? "error"
                                : providerNumber.status
                            }
                            text={
                              providerNumber.status == "waiting"
                                ? "Đang thực hiện"
                                : providerNumber.status == "used"
                                ? "Đã hoàn thành"
                                : "Vắng"
                            }
                          />
                        ),
                      };
                    })}
                    bordered
                    size="middle"
                    pagination={{
                      position: ["bottomRight"],
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col span={2}>
          <ActionButton
            data={[
              {
                text: "Cập nhật danh sách",
                icon: <EditOutlined />,
                onClick: () => navigate(`../edit/${service?.id}`),
              },
              {
                text: "Quay lại",
                icon: <RollbackOutlined />,
                onClick: () => navigate("../"),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DetailService;
