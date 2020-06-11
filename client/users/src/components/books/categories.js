import React , {useState,useEffect} from "react"
import {
    Col,
    Divider,
    Card 
    } from 'antd';
import { connect } from "react-redux";
import Actions from '../../redux/actions'
import { getCategories } from "../../DAO/categorieDao";
import { Link } from "react-router-dom";

const { Meta } = Card;
const Categories =[
    {name:"Arts & Entertainment" , nbr: 50},
    {name:"Humor" , nbr: 50},
    {name:"Business " , nbr: 50},
    {name:"College" , nbr: 50},
    {name:"Language Learning" , nbr: 50}]
const Categorie =(props)=>{
    useEffect(()=>{
        
        getCategories(props)
    },[])
    const size =(span , offset=0)=>{
        return {span , offset}
    }

    return (
            <Col xl={{...size(4)}} md={{...size(3)}} sm={{...size(0)}} xs={{...size(0)}}>
            <div><h2>Categories</h2></div>
            <div className="CategoriesMenu"> 
                {
                    props.Categories.map(cat=>{
                        return (
                            <Divider orientation="left" plain>
                            <Link to={`/books/categories/${cat.id}`} >{cat.name + " (" + cat.nbr + ") " }</Link>
                            </Divider>
                        )
                    })
                }
            </div>
            </Col>

                   
    )
}

const mapStore=(store)=>{
    const {CategoriesManagemntReducer} = store
    return{
        Categories : CategoriesManagemntReducer
    }
}


export default connect(mapStore,{...Actions}) (Categorie)