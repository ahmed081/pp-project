

const Book = require('../models/book')
const Router = require('express').Router();
//edit 
Router.route('/:id').put( async (req, res) => {
  //const {id,title,description,book_link,book_image,writers} = req.body;
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
Router.route('/uplaod').post(  (req, res) => {
  
  res.status(200).json('done')
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
    })
    const newBook= new Book({
      title,
      ISBN,
      langage,
      description,
      pages,
      authors,
      country,
      subject
    });
    console.log('data book : ', req.body)
     newBook.save()
    .then(() => res.json('book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//find all
Router.route('/').get(function(req,res){
  console.log("payload : ", req.paylaod)
  Book.find({}, function (err, docs) {
    if(err)
      res.send("erreur")
   // console.log("docs lenght : ",{length : docs.length ,docs})
    res.send({length : docs.length ,docs});
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
          .then(count => res.json({length : count ,docs:books}))
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