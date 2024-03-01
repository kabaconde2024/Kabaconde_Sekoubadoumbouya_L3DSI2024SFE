const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    prix: { type: Number, required: true },
});

module.exports = mongoose.model('Formation', formationSchema);
