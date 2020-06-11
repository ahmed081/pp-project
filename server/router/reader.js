const Reader     = require('../models/reader')
const Router     = require('express').Router();
const JWT        = require("jsonwebtoken")
const uuid       = require('uuid/v4')
const mongoose   = require('mongoose');
//add favorite
Router.route('/favorite').put(async(req,res)=>{
  const {
    user,
    id
  } = req.body
  
  let reader = await Reader.findById(user._id)
  //console.log('params favorites2 : ' , req.body)
  //console.log(reader instanceof Reader)
  if(reader.favorites){

      if(reader.favorites.includes(id)){
          const index = reader.favorites.indexOf(id)
          reader.favorites=[...reader.favorites.slice(0,index),...reader.favorites.slice(index+1,reader.favorites.length)]
      }else 
      reader.favorites = [id,...reader.favorites]
  }
  else 
  {
    const favorites =[id]
    reader={favorites,...reader}
  }
  console.log(reader instanceof mongoose.Document)
  reader instanceof Reader; // true
  reader instanceof mongoose.Model; // true
  reader instanceof mongoose.Document; // true
  try {
    await reader.save()
    res.json(reader)
  }catch(err){
    res.send("failed...")
  }
  
})
Router.route('/getfriend').get(async(req,res)=>{
    const {id,size,page}=req.query
    let reader = await Reader.findById(id,{friends:1})
    console.log({reader})
    Reader.find({_id:{$in:reader.friends}}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Reader.find({_id:{$in:reader.friends}}).count()
      .then(count=>{
        res.json({page,size,length : count,docs:data})
      })
    })
})
Router.route('/addfriend').put(async(req,res)=>{
  const {id,user}= req.body
  let reader = await Reader.findById(user._id,{friends:1})
  const index = reader.friends.indexOf(id)
  if(index >=0) 
    reader.friends=[...reader.friends.slice(0,index),...reader.friends.slice(index+1,reader.friends.length)]
  else 
    reader.friends.push(id)

  try {
    await reader.save()
    res.json(reader)
  }catch(err){
    res.send("failed...")
  }

})
//add encours
Router.route('/encours').put(async(req,res)=>{
  const {
    user,
    id
  } = req.body
  
  let reader = await Reader.findById(user._id)
  //console.log('params favorites2 : ' , req.body)
  //console.log(reader instanceof Reader)
  if(reader.encours){

      if(reader.encours.includes(id)){
          const index = reader.encours.indexOf(id)
          reader.encours=[...reader.encours.slice(0,index),...reader.encours.slice(index+1,reader.encours.length)]
      }else 
      reader.encours = [id,...reader.encours]
  }
  else 
  {
    const encours =[id]
    reader={encours,...reader}
  }
  console.log(reader instanceof mongoose.Document)
  reader instanceof Reader; // true
  reader instanceof mongoose.Model; // true
  reader instanceof mongoose.Document; // true
  try {
    await reader.save()
    res.json(reader)
  }catch(err){
    res.send("failed...")
  }
  
})
//add lecture
Router.route('/lecture').put(async(req,res)=>{
  const {
    user,
    id,
    page
  } = req.body
  let reader = await Reader.findById(user._id)
  //console.log('params favorites2 : ' , req.body)
  //console.log(reader instanceof Reader)
  if(reader.lectures){
      const element = reader.lectures.find(book => book.id === id)
      
      if(element){
        const index = reader.lectures.indexOf(element)
        reader.lectures=[...reader.lectures.slice(0,index),...reader.lectures.slice(index+1,reader.lectures.length)]
        console.log("element => ",reader.lectures)
        try {
          let requet  = await reader.save()
          
        }catch(err){
          res.send("failed...")
        }
        //element.page = page
      }
      
      reader.lectures = [{id,page},...reader.lectures]
  }
  else 
  {
    const lectures =[{id,page}]
    reader={lectures,...reader}
  }
  console.log(reader instanceof mongoose.Document)
  reader instanceof Reader; // true
  reader instanceof mongoose.Model; // true
  reader instanceof mongoose.Document; // true
  try {
    let requet  = await reader.save()
    res.json(reader)

  }catch(err){
    res.send("failed...")
  }
  
})
//add lire plus tard
Router.route('/lireplustard').put(async(req,res)=>{
  const {
    user,
    id
  } = req.body
  
  let reader = await Reader.findById(user._id)
  //console.log('params favorites2 : ' , req.body)
  //console.log(reader instanceof Reader)
  if(reader.lireplustard){

      if(reader.lireplustard.includes(id)){
          const index = reader.lireplustard.indexOf(id)
          reader.lireplustard=[...reader.lireplustard.slice(0,index),...reader.lireplustard.slice(index+1,reader.lireplustard.length)]
      }else 
      reader.lireplustard = [id,...reader.lireplustard]
  }
  else 
  {
    const lireplustard =[id]
    reader={lireplustard,...reader}
  }
  console.log(reader instanceof mongoose.Document)
  reader instanceof Reader; // true
  reader instanceof mongoose.Model; // true
  reader instanceof mongoose.Document; // true
  try {
    await reader.save()
    res.json(reader)
  }catch(err){
    res.send("failed...")
  }
  
})
//edit
Router.route('/:id').put((req, res) => { 

  const SECRET = process.env.SECRET;
  
  Users.findById(req.params.id)
    .then(reader => {
      reader={
        name:{
          fist:req.body.name.first,
          last:req.body.name.last
        },
        token:req.body.name.token,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        login:{
          username:req.body.login.username,
          password: req.body.login.password,
        },
        dob:{
          date: req.body.dob.date,
          age: req.body.dob.age
            
        },
        picture: {
          large:req.body.picture.large ,
          medium: req.body.picture.medium,
          thumbnail: req.body.picture.thumbnail
          }

    }
      
      reader.save()
        .then(() => res.json('reader updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
//add reader
Router.route('/add').post(function(req,res){


  const _id = uuid();

    
    console.log(req.payload)
   
   const myUser = {_id,...req.body};
   const newReader= new Reader(myUser);

    newReader.save()
    .then(() => {
      res.json('reader added!')
    })
    .catch(err => res.status(400).json('Error: ' + err)); 
    
});
//delete reader
Router.route('/:id').delete(function(req,res){
    const {id} = req.params;
    Reader.findByIdAndDelete(id)
    .then(() => res.json('reader deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//get by id
Router.route('/:id').get((req, res) => {
    const {id} = req.params;
    Reader.findById(id)
      .then(reader => res.json(reader))
      .catch(err => res.status(400).json('Error: ' + err));
  });
// get reader by page and size
Router.route('/:page/:size').get((req, res) => {
    const {page,size} = req.params
    console.log('params : ', req.params)
    Reader.find().limit(parseInt(size)).skip(parseInt(page)*parseInt(size))
      .then(readers => {
        Reader.find().count().then(count =>{
          res.json({length : count ,page:page,size:size,docs:readers})
        })
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

//count numbre of reader
Router.route('/count').get((req, res) => {
    console.log("count")
    Reader.find().count()
      .then(count => res.send(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//find all
Router.route('/').get(function(req,res){
  console.log("payload : ", req.paylaod)
  Reader.find({}, function (err, docs) {
    if(err)
      res.send("erreur")
   // console.log("docs lenght : ",{length : docs.length ,docs})
    res.send({length : docs.length ,docs});
  })
  
});

module.exports = Router;