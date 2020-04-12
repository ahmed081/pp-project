import React,{ useState ,useEffect} from 'react';
import axios from 'axios'


const App =()=>{

    const [token , setToken] =useState() 
    useEffect(() => {
        let cookieToken = document.cookie.split(';').filter(cookie=> cookie.split('=')[0].trim() === "token")
        if(cookieToken)
        {
            cookieToken = cookieToken[0].split('=')[1]
            if(cookieToken !== "undefined")
                setToken(cookieToken)
        }
        
      }, []); 
    return(
        <div>
        {typeof(token)==="undefined"?<Login setToken={setToken} />:<Books token = {token} />}
        </div>
        
    )
}


/* const  ffff = ()=>{
    const [books, setBooks]=useState([])
    const [image,setImage] = useState()
   

     useEffect(() => {
        console.log("use effect")
        axios.get(`http://localhost:3030/book`,{
                    params: {
                         'token': "azerty",
                    }
            }).then(res =>{
                console.log((res))
                if(true)
                {
                    setBooks([...books,res.data])
                }
                    
            }).catch((err)=>{
                    console.log(err.request)
                    console.log("failed request")
                
            })
           
        /* axios.get('localhost:3030/book',{
            headers:{token:"azerty"}
        }).then(resp=>{
            console.log(resp.data)
        }) 
      }, []); 

    return(
        <div>
            <h1 onClick={()=>console.log(books)}>test backend </h1>
            <div>
                <h3>books</h3>
                {!books.length?<div>no data</div>:
                <table>
                    <tr><td>titre</td><td>description</td><td>Pages</td><td>image</td></tr>
                    {
                        books[0].map((book) => {
                            console.log(book.title.split(" ").join("-"))
                            return(
                            <tr><td>{book.title}</td><td>{book.description}</td><td>{book.pages}</td><td><img src={"http://localhost:3030/image/"+book.title.split(" ").join("-")+"/0.jpeg?token=azerty"}/></td></tr>
                            )
                        })
                    }
                </table>}
            </div>
        </div>
    )
} */
const Login = ({setToken})=>{
    const [userName,setUserName] =useState("")
    const [password,setpassword] =useState("")
    const submitLogin =(event)=>{
        console.log("ddd")
        if(password!="" && userName!="")
        {
            axios.post(`http://localhost:3030/login`,{
                userName:userName,
                password:password
            }).then(resp=>{
                console.log(resp.data)
                setToken(resp.data.token)
            }).catch((err)=>{
                console.log(err.request.status)
                console.log("failed request")
            
        })
        
    }
}
    return (
        
        <div>
            <h1>login</h1>
            username  :  <input type="text" value={userName} onChange={(event)=>setUserName(event.target.value)}/><br/>
            password  :  <input type="password" value={password} onChange={(event)=>setpassword(event.target.value)}/><br/>
            <button onClick={(event)=>submitLogin(event)}>login</button>
        </div>
        )
}
const Books =({token})=>{
    
    const [books, setBooks]=useState([])
    const [image , setImage] = useState()
    useEffect(() => {
            console.log(token)
            document.cookie= `token = ${token}`
        
            axios.get(`http://localhost:3030/book`,{
                params: {
                     'token':token ,
                }
            }).then(res =>{
                console.log((res))
                if(true)
                {
                    setBooks([...books,res.data])
                }
                    
            }).catch((err)=>{
                    console.log(err.request)
                    console.log("failed  request")
                
            })
            axios.get(`http://localhost:3030/image/Start-With-Why/0.jpeg`,{
                params: {
                     'token':token ,
                }
            }).then(res =>{
                console.log((res))
                if(true)
                {
                    setImage(res.data)
                }
                    
            }).catch((err)=>{
                    console.log(err.request)
                    console.log("failed  request")
                
            })
      }, []); 
    return (
        <div>
            <h1>Books</h1>
            <div>
            <h1 onClick={()=>console.log(books)}>test backend </h1>
            <div>
                <h3>books</h3>
                {!books.length?<div>no data</div>:
                <table>
                    <tr><td>titre</td><td>description</td><td>Pages</td><td>image</td></tr>
                    {
                        books[0].map((book) => {
                            console.log(book.title.split(" ").join("-"))
                            return(
                            <tr><td>{book.title}</td><td>{book.description}</td><td>{book.pages}</td><td><img src={image}/></td></tr>
                            )
                        })
                    }
                </table>}
            </div>
        </div>
        </div>
    )
}

export default App;