const express = require("express");
const mongoose = require("mongoose");
const Evenement = require("./Evenement");


// Schéma MongoDB pour les actualités
const commentaireschema = new mongoose.Schema({
    contenu: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true,},
    evenement: { type: mongoose.Schema.Types.ObjectId, ref: 'Evenement', required: true,},
    date: { type: String, required: true },

}, { collection: 'Commentaire' }); 

module.exports = mongoose.model('Commentaire', commentaireschema);


