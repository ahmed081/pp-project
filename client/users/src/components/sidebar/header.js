import React , {useState,useEffect} from "react"
import { Link,useLocation } from 'react-router-dom'
import {SideBarStyle, HeaderStyle} from '../style'
import { 
  Avatar, Tooltip, Input, Col,
  } from 'antd';
import {UserOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../../images/logo.jpeg'

const size =(span , offset=0)=>{
  return {span , offset}
}
const Header =()=>{

  const onSearsh =async(event)=>{
    setSearshValue(event.target.value)
  }
  const [searshValue,setSearshValue]=useState("")
    return (
        
      <div  >
         <div style={SideBarStyle.AvatarIcon} >
          <Avatar size={90} shape="square" src={logo} />
         </div>
          
          <h3><center>Mylib</center></h3>
          <center>
          <Col  xl={{...size(0)}}  lg={{...size(0)}}  sm={{...size(22)}} xs={{...size(22)}} >
          <Input
                  onChange={(event)=>onSearsh(event)}
                  
                  style = {{borderRadius:"20px" ,height:"35px" ,zIndex:1}}
                  placeholder="Chercher...."
                  
                  
                  suffix={
                    <Tooltip title="rechercher">
                      <SearchOutlined style={HeaderStyle.HeaderComponentInputSearsh} onClick={()=>{
                        if(searshValue !== "")
                          window.location='/searsh/'+searshValue
                      }} />
                    </Tooltip>
                  }
              />
              </Col></center>
      </div>
      
      
    )
}




export default Header