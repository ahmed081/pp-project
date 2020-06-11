import React , {useState,useEffect} from "react"
import { 
    Divider,
    } from 'antd';
import {UserBarStyle} from '../style'

import Menu from './menu'
import Header from './header'
import { connect } from "react-redux";

const UserBar =(props)=>{
    
    return (
        <div style={UserBarStyle.userBar} >
            <Header/>
            <Divider dashed />
            <Menu/>
        </div>
    )
}

const mapStore = (store)=>{
    const {userManagementReduicer} =store
    return {
      user : userManagementReduicer
    }
  }


export default connect(mapStore) (UserBar)