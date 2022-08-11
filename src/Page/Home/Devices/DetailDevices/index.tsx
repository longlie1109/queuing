import { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { deviceSelector, get } from "../../../../store/reducers/deviceSlice";
import {
  serviceSelector,
  getAll as getAllService,
} from "../../../../store/reducers/serviceSlice";
import ActionButton from "../../../components/ActionButton";
import styles from "../Devices.module.scss";

const DetailDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, device } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);

  useEffect(() => {
    if (id) {
      dispatch(get(id));
      dispatch(getAllService());
    }
  }, [id]);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title}>
        Quản lý thiết bị
      </Typography.Title>
      <Row>
        <Col span={22}>
          <Card className={styles.card}>
            <Typography.Title className={clsx(styles.title, styles.title2)}>
              Thông tin thiết bị
            </Typography.Title>
            <Row gutter={24}>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Mã thiết bị:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.code}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Loại thiết bị:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.type}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Tên thiết bị:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.name}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Tên đăng nhập:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.username}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Địa chỉ IP:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.ip}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Mật khẩu:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {device?.password}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className={styles.itemContainer}>
                  <Col span={24}>
                    <Typography.Text className={styles.label}>
                      Dịch vụ sử dụng:
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text className={styles.text}>
                      {device?.services
                        .map((value) => {
                          return services.find((service) => service.id == value)
                            ?.name;
                        })
                        .join(", ")}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={2}>
          <ActionButton
            data={[
              {
                text: "Cập nhật thiết bị",
                icon: <EditOutlined />,
                onClick: () => navigate(`../edit/${device?.id}`),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DetailDevice;
