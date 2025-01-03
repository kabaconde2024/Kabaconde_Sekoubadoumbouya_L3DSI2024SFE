const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demandeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
    accepte: { type: Boolean, default: false },
    result: { type: Boolean, default: false },

    paye: { type: Boolean, default: false },
    message: { type: String, default: "vous n'avez pas fait votre adhesion !" },
    dateDemande: { type: Date, default: Date.now } // Champ pour enregistrer la date de la demande
});

module.exports = mongoose.model('Adhesion', demandeSchema);
