import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

const Lire = (props)=>{
    const {id}=useParams()
    useEffect(()=>{

    },[])
    return(
    <div>{id}</div>
    )
}

export default Lire