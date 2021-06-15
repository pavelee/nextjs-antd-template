import { useState, useEffect, Children, cloneElement } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const SideMenu = (props) => {
    const { currentMenuItem, menuItems, logoutHandler } = props;

    return (
        <Menu theme="dark" mode="inline" selectedKeys={[currentMenuItem]}>
            {menuItems.map((menuItem) => (
                <Menu.Item key={menuItem.key} icon={<UserOutlined />}>
                    <Link href={menuItem.href}>
                        <a>{menuItem.title}</a>
                    </Link>
                </Menu.Item>
            ))}
            <Menu.Item
                key={"logout"}
                icon={<LogoutOutlined />}
                onClick={() => {
                    logoutHandler();
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
};

const Dashboard = (props) => {
    const [currentMenuItem, setCurrentMenuItem] = useState("dashboard");
    const { children, logoutHandler, menuItems } = props;
    return (
        <>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {}}
                    onCollapse={(collapsed, type) => {}}
                >
                    <div className="logo" />
                    <SideMenu
                        logoutHandler={logoutHandler}
                        currentMenuItem={currentMenuItem}
                        menuItems={menuItems}
                    />
                </Sider>
                <Layout>
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            {Children.map(children, (child) => {
                                return cloneElement(child, {
                                    setCurrentMenuItem: setCurrentMenuItem,
                                });
                            })}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Elmo2.0 2021 Wiedza i Praktyka
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default Dashboard;
