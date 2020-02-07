const express = require("express")
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const ReaderAPI =require("./router/reader")
const BookAPI = require("./router/book")
/**
 * 
*   connect to mongoDb
*/


const connection = mongoose.connection;
const g =5;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

/*
 *  using cors 
 * */ 
app.use(cors());
app.use(express.json());

app.use("/book",BookAPI)
app.use("/reader",ReaderAPI)
/*
 *  rooting 
 * */ 
app.get('/',function(req,res){
    console.log("ahmed")
    res.send("ddd")
})

app.use("/book",BookAPI)
app.use("/reader",ReaderAPI)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});