const Adhesion = require('../model/Adhesion');
const User = require('../model/User');
const express = require('express');
const mongoose = require('mongoose');

const DemandeAdhesion = async (req, res) => {
  const { userId } = req.body;

  try {
    // Vérifiez si userId est une chaîne de caractères représentant un ObjectID valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'ID utilisateur invalide.' });
    }


    // Récupérer le nom de l'utilisateur associé à l'ID
    const user = await User.findById(userId);
    const username = user.username;
    
    // Vérifier si la date de demande est à partir du 23 mars de chaque année
    const today = new Date();
    const startOfAdhesionPeriod = new Date(today.getFullYear(), 2, 23); // Le mois de mars est indexé à partir de 2
    const endOfAdhesionPeriod = new Date(today.getFullYear() + 1, 2, 23); // Fin de la période le 22 mars de l'année suivante

    if (today < startOfAdhesionPeriod || today >= endOfAdhesionPeriod) {
      // La date de demande est en dehors de la période d'adhésion
      return res.status(400).json({ success: false, message: `La période d'adhésion est du 23 mars de chaque année.` });
    }

    // Vérifier si l'utilisateur a déjà fait une demande cette année
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Début de l'année
    const endOfYear = new Date(today.getFullYear(), 11, 31); // Fin de l'année
    const demandeExistanteCetteAnnee = await Adhesion.findOne({ user: userId, dateDemande: { $gte: startOfYear, $lte: endOfYear } });

    if (demandeExistanteCetteAnnee) {
      // L'utilisateur a déjà fait une demande cette année
      return res.status(400).json({ success: false, message: `Vous ne pouvez faire qu'une seule demande par an pendant la période d'adhésion.` });
    }
    const message = "Votre demande est en cours de traitement.";

    // Ajouter l'ID de l'utilisateur à la collection "demande" ou effectuer toute autre logique nécessaire
    // Exemple avec MongoDB :
    const demande = await Adhesion.create({ user: userId, message,dateDemande: today });

    // Informer l'admin de la demande avec le nom de l'utilisateur
    // Vous pouvez utiliser des websockets, envoyer un email à l'admin, ou stocker les demandes dans une collection "notifications" dans la base de données
    // Pour l'instant, renvoyons simplement le nom de l'utilisateur dans la réponse
    res.status(200).json({ success: true, message: `${demande.message} - ${username}`, demande });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur lors du traitement de la demande.' });
  }
};


const getDemandes = async (req, res) => {
  try {
    // Récupérer userId de la requête
    const userId = req.query.userId;

    // Vérifier si userId est présent dans la requête
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Identifiant utilisateur manquant dans la requête.' });
    }

    // Récupérer les demandes associées à l'utilisateur spécifié par userId
    const demandes = await Adhesion.find({ user: userId }).populate('user', 'username');

    if (demandes.length === 0) {
      // Aucune demande n'est trouvée pour cet utilisateur
      const defaultMessage = new Adhesion().message;
      res.status(200).json({ success: true, message: defaultMessage });
    } else {
      // Vérifier s'il y a des demandes acceptées
      const demandeAcceptee = demandes.some(demande => demande.accepte);

      if (demandeAcceptee) {
        // Au moins une demande a été acceptée, renvoyer la liste des demandes acceptées
        const demandesAcceptees = demandes.filter(demande => demande.accepte);
        res.status(200).json({ success: true, demandes: demandesAcceptees });
      } else {
        // Aucune demande n'a été acceptée, renvoyer la liste des demandes non acceptées
        res.status(200).json({ success: true, demandes });
      }
    }
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
      const demande = await Adhesion.findOne({ user: userId });
  
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


const getDemande = async (req, res) => {
  try {
    // Récupérer toutes les demandes depuis la base de données et peupler les informations de l'utilisateur
    const demandes = await Adhesion.find().populate('user', 'username');

    if (demandes.length === 0) {
      // Aucune demande n'est trouvée, utiliser le contenu par défaut du message
      const defaultMessage = new Adhesion().message;
      res.status(200).json({ success: true, message: defaultMessage });
    } else {
      res.status(200).json({ success: true, demandes });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des demandes.' });
  }
};


const getDemandesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Récupérer les demandes de l'utilisateur spécifié depuis la base de données et peupler les informations de l'utilisateur
    const demandes = await Adhesion.find({ user: userId }).populate('user', 'username');

    if (demandes.length === 0) {
      // Aucune demande n'est trouvée pour cet utilisateur
      res.status(404).json({ success: false, message: 'Aucune demande trouvée pour cet utilisateur.' });
    } else {
      res.status(200).json({ success: true, demandes });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de l\'utilisateur :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des demandes de l\'utilisateur.' });
  }
};



const supprimerDemande= async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Supprimer la demande d'adhésion correspondante dans la base de données
    await Adhesion.findOneAndDelete({ user: userId });

    // Répondre avec un statut 200 pour indiquer que la demande a été supprimée avec succès
    res.status(200).json({ message: 'Demande d\'adhésion supprimée avec succès.' });
  } catch (error) {
    // En cas d'erreur, répondre avec un statut 500 et un message d'erreur
    console.error('Erreur lors de la suppression de la demande d\'adhésion :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la demande d\'adhésion.' });
  }
};


const modifierPaye = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Mettre à jour l'attribut "paye" dans la demande correspondante à true
    await Adhesion.findOneAndUpdate({ user: userId }, { paye: true });

    // Répondre avec un statut 200 pour indiquer que la demande a été mise à jour avec succès
    res.status(200).json({ success: true, message: 'Attribut "paye" mis à jour avec succès.' });
  } catch (error) {
    // En cas d'erreur, répondre avec un statut 500 et un message d'erreur
    console.error('Erreur lors de la mise à jour de l\'attribut "paye" de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'attribut "paye" de la demande.' });
  }
};

  
  module.exports = { modifierPaye,DemandeAdhesion,supprimerDemande,getDemandes,accepterAdhesion,getDemande,getDemandesByUser};
  