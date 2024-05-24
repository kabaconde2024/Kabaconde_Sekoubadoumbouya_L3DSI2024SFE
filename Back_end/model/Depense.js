const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepenseSchema = new Schema({
    
    intitule: { type: String, required: true }, 
    description: { type: String, required: true }, 
    prix: { type: Number, required: true },
    date: { type: Date, required: true }, 

});

module.exports = mongoose.model('Depense', DepenseSchema);
