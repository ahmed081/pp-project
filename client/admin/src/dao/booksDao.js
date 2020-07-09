import Axios from 'axios'
import url from "./backendInfo"
const uri = window.location.origin.split(':').filter((item , index) => index !=2).join('')
const port = '3030'
const size = 10
  const getbooks =async(props)=>{
    const {token} = props
    const res = await Axios.get(`${url}/book?page=${props.page}&size=${props.size}&cle=${props.cle}`)
    return res.data
  }
  const getbooksByCategorie =async(props)=>{
    const {token} = props
    const res = await Axios.get(`${url}/book/categories/${props.categorie}?page=${props.page}&size=${props.size}&cle=${props.cle}`)
    return res.data
  }
  const getOne=async(props)=>{
    const res = await Axios.get(`${url}/book/${props.id}`)
    return res.data

  }
  const addBook=({...data})=>{
      console.log(data)
      const formData = new FormData()
      formData.append('file',data.file)
  
      console.log(formData)
      Axios.post(`${url}/book/add?token=${data.token}`,{...data,file:formData},{
      }).then((res)=>{
        window.location='/booksManagement/add'
          console.log(res)
      }).catch(err=>{
        console.log(err.request)
      }) 
  }
const editBook=(token,{...book})=>{
  console.log(token)
  
    Axios.put(`${url}/book/${book._id}?token=${token}`,{...book},{
   }).then((res)=>{
     window.location='/booksManagement'
      console.log(res.data)
  }).catch(err=>{
    console.log(err.request)
  })  
}
const deleteBook=(token,book,props)=>{
  console.log(token)
  
    Axios.delete(`${url}/book/${book._id}?token=${token}`).then((res)=>{
      console.log(res.data)
      props.deleteBook(book.key)
  }).catch(err=>{
    console.log(err.request)
  })  
}
export default {getOne,getbooks,addBook,editBook,deleteBook,getbooksByCategorie}