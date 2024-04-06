const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demandeAdehesionSchema = new Schema({
   
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
    messageInitial:{type: String,default:"Voulez-vous faire une démande d'adhésion à l'association ?"},
    messageEnvoi:{type: String,default:"Votre démande d'adhésion est en attente de traitement"}

});

module.exports = mongoose.model('DemandeAdehesion', demandeAdehesionSchema);
