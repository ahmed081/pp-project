const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    book_link:{
        type: String,
        unique: true
    },
    book_image:{
        type: String,
    },
    writers:{
        type: Array,
    },

}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Book = mongoose.model('Book', bookSchema);

module.exports = Book