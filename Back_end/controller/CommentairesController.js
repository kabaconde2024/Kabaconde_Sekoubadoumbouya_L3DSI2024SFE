const express = require('express');
const Commentaires = require('../model/Commentaires');


const EffectuerComentaires = async (req, res) => {
    const { contenu, user, evenement,date } = req.body;
  
    try {
      // Créer une nouvelle instance de paiement avec les données fournies, y compris les informations d'utilisateur et de session
      const nouveauCommentaire = new Commentaires({
        contenu: contenu,
        user: user,
        evenement: evenement,
        date:date
      });
  
      // Enregistrer le paiement dans la base de données
      const commentaireEnregistre = await nouveauCommentaire.save();
  
      // Répondre avec le paiement enregistré
      res.status(201).json(commentaireEnregistre);
    } catch (error) {
      // En cas d'erreur, répondre avec un message d'erreur
      console.error('Erreur lors de l\'enregistrement du commentaire :', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement du commentaire.' });
    }
  };
  module.exports = {EffectuerComentaires};
