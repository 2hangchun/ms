import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useMatch, useNavigate } from 'react-router-dom'


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', 'page1', <PieChartOutlined />),
    getItem('Option 2', 'page2', <DesktopOutlined />),
    getItem('User', 'page3', <UserOutlined />, [
        getItem('Tom', 'page3/x'),
        getItem('Bill', 'page3/y'),
        getItem('Alex', 'page3/z'),
    ]),
    getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', 'page5', <FileOutlined />),
];

const MainMenu: React.FC = () => {
    const key = useMatch('/home/*')?.params['*']
    const [openKeys, setOpenKeys] = useState([key?.split('/')[0]!])
    const navigate = useNavigate()
    const defaultSelectedKeys = key!

    const handleClick = (e: { key: string }) => {
        // 跳转
        navigate(e.key)
    }

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys([keys[keys.length - 1]])
    };


    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[defaultSelectedKeys]}
            mode="inline"
            items={items}
            onClick={handleClick}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
        />

    );
};

export default MainMenu;