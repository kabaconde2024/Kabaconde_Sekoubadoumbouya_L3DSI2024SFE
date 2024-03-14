const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Ajoutez d'autres champs pertinents selon vos besoins (par exemple, détails du client, numéro de transaction, etc.)
});

module.exports = mongoose.model('Payment', paymentSchema);
