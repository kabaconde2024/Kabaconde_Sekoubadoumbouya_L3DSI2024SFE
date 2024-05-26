const express = require('express');
const router = express.Router();
const Depense = require('../model/Depense');



// Méthode pour créer une nouvelle formation
const creerDepense = async (req, res) => {
    try {

        const {intitule, description, prix,date } = req.body;

        // Vérifier si la Depense existe déjà
        const existingDepense = await Depense.findOne({ intitule });

        if (existingDepense) {
            return res.status(400).json({ message: 'Cette Depense existe déjà.' });
        }

        // Créer une nouvelle formation
        const nouvelleDepense = new Depense({
            intitule,
            description,
            prix,
            date,
            
        });

        // Sauvegarder la formation dans la base de données
        await nouvelleDepense.save();

        res.status(201).json({ message: 'Depense créée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la Depense.' });
    }
};



const recupererDepenses  = async (req, res) => {
    try {
        const depenses = await Depense.find();
        res.status(200).json(depenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des dépenses.' });
    }
};



const supprimerDepenses= async (req, res) => {
    try {
        const id = req.params.id;
        await Depense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Dépense supprimée avec succès.' });
    } catch (error) {
        
    
console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la dépense.' });
    }
};

// Méthode pour mettre à jour une dépense
const modifierDepense= async (req, res) => {
    try {
        const id = req.params.id;
        const { intitule,description, prix } = req.body;
        await Depense.findByIdAndUpdate(id, { intitule,description, prix });
        res.status(200).json({ message: 'Dépense mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la dépense.' });
    }
};




module.exports = {
    creerDepense,
    recupererDepenses,
    supprimerDepenses,
    modifierDepense
}