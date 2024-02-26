const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User'); 

const userFormationSchema = new Schema({
    idUtilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idFormation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
    titreFormation: { type: String, required: true },
});

module.exports = mongoose.model('UserFormation', userFormationSchema);
