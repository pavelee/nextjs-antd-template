import Link from "next/link";
import { Menu } from "antd";

export const SideMenu = (props) => {
    const {
        currentMenuItem,
        setCurrentMenuItem,
        currentMenuOpenKeys,
        setCurrentMenuOpenKeys,
        menuItems,
        logoutHandler,
    } = props;

    const changeCurrentMenuItem = (key, path) => {
        setCurrentMenuItem(key);
    };

    const changecurrentMenuOpenKeys = (key) => {
        let exists = false;
        if (currentMenuOpenKeys.length > 0) {
            currentMenuOpenKeys.forEach((openKey) => {
                if (openKey === key) {
                    exists = true;
                }
            });
        }
        if (exists === false) {
            setCurrentMenuOpenKeys([...currentMenuOpenKeys, key]);
        } else {
            let newKeys = currentMenuOpenKeys.filter((openKey) => {
                return openKey !== key;
            });
            setCurrentMenuOpenKeys(newKeys);
        }
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentMenuItem]}
            openKeys={currentMenuOpenKeys}
            onClick={(e) => {
                changeCurrentMenuItem(e.key, e.keyPath);
            }}
        >
            {menuItems.map((menuItem) => {
                if (menuItem.childs) {
                    return (
                        <Menu.SubMenu
                            key={menuItem.key}
                            title={menuItem.title}
                            icon={menuItem.icon ? menuItemChild.icon : null}
                            onTitleClick={(e) => {
                                changecurrentMenuOpenKeys(e.key);
                            }}
                        >
                            {menuItem.childs.length > 0 &&
                                menuItem.childs.map((menuItemChild) => {
                                    return (
                                        <Menu.Item
                                            key={menuItemChild.key}
                                            icon={
                                                menuItemChild.icon
                                                    ? menuItemChild.icon
                                                    : null
                                            }
                                        >
                                            <Link href={menuItemChild.href}>
                                                <a>{menuItemChild.title}</a>
                                            </Link>
                                        </Menu.Item>
                                    );
                                })}
                        </Menu.SubMenu>
                    );
                }
                return (
                    <Menu.Item
                        key={menuItem.key}
                        icon={menuItem.icon ? menuItemChild.icon : null}
                    >
                        <Link href={menuItem.href}>
                            <a>{menuItem.title}</a>
                        </Link>
                    </Menu.Item>
                );
            })}
            <Menu.Item
                key={"logout"}
                onClick={() => {
                    logoutHandler();
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
};
