import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
const {setTitle} = Actions
const UserManagement = (props)=>{
    useEffect(() => {
        console.log(props)
        props.setTitle(Const.USERSUI_TITLE)
        }, [])
    return (
        <div>UserManagement</div>
    )
}
const mapSotre =(store)=>{
    return store
}

export default connect(mapSotre,{setTitle}) (UserManagement);