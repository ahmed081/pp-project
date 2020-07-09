const Claim = require("../models/claims")
const { types } = require("@hapi/joi")

const claimDao = {
    save :async function(claim){
        return await claim.save()
    },
    delete: async function(id_claim){
       return await Claim.findByIdAndDelete(id_claim)
    },
    getOne : async function(id_claim){
        let claim = await Claim.findById(id_claim)
        return claim
    },
    getMany: async function({page=0, size=20,type="",treated=""}){
        let query = {}
        if( type && type !=="" )
            query =  {type:type}
        if(treated && treated!=="")
            query = {...query,treated:treated}
        const claims = await  Claim.find({...query}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
        return claims

    },
    count : async function(query={}){
        const count = await Claim.find(query).countDocuments()
        return count 
    } 
}
module.exports = claimDao