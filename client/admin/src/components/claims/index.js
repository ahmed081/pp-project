import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import { Link,useLocation,Route } from 'react-router-dom'

import claimsManagement from './claimsManagement'
import AllClaims from './AllClaims'

const BookManagement = (props)=>{
    
    useEffect(() => {
        props.setTitle(Const.CLAIMSUI_TITLE)
        }, [])
    return (
        <div>
            
            <Route path="/claimsManagement" exact component={claimsManagement}/>
            <Route path="/claimsManagement/:id" component={AllClaims}/>
        </div>
    )
}
const mapSotre =(store)=>{
    const {TokenReduicer} = store
    return {
      token : TokenReduicer,
    }
}

export default connect(mapSotre,{...Actions}) (BookManagement);