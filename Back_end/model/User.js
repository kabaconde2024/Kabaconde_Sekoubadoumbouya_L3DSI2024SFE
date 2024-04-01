const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: Number, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['user'] }, // Ajout de 'user' comme rôle par défaut
    formations: { type: [Schema.Types.ObjectId], ref: 'Formation', default: [] },
<<<<<<< HEAD
    sessionformateur: [{type: Schema.Types.ObjectId, ref: 'Session', required: true }],

=======
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }] // Référence à plusieurs sessions
>>>>>>> 3a76e27eebbae7bf9d2699f72b8b22dfdae4fa03


});

module.exports = mongoose.model('User', userSchema);
