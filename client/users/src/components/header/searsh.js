import React , {useState,useEffect} from "react"

import { Link,useLocation } from 'react-router-dom'
import {HeaderStyle} from '../style'
import { 
    Input ,
    Col,
    Tooltip
} from 'antd';
import { SearchOutlined,UserOutlined,DownOutlined,UpOutlined } from '@ant-design/icons';


const Searsh =()=>{
    const size =(span , offset=0)=>{
        return {span , offset}
  }

  return (
      
        <Col xl={{...size(12,4)}} sm={{...size(0)}} xs={{...size(0)}}>
            <div className="Header-Component-searsh" style={HeaderStyle.HeaderComponentSearsh} >
              <Input
                  style = {{borderRadius:"20px" ,height:"35px"}}
                  placeholder="Chercher...."
                 
                  suffix={
                    <Tooltip title="rechercher">
                      <SearchOutlined style={HeaderStyle.HeaderComponentInputSearsh} />
                    </Tooltip>
                  }
              />
            </div>
        </Col>
  )
}


export default Searsh