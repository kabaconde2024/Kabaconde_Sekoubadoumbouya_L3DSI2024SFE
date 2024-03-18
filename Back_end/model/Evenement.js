const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evenementSchema = new Schema({
    titre: { type: String, required: true },
    datePub: { type: Date, default: Date.now },
    description: { type: String, required: true },
    image: { type: String, required: true } // Champ pour stocker le chemin de l'image téléchargée
});

module.exports = mongoose.model('Evenement', evenementSchema);
