const express = require("express");
const mongoose = require("mongoose");


// Schéma MongoDB pour les actualités
const evenementschema = new mongoose.Schema({
  titre: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },

}, { collection: 'Evenement' }); // Utilisez 'Actualite' pour la collection

module.exports = mongoose.model('Evenement', evenementschema);


