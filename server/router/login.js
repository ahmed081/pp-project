
const Router     = require('express').Router();
const Reader     = require('../models/reader')

const JWT        = require("jsonwebtoken")


Router.route('/').post(async (req, res) => {
    const {userName,password} =req.body;
    
    console.log("login : ",req.body)
    Reader.findOne({'login.username':userName}).then(reader =>{
      
      console.log("findone by usename : ")
      if(password === reader.login.password)
      {
        
        const token = JWT.sign({username:userName,_id:reader._id,role:0},process.env.SECRET)
        console.log("password correct")
        res.status = 200
        res.json({token})
      }
        
      else{
        
        
        res.send(401,"password incorrect")
       
      } 
    }
    ).catch(err =>{
      
      res.send(401,"username incorrect ")
        
      })
    
    
  })

  module.exports = Router;