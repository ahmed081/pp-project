import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'
import {SideBarStyle} from '../style'
import { 
  Avatar,
  } from 'antd';
import {UserOutlined } from '@ant-design/icons';
import logo from '../../images/logo.jpeg'
const Header =()=>{

    return (
        
      <div  >
         <div style={SideBarStyle.AvatarIcon} >
          <Avatar size={90} shape="square" src={logo} />
         </div>
          
          <h3><center>Mylib</center></h3>
        
      </div>
      
      
    )
}




export default Header