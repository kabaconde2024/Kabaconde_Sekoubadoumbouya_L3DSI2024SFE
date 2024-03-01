const mongoose = require('mongoose');

const AdhesionSchema = new mongoose.Schema({
  utilisateur:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
  }],
  date: {
    type: Date,
    default: Date.now
  },
  prix: Number
});

const Adhesion = mongoose.model('Adhesion', AdhesionSchema);

module.exports = Adhesion;
