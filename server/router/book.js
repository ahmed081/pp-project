

const Book = require('../models/book')
const Router = require('express').Router();
const Reader     = require('../models/reader')
//edit 
Router.route('/:id').put( async (req, res) => {
  //const {id,title,description,book_link,book_image,writers} = req.body;
  console.log("edit : ",req.body)
   const id = req.params.id
  let book = await Book.findOneAndUpdate({_id:id}, req.body, {
    new: true,
    upsert: true,
    rawResult: true // Return the raw result from the MongoDB driver
  });
  if(book.value instanceof Book)
      res.json('book updated!')
  else 
    res.status(400).json('Error: ' + err) 


});
Router.route('/group').post(  (req, res)=>{
  const {ids}=req.body
  console.log(req.body)
  const {page,size} = req.query
  Book.find({_id :{$in : ids}}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
  .then((data)=>{
    Book.find({_id :{$in : ids}}).count()
    .then(count=>{
      res.json({length : count,page:page,size:size , docs:data})
    })
    
  })

})
Router.route('/uplaod').post(  (req, res) => {
  
  res.status(200).json('done')
});
Router.route('/collections',).get(async (req,res)=>{
  const categories = await Book.find({},{Subject :1,_id:0})
  let c =[]
   console.log(categories.map(categorie=>{
    
    c=[...c,
      ...categorie.Subject
    ]
   return null
 }))
 var initialValue = {}
 var reducer = function(tally, vote) {
   if (!tally[vote]) {
     tally[vote] = 1;
   } else {
     tally[vote] = tally[vote] + 1;
   }
   return tally;
 }
 var result = c.reduce(reducer, initialValue) // {tacos: 2, pizza: 3, fries: 1, ice cream: 2}
 

  res.json(result)
})
//get favorites books
Router.route('/favorite').get(  (req, res) => {
  const {id,page,size,cle}=req.query

  console.log({id,page,size,cle})
  Reader.findById(id,{"favorites":1})
  .then(data =>{
    
    const favorite = data.favorites
    let query = { _id: { $in: favorite } }
    if(cle || cle !== '')
    {
      console.log("eee")
      query = {$and : [{ _id: { $in: favorite } } , {title:{$regex : cle , $options: 'i'}}]}
    }
      
    Book.find(query ).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Book.find(query).count()
      .then(count =>{
          res.json({cle:cle,page:page,size:size,lenght:count,docs :data})
      })
      
    })
    
  })
});
//get lire plus tard books
Router.route('/lireplustard').get(  (req, res) => {
  const {id,page,size,cle}=req.query
  Reader.findById(id,{"lireplustard":1})
  .then(data =>{
    
    const lireplustard = data.lireplustard
    let query = { _id: { $in: lireplustard } }
    if(cle || cle !== '')
    {
      console.log("eee")
      query = {$and : [{ _id: { $in: lireplustard } } , {title:{$regex : cle , $options: 'i'}}]}
    }
    Book.find( query ).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Book.find(query).count()
      .then(count =>{
          res.json({cle:cle,page:page,size:size,lenght:count,docs :data})
      })
      
    })
    
  })
});

//get lectures books
Router.route('/lectures').get(  (req, res) => {
  const {id,page,size,cle}=req.query
  console.log(req)
  Reader.findById(id,{"lectures":1})
  .then(data =>{
    
    const lectures = data.lectures
    let query = { _id: { $in: lectures } }
    if(cle || cle !== '')
    {
      console.log("eee")
      query = {$and : [{ _id: { $in: lectures } } , {title:{$regex : cle , $options: 'i'}}]}
    }
    Book.find( query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Book.find( query).count()
      .then(count =>{
          res.json({cle:cle,page:page,size:size,lenght:count,docs :data})
      })
    })
    
  })
});
//get encours books
Router.route('/encours').get(  (req, res) => {
  const {id,page,size,cle}=req.query
  console.log(req)
  Reader.findById(id,{"encours":1})
  .then(data =>{
    
    const encours = data.encours
    let query = { _id: { $in: encours } }
    if(cle || cle !== '')
    {
      console.log("eee")
      query = {$and : [{ _id: { $in: encours } } , {title:{$regex : cle , $options: 'i'}}]}
    }
    Book.find( query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Book.find(query).count()
      .then(count =>{
          res.json({cle:cle,page:page,size:size,lenght:count,docs :data})
      })
    })
    
  })
});
//add book
Router.route('/add').post(function(req,res){
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
    console.log({
      title,
      ISBN,
      langage,
      description,
      pages,
      authors,
      country,
      subject,
      image
    })
    const newBook= new Book({
      title,
      ISBN,
      langage,
      description,
      pages,
      authors,
      country,
      subject,
      image
    });
    console.log('data book : ', req.body)
     newBook.save()
    .then(() => res.json('book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//find all
Router.route('/').get(function(req,res){
  console.log("payload : ", req.paylaod)
  const id = "edb36b06-2388-45ea-8079-a3df807531a3"
  Book.find({}, function (err, docs) {
    if(err)
      res.send("erreur")
      
      res.send({length : docs.length ,docs:docs})

    
  })
  
});

//delete book
Router.route('/:id').delete(function(req,res){
    const {id} = req.params;
   
     Book.findByIdAndDelete(id)
    .then(() => res.json('book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

//get book by id
Router.route('/:id').get((req, res) => {
    const {id} = req.params;
    Book.findById(id)
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
  });
//get book by page & size
Router.route('/:page/:size').get((req, res) => {
    const {page,size} = req.params
    console.log("here : ",req.params)
    Book.find({}).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
      .then(books => {
        
        Book.find().count()
          .then(count => res.json({length : count ,page:page,size:size,docs:books}))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
//count numbre of books
Router.route('/count').get((req, res) => {
  
    Book.find().count()
      .then(count => res.json(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = Router;