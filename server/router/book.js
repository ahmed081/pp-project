

const Book = require('../models/book')
const Router = require('express').Router();
const Reader     = require('../models/reader');
const { json } = require('body-parser');
Router.route('/rrr').put((req, res) => {
  res.json('ahmed')
})
const bookDao = require('../dao/bookDao')
//read book
Router.route('/read/:book').get( async (req, res)=>{
  const {book} = req.params
  res.sendFile("G:/cours/projets/Books/server/"+book)
})
//edit 

Router.route('/group').post( async (req, res)=>{
  const {ids}=req.body
  const {page,size} = req.query
  const query = {_id :{$in : ids}}
  const books = await bookDao.find({query:query,size:size,page:page})
  const length = await bookDao.count()
  if(books) res.json({length ,page,size , docs:books})
  else res.status(400).send("Error .....")

})

Router.route('/uplaod').post(  (req, res) => {
  
  res.status(200).json('done')
});
Router.route('/categories').get(async (req,res)=>{
  const {cle}= req.query
  let query = {}
  const categories = await Book.find({},{Subject :1,_id:0})

  let c =[]
   categories.map(categorie=>{
      c=[...c,
        ...categorie.Subject
      ]
      return null
    })
    if(cle && cle!=="")
    {
          c=c.filter(item => item.toUpperCase().includes(cle.toUpperCase()))
    }
    let initialValue = {}
    let reducer = function(tally, vote) {
      if (!tally[vote]) {
        tally[vote] = 1;
      } else {
        tally[vote] = tally[vote] + 1;
      }
      return tally;
    }
    let result = c.reduce(reducer, initialValue) // {tacos: 2, pizza: 3, fries: 1, ice cream: 2}
    
    
  res.json(result)
})
Router.route('/categories/:categorie').get(async(req,res)=>{
  const {categorie} =req.params
  const {id,page,size,cle}=req.query
  let query ={Subject : {$in : [categorie]}}
  const books = await bookDao.find({query:query,size:size,page:page,cle:cle})
  const length = await bookDao.count(query)
  if(books) res.json({length ,page,size ,cle, docs:books})
  else res.status(400).send("Error .....")
  
})
//get favorites books
Router.route('/favorite').get( async (req, res) => {
  const {id,page,size,cle}=req.query
  if(!id)
  {
    res.status(400).send("id user needed.....")
    return 
  } 
  const reader = await Reader.findById(id,{"favorites":1})
  const favorite = reader.favorites
  let query = { _id: { $in: favorite } }
  const books = await bookDao.find({cle,query,page,size,})
  const length = await bookDao.count(query)
  if(books) 
    res.json({length ,page,size ,cle, docs:books})
  else 
    res.status(400).send("Error .....")
    

    
  
});
//get lire plus tard books
Router.route('/lireplustard').get( async (req, res) => {
  const {id,page,size,cle}=req.query
  if(!id){
    res.status(400).send("id user needed.....")
    return 
  } 
  const reader = await Reader.findById(id,{"lireplustard":1})
  const lireplustard = reader.lireplustard
  let query = { _id: { $in: lireplustard } }
  const books = await bookDao.find({cle,query,page,size,})
  const length = await bookDao.count(query)
  if(books) 
    res.json({length ,page,size ,cle, docs:books})
  else 
    res.status(400).send("Error .....")
});

