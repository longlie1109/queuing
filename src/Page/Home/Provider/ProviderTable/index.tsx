import { useEffect, useState } from "react";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Space, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  providerNumberSelector,
  getAll,
} from "../../../../store/reducers/providerNumberSlice";
import {
  serviceSelector,
  getAll as getAllService,
} from "../../../../store/reducers/serviceSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import SearchInput from "../../../components/SearchInput";
import DatePicker from "../../../components/DateRange";
import styles from "../Provider.module.scss";

const { Option } = Select;

const columns = [
  {
    title: "STT",
    key: "stt",
    dataIndex: "stt",
  },
  {
    title: "Tên khách hàng",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Tên dịch vụ",
    key: "nameService",
    dataIndex: "nameService",
  },
  {
    title: "Thời gian cấp",
    key: "time",
    dataIndex: "time",
  },
  {
    title: "Hạn sử dụng",
    key: "timeExp",
    dataIndex: "timeExp",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Nguồn cấp",
    key: "src",
    dataIndex: "src",
  },
  {
    title: "",
    key: "detail",
    dataIndex: "detail",
  },
];

const ProviderTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, providerNumbers } = useAppSelector(providerNumberSelector);
  const { services } = useAppSelector(serviceSelector);
  const [status, setStatus] = useState<string | null>(null);
  const [src, setSrc] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);

  useEffect(() => {
    dispatch(
      getAll({
        status,
        src,
        service,
        keywords,
        dateRange: dateRange
          ? [dateRange[0] as Moment, dateRange[1] as Moment]
          : null,
      })
    );
  }, [status, src, service, keywords, dateRange]);

  useEffect(() => {
    dispatch(getAllService());
  }, []);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title} level={2}>
        Quản lý cấp số
      </Typography.Title>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
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
                    Tên dịch vụ
                  </Typography.Text>
                }
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={""}
                  value={service}
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
                  <Option value={""}>Tất cả</Option>
                  {services.map((service) => {
                    return <Option value={service.id}>{service.name}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text className={styles.label}>
                    Tình trạng
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
                  <Option value="waiting">Đang chờ</Option>
                  <Option value="used">Đã sử dụng</Option>
                  <Option value="skip">Bỏ qua</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text className={styles.label}>
                    Nguồn cấp
                  </Typography.Text>
                }
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={""}
                  value={src}
                  onChange={(value) => setSrc(value)}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{
                        fontSize: "20px",
                        color: "#FF7506",
                      }}
                    />
                  }
                >
                  <Option value={""}>Tất cả</Option>
                  <Option value="Kisok">Kisok</Option>
                  <Option value="Hệ thống">Hệ thống</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text className={styles.label}>
                    Chọn thời gian{" "}
                  </Typography.Text>
                }
              >
                <DatePicker onChange={setDateRange} />
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
      </Form>
      <Row>
        <Col flex="auto">
          <Table
            columns={columns}
            loading={loading}
            dataSource={providerNumbers.map((providerNumber) => {
              return {
                key: providerNumber.id,
                stt: providerNumber.number,
                name: providerNumber.name,
                nameService: providerNumber.service,
                time: moment(providerNumber.timeGet.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                ),
                timeExp: moment(providerNumber.timeExp.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                ),
                status: (
                  <Status
                    type={
                      providerNumber.status == "skip"
                        ? "error"
                        : providerNumber.status
                    }
                    text={
                      providerNumber.status == "waiting"
                        ? "Đang chờ"
                        : providerNumber.status == "used"
                        ? "Đã sử dụng"
                        : "Bỏ qua"
                    }
                  />
                ),
                src: providerNumber.src,
                detail: (
                  <Link
                    to={`./detail/${providerNumber.id}`}
                    className={styles.link}
                  >
                    Chi tiết
                  </Link>
                ),
              };
            })}
            bordered
            size="middle"
            pagination={{
              defaultPageSize: 8,
              position: ["bottomRight"],
              showLessItems: true,
              showSizeChanger: false,
            }}
          />
        </Col>
        <Col flex="100px">
          <ActionButton
            data={[
              {
                text: "Cấp số mới",
                icon: <PlusOutlined />,
                onClick: () => navigate("../new"),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProviderTable;
