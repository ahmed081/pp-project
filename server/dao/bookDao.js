const Book = require("../models/book")
const find =async ({query={},fields={},page=0,size=20,cle=""})=>{
    if(cle && cle!=="")
        query ={...query,title:{$regex : cle , $options: 'i'}}

    const books = await Book.find({...query},{...fields}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    return books
}
const bookDao={
    save : async (book)=>{
        return await book.save()
    },
    
    getOne: async (id)=>{
        const book = await Book.findById(id)
        return book
    },
    getAll: async ()=>{
        const books =await Book.find()
        return books
    },
    getMany: async({page=0,size=20,cle=""})=>{
        const books = find({ page, size, cle })
        return books
    },
    getCategories: async ()=>{
        const categories = await Book.find({},{Subject :1,_id:0})
        return categories
    },
    getByCategorie : async ({categorie="",page=0,size=20,cle=""})=>{
        let query ={Subject : {$in : [categorie]}}
        
        const books = await find({ query, page, size, cle })
        return books
    },
    count : async (query={})=>{
        const count= await Book.find({...query}).countDocuments()
        return count
    },
    find : async(props)=>{
        return find(props)
    }
};


module.exports = bookDao