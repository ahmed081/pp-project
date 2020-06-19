import {uri} from "./config"
import Axios from "axios"

export const login =async(props)=>{
    const res = await Axios.post(`${uri}/login`,{
        username:props.username,
        password:props.password
    })
    console.log(res)
    return res.data
}

export const checkLogin =async (props)=>{
    const res = await Axios.post(`${uri}/login/lookforme`,{
        token:props.token
    })
    return res.data
}