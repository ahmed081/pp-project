const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
   _id:{
        type:String,
        required : true,
        trim:true
   },
   subscribe:{
       type:Boolean,
       default:false
   },
    name:{
        type: new Schema({
            first:{
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
        required: true,
        unique:true
    },
    mobile:{
        type: String
    },
    gender:{
        type: String,
        required: true
    },
    login:{
        type: new Schema({
            username:{
                type: String,
                required: true,
                unique:true
            },
            password: {
                type: String,
                required:true
            }
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
        
      }
    ,
    token:{
        type:String
    },
    favorites:{
        type:Array
    },
    encours:{
        type:Array
    }
    ,
    lectures:{
        type:Array
    },
    lireplustard:{
        type:Array
    },
    friends:{
        type:Array
    },
    rating:{
        type:Array
    }
}, {
  timestamps: true,
});
const Book = mongoose.model('Reader', readerSchema);

module.exports = Book