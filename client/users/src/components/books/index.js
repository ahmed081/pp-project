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
            <BrowserRouter>
                <Switch>
                    <Route  path='/books' exact  component= {Books}/>
                    <Route  path='/books/categories' exact  render={() => <Redirect to="/books"/>}/>
                    <Route  path='/books/categories/:id' exact  component={Categorie}/>
                    <Route path='/books/:id' exact  component={BookPage} />
                </Switch>
            </BrowserRouter>
        </div>
            
        
          
    )
}




export default BooksIndex