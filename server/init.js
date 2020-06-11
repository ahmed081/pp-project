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
