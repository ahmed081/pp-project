
//import framworks
const express = require('express')
const mongoose   = require('mongoose');



//import libs
const cors       = require('cors');
const JWT        = require("jsonwebtoken")
const joi        = require('@hapi/joi')
const bcrypt     = require("bcrypt")
const uuid       = require('uuid/v4')
const bodyParser = require('body-parser');



//import routers
const ReaderAPI  = require("./router/reader")
const BookAPI    = require("./router/book")
const login      = require('./router/login')
const AutorisationMiddleware = require('./router/AutorisationMiddleware')


//secret data
require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;



// create the server
const app = express();
app.use(cors())
app.options('*', cors());

/* lestening port */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// add & configure middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(AutorisationMiddleware)
app.use('/image',express.static('./image'))


/*
 *  rooting 
 * */ 

app.use('/login', login)
app.use("/book",BookAPI)
app.use("/reader",ReaderAPI)
const Book = require('./models/book')



/* connection to mongodb */
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
/* 
 app.use("/" ,async (req,res)=>{
  Book.find().then(async data=>{
    await data.map(async (book,index)=>{
      
      if(!book.Subject.includes("el badaoui"))
          book.Subject.push("el badaoui")
      else book.Subject.pop("el badaoui")
      
          console.log(book.Subject)
      await book.save()
          console.log(book instanceof Book)
    })
      
  })
})  */