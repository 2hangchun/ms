import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/MainMenu';

const { Header, Content, Footer, Sider } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}>
          <h1 style={{ fontSize: 25, color: '#fff', textAlign: 'center', lineHeight: '32px', height: 32 }}>L o g o</h1>
        </div>
        <MainMenu />
      </Sider>
      {/* 右内容 */}
      <Layout className="site-layout">
        {/* 头部 */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb style={{ margin: '16px 16px ' }} items={[
            {
              title: 'User'
            },
            {
              title: 'Bill'
            }
          ]}>
          </Breadcrumb>
        </Header>
        {/* 内容 */}
        <Content style={{ margin: '16px 16px 0', background: colorBgContainer }}>
          <Outlet />
        </Content>
        {/* 底部 */}
        <Footer style={{ textAlign: 'center', lineHeight: '48px', padding: 0 }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;