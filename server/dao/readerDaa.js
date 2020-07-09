const Reader = require("../models/reader");
const { findByIdAndDelete } = require("../models/reader");

const find =async ({query={},fields={},page=0,size=20,cle=""})=>{
    if(cle && cle!=="")
        query = {...query,...{$or:[{"name.last":{$regex : cle , $options: 'i'}},{"name.first":{$regex : cle , $options: 'i'}}]}}
        const reader = await Reader.find(query,{...fields}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    return reader
}
const readerDao={
    save : async (reader)=>{
        return await reader.save()
    },
    getOne: async (id)=>{
        const reader = await Reader.findById(id)
        return reader
    },
    getAll: async ()=>{
        const readers =await Reader.find()
        return readers
    },
    getMany: async({page=0,size=20,cle=""})=>{
        let query = {}
        const readers = find({ page, size, cle })
        return readers
    },
    getFriends:async({id,cle="",size=20,page=0})=>{
        const friendsIds =  await find({query:{_id:id},fields:{friends:1}})
        //const friendsIds = await Reader.find({_id:id})
        const fr = friendsIds[0].friends
        let  query = {_id:{$in:fr}}
        const friends= await find({cle,page,size,query:query})

        return friends
    },
    find:async(props)=>{
        return await find({...props})
    },
    count: async(query={})=>{
        return await Reader.find({...query}).countDocuments()
    },
    delete : async id =>{
        return await findByIdAndDelete(id)
    },
    addFriend:async (id,reader)=>{
        const index = reader.friends.indexOf(id)
        if(index >=0) {
            reader.friends=[...reader.friends.slice(0,index),...reader.friends.slice(index+1,reader.friends.length)]
        }
        else {
            reader.friends.push(id)
        }
        return await reader.save()
    },
    addToPanier:async (panierInfo)=>{
        let {user, id,panier,context} =  panierInfo
        if(panier.includes(id)){

            const index = panier.indexOf(id)
            panier=[...panier.slice(0,index),...panier.slice(index+1,panier.length)]
        }else 
        {
            panier = [id,...panier]

        }
        switch (context) {
            case "favorite":
                user.favorites=[...panier]
                break;
            case "encours":
                user.encours=[...panier]
                break;
            case "lecture":
                user.lectures=[...panier]
                break;
            case "lireplustard":
                user.lireplustard=[...panier]
                break;
        
            default:
                break;
        }
        const respence = await user.save()
        return respence
        
    } 
};


module.exports = readerDao