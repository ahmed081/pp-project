import React , {useState,useEffect} from "react"
import {
    Divider, Row, Col, Card, Tooltip, Input,Pagination
    } from 'antd';
import { connect } from "react-redux";
import { getLectures } from "../../../DAO/BooksDao";

import Actions from '../../../redux/actions'
import { Link } from "react-router-dom";
import Model from './model'
const { Search } = Input;
const Lecture =(props)=>{
    const size = 12
    useEffect(()=>{
        console.log("ahmed")
        getLectures(props,setLength,page-1,size)

        
    },[])
    const [length,setLength]=useState(0)
    const [page , setPage]=useState(1)
    const [searchValue,setSearchValue] = useState("")
    
    const searsh =(value)=>{
        console.log(value)
        setSearchValue(value)
    }
    const onChangePage = (page)=>{
        console.log(page)
        setPage(page)
        getLectures(props,page-1,size,setLength)
    }
    return(
        <div>
            <div style={{borderLeft: "1px solid #0000001f",}}>
                <Divider plain>
                     vous avez lu...
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
            <Model books = {props.lectures}  />
            <div style={{float:'right'}} >
                <Pagination pageSize={size} simple defaultCurrent={page} total={length} onChange={onChangePage}  />
            </div>
        </div>
    )
}
const mapStore =(store)=>{
    const {LecturesReducer,userManagementReduicer} = store
    return{
        lectures : LecturesReducer,
        user:userManagementReduicer
    }
}
export default connect(mapStore,{...Actions}) (Lecture)
