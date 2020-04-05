import React,{ useState ,useEffect} from 'react';
import axios from 'axios'

const  App = ()=>{
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
        }) */
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
}

export default App;