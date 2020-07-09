const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const claimSchema = new Schema({
    id_claimer: {
        type:String,
        required:true,
    },
    type: {
        type:String,
        required:true,
    },
    claimed_On: {
        type:String,
        required:true,
    },
    claim_text: {
        type:String,
        required:true,
    },
    treated:{
        type:Boolean,
        default:false,
        required:true,
    }
}, {
  timestamps: true,
});
/*{_id,title,description,book_link,book_image,writers}*/
const Claim = mongoose.model('Claims', claimSchema);

module.exports = Claim