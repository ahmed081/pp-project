

const Book = require('../models/book')
const Router = require('express').Router();
const Reader     = require('../models/reader')
//edit 
Router.route('/:id').put( async (req, res) => {
  //const {id,title,description,book_link,book_image,writers} = req.body;
   const id = req.params.id

    let book = await Book.findOneAndUpdate({_id:id}, req.body, {
      new: true,
      upsert: true,
      rawResult: true // Return the raw result from the MongoDB driver
    });
    if(book.value instanceof Book )
        res.json('book updated!')
    throw res.status(400).json('Error: ' + err)
    
});
Router.route('/group').post(  (req, res)=>{
  const {ids}=req.body
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
          c=c.filter(item => item.includes(cle))
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
Router.route('/categories/:categorie').get((req,res)=>{
  const {categorie} =req.params
  const {id,page,size,cle}=req.query

  let query ={Subject : {$in : [categorie]}}
  if(cle && cle !== '')
    {
      query = {$and : [query , {title:{$regex : cle , $options: 'i'}}]}
    }
    
  Book.find(query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
  .then(data =>{
    Book.find(query).count()
    .then(count =>{
      res.json({categorie:categorie,cle:cle,page:page,size:size,length:count,docs :data})
    })
    
  })
})
//get favorites books
Router.route('/favorite').get(  (req, res) => {
  const {id,page,size,cle}=req.query

  Reader.findById(id,{"favorites":1})
  .then(data =>{
    
    const favorite = data.favorites
    let query = { _id: { $in: favorite } }
    if(cle && cle !== '')
    {
      query = {$and : [{ _id: { $in: favorite } } , {title:{$regex : cle , $options: 'i'}}]}
    }
      
    Book.find(query ).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
    .then(data=>{
      Book.find(query).count()
      .then(count =>{
          res.json({cle:cle,page:page,size:size,length:count,docs :data})
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
    if(cle && cle !== '')
    {
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
  Reader.findById(id,{"lectures":1})
  .then(data =>{
    
    const lectures = data.lectures
    let query = { _id: { $in: lectures } }
    if(cle && cle !== '')
    {
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
  Reader.findById(id,{"encours":1})
  .then(data =>{
    
    const encours = data.encours
    let query = { _id: { $in: encours } }
    if(cle || cle !== '')
    {
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
     newBook.save()
    .then(() => res.json('book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//find all


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
Router.route('/').get((req, res) => {
    const {page,size,cle} = req.query
    if(!cle && !size && !page)
    {
      Book.find().then((data)=>{
        Book.find().count()
          .then(count => res.json({length : count ,docs:books}))
          .catch(err => res.status(400).json('Error: ' + err));
      }).catch(err => res.status(400).json('Error: ' + err));
      return ;
    }
    let query = {}
    if(cle || cle !== '')
    {
      query =  {title:{$regex : cle , $options: 'i'}}
    }
    Book.find(query).limit(parseInt(size)).skip(parseInt(size)*parseInt(page))
      .then(books => {
        
        Book.find(query).count()
          .then(count => res.json({length : count ,page:page,size:size,cle:cle,docs:books}))
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