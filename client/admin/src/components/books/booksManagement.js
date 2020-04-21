import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import Axios from 'axios'
import { Link,useLocation,Route } from 'react-router-dom'

import book from "./book"
import AllBook from "./AllBook"

import BooksDao from '../../dao/booksDao'

const data = [
    {
      key: '1',
      ISBN: 'John Brown',
      title: 32,
      pages: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      ISBN: 'John Brown',
      title: 32,
      pages: 'New York No. 1 Lake Park',
    },
    {
      key: '3',
      ISBN: 'John Brown',
      title: 32,
      pages: 'New York No. 1 Lake Park',
    },
  ];
const BookManagement = (props)=>{
    let location = useLocation()
    
    useEffect(() => {
      
      console.log("props books : ",props)
      props.CurrentPage(0)
      BooksDao.getBooksByPage(0,props)
      /* 
        Axios.get(`http://localhost:3030/book?token=${props.token}`)
        .then(res=>{
          console.log(res)
          res.data.docs.map((item,index) =>{
            props.addBook({...item,key:index})
            props.booksLenght(res.data.length)
            return null
        })
        }).catch(err=>{
          console.log(err)
        }) */
        props.setTitle(Const.BOOKSUI_TITLE)
        }, [])
    return (
        <div>
            
            <Route path="/booksManagement" exact component={AllBook}/>
            <Route path="/booksManagement/:id" component={book}/>
        </div>
    )
}
const mapSotre =(store)=>{
    const {BooksManagemntReducer} = store
    const {TokenReduicer} = store
    const {BooksPageReduicer} = store
    return {
      books : BooksManagemntReducer,
      token : TokenReduicer,
      page : BooksPageReduicer
    }
}

export default connect(mapSotre,{...Actions}) (BookManagement);