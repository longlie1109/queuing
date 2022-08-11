import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Space, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  serviceSelector,
  getAll,
} from "../../../../store/reducers/serviceSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import SearchInput from "../../../components/SearchInput";
import DatePicker from "../../../components/DateRange";
import styles from "../Services.module.scss";

const { Option } = Select;

const columns = [
  {
    title: "Mã dịch vụ",
    key: "id",
    dataIndex: "id",
  },

  {
    title: "Tên dịch vụ",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },

  {
    title: "Trạng thái hoạt động",
    key: "active",
    dataIndex: "active",
  },
  {
    title: "",
    key: "detail",
    dataIndex: "detail",
  },
  {
    title: "",
    key: "update",
    dataIndex: "update",
  },
];

const ServicesTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, services } = useAppSelector(serviceSelector);
  const [active, setActive] = useState<boolean | null>(null);
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);

  useEffect(() => {
    dispatch(
      getAll({
        active,
        keywords,
        dateRange: dateRange
          ? [dateRange[0] as Moment, dateRange[1] as Moment]
          : null,
      })
    );
  }, [active, keywords, dateRange]);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title}>
        Quản lý dịch vụ
      </Typography.Title>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                label={
                  <Typography.Text className={styles.label}>
                    Trạng thái hoạt động
                  </Typography.Text>
                }
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  value={active}
                  onChange={(value) => setActive(value)}
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
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động</Option>
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
            </Space>
          </Col>
          <Col flex="300px">
            <Form.Item
              label={
                <Typography.Text className={styles.label}>
                  Từ khóa
                </Typography.Text>
              }
            >
              <SearchInput placeholder="Nhập từ khóa" onSearch={setKeywords} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col flex="auto">
          <Table
            columns={columns}
            loading={loading}
            dataSource={services.map((service) => {
              return {
                key: service.id,
                id: service.code,
                name: service.name,
                description: service.description,
                active: (
                  <Status
                    type={service.isActive ? "success" : "error"}
                    text={service.isActive ? "Hoạt động" : "Ngưng hoạt động"}
                  />
                ),
                detail: (
                  <Link to={`./detail/${service.id}`} className={styles.link}>
                    Chi tiết
                  </Link>
                ),
                update: (
                  <Link to={`./edit/${service.id}`} className={styles.link}>
                    Cập nhật
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
                text: "Thêm dịch vụ",
                icon: <PlusOutlined />,
                onClick: () => navigate("../add"),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ServicesTable;
