import { useEffect, useState } from "react";
import {
  Calendar,
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { DatePicker as AntDatePicker, Popover, Space } from "antd";
import { CalendarOutlined, CaretRightOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";

interface IDateRange {
  value?: RangeValue<Moment>;
  onChange?: (value: RangeValue<Moment>) => void;
}

const DateRange = (props: IDateRange) => {
  const [value, setValue] = useState<RangeValue<Moment>>(null);
  const [calendarValue, setCalendarValue] = useState<DayRange>({
    from: null,
    to: null,
  });

  useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (value === null || value === undefined) return;
    props.onChange?.(value);
  }, [value]);

  const handleOnchangeCalendar = (e: DayRange) => {
    setCalendarValue(e);
    if (e.to && e.from) {
      setValue([
        moment({ ...e.from, month: e.from.month - 1 }),
        moment({ ...e.to, month: e.to.month - 1 }),
      ]);
    }
  };

  const handleOnChangeFrom = (e: Moment | null) => {
    if (value) {
      setValue([e, value[1]]);

      if (e) {
        const time = moment(e).toObject();
        setCalendarValue((pre) => ({
          ...pre,
          from: {
            day: time.date,
            month: time.months,
            year: time.years,
          },
        }));
      } else {
        setCalendarValue((pre) => ({
          ...pre,
          from: null,
        }));
      }
    } else {
      setValue(null);
    }
  };

  const handleOnChangeTo = (e: Moment | null) => {
    if (value) {
      setValue([value[0], e]);

      if (e) {
        const time = moment(e).toObject();
        setCalendarValue((pre) => ({
          ...pre,
          to: {
            day: time.date,
            month: time.months,
            year: time.years,
          },
        }));
      } else {
        setCalendarValue((pre) => ({
          ...pre,
          to: null,
        }));
      }
    } else {
      setValue(null);
    }
  };

  const calenderContent = (
    <Calendar
      value={calendarValue}
      onChange={(e) => handleOnchangeCalendar(e)}
      colorPrimary="#FF7506"
      colorPrimaryLight="#FFF2E7"
    />
  );

  return (
    <Popover
      trigger="click"
      overlayInnerStyle={{ borderRadius: 20 }}
      content={calenderContent}
    >
      <Space size={4}>
        <AntDatePicker
          value={value ? value[0] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeFrom}
          suffixIcon={<CalendarOutlined style={{ color: "#FF7506" }} />}
          format="DD/MM/YYYY"
          style={{ width: 150 }}
        />
        <CaretRightOutlined
          style={{
            margin: "0 4px",
            fontSize: "10px",
          }}
        />
        <AntDatePicker
          value={value ? value[1] : undefined}
          size="large"
          panelRender={() => undefined}
          onChange={handleOnChangeTo}
          suffixIcon={<CalendarOutlined style={{ color: "#FF7506" }} />}
          format="DD/MM/YYYY"
          style={{ width: 150 }}
        />
      </Space>
    </Popover>
  );
};

export default DateRange;
