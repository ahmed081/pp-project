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
export const getOne =(id, setFriend)=>{
    Axios.get(`${uri}/reader/${id}`)
    .then((res)=>{

        console.log("init user : ", res.data)
        setFriend(res.data)
    })

}
export const getFriends =(props)=>{
    console.log(`${uri}/reader/getfriend?id=${props.user._id}&page=${props.page}&size=${props.size}&cle=${props.cle}`)
    Axios.get(`${uri}/reader/getfriend?id=${props.user._id}&page=${props.page}&size=${props.size}&cle=${props.cle}`)
    .then((res)=>{
        props.setFriends(res.data.docs)
        props.setLength(res.data.length)
        console.log("friends : ", res.data)
        
    })

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