//get lectures books
Router.route('/lectures').get( async (req, res) => {
  const {id,page,size,cle}=req.query
  if(!id){
    res.status(400).send("id user needed.....")
    return 
  } 
  const reader = await Reader.findById(id,{"lectures":1})
  const lectures = reader.lectures
    let query = { _id: { $in: lectures } }
  const books = await bookDao.find({cle,query,page,size,})
  const length = await bookDao.count(query)
  if(books) 
    res.json({length ,page,size ,cle, docs:books})
  else 
    res.status(400).send("Error .....")
});
//get encours books
Router.route('/encours').get( async (req, res) => {
  const {id,page,size,cle}=req.query
  if(!id){
    res.status(400).send("id user needed.....")
    return 
  } 
  const reader = await Reader.findById(id,{"encours":1})
  const encours = reader.encours
  let query = { _id: { $in: encours } }
  const books = await bookDao.find({cle,query,page,size,})
  const length = await bookDao.count(query)
  if(books) 
    res.json({length ,page,size ,cle, docs:books})
  else 
    res.status(400).send("Error .....")
});
//add book
Router.route('/add').post(async (req,res)=>{
    const {
      title,
      ISBN,
      langage,
      description,
      pages,
      authors,
      country,
      subject,
      image
    }=req.body
    
  
    const newBook= new Book({
      ...req.body
    });
    const respense = await bookDao.save(newBook)
    if(respense)res.json('book added!')
    else res.status(400).json('Error: ' )
    
});


//find all


//delete book
Router.route('/:id').delete(async(req,res)=>{
    const {id} = req.params;
    if(!id)
    {
      res.status(400).send("required id host/:id")  
      return 
    }
    const respense = await bookDao.delete(id)
    if(respense) res.json('book deleted.')
    else res.status(400).json('Error: ' )
});

//get book by id
Router.route('/:id').get(async(req, res) => {
    const {id} = req.params;
    const book = await bookDao.getOne(id)
    if(book) res.json(book)
    else res.status(400).json('Error: ' + err)
  });
//get book by page & size
Router.route('/').get(async(req, res) => {
    const {page,size,cle} = req.query
    const books = await bookDao.getMany( {page,size,cle})
    if(books)
    {
      const length = await bookDao.count()
      res.json({page,size,cle,length,docs:books})

    }
    else res.status(400).json('Error: ')
});

//rating book 
Router.route('/rate').put(async(req, res) => {

  const {idBook , id,rate,comment} = req.body
  const reader = await Reader.findById(id)
  const book = await Book.findById(idBook)
  const userRating = {idBook,comment,rate} 
  const rating = reader.rating.find(item=> idBook === item.idBook )
  if(rating)
  {
    
    reader.rating.pop(rating)
    reader.rating.push(userRating)

    if(reader instanceof Reader) {
      await reader.save()
    }else res.status(400),json("error")
  }else {
    book.rating.ratedby.push(id)
    reader.rating.push(userRating)
    if(book instanceof Book && reader instanceof Reader) {  
      await reader.save()
      await book.save()
    }else res.status(400),json("error")
  }

  let readersRatedBook = await Reader.find()
  
  readersRatedBook=readersRatedBook.filter((user,i)=>{
      if(user.rating.find(r=> r.idBook === idBook))
      {
        return user
      }
  })  
  let rateMe = (array) => array.reduce((a, b) => a + b) / array.length;
  const rates = readersRatedBook.map(r =>{
      const rating = r.rating
      const index = rating.indexOf(rating.find(r=> r.idBook === idBook))
      return r.rating[index].rate
  }) 
  book.rating.rate =Math.round(rateMe(rates))
  if(book instanceof Book)
  {
    await book.save()

    res.json({rate : book.rating.rate})
  }
  else res.status(400),json("error")
   
  
});
//count numbre of books
Router.route('/count').get((req, res) => {
  

    Book.find().count()
      .then(count => res.json(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });

Router.route('/:id').put( async (req, res) => {
    //const {id,title,description,book_link,book_image,writers} = req.body;
     const id = req.params.id
    if(!id )
    {
      res.status(400).send("required id host/:id")
      return 
    }
      let book = await Book.findOneAndUpdate({_id:id}, req.body, {
        new: true,
        upsert: true,
        rawResult: true // Return the raw result from the MongoDB driver
      });
      if(book.value instanceof Book )
          res.json('book updated!')
      throw res.status(400).json('Error: ' + err)
      
  });
module.exports = Router;