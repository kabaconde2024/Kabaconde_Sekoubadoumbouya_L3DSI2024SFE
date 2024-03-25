const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    path: { type: String, required: true },
    date:{type:String,required:true},
    description: { type: String, required: true },
    publication: { type: Boolean, required: true ,default:false},

    
});

module.exports = mongoose.model('Document', documentSchema);
