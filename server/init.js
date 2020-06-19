const fetch = require("node-fetch");
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const get = async (nbr)=>{
  let respence =await fetch("https://randomuser.me/api?results="+nbr)
  try{
    const users = await respence.json()
    console.log(users)
    return users
  
  }catch(err)
  {
      console.log("eee",err)
  }

}

const fetch = require("node-fetch");
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

const get = async (url)=>{
  let respence =await fetch(url)
  try{
    const data = await respence.json()
    
    return data
  
  }catch(err)
  {
      console.log("eee",err)
  }

}
app.use("/",async (req,res)=>{
  const words =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
  "r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","10","11","12",
  "ab","ba","cb","df","es","f","gu","hu","io","jp","ka","lm","mc","np","ow","pm","qo"
]
  
  /*   Book.find().then(data=>{
      data.map(book=>{
        Book.deleteOne({_id:book._id}).then(()=>console.log("deleted"))
        .catch(err =>console.log("delete err => ",err))
      })
    }) */
    
  
    const data =async ()=>{
      let books =new Array()
      await words.map(async word=>{
        const data = await get("https://www.googleapis.com/books/v1/volumes?q="+word)
        books = [...books,...getBooks(data)]
        //console.log(books)
        //console.log("books ",books)
        //console.log(books.length)
      })
      
      return books 
    }
    const  books =await data()
    //console.log("b ",books)
    
  const getBooks = (data)=>{
    let objet={}
    //console.log(data)
    
    return  data.items.filter(book=>{
      
       if(book.volumeInfo.categories && book.volumeInfo.authors && book.volumeInfo.industryIdentifiers&&book.volumeInfo.description&&book.volumeInfo.pageCount)
      {
            
            const object  = new Book( {
              title:book.volumeInfo.title,
              ISBN:book.volumeInfo.industryIdentifiers[0].identifier,
              langage :book.volumeInfo.language,
              description:book.volumeInfo.description,
              pages:book.volumeInfo.pageCount,
              authors:[...book.volumeInfo.authors],
              data:book.volumeInfo.publishedDate,
              Subject:[...book.volumeInfo.categories],
              image:book.volumeInfo.imageLinks.smallThumbnail
          })
          console.log({discrition :object.description})

          console.log(Object instanceof Book)
          object.save().then(()=>console.log("saved"))
          .catch(err=>{
            console.log(err)
          })

          return object 
      } 
      
    
    }) 
  }

    
  })



const Reader     = require('./models/reader')
app.get('/', async(req,res)=>{

  get(50).then(data=>{
    data.results.map(user=>{
      const _id = uuid();
      const reader = {
          name:{
            first:user.name.first,
            last:user.name.last
          },
          email:user.email,
          mobile:user.phone,
          gender:user.gender=="female"?"F":"M",
          login:{
            username:user.login.username,
            password: user.login.password,
          },
          dob:{
            date: user.dob.date,
            age: user.dob.age
              
          },
          picture: {
            large:user.picture.large ,
            medium: user.picture.medium,
            thumbnail: user.picture.thumbnail
            }
            
      }
      const newReader= new Reader({_id,...reader});
      newReader.save().then(()=>console.log("reader added!!")).catch((err)=>console.log("user failed"))
     // console.log(reader)
    })
    res.send(data.results)
  })
  
  
  
})
