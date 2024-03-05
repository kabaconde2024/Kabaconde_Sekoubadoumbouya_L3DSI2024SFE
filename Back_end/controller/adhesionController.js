const Demande = require('../model/Demande');
const User = require('../model/User');

const express = require('express');
const mongoose = require('mongoose');

const ajout = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Vérifiez si userId est une chaîne de caractères représentant un ObjectID valide
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'ID utilisateur invalide.' });
      }
  
      // Récupérer le nom de l'utilisateur associé à l'ID
      const user = await User.findById(userId);
      const username = user.username;
  
      // Ajouter l'ID de l'utilisateur à la collection "demande" ou effectuer toute autre logique nécessaire
      // Exemple avec MongoDB :
      const demande = await Demande.create({ user: userId });
  
      // Informer l'admin de la demande avec le nom de l'utilisateur
      // Vous pouvez utiliser des websockets, envoyer un email à l'admin, ou stocker les demandes dans une collection "notifications" dans la base de données
      // Pour l'instant, renvoyons simplement le nom de l'utilisateur dans la réponse
      res.status(200).json({ success: true, message: `Demande de ${username} traitée avec succès.`, demande });
    } catch (error) {
      console.error('Erreur lors du traitement de la demande :', error);
      res.status(500).json({ success: false, message: 'Erreur lors du traitement de la demande.' });
    }
  };
  
  const getDemandes = async (req, res) => {
  try {
    // Récupérer toutes les demandes depuis la base de données et peupler les informations de l'utilisateur
    const demandes = await Demande.find().populate('user', 'username');

    res.status(200).json({ success: true, demandes });
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des demandes.' });
  }
};


  
  const accepterAdhesion = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Ajoutez le rôle "adherent" à l'utilisateur
        await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { roles: { $each: ['adherent'] } } }, // Utilisez $addToSet pour éviter les doublons
            { upsert: true, new: true }
        );

        // Recherche de la demande d'adhésion correspondante
      const demande = await Demande.findOne({ user: userId });
  
      if (!demande) {
        return res.status(404).json({ error: 'Demande d\'adhésion non trouvée' });
      }
  
      // Mise à jour de la propriété accepte à true
      demande.accepte = true;
      await demande.save();

        // Continuez le reste du traitement si nécessaire...

        res.json({ message: 'Adhésion acceptée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'acceptation de l\'adhésion :', error);
        res.status(500).json({ error: 'Erreur lors de l\'acceptation de l\'adhésion' });
    }
};

  
  module.exports = { ajout,getDemandes,accepterAdhesion };
  