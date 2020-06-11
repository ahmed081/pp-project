import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import $ from "jquery"
const Lire = (props)=>{
    const {id}=useParams()
    useEffect(()=>{

    },[])
    return(
    <div>{id}</div>
    )
}

export default Lire