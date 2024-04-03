const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
    dateDebut: { type: String, required: true },
    dateFin: { type: String, required: true },
    lieu: { type: String, required: true },
    capacite: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User',  sparse: true },

});
module.exports = mongoose.model('Session', sessionSchema);
