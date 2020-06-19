const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    ISBN:{
        type:String,
        unique: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    
    description:{
        type: String
    },
    Subject:{
        type: Array
    },
    pages:{
        type : Number
    },
    langage:{
        type: String,
        required: true
    },
    country:{
        type: Array,
    },
    
    authors:{
        type: Array,
    },
    image:{
        type:String
    },
    rating:{
        type:Array()
    }

}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Book = mongoose.model('Book', bookSchema);

module.exports = Book