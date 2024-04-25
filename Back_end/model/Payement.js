const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mode: {
    type: String,
    enum: ['Carte de crédit', 'PayPal', 'Virement bancaire'],
    required: true
  },
 
});



module.exports = mongoose.model('Payement', paymentSchema);
