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
        getCategories({cle:""}).then(data=>{
            const ar = Object.keys(data)
            setCategories(data)
            
        }).catch(err=>{
            console.log("no categories")
        })
    },[])
    const [length ,setLength] = useState(10)
    const [categories,setCategories]=useState({})
    const size =(span , offset=0)=>{
        return {span , offset}
    }

    return (
            <Col xl={{...size(4)}} md={{...size(3)}} sm={{...size(0)}} xs={{...size(0)}}>
            <div>
                <center>
                    <Link to="/books/categories">
                    <h2>Categories</h2>
                    </Link>
                </center>
            </div>
            <div className="CategoriesMenu"> 
            {
                
                Object.keys(categories).map((cat,i)=>{
                    
                     if(i<length)
                        return (
                            <Divider orientation="left" plain>
                            <Link onClick={()=>{window.location =`/books/categories/${cat}` }} >{cat + " (" + categories[cat] + ") " }</Link>
                            </Divider>
                        )
                }) 
            }
            </div>
            <div >
                
                {
                    length >= Object.keys(categories).length?"":
                    <center><Link onClick={()=>setLength(length+5)} >afficher plus...</Link></center>
                }
                
            </div>
            </Col>

                   
    )
}

const mapStore=(store)=>{
    const {useManagementReduicer} = store
    return{
        user : useManagementReduicer
    }
}


export default connect(mapStore,{...Actions}) (Categorie)