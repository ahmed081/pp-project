import React , {useState,useEffect} from "react"

import {HeaderStyle} from '../style'
import { 
    Avatar,
    Col
} from 'antd';
import { UserOutlined,DownOutlined,UpOutlined } from '@ant-design/icons';
import { connect } from "react-redux";

const User =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
  }
  useEffect(()=>{
      console.log("user :===>", props)

  },[])
  /* src={`${props.user.picture.large}`} */

  return (
      
    <Col xl={{...size(2,4)}} sm={{...size(6,3)}} xs={{...size(8,1)}} >
        <div className="Header-Component-user" style={HeaderStyle.HeaderComponentUser} 
        onClick={()=>{props.setToggleProfile(!props.toggleProfile)}}
        >
        <Avatar size={43} src={`${props.user.picture.large}`} />
        {
            props.toggleProfile?<UpOutlined style={{padding: "0px 14px"}} />:<DownOutlined style={{padding: "0px 14px"}} />
        }
        
        
        </div>
    </Col>
  )
}
const mapStore = (store)=>{
    const {userManagementReduicer} =store
    return {
      user : userManagementReduicer
    }
  }

export default connect(mapStore) (User)