const Abonnement = require("../models/abonnement")

const abonnementDao = {
    save :async function(abonnement){
        return await abonnement.save()
    },
    delete: async function(id_abonnement){
       return await Abonnement.findByIdAndDelete(id_abonnement)
    },
    getOne : async function(id_abonnement){
        let abonnement = await Abonnement.findById(id_abonnement)
        return abonnement
    },
    getMany: async function({page=0, size=20}){
        let query = {}
        const abonnements = await  Abonnement.find({}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
        return abonnements

    },
    getAll: async function(){
        
        const abonnements = await  Abonnement.find({})
        return abonnements

    },
    getBySubscriber:async function(id_subscriber){
        const reader = await Abonnement.find({subscriber:id_subscriber})
        return reader 
    } ,
    count : async function(){
        const count = await Abonnement.find().countDocuments()
        return count 
    } 
}
module.exports = abonnementDao