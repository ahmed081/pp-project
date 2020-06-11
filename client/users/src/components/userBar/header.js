import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'
import {SideBarStyle} from '../style'
import { 
  Avatar,
  } from 'antd';
import {UserOutlined } from '@ant-design/icons';
import { connect } from "react-redux";

const Header =(props)=>{
    const user = props.user
    return (
        
      <div  >
         <div style={SideBarStyle.AvatarIcon} >
          <Avatar size={90} src={`${user.picture.large}`} />
         </div>
          
          <h3><center>{`${user.name.last} ${user.name.first}`} </center></h3>
        
      </div>
      
      
    )
}


const mapStore = (store)=>{
  const {userManagementReduicer} =store
  return {
    user : userManagementReduicer
  }
}

export default connect(mapStore) (Header)