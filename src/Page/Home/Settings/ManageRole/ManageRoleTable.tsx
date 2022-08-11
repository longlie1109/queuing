import { useEffect, useState } from "react";
import { Col, Form, Row, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../../store";
import { roleSelector, getAll } from "../../../../store/reducers/roleSlice";
import ActionButton from "../../../components/ActionButton";
import SearchInput from "../../../components/SearchInput";
import styles from "./ManageRole.module.scss";
import { Link, useNavigate } from "react-router-dom";

const columns = [
    {
        title: "Tên vai trò",
        key: "name",
        dataIndex: "name",
    },

    {
        title: "Số người dùng",
        key: "amountOfUser",
        dataIndex: "amountOfUser",
    },

    {
        title: "Mô tả",
        key: "description",
        dataIndex: "description",
    },
    {
        title: "",
        key: "update",
        dataIndex: "update",
    },
];
const ManageRoleTable = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, roles } = useAppSelector(roleSelector);
    const [keywords, setKeywords] = useState<string>("");

    useEffect(() => {
        dispatch(getAll({ keywords }));
    }, [keywords]);

    return (
        <div className={styles.section}>
            <Form layout="vertical">
                <Row justify="space-between" className={styles.inputContainer}>
                    <Col>
                        <Typography.Title level={2} className={styles.title}>
                            Danh sách vai trò
                        </Typography.Title>
                    </Col>

                    <Col flex="300px">
                        <Form.Item
                            label={
                                <Typography.Text className={styles.label}>
                                    Từ khóa
                                </Typography.Text>
                            }
                        >
                            <SearchInput
                                placeholder="Nhập từ khóa"
                                onSearch={setKeywords}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col flex="auto">
                        <Table
                            columns={columns}
                            loading={loading}
                            dataSource={roles.map((role) => ({
                                key: role.id,
                                ...role,
                                update: (
                                    <Link
                                        to={`./edit/${role.id}`}
                                        className={styles.link}
                                    >
                                        Cập nhật
                                    </Link>
                                ),
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
                    <Col flex="100px">
                        <ActionButton
                            data={[
                                {
                                    text: "Thêm vai trò",
                                    icon: <PlusOutlined />,
                                    onClick: () => navigate("../add"),
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ManageRoleTable;

