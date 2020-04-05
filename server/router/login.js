
const Router     = require('express').Router();
const Reader     = require('../models/reader')

Router.route('/').post(async (req, res) => {
    const {userName,password} =req.body;
    console.log("ahmed")
    res.write("")
    Reader.findOne({'login.username':userName}).then(reader =>{
      
      console.log("findone by usename : ",reader)
      if(password === reader.login.password)
      {
        res.status = 200
        res.write("you are loged in")
        
        status = 200
      }
        
      else{
        res.write("password incorrect")
        res.status = 404
      } 
    }
    ).catch(err =>{
      res.write("username incorrect ")
      res.status = 404
      }).then(()=>{
      res.send()
    })
    
    
  })

  module.exports = Router;