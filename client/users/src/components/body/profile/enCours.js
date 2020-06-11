import React , {useState,useEffect} from "react"
import {
    Divider, Tooltip, Col, Card, Row,Input, Pagination
    } from 'antd';
import { connect } from "react-redux";
import Actions from '../../../redux/actions'
import { getEnCours } from "../../../DAO/BooksDao";
import { Link } from "react-router-dom";
import Model from './model'
const { Search } = Input;
const Encours =(props)=>{
    const size = 12
    useEffect(()=>{
        console.log("ahmed")
        //pass limit 12
        //page from pagination 
        //searsh word = search value
        getEnCours(props,setLength,page-1,size)
        
    },[])

    const [page , setPage]=useState(1)
    const [searchValue,setSearchValue] = useState("")
    const [length,setLength]=useState(0)
    const searsh =(value)=>{
        console.log(value)
        setSearchValue(value)
    }
    const onChangePage = (page)=>{
        console.log(page)
        setPage(page)
        getEnCours(props,setLength,page-1,size)
    }
    return(
        <div>
            <div >
                <Divider plain>
                    Vous êtes en cous de lire...
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
            <Model books = {props.enCours}  />
            <div style={{float:'right'}} >
                <Pagination pageSize={size} simple defaultCurrent={page} total={length} onChange={onChangePage}  />
            </div>
        </div>
    )
}

const mapStore =(store)=>{
    const {EnCoursReducer,userManagementReduicer} = store
    return{
        enCours : EnCoursReducer,
        user:userManagementReduicer
    }
}
export default connect(mapStore,{...Actions}) (Encours)