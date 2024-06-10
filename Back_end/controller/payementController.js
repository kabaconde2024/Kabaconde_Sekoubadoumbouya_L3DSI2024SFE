const Payement = require('../model/Payement');
const express = require('express');
const Sessions = require('../model/Session');
const User = require('../model/User');


const EffectuerPayement = async (req, res) => {
  // Récupérer les données du paiement depuis le corps de la requête
  const { price, mode, userId, session,date} = req.body;

  try {
    // Créer une nouvelle instance de paiement avec les données fournies, y compris les informations d'utilisateur et de session
    const nouveauPaiement = new Payement({
      price: price,
      mode: mode,
      userId: userId,
      session: session,
      date:date
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
    // Récupérer tous les paiements depuis la base de données et peupler les références vers les utilisateurs et les sessions
    const paiements = await Payement.find().populate({ path: 'userId', select: 'username telephone' }).populate('session');
    console.log("Dates récupérées :", paiements.map(payment => payment.date));

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
    const userId = req.params.userId;
    const sessionId = req.params.sessionId;

    // Récupérer tous les paiements associés à cet utilisateur pour cette session depuis la base de données
    const paiementsUtilisateurPourSession = await Payement.find({ userId: userId, session: sessionId })
      .populate('userId', 'username')  // Populate the username from the User model
      .populate('session', 'titre');   // Populate the titre from the Session model

    // Calculer la somme des prix payés en utilisant la méthode reduce
    const sommePrixPayes = paiementsUtilisateurPourSession.reduce((total, paiement) => total + paiement.price, 0);

    // Extraire le nom d'utilisateur et le titre de la session des paiements (s'ils existent)
    const username = paiementsUtilisateurPourSession.length > 0 ? paiementsUtilisateurPourSession[0].userId.username : 'N/A';
    const sessionTitre = paiementsUtilisateurPourSession.length > 0 ? paiementsUtilisateurPourSession[0].session.titre : 'N/A';

    // Répondre avec les données nécessaires
    res.status(200).json({
      sommePrixPayes,
      paiementsUtilisateurPourSession,
      sessionTitre,
      username
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des paiements de l\'utilisateur pour cette session :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des paiements de l\'utilisateur pour cette session.' });
  }
};

{/*  

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
*/}
const PaiementsUtilisateur = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const userId = req.params.userId;

    // Récupérer tous les paiements associés à cet utilisateur depuis la base de données
    const paiementsUtilisateur = await Payement.find({ userId: userId });

    // Calculer la somme des prix des sessions payées en utilisant la méthode reduce
    const prixTotalSessions = paiementsUtilisateur.reduce((total, paiement) => total + paiement.price, 0);

    // Répondre avec le prix total
    res.status(200).json({ prixTotalSessions });
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    console.error('Erreur lors de la récupération du prix total des sessions de l\'utilisateur :', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération du prix total des sessions de l\'utilisateur.' });
  }
};







  
  module.exports = {PaiementsUtilisateur, EffectuerPayement,recupererPaiements,recupererPaiementsUtilisateur};
  