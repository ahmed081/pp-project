const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    ISBN:{
        type:String
    },
    title:{
        type: String,
        required: true,
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
        required: true
    },
    
    authors:{
        type: Array,
    },

}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Book = mongoose.model('Book', bookSchema);

module.exports = Book