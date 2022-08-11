import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Avatar, Breadcrumb, Button, List, Space, Typography } from "antd";
import { BellFilled, RightOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  providerNumberSelector,
  getAll,
} from "../../../store/reducers/providerNumberSlice";
import { userSelector } from "../../../store/reducers/userSlice";
import avatarImage from "../../../Assets/avatar.svg";
import styles from "./Header.module.scss";
import clsx from "clsx";
import moment from "moment";

const { Title, Text } = Typography;

const routes: BreadcrumbsRoute[] = [
  {
    path: "/devices",
    breadcrumb: "Danh sách thiết bị",
    props: { root: true },
  },
  { path: "/devices/add", breadcrumb: "Thêm thiết bị" },
  { path: "/devices/detail/:id", breadcrumb: "Chi tiết thiết bị" },
  { path: "/devices/edit/:id", breadcrumb: "Cập nhật thiết bị" },

  {
    path: "/services",
    breadcrumb: "Danh sách dịch vụ ",
    props: { root: true },
  },
  {
    path: "/services/add",
    breadcrumb: "Thêm dịch vụ ",
  },
  {
    path: "/services/detail/:id",
    breadcrumb: "Chi tiết ",
  },
  {
    path: "/services/edit/:id",
    breadcrumb: "Cập nhật",
  },

  {
    path: "/provider",
    breadcrumb: "Danh sách cấp số",
    props: { root: true },
  },
  { path: "/provider/add", breadcrumb: "Cấp số mới" },
  { path: "/provider/detail/:id", breadcrumb: "Chi tiết" },

  { path: "/report", breadcrumb: "Lập báo cáo", props: { root: true } },

  {
    path: "/setting",
    breadcrumb: "Cài đặt hệ thống",
    props: { isNotLink: true },
  },
  { path: "/setting/roles", breadcrumb: "Quản lý vai trò" },
  { path: "/setting/roles/add", breadcrumb: "Thêm vai trò" },
  {
    path: "/setting/roles/edit/:id",
    breadcrumb: "Cập nhật vai trò",
  },

  { path: "/setting/accounts", breadcrumb: "Quản lý tài khoản" },
  { path: "/setting/accounts/add", breadcrumb: "Thêm tài khoản" },
  { path: "/setting/accounts/edit/:id", breadcrumb: "Cập nhật tài khoản" },
  { path: "/setting/history", breadcrumb: "Nhật ký người dùng" },
];

const breadcrumbNameMap: Record<string, string> = {
  "/devicesF": "Thiết bị",
  "/servicesF": "Dịch vụ",
  "/providerF": "Cấp số",
  "/reportF": "Báo cáo",
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, providerNumbers } = useAppSelector(providerNumberSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

  const extraBreadcrumbItems = breadcrumbs.map(
    ({ match, breadcrumb }, index) => {
      if (match.route?.props?.root) {
        return (
          <Fragment key={index}>
            <Breadcrumb.Item>
              <Link to={match.pathname}>
                {breadcrumbNameMap[match.pathname + "F"]}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={match.pathname}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          </Fragment>
        );
      }

      if (match.route?.props?.isNotLink) {
        return (
          <Breadcrumb.Item key={match.pathname}>{breadcrumb}</Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={match.pathname}>
          <Link to={match.pathname}>{breadcrumb}</Link>
        </Breadcrumb.Item>
      );
    }
  );

  const breadcrumbItems = useMemo(
    () =>
      location.pathname === "/dashboard"
        ? [
            <Breadcrumb.Item key="home">
              <Link to="/dashboard">Dashboard</Link>
            </Breadcrumb.Item>,
          ]
        : extraBreadcrumbItems,
    [location, extraBreadcrumbItems]
  );

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <div className={styles.header}>
      <Breadcrumb separator={<RightOutlined />}>{breadcrumbItems}</Breadcrumb>
      <div
        className={clsx(styles.headerRight, {
          [styles.withoutLogin]: !userLogin,
        })}
      >
        <div className={styles.notifyContainer}>
          <Button
            type="primary"
            className={styles.iconNotify}
            shape="circle"
            icon={<BellFilled />}
            onClick={() => setShowNotify(!showNotify)}
          />
          <List
            className={styles.notifyPopup}
            style={{ display: showNotify ? "block" : "none" }}
            header={
              <Typography.Title className={styles.title}>
                Thông báo
              </Typography.Title>
            }
            bordered
            dataSource={providerNumbers}
            renderItem={(item) => (
              <List.Item
                className={styles.item}
                onClick={() => {
                  navigate(`../provider/detail/${item.id}`);
                  setShowNotify(false);
                }}
              >
                <List.Item.Meta
                  title={
                    <Typography.Text
                      style={{
                        fontSize: "16px",
                        color: "#BF5805",
                      }}
                    >
                      Người dùng: {item.name}
                    </Typography.Text>
                  }
                  description={
                    <Typography.Text
                      style={{
                        fontSize: "16px",
                        color: "#535261",
                        fontWeight: 400,
                      }}
                    >
                      Thời gian nhận số:{" "}
                      {moment(item.timeGet.toDate()).format("HH:mm") +
                        " ngày " +
                        moment(item.timeGet.toDate()).format("DD/MM/YYYY")}
                    </Typography.Text>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <Link to="/info" className={styles.inforContainer}>
          <Avatar src={avatarImage} className={styles.avatar} />
          <Space size={0} direction="vertical" style={{ lineHeight: "18px" }}>
            <Text className={styles.text}>Xin chào</Text>
            <Text className={styles.nameUser}>{userLogin?.name}</Text>
          </Space>
        </Link>
      </div>
    </div>
  );
};

export default Header;
