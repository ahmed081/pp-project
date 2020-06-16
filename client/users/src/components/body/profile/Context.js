import React , {useState,useEffect, useLayoutEffect} from "react"
import {
    Divider, Row, Tooltip, Col, Card,Input, Pagination
    } from 'antd';
import { connect } from "react-redux";
import { getBasedContext } from "../../../DAO/BooksDao";
import Actions from '../../../redux/actions'
import { Link } from "react-router-dom";
import Model from './model'
const { Search } = Input;
const reMake =(props)=>{
    
    const user = props.user;
    const books = props.data.docs.map(book=>{
        return {...book,
            link : "/Books/"+book._id,
            favorite:user.favorites.includes(book._id)?true:false,
            lirePlusTard:user.lireplustard.includes(book._id)?true:false,
            lecture:user.lectures.find(b=>book._id === b.id)?true:false,
        }
        
    })
    props.setBooks(books)
    console.log("ahmed : ",props.data)
}

const Context =(props)=>{
    const size = props.size
    const title = props.title
    
    
    
    const [length,setLength]=useState(0)
    const [page , setPage]=useState(1)
    const [searchValue,setSearchValue] = useState("")
    const [books , setBooks] = useState([])
    const [context , setcontext] = useState(props.context)
    useLayoutEffect(()=>{
        console.log("ahmed")
        getBasedContext({...props,page:page-1,size:props.size,cle:searchValue,context}).then(data=>{
            reMake({...props,data,setBooks})
            setLength(data.length)
        })

        
    },[])
    const searsh =async(value)=>{
        console.log(value)
        setSearchValue(value)
        setPage(1)
        const data = await getBasedContext({...props,page:page-1,cle:searchValue,context})
        reMake({...props,data,setBooks})
        setLength(data.length)
    }
    const onChangePage = async(page)=>{
        console.log(page)
        setPage(page)
        const data = await getBasedContext({...props,page:page-1,cle:searchValue,context})
        reMake({...props,data,setBooks})
        setLength(data.length)
    }
    return(
        <div>
            <div style={{borderLeft: "1px solid #0000001f",}}>
                <Divider plain>
                    {title}
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
            <Model books = {books}  />
            <div style={{float:'right'}} >
                <Pagination pageSize={size} simple current={page} total={length} onChange={onChangePage}  />
            </div>
        </div>
    )
}

const mapStore =(store)=>{
    const {userManagementReduicer} = store
    return{
        
        user:userManagementReduicer
    }
}
export default connect(mapStore,{...Actions}) (Context)