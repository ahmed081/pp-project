import React,{useEffect, useState} from 'react';
import './App.css';
import { Link,useLocation } from 'react-router-dom'
import { 
  Layout,
  Button,
  Input ,
  Row,
  Col,
  Divider,
  Menu,
  Avatar,
  Space,
  Tooltip} from 'antd';
import { MenuUnfoldOutlined,MenuFoldOutlined,SearchOutlined,UserOutlined,DownOutlined,UpOutlined } from '@ant-design/icons';
import image from "./backgroundImage.jpg";

import $ from "jquery"
const { Search } = Input;
const { Header, Footer, Sider, Content} = Layout;
function App() {

  useEffect(()=>{
    const section = $('section').addClass('ahmed')
    console.log(section)
  },[])
  const size =(span , offset=0)=>{
        return {span , offset}
  }
  const [toggleMenu , setToggleMenu] = useState(false)
  const [toggleProfile , setToggleProfile] = useState(false)
  return (
    <div>
      
    
    <div style={{height: "53px" ,color:"white",background:"rgba(214, 214, 214, 0.15)",borderBottom: "1px solid #0000001a" , }}>
      <Row>
        <Col xl={{...size(2)}} sm={{...size(4)}} xs={{...size(4)}} style={{ height:"51px",fontSize: "32px" }} onClick={()=>setToggleMenu(!toggleMenu)}>
          <div 
          style={{width: "85px",      borderRight: "1px solid rgba(0, 0, 0, 0.77)",  padding: "0px 26%",cursor: "pointer",color: "#000000c4",}} >
          {
            toggleMenu?<MenuFoldOutlined />:<MenuUnfoldOutlined />
          }
          </div>
          
          

        </Col>
        <Col xl={{...size(0)}} sm={{...size(7,4)}} xs={{...size(7,4)}}>
          
          <div
            style={{    padding: "0px 23%" ,color: "#000000c4", fontSize:"28px"}}
          ><center>myLib</center></div>
        </Col>
        <Col xl={{...size(12,4)}} sm={{...size(0)}} xs={{...size(0)}}>
            <div style={{width: "100%",paddingTop: "7px"}} >
              <Input
                  style = {{borderRadius:"20px" ,height:"35px"}}
                  placeholder="Chercher...."
                 
                  suffix={
                    <Tooltip title="rechercher">
                      <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' , cursor:"pointer"}} />
                    </Tooltip>
                  }
              />
            </div>
        </Col>
        <Col xl={{...size(2,4)}} sm={{...size(6,3)}} xs={{...size(6,3)}} >
              <div style={{    padding: "3px 3px" , float:"right",color: "#000000c4", cursor:"pointer"}} 
                onClick={()=>{setToggleProfile(!toggleProfile)}}
              >
                <Avatar size={43} icon={<UserOutlined />} />
                {
                  toggleProfile?<UpOutlined style={{padding: "0px 14px"}} />:<DownOutlined style={{padding: "0px 14px"}} />
                }
                
                
              </div>

        </Col>
      </Row>
              
        
    </div>
    {toggleMenu?<div style={{background:"#dadada" , width:"250px",height:"100%" , position:"fixed",overflowX: "scroll",whiteSpace: "nowrap",zIndex:1}} >
      <div  >
         <div style={{padding: "16px 79px"}} >
          <Avatar size={90} shape="square" icon={<UserOutlined />} />
         </div>
          
          <h3><center>Mylib</center></h3>
        
      </div>
      <Divider dashed />
      <div className="sidebarMenu"> 
        <a to="/profile"> Voir Profile</a>
        <a to="/profile"> Mes lectures</a>
        <a to="/profile"> à lire plus tard </a>
        <a to="/profile"> les favoris</a>
        <a to="/profile"> boite de discution</a>
        <a to="/profile"> A propos MyLib</a>
        <a to="/profile">  Contacter Nous</a>
      </div>
 
      
       </div>:""}
    <div  onClick={()=>setToggleMenu(false)}>
    <Layout>
        <Header>Mylib</Header>
        <Content>Content</Content>
      </Layout>
    </div>
    </div>
  );
}

export default App;
