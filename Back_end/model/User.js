const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['user'] }, // Ajout de 'user' comme rôle par défaut
});

module.exports = mongoose.model('User', userSchema);
