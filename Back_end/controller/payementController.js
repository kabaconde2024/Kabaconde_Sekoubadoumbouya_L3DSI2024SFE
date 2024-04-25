const Payement = require('../model/Payement');
const express = require('express');


const EffectuerPayement = async (req, res) => {
  // Récupérer les données du paiement depuis le corps de la requête
  const { price, mode } = req.body;

  try {
    // Créer une nouvelle instance de paiement avec les données fournies
    const nouveauPaiement = new Payement({
      price: price,
      mode: mode
    });

    // Enregistrer le paiement dans la base de données
    const paiementEnregistre = await nouveauPaiement.save();

    // Répondre avec le paiement enregistré
    res.status(201).json(paiementEnregistre);
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error('Erreur lors de l\'enregistrement du paiement :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement du paiement.' });
  }
};

  
  module.exports = { EffectuerPayement};
  