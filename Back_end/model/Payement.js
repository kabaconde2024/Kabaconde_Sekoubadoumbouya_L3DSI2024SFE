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
    enum: ['Carte de crédit', 'espece', 'cheque'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
 
});




module.exports = mongoose.model('Payement', paymentSchema);
