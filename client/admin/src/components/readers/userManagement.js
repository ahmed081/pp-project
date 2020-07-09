import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import Axios from 'axios'
import { Link,useLocation,Route } from 'react-router-dom'
import data from "./json.json"
import reader from "./reader"
import AllReader from "./AllReader"

import BooksDao from '../../dao/booksDao'


const BookManagement = (props)=>{
    let location = useLocation()
    
    useEffect(() => {
      props.setTitle(Const.USERSUI_TITLE)

    }, [])
    return (
        <div>
            <Route path="/usersManagement" exact component={AllReader}/>
            <Route path="/usersManagement/:id" component={reader}/>
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