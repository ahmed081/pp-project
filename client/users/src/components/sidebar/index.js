import React , {useState,useEffect} from "react"
import {
    Divider
    } from 'antd';
import {SideBarStyle} from '../style'

import Menu from './menu'
import Header from './header'



const SideBar =()=>{

    return (
        <div className="SideBarApp" style={SideBarStyle.SideBarApp} >
            
            <Header/>
            <Divider dashed />
            <Menu/>
            
            
        </div>
    )
}




export default SideBar