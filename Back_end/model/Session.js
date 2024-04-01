const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
    dateDebut: { type: String, required: true },
    dateFin: { type: String, required: true },
    lieu: { type: String, required: true },
    capacite: { type: Number, required: true },
<<<<<<< HEAD
    userSession:{type: Schema.Types.ObjectId, ref: 'User' },
=======
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
>>>>>>> 3a76e27eebbae7bf9d2699f72b8b22dfdae4fa03

});
module.exports = mongoose.model('Session', sessionSchema);
