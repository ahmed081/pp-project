import { Layout, Menu, Breadcrumb } from 'antd';
import React, {useState} from 'react';
import MyMenu from '../menus/mainMenu'
import MyHeader from '../menus/mainHeader'
import Routes from './routes'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const  SiderDemo =()=> {
  

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MyMenu/>
        <Layout className="site-layout">
          <MyHeader/>
          <Content style={{ margin: '0 16px' }}>
            <Routes/>
          </Content>
    <Footer style={{ textAlign: 'center' }}>{React.version}</Footer>
        </Layout>
      </Layout>
    );
      
}
export default SiderDemo 
