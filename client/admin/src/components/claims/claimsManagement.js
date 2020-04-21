import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'

const {setTitle} = Actions


const ClaimManagement = (props)=>{
    useEffect(() => {

        console.log(props)
        props.setTitle(Const.CLAIMSUI_TITLE)
        }, [])
    return (
        <div>ClaimsManagement</div>
    )
}
const mapSotre =(store)=>{
    return store
}

export default connect(mapSotre,{setTitle}) (ClaimManagement);