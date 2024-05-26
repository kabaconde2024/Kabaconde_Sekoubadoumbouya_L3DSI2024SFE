const express = require("express");
const mongoose = require("mongoose");
const Evenement = require("./Evenement");


// Schéma MongoDB pour les actualités
const participerEvenementschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    evenement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evenement',
        required: true,
    },

  
  date: { type: String, required: true },

}, { collection: 'ParticiperEvenement' }); // Utilisez 'Actualite' pour la collection

module.exports = mongoose.model('ParticiperEvenement', participerEvenementschema);


