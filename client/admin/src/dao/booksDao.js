import Axios from 'axios'
import url from "./backendInfo"
const uri = window.location.origin.split(':').filter((item , index) => index !=2).join('')
const port = '3030'
const size = 10
const getBooksByPage =(page,props)=>{
  const {token} = props
    console.log(uri)
    console.log(props.token)
    Axios.get(`${url}/book/${page}/${size}?token=${token}`)
    
        .then(res=>{

          console.log('done')
          props.resetBook()
          res.data.docs.map((item,index) =>{
            props.addBook({...item,key:index})
            props.booksLenght(res.data.length)
            return null
        })
        }).catch(err=>{ 
          console.log(err)
        })
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
export default {getBooksByPage,addBook}