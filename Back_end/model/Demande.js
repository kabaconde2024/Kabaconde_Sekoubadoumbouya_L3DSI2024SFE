const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demandeSchema = new Schema({
   
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
    accepte:{type: Boolean,default:false},
    message:{type: String,default:"votre demande "}

});

module.exports = mongoose.model('Demande', demandeSchema);
