
const Router     = require('express').Router();
const Reader     = require('../models/reader')

const JWT        = require("jsonwebtoken")


Router.route('/').post(async (req, res) => {
    const {username,password} =req.body;
    
    console.log("login : ",req.body)

    try {
      const  reader =await Reader.findOne({'login.username':username})
      console.log("findone by usename : ",reader)
      if(reader && password === reader.login.password)
      {
        
        const token = JWT.sign({username:username,_id:reader._id,role:0},process.env.SECRET)
        console.log("password correct")
         reader.login.password = ""
        res.json({token,user:reader})
        
      }
      else
        throw new Error("ssss")
    } catch (error) {
      console.log("username incorrect " ,error)
      res.status(404).send("error : " + error)
    }
    
   
    
    
  })
  Router.route('/lookforme').post(async (req, res) => {
    const {token}  = req.body || req.query
    console.log({token})
    JWT.verify(token,process.env.SECRET,async(err,payload)=>{
      if(err)
      {
        console.log("error")
        res.status(400).json({login:false})

      }
      else {
        console.log(payload)
        const {_id} = payload
        const reader= await Reader.findById(_id)
        reader.login.password = ""
        res.json({login:true,user:reader})
      }
      
    })
    
    
  })
  module.exports = Router;