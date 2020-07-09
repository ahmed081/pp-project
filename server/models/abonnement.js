const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abonnementSchema = new Schema({
   type:{
       type:String,
       required:true
   },
   prix:{
       type:Number,
       required:true
   },
   subscriber:{
       type:String,
       required:true
   },
   duration:{
       type:Number,
       required:true
   },

}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Claim = mongoose.model('Subscribes', abonnementSchema);

module.exports = Claim