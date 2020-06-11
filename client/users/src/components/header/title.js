import React , {useState,useEffect} from "react"

import { Link,useLocation } from 'react-router-dom'
import {HeaderStyle} from '../style'
import { 
  Col,
} from 'antd';



const Title =()=>{
    const size =(span , offset=0)=>{
        return {span , offset}
    }
    return(
        <Col xl={{...size(0)}} sm={{...size(7,4)}} xs={{...size(7,4)}}>
          
          <div id="Header-Component-title"
            style={HeaderStyle.HeaderComponentTitle}
          ><center>MyLib</center></div>
        </Col>
    )
}

export default Title