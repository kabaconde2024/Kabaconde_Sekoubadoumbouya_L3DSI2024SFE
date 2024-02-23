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


const afficherFormations = async (req, res) => {
    try {
      // Récupérer toutes les formations de la base de données
      const toutesLesFormations = await Formation.find();
  
      // Envoyer les formations récupérées en réponse
      res.status(200).json(toutesLesFormations);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations :', error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
    }
  };

  const updateFormation = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID à partir des paramètres de l'URL
        const { titre, description, date, prix } = req.body;

        // Vérifier si la formation existe
        const existingFormation = await Formation.findById(id);

        if (!existingFormation) {
            return res.status(404).json({ message: 'Formation non trouvée.' });
        }

        // Mettre à jour les propriétés de la formation
        existingFormation.titre = titre || existingFormation.titre;
        existingFormation.description = description || existingFormation.description;
        existingFormation.date = date || existingFormation.date;
        existingFormation.prix = prix || existingFormation.prix;

        // Sauvegarder les modifications dans la base de données
        await existingFormation.save();

        res.status(200).json({ message: 'Formation mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la formation.' });
    }
};

const deleteFormationById = async (req, res) => {
    try {
        const resultat = await Formation.deleteOne({ _id: req.params.id });

        if (resultat.deletedCount === 0) {
            return res.status(404).json({ message: "Formation non trouvée." });
        }

        res.status(200).json({ message: 'Formation supprimée avec succès.' });
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de la suppression de la formation." });
    }
};

module.exports = {
    creerFormation,
    afficherFormations,
    updateFormation,
    deleteFormationById,
}