import Axios from "axios"
import url from "./backendInfo"

export const getAll=async(props)=>{
    const res = await Axios.get(`${url}/reader?page=${props.page}&size=${props.size}&cle=${props.cle}`)
    console.log(res.data)
    return res.data

}

export const getOne=async(props)=>{
    const res = await Axios.get(`${url}/reader/${props.id}`)
    console.log(res.data)
    return res.data

} 
export const editReader=async(props)=>{
    const res = await Axios.put(`${url}/reader/${props.reader._id}`,{
        ...props.reader
    })
    return res.data

} 
export const addReader=async(props)=>{
    console.log(`${url}/reader/add`)
    const res = await Axios.post(`${url}/reader/add`,{
        ...props.reader
    })
    return res.data

} 