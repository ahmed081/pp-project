
const Book = require('../models/book')
const Router = require('express').Router();
const Reader     = require('../models/reader');
const Claim = require("../models/claims")
const claimsType = ["user","book","message"]
const claimDao = require("../dao/claimDao")

Router.route('/init').get(async(req,res)=>{
    const allClaims = await Claim.find()
    if(allClaims.length>0)
        allClaims.map(async claim=>{
            await claimDao.delete(claim._id)
            console.log("aa")
        })
    const arr  = [...Array(20).keys()]
    arr.map(async (item) => {
        const index = Math.floor(Math.random() * Math.floor(3));
        const readers = await Reader.find();
        const books = await Book.find();
        const id_claimer = "f5851828-c1f1-4ff2-8e58-144448fa9969";
        let i;
        let type;
        let claimed_On;
        let claim_text;
        switch (claimsType[index]) {
            case 'user':
                console.log(claimsType[index]);
                i = Math.floor(Math.random() * Math.floor(readers.length));
                type = claimsType[index];
                claimed_On = readers[i]._id;
                claim_text = "claim user claim user claim user claim user ";
                break;
            case 'book':

                i = Math.floor(Math.random() * Math.floor(books.length));
                type = claimsType[index];
                claimed_On = books[i]._id;
                claim_text = "claim book claim book claim book claim book ";
                break;
            case 'message':
                console.log(claimsType[index]);
                i = Math.floor(Math.random() * Math.floor(readers.length));
                type = claimsType[index];
                claimed_On = "tt";
                claim_text = "message message message message";
                break;

            default:
                console.log("none");

                break;
        }
        
        const newClaim = new Claim({
            id_claimer,
            type,
            claimed_On,
            claim_text
        })
        await claimDao.save(newClaim);
    })
    
    const CC = await Claim.find()
    res.json(CC)
    
})
Router.route("/").get(async (req,res)=>{
    const {page,size,type,treated} = req.query
    const claims =  await claimDao.getMany({...req.query})
    const count = await claimDao.count({type:type,treated:treated})

    res.json({page,size,length:count,docs:claims})
})
//edit
Router.route("/:id").put(async (req,res)=>{
    const {id}=req.params
    if(!id)
    {
        res.status(400).json("error:required id; /host/add/:id")
        return
    }

    Claim.findByIdAndUpdate({_id:id},req.body,(err,claim)=>{
        if(err)
          res.status(400).json('Error: ' + err)
        else 
        {
          res.json(claim)
          console.log("daz")
        }
    
      })

})
//add
Router.route("/add").post(async (req,res)=>{
    let claim = new Claim({...req.body})
    const respence =  await claimDao.save(req.body)
    if(respence)
    {
        res.json("claim add!!....")
        console.log("daz")
    }
    else res.json("claim failed to add!!...")
})
Router.route("/:id").get(async (req,res)=>{
    const {id}=req.params
    const claim =  await claimDao.getOne(id)
    res.json(claim)
})


module.exports = Router;
