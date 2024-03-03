const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    prix: { type: Number, required: true },
    verifie: { type: Boolean, default: false }, 
    session: { type: Schema.Types.ObjectId, ref: 'Session', unique: true, sparse: true },

});

module.exports = mongoose.model('Formation', formationSchema);
