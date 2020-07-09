import user from "../data/user.json"
import Axios from 'axios'
import {uri} from "./config"
export const getUser =(props)=>{
    Axios.get(`${uri}/reader/f5851828-c1f1-4ff2-8e58-144448fa9969`)
    .then((res)=>{
        console.log("init user")
        props.initUser(res.data)
    })

}
export const getOne =async(id)=>{
    const res = await Axios.get(`${uri}/reader/${id}`)
    
    return res.data

}
export const getFriends =async(props)=>{
    const res = await Axios.get(`${uri}/reader/getfriend?id=${props.user._id}&page=${props.page}&size=${props.size}&cle=${props.cle}`)
    return res.data

}
export const getReaders =async(props)=>{
    const res = await Axios.get(`${uri}/reader/?page=${props.page}&size=${props.size}&cle=${props.cle}`)
    return res.data

}
export const addFriend =(props)=>{
    console.log(props.user)
    Axios.put(`${uri}/reader/addfriend`,{
        id:props.id,
        user:props.user
    })
    .then((res)=>{
        props.toggleFriend(props.id)
        console.log(props.isfriend)
        props.setFriend(!props.isfriend)
        console.log("friends : ", res.data)
        
    })

}

export const editReader= async props =>{
    const res = await Axios.put(`${uri}/reader/${props.user._id}`,{
        ...props.user
    })
    console.log(res.status)
    return res
}

export const editPassword= async props =>{
    console.log(`${uri}/reader/password/${props._id}`)
    const res = await Axios.put(`${uri}/reader/password/${props._id}`,{
        password :props.password,
        NewPassword:props.NewPassword
    })
     
    
    return res
}