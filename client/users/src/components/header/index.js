import React , {useState,useEffect} from "react"
import { 
    Row,
    } from 'antd';
import {HeaderStyle} from '../style'

import Menu from './menu'
import Title from './title'
import Searsh from './searsh'
import User from './user'


const Header =(props)=>{
    return (
        <div className="HeaderApp" style={HeaderStyle.HeaderApp} >
            <Row>
                <Menu toggleMenu={props.toggleMenu} setToggleMenu={props.setToggleMenu} />
                <Title/>
                <Searsh/>
                <User toggleProfile={props.toggleProfile} setToggleProfile={props.setToggleProfile}/>            
            </Row>
        </div>
    )
}




export default Header