const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
    
    name:{
        type: new Schema({
            fist:{
                type : String,
                required: true
            },
            last:{
                type : String,
                required: true
            }
        }),
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String
    },
    gender:{
        type: String,
    },
    login:{
        type: new Schema({
            username:String,
            password: String,
        }),
    },
    dob:{
        type:new Schema({
            date: String,
            age: Number
        })
    },
    picture: {
        type : new Schema({
            large:String ,
            medium: String,
            thumbnail: String
        })
        
      },

}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Book = mongoose.model('reader', bookSchema);

module.exports = Book