import { useEffect, useState } from "react";
import { Col, Form, Row, Table, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../../../store";
import {
  providerNumberSelector,
  getAll,
} from "../../../../store/reducers/providerNumberSlice";
import Status from "../../../components/Status";
import ActionButton from "../../../components/ActionButton";
import DatePicker from "../../../components/DateRange";
import styles from "../Report.module.scss";

const columns = [
  {
    title: "Số thứ tự",
    key: "stt",
    dataIndex: "stt",
  },
  {
    title: "Tên dịch vụ",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Thời gian cấp",
    key: "time",
    dataIndex: "time",
  },
  {
    title: "Tình trạng",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Nguồn cấp",
    key: "src",
    dataIndex: "src",
  },
];

const ReportTable = () => {
  const dispatch = useAppDispatch();
  const { loading, providerNumbers } = useAppSelector(providerNumberSelector);
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);

  useEffect(() => {
    dispatch(
      getAll({
        keywords: "",
        dateRange: dateRange
          ? [dateRange[0] as Moment, dateRange[1] as Moment]
          : null,
      })
    );
  }, [dateRange]);

  return (
    <div className={styles.section}>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Form.Item
              label={
                <Typography.Text className={styles.label}>
                  Chọn thời gian{" "}
                </Typography.Text>
              }
            >
              <DatePicker onChange={setDateRange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Table
              columns={columns}
              loading={loading}
              dataSource={providerNumbers.map((providerNumber) => {
                return {
                  key: providerNumber.id,
                  stt: providerNumber.number,
                  name: providerNumber.service,
                  time: moment(providerNumber.timeGet.toDate()).format(
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
                  text: "Tải về",
                  icon: <DownloadOutlined />,
                  onClick: () => {
                    const excel = new Excel();
                    excel
                      .addSheet("Report")
                      .addColumns([
                        ...columns,
                        {
                          title: "Họ tên",
                          key: "customer",
                          dataIndex: "customer",
                        },
                        {
                          title: "Số điện thoại",
                          key: "phoneNumber",
                          dataIndex: "phoneNumber",
                        },
                        {
                          title: "Email",
                          key: "email",
                          dataIndex: "email",
                        },
                      ])
                      .addDataSource(
                        providerNumbers.map((providerNumber) => {
                          return {
                            key: providerNumber.id,
                            stt: providerNumber.number,
                            name: providerNumber.service,
                            time: moment(
                              providerNumber.timeGet.toDate()
                            ).format("HH:mm - DD/MM/YYYY"),
                            status:
                              providerNumber.status == "waiting"
                                ? "Đang chờ"
                                : providerNumber.status == "used"
                                ? "Đã sử dụng"
                                : "Bỏ qua",
                            src: providerNumber.src,
                            customer: providerNumber.name,
                            phoneNumber: providerNumber.phoneNumber,
                            email: providerNumber.email,
                          };
                        }),
                        {
                          str2Percent: true,
                        }
                      )
                      .saveAs("Report.xlsx");
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ReportTable;
