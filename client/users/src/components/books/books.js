import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Card 
    } from 'antd';
import img from '../../images/backgroundImage.jpg'
import Book from "./book";
import Categories from "./categories";
import { useLocation, Route, BrowserRouter, Switch } from "react-router-dom";
import {connect} from "react-redux"
import Actions from '../../redux/actions'
import { getBooks } from "../../DAO/BooksDao";
import Allbooks from "./Allbooks";


const Books =(props)=>{


    const size =(span , offset=0)=>{
        return {span , offset}
    }
    let location = useLocation()
    useEffect(()=>{
        getBooks(props)
    },[])
    return (
        
        <Row>
            <Categories/>
            <Allbooks {...props}/>
            
        </Row>
                   
    )
}

const mapSotre =(store)=>{
    const {BooksManagemntReducer,userManagementReduicer,BooksLengthReducer} = store
    return {
        books : BooksManagemntReducer,
        user:userManagementReduicer,
        length : BooksLengthReducer
    }
}


export default connect(mapSotre,{...Actions}) (Books)