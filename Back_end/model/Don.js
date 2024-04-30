const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonSchema = new Schema({
    
    intitule: { type: String, required: true }, 
    description: { type: String, required: true }, 
    date: { type: Date, required: true }, 
    montant: { type: Number, required: true },

});

module.exports = mongoose.model('Don', DonSchema);
