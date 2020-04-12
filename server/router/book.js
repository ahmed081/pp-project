

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
//add book
Router.route('/add').post(function(req,res){
    
    const newBook= new Book(req.body);
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
    res.send(docs);
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
Router.route('/page/:size').get((req, res) => {
    const {page,size} = req.params
    Book.find().limit(size).skip(page*size)
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
});
//count nulbre of books
Router.route('/count').get((req, res) => {
  
    Book.find().count()
      .then(count => res.json(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = Router;