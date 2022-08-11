import { useEffect, useState } from "react";
import { Col, Form, Row, Table, Typography } from "antd";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { diarySelector, getAll } from "../../../../store/reducers/diarySlice";
import SearchInput from "../../../components/SearchInput";
import DatePicker from "../../../components/DateRange";
import styles from "./HistoryUser.module.scss";

const columns = [
  {
    title: "Tên đăng nhập",
    key: "username",
    dataIndex: "username",
  },

  {
    title: "Thời gian tác động",
    key: "time",
    dataIndex: "time",
  },

  {
    title: "IP thực hiện",
    key: "ip",
    dataIndex: "ip",
  },

  {
    title: "Thao tác thực hiện",
    key: "active",
    dataIndex: "actionImplemented",
  },
];

const HistoryUserTable = () => {
  const dispatch = useAppDispatch();
  const { loading, diaries } = useAppSelector(diarySelector);
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);

  useEffect(() => {
    dispatch(
      getAll({
        keywords,
        dateRange: dateRange
          ? [dateRange[0] as Moment, dateRange[1] as Moment]
          : null,
      })
    );
  }, [keywords, dateRange]);

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
        <Row>
          <Col flex="auto">
            <Table
              columns={columns}
              loading={loading}
              dataSource={diaries.map((diary) => ({
                key: diary.id,
                username: diary.username,
                time: moment(diary.time.toDate()).format("HH:mm - DD/MM/YYYY"),
                ip: diary.ip,
                actionImplemented: diary.action,
              }))}
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
          <Col flex="100px"></Col>
        </Row>
      </Form>
    </div>
  );
};

export default HistoryUserTable;
