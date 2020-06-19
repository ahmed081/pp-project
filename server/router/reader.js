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
    const {id,size,page,cle}=req.query
    let reader = await Reader.findById(id,{friends:1})
    let query = {_id:{$in:reader.friends}}
    if(cle && cle !== '')
    {
      
      query = {_id:{$in:reader.friends}, $or:[{"name.last":{$regex : cle , $options: 'i'}},{"name.first":{$regex : cle , $options: 'i'}}]}
    }
    console.log(query)
    Reader.find(query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Reader.find(query).count()
      .then(count=>{
        res.json({page,size,length : count,docs:data})
      })
    })
})

Router.route('/searsh').get(async(req,res)=>{
  const {size,page,cle}=req.query
  let query = {}
  if(cle && cle !== '')
  {
    
    query = {$or:[{"name.last":{$regex : cle , $options: 'i'}},{"name.first":{$regex : cle , $options: 'i'}}]}
  }
  
  Reader.find(query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
  .then(data=>{
    Reader.find(query).count()
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

  if(reader.lectures){
      const element = reader.lectures.find(book => book.id === id)
      
      if(element){
        const index = reader.lectures.indexOf(element)
        reader.lectures=[...reader.lectures.slice(0,index),...reader.lectures.slice(index+1,reader.lectures.length)]
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
Router.route('/:id').put(async(req, res) => { 

  const SECRET = process.env.SECRET;
  let reader = await Reader.findOneAndUpdate({_id:req.body._id}, req.body, {
    new: true,
    upsert: true,
    rawResult: true // Return the raw result from the MongoDB driver
  });
  if(reader.value instanceof Reader)
      res.json('book updated!')
  else 
    res.status(400).json('Error: ' + err)
 
});
//edit mot de passe
Router.route('/password/:id').put(async(req, res) => { 

  const SECRET = process.env.SECRET;
  let reader = await Reader.findById(req.params.id)
  if(reader.login.password === req.body.password)
  {
    reader.login.password = req.body.NewPassword
    reader.save()
    res.json("password updated")
  }else 
    res.status(400).json('Error: ')
 
});
//add reader
Router.route('/add').post(function(req,res){


  const _id = uuid();

    
   
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
    Reader.find().count()
      .then(count => res.send(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//find all
Router.route('/').get(function(req,res){
  Reader.find({}, function (err, docs) {
    if(err)
      res.send("erreur")
    res.send({length : docs.length ,docs});
  })
  
});

module.exports = Router;