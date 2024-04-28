const Payement = require('../model/Payement');
const express = require('express');


const EffectuerPayement = async (req, res) => {
  // Récupérer les données du paiement depuis le corps de la requête
  const { price, mode, userId, session } = req.body;

  try {
    // Créer une nouvelle instance de paiement avec les données fournies, y compris les informations d'utilisateur et de session
    const nouveauPaiement = new Payement({
      price: price,
      mode: mode,
      userId: userId,
      session: session
      // Ajoutez d'autres champs d'information utilisateur et de session si nécessaire
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


const recupererPaiements = async (req, res) => {
  try {
    // Récupérer tous les paiements depuis la base de données
    const paiements = await Payement.find();
    
    // Répondre avec les paiements récupérés
    res.status(200).json(paiements);
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error('Erreur lors de la récupération des paiements :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des paiements.' });
  }
};
const recupererPaiementsUtilisateur = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur et l'ID de la session à partir des paramètres de la requête
    const userId = req.params.userId;
    const sessionId = req.params.sessionId;

    // Récupérer tous les paiements associés à cet utilisateur pour cette session depuis la base de données
    const paiementsUtilisateurPourSession = await Payement.find({ userId: userId, session: sessionId });

    // Calculer la somme des prix payés en utilisant la méthode reduce
    const sommePrixPayes = paiementsUtilisateurPourSession.reduce((total, paiement) => total + paiement.price, 0);

    // Répondre avec la somme des prix payés
    res.status(200).json({ sommePrixPayes,paiementsUtilisateurPourSession });
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error('Erreur lors de la récupération des paiements de l\'utilisateur pour cette session :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des paiements de l\'utilisateur pour cette session.' });
  }
};






  
  module.exports = { EffectuerPayement,recupererPaiements,recupererPaiementsUtilisateur};
  