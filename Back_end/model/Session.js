const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
    date: {  type: Date, required: true },
    dateFin: {  type: Date, required: true },
    lieu: { type: String, required: true },
    capacite: { type: Number, required: true },
    prix: { type: Number, required: true },
    remarque: { type: String, required: true },
    userSession:{type: Schema.Types.ObjectId, ref: 'User' },
    MontantRestant: {
        type: Number,
        required: true
      },


});
module.exports = mongoose.model('Session', sessionSchema);
