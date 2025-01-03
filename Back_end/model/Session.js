const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    titre: { type: String, required: true },
    date: {  type: Date, required: true },
    dateFin: {  type: Date, required: true },
    lieu: { type: String, required: true },
    capacite: { type: Number, required: true },
    prix: { type: Number, required: true },
    remarque: { type: String, required: true },
    userSession:{type: Schema.Types.ObjectId, ref: 'User' },



});
module.exports = mongoose.model('Session', sessionSchema);
