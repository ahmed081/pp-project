import React , {useState,useEffect} from "react"
import {
    Divider, Row, Tooltip, Col, Card,Input, Pagination
    } from 'antd';
import { connect } from "react-redux";
import { getFavorites } from "../../../DAO/BooksDao";
import Actions from '../../../redux/actions'
import { Link } from "react-router-dom";
import Model from './model'
const { Search } = Input;


const Favorie =(props)=>{
    const size = 12
    useEffect(()=>{
        console.log("ahmed")
        getFavorites(props,setLength,page-1,size,searchValue)

        
    },[])
    const [length,setLength]=useState(0)
    const [page , setPage]=useState(1)
    const [searchValue,setSearchValue] = useState("")
    
    const searsh =(value)=>{
        console.log(value)
        setSearchValue(value)
        setPage(1)
        getFavorites(props,setLength,0,size,value)
    }
    const onChangePage = (page)=>{
        console.log(page)
        setPage(page)
        getFavorites(props,setLength,page-1,size,searchValue)
    }
    return(
        <div>
            <div style={{borderLeft: "1px solid #0000001f",}}>
                <Divider plain>
                    mes favorie
                </Divider>
            </div>
            <div style={{padding: "14px 22px"}}>
                <Search
                    placeholder="input search text"
                    onChange={(event)=>{searsh(event.target.value)}}
                    onSearch={value => searsh(value)}
                    style={{ width: 400 }}
                />
            </div>
            <Model books = {props.favorites}  />
            <div style={{float:'right'}} >
                <Pagination pageSize={size} simple defaultCurrent={page} total={length} onChange={onChangePage}  />
            </div>
        </div>
    )
}

const mapStore =(store)=>{
    const {FavoritesReducer,userManagementReduicer} = store
    return{
        favorites : FavoritesReducer,
        user:userManagementReduicer
    }
}
export default connect(mapStore,{...Actions}) (Favorie)