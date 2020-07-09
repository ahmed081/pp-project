import Axios from "axios"
import url from "./backendInfo"

export const getAll=async(props)=>{
    console.log(`${url}/claim?page=${props.page}&size=${props.size}&type=${props.type}&treated=${props.treated}`)
    const res = await Axios.get(`${url}/claim?page=${props.page}&size=${props.size}&type=${props.type}&treated=${props.treated}`)
    console.log(res.data)
    return res.data

}
export const setTreatedDao=async(props)=>{
    const res = await Axios.put(`${url}/claim/${props.claim._id}`,{
        ...props.claim
    })
    console.log(res.data)
    return res.data

}

