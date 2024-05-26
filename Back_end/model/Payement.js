const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  price: {
    type: Number,
    required: true
  },

  date: {
    type: Date, required: true 
  },
  mode: {
    type: String,
    enum: ['Virement bancaire', 'espece', 'cheque'],
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
