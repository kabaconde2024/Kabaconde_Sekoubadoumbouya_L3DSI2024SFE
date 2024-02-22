const express = require('express');
const router = express.Router();
const Formation = require('../model/Formation');

// Méthode pour créer une nouvelle formation
const creerFormation = async (req, res) => {
    try {
        const { titre, description, date, prix } = req.body;

        // Vérifier si la formation existe déjà
        const existingFormation = await Formation.findOne({ titre });

        if (existingFormation) {
            return res.status(400).json({ message: 'Cette formation existe déjà.' });
        }

        // Créer une nouvelle formation
        const nouvelleFormation = new Formation({
            titre,
            description,
            date,
            prix,
        });

        // Sauvegarder la formation dans la base de données
        await nouvelleFormation.save();

        res.status(201).json({ message: 'Formation créée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la formation.' });
    }
};


// Méthode pour afficher toutes les formations
const afficherFormations = async () => {
  try {
    const toutesLesFormations = await Formation.find();
    console.log('Formations récupérées avec succès:', toutesLesFormations);
    return toutesLesFormations;
  } catch (error) {
    console.error('Erreur lors de la récupération des formations :', error.message);
    throw new Error('Erreur lors de la récupération des formations');
  }
};


module.exports = {
    creerFormation,
    afficherFormations,
}