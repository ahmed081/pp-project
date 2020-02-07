

const Book = require('../models/book')
const Router = require('express').Router();

//add book
Router.route('/add').post(function(req,res){
    const {_id,title,description,book_link,book_image,writers} = req.body;
    const newBook= new Book({_id,title,description,book_link,book_image,writers});
    newBook.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



//delete book
Router.route('/:id').delete(function(req,res){
    const {id} = req.params;
    Book.findByIdAndDelete(id)
    .then(() => res.json('user deleted.'))
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