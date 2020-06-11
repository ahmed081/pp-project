import React,{useState,useEffect} from 'react'
import { 
    Col,
} from 'antd';
import {HeaderStyle,SideBarStyle} from '../style'
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';

const Menu =(props)=>{
    const size =(span , offset=0)=>{
        return {span , offset}
  }
  
    return(
        <Col xl={{...size(2)}} sm={{...size(4)}} xs={{...size(4)}} style={HeaderStyle.HeaderAppIcon} onClick={()=>props.setToggleMenu(!props.toggleMenu)}>
          <div className="MenuIcon" style={HeaderStyle.MenuIcon}
           >
          {
            props.toggleMenu?<MenuFoldOutlined />:<MenuUnfoldOutlined />
          }
          </div>
          
          

        </Col>
    )
}

export default Menu