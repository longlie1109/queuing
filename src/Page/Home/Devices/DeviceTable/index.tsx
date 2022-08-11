import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Space, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { deviceSelector, getAll } from "../../../../store/reducers/deviceSlice";
import {
  serviceSelector,
  getAll as getAllService,
} from "../../../../store/reducers/serviceSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import SearchInput from "../../../components/SearchInput";
import styles from "../Devices.module.scss";

const { Option } = Select;

const columns = [
  {
    title: "Mã thiết bị",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "Tên thiết bị",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ IP",
    key: "IPAddess",
    dataIndex: "IPAddess",
  },
  {
    title: "Trạng thái hoạt động",
    key: "active",
    dataIndex: "active",
  },
  {
    title: "Trạng thái kết nối",
    key: "connect",
    dataIndex: "connect",
  },
  {
    title: "Dịch vụ sửa dụng",
    key: "services",
    dataIndex: "services",
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

const DevicesTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, devices } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const [active, setActive] = useState<boolean | null>(null);
  const [connect, setConnect] = useState<boolean | null>(null);
  const [keywords, setKeywords] = useState<string>("");

  useEffect(() => {
    dispatch(
      getAll({
        active,
        connect,
        keywords,
      })
    );
  }, [active, connect, keywords]);

  useEffect(() => {
    dispatch(getAllService());
  }, []);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title}>
        Danh sách thiết bị
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
                    Trạng thái kết nối
                  </Typography.Text>
                }
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  value={connect}
                  onChange={(value) => setConnect(value)}
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
                  <Option value={true}>Kết nối</Option>
                  <Option value={false}>Mất kết nối</Option>
                </Select>
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
            dataSource={devices.map((device) => {
              return {
                key: device.id,
                id: device.code,
                name: device.name,
                IPAddess: device.ip,
                active: (
                  <Status
                    type={device.isActive ? "success" : "error"}
                    text={device.isActive ? "Hoạt động" : "Ngưng hoạt động"}
                  />
                ),
                connect: (
                  <Status
                    type={device.isConnect ? "success" : "error"}
                    text={device.isConnect ? "Hoạt động" : "Ngưng hoạt động"}
                  />
                ),
                services: device.services
                  .map((value) => {
                    return services.find((service) => service.id == value)
                      ?.name;
                  })
                  .join(", "),
                detail: (
                  <Link to={`./detail/${device.id}`} className={styles.link}>
                    Chi tiết
                  </Link>
                ),
                update: (
                  <Link to={`./edit/${device.id}`} className={styles.link}>
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
                text: "Thêm thiết bị",
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

export default DevicesTable;
