const Reader     = require('../models/reader')
const Router     = require('express').Router();
const JWT        = require("jsonwebtoken")
const uuid       = require('uuid/v4')
const mongoose   = require('mongoose');
const readerDao  = require("../dao/readerDaa")
//add reader
Router.route('/add').post(async(req,res)=>{
  const _id = uuid();
  const myUser = {_id,...req.body};
  console.log("daz add")
  const newReader= new Reader(myUser);
  const respence = await readerDao.save(newReader)
  if(respence) {res.json('reader added!')
    console.log("daz add")
}
  else
  {
    console.log("daz add")
    res.status(400).json('Error: ' )
  }  
    
});
Router.route('/getfriend').get(async(req,res)=>{
    const {id,size,page,cle}=req.query
    if(!id)
    {
      res.status(400).json("Error.....")
      return
    }
    const friends = await readerDao.getFriends({...req.query})
    const friendsIds =  await readerDao.find({query:{_id:id},fields:{friends:1}})
    const length = await readerDao.count({_id:{$in:friendsIds[0].friends}})
    console.log("heere")
    if(friends)
    {
      res.json({page,size,cle,length,docs:friends})
      console.log("heere")

    }
    else res.status(400).json("Error.....")
})


Router.route('/addfriend').put(async(req,res)=>{
  const {id,user}= req.body
  let reader = await Reader.findById(user._id,{friends:1})
  try {
    await readerDao.addFriend(id,reader)
    res.json(reader)
  }catch(err){
    res.send("failed...")
  }

})
//add panier
Router.route('/:panier').post(async(req,res)=>{
  const {
    user,
    id
  } = req.body
  const {panier} = req.params
  let reader = await readerDao.getOne(user._id)
  let p;
  switch (panier) {
    case "favorite":
        p=reader.favorites
        break;
    case "encours":
        p=reader.encours
        break;
    case "lecture":
        p=reader.lectures
        break;
    case "lireplustard":
        p=reader.lireplustard
        break;

    default:
        break;
}
  const respence = await readerDao.addToPanier({
    user:reader,
    id,
    panier:p,
    context:panier
  })
  if(respence)
    res.json("done...")
  else res.status(400).send("Error.....")
})
//edit
Router.route('/:id').put(async(req, res) => { 

  const {id}=req.params
  const reader =  await readerDao.getOne(id)
  req.body.login.password = reader.login.password
  req.body.login.username = reader.login.username
  Reader.findByIdAndUpdate({_id:id},req.body,(err,user)=>{
    if(err)
      res.status(400).json('Error: ' + err)
    else 
    {
      res.json(user)
      console.log("daz")
    }

  })
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

//delete reader
Router.route('/:id').delete(async(req,res)=>{
    const {id} = req.params;
    const respence =await readerDao.delete(id)
    if(respence) res.json('reader deleted.')
    else res.status(400).json('Error: ' )
});
//get by id
Router.route('/:id').get(async(req, res) => {
    const {id} = req.params;
    const myId = ""
    let reader = await readerDao.getOne(id)
    if(reader) {
      //if (myId !== id)
      //reader.login = {}
      res.json(reader)
    }
    else res.status(400).json('Error: ' + err)

  });


//count numbre of reader
Router.route('/count').get(async(req, res) => {
  const length = await readerDao.count()
  if(length)
    res.send({length})
  else res.status(400).json('Error: ' )
});

//find all
Router.route('/').get(async(req,res)=>{
  const {page,size,cle} = req.query
    const readers = await readerDao.getMany( {page,size,cle})
    if(readers)
    {
      const length = await readerDao.count()
      res.json({page,size,cle,length,docs:readers })

    }
    else res.status(400).json('Error: ')
});

module.exports = Router;