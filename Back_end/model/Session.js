const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    formations: [{ type: Schema.Types.ObjectId, ref: 'Formation' }],
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    lieu: { type: String, required: true },
    capacite: { type: Number, required: true },
});
module.exports = mongoose.model('Session', sessionSchema);
