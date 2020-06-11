import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import Actions from '../../redux/actions'
import Model from "../body/profile/model"
import { getGroup } from "../../DAO/BooksDao"
import { useParams } from "react-router-dom"
import { Pagination } from "antd"

const LastActivities =(props)=>{

    const [favorite,setFavorite]=useState([])
    const [page,setPage]=useState(1)
    const [length,setLength]=useState(0)
    const onChangePage =(p)=>{
        setPage(p)
        getGroup({setFavorite,favorite,setLength,page:p-1,size,...props},props.friend.favorites)
    }
    const size = 4
    useEffect(()=>{
        console.log("favorites")
        setPage(1)
        getGroup({setFavorite,favorite,setLength,page:page-1,size,...props},props.friend.favorites)
        console.log(props.friend.favorites)
        
    },[])
    return(
        <div>
            <Model title= {"j'ai en cous de lire.... "}  books={favorite} />
            <div style={{float:'right'}} >
                    <Pagination pageSize={size} simple  current={page} total={length} onChange={onChangePage}  />
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

export default connect(mapStore ,{...Actions}) (LastActivities)