import React , {useState,useEffect} from "react"
import {
    Col,
    Row,
    Card 
    } from 'antd';
import img from '../../images/backgroundImage.jpg'
import Book from "./book";
import Categories from "./categories";
import { useLocation, Route, BrowserRouter, Switch, useParams } from "react-router-dom";
import {connect} from "react-redux"
import Actions from '../../redux/actions'
import { getBooks, getByCategories } from "../../DAO/BooksDao";
import Allbooks from "./Allbooks";


const Categorie =(props)=>{



    const size =(span , offset=0)=>{
        return {span , offset}
    }
    const {id} = useParams()
    let location = useLocation()
    useEffect(()=>{
        getByCategories(props,id)
        console.log("categorie id  :", id)
    },[])
    return (
        
        <Row>
            <Categories/>
            <Allbooks books = {props.books}/>
            
        </Row>
                   
    )
}

const mapSotre =(store)=>{
    const {BooksManagemntReducer} = store
    return {books : BooksManagemntReducer}
}


export default connect(mapSotre,{...Actions}) (Categorie)