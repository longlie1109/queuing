import { useEffect } from "react";
import { RollbackOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import clsx from "clsx";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  providerNumberSelector,
  get,
} from "../../../../store/reducers/providerNumberSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import styles from "../Provider.module.scss";

const DetailDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, providerNumber } = useAppSelector(providerNumberSelector);

  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
  }, [id]);

  return (
    <div className={styles.section}>
      <Typography.Title className={styles.title}>
        Quản lý cấp số
      </Typography.Title>
      <Row>
        <Col span={22}>
          <Card className={styles.card}>
            <Typography.Title className={clsx(styles.title, styles.title3)}>
              Thông tin cấp số
            </Typography.Title>

            <Row gutter={24}>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Họ tên:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.name}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Nguồn cấp:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.src}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Tên dịch vụ:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.service}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Trạng thái:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber ? (
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
                      ) : (
                        ""
                      )}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Số thứ tự:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.number}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Số điện thoại:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.phoneNumber}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Thời gian cấp:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {moment(providerNumber?.timeGet.toDate()).format(
                        "HH:mm - DD/MM/YYYY"
                      )}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Địa chỉ Email:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {providerNumber?.email}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className={styles.itemContainer}>
                  <Col span={6}>
                    <Typography.Text className={styles.label}>
                      Hạn sử dụng:
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <Typography.Text className={styles.text}>
                      {moment(providerNumber?.timeExp.toDate()).format(
                        "HH:mm - DD/MM/YYYY"
                      )}
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

export default DetailDevice;
