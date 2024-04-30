const express = require('express');
const router = express.Router();
const Don = require('../model/Don');



// Méthode pour créer une nouvelle formation
const creerDon = async (req, res) => {
    try {

        const {intitule, description, date,montant } = req.body;

        // Vérifier si la Depense existe déjà
        const existingDon = await Don.findOne({ intitule });

        if (existingDon) {
            return res.status(400).json({ message: 'Cette Don existe déjà.' });
        }

        // Créer une nouvelle formation
        const nouvelleDon = new Don({
            intitule,
            description,
            date,
            montant,
            
        });

        // Sauvegarder la formation dans la base de données
        await nouvelleDon.save();

        res.status(201).json({ message: 'Don créée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la Don.' });
    }
};



const recupererDon  = async (req, res) => {
    try {
        const dons = await Don.find();
        res.status(200).json(dons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des dépenses.' });
    }
};



const supprimerDon= async (req, res) => {
    try {
        const id = req.params.id;
        await Don.findByIdAndDelete(id);
        res.status(200).json({ message: 'Don supprimée avec succès.' });
    } catch (error) {
        
    
console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la don.' });
    }
};

// Méthode pour mettre à jour une dépense
const modifierDon= async (req, res) => {
    try {
        const id = req.params.id;
        const { intitule,description,date, montant } = req.body;
        await Don.findByIdAndUpdate(id, { intitule,description,date ,montant });
        res.status(200).json({ message: 'Don mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la don.' });
    }
};




module.exports = {
    creerDon,
  recupererDon,
    supprimerDon,
    modifierDon,
}