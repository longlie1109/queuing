import React from "react";
import { Card, Col, Progress, Row, Space, Typography } from "antd";
import Status from "../../../components/Status";
import styles from "./CardContainer.module.scss";

interface ICardContainer {
  icon: React.ReactNode;
  color: string;
  title: string;
  percent: number;
  quantity: number;
  data: {
    type: "waiting" | "used" | "success" | "error";
    text: string;
    number: number;
  }[];
}

const CardSideBar = ({
  icon,
  percent,
  color,
  title,
  quantity,
  data,
}: ICardContainer) => {
  return (
    <Card
      bodyStyle={{ padding: "0" }}
      style={{ marginBottom: "12px" }}
      className={styles.cardContainerSidebar}
    >
      <Row gutter={0}>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 0 12px 16px",
            }}
          >
            <Progress
              type="circle"
              percent={percent}
              className={styles.chartCircle}
              strokeColor={color}
            />
            <Space direction="vertical" size={0}>
              <Typography.Title className={styles.number}>
                {quantity}
              </Typography.Title>
              <Space size={4}>
                {icon}
                <span
                  style={{
                    color,
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </span>
              </Space>
            </Space>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              padding: "12px 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {data.map((value) => {
              return (
                <Row>
                  <Col span={18}>
                    <Status type={value.type} text={value.text} />
                  </Col>
                  <Col span={6}>
                    <span
                      style={{
                        color,
                        fontSize: "14px",
                        fontWeight: "700",
                      }}
                    >
                      {value.number}
                    </span>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CardSideBar;
