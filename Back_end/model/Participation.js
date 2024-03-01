const mongoose = require('mongoose');


const participationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    formation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formation',
        required: true,
    },
});

const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;  // Exportez uniquement le modèle Participation
