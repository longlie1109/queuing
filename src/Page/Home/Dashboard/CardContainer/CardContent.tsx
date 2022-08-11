import { Card, Space, Tag, Typography } from "antd";
import React from "react";
import styles from "./CardContainer.module.scss";

interface ICardContainer {
  icon: React.ReactNode;
  tag: {
    color: string;
    number: number;
  };
  title: string;
  number: number;
}

const CardContent = ({ icon, title, number, tag }: ICardContainer) => {
  return (
    <Card className={styles.cardContainer} bodyStyle={{ padding: "12px" }}>
      <Space size={12}>
        {icon}
        <Typography.Text className={styles.text}>{title}</Typography.Text>
      </Space>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <Typography.Text className={styles.number}>{number}</Typography.Text>
        <Tag
          className={styles.tag}
          style={{
            backgroundColor: "rgba(255, 149, 1, 0.15)",
            color: tag.color,
          }}
        >
          {tag.number}%
        </Tag>
      </Space>
    </Card>
  );
};

export default CardContent;
