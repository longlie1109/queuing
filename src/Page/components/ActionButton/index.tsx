import React from "react";
import { Button, Typography } from "antd";
import styles from "./ActionButton.module.scss";

type dataType = {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
};
interface propType {
  data: dataType[];
}
const ActionButton = ({ data }: propType) => {
  return (
    <div className={styles.container}>
      {data.map((prop) => (
        <div className={styles.containerItem} onClick={prop.onClick}>
          <Button
            type="primary"
            className={styles.iconNotify}
            icon={prop.icon}
          />
          <Typography.Title className={styles.text}>
            {prop.text}
          </Typography.Title>
        </div>
      ))}
    </div>
  );
};

export default ActionButton;
