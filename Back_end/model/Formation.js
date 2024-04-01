const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    titre: { type: String, required: true },
<<<<<<< HEAD
    description: { type: String, required: true }, 
=======
    description: { type: String, required: true },
    dateDebut: { type: String, required: true }, 
>>>>>>> 3a76e27eebbae7bf9d2699f72b8b22dfdae4fa03
    prix: { type: Number, required: true },
    etat: { type: [String], default: ["En cours"] },
    verifie: { type: Boolean, default: false }, 
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }] // Référence à plusieurs sessions

});

module.exports = mongoose.model('Formation', formationSchema);
