const express = require('express')
const cors       = require('cors');
const mongoose   = require('mongoose');
require('dotenv').config();



const JWT        = require("jsonwebtoken")
const joi        = require('@hapi/joi')
const bcrypt     = require("bcrypt")
const uuid       = require('uuid/v4')
const bodyParser = require('body-parser');

const ReaderAPI  = require("./router/reader")
const BookAPI    = require("./router/book")
const Reader     = require('./models/reader')
const login      = require('./router/login')
// create the server
const app = express();
app.use(cors())
app.options('*', cors());

// add & configure middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req,res,next)=>{
    //token verification
    //console.log(req)
    if(req.url.split('/')[1] ==="login")
    {
        next()
    }else 
    if(req.query.token)
        {
          console.log("token : ", req.query.token)
          Reader.findOne({'token':req.query.token}).then(reader =>{              
              next()
          }).catch(err=>{
              res.status(404).send("no access is authorised")
          })
        }
        else res.send("no access is authorised") 
        
})
app.use('/image',express.static('./image'))
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;




mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



/*
 *  rooting 
 * */ 
app.use('/login', login)
app.use("/book",BookAPI)
app.use("/reader",ReaderAPI)



app.get('/', async (req, res) => {
  console.log("user" ,req.user)
  res.sendFile('./image/image.jpg')
})
// create the login get and post routes



app.get('/authrequired', (req, res) => {
  
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});