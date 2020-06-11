import books from '../data/books.json'
import favorites from "../data/favorites.json"
import lectures from "../data/lecture.json"
import enCours from "../data/enCours.json"
import lirePlusTards from "../data/lirePlusTard.json"
import Axios from "axios"
import { getUser } from './userDao'
import {uri} from "./config"
export const getBooks =(props,page=0)=>{
    props.resetBook()
    props.selectBook({})
    const user = props.user
    Axios.get(`${uri}/book/${page}/12`).then((res)=>{
        console.log("get books => user :" ,user)
        props.booksLenght(parseInt(res.data.length))
        res.data.docs.map(book=>{
            props.addBook({...book,
                link : "/Books/"+book._id,
                favorite:user.favorites.includes(book._id)?true:false,
                lirePlusTard:user.lireplustard.includes(book._id)?true:false,
                lecture:user.lectures.find(b=>book._id === b.id)?true:false,
            })
            
        })
    })
    console.log('in book dqo=> user : ',props.user)
    /* books.map((book,_id) =>{
        
        
        props.addBook({...book,_id:_id,link : "/Books/"+_id,favorie:false})
    }) */
}
export const toggleFavorite = (props,setfavorite,favorite)=>{
    console.log("user :" ,props.user)
    Axios.put(`${uri}/reader/favorite`,{user:props.user , id:props.book._id})
    .then( async res=>{
        console.log("passed favorite")
        
            console.log("init user : ",res.data)
            props.initUser(res.data)
            setfavorite(!favorite)
            getUser(props)
        
        
        
    }).catch(e=>{
        console.log("failed favorite")
    }) 
}
export const toggleLirePlusTard = (props,setLirePlustard,lirePlusTard)=>{

    Axios.put(`${uri}/reader/lireplustard`,{user:props.user , id:props.book._id})
    .then(res=>{
        console.log("passed lireplustard")
        setLirePlustard (!lirePlusTard)
        getUser(props)
    }).catch(e=>{
        console.log("failed lireplustard")
    }) 
}
export const getOne=(props,id)=>{
        const user = props.user
        Axios.get(`${uri}/book/${id}/`).then(res=>{
            const book = {...res.data,
                link : "/Books/"+res.data._id,
                favorite:user.favorites.includes(res.data._id)?true:false,
                lirePlusTard:user.lireplustard.includes(res.data._id)?true:false,
                lecture:user.lectures.find(b=>res.data._id === b.id)?true:false,
            }
            
            if(props.setFavorite){
                console.log("positive : ",props.favorite)
                props.setFavorite([book,...props.favorite])
            }else props.selectBook(book)
            
        })
    
}
export const getGroup=(props,ids)=>{
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

export const getFavorites=(props,setLength,page=0,size=4,searchValue="")=>{
    console.log("cle : ",searchValue)
    Axios.get(`${uri}/book/favorite?id=${props.user._id}&page=${page}&size=${size}&cle=${searchValue}`)
    .then(res=>{
        props.resetFavorites()
        const user = props.user
        res.data.docs.map(book =>{
            props.addFavories({...book,
                link : "/Books/"+book._id,
                favorite:user.favorites.includes(book._id)?true:false,
                lirePlusTard:user.lireplustard.includes(book._id)?true:false,
                lecture:user.lectures.find(b=>book._id === b.id)?true:false,
            })
        })
        setLength(res.data.length)
    })
    
}
export const getLectures=(props,setLength,page=0,size=4,searchValue="")=>{
    Axios.get(`${uri}/book/lectures?id=${props.user._id}&page=${page}&size=${size}&cle=${searchValue}`)
    .then(res=>{
        props.resetLectures()
        const user = props.user
        res.data.docs.map(book =>{
            props.addLectures({...book,
                link : "/Books/"+book._id,
                favorite:user.favorites.includes(book._id)?true:false,
                lirePlusTard:user.lireplustard.includes(book._id)?true:false,
                lecture:user.lectures.find(b=>book._id === b.id)?true:false,
            })
        })
        setLength(res.data.length)
    })
    
}
export const getEnCours=(props,setLength,page=0,size=4,searchValue="")=>{
    console.log(`${uri}/book/encours?id=${props.user._id}&page=${page}&size=${size}&cle=${searchValue}`)

    
}
export const getLirePlusTard=(props,setLength,page=0,size=4,searchValue="")=>{
    
    Axios.get(`${uri}/book/lireplustard?id=${props.user._id}&page=${page}&size=${size}&cle=${searchValue}`)
    .then(res=>{
        props.resetLirePlusTards()
        const user = props.user
        res.data.docs.map(book =>{
            props.addLirePlusTard({...book,
                link : "/Books/"+book._id,
                favorite:user.favorites.includes(book._id)?true:false,
                lirePlusTard:user.lireplustard.includes(book._id)?true:false,
                lecture:user.lectures.find(b=>book._id === b.id)?true:false,
            })
        })
        setLength(res.data.length)
    })
    
}

export const getByCategories=(props,id)=>{
    props.resetBook()
    books.map((book,_id) =>{
        props.addBook({...book,_id:_id,link : "/Books/"+_id})
    })
        
    
}