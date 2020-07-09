
const Book = require('../models/book')
const Router = require('express').Router();
const Reader     = require('../models/reader');
const Abonnement = require("../models/abonnement")
const abonnementType = ["enfant","ultimate","invited"]
const abonnementDao = require("../dao/abonnementDao")

Router.route('/init').get(async(req,res)=>{
    const abos = await abonnementDao.getAll()
    abos.map(async ab =>{
        console.log("delete....")
        await abonnementDao.delete(ab._id)
        
    })
    const readers = await Reader.find();
    readers.map(async reader=>{
        const index = Math.floor(Math.random() * Math.floor(3));
        const type = abonnementType[index]
        const subscriber = reader._id
        console.log("subscriber : " +subscriber)
        const duration = 30
        let prix 
        switch (type) {
            case "enfant":
                reader.subscribe=true
                prix=30
                break;
            case "ultimate":
                reader.subscribe=true
                
                prix = 40
                break;
            case "invited":
                prix = 0
                break;
            default:
                break;
        }
        const newAbo = new Abonnement({
            type,subscriber,duration,prix
        })
        const save = await abonnementDao.save(newAbo)
        if(save)
        {
            await reader.save()
            console.log("saved abo!.....")
        }
            
        else console.log("abo savedfailed !.....")
    })
    res.json("done.....")
})
Router.route("/").get(async (req,res)=>{
    const {page,size} = req.query
    const abonnement =  await abonnementDao.getMany({page,size})
    const count = await abonnementDao.count()

    res.json({page,size,length:count,docs:abonnement})
})
Router.route("/save").post(async (req,res)=>{
    let abonnement;
    if(req.body._id)
    abonnement = await abonnementDao.getOne(req.body._id)
    else 
        abonnement = new Abonnement({...req.body})
    const respence =  await abonnementDao.save(req.body)
    if(respence)
        res.json("abonnement add!!....")
    else res.json("abonnement failed to add!!...")
})
Router.route("/:id").get(async (req,res)=>{
    const {id}=req.params
    const abonnement =  await abonnementDao.getOne(id)
    res.json(abonnement)
})


module.exports = Router;
