import React , {useState,useEffect} from "react"

import img from '../../images/backgroundImage.jpg'
import Book from "./book";
import Categories from "./categories";
import Books from "./books";
import BookPage from "./bookpage"
import { Route,BrowserRouter, Switch, Redirect } from "react-router-dom";
import Categorie from "./Categorie";


const BooksIndex =(props)=>{


    return (
        
        <div>
            <Books/>
        </div>
            
        
          
    )
}




export default BooksIndex