import React , {useState,useEffect} from "react"
import {
    Divider, Col, Tooltip, Card, Row, Input, Pagination,
    } from 'antd';
import { connect } from "react-redux";
import Actions from '../../../redux/actions'
import { getLirePlusTard } from "../../../DAO/BooksDao";
import { Link } from "react-router-dom";
import Model from './model'
const { Search } = Input;
const LirePlusTard =(props)=>{
    const size = 12
    useEffect(()=>{
        console.log("ahmed")
        getLirePlusTard(props,setLength,page-1,size)
        //pass limit 12
        //page from pagination 
        //searsh word = search value
        
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
        getLirePlusTard(props,setLength,page-1,size)
    }
    return(
        <div>
            <div style={{borderLeft: "1px solid #0000001f",}}>
                <Divider plain>
                    je vais lire...
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
            <Model books = {props.lirePlusTard}  />
            <div style={{float:'right'}} >
                <Pagination pageSize={size} simple defaultCurrent={page} total={length} onChange={onChangePage}  />
            </div>
        </div>
    )
}

const mapStore =(store)=>{
    const {LirePlusTardReducer,userManagementReduicer} = store
    return{
        lirePlusTard : LirePlusTardReducer,
        user:userManagementReduicer
    }
}
export default connect(mapStore,{...Actions}) (LirePlusTard)