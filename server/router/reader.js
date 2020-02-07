const Reader = require('../models/reader')
const Router = require('express').Router();

//add reader
Router.route('/add').post(function(req,res){
    
    const newReader= new Reader({
        name:{
                fist:req.body.name.fist,
                last:req.body.name.last
        },
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        login:{
                username:req.body.login.username,
                password: req.body.login.password,
        },
        dob:{
                date: req.body.dob.date,
                age: req.body.dob.age
            
        },
        picture: {
           
                large:req.body.picture.large ,
                medium: req.body.picture.medium,
                thumbnail: req.body.picture.thumbnail
            
            
          }

    });
    newReader.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//delete reader
Router.route('/:id').delete(function(req,res){
    const {id} = req.params;
    Reader.findByIdAndDelete(id)
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//get by id
Router.route('/:id').get((req, res) => {
    const {id} = req.params;
    Reader.findById(id)
      .then(reader => res.json(reader))
      .catch(err => res.status(400).json('Error: ' + err));
  });
// get reader by page and size
Router.route('/page/:size').get((req, res) => {
    const {page,size} = req.params
    Book.find().limit(size).skip(page*size)
      .then(readers => res.json(readers))
      .catch(err => res.status(400).json('Error: ' + err));
});

//count nulbre of reader
Router.route('/count').get((req, res) => {
  
    Reader.find().count()
      .then(count => res.json(count))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = Router;