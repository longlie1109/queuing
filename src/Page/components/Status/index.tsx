import { Badge, Typography } from "antd";
import styles from "./Status.module.scss";

interface props {
  type: "success" | "waiting" | "error" | "used";
  text: string;
}

var color = {
  success: "#34CD26",
  waiting: "#4277FF",
  used: "#7E7D88",
  error: "#EC3740",
};

const index = ({ text, type }: props) => {
  return (
    <div className={styles.container}>
      <Badge
        color={color[type]}
        text={<Typography.Text className={styles.text}>{text}</Typography.Text>}
      />
    </div>
  );
};

export default index;
