import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Actions from '../../redux/actions'
import Const from '../../data/const'
import Axios from 'axios'
import { Link,useLocation,Route } from 'react-router-dom'
import categorie from './categorie'
import AllCategories from './AllCategories'



const CategorieManagemnet = (props)=>{

    
    useEffect(() => {
        props.setTitle("Gestion des catégories")
        }, [])
    return (
        <div>
            
            <Route path="/categorieManagement" exact component={AllCategories}/>
            <Route path="/categorieManagement/:id" component={categorie}/>
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

export default connect(mapSotre,{...Actions}) (CategorieManagemnet);