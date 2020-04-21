import React from "react"
import { Layout,Row,Col,Menu } from 'antd';
import {connect} from 'react-redux'
import { Link,useLocation } from 'react-router-dom';
import {
    LogoutOutlined
  
    } from '@ant-design/icons';
import Actions from '../../redux/actions'
const {loginAction} =Actions
//to do

/* 
    -filter the menu 
    -show the title
    -if its not found show << welcome to Mylib managemnt iterface>> 
*/
const style = ()=>{
    return{
        boxSizing: "border-box",
        fontSize: "14px",
        verticalAlign: "-0.125em",
        textTransform: "none",
        color: "rgba(255, 255, 255, 0.65)",
        fontWeight: "bold"
    }
}
const { Header} = Layout;
const MainHeader = (props)=>{
    return(
        <Header className="site-layout-background" style={{ padding: 0 }} > 
            <Row gutter={[16, 16]}>
                <Col span={20}  ><div style={{
        boxSizing: "border-box",
        fontSize: "21px",
        verticalAlign: "-0.125em",
        textTransform: "none",
        color: "rgba(255, 255, 255, 0.65)",
        fontWeight: "bold"
    }}>
        <center>{props.title}</center>
        
        
    </div></Col>
                <Col span={4} > 
                <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
                <Menu.Item key='1' onClick={()=>{console.log(props.loginAction())}}>
                        
                            <LogoutOutlined />
                            <Link to={`/login`}>
                            <span>deconnection</span>
                        </Link>
                </Menu.Item>
                </Menu>
                </Col>
              
            </Row>
        </Header>
    )
}
const mapStore =(store)=>{
    const {MenuTitle} = store
    return {
        title:MenuTitle
    }
}

export default connect(mapStore,{loginAction})(MainHeader)