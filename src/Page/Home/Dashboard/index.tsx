import { useEffect, useMemo, useState } from "react";
import { Card, Col, Layout, Row, Select, Space, Typography } from "antd";
import {
  DesktopOutlined,
  CalendarOutlined,
  CaretDownOutlined,
  CustomerServiceOutlined,
  CarryOutOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Calendar,
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { Area } from "@ant-design/plots";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  providerNumberSelector,
  getAll,
} from "../../../store/reducers/providerNumberSlice";
import {
  deviceSelector,
  getAll as getAllDevice,
} from "../../../store/reducers/deviceSlice";
import {
  serviceSelector,
  getAll as getAllService,
} from "../../../store/reducers/serviceSlice";
import CardContent from "./CardContainer/CardContent";
import CardSideBar from "./CardContainer/CardSideBar";
import styles from "./Dashboard.module.scss";

const { Sider, Content } = Layout;
const { Option } = Select;

const iconCardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "48px",
  width: "48px",
  fontSize: "24px",
  borderRadius: "50%",
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { providerNumbers } = useAppSelector(providerNumberSelector);
  const { devices } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const [chartData, setChartData] = useState("date");
  const [calendarValue, setCalendarValue] = useState<DayRange>({
    from: null,
    to: null,
  });

  const data = useMemo(() => {
    let start = calendarValue.from ? calendarValue.from.day : 0;
    let end = calendarValue.to ? calendarValue.to.day : 30;
    let month = calendarValue.to
      ? calendarValue.to.month
      : new Date().getMonth() + 1;
    let data1 = [];
    switch (chartData) {
      case "date":
        for (let i = start; i <= end; i++) {
          data1.push({
            xField: i,
            value: providerNumbers.filter((providerNumber) => {
              return (
                providerNumber.timeGet.toDate().getDate() === i &&
                providerNumber.timeGet.toDate().getMonth() + 1 == month
              );
            }).length,
          });
        }
        return data1;
      case "week":
        for (let i = 1; i <= 5; i++) {
          data1.push({
            xField: "Tuần " + i,
            value: providerNumbers.filter((providerNumber) => {
              return (
                providerNumber.timeGet.toDate().getMonth() + 1 == month &&
                providerNumber.timeGet.toDate().getDate() > (i - 1) * 7 &&
                providerNumber.timeGet.toDate().getDate() <= i * 7
              );
            }).length,
          });
        }
        return data1;
      default:
        for (let i = 1; i <= 12; i++) {
          data1.push({
            xField: i,
            value: providerNumbers.filter((providerNumber) => {
              return providerNumber.timeGet.toDate().getMonth() + 1 === i;
            }).length,
          });
        }
        console.log(data1);
        return data1;
    }
  }, [chartData, calendarValue, providerNumbers]);

  const config = {
    data,
    xField: "xField",
    yField: "value",
    smooth: true,
    xAxis: {
      range: [0, 1],
    },
    tooltip: {
      position: "top" as "left" | "right" | "top" | "bottom" | undefined,
      domStyles: {
        "g2-tooltip": {
          width: "100px",
          padding: "5px",
          backgroundColor: "#5185F7",
          borderRadius: "8px",
          color: "#fff",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 700,
        },
      },
      customContent: (title: any, items: any): any => {
        return <span>{items[0]?.value}</span>;
      },
    },
    areaStyle: () => {
      return {
        fill: "l(90) 0:#5185F7 0.5:#5185F7 1:#fff",
      };
    },
  };

  useEffect(() => {
    dispatch(getAll());
    dispatch(getAllService());
    dispatch(getAllDevice());
  }, []);

  return (
    <Layout>
      <Content style={{ marginRight: 410 }}>
        <div className={styles.contentContainer}>
          <Typography.Title className={styles.title}>
            Biểu đồ cấp số
          </Typography.Title>
          <Row gutter={12}>
            <Col span={6}>
              <CardContent
                icon={
                  <CalendarOutlined
                    style={{
                      ...iconCardStyle,
                      backgroundColor: "rgba(100, 147, 249, 0.2)",
                      color: "#6493F9",
                    }}
                  />
                }
                title={"Số thứ tự đã cấp"}
                number={providerNumbers.length}
                tag={{
                  color: "#FF9138",
                  number: 32.41,
                }}
              />
            </Col>
            <Col span={6}>
              <CardContent
                icon={
                  <CarryOutOutlined
                    style={{
                      ...iconCardStyle,
                      backgroundColor: "rgb(53, 199, 90, 0.2)",
                      color: "#35C75A",
                    }}
                  />
                }
                title={"Số thứ tự đã sử dụng"}
                number={
                  providerNumbers.filter((value) => value.status === "used")
                    .length
                }
                tag={{
                  color: "#E73F3F",
                  number: 32.41,
                }}
              />
            </Col>
            <Col span={6}>
              <CardContent
                icon={
                  <CustomerServiceOutlined
                    style={{
                      ...iconCardStyle,
                      backgroundColor: "rgba(255, 172, 106, 0.2)",
                      color: "#FFAC6A",
                    }}
                  />
                }
                title={"Số thứ tự đang chờ"}
                number={
                  providerNumbers.filter((value) => value.status === "waiting")
                    .length
                }
                tag={{
                  color: "#FF9138",
                  number: 32.41,
                }}
              />
            </Col>
            <Col span={6}>
              <CardContent
                icon={
                  <StarOutlined
                    style={{
                      ...iconCardStyle,
                      backgroundColor: "rgba(248, 109, 109, 0.2)",
                      color: "#F86D6D",
                    }}
                  />
                }
                title={"Số thứ tự đã bỏ qua"}
                number={
                  providerNumbers.filter((value) => value.status === "skip")
                    .length
                }
                tag={{
                  color: "#E73F3F",
                  number: 32.41,
                }}
              />
            </Col>
          </Row>
          <Card className={styles.chartContainer}>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Space direction="vertical">
                <Typography.Title className={styles.title}>
                  Bảng thống kê theo{" "}
                  {chartData == "date"
                    ? "ngày"
                    : chartData == "week"
                    ? "tuần"
                    : "tháng"}
                </Typography.Title>
                <Typography.Text className={styles.text}>
                  {chartData == "month"
                    ? "Năm "
                    : "Tháng " +
                      (calendarValue.to
                        ? calendarValue.to.month
                        : new Date().getMonth() + 1) +
                      "/"}
                  2022
                </Typography.Text>
              </Space>
              <Space
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography.Text className={styles.label}>
                  Xem theo
                </Typography.Text>
                <Select
                  className={styles.selectContianer}
                  size="large"
                  onChange={(value) => setChartData(value)}
                  value={chartData}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{
                        fontSize: "20px",
                        color: "#FF7506",
                      }}
                    />
                  }
                >
                  <Option value="date">Ngày</Option>
                  <Option value="week">Tuần</Option>
                  <Option value="month">Tháng</Option>
                </Select>
              </Space>
            </Space>
            <Area {...config} style={{ height: "300px" }} />
          </Card>
        </div>
      </Content>
      <Sider
        width={410}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={styles.sidebarContainer}>
          <Typography.Title className={styles.title}>
            Tổng quan
          </Typography.Title>
          <CardSideBar
            icon={<DesktopOutlined style={{ color: "#FF7506" }} />}
            percent={90}
            color={"#FF7506"}
            title={"Thiết bị"}
            quantity={devices.length}
            data={[
              {
                type: "success",
                text: "Đang hoạt động",
                number: devices.filter((device) => device.isActive === true)
                  .length,
              },
              {
                type: "used",
                text: "Ngưng hoạt động",
                number: devices.filter((device) => device.isActive === false)
                  .length,
              },
            ]}
          />
          <CardSideBar
            icon={<DesktopOutlined style={{ color: "#4277FF" }} />}
            percent={76}
            color={"#4277FF"}
            title={"Dịch vụ"}
            quantity={services.length}
            data={[
              {
                type: "success",
                text: "Đang hoạt động",
                number: services.filter((service) => service.isActive === true)
                  .length,
              },
              {
                type: "used",
                text: "Ngưng hoạt động",
                number: services.filter((service) => service.isActive === false)
                  .length,
              },
            ]}
          />
          <CardSideBar
            icon={<DesktopOutlined style={{ color: "#35C75A" }} />}
            percent={86}
            color={"#35C75A"}
            title={"Cấp số"}
            quantity={providerNumbers.length}
            data={[
              {
                type: "success",
                text: "Đã sử dụng",
                number: providerNumbers.filter(
                  (providerNumber) => providerNumber.status === "used"
                ).length,
              },
              {
                type: "used",
                text: "Đang chờ",
                number: providerNumbers.filter(
                  (providerNumber) => providerNumber.status === "waiting"
                ).length,
              },
              {
                type: "error",
                text: "Bỏ qua",
                number: providerNumbers.filter(
                  (providerNumber) => providerNumber.status === "skip"
                ).length,
              },
            ]}
          />
          <div className={styles.calendarContainer}>
            <Calendar
              calendarClassName={styles.calendar}
              value={calendarValue}
              onChange={(e) => setCalendarValue(e)}
              colorPrimary="#FF7506"
              colorPrimaryLight="#FFF2E7"
            />
          </div>
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
