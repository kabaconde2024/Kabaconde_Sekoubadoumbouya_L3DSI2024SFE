const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true }, 
    duree: { type: Number, required: true },
    etat: { type: [String], default: ["En cours"] },
    verifie: { type: Boolean, default: false }, 
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }] ,// Référence à plusieurs sessions

});

module.exports = mongoose.model('Formation', formationSchema);
