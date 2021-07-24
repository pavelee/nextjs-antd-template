import { useState, Children, cloneElement } from "react";
import { Layout } from "antd";
import { SideMenu } from './menu/sideMenu';

const { Content, Footer, Sider } = Layout;

const Dashboard = (props) => {
    const [currentMenuItem, setCurrentMenuItem] = useState("dashboard");
    const [currentMenuOpenKeys, setCurrentMenuOpenKeys] = useState([]);
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
                        setCurrentMenuItem={setCurrentMenuItem}
                        currentMenuOpenKeys={currentMenuOpenKeys}
                        setCurrentMenuOpenKeys={setCurrentMenuOpenKeys}
                        menuItems={menuItems}
                    />
                </Sider>
                <Layout>
                    <Content>
                        <div
                            style={{ padding: 24 }}
                        >
                            {Children.map(children, (child) => {
                                return cloneElement(child, {
                                    setCurrentMenuItem: setCurrentMenuItem,
                                    setCurrentMenuOpenKeys: setCurrentMenuOpenKeys,
                                });
                            })}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Template App
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};

export default Dashboard;
