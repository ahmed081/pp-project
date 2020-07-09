import books from '../data/books.json'
import favorites from "../data/favorites.json"
import lectures from "../data/lecture.json"
import enCours from "../data/enCours.json"
import lirePlusTards from "../data/lirePlusTard.json"
import Axios from "axios"
import { getUser } from './userDao'
import {uri} from "./config"
export const getBooks = async (props)=>{

    const user = props.user
    const  res = await Axios.get(`${uri}/book?page=${props.page}&size=${props.size}&cle=${props.cle}`)

    return res.data
    /* books.map((book,_id) =>{
        
        
        props.addBook({...book,_id:_id,link : "/Books/"+_id,favorie:false})
    }) */
}


export const toggle =async (props)=>{

    await Axios.post(`${uri}/reader/${props.context}`,{user:props.user , id:props.book._id})
    //await getUser(props.id)
    
}
export const getOne=async(props)=>{
        const user = props.user
        const res = await Axios.get(`${uri}/book/${props.id}`)
        return res.data 

    
}
export const getGroup=async (props,ids)=>{
    const user = props.user
    console.log(`http://localhost:3030/book/group?page=${props.page}&size=${props.size}`)
    Axios.post(`${uri}/book/group?page=${props.page}&size=${props.size}`,{
        ids:ids
    }).then(res=>{
        const books = res.data.docs.map(book=>{
            return{...book,
                link : "/Books/"+res.data._id,
                favorite:user.favorites.includes(res.data._id)?true:false,
                lirePlusTard:user.lireplustard.includes(res.data._id)?true:false,
                lecture:user.lectures.find(b=>res.data._id === b.id)?true:false,
            }
        })
        console.log("favorites :", books)
        props.setFavorite(books)
        props.setLength(res.data.length)
    })

}

export const getBasedContext=async (props)=>{
    console.log("context:",props.context)
    const res =await Axios.get(`${uri}/book/${props.context}?id=${props.user._id}&page=${props.page}&size=${props.size}&cle=${props.cle}`)
    
    return res.data
    
}

export const getByCategories=async(props)=>{

        const res = await Axios.get(`${uri}/book/categories/${props.categorie}?page=${props.page}&size=${props.size}&cle=${props.cle}`)
        console.log("cat   ...",`${uri}/book/categories/${props.categorie}?page=${props.page}&size=${props.size}&cle=${props.cle}`)
        return res.data

        
    
}
export const rateMe=async (props)=>{
    console.log({
        idBook:props.idBook,
        id:props.user._id,
        comment:props.comment,
        rate:props.rate
    })
    const res = await Axios.put(`${uri}/book/rate`,{
        idBook:props.idBook,
        id:props.user._id,
        comment:props.comment,
        rate:props.rate
    })

    return res
}